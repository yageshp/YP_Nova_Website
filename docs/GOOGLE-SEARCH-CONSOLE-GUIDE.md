# Google Search Console — setup & monitoring guide for ypnova.com

**Property:** Domain property `ypnova.com` · **Sitemap:** `https://ypnova.com/sitemap.xml`

Readiness was checked on 17 Nov 2026 (`docs/URL-VALIDATION-REPORT-LIVE-baseline.md`) against the live site: the sitemap is valid XML with 46
canonical URLs (48 after the final release, which adds the approved Privacy Policy and Terms), all return HTTP 200 with a self-referencing canonical, `robots.txt` blocks nothing and points to the sitemap, CSS/JS are
crawlable, `www`/trailing-slash/`index.html` variants 301 to the canonical URL, unknown URLs return a real 404. Re-run the check after every deployment:

```bash
NODE_USE_ENV_PROXY=1 node scripts/validate-urls.js          # live → docs/URL-VALIDATION-REPORT.md
```

Nothing below has been done on your behalf: no Google account was accessed and no DNS was changed.

## 1. Add a Domain property
https://search.google.com/search-console → **Add property** → **Domain** → enter `ypnova.com` → Continue.

## 2. Verify ownership through DNS
Copy the TXT value Google shows (`google-site-verification=…`).
MilesWeb → **Hosting → Manage → cPanel → Zone Editor → ypnova.com → Manage → + Add Record → TXT**
- Name: `ypnova.com.` · TTL: default · Record: the full value → **Save** → back in Search Console click **Verify**.
DNS can take up to 48 hours. Keep the record permanently. (Your domain uses MilesWeb's nameservers, so the record goes in cPanel, not in
the domain panel.)

## 3. Submit the sitemap
**Indexing → Sitemaps** → enter the **full URL** `https://ypnova.com/sitemap.xml` → **Submit**.
(A Domain property needs the full URL; typing only `sitemap.xml` gives "Invalid sitemap address".)
Expect **Success** with 48 discovered pages. "Couldn't fetch" in the first hours is normal.

## 4. Inspect the homepage
Top search bar (**URL inspection**) → `https://ypnova.com/` → **Test live URL** → **View tested page**: the screenshot shows the full page and
the HTML contains the title *YP Nova | Custom Software, ERP & AI Development Company*. Check *Page fetch: Successful*, *Indexing allowed:
Yes*, *User-declared canonical: https://ypnova.com/* → **Request indexing**.

## 5. Inspect important service and solution pages
Google allows roughly 10 manual requests a day — spread these over two days:

| Day 1 | Day 2 |
|---|---|
| https://ypnova.com/custom-software-development | https://ypnova.com/solutions/visitor-management-system |
| https://ypnova.com/custom-erp-development | https://ypnova.com/solutions/management-information-system |
| https://ypnova.com/agentic-ai-development | https://ypnova.com/solutions/work-permit-management-system |
| https://ypnova.com/business-process-automation | https://ypnova.com/solutions/complaint-management-system |
| https://ypnova.com/saas-development | https://ypnova.com/case-studies/integrated-digital-operations |
| https://ypnova.com/data-analytics | https://ypnova.com/contact |

## 6. Inspect industry pages
Day 3: the four focus industries, then the rest as quota allows —
`/industries/facility-management`, `/industries/construction-mep`, `/industries/security-services`, `/industries/manufacturing`.
The sitemap covers all remaining pages; manual requests only speed up the first crawl.

## 7. Request indexing for new or changed pages
After each deployment that adds or changes a page: run `scripts/validate-urls.js`, then **URL inspection → Request indexing** for the
new/changed URLs. The sitemap's `<lastmod>` only changes for pages whose content changed, which helps Google prioritise them.

## 8. Review Page indexing (weekly at first)
**Indexing → Pages.** Indexed count should rise towards ~48 over the following weeks.
- *Excluded by 'noindex' tag*: should be empty (only the 404 page carries noindex).
- *Page with redirect*: expected for `www`/trailing-slash variants.
- *Not found (404)*: expected only for URLs that never existed.
- *Discovered/Crawled – currently not indexed*: common for a new site; improves with time, internal links and genuine external mentions.
- *Duplicate without user-selected canonical* or *Alternate page with proper canonical*: should not appear for sitemap URLs — tell me if they do.

## 9. Review Core Web Vitals (monthly)
**Experience → Core Web Vitals.** Data appears only after enough real Chrome visitors (often weeks or months for a new site). Lab results from
this release are in `PERFORMANCE-REPORT.md`; field data from real users is what Google uses.

## 10. Review Search performance (weekly)
**Performance → Search results**: clicks, impressions, CTR and average position. Use **+ New → Page** to view one service page, and
**Queries** to see the searches you appear for. Compare 28-day periods; daily numbers are noisy for a new site.

## 11. Monitor search queries
Each month export the Queries table and note:
- target phrases appearing with impressions (e.g. "custom erp development", "visitor management system") — see `SEO-KEYWORD-MAP.md`;
- queries with impressions but few clicks — improve that page's title/description;
- new, relevant questions people search — candidates for Insights articles.

**Do not treat any page as indexed until the Pages report or URL inspection says "URL is on Google".** No ranking position can be guaranteed.
