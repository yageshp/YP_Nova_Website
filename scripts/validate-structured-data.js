#!/usr/bin/env node
/**
 * Structured-data validation for the pre-rendered build (runs in `npm run build`).
 * Checks every JSON-LD block in build/index.html and build/_pages/**: valid JSON, schema.org context,
 * consistent Organization identity, WebPage ↔ canonical/title/description, BreadcrumbList ↔ visible
 * breadcrumbs, Service/Article/FAQPage ↔ visible content, @id references resolve, and that no
 * fabricated or disallowed markup is present (ratings, reviews, LocalBusiness, addresses, awards).
 * Writes docs/STRUCTURED-DATA-REPORT.md; exits 1 on any error.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BUILD = path.join(ROOT, 'build');
const SITE = 'https://ypnova.com';
const EXPECT = {
  name: 'YP Nova', url: `${SITE}/`, email: 'info@ypnova.com', telephone: '+918291419044',
  parent: 'YP Security Services Pvt. Ltd.', areaServed: ['India', 'Worldwide'],
};
const FORBIDDEN = ['AggregateRating', 'Review', 'LocalBusiness', 'PostalAddress', 'Rating'];
const FORBIDDEN_KEYS = ['aggregateRating', 'review', 'reviews', 'address', 'award', 'awards', 'hasCredential', 'numberOfEmployees', 'foundingDate'];

const files = ['index.html', ...walk(path.join(BUILD, '_pages')).map((f) => path.relative(BUILD, f))];
function walk(dir) {
  return fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)])) : [];
}
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, ' ');
const norm = (s) => decode(String(s)).replace(/\s+/g, ' ').trim().toLowerCase();
const visibleText = (html) => norm((html.match(/<main[\s\S]*?<\/main>/) || [''])[0].replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, ' '));

const rows = [];
const errors = [];
function walkKeys(obj, fn, trail = '') {
  if (Array.isArray(obj)) obj.forEach((v, i) => walkKeys(v, fn, `${trail}[${i}]`));
  else if (obj && typeof obj === 'object') Object.entries(obj).forEach(([k, v]) => { fn(k, v, `${trail}.${k}`); walkKeys(v, fn, `${trail}.${k}`); });
}

for (const file of files) {
  const html = fs.readFileSync(path.join(BUILD, file), 'utf8');
  const head = html.split('</head>')[0];
  const robots = (head.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || '';
  const canonical = (head.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '';
  const title = decode((head.match(/<title>([^<]*)<\/title>/) || [])[1] || '');
  const desc = decode((head.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  const route = file === 'index.html' ? '/' : `/${file.replace(/^_pages\//, '').replace(/\.html$/, '')}`;
  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const pageErr = [];
  const err = (m) => pageErr.push(m);
  const text = visibleText(html);

  if (/noindex/.test(robots)) {
    if (blocks.length) err('noindex page should not carry JSON-LD');
    rows.push({ route, types: '— (noindex)', result: pageErr.length ? `FAIL — ${pageErr.join('; ')}` : 'PASS (noindex, no markup)' });
    pageErr.forEach((e) => errors.push(`${route}: ${e}`));
    continue;
  }
  if (blocks.length !== 1) err(`expected 1 JSON-LD block, found ${blocks.length}`);
  let data;
  try { data = JSON.parse(blocks[0]); } catch (e) { err('invalid JSON'); }
  const graph = (data && data['@graph']) || [];
  if (data && data['@context'] !== 'https://schema.org') err('@context must be https://schema.org');
  const byType = (t) => graph.filter((n) => [].concat(n['@type']).includes(t));
  const ids = new Set(graph.map((n) => n['@id']).filter(Boolean));

  walkKeys(graph, (k, v, trail) => {
    if (k === '@type' && [].concat(v).some((t) => FORBIDDEN.includes(t))) err(`forbidden type ${v} at ${trail}`);
    if (FORBIDDEN_KEYS.includes(k)) err(`forbidden property "${k}" at ${trail}`);
    if (k === '@id' && trail.split('.').length > 3 && typeof v === 'string' && !ids.has(v)) err(`unresolved @id reference ${v}`);
  });

  const org = byType('Organization').find((n) => n['@id'] === `${SITE}/#organization`);
  if (!org) err('Organization node missing');
  else {
    if (org.name !== EXPECT.name) err(`Organization.name "${org.name}"`);
    if (org.url !== EXPECT.url) err(`Organization.url "${org.url}"`);
    if (org.email !== EXPECT.email) err(`Organization.email "${org.email}"`);
    if (org.telephone !== EXPECT.telephone) err(`Organization.telephone "${org.telephone}"`);
    if (org.parentOrganization?.name !== EXPECT.parent) err('parentOrganization.name mismatch');
    const logoPath = (org.logo?.url || '').replace(SITE, '');
    if (!logoPath || !fs.existsSync(path.join(BUILD, logoPath))) err(`logo file missing: ${org.logo?.url}`);
    const areas = (org.areaServed || []).map((a) => a.name);
    if (JSON.stringify(areas) !== JSON.stringify(EXPECT.areaServed)) err(`areaServed ${JSON.stringify(areas)}`);
    if (org.location) err('Organization.location present (no customer-facing office)');
  }
  const site = byType('WebSite')[0];
  if (!site || site.url !== `${SITE}/` || site.publisher?.['@id'] !== `${SITE}/#organization`) err('WebSite node invalid');

  const page = graph.find((n) => /Page$/.test([].concat(n['@type'])[0]) && n['@id'] === `${canonical}#webpage`);
  if (!page) err('WebPage node missing or @id ≠ canonical');
  else {
    if (page.url !== canonical) err('WebPage.url ≠ canonical');
    if (page.name !== title) err(`WebPage.name ≠ <title> ("${page.name}")`);
    if (page.description !== desc) err('WebPage.description ≠ meta description');
  }

  const crumbs = byType('BreadcrumbList')[0];
  if (route !== '/' && !crumbs) err('BreadcrumbList missing');
  if (crumbs) {
    const items = crumbs.itemListElement || [];
    items.forEach((it, i) => { if (it.position !== i + 1) err('breadcrumb positions not sequential'); });
    if (items[items.length - 1]?.item !== canonical) err('last breadcrumb ≠ page URL');
    const nav = norm(((html.match(/<nav aria-label="Breadcrumb"[\s\S]*?<\/nav>/) || [''])[0]).replace(/<[^>]+>/g, ' '));
    items.slice(1).forEach((it) => {
      const n = norm(it.name);
      if (!nav.includes(n) && !text.includes(n)) err(`breadcrumb "${it.name}" not visible on page`);
    });
  }

  for (const svc of byType('Service')) {
    if (!svc.name || !svc.description || svc.provider?.['@id'] !== `${SITE}/#organization`) err('Service missing name/description/provider');
    if (svc.description !== desc) err('Service.description ≠ meta description');
    const words = norm(svc.name).split(' ').filter((w) => w.length > 3);
    if (words.filter((w) => text.includes(w)).length < Math.ceil(words.length * 0.6)) err(`Service "${svc.name}" not reflected in visible content`);
  }
  for (const faq of byType('FAQPage')) {
    for (const q of faq.mainEntity || []) {
      if (!text.includes(norm(q.name))) err(`FAQ question not visible: "${q.name}"`);
      if (!text.includes(norm(q.acceptedAnswer?.text).slice(0, 80))) err(`FAQ answer not visible for "${q.name}"`);
    }
  }
  for (const art of byType('Article')) {
    const h1 = norm(((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '').replace(/<[^>]+>/g, ''));
    if (norm(art.headline) !== h1) err('Article.headline ≠ visible H1');
    if (art.author?.['@id'] !== `${SITE}/#organization`) err('Article.author must be the organisation');
    if (art.datePublished) err('Article.datePublished present — only add a genuine date');
  }
  const types = [...new Set(graph.map((n) => [].concat(n['@type'])[0]))];
  rows.push({ route, types: types.join(', '), result: pageErr.length ? `FAIL — ${pageErr.join('; ')}` : 'PASS' });
  pageErr.forEach((e) => errors.push(`${route}: ${e}`));
}

rows.sort((a, b) => a.route.localeCompare(b.route));
const counts = {};
rows.forEach((r) => r.types.split(', ').forEach((t) => { counts[t] = (counts[t] || 0) + 1; }));
const md = `# Structured data validation report

- **Checked:** ${rows.length} pre-rendered pages in \`build/\` (${new Date().toISOString().slice(0, 10)})
- **Result:** ${errors.length ? `❌ ${errors.length} problem(s)` : '✅ all checks passed'}
- **Types used:** ${Object.entries(counts).filter(([t]) => !t.startsWith('—')).map(([t, n]) => `${t} (${n} pages)`).join(' · ')}

## What is checked
1. Exactly one JSON-LD block per indexable page; valid JSON; \`@context\` = https://schema.org.
2. **Organization** on every page: name "${EXPECT.name}", url ${EXPECT.url}, email ${EXPECT.email}, telephone ${EXPECT.telephone},
   parent organisation "${EXPECT.parent}", logo file exists, areaServed = ${EXPECT.areaServed.join(', ')}, **no location / address**.
3. **WebSite** node and publisher reference.
4. **WebPage**: \`@id\`/url equal the canonical URL, name equals \`<title>\`, description equals the meta description.
5. **BreadcrumbList**: sequential positions, last item = page URL, every crumb name visible on the page.
6. **Service**: provider = organisation, description = the page's meta description, name reflected in visible content.
7. **FAQPage**: every question and answer is visible on the page.
8. **Article**: headline = visible H1, author/publisher = organisation, no invented publication date.
9. No \`AggregateRating\`, \`Review\`, \`Rating\`, \`LocalBusiness\`, \`PostalAddress\`, \`address\`, \`award\`, \`hasCredential\`, employee counts or founding dates anywhere.
10. Every internal \`@id\` reference resolves within the page's graph. \`noindex\` pages carry no structured data.

## Google eligibility notes
- **FAQPage:** valid markup that matches visible content, but since 2023 Google shows FAQ rich results only for a small set of authoritative
  government and health sites — do not expect FAQ rich results for ypnova.com.
- **BreadcrumbList** is the type most likely to produce a visible rich result (breadcrumb trail in search results).
- **LocalBusiness** is deliberately not used: YP Nova has no customer-facing office or verified street address.
- Final confirmation should be done after deployment with Google's Rich Results Test (https://search.google.com/test/rich-results) and
  https://validator.schema.org for a sample of URLs.

## Results by page

| Page | Types | Result |
|---|---|---|
${rows.map((r) => `| ${r.route} | ${r.types} | ${r.result.replace(/\|/g, '\\|')} |`).join('\n')}
`;
fs.writeFileSync(path.join(ROOT, 'docs', 'STRUCTURED-DATA-REPORT.md'), md);
console.log(`[structured-data] ${rows.length} pages checked: ${errors.length ? `${errors.length} problem(s)` : 'all passed'} → docs/STRUCTURED-DATA-REPORT.md`);
errors.slice(0, 40).forEach((e) => console.error(`[structured-data] ERROR: ${e}`));
process.exit(errors.length ? 1 : 0);
