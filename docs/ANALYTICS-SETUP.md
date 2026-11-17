# Analytics & SEO measurement

## What's already built in
- **Google Analytics 4**, off by default. Nothing loads until you add a Measurement ID.
- **Business event tracking**, sent automatically once GA4 is on:

| Event | Fires when | Suggested Key event? |
|---|---|---|
| `generate_lead` | The contact form is submitted successfully (only after the Sheet/API confirms) | ✅ Yes |
| `contact_phone_click` | Any phone (tel:) link is tapped | ✅ Yes |
| `contact_whatsapp_click` | Any WhatsApp link is tapped | ✅ Yes |
| `contact_email_click` | Any email link is clicked | ✅ Yes |
| `maps_click` | A Google Maps / directions link is clicked | Optional |
| `cta_click` | Any link to the Contact page ("Book a Discovery Call", "Discuss…") | Optional |
| `service_enquiry_click` | A Contact CTA on a service or solution page | ✅ Yes |
| `page_view` | Every page, including in-app navigation | Automatic |

Each event records where on the page it happened (header, footer, content, floating button).

## What I need from you
| Item | Where to get it | Where it goes |
|---|---|---|
| **GA4 Measurement ID** (`G-XXXXXXXXXX`) | analytics.google.com → Admin → Create property ("YP Nova", India, INR) → Web data stream for `https://ypnova.com` → copy the Measurement ID | `public_html/site-config.js` → `ga4MeasurementId: 'G-…'` (no rebuild needed) |
| **Search Console** access | See GOOGLE-SEARCH-CONSOLE-GUIDE.md | DNS TXT record (nothing in the code) |

A Measurement ID is public by design, not a secret. No API keys or passwords are used in the website code.

## After adding the ID
1. Open the site and click the phone link once; within a minute it should appear in GA4 → Reports →
   **Realtime**.
2. GA4 → Admin → **Events**: mark `generate_lead`, `contact_phone_click`,
   `contact_whatsapp_click` and `service_enquiry_click` as **Key events**. They may take up to 24 hours
   to appear in the list.
3. GA4 → Admin → **Product links → Search Console** → link the ypnova.com property.
4. **Update the Privacy Policy** to say Google Analytics is used, and consider a cookie notice
   (`src/pages/Legal.jsx`).

## Previous analytics
The original site contained a PostHog script with session recording, apparently using the website
builder's default project. It was removed in the first upgrade and is not used now.
