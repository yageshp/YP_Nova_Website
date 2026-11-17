# YP Nova website

React single-page application for **YP Nova** — the technology brand of YP Security Services Pvt. Ltd.
*Your Imagination, Our Creation.*

Create React App 5 (via craco) · React 19 · React Router 7 · Tailwind CSS 3 · axios · lucide-react.
This is the same toolchain the original production build was made with; the source was recovered from
that build's source maps and upgraded (see `docs/REPORT.md`).

## Quick start

```bash
npm install
npm i -D playwright && npx playwright install chromium   # one-time: needed for SEO pre-rendering
cp .env.example .env      # then edit the values
npm start                 # development server on http://localhost:3000
npm run build             # production build + pre-rendered pages, sitemap.xml, robots.txt, .htaccess
```

Node 18 or newer is required (built and tested on Node 22).

### SEO build (pre-rendering)
`npm run build` runs `craco build` and then `scripts/prerender.js`, which saves fully rendered HTML for
every public page (unique title, description, canonical and JSON-LD), generates `sitemap.xml`,
`robots.txt`, `404.html` and the `.htaccess` routing rules, and **fails the build** on broken internal
links, duplicate titles or descriptions, wrong canonicals or invalid JSON-LD. Domain and SEO defaults live in
`src/config/seo.js`. See `docs/SEO-AUDIT-REPORT.md` and `docs/SEO-KEYWORD-MAP.md`.

## Configuration (`.env`)

| Variable | Purpose |
|---|---|
| `REACT_APP_BACKEND_URL` | Base URL of the backend that serves `POST /api/contact`. Empty = the form uses the "Send by email" fallback. |
| `REACT_APP_GA4_ID` | Optional GA4 Measurement ID (or set `ga4MeasurementId` in `public/site-config.js` without rebuilding). |
| `GENERATE_SOURCEMAP=false` | Keeps source maps out of the public build. |

Values are compiled into the bundle at build time — **rebuild after changing them**, and never put secrets here.

## Where things live

```
public/                 static files copied as-is (logo variants, favicon, .htaccess, robots.txt)
scripts/prerender.js    post-build pre-rendering + sitemap/robots/.htaccess generation and SEO checks
src/
  config/company.js     ← all company details: phone, email, Maps link, social, client-name permission
  config/seo.js         ← production domain, default titles, Search Console token, areas served
  data/                 page content: services, service landing pages, solutions, industries, case studies, insights
  components/
    layout/             TopNav, Footer, BottomNav
    common/             Button, PageShell, CtaBand, LocationCard, ConceptVisual, small UI bits
    sections/           home-page sections
    forms/              ContactForm
    animations/         CustomCursor, Reveal
  pages/                one file per route
  hooks/                useSeo, useInViewAnimation
  services/contact.js   contact API call (documents the backend contract)
  styles/index.css      design tokens, typography, cursor and animation styles
backup/                 the original uploaded build (zip) and the untouched recovered source
docs/REPORT.md          upgrade report and open items
```

### Common edits

- **Change phone / email / Maps link / add social links or working hours** → `src/config/company.js` (used everywhere).
- **Show the client's real name on the case study** (after written permission) → set
  `clientReferences.reliableGroup.approvedToPublish` to `true` in `src/config/company.js`.
- **Add a real testimonial or client logo** (with permission) → `verifiedTestimonials` in
  `src/components/sections/TestimonialCarousel.jsx`, `approvedLogos` in `src/components/sections/TrustedBySection.jsx`.
- **Add an article / industry / solution** → add an entry to the matching file in `src/data/`. Routes and the sitemap pick it up.
- **Colours and fonts** → `tailwind.config.js` and the `:root` block in `src/styles/index.css`.

## Deployment: GitHub → MilesWeb (current)

Pushing to `main` runs `.github/workflows/deploy.yml`: build, pre-render, SEO and structured-data checks, then the built site is committed to
the `deploy` branch, which MilesWeb's cPanel Git™ Version Control pulls and copies into `public_html` via `.cpanel.yml`.
Full setup and rollback steps: `docs/GITHUB-DEPLOYMENT.md`. Settings (Google Sheets URL, GA4 ID) live in `public/site-config.js`.

## Deploying to MilesWeb manually (ZIP upload — previous method)

1. Set `.env` (`REACT_APP_BACKEND_URL` only if an API backend is live), then run `npm run build`. Full SEO deployment steps: `docs/DEPLOYMENT-SEO.md`.
2. **Back up** the current contents of `public_html` (cPanel → File Manager → Compress → download).
3. Delete the old `static/` folder, `index.html` and `asset-manifest.json` from `public_html`.
4. Upload **everything inside** `build/` into `public_html` — including the hidden **`.htaccess`** file
   (enable "Show Hidden Files" in File Manager settings).
5. Open the site and hard-refresh (Ctrl/Cmd + Shift + R). Then test a deep link directly, e.g. `/contact` and
   `/industries/construction-mep` — they must load, not 404.

The supplied `.htaccess` keeps the existing MilesWeb error-page rule and adds the single-page-app rewrite
(without it, refreshing any page other than the home page returns 404 — this was missing from the old site),
plus cache headers and gzip.

If the site is ever served from a sub-folder instead of the domain root, set `"homepage": "/sub-folder"` in
`package.json` and change `RewriteBase` / the final `RewriteRule` in `.htaccess` to match.

## Contact form backend

The form posts JSON to `POST {REACT_APP_BACKEND_URL}/api/contact`:

```json
{ "name": "", "email": "", "company": "", "service": "", "budget": "", "message": "" }
```

This is the contract of the original site, unchanged. Optional phone and industry values are appended to
`message`. A `2xx` response shows the success state; any other response shows an error (a JSON `detail`
string is displayed if present) and keeps the visitor's input. The backend must allow CORS from the website's origin.

The backend is **not** part of this project. Until one is deployed and its URL is set, the form validates input
and offers "Send by email", which opens the visitor's mail app addressed to info@ypnova.com.
