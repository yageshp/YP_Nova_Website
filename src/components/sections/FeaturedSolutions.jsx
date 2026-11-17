import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Section, SectionHeading } from '@/components/common/PageShell';
import { Tag } from '@/components/common/Bits';
import { Button } from '@/components/common/Button';
import { Reveal } from '@/components/animations/Reveal';
import { solutions, homeSolutionSlugs, STATUS, solutionPages } from '@/data/solutions';

export function FeaturedSolutions() {
  const list = homeSolutionSlugs.map((slug) => solutions.find((s) => s.slug === slug));
  return (
    <Section data-testid="featured-solutions">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 md:mb-12">
        <SectionHeading
          className="!mb-0"
          eyebrow="Solutions"
          title={<>Business systems we <span className="font-serif grad-text">build</span></>}
          intro="Some of these we have already delivered in client projects; the others are built as custom developments. Each card says which."
        />
        <div className="flex flex-wrap gap-2 shrink-0" aria-label="Legend">
          <Tag tone="green">{STATUS.delivered.label}</Tag>
          <Tag tone="outline">{STATUS.custom.label}</Tag>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {list.map(({ slug, icon: Icon, title, summary, status }, i) => (
          <Reveal key={slug} delay={0.04 + i * 0.04}>
            <Link
              to={slug in solutionPages ? `/solutions/${slug}` : slug === 'custom-erp-business-applications' ? '/custom-erp-development' : slug === 'business-intelligence-dashboards' ? '/data-analytics' : `/solutions#${slug}`}
              data-testid={`home-solution-${slug}`}
              className="group card card-hover h-full p-5 md:p-6 flex flex-col"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex w-11 h-11 rounded-xl bg-lavender text-brand items-center justify-center" aria-hidden="true">
                  <Icon className="w-5 h-5" />
                </span>
                <Tag tone={STATUS[status].tone}>{STATUS[status].label}</Tag>
              </div>
              <h3 className="h-card !text-[1.125rem] mt-4 group-hover:text-brand transition-colors">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{summary}</p>
              <span className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                View details <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Button to="/solutions" variant="secondary">See all solutions</Button>
      </div>
    </Section>
  );
}
