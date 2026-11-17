import { useEffect } from 'react';
import { company } from '@/config/company';
import { seo, absoluteUrl } from '@/config/seo';

/*
 * Per-page SEO: title, description, canonical, robots, Open Graph / Twitter tags and JSON-LD.
 *
 * At build time scripts/prerender.js loads every public route in a headless browser and saves the
 * resulting HTML, so everything set here is present in the HTML that Google downloads — not only
 * after JavaScript runs. In the browser the same hook keeps the tags correct during client-side
 * navigation. One source, so pre-rendered HTML and the live React page always match.
 */

const ORG_ID = `${seo.siteUrl}/#organization`;
const SITE_ID = `${seo.siteUrl}/#website`;

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!content) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!href) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * @param {object}   o
 * @param {string}   o.title        Page title (brand suffix added unless already present)
 * @param {string}   o.description  Meta description (aim for 120–160 characters)
 * @param {string}   o.path         Canonical path, e.g. '/custom-erp-development'
 * @param {object[]} [o.breadcrumbs] [{ name, path }] — rendered as BreadcrumbList (Home is added)
 * @param {object|object[]} [o.jsonLd] extra schema.org nodes for this page
 * @param {string}   [o.pageType]   schema.org WebPage subtype (AboutPage, ContactPage, CollectionPage…)
 * @param {boolean}  [o.noindex]
 * @param {string}   [o.image]      social image path
 */
export function useSeo({ title, description, path = '/', breadcrumbs, jsonLd, pageType = 'WebPage', noindex = false, image }) {
  const graph = noindex ? null : buildGraph({ title, description, path, breadcrumbs, jsonLd, pageType });
  const graphText = graph ? JSON.stringify(graph) : '';

  useEffect(() => {
    const fullTitle = title.includes(seo.brandName) ? title : `${title}${seo.titleSuffix}`;
    const url = absoluteUrl(path);
    const img = `${seo.siteUrl}${image || seo.defaultImage}`;

    document.title = fullTitle;
    document.documentElement.lang = seo.language;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    upsertLink('canonical', noindex ? null : url);

    upsertMeta('property', 'og:type', path.startsWith('/insights/') ? 'article' : 'website');
    upsertMeta('property', 'og:site_name', seo.brandName);
    upsertMeta('property', 'og:locale', seo.locale);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', noindex ? null : url);
    upsertMeta('property', 'og:image', img);
    upsertMeta('property', 'og:image:width', '1200');
    upsertMeta('property', 'og:image:height', '630');
    upsertMeta('property', 'og:image:alt', seo.defaultImageAlt);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', img);
    upsertMeta('name', 'google-site-verification', path === '/' ? seo.googleSiteVerification : null);

    let script = document.getElementById('page-jsonld');
    if (graphText) {
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'page-jsonld';
        document.head.appendChild(script);
      }
      script.textContent = graphText;
    } else if (script) {
      script.remove();
    }
  }, [title, description, path, noindex, image, graphText]);
}

/** Organization entity — referenced by @id from every page. No address, ratings or reviews (none verified). */
export function organizationNode() {
  const node = {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: company.brandName,
    url: `${seo.siteUrl}/`,
    logo: { '@type': 'ImageObject', url: `${seo.siteUrl}${seo.logo}`, width: 512, height: 512 },
    image: `${seo.siteUrl}${seo.defaultImage}`,
    slogan: company.tagline,
    description: company.description,
    email: company.email.address,
    telephone: company.phone.e164,
    parentOrganization: { '@type': 'Organization', name: company.parentCompany },
    contactPoint: [{
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: company.phone.e164,
      email: company.email.address,
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    }],
    areaServed: seo.areaServed.map((name) => (name === 'India'
      ? { '@type': 'Country', name }
      : { '@type': name === 'Maharashtra' ? 'State' : 'City', name })),
    knowsAbout: [
      'Custom software development', 'Custom ERP development', 'Agentic AI and AI agents',
      'Business process automation', 'SaaS application development', 'MIS and Power BI dashboards',
    ],
  };
  if (company.social.length) node.sameAs = company.social.map((s) => s.url);
  return node;
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: `${seo.siteUrl}/`,
    name: seo.brandName,
    description: seo.defaultDescription,
    inLanguage: seo.language,
    publisher: { '@id': ORG_ID },
  };
}

/** schema.org Service for a page that describes one service or solution. */
export function serviceNode({ name, description, path, serviceType, audience }) {
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name,
    description,
    serviceType: serviceType || name,
    url: absoluteUrl(path),
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'India' },
    ...(audience ? { audience: { '@type': 'BusinessAudience', name: audience } } : {}),
  };
}

/** FAQPage from visible FAQ content. (Google limits FAQ rich results to a few site types; the markup is still valid.) */
export function faqNode(faqs, path) {
  return {
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

function buildGraph({ title, description, path, breadcrumbs, jsonLd, pageType }) {
  const url = absoluteUrl(path);
  const page = {
    '@type': pageType,
    '@id': `${url}#webpage`,
    url,
    name: title.includes(seo.brandName) ? title : `${title}${seo.titleSuffix}`,
    description,
    inLanguage: seo.language,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
  };
  const nodes = [organizationNode(), websiteNode(), page];
  if (breadcrumbs && breadcrumbs.length) {
    const items = [{ name: 'Home', path: '/' }, ...breadcrumbs];
    const crumbs = {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: items.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        item: absoluteUrl(b.path),
      })),
    };
    page.breadcrumb = { '@id': crumbs['@id'] };
    nodes.push(crumbs);
  }
  const extra = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  extra.forEach((n) => {
    const { '@context': _ignored, ...rest } = n; // nodes join one @graph
    nodes.push(rest);
    if (rest['@type'] === 'Service' || rest['@type'] === 'Article') page.mainEntity = { '@id': rest['@id'] };
  });
  return { '@context': 'https://schema.org', '@graph': nodes };
}

/** Back-compat for earlier callers. */
export const organizationJsonLd = () => organizationNode();
