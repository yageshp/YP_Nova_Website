import React from 'react';
import { Section, SectionHeading } from '@/components/common/PageShell';
import { Reveal } from '@/components/animations/Reveal';

/**
 * Original "Trusted by" logo wall. The fictional client wordmarks were removed.
 * Until genuine client logos are approved for publication, this shows the solution
 * and industry categories YP Nova works in. Add approved logos to `approvedLogos`
 * ({ name, src }) — with written permission only.
 */
export const approvedLogos = [];

const categories = [
  { name: 'VISITOR', sub: 'Management' },
  { name: 'MIS', sub: 'Dashboards' },
  { name: 'PERMITS', sub: 'Work authorisation' },
  { name: 'COMPLAINTS', sub: 'Help-desk' },
  { name: 'INVENTORY', sub: 'Stores & stock' },
  { name: 'WORKFORCE', sub: 'HR & attendance' },
  { name: 'PROCUREMENT', sub: 'Purchase orders' },
  { name: 'AI', sub: 'Assistants & automation' },
];

export function TrustedBySection() {
  const showLogos = approvedLogos.length > 0;
  return (
    <Section data-testid="trusted-by-section" className="!pt-0" tone="white">
      <SectionHeading
        eyebrow={showLogos ? 'Clients' : 'Where we focus'}
        title={showLogos ? <>Trusted by <span className="font-serif grad-text">our clients</span></> : <>Built for <span className="font-serif grad-text">operations-led</span> businesses</>}
        intro={showLogos ? undefined : 'The kinds of systems we are asked to build most often.'}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {showLogos
          ? approvedLogos.map((l) => (
              <div key={l.name} className="h-24 md:h-28 card flex items-center justify-center p-4">
                <img src={l.src} alt={l.name} loading="lazy" className="max-h-12 w-auto object-contain" />
              </div>
            ))
          : categories.map((c, i) => (
              <Reveal key={c.name} delay={0.04 + i * 0.04} data-testid={`focus-tile-${i}`}
                className="min-h-[96px] md:min-h-[112px] card card-hover flex flex-col items-center justify-center text-center px-2 py-4">
                <span className="font-mono text-[13px] sm:text-sm md:text-base tracking-[0.14em] sm:tracking-[0.2em] text-navy">{c.name}</span>
                <span className="text-[11px] uppercase tracking-wider text-muted mt-1.5">{c.sub}</span>
              </Reveal>
            ))}
      </div>
    </Section>
  );
}
