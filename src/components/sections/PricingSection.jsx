import React from 'react';
import { Section, SectionHeading } from '@/components/common/PageShell';
import { Button } from '@/components/common/Button';
import { Reveal } from '@/components/animations/Reveal';
import { engagementModels } from '@/data/services';

/**
 * Engagement models (replaces the original placeholder pricing cards).
 * No rates are published: every estimate is based on actual scope.
 */
export function PricingSection({ tone = 'white' }) {
  return (
    <Section data-testid="pricing-section" tone={tone} id="engagement">
      <SectionHeading
        eyebrow="Engagement models"
        title={<>Ways to <span className="font-serif grad-text">work with us</span></>}
        intro="We do not publish fixed price lists. Cost depends on your requirements, the number of modules, the integrations involved and the scope of implementation — so every estimate is prepared for the project in front of us."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {engagementModels.map((m, i) => (
          <Reveal
            key={m.code}
            delay={0.05 + i * 0.06}
            data-testid={`engagement-${m.code}`}
            className={`relative overflow-hidden rounded-3xl p-6 md:p-7 flex flex-col ${
              i === 0 ? 'bg-navy text-white shadow-lift' : 'card card-hover'
            }`}
          >
            {i === 0 && <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full bg-purple/40 blur-3xl pointer-events-none" aria-hidden="true" />}
            <div className={`relative font-mono text-xs tracking-widest ${i === 0 ? 'text-soft' : 'text-brand'}`}>[{m.code}]</div>
            <h3 className={`relative h-card mt-3 ${i === 0 ? '!text-white' : ''}`}>{m.title}</h3>
            <p className={`relative mt-3 text-[15px] leading-relaxed ${i === 0 ? 'text-[#C9CFDD]' : 'text-muted'}`}>{m.text}</p>
            <p className={`relative mt-auto pt-5 text-sm font-medium ${i === 0 ? 'text-white' : 'text-ink'}`}>{m.suits}</p>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-line bg-white p-5 sm:p-6">
        <p className="text-[15px] text-muted max-w-xl">
          Share what you have in mind and we will reply with clarifying questions and a written estimate.
        </p>
        <Button to="/contact" variant="primary" className="shrink-0" data-testid="pricing-cta">Request a Project Estimate</Button>
      </div>
    </Section>
  );
}
