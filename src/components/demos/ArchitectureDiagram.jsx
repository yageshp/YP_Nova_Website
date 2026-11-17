import React from 'react';
import { UserCheck, FileCheck2, MessageSquareWarning, LayoutDashboard, Sheet, Server, Database, Users, ArrowDown } from 'lucide-react';

/**
 * Functional architecture of the delivered operations project.
 * Technology is mapped to a module only where that mapping is confirmed; the rest of the stack is
 * shown as project-level technology.
 */
const people = [
  { label: 'Security / reception', to: 'VMS' },
  { label: 'Contractors & site engineers', to: 'Work permits' },
  { label: 'Help-desk & technicians', to: 'Complaints' },
  { label: 'Site teams (Google Sheets)', to: 'MIS data' },
  { label: 'Management', to: 'MIS dashboards' },
];

const Arrow = () => (
  <div className="flex justify-center py-1.5" aria-hidden="true"><ArrowDown className="w-5 h-5 text-soft" /></div>
);

function Module({ icon: Icon, title, facts, tone }) {
  return (
    <div className={`rounded-xl border p-3 sm:p-4 bg-white ${tone}`}>
      <div className="flex items-center gap-2">
        <span className="inline-flex w-8 h-8 rounded-lg grad-icon text-white items-center justify-center shrink-0" aria-hidden="true"><Icon className="w-4 h-4" /></span>
        <h3 className="font-display font-bold text-[14px] leading-tight text-navy">{title}</h3>
      </div>
      <ul className="mt-2 flex flex-col gap-1 text-[12px] leading-snug text-muted">{facts.map((f) => <li key={f}>• {f}</li>)}</ul>
    </div>
  );
}

export function ArchitectureDiagram() {
  return (
    <figure data-testid="architecture-diagram" className="rounded-[20px] border border-line bg-gradient-to-br from-white via-[#FBF9FF] to-[#F3FAFF] p-4 sm:p-6">
      <figcaption className="sr-only">
        Architecture of the integrated digital operations system: users work in four web applications — Visitor Management with the Work Permit System in
        the same VPS-hosted environment, Complaint Management integrated with the MIS/VMS environment, and an MIS that reads operational data from Google Sheets
        through the Google Sheets API — producing visitor records, a permit register, complaint history and meter-reading reports.
      </figcaption>

      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted mb-2 flex items-center gap-1.5"><Users className="w-3.5 h-3.5" aria-hidden="true" /> People</p>
      <ul className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {people.map((p) => (
          <li key={p.label} className="rounded-lg bg-white border border-line px-2.5 py-2 text-center text-[12px] font-medium text-ink leading-snug">{p.label}</li>
        ))}
      </ul>
      <Arrow />

      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted mb-2">Web applications · role-based access</p>
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] gap-3">
        <div className="rounded-2xl border-2 border-dashed border-soft/70 p-2.5 sm:p-3">
          <p className="flex items-center gap-1.5 px-1 pb-2 text-[11px] font-semibold text-brand"><Server className="w-3.5 h-3.5" aria-hidden="true" /> VPS-hosted VMS environment</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <Module icon={UserCheck} title="Visitor Management" facts={['Visitor registration & records', 'Web-based, deployed on a VPS']} />
            <Module icon={FileCheck2} title="Work Permits" facts={['Request & approval workflow', 'Deployed within the VMS environment']} />
          </div>
        </div>
        <Module icon={MessageSquareWarning} title="Complaint Management" facts={['Logging, assignment & tracking', 'Integrated with MIS / VMS environment', 'Role-based access']} />
        <Module icon={LayoutDashboard} title="MIS" facts={['Operational & meter-reading reports', 'Dashboards & management reporting', 'Role-based access']} />
      </div>
      <Arrow />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-xl bg-white border border-line p-3 sm:p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted mb-2">Data source for MIS</p>
          <p className="flex items-center gap-2 text-[13px] font-semibold text-navy"><Sheet className="w-4 h-4 text-[#11693A]" aria-hidden="true" /> Google Sheets → Google Sheets API → MIS</p>
          <p className="mt-1 text-[12px] text-muted">Site teams keep entering readings in their sheets; the MIS reads them for reports and dashboards.</p>
        </div>
        <div className="rounded-xl bg-white border border-line p-3 sm:p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted mb-2">Project technology stack</p>
          <p className="flex items-center gap-2 text-[13px] font-semibold text-navy"><Database className="w-4 h-4 text-brand" aria-hidden="true" /> React · Node.js · Express.js · MySQL · Prisma ORM</p>
          <p className="mt-1 text-[12px] text-muted">Used across the project; not every technology applies to every module.</p>
        </div>
      </div>
      <Arrow />

      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted mb-2">Outputs</p>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {['Visitor records', 'Permit register', 'Complaint history', 'Meter-reading reports & dashboards'].map((o) => (
          <li key={o} className="rounded-lg bg-lavender px-2.5 py-2 text-center text-[12px] font-semibold text-brand leading-snug">{o}</li>
        ))}
      </ul>
    </figure>
  );
}
