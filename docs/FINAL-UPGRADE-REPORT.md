# YP Nova — final SEO, credibility & product-demonstration upgrade

> **Update 17 Nov 2026 — legal pages approved.** The Privacy Policy and Terms of Service were approved by the company's legal adviser. The
> draft notice is removed, both pages are indexable with breadcrumbs, and they are now in the sitemap (**48 URLs**). Re-validated locally:
> 48/48 sitemap URLs, hydration on 49 pages, legal pages at 320–1920 px. Live validation runs after upload.

Date: 17 Nov 2026 · Site: https://ypnova.com · Builds on the live SEO release (`main.7c54345e.js`).

## 1. Audit before changes
- **Source of truth:** no new ZIP was uploaded, so I audited the live deployment, which is byte-for-byte my previous build; the React source in this
  project is therefore current. Backups were made before any change: `ypnova-backups/previous-deployment-2026-11-17-seo-v1.zip`, the matching
  source ZIP, and the live `site-config.js`.
- **Live baseline (real HTTP checks against https://ypnova.com):** all 46 sitemap URLs and 10 redirect/404/noindex/robots checks passed →
  `URL-VALIDATION-REPORT-LIVE-baseline.md`.
- **Live configuration:** Google Sheets enquiry integration is active; Google Analytics is not enabled (no Measurement ID).
- **Required changes identified:**
  1. Organization schema published the Maps pin as a `Place`, and the Contact page said "Visit YP Nova" with an embedded map — inaccurate for
     a business without a walk-in office.
  2. The legal pages contained `[To be confirmed]` placeholders.
  3. The case study used a generic animated dashboard; there were no realistic product demonstrations.
  4. The contact form had no preferred-contact field, no consent step and no spam protection.
  5. The service pages needed the specified keyword phrasing.
  6. There was no live URL-validation script, no structured-data validator, and no per-page `lastmod` dates.

## 2. What changed
| Area | Change |
|---|---|
| **Product demonstrations** | Four original, interactive React demos — **MIS** (dashboard, meter readings, site/type/period filters, role-based access switch, report previews, working CSV export, "billing removed from scope"), **Visitor Management** (today's visitors, check-in/out, working registration form, history with filters & search), **Work Permit** (register, approval workflow timeline, review/approve/return/start/close actions, new request form), **Complaint Management** (filters, detail panel, assign to department & person, status updates, resolution history, technician role view). All labelled *Illustrative interface — sample data*, fictional records only, no network calls. Loaded as a separate 13.6 KB chunk only when scrolled near. |
| **Architecture graphic** | Responsive diagram of people → modules → data/stack → outputs; technology mapped to a module only where confirmed. |
| **Case study** | Rebuilt with the requested headline/subtitle and 13 sections (overview, context, challenges, architecture, 4 demos, stack, integration, delivery approach, business value, CTA), in-page section menu, verified facts per module, qualitative value only, and the confidentiality note. |
| **Solution pages** | VMS, MIS, Work Permit and Complaint pages embed their demo; home page links to the demos. |
| **Trust section** | Home carousel is now **"How We Approach Every Project"** (6 stages); also used in the case study. No reviews, logos or testimonials. |
| **Contact** | Service-area / by-appointment wording, no walk-in office, no embedded map; exact Maps link + directions only for scheduled meetings; website link; phone, WhatsApp and email links. |
| **Enquiry form** | Fields: full name, company, work email, phone, industry, required service, project description, approximate budget, **preferred contact method** (phone required for call/WhatsApp), **consent checkbox** linking to the Privacy Policy, **honeypot + minimum fill-time** spam protection. Google Sheets integration unchanged and compatible; optional Apps Script v2 adds a column and server-side spam filter. GA4 lead event now includes the preferred method. |
| **Structured data** | Organization `location`/`Place` removed; no address, ratings, reviews, awards or LocalBusiness anywhere. New validator (`scripts/validate-structured-data.js`) runs in every build → `STRUCTURED-DATA-REPORT.md`. |
| **Keywords** | Six service pages: titles, H1s, intros, H2s and FAQs updated with the specified phrases, written naturally (see `SEO-KEYWORD-MAP.md`). Custom software → "Custom Software Development Services in India" / H1 "Custom Software Development Services for Growing Businesses"; ERP → "Custom ERP Development Services in India" / H1 "Custom ERP Development for Connected Business Operations". |
| **Legal** | Privacy Policy and Terms rewritten from the site's actual behaviour (Google Apps Script → Google Sheet + Gmail notification, MilesWeb hosting logs, no cookies, analytics not enabled, self-hosted fonts, WhatsApp/Maps only when clicked, demos stay in the browser). No placeholders, no invented retention periods, certifications or compliance claims. Still `noindex` and marked "Draft — awaiting legal review"; excluded from the sitemap. Review copies in `docs/legal/`. |
| **Sitemap `lastmod`** | Genuine per-page dates: each page's content fingerprint is stored in `seo-lastmod.json`; a page's date changes only when its visible content, title or description changes (verified stable across identical rebuilds). |
| **URL validation** | `scripts/validate-urls.js` checks status, final URL, redirect loops, canonical, robots, title, description, real HTML, rendered content (≥150 words, not the 404 page), sitemap membership, plus required 301s/404s/noindex pages. |
| **Accessibility** | Heading order fixed inside demos and the diagram; demo tables are readable cards on phones. |

## 3. Test results (final build)
| Test | Result |
|---|---|
| Build + pre-render + structured-data validation | ✅ 48 pages, 46 indexable; structured data passes on all 48 (validator also proven to catch planted errors) |
| URL validation — **local Apache** | ✅ 46/46 sitemap URLs + 9 redirect/404/noindex checks (`URL-VALIDATION-REPORT-local.md`) |
| URL validation — **live site, this release** | ⏳ **Not yet run — this release is not deployed.** Run after upload (I can run it). Baseline of the current live site: ✅ passed. |
| Hydration | ✅ no mismatches on 49 pages × 2 viewports |
| Responsive | ✅ 48 routes × 9 widths; demo, contact and legal pages re-checked at 9 widths with demos loaded |
| Demos (desktop 1366 px & phone 360 px) | ✅ 38/38 interaction checks |
| Contact form | ✅ 11/11 (consent, preferred contact, honeypot, bot-speed block, Sheets payload, no errors) |
| Lighthouse (mobile) | SEO 100 · Best Practices 100 · Accessibility 100 · Performance 78–92 (`PERFORMANCE-REPORT.md`) |

## 4. Deliverables index
1. Updated React source — `ypnova-website-source.zip`
2. Updated pre-rendered pages — inside `ypnova-final-deployment.zip` (`index.html`, `_pages/`)
3. Privacy Policy draft — website `/privacy`, `docs/legal/PRIVACY-POLICY.md`
4. Terms of Service draft — website `/terms`, `docs/legal/TERMS-OF-SERVICE.md`
5. Keyword optimisation — `SEO-KEYWORD-MAP.md`
6. `sitemap.xml` — in the deployment ZIP (46 URLs, genuine lastmod)
7. `robots.txt` — unchanged content (Allow all + Sitemap line)
8. URL validation script — `scripts/validate-urls.js`
9. URL validation reports — `URL-VALIDATION-REPORT-LIVE-baseline.md`, `URL-VALIDATION-REPORT-local.md`
10. Structured data report — `STRUCTURED-DATA-REPORT.md` (+ `scripts/validate-structured-data.js`)
11. Search Console guide — `GOOGLE-SEARCH-CONSOLE-GUIDE.md`
12. Google Business Profile checklist — `GOOGLE-BUSINESS-PROFILE-CHECKLIST.md`
13. Directory strategy — `DIRECTORY-SUBMISSION-STRATEGY.md`
14. Company descriptions (short/medium/long) — in the directory strategy
15. Four product demonstrations — `src/components/demos/`, live on the case study and solution pages
16. Updated case study — `/case-studies/integrated-digital-operations`
17. Responsive layouts — verified (see §3)
18. Contact form improvements — §2; Apps Script v2 in `docs/google-sheets/Code.gs`
19. Performance report — `PERFORMANCE-REPORT.md`
20. Deployment instructions — `DEPLOYMENT-SEO.md`
21. Actions requiring approval — §5

## 5. Actions requiring your approval or manual action
1. **Deploy** `ypnova-final-deployment.zip` (it does not overwrite your live `site-config.js`), then let me run live URL validation.
2. **Search Console:** add the Domain property, verify through a DNS TXT record, submit `https://ypnova.com/sitemap.xml`, and request
   indexing (see the guide). I have not accessed your Google account or DNS.
3. **Google Business Profile:** create it as a service-area business with a hidden address. Do not claim the "Green Meadows By Qualcon" place.
4. **Directories:** approve which platforms to list on. Nothing has been submitted, no accounts created, nothing purchased.
5. ~~Legal review~~ — **done** (approved 17 Nov 2026; draft notice removed, pages indexable). Optional: confirm whether the registered
   office address should appear on the legal pages.
6. **Apps Script v2** (optional) — adds the "Preferred contact" column and server-side spam filtering.
7. **Client permission** to name Reliable Group, show their logo, or publish real screenshots. Until then the case study stays anonymised
   and uses only the illustrative demos.
8. ~~Service areas~~ — **done:** changed to "clients across India and worldwide" (17 Nov 2026).
9. **GA4 Measurement ID** (optional). If you enable it, update the Privacy Policy *before* switching it on.
10. **Real customer reviews/testimonials:** ask real clients, then add them via `verifiedTestimonials` only with written permission.
11. **Content review** of the demo wording and the new service-page phrasing for accuracy.
12. **Physical device check** on one Android phone and one iPhone after deployment.

No statement in this report means pages are indexed, listings exist, or the live site has been validated for this release — each of those
must be confirmed after the steps above.
