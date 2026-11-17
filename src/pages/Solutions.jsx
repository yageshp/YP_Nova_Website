import React from 'react';
import { PageHeader, Section, container } from '@/components/common/PageShell';
import { Button } from '@/components/common/Button';
import { Tag, CheckList, StepList } from '@/components/common/Bits';
import { CtaBand } from '@/components/common/CtaBand';
import { Reveal } from '@/components/animations/Reveal';
import { solutions, STATUS, solutionPages } from '@/data/solutions';

const DETAIL_URL = (slug) => (slug in solutionPages ? `/solutions/${slug}`
  : slug === 'custom-erp-business-applications' ? '/custom-erp-development'
  : slug === 'business-intelligence-dashboards' ? '/data-analytics' : null);
import { useSeo } from '@/hooks/useSeo';

const label = 'font-mono text-[11px] uppercase tracking-[0.16em] text-muted mb-2.5';

function SolutionDetail({ s, index }) {
  const Icon = s.icon;
  const status = STATUS[s.status];
  return (
    <Reveal as="article" id={s.slug} data-testid={`solution-${s.slug}`} className="card overflow-hidden scroll-mt-24">
      <header className="p-6 sm:p-8 md:p-10 border-b border-line bg-gradient-to-r from-white to-[#FBF9FF]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex w-12 h-12 rounded-2xl grad-icon text-white items-center justify-center" aria-hidden="true"><Icon className="w-5 h-5" /></span>
          <span className="font-mono text-xs tracking-widest text-muted">[{String(index + 1).padStart(2, '0')}]</span>
          <Tag tone={status.tone}>{status.label}</Tag>
        </div>
        <h2 className="h-section !text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] mt-4">{s.title}</h2>
        <p className="mt-2 text-base md:text-lg leading-relaxed text-muted max-w-3xl">{s.summary}</p>
      </header>

      <div className="p-6 sm:p-8 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
        <div className="flex flex-col gap-7">
          <div>
            <h3 className={label}>Business problem</h3>
            <p className="text-[15px] leading-relaxed text-ink">{s.problem}</p>
          </div>
          <div>
            <h3 className={label}>Proposed solution</h3>
            <p className="text-[15px] leading-relaxed text-ink">{s.solution}</p>
          </div>
          {s.delivered && (
            <div className="rounded-2xl border border-[#BFE5CD] bg-[#F2FBF5] p-4 sm:p-5">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#11693A] mb-2">What we have delivered</h3>
              <ul className="flex flex-col gap-1.5 text-[15px] leading-relaxed text-ink">
                {s.delivered.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </div>
          )}
          <div>
            <h3 className={label}>Business benefits</h3>
            <CheckList items={s.benefits} />
          </div>
        </div>

        <div className="flex flex-col gap-7">
          <div>
            <h3 className={label}>Core modules <span className="normal-case tracking-normal">· confirmed per project</span></h3>
            <ul className="flex flex-wrap gap-2">
              {s.modules.map((m) => <li key={m} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm text-navy">{m}</li>)}
            </ul>
          </div>
          <div>
            <h3 className={label}>Workflow</h3>
            <StepList steps={s.workflow} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className={label}>User roles</h3>
              <ul className="flex flex-col gap-1.5 text-[15px] text-ink">{s.roles.map((r) => <li key={r}>{r}</li>)}</ul>
            </div>
            <div>
              <h3 className={label}>Relevant industries</h3>
              <ul className="flex flex-col gap-1.5 text-[15px] text-ink">{s.industries.map((r) => <li key={r}>{r}</li>)}</ul>
            </div>
          </div>
          <div className="rounded-2xl border border-dashed border-soft/70 p-4 sm:p-5">
            <h3 className={label}>Optional future enhancements</h3>
            <p className="text-[13px] text-muted mb-2">Not part of the base scope — added only if you need them.</p>
            <ul className="flex flex-wrap gap-2">
              {s.enhancements.map((m) => <li key={m} className="rounded-full bg-lavender px-3 py-1 text-[13px] text-brand">{m}</li>)}
            </ul>
          </div>
        </div>
      </div>

      <footer className="px-6 sm:px-8 md:px-10 py-5 border-t border-line bg-[#FBFAFE] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-sm text-muted">{status.note}</p>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          {DETAIL_URL(s.slug) && <Button to={DETAIL_URL(s.slug)} variant="secondary" data-testid={`solution-detail-link-${s.slug}`}>{s.title}: full details</Button>}
          <Button to="/contact" variant="primary" aria-label={`Discuss ${s.title}`}>Discuss this solution</Button>
        </div>
      </footer>
    </Reveal>
  );
}

export default function Solutions() {
  useSeo({
    title: 'Business Software Solutions: VMS, MIS & ERP',
    description:
      'Visitor management, MIS, work permit and complaint systems, inventory, procurement, HR, BI dashboards and custom ERP solutions from YP Nova.',
    path: '/solutions',
    pageType: 'CollectionPage',
    breadcrumbs: [{ name: 'Solutions', path: '/solutions' }],
  });

  return (
    <div data-testid="solutions-page">
      <PageHeader
        eyebrow="Solutions"
        title={<>Business systems for <span className="font-serif grad-text">everyday operations.</span></>}
        subtitle="Ten solutions, each explained from the problem it solves to how it works. Four draw on systems we have already delivered; the rest are built as custom developments to your requirements."
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <span className="inline-flex items-center gap-2 text-sm text-muted"><Tag tone="green">{STATUS.delivered.label}</Tag> {STATUS.delivered.note}</span>
          <span className="inline-flex items-center gap-2 text-sm text-muted"><Tag tone="outline">{STATUS.custom.label}</Tag> {STATUS.custom.note}</span>
        </div>
      </PageHeader>

      {/* Card index */}
      <section className={`${container} pt-10 md:pt-14`} aria-label="All solutions">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
          {solutions.map(({ slug, icon: Icon, title, status }, i) => (
            <a key={slug} href={`#${slug}`} data-testid={`solution-card-${i}`} className="group card card-hover p-4 md:p-5 flex lg:flex-col items-center lg:items-start gap-3">
              <span className="inline-flex w-10 h-10 shrink-0 rounded-xl bg-lavender text-brand items-center justify-center" aria-hidden="true"><Icon className="w-5 h-5" /></span>
              <span className="flex flex-col gap-1.5 min-w-0">
                <span className="font-display font-bold text-[15px] leading-snug text-navy group-hover:text-brand transition-colors">{title}</span>
                <span className={`font-mono text-[10px] tracking-wide ${status === 'delivered' ? 'text-[#11693A]' : 'text-muted'}`}>{STATUS[status].label}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <Section className="[&>div]:!pt-10">
        <div className="flex flex-col gap-6 md:gap-8">
          {solutions.map((s, i) => <SolutionDetail key={s.slug} s={s} index={i} />)}
        </div>
      </Section>

      <CtaBand title="Need something that is not on this list?" text="Most of our work starts as a specific operational problem rather than a product name. Tell us what you are dealing with." />
    </div>
  );
}
