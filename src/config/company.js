/**
 * Single source of truth for verified YP Nova company details.
 * Every component reads contact details from here — do not hard-code them elsewhere.
 * Only add information that has been confirmed by the company.
 */
const phoneDisplay = '+91 82914 19044';
const phoneE164 = '+918291419044';
const email = 'info@ypnova.com';
const mapsUrl = 'https://maps.app.goo.gl/Y3U94Lmn99JVwu2v9';
// Pin coordinates taken from the destination of mapsUrl (resolved 2026-11-16).
const mapLat = 18.9293104;
const mapLng = 73.1331126;

export const company = {
  brandName: 'YP Nova',
  parentCompany: 'YP Security Services Pvt. Ltd.',
  tagline: 'Your Imagination, Our Creation.',
  category:
    'Custom Software Development, AI Solutions, SaaS Development, Business Automation, Data Analytics and IT Services',
  description:
    'YP Nova is the technology brand of YP Security Services Pvt. Ltd. We design and build custom business software, AI-enabled automation, SaaS applications and reporting dashboards.',

  phone: { display: phoneDisplay, e164: phoneE164, href: `tel:${phoneE164}` },
  email: { address: email, href: `mailto:${email}` },
  /** WhatsApp chat on the same number. Opens the app on phones and WhatsApp Web on desktop. */
  whatsapp: {
    href: `https://wa.me/${phoneE164.replace('+', '')}?text=${encodeURIComponent(
      'Hello YP Nova, I would like to discuss a project.',
    )}`,
    label: 'Chat on WhatsApp',
  },

  location: {
    /** Exact Google Maps link supplied by the company — used only for directions to arranged meetings. */
    mapsUrl,
    /** Directions to the same pin (Google Maps URLs format). */
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${mapLat},${mapLng}`,
    /**
     * No walk-in / customer-facing office: no address, no embedded map and no location in structured
     * data. Add verified address lines here only if a staffed office opens.
     */
    addressLines: [],
  },

  /** Verified working hours, e.g. 'Mon–Sat, 10:00–18:30 IST'. Hidden while null. */
  workingHours: null,

  /** Confirmed social profile URLs only, e.g. { label: 'LinkedIn', url: 'https://…' }. Hidden while empty. */
  social: [],

  /** Production domain + all SEO defaults live in src/config/seo.js. */

  /**
   * Client references. A client's name/logo is shown only when written
   * permission has been obtained and approvedToPublish is switched to true.
   */
  clientReferences: {
    reliableGroup: {
      approvedToPublish: false,
      name: 'Reliable Group',
      anonymisedName: 'Facility Management & MEP Operations Client — Maharashtra',
    },
  },
};

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/industries', label: 'Industries' },
  { to: '/insights', label: 'Insights' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export const footerServiceLinks = [
  { to: '/custom-software-development', label: 'Custom Software Development' },
  { to: '/custom-erp-development', label: 'Custom ERP Development' },
  { to: '/agentic-ai-development', label: 'Agentic AI & AI Agents' },
  { to: '/business-process-automation', label: 'Business Automation' },
  { to: '/saas-development', label: 'SaaS Development' },
  { to: '/data-analytics', label: 'MIS & Power BI Dashboards' },
  { to: '/services#infrastructure', label: 'IT Infrastructure' },
];

export function featuredClientName() {
  const ref = company.clientReferences.reliableGroup;
  return ref.approvedToPublish ? ref.name : ref.anonymisedName;
}
