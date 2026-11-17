import React from 'react';
import { Target, Puzzle, Zap, Link2, TrendingUp, Handshake, LifeBuoy } from 'lucide-react';
import { Section, SectionHeading } from '@/components/common/PageShell';
import { Reveal } from '@/components/animations/Reveal';

const reasons = [
  { icon: Target, title: 'Business-focused development', desc: 'We begin with the operational problem and the people who face it, then decide what to build.' },
  { icon: Puzzle, title: 'Custom-built solutions', desc: 'Screens, fields and approvals follow your process and vocabulary — not a template.' },
  { icon: Zap, title: 'Practical automation', desc: 'We automate the repetitive steps that waste time and leave judgement with your team.' },
  { icon: Link2, title: 'Connected workflows', desc: 'Modules share one environment and one set of data, so information is entered once.' },
  { icon: TrendingUp, title: 'Scalable applications', desc: 'Systems are structured so new users, sites and modules can be added in phases.' },
  { icon: Handshake, title: 'Collaborative development', desc: 'You see working software early and often, and your feedback shapes each release.' },
  { icon: LifeBuoy, title: 'Ongoing support', desc: 'After go-live we stay available for fixes, updates and the improvements real usage reveals.' },
];

export function WhyUsSection() {
  return (
    <Section data-testid="why-us-section" tone="lavender">
      <SectionHeading
        eyebrow="Why YP Nova"
        title={<>Why <span className="font-serif grad-text">YP Nova</span></>}
        intro="Seven working principles that shape how we take a project from first conversation to a system people use every day."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
        {reasons.map(({ icon: Icon, title, desc }, i) => (
          <Reveal key={title} delay={0.04 + i * 0.04} className="card card-hover p-6" data-testid={`why-card-${i}`}>
            <span className="inline-flex w-11 h-11 rounded-xl grad-icon text-white items-center justify-center" aria-hidden="true">
              <Icon className="w-5 h-5" />
            </span>
            <h3 className="h-card !text-[1.0625rem] mt-4">{title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{desc}</p>
          </Reveal>
        ))}
        <Reveal delay={0.34} className="rounded-3xl border border-dashed border-soft bg-white/60 p-6 flex flex-col justify-center">
          <p className="font-serif !text-[1.75rem] leading-tight grad-text">Your Imagination, Our Creation.</p>
          <p className="mt-2 text-sm text-muted">The idea is yours. Turning it into dependable software is our job.</p>
        </Reveal>
      </div>
    </Section>
  );
}
