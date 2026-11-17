import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PageHeader, Section, SectionHeading } from '@/components/common/PageShell';
import { Button } from '@/components/common/Button';
import { Tag } from '@/components/common/Bits';
import { CtaBand } from '@/components/common/CtaBand';
import { Reveal } from '@/components/animations/Reveal';
import { industries } from '@/data/industries';
import { useSeo } from '@/hooks/useSeo';

function IndustryCard({ industry, large = false, delay = 0 }) {
  const { slug, icon: Icon, name, summary, solutions, experience } = industry;
  return (
    <Reveal delay={delay} className="h-full">
      <Link to={`/industries/${slug}`} data-testid={`industry-card-${slug}`} className="group card card-hover h-full p-6 md:p-7 flex flex-col">
        <div className="flex items-center justify-between gap-3">
          <span className={`inline-flex w-12 h-12 rounded-2xl items-center justify-center ${large ? 'grad-icon text-white' : 'bg-lavender text-brand'}`} aria-hidden="true">
            <Icon className="w-5 h-5" />
          </span>
          {experience && <Tag tone="green">Project experience</Tag>}
        </div>
        <h3 className="h-card mt-5 group-hover:text-brand transition-colors">{name}</h3>
        <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{summary}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {solutions.slice(0, large ? 4 : 3).map((s) => (
            <li key={s} className="rounded-full bg-[#F6F4FB] px-2.5 py-1 text-[12px] text-ink">{s}</li>
          ))}
        </ul>
        <span className="mt-auto pt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand">
          Explore {name} <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </span>
      </Link>
    </Reveal>
  );
}

export default function Industries() {
  useSeo({
    title: 'Software Solutions by Industry',
    description:
      'Industry software from YP Nova for construction and MEP, facility management, security services, manufacturing, logistics, retail, healthcare and more.',
    path: '/industries',
    pageType: 'CollectionPage',
    breadcrumbs: [{ name: 'Industries', path: '/industries' }],
  });
  const priority = industries.filter((i) => i.priority);
  const others = industries.filter((i) => !i.priority);

  return (
    <div data-testid="industries-page">
      <PageHeader
        eyebrow="Industries"
        title={<>Software shaped by how each <span className="font-serif grad-text">industry</span> really operates.</>}
        subtitle="Every sector has its own routines, records and pressures. Choose your industry to see the challenges we focus on, a typical workflow and the modules that usually help."
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <Button to="/contact" variant="primary">Talk about your industry</Button>
          <Button to="/solutions" variant="secondary">View solutions</Button>
        </div>
      </PageHeader>

      <Section>
        <SectionHeading eyebrow="Focus industries" title={<>Where our experience is <span className="font-serif grad-text">deepest</span></>} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {priority.map((ind, i) => <IndustryCard key={ind.slug} industry={ind} large delay={0.04 + i * 0.05} />)}
        </div>
      </Section>

      <Section tone="lavender">
        <SectionHeading eyebrow="More industries" title={<>Other sectors <span className="font-serif grad-text">we support</span></>} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {others.map((ind, i) => <IndustryCard key={ind.slug} industry={ind} delay={0.03 + i * 0.03} />)}
        </div>
      </Section>

      <CtaBand title="Do not see your industry?" text="The same approach applies wherever work depends on records, approvals and coordination between people. Tell us about your operation." />
    </div>
  );
}
