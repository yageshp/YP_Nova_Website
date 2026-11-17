import React from 'react';
import { Monitor, Server, Database, Plug, BarChart3, Cloud } from 'lucide-react';
import { Section, SectionHeading } from '@/components/common/PageShell';
import { Reveal } from '@/components/animations/Reveal';

/** Only technologies YP Nova actually uses or supports. Add to this list only once verified. */
export const techStack = [
  { icon: Monitor, group: 'Frontend', items: ['React', 'JavaScript'] },
  { icon: Server, group: 'Backend', items: ['Node.js', 'Express.js'] },
  { icon: Database, group: 'Database', items: ['MySQL', 'PostgreSQL', 'Prisma ORM'] },
  { icon: Plug, group: 'Integration', items: ['REST APIs', 'Google Sheets API'] },
  { icon: BarChart3, group: 'Analytics', items: ['Power BI'] },
  { icon: Cloud, group: 'Infrastructure', items: ['Docker', 'Nginx', 'VPS deployment'] },
];

export function TechStackSection() {
  return (
    <Section data-testid="tech-stack-section" tone="soft">
      <SectionHeading
        eyebrow="Technology"
        title={<>Our <span className="font-serif grad-text">Technology Stack</span></>}
        intro="A focused, proven set of tools that we know well — chosen for reliability and ease of maintenance."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {techStack.map(({ icon: Icon, group, items }, i) => (
          <Reveal key={group} delay={0.04 + i * 0.05} className="card p-6" data-testid={`tech-group-${group.toLowerCase()}`}>
            <div className="flex items-center gap-3">
              <span className="inline-flex w-10 h-10 rounded-xl bg-lavender text-brand items-center justify-center" aria-hidden="true">
                <Icon className="w-5 h-5" />
              </span>
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{group}</h3>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {items.map((t) => (
                <li key={t} className="rounded-full border border-line bg-white px-3.5 py-1.5 font-mono text-[13px] text-navy">{t}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
