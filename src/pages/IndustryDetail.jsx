import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlertTriangle, Wrench, ArrowUpRight, Info } from 'lucide-react';
import { PageHeader, Section, SectionHeading } from '@/components/common/PageShell';
import { Button } from '@/components/common/Button';
import { CheckList, StepList } from '@/components/common/Bits';
import { CtaBand } from '@/components/common/CtaBand';
import { Reveal } from '@/components/animations/Reveal';
import { getIndustry, industries } from '@/data/industries';
import { solutions as allSolutions, solutionPages } from '@/data/solutions';
import { useSeo, serviceNode } from '@/hooks/useSeo';
import { servicePages } from '@/data/servicePages';
import { concepts, featuredProject, CONCEPT_LABEL } from '@/data/caseStudies';
import { RelatedLinks } from '@/components/common/RelatedLinks';
import { plainText } from '@/components/common/RichText';
import NotFound from './NotFound';

function Detail({ industry }) {
  const { slug, icon: Icon, name, summary, experience, challenges, problems, solutions, workflow, modules, benefits, note } = industry;
  useSeo({
    title: industry.seoTitle,
    description: industry.metaDescription,
    path: `/industries/${slug}`,
    breadcrumbs: [{ name: 'Industries', path: '/industries' }, { name, path: `/industries/${slug}` }],
    jsonLd: serviceNode({
      name: industry.seoTitle,
      description: industry.metaDescription,
      path: `/industries/${slug}`,
      serviceType: 'Custom business software development',
      audience: name,
    }),
  });
  const relServices = industry.services.map((s) => servicePages.find((p) => p.slug === s)).filter(Boolean)
    .map((p) => ({ to: `/${p.slug}`, label: p.navLabel, text: plainText(p.metaDescription), icon: p.icon }));
  const isProjectIndustry = ['facility-management', 'construction-mep'].includes(slug);
  const demo = concepts.find((c) => c.industry === name);
  const related = industries.filter((i) => i.slug !== slug && i.priority).slice(0, 3);

  return (
    <div data-testid={`industry-page-${slug}`}>
      <PageHeader
        breadcrumbs={[{ label: 'Industries', to: '/industries' }, { label: name }]}
        eyebrow="Industry"
        title={<>Software for <span className="font-serif grad-text">{name}</span></>}
        subtitle={summary}
      >
        <div className="flex flex-col gap-5">
          {experience && (
            <p className="inline-flex items-start gap-2.5 self-start rounded-2xl border border-[#BFE5CD] bg-[#F2FBF5] px-4 py-3 text-sm text-[#0E5A31] max-w-xl">
              <Icon className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" /> {experience}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button to="/contact" variant="primary" data-testid="industry-cta">Discuss your {name.toLowerCase()} project</Button>
            <Button to="/solutions" variant="secondary">View all solutions</Button>
          </div>
        </div>
      </PageHeader>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <Reveal className="card p-6 sm:p-8">
            <span className="inline-flex w-11 h-11 rounded-xl bg-[#FFF4DE] text-[#8A5200] items-center justify-center" aria-hidden="true"><AlertTriangle className="w-5 h-5" /></span>
            <h2 className="h-card !text-[1.375rem] mt-4">Industry challenges</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {challenges.map((c) => (
                <li key={c} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#D08A00] shrink-0" aria-hidden="true" /> {c}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="card p-6 sm:p-8">
            <span className="inline-flex w-11 h-11 rounded-xl bg-lavender text-brand items-center justify-center" aria-hidden="true"><Wrench className="w-5 h-5" /></span>
            <h2 className="h-card !text-[1.375rem] mt-4">Day-to-day operational problems</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {problems.map((c) => (
                <li key={c} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple shrink-0" aria-hidden="true" /> {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section tone="lavender">
        <SectionHeading
          eyebrow="Relevant solutions"
          title={<>What we would <span className="font-serif grad-text">build</span></>}
          intro="The solutions most often relevant to this industry. Each is configured to your sites, teams and reports."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {solutions.map((title, i) => {
            const sol = allSolutions.find((s) => s.title === title);
            const SolIcon = sol?.icon;
            return (
              <Reveal key={title} delay={0.04 + i * 0.05}>
                <Link to={!sol ? '/solutions' : sol.slug in solutionPages ? `/solutions/${sol.slug}` : sol.slug === 'custom-erp-business-applications' ? '/custom-erp-development' : sol.slug === 'business-intelligence-dashboards' ? '/data-analytics' : `/solutions#${sol.slug}`} className="group card card-hover h-full p-5 sm:p-6 flex items-start gap-4">
                  {SolIcon && (
                    <span className="inline-flex w-11 h-11 shrink-0 rounded-xl bg-lavender text-brand items-center justify-center" aria-hidden="true"><SolIcon className="w-5 h-5" /></span>
                  )}
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5 font-display font-bold text-[1.0625rem] text-navy group-hover:text-brand transition-colors">
                      {title} <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                    </span>
                    {sol && <span className="mt-1 block text-[15px] leading-relaxed text-muted">{sol.summary}</span>}
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <div>
            <p className="eyebrow mb-3">Typical workflow</p>
            <h2 className="h-section mb-7">How it works <span className="font-serif grad-text">in practice</span></h2>
            <StepList steps={workflow} />
          </div>
          <div className="flex flex-col gap-6">
            <div className="card p-6 sm:p-8">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted mb-3">Potential modules</h2>
              <ul className="flex flex-wrap gap-2">
                {modules.map((m) => <li key={m} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm text-navy">{m}</li>)}
              </ul>
              <p className="mt-3 text-[13px] text-muted">The final module list is agreed with you during discovery.</p>
            </div>
            <div className="card p-6 sm:p-8">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted mb-3">Benefits you can expect</h2>
              <CheckList items={benefits} />
            </div>
            {note && (
              <p className="flex items-start gap-2.5 rounded-2xl border border-line bg-[#FBFAFE] p-4 text-sm text-muted">
                <Info className="w-4 h-4 mt-0.5 shrink-0 text-brand" aria-hidden="true" /> {note}
              </p>
            )}
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-12">
          <RelatedLinks title={`Services for ${name.toLowerCase()}`} items={relServices} columns={3} />
          {(isProjectIndustry || demo) && (
            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted mb-4">{isProjectIndustry ? 'Related case study' : 'Related solution concept'}</h2>
              {isProjectIndustry ? (
                <Link to={`/case-studies/${featuredProject.slug}`} className="group card card-hover p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4" data-testid="industry-case-link">
                  <span>
                    <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-[#11693A]">Client project · {featuredProject.category}</span>
                    <span className="mt-2 block font-display font-bold text-xl text-navy group-hover:text-brand">{featuredProject.title}</span>
                    <span className="mt-1 block text-[15px] text-muted">MIS, visitor management, work permits and complaint management in one environment.</span>
                  </span>
                  <ArrowUpRight className="w-6 h-6 text-brand shrink-0" aria-hidden="true" />
                </Link>
              ) : (
                <Link to="/case-studies" className="group card card-hover p-6 sm:p-8 flex flex-col gap-2" data-testid="industry-concept-link">
                  <span className="font-mono text-[11px] text-[#7A4800]">{CONCEPT_LABEL}</span>
                  <span className="font-display font-bold text-xl text-navy group-hover:text-brand">{demo.title}</span>
                  <span className="text-[15px] text-muted">{demo.scenario}</span>
                </Link>
              )}
            </div>
          )}
        </div>
      </Section>

      <Section tone="soft" className="[&>div]:!py-12">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted mb-4">Other focus industries</h2>
        <div className="flex flex-wrap gap-2.5">
          {related.map((r) => (
            <Link key={r.slug} to={`/industries/${r.slug}`} className="inline-flex items-center min-h-[44px] rounded-full border border-line bg-white px-4 text-sm font-medium text-ink hover:border-purple/40 hover:text-brand transition-colors">
              {r.name}
            </Link>
          ))}
          <Link to="/industries" className="inline-flex items-center gap-1 min-h-[44px] px-3 text-sm font-semibold text-brand">
            All industries <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </Section>

      <CtaBand title={`Let’s talk about your ${name.toLowerCase()} operation.`} text="Tell us how the work is recorded today and what you would like to see instead. We will suggest a practical first phase." />
    </div>
  );
}

export default function IndustryDetail() {
  const { slug } = useParams();
  const industry = getIndustry(slug);
  if (!industry) return <NotFound />;
  return <Detail key={slug} industry={industry} />;
}
