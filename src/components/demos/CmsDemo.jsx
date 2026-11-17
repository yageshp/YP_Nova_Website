import React, { useRef, useState } from 'react';
import { Inbox, PlusCircle, UserCheck, Play, CheckCircle2, Lock } from 'lucide-react';
import { DemoFrame, Stat, Badge, Select, Input, DataTable, PrimaryBtn, GhostBtn, Timeline, DemoNote, revealPanel } from './DemoKit';

const CATS = ['Electrical', 'Plumbing', 'HVAC', 'Housekeeping', 'Civil'];
const DEPTS = { Electrical: 'Electrical maintenance', Plumbing: 'Plumbing', HVAC: 'HVAC', Housekeeping: 'Housekeeping', Civil: 'Civil maintenance' };
/* Fictional staff (sample data). */
const PEOPLE = { 'Electrical maintenance': ['R. Patil (sample)', 'S. Gupta (sample)'], Plumbing: ['A. Khan (sample)'], HVAC: ['V. Iyer (sample)'], Housekeeping: ['M. Das (sample)'], 'Civil maintenance': ['K. Rane (sample)'] };
const FLOW = ['Open', 'Assigned', 'In progress', 'Resolved', 'Closed'];
const TONE = { Open: 'red', Assigned: 'violet', 'In progress': 'blue', Resolved: 'green', Closed: 'grey' };
const PRI = { High: 'red', Medium: 'amber', Low: 'grey' };

const c = (id, cat, location, desc, priority, status, person, created) => {
  const dept = DEPTS[cat];
  const h = [{ title: 'Complaint logged by help-desk', meta: created }];
  if (FLOW.indexOf(status) >= 1) h.push({ title: `Assigned to ${person} · ${dept}`, meta: created });
  if (FLOW.indexOf(status) >= 2) h.push({ title: 'Work started', meta: created });
  if (FLOW.indexOf(status) >= 3) h.push({ title: 'Marked resolved by technician', meta: created });
  if (FLOW.indexOf(status) >= 4) h.push({ title: 'Closed after confirmation', meta: created });
  return { id, cat, location, desc, priority, status, dept: status === 'Open' ? '—' : dept, person: status === 'Open' ? '—' : person, created, history: h };
};
const SEED = [
  c('CMP-2214', 'Electrical', 'Tower A — Floor 7 lobby', 'Two corridor lights not working.', 'Medium', 'Open', '', '16 Nov 2026, 10:20'),
  c('CMP-2213', 'Plumbing', 'Tower B — Floor 3 washroom', 'Continuous leak from flush valve.', 'High', 'Assigned', 'A. Khan (sample)', '16 Nov 2026, 09:05'),
  c('CMP-2212', 'HVAC', 'Tower A — Conference room 2', 'Room not cooling below 27°C.', 'High', 'In progress', 'V. Iyer (sample)', '15 Nov 2026, 16:40'),
  c('CMP-2210', 'Electrical', 'Utility Block — Pump room', 'Panel indicator lamp flickering.', 'Low', 'Assigned', 'R. Patil (sample)', '15 Nov 2026, 11:15'),
  c('CMP-2207', 'Housekeeping', 'Tower B — Ground floor', 'Lobby floor needs deep cleaning.', 'Low', 'Resolved', 'M. Das (sample)', '14 Nov 2026, 13:30'),
  c('CMP-2204', 'Civil', 'Tower A — Basement ramp', 'Loose drain cover at ramp entry.', 'Medium', 'Closed', 'K. Rane (sample)', '13 Nov 2026, 08:50'),
  c('CMP-2201', 'Electrical', 'Tower B — Floor 5', 'Socket sparking near pantry.', 'High', 'Closed', 'S. Gupta (sample)', '12 Nov 2026, 17:05'),
];
const ROLES = [{ value: 'helpdesk', label: 'Help-desk — all complaints' }, { value: 'tech', label: 'Technician — R. Patil (sample)' }];
const EMPTY = { cat: '', location: '', desc: '', priority: 'Medium' };

export function CmsDemo() {
  const [tab, setTab] = useState('list');
  const [items, setItems] = useState(SEED);
  const [selected, setSelected] = useState('CMP-2214');
  const [role, setRole] = useState('helpdesk');
  const [statusF, setStatusF] = useState('All statuses');
  const [priF, setPriF] = useState('All priorities');
  const [assign, setAssign] = useState('');
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const panel = useRef(null);

  const visible = items.filter((x) => role === 'helpdesk' || x.person === 'R. Patil (sample)');
  const rows = visible.filter((x) => (statusF === 'All statuses' || x.status === statusF) && (priF === 'All priorities' || x.priority === priF));
  const sel = visible.find((x) => x.id === selected) || rows[0];
  const update = (id, patch, note) => setItems((xs) => xs.map((x) => (x.id === id ? { ...x, ...patch, history: [...x.history, { title: note, meta: 'just now (demo)' }] } : x)));
  const count = (s) => visible.filter((x) => x.status === s).length;

  const cols = [
    { key: 'id', label: 'Complaint' },
    { key: 'cat', label: 'Category' },
    { key: 'priority', label: 'Priority', render: (x) => <Badge tone={PRI[x.priority]}>{x.priority}</Badge> },
    { key: 'person', label: 'Responsible' },
    { key: 'status', label: 'Status', render: (x) => <Badge tone={TONE[x.status]}>{x.status}</Badge> },
  ];

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.cat) er.cat = 'Required';
    if (!form.location.trim()) er.location = 'Required';
    if (form.desc.trim().length < 8) er.desc = 'Describe the issue (8+ characters)';
    setErrors(er);
    if (Object.keys(er).length) return;
    const id = `CMP-${2215 + items.length - SEED.length}`;
    setItems((xs) => [c(id, form.cat, form.location.trim(), form.desc.trim(), form.priority, 'Open', '', 'just now (demo)'), ...xs]);
    setSelected(id);
    setForm(EMPTY);
    setRole('helpdesk');
    setStatusF('All statuses');
    setPriF('All priorities');
    setTab('list');
  };
  const upd = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));
  const err = (k) => errors[k] && <p className="mt-1 text-[11px] text-[#B4182F]">{errors[k]}</p>;
  const dept = sel ? DEPTS[sel.cat] : '';

  const context = (
    <>
      <Select id="cms-role" label="Signed in as (demo role)" value={role} onChange={(v) => { setRole(v); if (v === 'tech') setTab('list'); }} options={ROLES} className="min-w-[200px]" />
      <Select id="cms-status" label="Status" value={statusF} onChange={setStatusF} options={['All statuses', ...FLOW]} />
      <Select id="cms-pri" label="Priority" value={priF} onChange={setPriF} options={['All priorities', 'High', 'Medium', 'Low']} />
      {role === 'helpdesk' && <PrimaryBtn onClick={() => setTab('new')} className="ml-auto"><PlusCircle className="w-3.5 h-3.5" aria-hidden="true" /> New complaint</PrimaryBtn>}
    </>
  );

  return (
    <DemoFrame testId="demo-cms" appName="Complaint Desk" appCode="cms · complaints & service requests"
      nav={[{ id: 'list', label: 'Complaints', icon: Inbox }, ...(role === 'helpdesk' ? [{ id: 'new', label: 'New complaint', icon: PlusCircle }] : [])]}
      active={tab} onNav={setTab} context={context}>
      {role === 'tech' && <p className="mb-3 flex items-center gap-2 rounded-lg bg-ice px-3 py-2 text-[12px] text-[#0B4A66]"><Lock className="w-3.5 h-3.5" aria-hidden="true" /> Role-based access: technicians see only complaints assigned to them.</p>}
      {tab === 'list' && (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            <Stat label="Open (unassigned)" value={count('Open')} tone="red" />
            <Stat label="Assigned / in progress" value={count('Assigned') + count('In progress')} tone="brand" />
            <Stat label="Resolved (to confirm)" value={count('Resolved')} tone="green" />
            <Stat label="Closed" value={count('Closed')} />
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-3 items-start">
            <DataTable caption="Complaints (sample data)" rowKey="id" rows={rows} columns={cols} onRowClick={(x) => { setSelected(x.id); setAssign(''); revealPanel(panel); }} selectedKey={sel && sel.id} />
            {sel && (
              <aside ref={panel} aria-live="polite" className="scroll-mt-36 rounded-xl border border-line bg-white p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-mono text-[11px] text-muted">{sel.id} · {sel.created}</p>
                    <h3 className="text-[15px] font-semibold text-navy">{sel.cat} — {sel.location}</h3>
                  </div>
                  <Badge tone={TONE[sel.status]}>{sel.status}</Badge>
                </div>
                <p className="mt-2 text-[13px] text-ink">{sel.desc}</p>
                <dl className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
                  <div><dt className="text-muted">Priority</dt><dd><Badge tone={PRI[sel.priority]}>{sel.priority}</Badge></dd></div>
                  <div><dt className="text-muted">Department</dt><dd className="font-medium text-ink">{sel.dept}</dd></div>
                  <div className="col-span-2"><dt className="text-muted">Responsible person</dt><dd className="font-medium text-ink">{sel.person}</dd></div>
                </dl>
                {sel.status === 'Open' && role === 'helpdesk' && (
                  <div className="mt-3 flex flex-wrap items-end gap-2">
                    <Select id="cms-assign" label={`Assign within ${dept}`} value={assign} onChange={setAssign} options={[{ value: '', label: 'Select person…' }, ...PEOPLE[dept]]} className="flex-1 min-w-[160px]" />
                    <PrimaryBtn disabled={!assign} onClick={() => { update(sel.id, { status: 'Assigned', dept, person: assign }, `Assigned to ${assign} · ${dept}`); setAssign(''); }}><UserCheck className="w-3.5 h-3.5" aria-hidden="true" /> Assign</PrimaryBtn>
                  </div>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  {sel.status === 'Assigned' && <PrimaryBtn onClick={() => update(sel.id, { status: 'In progress' }, 'Work started')}><Play className="w-3.5 h-3.5" aria-hidden="true" /> Start work</PrimaryBtn>}
                  {sel.status === 'In progress' && <PrimaryBtn onClick={() => update(sel.id, { status: 'Resolved' }, 'Marked resolved by technician')}><CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" /> Mark resolved</PrimaryBtn>}
                  {sel.status === 'Resolved' && role === 'helpdesk' && <PrimaryBtn onClick={() => update(sel.id, { status: 'Closed' }, 'Closed after confirmation')}><CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" /> Confirm &amp; close</PrimaryBtn>}
                  {sel.status === 'Resolved' && role === 'helpdesk' && <GhostBtn onClick={() => update(sel.id, { status: 'In progress' }, 'Reopened — issue persists')}>Reopen</GhostBtn>}
                </div>
                <h4 className="mt-4 mb-2 text-[12px] font-semibold uppercase tracking-wide text-muted">Resolution history</h4>
                <Timeline items={sel.history} />
              </aside>
            )}
          </div>
        </div>
      )}

      {tab === 'new' && role === 'helpdesk' && (
        <form onSubmit={submit} noValidate className="rounded-xl border border-line bg-white p-4 sm:p-5">
          <h3 className="text-[15px] font-semibold text-navy">Log a new complaint</h3>
          <p className="mt-0.5 text-[12px] text-muted">Demo form — the complaint is added in this browser tab only.</p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><Select id="cms-cat" label="Category *" value={form.cat} onChange={upd('cat')} options={[{ value: '', label: 'Select…' }, ...CATS]} />{err('cat')}</div>
            <Select id="cms-pri-new" label="Priority" value={form.priority} onChange={upd('priority')} options={['High', 'Medium', 'Low']} />
            <div className="sm:col-span-2"><Input id="cms-loc" label="Location" value={form.location} onChange={upd('location')} required placeholder="e.g. Tower A — Floor 4 pantry" />{err('location')}</div>
            <label htmlFor="cms-desc" className="sm:col-span-2 flex flex-col gap-1 text-[11px] font-semibold text-muted">
              <span>Description <span className="text-brand" aria-hidden="true">*</span></span>
              <textarea id="cms-desc" rows={3} value={form.desc} onChange={(e) => upd('desc')(e.target.value)}
                className="rounded-lg border border-[#D9D5E6] bg-white px-2.5 py-2 text-[13px] text-ink focus:outline-none focus:border-purple" />
              {err('desc')}
            </label>
          </div>
          <p className="mt-3 text-[12px] text-muted">The department is set from the category; a help-desk user then assigns a responsible person.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <PrimaryBtn type="submit">Log complaint</PrimaryBtn>
            <GhostBtn onClick={() => { setForm(EMPTY); setErrors({}); }}>Clear</GhostBtn>
          </div>
        </form>
      )}
      <DemoNote>Complaints, locations and staff names are fictional. The delivered complaint management functionality is integrated into the client’s MIS / VMS environment with role-based access; categories and assignment rules follow each project’s scope.</DemoNote>
    </DemoFrame>
  );
}
