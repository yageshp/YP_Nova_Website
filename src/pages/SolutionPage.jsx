import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, Plug } from 'lucide-react';
import { PageHeader, Section } from '@/components/common/PageShell';
import { Button } from '@/components/common/Button';
import { Tag, CheckList, StepList } from '@/components/common/Bits';
import { CtaBand } from '@/components/common/CtaBand';
import { RichText, plainText } from '@/components/common/RichText';
import { FaqList, faqsPlain } from '@/components/common/Faq';
import { RelatedLinks } from '@/components/common/RelatedLinks';
import { Reveal } from '@/components/animations/Reveal';
import { DemoLoader } from '@/components/demos/DemoLoader';

const DEMO = {
  'visitor-management-system': 'vms',
  'management-information-system': 'mis',
  'work-permit-management-system': 'permit',
  'complaint-management-system': 'cms',
};
import { solutions, solutionPages, STATUS } from '@/data/solutions';
import { industries } from '@/data/industries';
import { servicePages } from '@/data/servicePages';
import { useSeo, serviceNode, faqNode } from '@/hooks/useSeo';
import NotFound from './NotFound';

const label = 'font-mono text-[11px] uppercase tracking-[0.16em] text-muted mb-3';

/** Which service pages each solution relates to (internal linking). */
const SERVICE_LINKS = {
  'visitor-management-system': ['custom-software-development', 'saas-development', 'data-analytics'],
  'management-information-system': ['data-analytics', 'business-process-automation', 'custom-software-development'],
  'work-permit-management-system': ['business-process-automation', 'custom-software-development', 'custom-erp-development'],
  'complaint-management-system': ['business-process-automation', 'agentic-ai-development', 'custom-software-development'],
  'inventory-management-system': ['custom-erp-development', 'data-analytics', 'business-process-automation'],
  'procurement-management-system': ['custom-erp-development', 'business-process-automation', 'custom-software-development'],
};

function Detail({ s, extra }) {
  const path = `/solutions/${s.slug}`;
  const status = STATUS[s.status];
  const Icon = s.icon;
  useSeo({
    title: extra.seoTitle,
    description: extra.metaDescription,
    path,
    breadcrumbs: [{ name: 'Solutions', path: '/solutions' }, { name: s.title, path }],
    jsonLd: [
      serviceNode({ name: s.title, description: extra.metaDescription, path, serviceType: 'Custom business software development' }),
      faqNode(faqsPlain(extra.faqs), path),
    ],
  });

  const services = (SERVICE_LINKS[s.slug] || []).map((slug) => servicePages.find((p) => p.slug === slug)).filter(Boolean)
    .map((p) => ({ to: `/${p.slug}`, label: p.navLabel, text: plainText(p.metaDescription), icon: p.icon }));
  const others = Object.keys(solutionPages).filter((k) => k !== s.slug).map((k) => solutions.find((x) => x.slug === k))
    .map((x) => ({ to: `/solutions/${x.slug}`, label: x.title, icon: x.icon }));

  return (
    <div data-testid={`solution-page-${s.slug}`}>
      <PageHeader
        breadcrumbs={[{ label: 'Solutions', to: '/solutions' }, { label: s.title }]}
        eyebrow="Solution"
        title={<>{s.title.replace(/ System$/, '')} <span className="font-serif grad-text">{/ System$/.test(s.title) ? 'System' : ''}</span></>}
        subtitle={s.summary}
      >
        <div className="flex flex-col gap-5">
          <span className="inline-flex items-center gap-2 text-sm text-muted"><Tag tone={status.tone}>{status.label}</Tag> {status.note}</span>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button to="/contact" variant="primary" data-testid="solution-cta">Discuss this solution</Button>
            {s.status === 'delivered' && <Button to="/case-studies/integrated-digital-operations" variant="secondary">See the case study</Button>}
          </div>
        </div>
      </PageHeader>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-10 lg:gap-14">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="h-section !text-[clamp(1.5rem,1.15rem+1.4vw,2.25rem)]">Overview</h2>
              <p className="mt-4 text-base md:text-[17px] leading-relaxed text-ink"><RichText text={extra.overview} /></p>
            </div>
            <div>
              <h2 className="h-card !text-[1.375rem]">The problem</h2>
              <p className="mt-3 text-base leading-relaxed text-ink">{s.problem}</p>
            </div>
            <div>
              <h2 className="h-card !text-[1.375rem]">The solution</h2>
              <p className="mt-3 text-base leading-relaxed text-ink">{s.solution}</p>
            </div>
            {s.delivered && (
              <div className="rounded-2xl border border-[#BFE5CD] bg-[#F2FBF5] p-5">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#11693A] mb-2">What we have delivered</h2>
                <ul className="flex flex-col gap-1.5 text-[15px] leading-relaxed text-ink">{s.delivered.map((d) => <li key={d}>{d}</li>)}</ul>
              </div>
            )}
          </div>
          <aside className="card p-6 sm:p-8 self-start">
            <span className="inline-flex w-12 h-12 rounded-2xl grad-icon text-white items-center justify-center" aria-hidden="true"><Icon className="w-5 h-5" /></span>
            <h2 className={`${label} mt-5`}>Core modules</h2>
            <ul className="flex flex-wrap gap-2">
              {s.modules.map((m) => <li key={m} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm text-navy">{m}</li>)}
            </ul>
            <p className="mt-2 text-[13px] text-muted">The final module list is confirmed for each project.</p>
            <h2 className={`${label} mt-6`}>User roles</h2>
            <ul className="flex flex-col gap-1.5 text-[15px] text-ink">{s.roles.map((r) => <li key={r}>{r}</li>)}</ul>
          </aside>
        </div>
      </Section>

      {DEMO[s.slug] && (() => {
        return (
          <Section tone="soft" id="demo" aria-labelledby="demo-h">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div className="max-w-2xl">
                <p className="eyebrow mb-3">Interactive demonstration</p>
                <h2 id="demo-h" className="h-section !text-[clamp(1.5rem,1.15rem+1.4vw,2.25rem)]">See how a {s.title.toLowerCase()} <span className="font-serif grad-text">works</span></h2>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  An original demo interface built by YP Nova with fictional sample data — not a screenshot of a client system. Try the filters and
                  actions; nothing is saved. Actual functionality is configured to each project’s scope.
                </p>
              </div>
              <Link to="/case-studies/integrated-digital-operations" className="inline-flex items-center gap-1 min-h-[44px] text-[15px] font-semibold text-brand hover:underline shrink-0">
                Read the case study <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
            <DemoLoader name={DEMO[s.slug]} />
          </Section>
        );
      })()}

      <Section tone="lavender">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <div>
            <h2 className="h-section !text-[clamp(1.5rem,1.15rem+1.4vw,2.25rem)] mb-7">Typical workflow</h2>
            <StepList steps={s.workflow} />
          </div>
          <div className="flex flex-col gap-6">
            <div className="card p-6 sm:p-8">
              <h2 className="h-card !text-[1.25rem] mb-4">Business benefits</h2>
              <CheckList items={s.benefits} />
            </div>
            <div className="card p-6 sm:p-8">
              <h2 className="flex items-center gap-2 h-card !text-[1.25rem] mb-4"><Plug className="w-5 h-5 text-brand" aria-hidden="true" /> Integration possibilities</h2>
              <CheckList items={extra.integrations} />
              <h3 className={`${label} mt-6`}>Optional enhancements</h3>
              <ul className="flex flex-wrap gap-2">
                {s.enhancements.map((m) => <li key={m} className="rounded-full bg-lavender px-3 py-1 text-[13px] text-brand">{m}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="h-section !text-[clamp(1.5rem,1.15rem+1.4vw,2.25rem)]">Industry use cases</h2>
        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {extra.useCases.map((u, i) => {
            const ind = industries.find((x) => x.slug === u.industry);
            return (
              <Reveal as="li" key={u.industry} delay={0.03 + i * 0.05}>
                <Link to={`/industries/${ind.slug}`} className="group card card-hover h-full p-5 sm:p-6 flex items-start gap-4">
                  <span className="inline-flex w-11 h-11 shrink-0 rounded-xl bg-lavender text-brand items-center justify-center" aria-hidden="true"><ind.icon className="w-5 h-5" /></span>
                  <span>
                    <span className="flex items-center gap-1 font-display font-bold text-[1.0625rem] text-navy group-hover:text-brand">
                      {ind.name} <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <span className="mt-1 block text-[15px] leading-relaxed text-muted">{u.text}</span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      <Section tone="soft">
        <div className="max-w-3xl"><FaqList faqs={extra.faqs} /></div>
      </Section>

      <Section>
        <div className="flex flex-col gap-12">
          <RelatedLinks title="Related services" items={services} columns={3} />
          <RelatedLinks title="Other solutions" items={others} columns={others.length > 4 ? 3 : 4} />
        </div>
      </Section>

      <CtaBand title={`Interested in a ${s.title.toLowerCase()}?`} text="Tell us how this process runs today and what you want to change. We will suggest modules and a realistic first phase." />
    </div>
  );
}

export default function SolutionPage() {
  const { slug } = useParams();
  const s = solutions.find((x) => x.slug === slug);
  const extra = solutionPages[slug];
  if (!s || !extra) return <NotFound />;
  return <Detail key={slug} s={s} extra={extra} />;
}
