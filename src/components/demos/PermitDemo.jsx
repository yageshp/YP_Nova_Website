import React, { useRef, useState } from 'react';
import { ClipboardList, FilePlus2, CheckCircle2, Undo2, Play, Lock } from 'lucide-react';
import { DemoFrame, Stat, Badge, Select, Input, DataTable, PrimaryBtn, GhostBtn, Timeline, DemoNote, revealPanel } from './DemoKit';

const CATEGORIES = ['Electrical work', 'Hot work', 'Work at height', 'Plumbing', 'HVAC maintenance', 'Civil work'];
const LOCATIONS = ['Tower A — LT panel room', 'Tower A — Terrace', 'Tower B — Basement 1', 'Tower B — Roof', 'Utility Block — Pump room', 'Utility Block — DG yard'];
const CONTRACTORS = ['Sample Electricals', 'Demo Fabricators', 'Sample HVAC Services', 'Demo Plumbing Works'];
/* Workflow stages in order. */
const FLOW = ['Pending review', 'Pending approval', 'Approved', 'Work in progress', 'Closed'];
const TONE = { 'Pending review': 'amber', 'Pending approval': 'violet', Approved: 'blue', 'Work in progress': 'blue', Closed: 'green', Returned: 'red' };
const STEP_LABEL = ['Requested by contractor', 'Reviewed by site engineer', 'Approved by authorised approver', 'Work started', 'Permit closed'];

const mk = (id, category, location, contractor, date, status, desc, workers) => {
  const reached = status === 'Returned' ? 1 : FLOW.indexOf(status) + 1;
  const history = STEP_LABEL.slice(0, reached).map((t, i) => ({ title: t, meta: `${date}${i ? ` · stage ${i + 1}` : ''}` }));
  if (status === 'Returned') history.push({ title: 'Returned to contractor for changes', meta: date });
  return { id, category, location, contractor, date, status, desc, workers, history };
};
const SEED = [
  mk('PTW-1046', 'Electrical work', 'Tower A — LT panel room', 'Sample Electricals', '16 Nov 2026', 'Pending review', 'Replace faulty MCCB in feeder panel 3.', 2),
  mk('PTW-1045', 'Hot work', 'Utility Block — DG yard', 'Demo Fabricators', '16 Nov 2026', 'Pending approval', 'Welding repair on exhaust support bracket.', 3),
  mk('PTW-1044', 'Work at height', 'Tower B — Roof', 'Sample HVAC Services', '15 Nov 2026', 'Approved', 'Clean and service rooftop condenser units.', 2),
  mk('PTW-1043', 'Plumbing', 'Utility Block — Pump room', 'Demo Plumbing Works', '15 Nov 2026', 'Work in progress', 'Replace gland packing on transfer pump 2.', 2),
  mk('PTW-1041', 'HVAC maintenance', 'Tower A — Terrace', 'Sample HVAC Services', '14 Nov 2026', 'Closed', 'Quarterly AHU filter replacement.', 3),
  mk('PTW-1040', 'Electrical work', 'Tower B — Basement 1', 'Sample Electricals', '14 Nov 2026', 'Returned', 'Cable tray extension — isolation details missing.', 2),
  mk('PTW-1038', 'Civil work', 'Tower B — Basement 1', 'Demo Fabricators', '13 Nov 2026', 'Closed', 'Seal cracks near ramp drain.', 4),
];
const ROLE_ACTIONS = { 'Pending review': 'Site engineer', 'Pending approval': 'Approver', Approved: 'Contractor / site engineer', 'Work in progress': 'Site engineer', Returned: 'Contractor' };
const EMPTY = { category: '', location: '', contractor: '', date: '17 Nov 2026', workers: '2', desc: '' };

export function PermitDemo() {
  const [tab, setTab] = useState('permits');
  const [permits, setPermits] = useState(SEED);
  const [selected, setSelected] = useState('PTW-1046');
  const [statusF, setStatusF] = useState('All statuses');
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const p = permits.find((x) => x.id === selected);
  const panel = useRef(null);

  const advance = (id, toStatus, note) => setPermits((ps) => ps.map((x) => (x.id === id
    ? { ...x, status: toStatus, history: [...x.history, { title: note, meta: 'just now (demo)' }] } : x)));
  const next = (x) => {
    const i = FLOW.indexOf(x.status);
    advance(x.id, FLOW[i + 1], STEP_LABEL[i + 1]);
  };

  const count = (s) => permits.filter((x) => x.status === s).length;
  const rows = permits.filter((x) => statusF === 'All statuses' || x.status === statusF);
  const cols = [
    { key: 'id', label: 'Permit no.' },
    { key: 'category', label: 'Work category' },
    { key: 'location', label: 'Location' },
    { key: 'status', label: 'Status', render: (x) => <Badge tone={TONE[x.status]}>{x.status}</Badge> },
  ];

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    ['category', 'location', 'contractor'].forEach((k) => { if (!form[k]) er[k] = 'Required'; });
    if (form.desc.trim().length < 10) er.desc = 'Describe the work (10+ characters)';
    setErrors(er);
    if (Object.keys(er).length) return;
    const id = `PTW-${1047 + permits.length - SEED.length}`;
    setPermits((ps) => [mk(id, form.category, form.location, form.contractor, form.date, 'Pending review', form.desc.trim(), Number(form.workers)), ...ps]);
    setSelected(id);
    setForm(EMPTY);
    setStatusF('All statuses');
    setTab('permits');
  };
  const upd = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));
  const err = (k) => errors[k] && <p className="mt-1 text-[11px] text-[#B4182F]">{errors[k]}</p>;

  const context = (
    <>
      <span className="text-[13px] font-semibold text-navy">Permit register · All sites</span>
      <Select id="ptw-status" label="Status" value={statusF} onChange={setStatusF} options={['All statuses', ...FLOW, 'Returned']} />
      <PrimaryBtn onClick={() => setTab('new')} className="ml-auto"><FilePlus2 className="w-3.5 h-3.5" aria-hidden="true" /> New permit request</PrimaryBtn>
    </>
  );

  return (
    <DemoFrame testId="demo-permit" appName="Work Permits" appCode="ptw · permit-to-work workflow"
      nav={[{ id: 'permits', label: 'Permits', icon: ClipboardList }, { id: 'new', label: 'New request', icon: FilePlus2 }]}
      active={tab} onNav={setTab} context={context}>
      {tab === 'permits' && (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            <Stat label="Awaiting review / approval" value={count('Pending review') + count('Pending approval')} tone="amber" />
            <Stat label="Approved (not started)" value={count('Approved')} tone="brand" />
            <Stat label="Work in progress" value={count('Work in progress')} />
            <Stat label="Closed" value={count('Closed')} tone="green" />
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-3 items-start">
            <DataTable caption="Work permits (sample data)" rowKey="id" rows={rows} columns={cols} onRowClick={(x) => { setSelected(x.id); revealPanel(panel); }} selectedKey={selected} />
            {p && (
              <aside ref={panel} aria-live="polite" className="scroll-mt-36 rounded-xl border border-line bg-white p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-mono text-[11px] text-muted">{p.id}</p>
                    <h3 className="text-[15px] font-semibold text-navy">{p.category}</h3>
                  </div>
                  <Badge tone={TONE[p.status]}>{p.status}</Badge>
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-[12px]">
                  <div><dt className="text-muted">Location</dt><dd className="font-medium text-ink">{p.location}</dd></div>
                  <div><dt className="text-muted">Contractor</dt><dd className="font-medium text-ink">{p.contractor}</dd></div>
                  <div><dt className="text-muted">Requested date</dt><dd className="font-medium text-ink">{p.date}</dd></div>
                  <div><dt className="text-muted">Workers</dt><dd className="font-medium text-ink">{p.workers}</dd></div>
                  <div className="col-span-2"><dt className="text-muted">Work description</dt><dd className="font-medium text-ink">{p.desc}</dd></div>
                </dl>
                <h4 className="mt-4 mb-2 text-[12px] font-semibold uppercase tracking-wide text-muted">Approval workflow</h4>
                <Timeline items={[...p.history, ...(p.status !== 'Closed' && p.status !== 'Returned'
                  ? STEP_LABEL.slice(FLOW.indexOf(p.status) + 1).map((t) => ({ title: t, done: false })) : [])]} />
                {ROLE_ACTIONS[p.status] && <p className="mt-3 flex items-center gap-1.5 text-[11px] text-muted"><Lock className="w-3 h-3" aria-hidden="true" /> Next action by: {ROLE_ACTIONS[p.status]}</p>}
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.status === 'Pending review' && <PrimaryBtn onClick={() => next(p)}><CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" /> Mark reviewed</PrimaryBtn>}
                  {p.status === 'Pending approval' && <PrimaryBtn onClick={() => next(p)}><CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" /> Approve permit</PrimaryBtn>}
                  {p.status === 'Approved' && <PrimaryBtn onClick={() => next(p)}><Play className="w-3.5 h-3.5" aria-hidden="true" /> Start work</PrimaryBtn>}
                  {p.status === 'Work in progress' && <PrimaryBtn onClick={() => next(p)}><CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" /> Close permit</PrimaryBtn>}
                  {['Pending review', 'Pending approval'].includes(p.status) && (
                    <GhostBtn onClick={() => advance(p.id, 'Returned', 'Returned to contractor for changes')}><Undo2 className="w-3.5 h-3.5" aria-hidden="true" /> Return for changes</GhostBtn>
                  )}
                  {p.status === 'Returned' && <GhostBtn onClick={() => advance(p.id, 'Pending review', 'Resubmitted by contractor')}>Resubmit (as contractor)</GhostBtn>}
                </div>
              </aside>
            )}
          </div>
        </div>
      )}

      {tab === 'new' && (
        <form onSubmit={submit} noValidate className="rounded-xl border border-line bg-white p-4 sm:p-5">
          <h3 className="text-[15px] font-semibold text-navy">New permit request</h3>
          <p className="mt-0.5 text-[12px] text-muted">Demo form — the request is added to the register in this browser tab only.</p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><Select id="ptw-cat" label="Work category *" value={form.category} onChange={upd('category')} options={[{ value: '', label: 'Select…' }, ...CATEGORIES]} />{err('category')}</div>
            <div><Select id="ptw-loc" label="Site / location *" value={form.location} onChange={upd('location')} options={[{ value: '', label: 'Select…' }, ...LOCATIONS]} />{err('location')}</div>
            <div><Select id="ptw-con" label="Contractor *" value={form.contractor} onChange={upd('contractor')} options={[{ value: '', label: 'Select…' }, ...CONTRACTORS]} />{err('contractor')}</div>
            <Select id="ptw-date" label="Requested date" value={form.date} onChange={upd('date')} options={['17 Nov 2026', '18 Nov 2026', '19 Nov 2026']} />
            <Select id="ptw-workers" label="Number of workers" value={form.workers} onChange={upd('workers')} options={['1', '2', '3', '4', '5', '6']} />
            <label htmlFor="ptw-desc" className="sm:col-span-2 flex flex-col gap-1 text-[11px] font-semibold text-muted">
              <span>Work description <span className="text-brand" aria-hidden="true">*</span></span>
              <textarea id="ptw-desc" rows={3} value={form.desc} onChange={(e) => upd('desc')(e.target.value)}
                className="rounded-lg border border-[#D9D5E6] bg-white px-2.5 py-2 text-[13px] text-ink focus:outline-none focus:border-purple" />
              {err('desc')}
            </label>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <PrimaryBtn type="submit">Submit for review</PrimaryBtn>
            <GhostBtn onClick={() => { setForm(EMPTY); setErrors({}); }}>Clear</GhostBtn>
          </div>
        </form>
      )}
      <DemoNote>Permits, contractors and locations are fictional. The delivered Work Permit System runs within the client’s VMS environment; permit types, approval levels and checklists follow each client’s own procedure.</DemoNote>
    </DemoFrame>
  );
}
