# YP Nova — Technical SEO Audit & Implementation Report

Site: **https://ypnova.com** · Audit date: 16–17 Nov 2026 · Scope: the live deployment (React SPA built
from this project) and this source code.

---

## 1. Domain verification

| Check | Result (live, before this release) |
|---|---|
| `https://ypnova.com/` | 200 — serves the site. **Confirmed as the production domain.** |
| `https://www.ypnova.com/` | 200 — serves the same site. **Duplicate host, no redirect.** |
| `http://…` (plain HTTP) | Could not be tested from my environment (HTTPS-only network). See §6. |
| Hosting | MilesWeb, behind an `openresty` edge (`x-mw-edge: edge-bom1`); `.htaccess` rewrites are honoured. |

Chosen canonical form: **`https://ypnova.com/path`** — HTTPS, no `www`, no trailing slash.

## 2. Your listed findings — verified

| # | Your finding | Verified? | Detail |
|---|---|---|---|
| 1 | Homepage title and description exist | ✅ Yes | One generic title/description in `index.html`. |
| 2 | Page metadata updated by JavaScript after render | ✅ Yes | `useSeo` set titles in the browser only; the HTML every URL returned had the home page's title. |
| 3 | `site-config.js` has an empty siteUrl | ⚠️ Partly | `site-config.js` holds the Google Sheets URL, not a siteUrl. The site URL came from `REACT_APP_SITE_URL`, which was empty — so the effect you describe was real: **no canonical tags, no absolute URLs, no sitemap**. |
| 4 | No `sitemap.xml` | ✅ Yes | Worse: `/sitemap.xml` returned the home page with **HTTP 200**. |
| 5 | `robots.txt` has no Sitemap line | ✅ Yes | |
| 6 | Existing routes | ✅ Yes | Plus case-study, 12 industry and 9 article sub-pages. |
| 7 | Industry pages dynamically routed | ✅ Yes | `/industries/:slug`. |
| 8 | Organization JSON-LD partial | ✅ Yes | Only on 3 pages, without `url` or `logo` (no site URL). |
| 9 | Client-rendered React | ✅ Yes | Every URL returned an empty `<div id="root">`. |

## 3. Additional issues found

| Issue | Impact | Fix in this release |
|---|---|---|
| Every unknown URL returned **200** with the home page ("soft 404") | Wasted crawl, junk URLs indexed | Real **HTTP 404** + `404.html` (noindex) |
| `www`, `/contact/`, `/index.html`, `?utm=` variants all 200 | Duplicate URLs | 301 redirects + self-referencing canonicals |
| `og:image` pointed to an empty-domain URL | Broken link previews | Absolute `https://ypnova.com/…` image, per-page OG/Twitter tags |
| No page targeted the commercial searches you listed | No relevance for those queries | 6 service landing pages + 6 solution pages (§5) |
| Solutions existed only as `#anchors` on one page | Not indexable individually | Dedicated URLs `/solutions/…` |
| Google Fonts loaded render-blocking from a third party | Slower first paint | Fonts self-hosted, Latin subsets, key fonts preloaded |
| Secondary text contrast 4.38:1 on lavender bands | Accessibility (WCAG AA fail) | `#64748B` → `#5B697F` (5.1:1+) |
| Four "Learn More" links with no descriptive text | Lighthouse SEO "link text" fail | Descriptive text added |
| Draft legal pages indexable | Thin/unfinished content indexed | `noindex` until reviewed |
| No breadcrumbs schema; JSON-LD on 3 pages only | Missed context for Google | Full JSON-LD graph on every page |
| Hero headline faded in from opacity 0 | Late LCP | Pre-rendered pages show content immediately |

No accidental `noindex`, no blocked CSS/JS and no broken internal links were found on the live site.

## 4. The JavaScript SEO fix — static pre-rendering

MilesWeb shared hosting cannot run a Node.js server, so **static pre-rendering** was chosen over SSR.

How it works (`scripts/prerender.js`, runs automatically in `npm run build`):

1. After the normal React build, the script opens every public URL in headless Chromium. It starts at `/`
   and follows every internal link, so a newly linked page is captured automatically.
2. It saves the **fully rendered HTML** of each page, including its own `<title>`, meta description,
   canonical URL, Open Graph tags and JSON-LD, to `index.html` (home) and `_pages/<url>.html`.
3. `.htaccess` maps each clean URL (e.g. `/custom-erp-development`) to its saved file. Visitors and
   Google get complete HTML in the first response.
4. In the browser, React **hydrates** that HTML — it attaches to the existing page rather than redrawing
   it — so content appears immediately and the page then behaves exactly as before. Pre-rendered and
   live content come from the same components, so they cannot drift apart.
5. The build **fails** if any internal link leads to a 404, if titles or descriptions are duplicated, if a
   canonical is wrong, if a page doesn't have exactly one H1, if an image lacks alt text or if JSON-LD is
   invalid.

## 5. Pages added or upgraded

- **6 service landing pages:** `/custom-software-development`, `/agentic-ai-development`,
  `/custom-erp-development`, `/business-process-automation`, `/saas-development`, `/data-analytics`.
  Each has 1,000–1,700 words, a comparison or process section, FAQs and an explicit
  "delivered vs custom development" box.
- **6 solution pages:** `/solutions/visitor-management-system`, `management-information-system`,
  `work-permit-management-system`, `complaint-management-system`, `inventory-management-system`,
  `procurement-management-system`.
- **12 industry pages:** unique SEO titles and descriptions, links to related services, and a related
  case study or labelled concept.
- **Insights:** 4 new articles (agentic AI, custom ERP, before building a SaaS product, connecting
  departments). 6 existing articles were retitled to your topic list and linked to service pages.
  There are no invented authors or dates.
- **Contact:** "Areas we serve" section, verified map, call and WhatsApp.
- **Internal linking:** the home page links to all six service pages. Service pages link to solutions,
  industries, services and articles. Solution pages link to industries and services. Industry pages
  link to services, solutions and the case study. Articles link inline and via a "Related service" box.
  Deep pages have visible breadcrumbs.

## 6. Redirects and status codes (tested on real Apache 2.4 with the generated `.htaccess`)

| Request | Result |
|---|---|
| `/contact` · `/industries/construction-mep` · `/solutions/visitor-management-system` | 200, page's own HTML |
| `/contact/` (trailing slash) | 301 → `https://ypnova.com/contact` |
| `/index.html` | 301 → `https://ypnova.com/` |
| `www.ypnova.com/about` | 301 → `https://ypnova.com/about` |
| Request marked as plain HTTP by the edge (`X-Forwarded-Proto: http`) | 301 → HTTPS |
| `/_pages/contact.html` (internal file) | 301 → `/contact` |
| `/contact?utm_source=x` | 200 + canonical `https://ypnova.com/contact` |
| `/does-not-exist`, `/industries/not-real` | **404** with the site's 404 page |
| `/sitemap.xml`, `/robots.txt` | 200, correct content types |
| Hashed JS/CSS | `Cache-Control: max-age=31536000, immutable`; HTML `no-cache`; gzip on |

**HTTP → HTTPS:** the rule only fires when MilesWeb's edge reports a plain-HTTP request, so it can never
cause a redirect loop. Also switch on **cPanel → Domains → Force HTTPS Redirect** for ypnova.com, and
confirm after deployment that `http://ypnova.com` lands on `https://ypnova.com`. I could not test this
from my environment.

## 7. Structured data

Every indexable page carries one JSON-LD `@graph`:

- **Organization** (`#organization`): name, URL, logo, slogan, description, phone, email, parent
  company, contact point, areas served, and a Place with the verified Maps pin. There is **no street
  address, rating, review or award**.
- **WebSite**, plus a **WebPage** (AboutPage / ContactPage / CollectionPage where relevant).
- **BreadcrumbList** on all inner pages, matching the visible breadcrumbs.
- **Service** on service, solution and industry pages.
- **FAQPage** on pages with visible FAQs. This markup is valid, but since 2023 Google shows FAQ rich
  results only for a small set of authoritative sites. **Do not expect FAQ rich results.**
- **Article** on insights. Author and publisher are the organisation; no dates are given because none
  are verified.
- **LocalBusiness is deliberately not used**: it requires a verified postal address.

Validation done here: all JSON-LD parses, the required properties are present, and the build fails on
invalid JSON. **Still to do (needs internet access to Google):** run 3–4 URLs through
https://search.google.com/test/rich-results and https://validator.schema.org after deployment.

## 8. Test results

| Test | Result |
|---|---|
| Production build + pre-render | ✅ 48 pages, 46 indexable, 0 errors, 0 warnings |
| Unique titles / descriptions | ✅ No duplicates; titles ≤ 65 chars; descriptions 70–165 chars |
| Canonical = own clean URL | ✅ All 46 indexable pages |
| One H1 per page | ✅ All pages |
| Images without alt | ✅ None |
| Internal links | ✅ Every internal link resolves (the build fails otherwise) |
| Hydration | ✅ No mismatches on 49 pages × 2 viewports; H1 never replaced |
| Client navigation | ✅ Title, canonical and JSON-LD update on every route change |
| Responsive | ✅ 48 routes × 9 widths (320–1920 px), 0 overflow/overlap problems |
| Contact form | ✅ Email fallback mode and Google Sheets mode both work |
| Lighthouse (mobile, simulated slow 4G, local Apache) | SEO **100**, Accessibility **100**, Best Practices **100** on all 7 pages tested. Performance: home 79, inner pages 89–92. CLS 0–0.08. |

**Not verified (cannot be done from here):** Google Search Console indexing, the Rich Results Test,
PageSpeed Insights on the real host, physical phones and Safari/iOS. Lighthouse figures will differ on
the live server.

## 9. All pages

| URL | Title | Desc. chars | Words | Indexing |
|---|---|---|---|---|
| `/` | YP Nova \| Custom Software, ERP & AI Development Company | 137 | 1435 | index |
| `/about` | About YP Nova \| Custom Software & AI Development | 164 | 684 | index |
| `/agentic-ai-development` | Agentic AI & AI Agent Development Services \| YP Nova | 148 | 1237 | index |
| `/business-process-automation` | Business Process Automation Services \| YP Nova | 159 | 918 | index |
| `/case-studies` | Case Studies \| Business Software Projects \| YP Nova | 144 | 754 | index |
| `/case-studies/integrated-digital-operations` | Integrated Digital Operations System — Case Study \| YP Nova | 159 | 569 | index |
| `/contact` | Contact YP Nova \| Call, WhatsApp or Visit | 154 | 299 | index |
| `/custom-erp-development` | Custom ERP Development Company \| ERP Software Solutions \| YP Nova | 142 | 1309 | index |
| `/custom-software-development` | Custom Software Development Company in India \| YP Nova | 150 | 1062 | index |
| `/data-analytics` | MIS Software & Power BI Dashboard Development \| YP Nova | 149 | 800 | index |
| `/industries` | Software Solutions by Industry \| YP Nova | 151 | 616 | index |
| `/industries/construction-mep` | Construction & MEP Software Solutions \| YP Nova | 163 | 479 | index |
| `/industries/education` | Education Management Software Development \| YP Nova | 137 | 349 | index |
| `/industries/facility-management` | Facility Management Software Development \| YP Nova | 145 | 472 | index |
| `/industries/healthcare` | Healthcare Operations Software \| YP Nova | 146 | 409 | index |
| `/industries/hospitality` | Hospitality Operations Software \| YP Nova | 148 | 355 | index |
| `/industries/logistics` | Logistics Software Development \| YP Nova | 151 | 363 | index |
| `/industries/manufacturing` | Manufacturing Software & Automation Solutions \| YP Nova | 160 | 441 | index |
| `/industries/professional-services` | Software for Professional Services Firms \| YP Nova | 149 | 345 | index |
| `/industries/real-estate` | Real Estate & Property Management Software \| YP Nova | 139 | 383 | index |
| `/industries/retail` | Retail Inventory & Operations Software \| YP Nova | 120 | 379 | index |
| `/industries/security-services` | Security Operations Software Solutions \| YP Nova | 152 | 418 | index |
| `/industries/startups-growing-businesses` | Software Development for Startups & Growing Businesses \| YP Nova | 148 | 405 | index |
| `/insights` | Insights: Custom Software, ERP, AI & Automation \| YP Nova | 148 | 611 | index |
| `/insights/ai-in-business-operations` | Where AI Helps in Day-to-Day Business Operations \| YP Nova | 147 | 287 | index |
| `/insights/before-building-a-saas-product` | Before Building a SaaS Product: What to Consider \| YP Nova | 160 | 322 | index |
| `/insights/benefits-of-custom-business-software` | What custom business software actually gives you \| YP Nova | 139 | 321 | index |
| `/insights/business-workflow-automation` | Business Process Automation: A Practical Guide \| YP Nova | 110 | 226 | index |
| `/insights/custom-erp-development-guide` | Custom ERP Development: Modules & Implementation \| YP Nova | 140 | 384 | index |
| `/insights/custom-software-vs-saas` | Custom Software vs Off-the-Shelf Software \| YP Nova | 140 | 278 | index |
| `/insights/digital-visitor-management` | Visitor Management Systems for Facility Operations \| YP Nova | 158 | 230 | index |
| `/insights/how-custom-software-connects-departments` | How Custom Software Connects Business Departments \| YP Nova | 155 | 315 | index |
| `/insights/power-bi-business-reporting` | Power BI Dashboards for Operational Reporting \| YP Nova | 139 | 201 | index |
| `/insights/technology-for-growing-businesses` | Technology priorities for a growing business \| YP Nova | 123 | 207 | index |
| `/insights/what-is-agentic-ai` | What Is Agentic AI? AI Agents for Business \| YP Nova | 141 | 434 | index |
| `/insights/why-businesses-need-mis-dashboards` | How MIS Software Improves Business Operations \| YP Nova | 158 | 294 | index |
| `/insights/work-permit-automation` | How to Automate Work Permit Management \| YP Nova | 111 | 272 | index |
| `/privacy` | Privacy Policy (Draft) \| YP Nova | 83 | 488 | noindex |
| `/saas-development` | SaaS Application Development Company \| YP Nova | 150 | 872 | index |
| `/services` | Software Development Services: ERP, AI & SaaS \| YP Nova | 149 | 848 | index |
| `/solutions` | Business Software Solutions: VMS, MIS & ERP \| YP Nova | 140 | 2144 | index |
| `/solutions/complaint-management-system` | Complaint Management System Software \| YP Nova | 145 | 481 | index |
| `/solutions/inventory-management-system` | Inventory Management System Development \| YP Nova | 162 | 443 | index |
| `/solutions/management-information-system` | Management Information System (MIS) Software \| YP Nova | 142 | 509 | index |
| `/solutions/procurement-management-system` | Procurement Management System \| Purchase Order Software \| YP Nova | 161 | 424 | index |
| `/solutions/visitor-management-system` | Visitor Management System Software \| YP Nova | 154 | 533 | index |
| `/solutions/work-permit-management-system` | Work Permit Management System Software \| YP Nova | 156 | 491 | index |
| `/terms` | Terms of Service (Draft) \| YP Nova | 51 | 436 | noindex |


## 10. Items needing your approval or information

1. **Map pin:** the Maps link resolves to "Green Meadows By Qualcon". It is used in Organization schema
   as a Place (name + coordinates only). Confirm it is the public business location.
2. **Areas served:** Mumbai, Navi Mumbai, Maharashtra and India are shown on Contact and in schema
   (`src/config/seo.js → areaServed`). Confirm they are genuine; Panvel was not added because it is
   unconfirmed.
3. **Google Search Console:** add the property and verify by DNS (see `GOOGLE-SEARCH-CONSOLE-GUIDE.md`).
   Optional HTML-tag token field: `src/config/seo.js → googleSiteVerification`.
4. **GA4 Measurement ID** (optional): see `ANALYTICS-SETUP.md`. If enabled, update the Privacy Policy.
5. **Social profile URLs:** none are published. Add verified ones to `src/config/company.js → social`
   (they then appear on the site and in `sameAs`).
6. **Google Business Profile:** create or claim it with exactly the same name, phone, website and
   categories (see `OFF-PAGE-SEO-CHECKLIST.md`).
7. **Legal pages:** `noindex` until reviewed. After approval, set `noindex: false` in
   `src/pages/Legal.jsx` and rebuild.
8. **Client name permission (Reliable Group):** still anonymised.
9. **Secondary text colour:** changed from `#64748B` to `#5B697F` to pass accessibility contrast. It is
   visually almost identical; confirm you are happy with it.
10. **Content review:** the new service pages, solution FAQs and articles were written for this release.
    Please review them for accuracy and tone, especially the agentic AI and ERP pages, which clearly
    state that those are offered as custom development.
11. **`contentUpdated` date** in `src/config/seo.js` drives sitemap `<lastmod>`. Update it whenever page
    content changes meaningfully.

**No ranking position can be promised.** These changes make the site fully crawlable, indexable and
relevant to the target searches. Rankings then depend on competition, Google's evaluation, and off-page
signals such as genuine reviews and mentions.
