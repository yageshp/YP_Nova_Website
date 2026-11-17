/**
 * Google Analytics 4 (optional) + business event tracking.
 *
 * Nothing loads until a GA4 Measurement ID ("G-XXXXXXXXXX") is supplied — either in
 * public/site-config.js (window.YPNOVA_CONFIG.ga4MeasurementId, editable on the server without a
 * rebuild) or REACT_APP_GA4_ID at build time. A Measurement ID is public, not a secret.
 *
 * Events (GA4 recommended names where they exist):
 *   generate_lead       contact form submitted successfully   { method: 'sheets' | 'api', service }
 *   contact_phone_click tel: link                             { link_location }
 *   contact_email_click mailto: link                          { link_location }
 *   contact_whatsapp_click  wa.me link                        { link_location }
 *   maps_click          Google Maps link                      { link_location }
 *   cta_click           "Book a Discovery Call" / "Discuss…" style links to /contact { cta_text, link_location }
 *   service_enquiry_click  CTA on a service / solution page   { page_path }
 * Mark these as Key events in GA4 → Admin → Events.
 */
const runtime = (typeof window !== 'undefined' && window.YPNOVA_CONFIG) || {};
const GA_ID = String(runtime.ga4MeasurementId || process.env.REACT_APP_GA4_ID || '').trim();
const enabled = /^G-[A-Z0-9]{4,}$/.test(GA_ID);
let started = false;

export function track(name, params = {}) {
  if (!enabled || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

/** Page views are sent manually because the site is a single-page app. */
export function trackPageView(path) {
  if (!enabled || typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', { page_path: path, page_location: window.location.href, page_title: document.title });
}

const SERVICE_PATHS = /^\/(custom-software-development|agentic-ai-development|custom-erp-development|business-process-automation|saas-development|data-analytics|solutions\/[^/]+)$/;

function where(el) {
  const zone = el.closest('header, footer, [data-testid="bottom-nav"], [data-testid="whatsapp-float"], main section, main');
  if (!zone) return 'page';
  if (zone.tagName === 'HEADER') return 'header';
  if (zone.tagName === 'FOOTER') return 'footer';
  return zone.getAttribute('data-testid') || 'content';
}

function onClick(e) {
  const a = e.target instanceof Element ? e.target.closest('a[href]') : null;
  if (!a) return;
  const href = a.getAttribute('href') || '';
  const loc = where(a);
  if (href.startsWith('tel:')) track('contact_phone_click', { link_location: loc });
  else if (href.startsWith('mailto:')) track('contact_email_click', { link_location: loc });
  else if (href.includes('wa.me/')) track('contact_whatsapp_click', { link_location: loc });
  else if (/maps\.app\.goo\.gl|google\.[a-z.]+\/maps/.test(href)) track('maps_click', { link_location: loc });
  else if (href === '/contact' || href.startsWith('/contact?') || href.startsWith('/contact#')) {
    const text = a.textContent.trim().slice(0, 60);
    track('cta_click', { cta_text: text, link_location: loc });
    if (SERVICE_PATHS.test(window.location.pathname)) track('service_enquiry_click', { page_path: window.location.pathname });
  }
}

export function initAnalytics() {
  if (started) return;
  started = true;
  if (!enabled) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); }; // eslint-disable-line prefer-rest-params
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { send_page_view: false, anonymize_ip: true });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(s);
  document.addEventListener('click', onClick, { capture: true });
  trackPageView(window.location.pathname);
}

export const analyticsEnabled = enabled;
