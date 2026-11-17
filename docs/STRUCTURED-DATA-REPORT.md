# Structured data validation report

- **Checked:** 48 pre-rendered pages in `build/` (2026-11-17)
- **Result:** ✅ all checks passed
- **Types used:** Organization (48 pages) · WebSite (48 pages) · WebPage (41 pages) · AboutPage (1 pages) · BreadcrumbList (47 pages) · Service (24 pages) · FAQPage (12 pages) · CollectionPage (5 pages) · ContactPage (1 pages) · Article (13 pages)

## What is checked
1. Exactly one JSON-LD block per indexable page; valid JSON; `@context` = https://schema.org.
2. **Organization** on every page: name "YP Nova", url https://ypnova.com/, email info@ypnova.com, telephone +918291419044,
   parent organisation "YP Security Services Pvt. Ltd.", logo file exists, areaServed = Mumbai, Navi Mumbai, Maharashtra, India, **no location / address**.
3. **WebSite** node and publisher reference.
4. **WebPage**: `@id`/url equal the canonical URL, name equals `<title>`, description equals the meta description.
5. **BreadcrumbList**: sequential positions, last item = page URL, every crumb name visible on the page.
6. **Service**: provider = organisation, description = the page's meta description, name reflected in visible content.
7. **FAQPage**: every question and answer is visible on the page.
8. **Article**: headline = visible H1, author/publisher = organisation, no invented publication date.
9. No `AggregateRating`, `Review`, `Rating`, `LocalBusiness`, `PostalAddress`, `address`, `award`, `hasCredential`, employee counts or founding dates anywhere.
10. Every internal `@id` reference resolves within the page's graph. `noindex` pages carry no structured data.

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
| / | Organization, WebSite, WebPage | PASS |
| /about | Organization, WebSite, AboutPage, BreadcrumbList | PASS |
| /agentic-ai-development | Organization, WebSite, WebPage, BreadcrumbList, Service, FAQPage | PASS |
| /business-process-automation | Organization, WebSite, WebPage, BreadcrumbList, Service, FAQPage | PASS |
| /case-studies | Organization, WebSite, CollectionPage, BreadcrumbList | PASS |
| /case-studies/integrated-digital-operations | Organization, WebSite, WebPage, BreadcrumbList | PASS |
| /contact | Organization, WebSite, ContactPage, BreadcrumbList | PASS |
| /custom-erp-development | Organization, WebSite, WebPage, BreadcrumbList, Service, FAQPage | PASS |
| /custom-software-development | Organization, WebSite, WebPage, BreadcrumbList, Service, FAQPage | PASS |
| /data-analytics | Organization, WebSite, WebPage, BreadcrumbList, Service, FAQPage | PASS |
| /industries | Organization, WebSite, CollectionPage, BreadcrumbList | PASS |
| /industries/construction-mep | Organization, WebSite, WebPage, BreadcrumbList, Service | PASS |
| /industries/education | Organization, WebSite, WebPage, BreadcrumbList, Service | PASS |
| /industries/facility-management | Organization, WebSite, WebPage, BreadcrumbList, Service | PASS |
| /industries/healthcare | Organization, WebSite, WebPage, BreadcrumbList, Service | PASS |
| /industries/hospitality | Organization, WebSite, WebPage, BreadcrumbList, Service | PASS |
| /industries/logistics | Organization, WebSite, WebPage, BreadcrumbList, Service | PASS |
| /industries/manufacturing | Organization, WebSite, WebPage, BreadcrumbList, Service | PASS |
| /industries/professional-services | Organization, WebSite, WebPage, BreadcrumbList, Service | PASS |
| /industries/real-estate | Organization, WebSite, WebPage, BreadcrumbList, Service | PASS |
| /industries/retail | Organization, WebSite, WebPage, BreadcrumbList, Service | PASS |
| /industries/security-services | Organization, WebSite, WebPage, BreadcrumbList, Service | PASS |
| /industries/startups-growing-businesses | Organization, WebSite, WebPage, BreadcrumbList, Service | PASS |
| /insights | Organization, WebSite, CollectionPage, BreadcrumbList | PASS |
| /insights/ai-in-business-operations | Organization, WebSite, WebPage, BreadcrumbList, Article | PASS |
| /insights/before-building-a-saas-product | Organization, WebSite, WebPage, BreadcrumbList, Article | PASS |
| /insights/benefits-of-custom-business-software | Organization, WebSite, WebPage, BreadcrumbList, Article | PASS |
| /insights/business-workflow-automation | Organization, WebSite, WebPage, BreadcrumbList, Article | PASS |
| /insights/custom-erp-development-guide | Organization, WebSite, WebPage, BreadcrumbList, Article | PASS |
| /insights/custom-software-vs-saas | Organization, WebSite, WebPage, BreadcrumbList, Article | PASS |
| /insights/digital-visitor-management | Organization, WebSite, WebPage, BreadcrumbList, Article | PASS |
| /insights/how-custom-software-connects-departments | Organization, WebSite, WebPage, BreadcrumbList, Article | PASS |
| /insights/power-bi-business-reporting | Organization, WebSite, WebPage, BreadcrumbList, Article | PASS |
| /insights/technology-for-growing-businesses | Organization, WebSite, WebPage, BreadcrumbList, Article | PASS |
| /insights/what-is-agentic-ai | Organization, WebSite, WebPage, BreadcrumbList, Article | PASS |
| /insights/why-businesses-need-mis-dashboards | Organization, WebSite, WebPage, BreadcrumbList, Article | PASS |
| /insights/work-permit-automation | Organization, WebSite, WebPage, BreadcrumbList, Article | PASS |
| /privacy | Organization, WebSite, WebPage, BreadcrumbList | PASS |
| /saas-development | Organization, WebSite, WebPage, BreadcrumbList, Service, FAQPage | PASS |
| /services | Organization, WebSite, CollectionPage, BreadcrumbList | PASS |
| /solutions | Organization, WebSite, CollectionPage, BreadcrumbList | PASS |
| /solutions/complaint-management-system | Organization, WebSite, WebPage, BreadcrumbList, Service, FAQPage | PASS |
| /solutions/inventory-management-system | Organization, WebSite, WebPage, BreadcrumbList, Service, FAQPage | PASS |
| /solutions/management-information-system | Organization, WebSite, WebPage, BreadcrumbList, Service, FAQPage | PASS |
| /solutions/procurement-management-system | Organization, WebSite, WebPage, BreadcrumbList, Service, FAQPage | PASS |
| /solutions/visitor-management-system | Organization, WebSite, WebPage, BreadcrumbList, Service, FAQPage | PASS |
| /solutions/work-permit-management-system | Organization, WebSite, WebPage, BreadcrumbList, Service, FAQPage | PASS |
| /terms | Organization, WebSite, WebPage, BreadcrumbList | PASS |
