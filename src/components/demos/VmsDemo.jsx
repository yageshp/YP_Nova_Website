import React, { useMemo, useState } from 'react';
import { Users, UserPlus, History, LogOut, CheckCircle2 } from 'lucide-react';
import { DemoFrame, Stat, Badge, Select, Input, DataTable, PrimaryBtn, GhostBtn, DemoNote, nowLabel } from './DemoKit';

const HOSTS = ['Facility Office', 'Engineering', 'Administration', 'Security Office', 'Stores'];
const PURPOSES = ['Meeting', 'Maintenance visit', 'Delivery', 'Inspection', 'Interview'];
/* Fictional people and organisations (sample data). */
const SEED = [
  { id: 'V-2611', date: '16 Nov 2026', name: 'Arjun Rao (sample)', org: 'Sample HVAC Services', host: 'Engineering', purpose: 'Maintenance visit', in: '09:12', out: '12:40', status: 'Checked out' },
  { id: 'V-2612', date: '16 Nov 2026', name: 'Meera Joshi (sample)', org: 'Demo Consulting LLP', host: 'Administration', purpose: 'Meeting', in: '10:05', out: '', status: 'On premises' },
  { id: 'V-2613', date: '16 Nov 2026', name: 'Courier — Sample Logistics', org: 'Sample Logistics', host: 'Stores', purpose: 'Delivery', in: '10:48', out: '11:02', status: 'Checked out' },
  { id: 'V-2614', date: '16 Nov 2026', name: 'Kabir Shah (sample)', org: 'Demo Electricals', host: 'Facility Office', purpose: 'Inspection', in: '11:30', out: '', status: 'On premises' },
  { id: 'V-2615', date: '16 Nov 2026', name: 'Nisha Pillai (sample)', org: 'Sample Fire Systems', host: 'Engineering', purpose: 'Maintenance visit', in: '', out: '', status: 'Expected' },
  { id: 'V-2601', date: '15 Nov 2026', name: 'Rohan Mehta (sample)', org: 'Demo Lift Services', host: 'Engineering', purpose: 'Maintenance visit', in: '14:10', out: '17:25', status: 'Checked out' },
  { id: 'V-2598', date: '15 Nov 2026', name: 'Priya Nair (sample)', org: 'Sample Audit Partners', host: 'Administration', purpose: 'Inspection', in: '10:00', out: '13:15', status: 'Checked out' },
  { id: 'V-2590', date: '14 Nov 2026', name: 'Imran Khan (sample)', org: 'Demo Pest Control', host: 'Facility Office', purpose: 'Maintenance visit', in: '08:45', out: '10:30', status: 'Checked out' },
];
const TONE = { 'On premises': 'blue', 'Checked out': 'green', Expected: 'amber' };
const EMPTY = { name: '', mobile: '', org: '', host: '', purpose: '', idType: 'Company ID card', vehicle: '' };

export function VmsDemo() {
  const [tab, setTab] = useState('overview');
  const [visitors, setVisitors] = useState(SEED);
  const [day, setDay] = useState('16 Nov 2026');
  const [status, setStatus] = useState('All statuses');
  const [q, setQ] = useState('');
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [added, setAdded] = useState(null);
  const seq = visitors.filter((v) => v.date === '16 Nov 2026').length + 2611;

  const today = visitors.filter((v) => v.date === '16 Nov 2026');
  const filtered = useMemo(() => visitors.filter((v) => (day === 'All dates' || v.date === day)
    && (status === 'All statuses' || v.status === status)
    && (!q || `${v.name} ${v.org} ${v.host} ${v.id}`.toLowerCase().includes(q.toLowerCase()))), [visitors, day, status, q]);

  const checkOut = (id) => setVisitors((vs) => vs.map((v) => (v.id === id ? { ...v, out: nowLabel(), status: 'Checked out' } : v)));
  const checkIn = (id) => setVisitors((vs) => vs.map((v) => (v.id === id ? { ...v, in: nowLabel(), status: 'On premises' } : v)));

  const cols = [
    { key: 'name', label: 'Visitor' },
    { key: 'org', label: 'Organisation' },
    { key: 'host', label: 'Host / department' },
    { key: 'purpose', label: 'Purpose' },
    { key: 'in', label: 'Check-in', render: (v) => v.in || '—' },
    { key: 'out', label: 'Check-out', render: (v) => v.out || '—' },
    { key: 'status', label: 'Status', render: (v) => <Badge tone={TONE[v.status]}>{v.status}</Badge> },
    { key: 'act', label: 'Action', render: (v) => (v.status === 'On premises'
      ? <GhostBtn onClick={() => checkOut(v.id)} className="!min-h-[30px] !px-2.5 !text-[12px]"><LogOut className="w-3 h-3" aria-hidden="true" /> Check out</GhostBtn>
      : v.status === 'Expected'
        ? <GhostBtn onClick={() => checkIn(v.id)} className="!min-h-[30px] !px-2.5 !text-[12px]">Check in</GhostBtn>
        : <span className="text-[12px] text-muted">—</span>) },
  ];

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = 'Required';
    if (!/^[0-9+\s-]{8,15}$/.test(form.mobile.trim())) er.mobile = 'Enter a valid mobile number';
    if (!form.host) er.host = 'Required';
    if (!form.purpose) er.purpose = 'Required';
    setErrors(er);
    if (Object.keys(er).length) return;
    const v = { id: `V-${seq}`, date: '16 Nov 2026', name: `${form.name.trim()} (demo entry)`, org: form.org.trim() || '—', host: form.host, purpose: form.purpose, in: nowLabel(), out: '', status: 'On premises' };
    setVisitors((vs) => [v, ...vs]);
    setAdded(v.id);
    setForm(EMPTY);
    setDay('16 Nov 2026');
    setStatus('All statuses');
    setTab('overview');
  };
  const upd = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const context = (
    <>
      <span className="text-[13px] font-semibold text-navy">Main gate · Reception desk</span>
      <span className="text-[12px] text-muted">Signed in as: Reception (demo role)</span>
      <PrimaryBtn onClick={() => setTab('register')} className="ml-auto"><UserPlus className="w-3.5 h-3.5" aria-hidden="true" /> New visitor</PrimaryBtn>
    </>
  );

  return (
    <DemoFrame testId="demo-vms" appName="Visitor Management" appCode="vms · visitor register"
      nav={[{ id: 'overview', label: "Today's visitors", icon: Users }, { id: 'register', label: 'Register visitor', icon: UserPlus }, { id: 'history', label: 'Visitor history', icon: History }]}
      active={tab} onNav={setTab} context={context}>
      {tab === 'overview' && (
        <div className="flex flex-col gap-3">
          {added && <p className="flex items-center gap-2 rounded-lg bg-[#E6F6EC] px-3 py-2 text-[12px] text-[#11693A]"><CheckCircle2 className="w-4 h-4" aria-hidden="true" /> Visitor {added} checked in (demo record, not saved anywhere).</p>}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            <Stat label="Visits today" value={today.filter((v) => v.status !== 'Expected').length} tone="brand" />
            <Stat label="On premises now" value={today.filter((v) => v.status === 'On premises').length} />
            <Stat label="Checked out" value={today.filter((v) => v.status === 'Checked out').length} tone="green" />
            <Stat label="Expected" value={today.filter((v) => v.status === 'Expected').length} tone="amber" />
          </div>
          <DataTable caption="Today's visitors (sample data)" rowKey="id" rows={today} columns={cols} />
        </div>
      )}

      {tab === 'register' && (
        <form onSubmit={submit} noValidate className="rounded-xl border border-line bg-white p-4 sm:p-5">
          <h3 className="text-[15px] font-semibold text-navy">Register a visitor</h3>
          <p className="mt-0.5 text-[12px] text-muted">Demo form — entries stay in this browser tab only.</p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><Input id="vms-name" label="Visitor name" value={form.name} onChange={upd('name')} required />{errors.name && <p className="mt-1 text-[11px] text-[#B4182F]">{errors.name}</p>}</div>
            <div><Input id="vms-mobile" label="Mobile number" type="tel" value={form.mobile} onChange={upd('mobile')} required placeholder="e.g. 98xxxxxxxx" />{errors.mobile && <p className="mt-1 text-[11px] text-[#B4182F]">{errors.mobile}</p>}</div>
            <Input id="vms-org" label="Organisation" value={form.org} onChange={upd('org')} />
            <div><Select id="vms-host" label="Host / department *" value={form.host} onChange={upd('host')} options={[{ value: '', label: 'Select…' }, ...HOSTS]} />{errors.host && <p className="mt-1 text-[11px] text-[#B4182F]">{errors.host}</p>}</div>
            <div><Select id="vms-purpose" label="Purpose of visit *" value={form.purpose} onChange={upd('purpose')} options={[{ value: '', label: 'Select…' }, ...PURPOSES]} />{errors.purpose && <p className="mt-1 text-[11px] text-[#B4182F]">{errors.purpose}</p>}</div>
            <Select id="vms-id" label="ID shown" value={form.idType} onChange={upd('idType')} options={['Company ID card', 'Government photo ID', 'None']} />
            <Input id="vms-vehicle" label="Vehicle number (optional)" value={form.vehicle} onChange={upd('vehicle')} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <PrimaryBtn type="submit"><CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" /> Check in visitor</PrimaryBtn>
            <GhostBtn onClick={() => { setForm(EMPTY); setErrors({}); }}>Clear</GhostBtn>
          </div>
        </form>
      )}

      {tab === 'history' && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-end gap-2">
            <Select id="vms-day" label="Date" value={day} onChange={setDay} options={['16 Nov 2026', '15 Nov 2026', '14 Nov 2026', 'All dates']} />
            <Select id="vms-status" label="Status" value={status} onChange={setStatus} options={['All statuses', 'On premises', 'Checked out', 'Expected']} />
            <Input id="vms-q" label="Search" value={q} onChange={setQ} placeholder="Name, organisation, host…" className="flex-1 min-w-[160px]" />
          </div>
          <p className="text-[12px] text-muted">{filtered.length} record(s)</p>
          <DataTable caption="Visitor history (sample data)" rowKey="id" rows={filtered} columns={[{ key: 'date', label: 'Date' }, ...cols.slice(0, 7)].map((c, i) => (i === 0 ? c : c))} />
        </div>
      )}
      <DemoNote>All visitors, organisations and phone numbers are fictional. The delivered Visitor Management System is a web-based application deployed on a VPS; fields and workflow are configured per site.</DemoNote>
    </DemoFrame>
  );
}
