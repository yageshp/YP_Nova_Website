import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { PageHeader, Section } from '@/components/common/PageShell';
import { CtaBand } from '@/components/common/CtaBand';
import { ConceptVisual } from '@/components/common/ConceptVisual';
import { insights, insightCategories } from '@/data/insights';
import { useSeo } from '@/hooks/useSeo';

export default function Insights() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? insights : insights.filter((p) => p.category === active);
  useSeo({
    title: 'Insights: Custom Software, ERP, AI & Automation',
    description:
      'Practical guides on custom vs off-the-shelf software, custom ERP, agentic AI, MIS and Power BI reporting, visitor management and process automation.',
    path: '/insights',
    pageType: 'CollectionPage',
    breadcrumbs: [{ name: 'Insights', path: '/insights' }],
  });

  return (
    <div data-testid="insights-page">
      <PageHeader
        eyebrow="Insights"
        title={<>Practical notes on <span className="font-serif grad-text">business software.</span></>}
        subtitle="Short, plain-language guides written by the YP Nova team, based on the kind of questions we are asked when a business starts to digitise its operations."
      />

      <Section>
        <div role="group" aria-label="Filter articles by topic" className="flex flex-wrap gap-2 mb-8 md:mb-10">
          {insightCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              data-testid={`insight-cat-${c.toLowerCase().replace(/[^a-z]+/g, '-')}`}
              className={`min-h-[44px] px-4 sm:px-5 rounded-full text-sm font-semibold transition-colors ${
                active === c ? 'bg-navy text-white' : 'bg-white border border-line text-ink hover:border-purple/40 hover:text-brand'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {filtered.map((p) => (
            <article key={p.slug} data-testid={`insight-card-${p.slug}`} className="group card card-hover overflow-hidden flex flex-col">
              <Link to={`/insights/${p.slug}`} className="flex flex-col h-full rounded-[24px]">
                <div className="aspect-[16/10] border-b border-line overflow-hidden">
                  <ConceptVisual variant={p.cover} label={null} className="transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand mb-3">{p.category}</p>
                  <h2 className="h-card !text-[1.1875rem] group-hover:text-brand transition-colors">{p.title}</h2>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{p.excerpt}</p>
                  <div className="mt-auto pt-5 flex items-center justify-between text-[13px] text-muted">
                    <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" aria-hidden="true" /> {p.readMinutes} min read</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-brand">Read article <ArrowUpRight className="w-4 h-4" aria-hidden="true" /></span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
        <p className="sr-only" role="status">{filtered.length} articles shown</p>
      </Section>

      <CtaBand title="Have a question we have not covered?" text="Ask us directly. A short conversation is often the quickest way to work out whether software can solve the problem you have in mind." cta="Ask a Question" />
    </div>
  );
}
