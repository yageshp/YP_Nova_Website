#!/usr/bin/env node
/**
 * Static pre-rendering for SEO (runs after `craco build`, see package.json "build").
 *
 * 1. Serves ./build locally and opens each public URL in headless Chromium with
 *    window.__YP_PRERENDER__ = true (scroll-reveal content is rendered visible).
 * 2. Starts from "/" and follows every internal link, so every linked page is captured and
 *    any internal link that leads to the 404 page fails the build.
 * 3. Saves the fully rendered HTML — content, unique <title>, meta description, canonical,
 *    Open Graph and JSON-LD — to build/index.html (home) and build/_pages/<path>.html.
 *    React then starts on top of that HTML in the browser, so the HTML Google downloads and
 *    the page people use are the same.
 * 4. Writes build/404.html, build/sitemap.xml, build/robots.txt and build/.htaccess
 *    (clean-URL routing rules for every page; unknown URLs return a real HTTP 404).
 * 5. Checks every page (duplicate titles/descriptions, canonical, H1 count, image alt, JSON-LD)
 *    and writes prerender-report.json.
 *
 * Requires Playwright with Chromium:  npm i -D playwright && npx playwright install chromium
 */
const fs = require('fs');
const path = require('path');
const http = require('http');

const ROOT = path.join(__dirname, '..');
const BUILD = path.join(ROOT, 'build');
const PAGES_DIR = '_pages';
const NOT_FOUND_PROBE = '/__yp-prerender-404-probe';

const seoSrc = fs.readFileSync(path.join(ROOT, 'src/config/seo.js'), 'utf8');
const SITE = (seoSrc.match(/siteUrl:\s*'([^']+)'/) || [])[1];
const CONTENT_DATE = (seoSrc.match(/contentUpdated:\s*'([^']+)'/) || [])[1];
if (!SITE) throw new Error('siteUrl not found in src/config/seo.js');

let chromium;
try {
  ({ chromium } = require('playwright'));
} catch (e) {
  console.error('\n[prerender] Playwright is not installed. Run:\n  npm i -D playwright && npx playwright install chromium\n' +
    'or build without pre-rendering (not recommended for SEO): npm run build:spa\n');
  process.exit(1);
}

const TYPES = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.json': 'application/json', '.txt': 'text/plain', '.woff2': 'font/woff2', '.woff': 'font/woff' };

function serve(template) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent(req.url.split('?')[0]);
      const file = path.join(BUILD, urlPath);
      if (urlPath !== '/' && file.startsWith(BUILD) && fs.existsSync(file) && fs.statSync(file).isFile()) {
        res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
        fs.createReadStream(file).pipe(res);
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(template); // SPA fallback to the pristine CRA template
      }
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

const normalise = (href) => {
  const p = href.split('#')[0].split('?')[0];
  if (!p.startsWith('/') || p.startsWith('//')) return null;
  if (/\.[a-z0-9]{2,5}$/i.test(p)) return null; // files
  return p.length > 1 ? p.replace(/\/+$/, '') : '/';
};
const outFile = (route) => (route === '/' ? 'index.html' : `${PAGES_DIR}${route}.html`);

(async () => {
  const template = fs.readFileSync(path.join(BUILD, 'index.html'), 'utf8');
  if (template.includes('boot-static')) {
    console.error('[prerender] build/index.html is already pre-rendered. Run the full build: npm run build');
    process.exit(1);
  }
  // Preload the two Latin variable fonts used above the fold (heading + body) so text renders sooner.
  const media = fs.existsSync(path.join(BUILD, 'static/media')) ? fs.readdirSync(path.join(BUILD, 'static/media')) : [];
  const fontPreloads = ['manrope-latin-wght-normal', 'inter-latin-wght-normal']
    .map((n) => media.find((f) => f.startsWith(n) && f.endsWith('.woff2')))
    .filter(Boolean)
    .map((f) => `<link rel="preload" href="/static/media/${f}" as="font" type="font/woff2" crossorigin="">`)
    .join('');
  fs.rmSync(path.join(BUILD, PAGES_DIR), { recursive: true, force: true });
  const server = await serve(template);
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, userAgent: 'YPNovaPrerender' });
  await context.addInitScript(() => { window.__YP_PRERENDER__ = true; });
  await context.route('**/*', (r) => (r.request().url().startsWith(base) ? r.continue() : r.abort()));

  const queue = ['/', NOT_FOUND_PROBE];
  const seen = new Set();
  const pages = [];
  const errors = [];
  const linkedFrom = {};

  while (queue.length) {
    const route = queue.shift();
    if (seen.has(route)) continue;
    seen.add(route);
    const page = await context.newPage();
    const consoleErrors = [];
    page.on('pageerror', (e) => consoleErrors.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error' || /\[hydrate\]/.test(m.text())) consoleErrors.push(m.text()); });
    await page.goto(base + route, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => document.querySelector('#root')?.children.length && document.title, null, { timeout: 15000 });
    await page.waitForTimeout(120);

    const info = await page.evaluate(() => {
      const meta = (sel) => document.head.querySelector(sel)?.getAttribute('content') || '';
      return {
        notFound: !!document.querySelector('[data-testid="not-found-page"]'),
        title: document.title,
        description: meta('meta[name="description"]'),
        robots: meta('meta[name="robots"]'),
        canonical: document.head.querySelector('link[rel="canonical"]')?.getAttribute('href') || '',
        h1: [...document.querySelectorAll('h1')].map((h) => h.textContent.replace(/\s+/g, ' ').trim()),
        jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent),
        imgNoAlt: [...document.querySelectorAll('img:not([alt])')].map((i) => i.getAttribute('src')),
        links: [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href')),
        words: (document.querySelector('main')?.innerText || '').split(/\s+/).filter(Boolean).length,
        contentText: (document.querySelector('main')?.innerText || '').replace(/\s+/g, ' ').trim(),
      };
    });
    // Saved pages start in "boot-static" mode: content is visible immediately (no entrance
    // animation replay before or while React starts → no flash, better LCP).
    const html = `<!doctype html>\n${await page.evaluate(() => {
      document.documentElement.classList.add('boot-static');
      // Keep React's separate text nodes separate in the saved HTML (as server rendering does
      // with <!-- -->), otherwise the browser merges them and hydration sees a mismatch.
      const root = document.getElementById('root');
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const texts = [];
      while (walker.nextNode()) texts.push(walker.currentNode);
      texts.forEach((t) => {
        if (t.nextSibling && t.nextSibling.nodeType === Node.TEXT_NODE) t.after(document.createComment(''));
      });
      return document.documentElement.outerHTML;
    })}`;
    const htmlOut = html.replace('</title>', `</title>${fontPreloads}`);
    await page.close();

    if (route === NOT_FOUND_PROBE) {
      fs.writeFileSync(path.join(BUILD, '404.html'), htmlOut);
      continue;
    }
    if (info.notFound) {
      errors.push(`Broken internal link: ${route} (linked from ${[...(linkedFrom[route] || [])].slice(0, 3).join(', ')})`);
      continue;
    }
    if (consoleErrors.length) errors.push(`${route}: console errors: ${consoleErrors.join(' | ').slice(0, 300)}`);
    info.jsonld.forEach((t) => { try { JSON.parse(t); } catch (e) { errors.push(`${route}: invalid JSON-LD`); } });

    const file = path.join(BUILD, outFile(route));
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, htmlOut);
    pages.push({ route, file: outFile(route), ...info, links: undefined, jsonld: info.jsonld.length,
      contentHash: require('crypto').createHash('sha256').update(info.contentText + info.title + info.description).digest('hex').slice(0, 16), contentText: undefined });

    for (const href of info.links) {
      const n = normalise(href);
      if (!n) continue;
      (linkedFrom[n] = linkedFrom[n] || new Set()).add(route);
      if (!seen.has(n) && !queue.includes(n)) queue.push(n);
    }
  }
  await browser.close();
  server.close();

  // ---- checks
  const warnings = [];
  const indexable = pages.filter((p) => !/noindex/.test(p.robots));
  const dup = (key) => {
    const m = {};
    indexable.forEach((p) => { (m[p[key]] = m[p[key]] || []).push(p.route); });
    Object.entries(m).filter(([, r]) => r.length > 1).forEach(([v, r]) => errors.push(`Duplicate ${key} "${v.slice(0, 60)}" on ${r.join(', ')}`));
  };
  dup('title');
  dup('description');
  indexable.forEach((p) => {
    const expected = `${SITE}${p.route === '/' ? '/' : p.route}`;
    if (p.canonical !== expected) errors.push(`${p.route}: canonical "${p.canonical}" ≠ ${expected}`);
    if (p.h1.length !== 1) errors.push(`${p.route}: ${p.h1.length} <h1> elements`);
    if (p.title.length > 65) warnings.push(`${p.route}: title ${p.title.length} chars (may be truncated): ${p.title}`);
    if (p.description.length < 70 || p.description.length > 165) warnings.push(`${p.route}: description ${p.description.length} chars`);
    if (p.imgNoAlt.length) errors.push(`${p.route}: images without alt: ${p.imgNoAlt.join(', ')}`);
  });

  // ---- genuine <lastmod>: a page's date changes only when its visible content, title or description changes.
  // seo-lastmod.json (keep it with the source) stores each page's content fingerprint and last-change date.
  const LASTMOD_FILE = path.join(ROOT, 'seo-lastmod.json');
  const today = new Date().toISOString().slice(0, 10);
  const lastmodDb = fs.existsSync(LASTMOD_FILE) ? JSON.parse(fs.readFileSync(LASTMOD_FILE, 'utf8')) : {};
  for (const p of indexable) {
    const prev = lastmodDb[p.route];
    if (!prev) lastmodDb[p.route] = { hash: p.contentHash, lastmod: CONTENT_DATE || today };
    else if (prev.hash !== p.contentHash) lastmodDb[p.route] = { hash: p.contentHash, lastmod: today };
    p.lastmod = lastmodDb[p.route].lastmod;
  }
  Object.keys(lastmodDb).forEach((r) => { if (!indexable.some((p) => p.route === r)) delete lastmodDb[r]; });
  fs.writeFileSync(LASTMOD_FILE, `${JSON.stringify(Object.fromEntries(Object.entries(lastmodDb).sort()), null, 2)}\n`);

  // ---- sitemap.xml + robots.txt
  const priority = (r) => (r === '/' ? '1.0' : /^\/(custom-software-development|agentic-ai-development|custom-erp-development|business-process-automation|saas-development|data-analytics)$/.test(r) ? '0.9'
    : /^\/(services|solutions|industries|case-studies|contact)$/.test(r) ? '0.8' : '0.7');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable
    .sort((a, b) => a.route.localeCompare(b.route))
    .map((p) => `  <url>\n    <loc>${SITE}${p.route === '/' ? '/' : p.route}</loc>\n${p.lastmod ? `    <lastmod>${p.lastmod}</lastmod>\n` : ''}    <priority>${priority(p.route)}</priority>\n  </url>`)
    .join('\n')}\n</urlset>\n`;
  fs.writeFileSync(path.join(BUILD, 'sitemap.xml'), sitemap);
  fs.writeFileSync(path.join(BUILD, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

  // ---- .htaccess: insert one clean-URL rule per pre-rendered page
  const rules = pages.filter((p) => p.route !== '/')
    .sort((a, b) => a.route.localeCompare(b.route))
    .map((p) => `RewriteRule ^${p.route.slice(1).replace(/[.+?()[\]{}|\\^$]/g, '\\$&')}$ /${p.file} [L]`)
    .join('\n');
  const htPath = path.join(BUILD, '.htaccess');
  const ht = fs.readFileSync(htPath, 'utf8');
  if (!ht.includes('# @@PRERENDERED_ROUTES@@')) throw new Error('.htaccess placeholder missing');
  fs.writeFileSync(htPath, ht.replace('# @@PRERENDERED_ROUTES@@', rules));

  const report = { site: SITE, generated: new Date().toISOString(), pages: pages.length, indexable: indexable.length, errors, warnings, pagesDetail: pages };
  fs.writeFileSync(path.join(ROOT, 'prerender-report.json'), JSON.stringify(report, null, 2));
  console.log(`[prerender] ${pages.length} pages pre-rendered (${indexable.length} indexable, in sitemap.xml); 404.html, robots.txt, .htaccess written.`);
  warnings.forEach((w) => console.log(`[prerender] warning: ${w}`));
  if (errors.length) {
    errors.forEach((e) => console.error(`[prerender] ERROR: ${e}`));
    process.exit(1);
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
