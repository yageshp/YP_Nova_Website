import React from 'react';
import { LayoutDashboard, UserCheck, FileCheck2, MessageSquareWarning } from 'lucide-react';
import { Section } from '@/components/common/PageShell';
import { Tag } from '@/components/common/Bits';
import { Button } from '@/components/common/Button';
import { Reveal } from '@/components/animations/Reveal';
import { featuredProject } from '@/data/caseStudies';
import { featuredClientName } from '@/config/company';

const icons = { mis: LayoutDashboard, vms: UserCheck, permit: FileCheck2, complaints: MessageSquareWarning };

export function FeaturedProject() {
  return (
    <Section data-testid="featured-project" tone="soft">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 lg:gap-14 items-start">
        <Reveal className="lg:sticky lg:top-28">
          <div className="flex flex-wrap gap-2 mb-4">
            <Tag tone="green">Client project</Tag>
            <Tag tone="outline">{featuredProject.category}</Tag>
          </div>
          <h2 className="h-section">
            Integrated Digital <span className="font-serif grad-text">Operations</span> Management
          </h2>
          <p className="mt-2 font-mono text-xs tracking-wide text-muted">{featuredClientName()}</p>
          <p className="lead mt-5">{featuredProject.summary}</p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Button to={`/case-studies/${featuredProject.slug}`} variant="primary" data-testid="featured-project-cta">
              Read the case study
            </Button>
            <Button to={`/case-studies/${featuredProject.slug}#mis-demo`} variant="secondary" data-testid="featured-project-demos">Try the interactive demos</Button>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featuredProject.modules.map((m, i) => {
            const Icon = icons[m.key];
            return (
              <Reveal key={m.key} delay={0.06 + i * 0.07} className="card p-5 md:p-6 flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="inline-flex w-10 h-10 rounded-xl grad-icon text-white items-center justify-center shrink-0" aria-hidden="true">
                    <Icon className="w-[18px] h-[18px]" />
                  </span>
                  <h3 className="font-display font-bold text-[1.05rem] leading-snug text-navy">{m.name}</h3>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{m.purpose}</p>
                <ol className="mt-4 pt-4 border-t border-line flex flex-col gap-1.5">
                  {m.flow.map((step, n) => (
                    <li key={step} className="flex items-start gap-2 text-sm text-ink">
                      <span className="font-mono text-[11px] text-brand mt-0.5 shrink-0">{String(n + 1).padStart(2, '0')}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
