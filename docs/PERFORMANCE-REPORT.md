# Performance & mobile validation report

Measured 17 Nov 2026 on the final build served by Apache 2.4 (same `.htaccess`) in a local test environment.
**These are lab measurements, not real-user data**; results on MilesWeb will differ (network, edge cache). Field data appears later in Search
Console → Core Web Vitals.

## Lighthouse (mobile emulation, simulated slow 4G, mid-range CPU)

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 78 | 100 | 100 | 100 | 3.4 s | 0.006 | 500 ms |
| `/custom-software-development` | 89 | 100 | 100 | 100 | 3.3 s | 0 | 190 ms |
| `/custom-erp-development` | 89 | 100 | 100 | 100 | 3.3 s | 0 | 190 ms |
| `/case-studies/integrated-digital-operations` | 86 | 100* | 100 | 100 | 3.4 s | 0.007 | 280 ms |
| `/solutions/visitor-management-system` | 92 | 100 | 100 | 100 | 3.2 s | 0.022 | 150 ms |
| `/contact` | 85 | 100 | 100 | 100 | 3.4 s | 0 | 310 ms |

\* 98 before the heading-order fix in this release; 100 after (re-measured). CLS stays well below Google's 0.1 "good" threshold on all
pages. First Contentful Paint is 1.4–1.5 s on all pages.

## What keeps it fast
| Area | Implementation |
|---|---|
| Rendering | Every public page is pre-rendered HTML; React hydrates it without re-drawing, so content is visible before JavaScript runs. |
| JavaScript | Main bundle 210 KB gzipped. The four product demos are a **separate 13.6 KB chunk** loaded only when a demo scrolls near the screen; pages without demos never download it. |
| CSS | One 13 KB (gzipped) stylesheet. |
| Fonts | Self-hosted Manrope/Inter variable fonts + Cormorant/IBM Plex subsets; the two above-the-fold fonts are preloaded; `font-display: swap`. No third-party font requests. |
| Images | WebP logos with explicit width/height; decorative visuals are CSS/HTML (no image downloads); social image 45 KB JPEG. |
| Layout stability | Demo placeholders reserve the demos' space; pre-rendered pages skip entrance-animation replays. |
| Caching | Hashed JS/CSS/fonts `max-age=1 year, immutable`; images 30 days; HTML, sitemap and `site-config.js` revalidated on every request. |
| Compression | gzip for HTML, CSS, JS, JSON, XML and SVG (`mod_deflate`). |
| Animations & cursor | Kept. The custom cursor runs only for mouse/trackpad users, idles when the pointer is still, and is off for touch devices and reduced-motion users. |

## Mobile & responsive validation
- 48 routes × 9 widths (320, 360, 390, 430, 768, 1024, 1280, 1440, 1920 px): **no horizontal scrolling, overflow or overlapping elements**.
- The four demos fully loaded at the same 9 widths: no overflow; tables become labelled cards on phones; no table/button text below 11 px;
  tapping a record on a phone scrolls to its detail panel.
- Touch targets ≥ 44 px for navigation, buttons and contact links on mobile layouts.
- Forms: single column on phones, 16 px inputs (no iOS zoom), clear errors.
- Hydration: no mismatches on 49 pages at desktop and mobile widths.
- **Not tested:** physical devices, iOS Safari, Firefox. Please check on one Android phone and one iPhone after deployment.

## Where the remaining performance cost is
The home page scores lowest because of its heavier interactive sections (animated dashboard, carousel) and the size of the main bundle
on a slow simulated CPU. Possible next steps, not done because they risk behaviour changes without a clear user-visible gain: route-level code
splitting for the large content pages, and deferring the home page's animated dashboard until it is in view.
