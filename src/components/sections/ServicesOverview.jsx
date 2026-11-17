import React from 'react';
import { Section, SectionHeading } from '@/components/common/PageShell';
import { IconBadge, ArrowLink } from '@/components/common/Bits';
import { Reveal } from '@/components/animations/Reveal';
import { serviceOverview } from '@/data/services';

export function ServicesOverview() {
  return (
    <Section data-testid="services-overview" tone="lavender">
      <SectionHeading
        eyebrow="What we do"
        title={<>Technology That Solves <span className="font-serif grad-text">Real Business</span> Problems</>}
        intro="Four areas of work, one team. We start from the operational problem and choose the technology that fits it."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {serviceOverview.map(({ icon, title, text, points, to }, i) => (
          <Reveal key={title} delay={0.05 + i * 0.06} className="card card-hover p-6 md:p-7 flex flex-col" data-testid={`service-overview-${i}`}>
            <IconBadge icon={icon} />
            <h3 className="h-card mt-5">{title}</h3>
            <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{text}</p>
            <ul className="mt-4 mb-3 flex flex-col gap-1.5">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-ink">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple shrink-0" aria-hidden="true" /> {p}
                </li>
              ))}
            </ul>
            <ArrowLink to={to} className="mt-auto">Learn More<span className="sr-only"> about {title}</span></ArrowLink>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
