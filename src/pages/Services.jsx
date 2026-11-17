import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PageHeader, Section, container } from '@/components/common/PageShell';
import { Button } from '@/components/common/Button';
import { IconBadge, CheckList, ArrowLink } from '@/components/common/Bits';
import { CtaBand } from '@/components/common/CtaBand';
import { PricingSection } from '@/components/sections/PricingSection';
import { Reveal } from '@/components/animations/Reveal';
import { services } from '@/data/services';
import { useSeo } from '@/hooks/useSeo';
import { company } from '@/config/company';

const LANDING = {
  'custom-software': { to: '/custom-software-development', label: 'Custom software development in detail' },
  ai: { to: '/agentic-ai-development', label: 'Agentic AI & AI agent development' },
  automation: { to: '/business-process-automation', label: 'Business process automation in detail' },
  saas: { to: '/saas-development', label: 'SaaS application development in detail' },
  analytics: { to: '/data-analytics', label: 'MIS & Power BI dashboard development' },
};

export default function Services() {
  useSeo({
    title: 'Software Development Services: ERP, AI & SaaS',
    description:
      'Custom software, custom ERP, agentic AI, business process automation, SaaS, MIS and Power BI dashboards, and IT infrastructure services from YP Nova.',
    path: '/services',
    pageType: 'CollectionPage',
    breadcrumbs: [{ name: 'Services', path: '/services' }],
  });

  return (
    <div data-testid="services-page">
      <PageHeader
        eyebrow="Services"
        title={<>Software, AI and automation <span className="font-serif grad-text">built around</span> your business.</>}
        subtitle="Six service areas, delivered by one team. Each one is described below with what it includes, why it matters and where it is typically applied."
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <Button to="/contact" variant="primary">Book a Discovery Call <ArrowUpRight className="w-4 h-4" aria-hidden="true" /></Button>
          <Button to="/solutions" variant="secondary">Browse solutions</Button>
        </div>
      </PageHeader>

      {/* Quick index */}
      <nav aria-label="Services on this page" className={`${container} pt-8`}>
        <ul className="flex flex-wrap gap-2">
          {services.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="inline-flex items-center min-h-[44px] rounded-full border border-line bg-white px-4 text-sm font-medium text-ink hover:border-purple/40 hover:bg-lavender hover:text-brand transition-colors">
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <Section className="[&>div]:!pt-10">
        <div className="flex flex-col gap-6 md:gap-8">
          {services.map(({ id, icon, title, summary, value, items, applications }, i) => (
            <Reveal as="article" key={id} id={id} data-testid={`service-card-${id}`} className="card p-6 sm:p-8 md:p-10 scroll-mt-24">
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-8 lg:gap-12">
                <div>
                  <div className="flex items-center gap-4">
                    <IconBadge icon={icon} />
                    <span className="font-mono text-xs tracking-widest text-muted">[{String(i + 1).padStart(2, '0')}]</span>
                  </div>
                  <h2 className="h-section !text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] mt-5">{title}</h2>
                  <p className="mt-3 text-base leading-relaxed text-muted">{summary}</p>
                  <div className="mt-5 rounded-2xl bg-lavender/70 border border-[#E6DCFB] p-4 sm:p-5">
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand">Business value</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-ink">{value}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted mb-3">What it includes</h3>
                  <CheckList items={items} columns={2} />
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted mt-6 mb-3">Typical applications</h3>
                  <ul className="flex flex-wrap gap-2">
                    {applications.map((a) => (
                      <li key={a} className="rounded-full bg-ice px-3.5 py-1.5 text-sm text-[#0B4A66]">{a}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-x-6">
                    {LANDING[id] && <ArrowLink to={LANDING[id].to} data-testid={`service-landing-${id}`}>{LANDING[id].label}</ArrowLink>}
                    <ArrowLink to="/contact" aria-label={`Enquire about ${title}`}>Enquire about this service</ArrowLink>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 card p-6 sm:p-8 md:p-10">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">ERP software development</p>
            <h2 className="h-section !text-[clamp(1.5rem,1.15rem+1.4vw,2.25rem)]">Need a connected <span className="font-serif grad-text">ERP</span> rather than a single application?</h2>
            <p className="mt-3 text-base leading-relaxed text-muted">We build custom ERP software in modules — inventory, procurement, HR, operations and reporting — on one database, in phases.</p>
          </div>
          <Button to="/custom-erp-development" variant="primary" className="shrink-0" data-testid="services-erp-link">Explore custom ERP development</Button>
        </div>
      </Section>

      <PricingSection tone="lavender" />
      <CtaBand title="Not sure which service you need?" text="Describe the problem in your own words. We will suggest the most practical way to solve it — even if that is a smaller project than you expected." />
    </div>
  );
}
