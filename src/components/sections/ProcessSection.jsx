import React from 'react';
import { Section, SectionHeading } from '@/components/common/PageShell';
import { Reveal } from '@/components/animations/Reveal';

export const processSteps = [
  { n: '01', title: 'Discovery', desc: 'We learn how your operation works today, who is involved and what needs to change.' },
  { n: '02', title: 'Planning & Architecture', desc: 'Requirements, modules, data structure and phases are agreed and written down.' },
  { n: '03', title: 'UI/UX & Development', desc: 'Screens are designed and built in stages, with regular reviews of working software.' },
  { n: '04', title: 'Testing & Deployment', desc: 'The system is tested with real scenarios, deployed and handed over with training.' },
  { n: '05', title: 'Support & Improvement', desc: 'We maintain the application and extend it as your needs develop.' },
];

export function ProcessSection() {
  return (
    <Section data-testid="process-section">
      <SectionHeading
        eyebrow="How we work"
        title={<>Our <span className="font-serif grad-text">Development Process</span></>}
        intro="Five clear stages. You know what is happening at each one and what we need from you."
      />
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {processSteps.map((s, i) => (
          <Reveal as="li" key={s.n} delay={0.05 + i * 0.07} className="relative card card-hover p-6" data-testid={`process-step-${s.n}`}>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-medium text-brand bg-lavender rounded-full px-2.5 py-1">{s.n}</span>
              <span className="hidden lg:block flex-1 h-px bg-gradient-to-r from-soft/70 to-transparent" aria-hidden="true" />
            </div>
            <h3 className="h-card !text-[1.0625rem] mt-4">{s.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.desc}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
