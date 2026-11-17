import React from 'react';
import { Info } from 'lucide-react';

/*
 * Shared building blocks for the product demonstrations.
 * Everything is front-end only with fictional sample data — no network calls, no real records.
 * Initial state is deterministic (no Date.now / random in render) so pre-rendered HTML hydrates cleanly.
 */

export const DEMO_LABEL = 'Illustrative interface — sample data';

/** Application window: title bar, navy sidebar (tabs on small screens), context bar, content. */
export function DemoFrame({ appName, appCode, nav, active, onNav, context, children, testId }) {
  return (
    <div data-testid={testId} className="rounded-[20px] border border-line bg-white shadow-[0_24px_60px_rgba(16,23,45,0.12)] overflow-hidden text-left">
      {/* window bar */}
      <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-[#F6F5FA] border-b border-line">
        <span className="w-2.5 h-2.5 rounded-full bg-[#E4E1EE]" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#E4E1EE]" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#E4E1EE]" aria-hidden="true" />
        <span className="ml-1 font-mono text-[10px] sm:text-[11px] text-muted truncate">{appCode}</span>
        <span className="ml-auto shrink-0 inline-flex items-center gap-1 rounded-full bg-[#FFF4DE] text-[#7A4800] px-2.5 py-0.5 font-mono text-[10px] sm:text-[11px]">
          <Info className="w-3 h-3" aria-hidden="true" /> {DEMO_LABEL}
        </span>
      </div>

      <div className="md:grid md:grid-cols-[200px_minmax(0,1fr)] lg:grid-cols-[216px_minmax(0,1fr)]">
        {/* sidebar → horizontal tabs on small screens */}
        <nav aria-label={`${appName} demo sections`} className="bg-navy text-white md:min-h-[560px]">
          <div className="hidden md:flex items-center gap-2 px-4 pt-4 pb-5">
            <span className="inline-flex w-8 h-8 rounded-lg bg-white/10 items-center justify-center font-display font-bold text-sm">{appName.slice(0, 1)}</span>
            <span className="font-display font-bold text-[15px] leading-tight">{appName}</span>
          </div>
          <ul className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible px-2 md:px-2.5 py-2 md:py-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {nav.map((n) => (
              <li key={n.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => onNav(n.id)}
                  aria-pressed={active === n.id}
                  className={`w-full flex items-center gap-2.5 min-h-[40px] px-3 rounded-lg text-[13px] sm:text-sm font-medium whitespace-nowrap transition-colors ${
                    active === n.id ? 'bg-white text-navy' : 'text-[#C9CFDD] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <n.icon className="w-4 h-4 shrink-0" aria-hidden="true" /> {n.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 bg-[#FBFAFE]">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 sm:px-5 py-3 border-b border-line bg-white">{context}</div>
          <div className="p-3 sm:p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Stat({ label, value, sub, tone = 'default' }) {
  const tones = { default: 'text-navy', brand: 'text-brand', green: 'text-[#11693A]', amber: 'text-[#8A5200]', red: 'text-[#B4182F]' };
  return (
    <div className="rounded-xl border border-line bg-white p-3 sm:p-4 min-w-0">
      <div className="text-[11px] sm:text-xs font-medium text-muted leading-tight">{label}</div>
      <div className={`mt-1.5 font-display text-xl sm:text-2xl font-bold tabular-nums ${tones[tone]}`}>{value}</div>
      {sub && <div className="mt-0.5 text-[11px] text-muted truncate">{sub}</div>}
    </div>
  );
}

const BADGE = {
  green: 'bg-[#E6F6EC] text-[#11693A]',
  blue: 'bg-ice text-[#0B5C80]',
  violet: 'bg-lavender text-brand',
  amber: 'bg-[#FFF4DE] text-[#8A5200]',
  red: 'bg-[#FFE9EC] text-[#A5142B]',
  grey: 'bg-[#EFEEF4] text-[#4A5568]',
};
export function Badge({ tone = 'grey', children }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap ${BADGE[tone]}`}>{children}</span>;
}

/** Labelled select used in filter bars and forms. */
export function Select({ label, value, onChange, options, id, required, className = '' }) {
  return (
    <label htmlFor={id} className={`flex flex-col gap-1 text-[11px] font-semibold text-muted ${className}`}>
      {label}
      <select id={id} value={value} required={required} onChange={(e) => onChange(e.target.value)}
        className="min-h-[38px] rounded-lg border border-[#D9D5E6] bg-white px-2.5 text-[13px] font-medium text-ink focus:outline-none focus:border-purple">
        {options.map((o) => (typeof o === 'string' ? <option key={o} value={o}>{o}</option> : <option key={o.value} value={o.value}>{o.label}</option>))}
      </select>
    </label>
  );
}

export function Input({ label, id, value, onChange, required, type = 'text', placeholder, className = '' }) {
  return (
    <label htmlFor={id} className={`flex flex-col gap-1 text-[11px] font-semibold text-muted ${className}`}>
      <span>{label} {required && <span className="text-brand" aria-hidden="true">*</span>}</span>
      <input id={id} type={type} value={value} required={required} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
        className="min-h-[38px] rounded-lg border border-[#D9D5E6] bg-white px-2.5 text-[13px] text-ink placeholder:text-[#9AA3B5] focus:outline-none focus:border-purple" />
    </label>
  );
}

export function PrimaryBtn({ children, ...p }) {
  return <button type="button" {...p} className={`inline-flex items-center justify-center gap-1.5 min-h-[38px] rounded-lg bg-brand px-3.5 text-[13px] font-semibold text-white hover:bg-[#5120BD] disabled:opacity-50 ${p.className || ''}`}>{children}</button>;
}
export function GhostBtn({ children, ...p }) {
  return <button type="button" {...p} className={`inline-flex items-center justify-center gap-1.5 min-h-[38px] rounded-lg border border-[#D9D5E6] bg-white px-3 text-[13px] font-semibold text-ink hover:border-purple hover:text-brand disabled:opacity-50 ${p.className || ''}`}>{children}</button>;
}

/**
 * Data table that becomes stacked, labelled cards below the sm breakpoint (no sideways scrolling,
 * no tiny text). `columns`: [{ key, label, render?, className? }]. Optional row click → onRowClick.
 */
export function DataTable({ columns, rows, rowKey, onRowClick, selectedKey, empty = 'No records match the filters.', caption }) {
  if (!rows.length) return <p className="rounded-xl border border-dashed border-line bg-white p-6 text-center text-sm text-muted">{empty}</p>;
  return (
    <div className="sm:rounded-xl sm:border sm:border-line sm:bg-white sm:overflow-x-auto">
      <table className="w-full text-left text-[13px] block sm:table">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className="sr-only sm:not-sr-only sm:table-header-group bg-[#F6F5FA]">
          <tr>{columns.map((c) => <th key={c.key} scope="col" className="px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-muted whitespace-nowrap">{c.label}</th>)}</tr>
        </thead>
        <tbody className="flex flex-col gap-2 sm:table-row-group">
          {rows.map((r) => {
            const key = r[rowKey];
            const clickable = !!onRowClick;
            return (
              <tr key={key}
                className={`block sm:table-row rounded-xl border border-line bg-white p-3 sm:p-0 sm:rounded-none sm:border-0 sm:border-t sm:border-line ${clickable ? 'cursor-pointer hover:bg-lavender/40' : ''} ${selectedKey === key ? 'ring-2 ring-purple/40 sm:ring-0 sm:bg-lavender/60' : ''}`}
                onClick={clickable ? () => onRowClick(r) : undefined}>
                {columns.map((c, i) => (
                  <td key={c.key} data-label={c.label}
                    className={`flex sm:table-cell justify-between gap-3 py-1 sm:px-3 sm:py-2.5 align-middle text-ink before:content-[attr(data-label)] before:text-[11px] before:font-semibold before:text-muted sm:before:content-none ${i === 0 ? 'font-semibold' : ''} ${c.className || ''}`}>
                    <span className="text-right sm:text-left min-w-0">
                      {i === 0 && clickable ? (
                        <button type="button" onClick={(e) => { e.stopPropagation(); onRowClick(r); }} className="font-semibold text-brand hover:underline text-left">
                          {c.render ? c.render(r) : r[c.key]}
                        </button>
                      ) : c.render ? c.render(r) : r[c.key]}
                    </span>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/** Vertical history / workflow timeline. */
export function Timeline({ items }) {
  return (
    <ol className="relative ml-2 border-l-2 border-lavender">
      {items.map((it, i) => (
        <li key={`${it.title}-${i}`} className="ml-4 pb-4 last:pb-0">
          <span className={`absolute -left-[7px] mt-1 w-3 h-3 rounded-full border-2 border-white ${it.done === false ? 'bg-[#D9D5E6]' : 'bg-brand'}`} aria-hidden="true" />
          <p className={`text-[13px] font-semibold ${it.done === false ? 'text-muted' : 'text-navy'}`}>{it.title}</p>
          {it.meta && <p className="text-[12px] text-muted">{it.meta}</p>}
        </li>
      ))}
    </ol>
  );
}

export function DemoNote({ children }) {
  return <p className="mt-3 text-[12px] leading-relaxed text-muted">{children}</p>;
}

/** Download sample rows as CSV (a real, working export of the demo data). */
export function downloadCsv(filename, columns, rows) {
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const csv = [columns.map((c) => esc(c.label)).join(','), ...rows.map((r) => columns.map((c) => esc(c.csv ? c.csv(r) : r[c.key])).join(','))].join('\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Human-readable clock time for records created during the demo (client-side only, after interaction). */
/** On narrow layouts the detail panel sits below the list: bring it into view after a selection. */
export function revealPanel(ref) {
  if (typeof window === 'undefined' || !ref.current || window.innerWidth >= 1280) return;
  requestAnimationFrame(() => ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' }));
}

export const nowLabel = () => new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
