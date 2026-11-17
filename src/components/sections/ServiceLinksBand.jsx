import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { container } from '@/components/common/PageShell';
import { servicePages } from '@/data/servicePages';

/** Home-page links to every service landing page (descriptive, varied anchor text). */
const anchors = {
  'custom-software-development': 'Custom software development company',
  'agentic-ai-development': 'Agentic AI & AI agent development',
  'custom-erp-development': 'Custom ERP development',
  'business-process-automation': 'Business process automation services',
  'saas-development': 'SaaS application development',
  'data-analytics': 'MIS & Power BI dashboards',
};

export function ServiceLinksBand() {
  return (
    <section aria-labelledby="explore-services" className="bg-lavender/60 border-t border-[#E6DCFB]">
      <div className={`${container} py-10 md:py-12`}>
        <h2 id="explore-services" className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted mb-4">Explore our services</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {servicePages.map(({ slug, icon: Icon }) => (
            <li key={slug}>
              <Link to={`/${slug}`} data-testid={`home-service-link-${slug}`}
                className="group flex items-center gap-3 min-h-[56px] rounded-2xl bg-white border border-line px-4 py-3 hover:border-purple/40 hover:shadow-card transition-all">
                <span className="inline-flex w-9 h-9 shrink-0 rounded-xl bg-lavender text-brand items-center justify-center" aria-hidden="true"><Icon className="w-[18px] h-[18px]" /></span>
                <span className="flex-1 font-semibold text-[15px] text-navy group-hover:text-brand transition-colors">{anchors[slug]}</span>
                <ArrowUpRight className="w-4 h-4 text-brand shrink-0" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
