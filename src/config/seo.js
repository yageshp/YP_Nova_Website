/**
 * Central SEO configuration for ypnova.com.
 *
 * Production domain verified on 16 Nov 2026: https://ypnova.com serves this site over HTTPS.
 * www.ypnova.com also served it (duplicate) — public/.htaccess now 301-redirects www → non-www,
 * /index.html → /, and trailing-slash URLs → no trailing slash.
 */
import { company } from './company';

export const seo = {
  /** Canonical origin. No trailing slash. HTTPS, non-www. */
  siteUrl: 'https://ypnova.com',
  brandName: company.brandName,
  language: 'en-IN',
  locale: 'en_IN',
  defaultTitle: 'YP Nova | Custom Software, ERP & AI Development Company',
  defaultDescription:
    'YP Nova develops custom software, ERP applications, AI solutions, business automation and SaaS platforms for growing businesses in India.',
  /** 1200×630 social sharing image (public/). */
  defaultImage: '/yp-nova-custom-software-erp-ai-development.jpg',
  defaultImageAlt: 'YP Nova logo — custom software, ERP and AI development',
  logo: '/yp-nova-logo-512.png',
  /** Title suffix appended to page titles that do not already contain the brand. */
  titleSuffix: ' | YP Nova',

  /**
   * Google Search Console HTML-tag verification token (the value of content="…").
   * Prefer DNS verification (see docs/GOOGLE-SEARCH-CONSOLE-GUIDE.md); only fill this in if you
   * choose the HTML-tag method. Never invent a value.
   */
  googleSiteVerification: '',

  /**
   * Starting <lastmod> date for a page the first time it is built. After that, scripts/prerender.js
   * keeps a content fingerprint per page in seo-lastmod.json and moves a page's <lastmod> to the build
   * date only when that page's visible content, title or description actually changes.
   */
  contentUpdated: '2026-11-17',

  /**
   * Areas served — shown on the Contact page and in Organization / Service schema (areaServed).
   * YP Nova works with clients across India and internationally, delivered remotely; there is no
   * walk-in office and no city-specific service area.
   * These are SERVICE areas, not office locations. Confirm before relying on them.
   */
  areaServed: ['India', 'Worldwide'],
  /** Human-readable form used on the website. */
  areaServedText: 'Clients across India and worldwide',
};

export const absoluteUrl = (path = '/') => `${seo.siteUrl}${path === '/' ? '/' : path.replace(/\/+$/, '')}`;
