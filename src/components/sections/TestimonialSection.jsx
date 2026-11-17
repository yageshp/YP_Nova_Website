import React from 'react';
import { Reveal } from '@/components/animations/Reveal';
import { AnimatedDashboard } from './AnimatedDashboard';

const focus = ['Custom Software', 'AI Automation', 'SaaS', 'MIS & Dashboards'];

/**
 * Brand statement + animated dashboard (original "TestimonialSection" slot).
 * It never contained a customer quote — it carries the YP Nova tagline.
 */
export function TestimonialSection() {
  return (
    <section className="px-5 sm:px-6 pt-4 pb-14 md:pb-20 max-w-3xl mx-auto flex flex-col items-center text-center">
      <Reveal className="w-full" delay={0.1}>
        <AnimatedDashboard />
      </Reveal>
      <Reveal delay={0.15} className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {focus.map((c) => (
          <span key={c} className="font-mono text-xs sm:text-[13px] tracking-wide text-muted">{c}</span>
        ))}
      </Reveal>
    </section>
  );
}
