import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, UserCheck, FileCheck2, MessageSquareWarning, Info, ArrowUpRight, Phone } from 'lucide-react';
import { PageHeader, Section, SectionHeading, container } from '@/components/common/PageShell';
import { Tag, CheckList } from '@/components/common/Bits';
import { Button } from '@/components/common/Button';
import { CtaBand } from '@/components/common/CtaBand';
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon';
import { Reveal } from '@/components/animations/Reveal';
import { ArchitectureDiagram } from '@/components/demos/ArchitectureDiagram';
import { DemoLoader } from '@/components/demos/DemoLoader';
import { featuredProject as p } from '@/data/caseStudies';
import { approachSteps } from '@/data/approach';
import { featuredClientName, company } from '@/config/company';
import { useSeo } from '@/hooks/useSeo';

const MODULE_ICON = { mis: LayoutDashboard, vms: UserCheck, permit: FileCheck2, complaints: MessageSquareWarning };
const DEMOS = [
  { key: 'mis', demo: 'mis', id: 'mis-demo', solution: '/solutions/management-information-system',
    shows: 'Dashboard, meter-reading table with site / type / period filters, report previews with CSV export, and a role switch showing role-based access.' },
  { key: 'vms', demo: 'vms', id: 'vms-demo', solution: '/solutions/visitor-management-system',
    shows: 'Today’s visitors with check-in / check-out, a working registration form, and visitor history with date, status and search filters.' },
  { key: 'permit', demo: 'permit', id: 'permit-demo', solution: '/solutions/work-permit-management-system',
    shows: 'A permit register, permit details with the approval workflow, review / approve / return actions, and a new permit request form.' },
  { key: 'complaints', demo: 'cms', id: 'cms-demo', solution: '/solutions/complaint-management-system',
    shows: 'Complaint list with filters, complaint details with resolution history, assignment to a department and person, and status updates.' },
];
const TOC = [
  ['overview', 'Overview'], ['context', 'Business context'], ['challenges', 'Challenges'], ['architecture', 'Architecture'],
  ['mis-demo', 'MIS demo'], ['vms-demo', 'VMS demo'], ['permit-demo', 'Work Permit demo'], ['cms-demo', 'Complaints demo'],
  ['stack', 'Technology'], ['integration', 'Integration'], ['delivery', 'Delivery approach'], ['value', 'Business value'],
];

export default function CaseStudyDetail() {
  const path = `/case-studies/${p.slug}`;
  useSeo({
    title: 'Integrated Digital Operations System — Case Study',
    description:
      'Case study with interactive demos: MIS with Google Sheets API reporting, visitor management, work permit and complaint management for facility and MEP operations.',
    path,
    breadcrumbs: [{ name: 'Case Studies', path: '/case-studies' }, { name: p.shortTitle, path }],
  });

  return (
    <div data-testid="case-study-detail">
      <PageHeader
        breadcrumbs={[{ label: 'Case Studies', to: '/case-studies' }, { label: p.shortTitle }]}
        eyebrow={`Case study · ${p.category}`}
        title={<>Integrated Digital <span className="font-serif grad-text">Operations</span> Management System</>}
        subtitle={p.subtitle}
      >
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
          {[['Client', featuredClientName()], ['Sector', p.category], ['Modules', 'MIS · VMS · Work Permit · Complaints']].map(([k, v]) => (
            <div key={k} className="rounded-2xl bg-white/80 border border-line p-4">
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{k}</dt>
              <dd className="mt-1 text-[15px] font-semibold text-navy leading-snug">{v}</dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <nav aria-label="Case study sections" className="sticky top-[68px] z-20 bg-white/95 backdrop-blur border-b border-line">
        <ul className={`${container} flex gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}>
          {TOC.map(([id, label]) => (
            <li key={id} className="shrink-0">
              <a href={`#${id}`} className="inline-flex items-center min-h-[40px] px-3 rounded-full text-[13px] font-medium text-ink hover:bg-lavender hover:text-brand whitespace-nowrap">{label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* 1–3 */}
      <Section id="overview" className="scroll-mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-10 lg:gap-14">
          <div>
            <p className="eyebrow mb-3">1 · Project overview</p>
            <h2 className="h-section">One environment for <span className="font-serif grad-text">daily operations</span></h2>
            <p className="mt-4 text-base md:text-[17px] leading-relaxed text-ink">{p.overview}</p>
            <div id="context" className="scroll-mt-32 mt-10">
              <p className="eyebrow mb-3">2 · Business context</p>
              <p className="text-base md:text-[17px] leading-relaxed text-ink">{p.context}</p>
            </div>
          </div>
          <div id="challenges" className="scroll-mt-32 card p-6 sm:p-8 self-start">
            <p className="eyebrow mb-3">3 · Operational challenges</p>
            <ul className="flex flex-col gap-3">
              {p.challenges.map((c) => (
                <li key={c} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#D08A00] shrink-0" aria-hidden="true" /> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 4 */}
      <Section id="architecture" tone="lavender" className="scroll-mt-32">
        <SectionHeading eyebrow="4 · Solution architecture" title={<>How the four <span className="font-serif grad-text">modules connect</span></>}
          intro="A functional view of the delivered environment: who uses each module, where it runs, and where its data comes from." />
        <ArchitectureDiagram />
      </Section>

      {/* 5–8 demos */}
      <div className={`${container} pt-14 md:pt-20`}>
        <div className="flex items-start gap-3 rounded-2xl border border-[#F3D9A4] bg-[#FFF8E8] p-4 sm:p-5" data-testid="demo-disclaimer">
          <Info className="w-5 h-5 mt-0.5 shrink-0 text-[#8A5200]" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-[#6B4300]">
            <strong>Interactive product demonstrations.</strong> These are original interfaces built by YP Nova to show how each module works. They are
            not screenshots of the client’s system and contain only fictional sample data. Everything you do in them stays in your browser. Actual
            functionality is configured to each project’s scope.
          </p>
        </div>
      </div>
      {DEMOS.map(({ key, demo, id, solution, shows }, i) => {
        const m = p.modules.find((x) => x.key === key);
        const Icon = MODULE_ICON[key];
        return (
          <section key={key} id={id} aria-labelledby={`${id}-h`} className={`scroll-mt-32 ${i % 2 ? 'bg-lavender/50' : ''}`}>
            <div className={`${container} py-12 md:py-16`}>
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-6 lg:gap-10 mb-6">
                <div>
                  <p className="eyebrow mb-3">{5 + i} · {m.name} demonstration</p>
                  <h2 id={`${id}-h`} className="flex items-center gap-3 h-section !text-[clamp(1.5rem,1.15rem+1.4vw,2.25rem)]">
                    <span className="inline-flex w-11 h-11 shrink-0 rounded-2xl grad-icon text-white items-center justify-center" aria-hidden="true"><Icon className="w-5 h-5" /></span>
                    {m.name}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-muted">{m.purpose}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-[#BFE5CD] bg-[#F2FBF5] p-4">
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#11693A] mb-2">Delivered in the project</h3>
                    <ul className="flex flex-col gap-1 text-[14px] leading-snug text-ink">{m.facts.map((f) => <li key={f}>• {f}</li>)}</ul>
                  </div>
                  <div className="rounded-2xl border border-line bg-white p-4">
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted mb-2">What the demo shows</h3>
                    <p className="text-[14px] leading-snug text-ink">{shows}</p>
                    <Link to={solution} className="mt-2 inline-flex items-center gap-1 min-h-[36px] text-[14px] font-semibold text-brand hover:underline">
                      {m.name} solution <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
              <DemoLoader name={demo} />
            </div>
          </section>
        );
      })}

      {/* 9–10 */}
      <Section id="stack" className="scroll-mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <div>
            <p className="eyebrow mb-3">9 · Technology stack</p>
            <h2 className="h-section !text-[clamp(1.5rem,1.15rem+1.4vw,2.25rem)]">Technologies used in the project</h2>
            <ul className="mt-5 flex flex-wrap gap-2">{p.stack.map((s) => <li key={s}><Tag>{s}</Tag></li>)}</ul>
            <p className="mt-4 text-[14px] leading-relaxed text-muted">
              These technologies were used across the project. Module-specific facts are listed only where confirmed — for example, the MIS reads
              data through the Google Sheets API, and the VMS is deployed on a VPS. Not every technology applies to every module.
            </p>
          </div>
          <div id="integration" className="scroll-mt-32">
            <p className="eyebrow mb-3">10 · Integration overview</p>
            <ul className="flex flex-col gap-3">
              {p.integrations.map((it) => (
                <li key={it.title} className="card p-4 sm:p-5">
                  <h3 className="font-display font-bold text-[15px] text-navy">{it.title}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-muted">{it.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 11 */}
      <Section id="delivery" tone="soft" className="scroll-mt-32">
        <SectionHeading eyebrow="11 · Delivery approach" title={<>How we approach <span className="font-serif grad-text">every project</span></>} />
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {approachSteps.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={0.03 + i * 0.04} className="card p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-medium text-brand bg-lavender rounded-full px-2.5 py-1">{String(i + 1).padStart(2, '0')}</span>
                <Icon className="w-5 h-5 text-brand" aria-hidden="true" />
              </div>
              <h3 className="h-card !text-[1.0625rem] mt-3">{title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{text}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* 12 */}
      <Section id="value" className="scroll-mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-10">
          <div>
            <p className="eyebrow mb-3">12 · Business value</p>
            <h2 className="h-section !text-[clamp(1.5rem,1.15rem+1.4vw,2.25rem)]">What the system <span className="font-serif grad-text">changes</span></h2>
            <CheckList items={p.outcomes} className="mt-6 [&_li]:text-base" />
            <p className="mt-5 text-[14px] text-muted">Value is described qualitatively: no measured performance figures have been verified and approved for publication.</p>
          </div>
          <aside className="flex flex-col gap-4 self-start">
            <div className="flex items-start gap-3 rounded-2xl border border-line bg-[#FBFAFE] p-5" data-testid="confidentiality-note">
              <Info className="w-5 h-5 mt-0.5 shrink-0 text-brand" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-muted">{p.disclosure}</p>
            </div>
            <div className="card p-5 sm:p-6">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted mb-3">Related</h2>
              <div className="flex flex-col gap-2">
                <Button to="/data-analytics" variant="secondary" className="!justify-start">MIS &amp; Power BI dashboards</Button>
                <Button to="/custom-software-development" variant="secondary" className="!justify-start">Custom software development</Button>
                <Button to="/industries/facility-management" variant="secondary" className="!justify-start">Facility management software</Button>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* 13 */}
      <CtaBand title="Need a similar operations system?" text="Tell us which records and approvals your sites handle today. We will walk you through these modules and suggest a practical first phase." />
      <div className={`${container} -mt-8 pb-14 flex flex-wrap gap-3`}>
        <Button href={company.phone.href} variant="secondary"><Phone className="w-4 h-4 text-brand" aria-hidden="true" /> {company.phone.display}</Button>
        <Button href={company.whatsapp.href} target="_blank" rel="noopener noreferrer" variant="secondary"><WhatsAppIcon className="w-5 h-5 text-[#1DA851]" /> WhatsApp</Button>
      </div>
    </div>
  );
}
