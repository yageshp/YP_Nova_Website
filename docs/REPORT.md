# YP Nova website upgrade — delivery report

## 1. Starting point

The uploaded ZIP was a Create React App **production build** only (no source project, no backend).
All 27 original source files were recovered intact from the JavaScript and CSS source maps; the untouched
copies are in `backup/recovered-src/` and the uploaded ZIP is in `backup/original-public_html-build.zip`.

Reconstructed because they were not in the ZIP: `package.json`, craco / Tailwind / PostCSS config,
`public/index.html`, `.env`. Library versions were matched to the ones detected in the original bundle
(React 19, react-router 7.15, lucide-react 0.516, axios 1.16, Tailwind 3.4.17).

### Problems found in the live build

| Finding | What was done |
|---|---|
| Contact form posts to `undefined/api/contact` — `REACT_APP_BACKEND_URL` was not set when the live site was built, so **the live form cannot currently deliver enquiries**. | URL is read from `.env`; when it is missing the form says so and offers "Send by email" instead of failing silently. |
| `.htaccess` had no single-page-app rewrite: refreshing `/contact` or opening any deep link returns 404. | Rewrite added (MilesWeb error-page rule preserved). |
| Contact page embedded a map of **San Francisco**. | Replaced with the verified location from your Maps link. |
| Placeholder contact details (`hello@ypnova.example.com`, `+1 (000) 000-0000`), fake Calendly / LinkedIn / GitHub / x.com links. | Removed. Real phone, email and Maps link used everywhere from one config file. |
| Invented clients, people, photos, quotes, star rating, metrics, team and company statistics (list in §5). | Removed or converted to clearly labelled concepts. |
| Hot-linked third-party media (motionsites.ai GIFs, Unsplash and Pexels photos). | Removed; all visuals are now generated in code. No external images are loaded. |
| Custom cursor attached listeners to every element and re-attached on every DOM change; home hero and CTA re-rendered React on every mouse move. | Rewritten (see §4). |
| 1254 px logo JPEG (125 KB) downloaded for a ~90 px slot, three times per page. | Optimised WebP variants (5–14 KB). |

### Third-party scripts (please read)

The old `index.html` loaded two scripts that were injected by the Emergent app-builder platform:

1. `https://assets.emergent.sh/scripts/emergent-main.js` — builder tooling, not needed by the website. **Removed.**
2. A **PostHog** analytics snippet with **session recording switched on**, using a project key
   (a `phc_…` key) that appears to be the builder platform's default rather than one you own. It recorded
   visitor sessions with no notice on the site. **Not loaded by default any more.**

Analytics is now opt-in: set `REACT_APP_POSTHOG_KEY` to a PostHog project you control and it loads (with
session recording off). If you enable any analytics, the Privacy Policy draft must be updated to say so.
If you were relying on the old PostHog project, tell me and it can be re-enabled with one line in `.env`.

## 2. Components preserved, redesigned and added

**Preserved and refined** (same role, same API, restyled to the new design system):
`Button`, `PageShell` (PageHeader / Section), `TopNav`, `Footer` + `CopyrightBar`, `BottomNav`,
`AnimatedDashboard`, `TestimonialSection`, `WhyUsSection`, `ProcessSection`, `TechStackSection`,
`IndustriesStrip`, `PartnerSection`, `useInViewAnimation`, `CustomCursor`, React Query provider, routing.

**Redesigned because the content had to change:**

| Component | Before | Now |
|---|---|---|
| `TestimonialCarousel` | 5 invented customer quotes, stock photos, "4.9 · Clutch" | "The YP Nova Approach" — company-authored statements. Ready for real testimonials via `verifiedTestimonials`. |
| `TrustedBySection` | 7 fictional client wordmarks + "YOUR LOGO HERE" | Solution categories. Ready for approved logos via `approvedLogos`. |
| `PricingSection` | Placeholder "retainer / custom quote" cards | Four engagement models, no rates, "Request a Project Estimate". |
| `AnimatedDashboard` | Dark window with fake MRR / latency / uptime | Light operations dashboard, labelled "Illustrative · sample data". |
| `PartnerSection` | Spawned third-party GIFs under the pointer | Soft violet pointer glow via CSS variables. |
| `BottomNav` | Logo + CTA pill covering content on phones | Phones/tablets: Call · Email · Enquire bar. Desktop: original pill. Appears after scrolling. |

**New:** `ServicesOverview`, `FeaturedSolutions`, `FeaturedProject`, `ContactForm`, `LocationCard`, `CtaBand`,
`ConceptVisual`, `Reveal`, `Bits` (Tag, CheckList, StepList, ArrowLink, IconBadge), `useSeo`,
`services/contact.js`, `config/company.js`, and the `data/` content files.

## 3. Pages

| Route | Status |
|---|---|
| `/` | Rebuilt to the 10-section structure (hero kept centred, refined). |
| `/services` | Six service areas, each with inclusions, business value and typical applications; engagement models. |
| `/solutions` | Ten solutions, each with problem, solution, modules, workflow, roles, benefits, industries, optional enhancements and CTA. |
| `/case-studies` | One real project + six labelled concepts, with a filter. |
| `/case-studies/integrated-digital-operations` | **New** — full case study page. |
| `/industries` | Twelve industries. |
| `/industries/:slug` | **New** — twelve landing pages incl. `construction-mep`, `facility-management`, `manufacturing`, `security-services`. |
| `/insights` | Nine articles with topic filter. |
| `/insights/:slug` | **New** — article pages. |
| `/about` | Rewritten company profile. |
| `/contact` | Rebuilt: details panel, validated enquiry form, map. |
| `/privacy`, `/terms` | Structured **drafts** with real contact details. |
| any other URL | **New** 404 page (previously showed the home page). |

## 4. Design system

- **Colours:** your ten-colour palette, defined once in `tailwind.config.js` and `src/styles/index.css`.
  White is dominant; navy is limited to one closing block per page plus the contact panel.
- **Type:** Manrope (headings), Inter (body), Cormorant Garamond Italic (accent words only),
  IBM Plex Mono (labels). Fluid `clamp()` sizes: hero 34→68 px, section headings 28→44 px, body 16–18 px.
- **Cursor:** 26 px violet ring, 5 px centre dot, soft glow and a faint delayed trailing ring; grows to 40 px
  with a light violet fill over links, buttons and cards. One `requestAnimationFrame` loop that sleeps when
  the pointer is still, event delegation, no React state. Disabled on touch devices and for
  `prefers-reduced-motion`. The native cursor is hidden only while the script is running, and the normal
  text cursor is kept inside form fields.
- **Accessibility:** skip link, landmarks, one `h1` per page, visible focus rings, labelled form fields with
  linked error messages, `aria-expanded` / Escape / focus containment on the mobile menu, decorative
  elements hidden from assistive tech, reduced-motion support, ≥44 px touch targets.

## 5. Fictional content removed

- Client names: Meridian Facilities, Paradigm Manufacturing, Atlas Construction, Orbit Retail,
  Helix Real Estate, Aurora Health, Northwind Logistics.
- Testimonials from Ananya Iyer, Marcus Anderson, James Mitchell, Rachel Foster, David Zhang (with stock photos).
- "4.9 · Clutch" rating; "Trusted by businesses worldwide".
- Statistics: "60+ enterprise projects", "11 industries served", "$140M+ client revenue impacted",
  "4.9 / 5 satisfaction", "Founded 2019", "30+ engineers", and every per-case metric (−87 %, 3M+, −72 % incidents …).
- Leadership profiles: Yash Patel, Priya Menon, Rahul Sharma, Sara Ahmed.
- Claims: "international", "remote-first", SOC2 / ISO 27001 / HIPAA / GDPR readiness, ISO 45001, AWS / Azure / GCP / OpenAI partner row.
- Unverified technologies: Next.js, TypeScript, Python, FastAPI, MongoDB, AWS, Azure, OpenAI, Claude, Gemini, LangChain, Redis.
- Unverified services: mobile apps, CRM, DevOps/Kubernetes, UI/UX studio, IT consulting.
- Blog posts with invented dates; "Subscribe" button with no newsletter behind it.
- Placeholder legal text and `privacy@` / `legal@ypnova.example.com`.

## 6. Verified information used

- Brand, parent company, tagline, phone, email, Maps link — exactly as supplied.
- **Maps link resolved** on 16 Nov 2026: it redirects to the Google Maps place **"Green Meadows By Qualcon"**,
  pin 18.9293104, 73.1331126. The Contact page shows that place name, an embedded map centred on that pin,
  "Open in Google Maps" (your exact link) and "Get Directions". No street address, city or postcode is
  shown anywhere, and no `LocalBusiness` schema is emitted, because none has been confirmed.
- Project facts: MIS (Google Sheets API, meter-reading reporting, dashboards), VMS (deployed on a VPS),
  Work Permit System (in the VMS environment), Complaint Management (in the MIS/VMS environment).
  Nothing else is stated as implemented — module lists on solution pages are labelled "confirmed per project"
  and extras are labelled "optional future enhancements".
- Technology stack: only the 13 technologies you listed.

## 7. Testing completed

All run against the production build in headless Chromium (Playwright).

- **Responsive:** 18 routes × 13 widths (320, 360, 375, 390, 430, 600, 768, 834, 1024, 1280, 1440, 1600,
  1920) = 234 page loads. Automated checks for horizontal scroll, elements outside the viewport, clipped
  text and touch targets under 36 px: **0 problems**. Visual review of screenshots at 390, 768 and 1440.
- **Runtime:** no React errors, no console errors, no failed asset requests.
- **Navigation:** crawl of every internal link (32 pages) — none lead to the 404 page; 15 in-page anchor links resolve.
- **Contact form** (against a local mock of `/api/contact`): required-field errors, focus to first invalid
  field, email format, loading/disabled state, API failure message with data preserved, no success
  message on failure, double-click sends one request, payload matches the original contract.
- **Links:** `tel:+918291419044`, `mailto:info@ypnova.com` and the exact Maps URL in header, contact page, footer and mobile bar.
- **Cursor:** activates with a mouse, 26 → 40 px on hover, absent on touch and with reduced motion.
- **Mobile menu:** all links + CTA + call + email, scroll lock, Escape, closes on selection.
- **Build:** `npm run build` succeeds — 169 KB JS and 10 KB CSS gzipped.

### Not tested — please check these yourself

- **The embedded Google map could not be displayed in my test environment** (google.com is blocked there),
  so I have not seen it render. The URL uses Google's standard keyless embed format with the verified
  coordinates. If it does not display correctly on the live site, set `embedUrl: null` in
  `src/config/company.js` and the page falls back to a location card with both buttons.
- Real phones and tablets, Safari / iOS and Firefox — only Chromium device emulation was available.
- Lighthouse / Core Web Vitals scores were not measured.
- The real backend — it is not in the project, so only the request the site sends was verified.

## 8. Backend dependencies remaining

1. **Contact API.** Deploy the backend that serves `POST /api/contact` (contract in `README.md`), allow CORS
   from the website, set `REACT_APP_BACKEND_URL` and rebuild. Until then enquiries go through the email fallback.
2. Nothing else on the site needs a backend.

## 9. Needs your decision or information

| # | Item | Current state |
|---|---|---|
| 1 | **Is the map pin right?** The link points to "Green Meadows By Qualcon", which reads as a residential complex. Confirm this is the address you want public, and supply the full postal address if it should be shown. | Place name + map shown; no address. |
| 2 | **Reliable Group name/logo permission.** | Shown as "Facility Management & MEP Operations Client — Maharashtra". One flag in `company.js` switches to the real name. |
| 3 | **Logo tagline.** The logo image itself says "Smart Solutions. Intelligent Future.", while the site tagline is "Your Imagination, Our Creation." | Header uses the logo without the small strapline; footer shows the full logo. A logo file with the new tagline (ideally SVG or transparent PNG) would resolve this. |
| 4 | **Production domain.** | Canonical URLs, sitemap and absolute social image are off until `REACT_APP_SITE_URL` is set. |
| 5 | **Backend URL** for the contact form. | See §8. |
| 6 | **Legal pages** — registered entity details, effective date, retention period, service providers, jurisdiction; then legal review. | Published as drafts with a visible "Draft for review" notice and highlighted gaps. Consider not linking them publicly until reviewed. |
| 7 | **Analytics** — do you want any? | None loaded. |
| 8 | Working hours, social profile URLs, real testimonials, client logos, real project screenshots. | Hidden / illustrative until supplied. |
| 9 | **"State" wording** — the anonymised client label says "Maharashtra" as you specified; confirm it is acceptable to the client. | As specified. |
| 10 | Old files in `public_html`: `hello.html` and `abc.txt` look like test files. | Not carried into the new build; delete them from the server. |

### Known limitations

- Page titles and descriptions are set in the browser. Google reads them; link previews on WhatsApp/LinkedIn
  use the default title, description and logo image for every page. Per-page previews would need
  pre-rendering, which can be added later.
- Create React App is no longer actively maintained. It was kept so the project matches your existing build
  and hosting exactly; `npm install` prints deprecation warnings that do not affect the built site.
  Moving to Vite later is straightforward.
- Insights articles are short original guides written for this upgrade; review them for tone before publishing.
