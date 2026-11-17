#!/usr/bin/env node
/**
 * URL validation for ypnova.com (or any base URL serving this build).
 *
 *   node scripts/validate-urls.js                       # live: https://ypnova.com
 *   node scripts/validate-urls.js http://127.0.0.1:8080 # a local Apache test server
 *
 * Reads <base>/sitemap.xml and, for every URL, checks: HTTP status, final URL after redirects,
 * redirect loops, canonical, robots meta, title, meta description, that the response is a real HTML
 * document, that <main> contains useful content (not the 404 page or an empty shell), and that the
 * canonical is itself in the sitemap. It also checks URLs that MUST redirect or return 404.
 * Writes docs/URL-VALIDATION-REPORT.md and exits 1 if anything fails.
 *
 * Behind an HTTPS proxy run with:
 *   NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/path/ca.crt node scripts/validate-urls.js
 */
const fs = require('fs');
const path = require('path');

const CANONICAL_ORIGIN = 'https://ypnova.com';
const base = (process.argv[2] || CANONICAL_ORIGIN).replace(/\/+$/, '');
const isLive = base === CANONICAL_ORIGIN;
const UA = 'Mozilla/5.0 (compatible; YPNovaValidator/1.0; +https://ypnova.com)';
const MIN_WORDS = 150;

/** Rewrite a canonical https://ypnova.com URL to the base being tested. */
const toBase = (u) => u.replace(CANONICAL_ORIGIN, base);

/** Network errors (not HTTP errors) are retried — a dropped connection is not a site failure. */
async function fetchRetry(url, tries = 4) {
  for (let i = 1; ; i++) {
    try {
      return await fetch(url, { redirect: 'manual', headers: { 'User-Agent': UA } });
    } catch (e) {
      if (i >= tries) throw new Error(`network error fetching ${url}: ${e.cause?.code || e.message}`);
      await new Promise((r) => setTimeout(r, 1500 * i));
    }
  }
}

async function follow(url, maxHops = 10) {
  const chain = [];
  let current = url;
  for (let i = 0; i < maxHops; i++) {
    const res = await fetchRetry(current);
    chain.push({ url: current, status: res.status });
    if (res.status >= 300 && res.status < 400 && res.headers.get('location')) {
      const next = new URL(res.headers.get('location'), current).toString();
      if (chain.some((c) => c.url === next)) return { chain, loop: true, res, body: '' };
      // Local testing: absolute redirects to the production origin are mapped back to the test server.
      current = isLive ? next : toBase(next);
      continue;
    }
    return { chain, loop: false, res, body: await res.text() };
  }
  return { chain, loop: true, res: null, body: '' };
}

const attr = (html, re) => (html.match(re) || [])[1] || '';
function inspect(html) {
  const head = html.split('</head>')[0];
  const main = (html.match(/<main[\s\S]*?<\/main>/) || [''])[0];
  const text = main.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ');
  return {
    isHtml: /^\s*<!doctype html>/i.test(html) && /<html[\s>]/i.test(html),
    title: attr(head, /<title>([^<]*)<\/title>/).replace(/&amp;/g, '&'),
    description: attr(head, /<meta name="description" content="([^"]*)"/).replace(/&amp;/g, '&'),
    canonical: attr(head, /<link rel="canonical" href="([^"]*)"/),
    robots: attr(head, /<meta name="robots" content="([^"]*)"/),
    words: text.split(/\s+/).filter(Boolean).length,
    notFoundPage: html.includes('data-testid="not-found-page"'),
    h1: (main.match(/<h1[\s>]/g) || []).length,
  };
}

(async () => {
  const rows = [];
  const fails = [];
  const sm = await follow(`${base}/sitemap.xml`);
  const smOk = sm.res && sm.res.status === 200 && /<urlset[\s>]/.test(sm.body);
  if (!smOk) fails.push('sitemap.xml missing or not valid XML');
  const sitemapUrls = smOk ? [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]) : [];
  const lastmods = smOk ? [...sm.body.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]) : [];
  const sitemapSet = new Set(sitemapUrls);
  if (sitemapUrls.some((u) => !u.startsWith(`${CANONICAL_ORIGIN}/`))) fails.push('sitemap contains non-canonical origin URLs');
  if (new Set(sitemapUrls).size !== sitemapUrls.length) fails.push('sitemap contains duplicate URLs');
  const titles = {};
  const descs = {};

  for (const u of sitemapUrls) {
    const r = await follow(toBase(u));
    const status = r.res ? r.res.status : 0;
    const finalUrl = r.chain[r.chain.length - 1].url;
    const info = inspect(r.body);
    const problems = [];
    if (r.loop) problems.push('redirect loop');
    if (r.chain.length > 1) problems.push(`redirects (${r.chain.map((c) => c.status).join('→')}) — sitemap must list final URLs`);
    if (status !== 200) problems.push(`HTTP ${status}`);
    if (!info.isHtml) problems.push('not an HTML document');
    if (info.notFoundPage) problems.push('serves the 404 page');
    if (info.words < MIN_WORDS) problems.push(`thin/empty content (${info.words} words in <main>)`);
    if (info.canonical !== u) problems.push(`canonical "${info.canonical}"`);
    if (info.canonical && !sitemapSet.has(info.canonical)) problems.push('canonical not in sitemap');
    if (/noindex/i.test(info.robots)) problems.push('noindex page listed in sitemap');
    if (!info.title) problems.push('missing title');
    if (!info.description) problems.push('missing description');
    if (info.h1 !== 1) problems.push(`${info.h1} h1`);
    (titles[info.title] = titles[info.title] || []).push(u);
    (descs[info.description] = descs[info.description] || []).push(u);
    const ok = problems.length === 0;
    if (!ok) fails.push(`${u}: ${problems.join('; ')}`);
    rows.push({ url: u, status, finalUrl: isLive ? finalUrl : finalUrl.replace(base, CANONICAL_ORIGIN), canonical: info.canonical,
      indexable: /noindex/i.test(info.robots) ? 'noindex' : 'index', title: info.title, description: info.description, words: info.words,
      result: ok ? 'PASS' : `FAIL — ${problems.join('; ')}` });
  }
  Object.entries(titles).filter(([, v]) => v.length > 1).forEach(([t, v]) => fails.push(`duplicate title "${t}": ${v.join(', ')}`));
  Object.entries(descs).filter(([, v]) => v.length > 1).forEach(([t, v]) => fails.push(`duplicate description: ${v.join(', ')}`));

  // URLs that must NOT return 200 as-is
  const expectations = [
    { path: '/index.html', expect: 'redirect', to: '/' },
    { path: '/contact/', expect: 'redirect', to: '/contact' },
    { path: '/_pages/about.html', expect: 'redirect', to: '/about' },
    { path: '/yp-nova-url-check-does-not-exist', expect: 404 },
    { path: '/industries/not-a-real-industry', expect: 404 },
    { path: '/solutions/not-a-real-solution', expect: 404 },
    { path: '/robots.txt', expect: 'robots' },
  ];
  if (isLive) expectations.unshift({ url: 'https://www.ypnova.com/about', expect: 'redirect', to: '/about' });
  const special = [];
  for (const e of expectations) {
    const target = e.url || `${base}${e.path}`;
    const r = await follow(target);
    const first = r.chain[0].status;
    const final = r.chain[r.chain.length - 1];
    const info = inspect(r.body);
    let ok = false;
    let detail = '';
    if (e.expect === 'redirect') {
      const wanted = `${isLive ? CANONICAL_ORIGIN : base}${e.to}`;
      ok = first === 301 && final.url === wanted && r.res.status === 200 && !r.loop;
      detail = `${r.chain.map((c) => c.status).join('→')} → ${final.url}`;
    } else if (e.expect === 404) {
      ok = r.chain.length === 1 && first === 404 && /noindex/.test(info.robots);
      detail = `HTTP ${first}, robots "${info.robots}"`;
    } else if (e.expect === 'noindex') {
      ok = first === 200 && /noindex/.test(info.robots) && !sitemapSet.has(`${CANONICAL_ORIGIN}${e.path}`);
      detail = `HTTP ${first}, robots "${info.robots}", in sitemap: ${sitemapSet.has(`${CANONICAL_ORIGIN}${e.path}`)}`;
    } else if (e.expect === 'robots') {
      ok = first === 200 && /Sitemap:\s*https:\/\/ypnova\.com\/sitemap\.xml/.test(r.body) && !/Disallow:\s*\/\s*$/m.test(r.body);
      detail = r.body.trim().replace(/\n+/g, ' | ');
    }
    if (!ok) fails.push(`${e.url || e.path}: expected ${e.expect}${e.to ? ` to ${e.to}` : ''}, got ${detail}`);
    special.push({ target: e.url || e.path, expect: e.expect + (e.to ? ` → ${e.to}` : ''), detail, result: ok ? 'PASS' : 'FAIL' });
  }

  const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
  const esc = (s) => String(s).replace(/\|/g, '\\|');
  const md = `# URL validation report

- **Tested against:** ${base}${isLive ? ' (LIVE production)' : ' (LOCAL test server — not the live site)'}
- **Run at:** ${now} UTC
- **Sitemap:** ${smOk ? `valid XML, ${sitemapUrls.length} URLs, all on ${CANONICAL_ORIGIN}; lastmod values: ${[...new Set(lastmods)].join(', ') || 'none'}` : 'FAILED'}
- **Result:** ${fails.length ? `❌ ${fails.length} problem(s)` : '✅ all checks passed'}

## Sitemap URLs

| URL | HTTP | Final URL | Canonical | Index | Title | Description | Words | Result |
|---|---|---|---|---|---|---|---|---|
${rows.map((r) => `| ${r.url.replace(CANONICAL_ORIGIN, '')} | ${r.status} | ${r.finalUrl === r.url ? 'same' : esc(r.finalUrl)} | ${r.canonical === r.url ? 'self' : esc(r.canonical)} | ${r.indexable} | ${esc(r.title)} | ${esc(r.description)} | ${r.words} | ${esc(r.result)} |`).join('\n')}

## Redirects, 404s, noindex pages and robots.txt

| Request | Expected | Observed | Result |
|---|---|---|---|
${special.map((s) => `| ${s.target} | ${esc(s.expect)} | ${esc(s.detail)} | ${s.result} |`).join('\n')}
${fails.length ? `\n## Problems\n\n${fails.map((f) => `- ${f}`).join('\n')}\n` : ''}`;
  const out = path.join(__dirname, '..', 'docs', isLive ? 'URL-VALIDATION-REPORT.md' : 'URL-VALIDATION-REPORT-local.md');
  fs.writeFileSync(out, md);
  console.log(`${fails.length ? 'FAIL' : 'PASS'}: ${rows.length} sitemap URLs, ${special.length} redirect/404/noindex checks against ${base}. Report: ${path.relative(process.cwd(), out)}`);
  fails.slice(0, 30).forEach((f) => console.log('  - ' + f));
  process.exit(fails.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
