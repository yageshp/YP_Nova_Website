import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Info } from 'lucide-react';
import { PageHeader, Section } from '@/components/common/PageShell';
import { Tag } from '@/components/common/Bits';
import { CtaBand } from '@/components/common/CtaBand';
import { ConceptVisual } from '@/components/common/ConceptVisual';
import { AnimatedDashboard } from '@/components/sections/AnimatedDashboard';
import { featuredProject, concepts, caseFilters, CONCEPT_LABEL } from '@/data/caseStudies';
import { featuredClientName } from '@/config/company';
import { useSeo } from '@/hooks/useSeo';

const label = 'font-mono text-[10px] uppercase tracking-[0.16em] text-muted mb-1';

export default function CaseStudies() {
  const [active, setActive] = useState('All');
  useSeo({
    title: 'Case Studies | Business Software Projects',
    description:
      'YP Nova case study: MIS, visitor management, work permit and complaint systems for facility and MEP operations, plus labelled solution concepts.',
    path: '/case-studies',
    pageType: 'CollectionPage',
    breadcrumbs: [{ name: 'Case Studies', path: '/case-studies' }],
  });

  const showProject = active !== 'Solution concepts';
  const showConcepts = active !== 'Client project';

  return (
    <div data-testid="case-studies-page">
      <PageHeader
        eyebrow="Case Studies"
        title={<>Real project experience, <span className="font-serif grad-text">honestly</span> presented.</>}
        subtitle="One published client project, described factually, followed by solution concepts that show how we would approach similar problems in other industries. Concepts are clearly labelled and are not client work."
      />

      <Section className="[&>div]:!pb-8">
        <div role="group" aria-label="Filter case studies" className="flex flex-wrap gap-2">
          {caseFilters.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              data-testid={`case-filter-${c.toLowerCase().replace(/\s+/g, '-')}`}
              className={`min-h-[44px] px-5 rounded-full text-sm font-semibold transition-colors ${
                active === c ? 'bg-navy text-white' : 'bg-white border border-line text-ink hover:border-purple/40 hover:text-brand'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </Section>

      {showProject && (
        <Section className="[&>div]:!pt-0 [&>div]:!pb-10">
          <article data-testid="case-card-featured" className="card overflow-hidden grid grid-cols-1 lg:grid-cols-2">
            <div className="grad-soft p-5 sm:p-8 lg:p-10 flex items-center border-b lg:border-b-0 lg:border-r border-line">
              <AnimatedDashboard className="w-full" />
            </div>
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col">
              <div className="flex flex-wrap gap-2 mb-4">
                <Tag tone="green">Client project</Tag>
                <Tag tone="outline">{featuredProject.category}</Tag>
              </div>
              <h2 className="h-section !text-[clamp(1.5rem,1.2rem+1.4vw,2.25rem)]">{featuredProject.title}</h2>
              <p className="mt-2 font-mono text-xs tracking-wide text-muted">{featuredClientName()}</p>
              <p className="mt-4 text-base leading-relaxed text-muted">{featuredProject.summary}</p>
              <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {featuredProject.modules.map((m) => (
                  <li key={m.key} className="rounded-xl bg-lavender/70 px-3.5 py-2.5 text-sm font-medium text-navy">{m.name}</li>
                ))}
              </ul>
              <Link
                to={`/case-studies/${featuredProject.slug}`}
                data-testid="case-featured-link"
                className="mt-7 self-start inline-flex items-center gap-2 min-h-[48px] grad-button text-white rounded-full px-6 font-semibold shadow-cta"
              >
                Read the full case study <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </article>
        </Section>
      )}

      {showConcepts && (
        <Section className="[&>div]:!pt-6">
          <div className="flex items-start gap-3 rounded-2xl border border-[#F3D9A4] bg-[#FFF8E8] p-4 sm:p-5 mb-8" data-testid="concept-disclaimer">
            <Info className="w-5 h-5 mt-0.5 shrink-0 text-[#8A5200]" aria-hidden="true" />
            <div>
              <h2 className="font-display font-bold text-base text-[#5C3900]">Solution concepts</h2>
              <p className="mt-1 text-sm leading-relaxed text-[#6B4300]">
                The examples below are demonstrations of how we would approach a typical requirement. They do not describe
                real customers, and no results or metrics are claimed. Visuals are conceptual mockups.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {concepts.map((c) => (
              <article key={c.id} data-testid={`case-card-${c.id}`} className="card card-hover overflow-hidden flex flex-col">
                <div className="aspect-[16/10] border-b border-line">
                  <ConceptVisual variant={c.visual} />
                </div>
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <p className="rounded-lg bg-[#FFF4DE] text-[#7A4800] px-3 py-2 font-mono text-[11px] leading-snug mb-4">{CONCEPT_LABEL}</p>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-brand mb-2">{c.industry}</p>
                  <h3 className="h-card !text-[1.375rem]">{c.title}</h3>
                  <div className="grid gap-4 mt-5 text-[15px]">
                    <div><h4 className={label}>Typical scenario</h4><p className="text-ink leading-relaxed">{c.scenario}</p></div>
                    <div><h4 className={label}>How we would approach it</h4><p className="text-ink leading-relaxed">{c.approach}</p></div>
                    <div><h4 className={label}>Intended value</h4><p className="text-ink leading-relaxed">{c.value}</p></div>
                  </div>
                  <ul className="mt-5 pt-5 border-t border-line flex flex-wrap gap-2">
                    {c.modules.map((m) => <li key={m}><Tag>{m}</Tag></li>)}
                  </ul>
                  <Link to="/contact" className="mt-5 self-start inline-flex items-center gap-1.5 min-h-[44px] text-[15px] font-semibold text-brand hover:text-navy">
                    Discuss a solution like this <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Section>
      )}

      <CtaBand title="Have a project in mind?" text="We are glad to walk you through the delivered system in more detail and discuss how a similar approach could work for you." />
    </div>
  );
}
