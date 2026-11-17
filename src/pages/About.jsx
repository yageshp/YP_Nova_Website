import React from 'react';
import { Code2, Sparkles, Workflow, BarChart3, Server, AppWindow } from 'lucide-react';
import { PageHeader, Section, SectionHeading } from '@/components/common/PageShell';
import { Button } from '@/components/common/Button';
import { CheckList } from '@/components/common/Bits';
import { CtaBand } from '@/components/common/CtaBand';
import { Reveal } from '@/components/animations/Reveal';
import { processSteps } from '@/components/sections/ProcessSection';
import { techStack } from '@/components/sections/TechStackSection';
import { company } from '@/config/company';
import { useSeo } from '@/hooks/useSeo';

const build = [
  { icon: Code2, title: 'Custom business applications', text: 'Web applications, portals and management systems designed around a specific operation.' },
  { icon: AppWindow, title: 'SaaS and multi-user platforms', text: 'Role-based systems for many users, sites or customers, with administration built in.' },
  { icon: Sparkles, title: 'AI-enabled features', text: 'Assistants, document processing and generative AI integrated into everyday business tools.' },
  { icon: Workflow, title: 'Automated workflows', text: 'Approvals, notifications, data synchronisation and scheduled reporting.' },
  { icon: BarChart3, title: 'MIS and dashboards', text: 'Operational reporting and KPI dashboards, including Power BI.' },
  { icon: Server, title: 'Deployment and upkeep', text: 'VPS hosting, Docker and Nginx setups, databases and ongoing maintenance.' },
];

const values = [
  { title: 'Practical before impressive', desc: 'We would rather deliver a simple system that is used every day than an ambitious one that is not.' },
  { title: 'Clarity in scope', desc: 'What is included, what is optional and what it depends on are written down before work begins.' },
  { title: 'Honest representation', desc: 'We describe our experience as it is. We do not publish invented clients, figures or testimonials.' },
  { title: 'Respect for your data', desc: 'Access is role-based, hosting is agreed with you, and your business information stays yours.' },
  { title: 'Working together', desc: 'Your team knows the operation; we know the technology. Good software needs both in the room.' },
  { title: 'Long-term view', desc: 'We build so the next module can be added without rebuilding the last one.' },
];

export default function About() {
  useSeo({
    title: 'About YP Nova | Custom Software & AI Development',
    description:
      'YP Nova is the technology brand of YP Security Services Pvt. Ltd., building custom software, ERP modules, AI solutions, business automation and dashboards in India.',
    path: '/about',
    pageType: 'AboutPage',
    breadcrumbs: [{ name: 'About', path: '/about' }],
  });

  return (
    <div data-testid="about-page">
      <PageHeader
        eyebrow="About YP Nova"
        title={<>Practical technology for businesses that <span className="font-serif grad-text">run on operations.</span></>}
        subtitle={`${company.brandName} is the technology brand of ${company.parentCompany} We design, build and support custom software, AI-enabled automation and business dashboards.`}
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <Button to="/contact" variant="primary">Work with us</Button>
          <Button to="/case-studies" variant="secondary">See our work</Button>
        </div>
      </PageHeader>

      {/* Who we are */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-10 lg:gap-14 items-start">
          <Reveal>
            <p className="eyebrow mb-3">Who we are</p>
            <h2 className="h-section">A software team with an <span className="font-serif grad-text">operations</span> background.</h2>
            <div className="mt-5 flex flex-col gap-4 text-base md:text-[17px] leading-relaxed text-muted">
              <p>
                {company.brandName} was created to solve a problem its parent company knows well: running services across
                many sites generates a constant flow of registers, approvals, reports and follow-ups, and most of it is still
                handled on paper, in spreadsheets and over phone calls.
              </p>
              <p>
                We build software that replaces that friction with clear, connected systems. Our work so far includes a
                Management Information System, a Visitor Management System, a Work Permit System and Complaint Management
                for facility and MEP operations.
              </p>
              <p>
                We bring the same approach to other businesses — understanding the process first, then building exactly
                what is needed to make it simpler.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative overflow-hidden rounded-[28px] bg-navy text-white p-7 sm:p-9">
            <div className="absolute -top-24 -right-20 w-64 h-64 rounded-full bg-purple/40 blur-3xl pointer-events-none" aria-hidden="true" />
            <p className="relative font-mono text-xs uppercase tracking-[0.16em] text-soft">Our promise</p>
            <p className="relative mt-4 font-serif !text-[2.25rem] sm:!text-[2.75rem] leading-[1.05] text-white">{company.tagline}</p>
            <p className="relative mt-5 text-[#C9CFDD] leading-relaxed">
              You bring the idea or the problem. We bring the design, engineering and care to turn it into software your
              team can depend on.
            </p>
            <dl className="relative mt-7 pt-6 border-t border-white/15 grid gap-3 text-sm">
              <div className="flex flex-col sm:flex-row sm:gap-3"><dt className="text-soft sm:w-32 shrink-0">Brand</dt><dd>{company.brandName}</dd></div>
              <div className="flex flex-col sm:flex-row sm:gap-3"><dt className="text-soft sm:w-32 shrink-0">Parent company</dt><dd>{company.parentCompany}</dd></div>
              <div className="flex flex-col sm:flex-row sm:gap-3"><dt className="text-soft sm:w-32 shrink-0">Focus</dt><dd>Custom software, AI, SaaS, automation, analytics and IT services</dd></div>
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* What we build */}
      <Section tone="lavender">
        <SectionHeading eyebrow="What we build" title={<>From a single module to a <span className="font-serif grad-text">connected</span> platform</>} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {build.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={0.04 + i * 0.05} className="card card-hover p-6">
              <span className="inline-flex w-11 h-11 rounded-xl grad-icon text-white items-center justify-center" aria-hidden="true"><Icon className="w-5 h-5" /></span>
              <h3 className="h-card !text-[1.0625rem] mt-4">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{text}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Technical capabilities */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <div>
            <p className="eyebrow mb-3">Technical capabilities</p>
            <h2 className="h-section">A focused stack we <span className="font-serif grad-text">know well.</span></h2>
            <p className="lead mt-4">We work with a deliberately small set of proven technologies, so what we build is reliable and straightforward to maintain.</p>
            <dl className="mt-7 flex flex-col divide-y divide-line border-y border-line">
              {techStack.map(({ group, items }) => (
                <div key={group} className="py-3.5 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted sm:w-36 shrink-0">{group}</dt>
                  <dd className="text-[15px] font-medium text-navy">{items.join(' · ')}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <p className="eyebrow mb-3">Development approach</p>
            <h2 className="h-section">Five stages, <span className="font-serif grad-text">no surprises.</span></h2>
            <ol className="mt-7 flex flex-col gap-3">
              {processSteps.map((s) => (
                <li key={s.n} className="card p-4 sm:p-5 flex items-start gap-4">
                  <span className="font-mono text-xs font-medium text-brand bg-lavender rounded-full px-2.5 py-1 shrink-0">{s.n}</span>
                  <div>
                    <h3 className="font-display font-bold text-base text-navy">{s.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* Business focus + commitment */}
      <Section tone="soft">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
          <Reveal className="card p-6 sm:p-8 md:p-10">
            <p className="eyebrow mb-3">Our business focus</p>
            <h2 className="h-card !text-[1.5rem]">Organisations where daily operations matter most</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              We are most useful to businesses that coordinate people, sites and records every day:
            </p>
            <CheckList className="mt-4" columns={2} items={['Facility management', 'Construction & MEP', 'Security services', 'Manufacturing', 'Logistics and retail', 'Growing businesses']} />
          </Reveal>
          <Reveal delay={0.08} className="card p-6 sm:p-8 md:p-10">
            <p className="eyebrow mb-3">Our commitment</p>
            <h2 className="h-card !text-[1.5rem]">Practical digital transformation</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              Digital transformation does not have to mean a large, risky programme. For us it means replacing one
              manual process at a time with something better, proving it works, and building on it. Each step should pay
              for itself in time saved and clarity gained.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section>
        <SectionHeading eyebrow="How we behave" title={<>What you can <span className="font-serif grad-text">expect</span> from us</>} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={0.03 + i * 0.04} className="card p-6">
              <span className="font-mono text-xs text-brand">[{String(i + 1).padStart(2, '0')}]</span>
              <h3 className="h-card !text-[1.0625rem] mt-2">{v.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{v.desc}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand title="Let’s see whether we are the right fit." text="A first conversation costs nothing and commits you to nothing. Tell us what you are trying to achieve." />
    </div>
  );
}
