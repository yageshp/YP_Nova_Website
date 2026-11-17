# Deploying YP Nova updates to MilesWeb

The update changes how URLs are served: each page now has its own pre-rendered HTML file. Upload the
whole package, not single files.

## What's in the deployment ZIP (`ypnova-final-deployment.zip`)
`index.html`, `404.html`, `.htaccess` (hidden), `sitemap.xml`, `robots.txt`, the `_pages` folder
(the 47 other pages), the `static` folder (code, styles and fonts), images, icons, `manifest.json`
and `error_pages`.

It deliberately does **not** contain `site-config.js`, so your live Google Sheets settings are never
overwritten.

## Steps
1. cPanel → **File Manager** → `public_html`. Turn on **Settings → Show Hidden Files**.
2. **Back up:** select everything → **Compress** → download the ZIP.
3. **Delete the old code folder:** delete `static`. Leave `site-config.js` alone.
4. **Upload** `ypnova-final-deployment.zip` into `public_html`.
5. Right-click it → **Extract** → path `/public_html` → **Extract Files**. Allow it to overwrite
   `index.html` and `.htaccess`.
6. Check that `public_html` now contains the folders `_pages` and `static`, and the files `index.html`,
   `404.html`, `.htaccess`, `sitemap.xml` and `robots.txt`, directly inside it (not in a sub-folder).
   Then delete the ZIP.
7. **Optional — enable analytics:** open `site-config.js` → **Edit**. If it has no `ga4MeasurementId` line,
   add one inside the braces, e.g. `ga4MeasurementId: 'G-XXXXXXXXXX',` (see ANALYTICS-SETUP.md) → Save.
8. **Force HTTPS:** cPanel → **Domains** → turn on **Force HTTPS Redirect** for `ypnova.com`.
9. Open https://ypnova.com and hard-refresh (**Ctrl + Shift + R**).

## Optional: update the Google Apps Script to v2
The contact form now sends a *preferred contact method*, a consent flag and a spam-trap field. **Your current script keeps working**
(the preferred method is also included in the message text). To get a separate "Preferred contact" column and server-side spam filtering,
paste `docs/google-sheets/Code.gs` (v2) into your Apps Script editor → Save → **Deploy → Manage deployments → ✏️ → Version: New version →
Deploy**. The web-app URL stays the same, so `site-config.js` does not change.

## Validate the live site after upload
```bash
NODE_USE_ENV_PROXY=1 node scripts/validate-urls.js
```
(or ask me to run it). It checks all sitemap URLs plus redirects, 404s and noindex pages against https://ypnova.com and writes
`docs/URL-VALIDATION-REPORT.md`.

## Check after upload (or ask me to check)
| Open | Expected |
|---|---|
| https://ypnova.com/custom-erp-development | The ERP page |
| https://ypnova.com/contact/ | Address bar changes to `/contact` |
| https://www.ypnova.com/ | Address bar changes to `https://ypnova.com/` |
| http://ypnova.com/ | Address bar changes to `https://ypnova.com/` |
| https://ypnova.com/abc-test | The "page could not be found" page |
| https://ypnova.com/sitemap.xml | An XML list of URLs |
| https://ypnova.com/robots.txt | Ends with `Sitemap: https://ypnova.com/sitemap.xml` |

**If every page except the home page shows "not found":** the `_pages` folder or `.htaccess` did not
upload. Repeat steps 5–6 with hidden files visible.

Old files from earlier versions, such as `logo-header.webp` and `yp-nova-logo.jpg`, are no longer
used. They are harmless and can be deleted.

## Building it yourself (for developers)
```bash
npm install
npm i -D playwright && npx playwright install chromium   # one-time, needed for pre-rendering
npm run build                                             # React build + pre-render + sitemap + .htaccess + schema checks
```
`npm run build` fails, listing the problem, if an internal link is broken, SEO tags are duplicated or structured data is invalid.
Keep `seo-lastmod.json` with the source: it holds each page's content fingerprint so sitemap dates change only when content changes.
The result is in `build/`. Upload its contents as above, excluding `site-config.js` if the live copy
holds real settings.
