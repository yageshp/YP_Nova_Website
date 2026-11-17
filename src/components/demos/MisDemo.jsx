import React, { useMemo, useState } from 'react';
import { LayoutDashboard, Gauge, FileBarChart, RefreshCw, Download, Eye, Lock } from 'lucide-react';
import { DemoFrame, Stat, Badge, Select, DataTable, GhostBtn, PrimaryBtn, DemoNote, downloadCsv } from './DemoKit';

/* ---- fictional sample data (sites, meters, readings) ---- */
const DATES = ['10 Nov', '11 Nov', '12 Nov', '13 Nov', '14 Nov', '15 Nov', '16 Nov'];
const METERS = [
  { id: 'EM-A-01', site: 'Tower A', type: 'Electricity', unit: 'kWh', start: 184520, daily: [612, 598, 640, 587, 455, 430, 603] },
  { id: 'EM-B-01', site: 'Tower B', type: 'Electricity', unit: 'kWh', start: 96210, daily: [402, 415, 398, 421, 310, 288, 409] },
  { id: 'EM-U-01', site: 'Utility Block', type: 'Electricity', unit: 'kWh', start: 51880, daily: [188, 192, 185, 197, 176, 170, null] },
  { id: 'WM-A-01', site: 'Tower A', type: 'Water', unit: 'kL', start: 8421, daily: [42, 44, 41, 45, 36, 33, 43] },
  { id: 'WM-B-01', site: 'Tower B', type: 'Water', unit: 'kL', start: 5310, daily: [27, 29, 26, 30, 22, 21, null] },
  { id: 'DG-U-01', site: 'Utility Block', type: 'DG run hours', unit: 'hrs', start: 2216, daily: [0.5, 0, 1.2, 0, 0, 0.8, 0] },
];
const READINGS = METERS.flatMap((m) => {
  let reading = m.start;
  return m.daily.map((d, i) => {
    if (d !== null) reading = Math.round((reading + d) * 10) / 10;
    return {
      key: `${m.id}-${i}`, day: i, date: `${DATES[i]} 2026`, site: m.site, meter: m.id, type: m.type, unit: m.unit,
      reading: d === null ? null : reading, consumption: d, status: d === null ? 'Pending' : 'Recorded', source: 'Google Sheets',
    };
  });
});
const ROLES = [
  { value: 'manager', label: 'Facility Manager — all sites' },
  { value: 'supervisor', label: 'Site Supervisor — Tower A only' },
];
const fmt = (n, unit) => (n === null || n === undefined ? '—' : `${n.toLocaleString('en-IN')} ${unit}`);

export function MisDemo() {
  const [tab, setTab] = useState('dashboard');
  const [role, setRole] = useState('manager');
  const [site, setSite] = useState('All sites');
  const [type, setType] = useState('All types');
  const [period, setPeriod] = useState('7');
  const [preview, setPreview] = useState(null);
  const [synced, setSynced] = useState('16 Nov 2026, 18:05');

  const sites = role === 'supervisor' ? ['Tower A'] : ['All sites', 'Tower A', 'Tower B', 'Utility Block'];
  const effectiveSite = role === 'supervisor' ? 'Tower A' : site;
  const fromDay = 7 - Number(period);

  const rows = useMemo(() => READINGS.filter((r) => r.day >= fromDay
    && (effectiveSite === 'All sites' || r.site === effectiveSite)
    && (type === 'All types' || r.type === type)), [fromDay, effectiveSite, type]);

  const sum = (t) => Math.round(rows.filter((r) => r.type === t && r.consumption !== null).reduce((a, r) => a + r.consumption, 0) * 10) / 10;
  const recorded = rows.filter((r) => r.status === 'Recorded').length;
  const pending = rows.filter((r) => r.status === 'Pending');
  const daily = DATES.map((d, i) => ({ d, v: READINGS.filter((r) => r.day === i && r.type === 'Electricity' && (effectiveSite === 'All sites' || r.site === effectiveSite)).reduce((a, r) => a + (r.consumption || 0), 0) }))
    .slice(fromDay);
  const max = Math.max(...daily.map((x) => x.v), 1);

  const latest = METERS.filter((m) => effectiveSite === 'All sites' || m.site === effectiveSite).filter((m) => type === 'All types' || m.type === type).map((m) => {
    const last = [...READINGS].reverse().find((r) => r.meter === m.id && r.reading !== null);
    const today = READINGS.find((r) => r.meter === m.id && r.day === 6);
    return { key: m.id, meter: m.id, site: m.site, type: m.type, last: fmt(last.reading, m.unit), lastDate: last.date, status: today.status };
  });

  const readingCols = [
    { key: 'date', label: 'Date' },
    { key: 'site', label: 'Site' },
    { key: 'meter', label: 'Meter' },
    { key: 'type', label: 'Type' },
    { key: 'reading', label: 'Reading', render: (r) => fmt(r.reading, r.unit), csv: (r) => r.reading ?? '' },
    { key: 'consumption', label: 'Consumption', render: (r) => fmt(r.consumption, r.unit), csv: (r) => r.consumption ?? '' },
    { key: 'status', label: 'Status', render: (r) => <Badge tone={r.status === 'Recorded' ? 'green' : 'amber'}>{r.status}</Badge>, csv: (r) => r.status },
  ];
  const summaryRows = ['Tower A', 'Tower B', 'Utility Block'].filter((s) => effectiveSite === 'All sites' || s === effectiveSite).map((s) => {
    const r = READINGS.filter((x) => x.site === s && x.day >= fromDay);
    const tot = (t) => Math.round(r.filter((x) => x.type === t).reduce((a, x) => a + (x.consumption || 0), 0) * 10) / 10;
    return { key: s, site: s, elec: tot('Electricity'), water: tot('Water'), dg: tot('DG run hours'), pending: r.filter((x) => x.status === 'Pending').length };
  });
  const summaryCols = [
    { key: 'site', label: 'Site' },
    { key: 'elec', label: 'Electricity (kWh)', render: (r) => r.elec.toLocaleString('en-IN') },
    { key: 'water', label: 'Water (kL)' },
    { key: 'dg', label: 'DG run (hrs)' },
    { key: 'pending', label: 'Pending readings' },
  ];
  const pendingCols = readingCols.filter((c) => ['date', 'site', 'meter', 'type', 'status'].includes(c.key));
  const reports = [
    { id: 'daily', name: 'Daily meter-reading report', desc: 'Every reading for the selected sites and period.', cols: readingCols, rows },
    { id: 'summary', name: 'Consumption summary by site', desc: 'Electricity, water and DG totals per site.', cols: summaryCols, rows: summaryRows },
    { id: 'pending', name: 'Pending readings', desc: 'Readings not yet entered in the source sheet.', cols: pendingCols, rows: pending },
  ];

  const context = (
    <>
      <Select id="mis-role" label="Signed in as (demo role)" value={role} onChange={(v) => { setRole(v); setSite(v === 'supervisor' ? 'Tower A' : 'All sites'); }} options={ROLES} className="min-w-[210px]" />
      <Select id="mis-site" label="Site" value={effectiveSite} onChange={setSite} options={sites} />
      <Select id="mis-type" label="Meter type" value={type} onChange={setType} options={['All types', 'Electricity', 'Water', 'DG run hours']} />
      <Select id="mis-period" label="Period" value={period} onChange={setPeriod} options={[{ value: '7', label: 'Last 7 days' }, { value: '3', label: 'Last 3 days' }]} />
    </>
  );

  return (
    <DemoFrame testId="demo-mis" appName="Operations MIS" appCode="mis · meter readings & reporting"
      nav={[{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }, { id: 'readings', label: 'Meter readings', icon: Gauge }, { id: 'reports', label: 'Reports', icon: FileBarChart }]}
      active={tab} onNav={setTab} context={context}>
      {role === 'supervisor' && (
        <p className="mb-3 flex items-center gap-2 rounded-lg bg-ice px-3 py-2 text-[12px] text-[#0B4A66]"><Lock className="w-3.5 h-3.5" aria-hidden="true" /> Role-based access: this role sees Tower A data only.</p>
      )}

      {tab === 'dashboard' && (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            <Stat label="Electricity consumed" value={`${sum('Electricity').toLocaleString('en-IN')}`} sub="kWh in period" tone="brand" />
            <Stat label="Water consumed" value={sum('Water').toLocaleString('en-IN')} sub="kL in period" />
            <Stat label="DG run time" value={sum('DG run hours')} sub="hours in period" />
            <Stat label="Readings recorded" value={`${recorded}/${rows.length}`} sub={`${pending.length} pending`} tone={pending.length ? 'amber' : 'green'} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-3">
            <div className="rounded-xl border border-line bg-white p-3 sm:p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-[13px] font-semibold text-navy">Daily electricity consumption (kWh)</h3>
                <span className="text-[11px] text-muted">{effectiveSite}</span>
              </div>
              <div className="mt-4 flex items-end gap-2 h-36" role="img" aria-label={`Bar chart of daily electricity consumption: ${daily.map((x) => `${x.d} ${x.v} kWh`).join(', ')}`}>
                {daily.map((x) => (
                  <div key={x.d} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="text-[10px] tabular-nums text-muted">{x.v}</span>
                    <div className="w-full rounded-t-md bg-gradient-to-t from-brand to-soft" style={{ height: `${Math.max(4, (x.v / max) * 100)}%` }} />
                    <span className="text-[10px] text-muted whitespace-nowrap">{x.d}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-3 sm:p-4">
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-[13px] font-semibold text-navy">Latest reading per meter</h3>
                <button type="button" onClick={() => setTab('readings')} className="text-[12px] font-semibold text-brand hover:underline">View all</button>
              </div>
              <DataTable caption="Latest reading per meter (sample data)" rowKey="key" rows={latest} columns={[
                { key: 'meter', label: 'Meter' }, { key: 'site', label: 'Site' }, { key: 'last', label: 'Last reading' },
                { key: 'status', label: '16 Nov', render: (r) => <Badge tone={r.status === 'Recorded' ? 'green' : 'amber'}>{r.status}</Badge> },
              ]} />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line bg-white px-3 py-2.5">
            <span className="text-[12px] text-muted">Source: operational Google Sheets · last synced <strong className="text-ink">{synced}</strong></span>
            <GhostBtn onClick={() => setSynced('just now (demo)')}><RefreshCw className="w-3.5 h-3.5" aria-hidden="true" /> Sync now</GhostBtn>
          </div>
        </div>
      )}

      {tab === 'readings' && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[13px] text-muted">{rows.length} readings · {effectiveSite} · {type}</p>
            <PrimaryBtn onClick={() => downloadCsv('mis-readings-sample.csv', readingCols, rows)}><Download className="w-3.5 h-3.5" aria-hidden="true" /> Export CSV</PrimaryBtn>
          </div>
          <DataTable caption="Meter readings (sample data)" rowKey="key" rows={[...rows].reverse()} columns={readingCols} />
        </div>
      )}

      {tab === 'reports' && (
        <div className="flex flex-col gap-3">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {reports.map((rp) => (
              <li key={rp.id} className={`rounded-xl border bg-white p-4 ${preview === rp.id ? 'border-purple' : 'border-line'}`}>
                <h3 className="text-[14px] font-semibold text-navy">{rp.name}</h3>
                <p className="mt-1 text-[12px] text-muted">{rp.desc} {rp.rows.length} rows.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <GhostBtn onClick={() => setPreview(preview === rp.id ? null : rp.id)} aria-expanded={preview === rp.id}><Eye className="w-3.5 h-3.5" aria-hidden="true" /> {preview === rp.id ? 'Hide' : 'Preview'}</GhostBtn>
                  <PrimaryBtn onClick={() => downloadCsv(`mis-${rp.id}-sample.csv`, rp.cols, rp.rows)}><Download className="w-3.5 h-3.5" aria-hidden="true" /> Export CSV</PrimaryBtn>
                </div>
              </li>
            ))}
            <li className="rounded-xl border border-dashed border-line bg-[#F6F5FA] p-4">
              <h3 className="text-[14px] font-semibold text-muted">Billing</h3>
              <p className="mt-1 text-[12px] text-muted">Removed from the current MIS scope in the delivered project.</p>
            </li>
          </ul>
          {preview && (() => {
            const rp = reports.find((x) => x.id === preview);
            return <DataTable caption={`${rp.name} preview (sample data)`} rowKey="key" rows={rp.rows} columns={rp.cols} empty="Nothing to report for these filters." />;
          })()}
        </div>
      )}
      <DemoNote>Sites, meters and readings are fictional. In the delivered MIS, operational data is read from Google Sheets through the Google Sheets API; screens and reports are configured to each project’s scope.</DemoNote>
    </DemoFrame>
  );
}
