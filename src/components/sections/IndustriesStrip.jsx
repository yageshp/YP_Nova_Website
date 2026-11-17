import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Section, SectionHeading } from '@/components/common/PageShell';
import { Button } from '@/components/common/Button';
import { Reveal } from '@/components/animations/Reveal';
import { industries } from '@/data/industries';

export function IndustriesStrip() {
  const featured = industries.filter((i) => i.priority);
  const others = industries.filter((i) => !i.priority);
  return (
    <Section data-testid="industries-strip">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12">
        <SectionHeading
          className="!mb-0"
          eyebrow="Industries"
          title={<>Industries <span className="font-serif grad-text">we serve</span></>}
          intro="We work best with operations-led organisations — where sites, teams and daily records need to stay connected."
        />
        <Button to="/industries" variant="secondary" className="shrink-0 self-start md:self-auto">Explore industries</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {featured.map(({ slug, icon: Icon, name, summary }, i) => (
          <Reveal key={slug} delay={0.05 + i * 0.06}>
            <Link to={`/industries/${slug}`} data-testid={`industry-card-${slug}`} className="group card card-hover h-full p-6 flex flex-col">
              <span className="inline-flex w-11 h-11 rounded-xl bg-lavender text-brand items-center justify-center" aria-hidden="true">
                <Icon className="w-5 h-5" />
              </span>
              <h3 className="h-card !text-[1.125rem] mt-4 group-hover:text-brand transition-colors">{name}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted line-clamp-4">{summary}</p>
              <span className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                View industry <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-6 flex flex-wrap gap-2.5">
        {others.map(({ slug, name }) => (
          <Link
            key={slug}
            to={`/industries/${slug}`}
            data-testid={`industry-chip-${slug}`}
            className="inline-flex items-center min-h-[44px] rounded-full border border-line bg-white px-4 text-sm font-medium text-ink hover:border-purple/40 hover:bg-lavender hover:text-brand transition-colors"
          >
            {name}
          </Link>
        ))}
      </Reveal>
    </Section>
  );
}
