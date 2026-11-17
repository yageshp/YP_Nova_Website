import React from 'react';

/**
 * Conceptual interface mockups drawn with plain HTML/CSS (no external images).
 * They are illustrations only — never screenshots of client systems — and are
 * always rendered with an "Illustrative" marker.
 */
const palettes = {
  violet: { bg: 'from-[#F7F2FF] to-[#EAF8FF]', bar: 'bg-purple', soft: 'bg-lavender' },
  ice: { bg: 'from-[#EAF8FF] to-[#F7F2FF]', bar: 'bg-brand', soft: 'bg-ice' },
};

const variantMap = {
  visitors: ['table', 'violet', 'visitor-log'],
  tickets: ['table', 'ice', 'issue-register'],
  kpi: ['kpi', 'violet', 'mis-dashboard'],
  bars: ['kpi', 'ice', 'reports'],
  growth: ['kpi', 'violet', 'overview'],
  facility: ['kpi', 'ice', 'operations'],
  permits: ['board', 'violet', 'permit-board'],
  compare: ['board', 'ice', 'options'],
  flow: ['flow', 'violet', 'workflow'],
  automation: ['flow', 'ice', 'automation'],
  blocks: ['flow', 'violet', 'modules'],
};

const Line = ({ w, className = '' }) => <span className={`block h-1.5 rounded-full bg-navy/10 ${className}`} style={{ width: w }} />;

function TableMock({ p }) {
  const rows = [['72%', '44%'], ['58%', '60%'], ['80%', '36%'], ['64%', '52%'], ['70%', '40%']];
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-2 mb-1">
        <span className={`h-5 w-20 rounded-full ${p.bar} opacity-90`} />
        <span className="h-5 w-14 rounded-full bg-white border border-line" />
        <span className="h-5 w-14 rounded-full bg-white border border-line" />
      </div>
      {rows.map(([a, b], i) => (
        <div key={i} className="flex items-center gap-3 rounded-lg bg-white border border-line px-3 py-2">
          <span className={`w-5 h-5 rounded-full ${p.soft} shrink-0`} />
          <span className="flex-1 flex flex-col gap-1.5"><Line w={a} /><Line w={b} className="!bg-navy/5" /></span>
          <span className={`h-4 w-12 rounded-full shrink-0 ${i % 3 === 0 ? 'bg-[#E6F6EC]' : i % 3 === 1 ? p.soft : 'bg-[#FFF4DE]'}`} />
        </div>
      ))}
    </div>
  );
}

function KpiMock({ p }) {
  const bars = [38, 62, 48, 74, 58, 86, 68, 78];
  return (
    <div className="flex flex-col gap-2.5">
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg bg-white border border-line p-2.5 flex flex-col gap-2">
            <Line w="60%" />
            <span className={`block h-3.5 w-10 rounded ${i === 0 ? p.bar : 'bg-navy/70'}`} />
          </div>
        ))}
      </div>
      <div className="rounded-lg bg-white border border-line p-3">
        <div className="flex items-end gap-1.5 h-20">
          {bars.map((h, i) => (
            <span key={i} className={`flex-1 rounded-t ${i === 5 ? p.bar : 'bg-soft/60'}`} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function BoardMock({ p }) {
  const cols = [3, 2, 3];
  return (
    <div className="grid grid-cols-3 gap-2">
      {cols.map((n, c) => (
        <div key={c} className={`rounded-lg ${c === 1 ? p.soft : 'bg-white'} border border-line p-2 flex flex-col gap-2`}>
          <span className={`block h-2 w-12 rounded-full ${c === 1 ? p.bar : 'bg-navy/30'}`} />
          {Array.from({ length: n }).map((_, i) => (
            <div key={i} className="rounded-md bg-white border border-line p-2 flex flex-col gap-1.5">
              <Line w="80%" /><Line w="50%" className="!bg-navy/5" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function FlowMock({ p }) {
  return (
    <div className="flex flex-col gap-2.5 py-1">
      {[0, 1, 2].map((r) => (
        <div key={r} className="flex items-center gap-2">
          {[0, 1, 2].map((c) => (
            <React.Fragment key={c}>
              <div className={`flex-1 rounded-lg border border-line p-2.5 flex flex-col gap-1.5 ${(r + c) % 3 === 1 ? p.soft : 'bg-white'}`}>
                <span className={`block w-4 h-4 rounded ${(r + c) % 3 === 1 ? p.bar : 'bg-navy/20'}`} />
                <Line w="70%" />
              </div>
              {c < 2 && <span className="w-3 h-px bg-soft shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}

const layouts = { table: TableMock, kpi: KpiMock, board: BoardMock, flow: FlowMock };

export function ConceptVisual({ variant = 'kpi', label = 'Illustrative', className = '' }) {
  const [layout, palette, name] = variantMap[variant] || variantMap.kpi;
  const p = palettes[palette];
  const Layout = layouts[layout];
  return (
    <div
      role="img"
      aria-label="Illustrative interface concept — not a screenshot of a client system"
      className={`relative w-full h-full bg-gradient-to-br ${p.bg} p-4 sm:p-6 flex items-center justify-center overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 tech-grid opacity-50" aria-hidden="true" />
      <div className="relative w-full max-w-[420px] rounded-2xl bg-white/80 backdrop-blur border border-line shadow-card overflow-hidden" aria-hidden="true">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-line bg-white">
          <span className="w-2 h-2 rounded-full bg-soft" />
          <span className="w-2 h-2 rounded-full bg-lavender border border-soft/40" />
          <span className="w-2 h-2 rounded-full bg-ice border border-soft/40" />
          <span className="ml-2 font-mono text-[9px] tracking-widest text-muted uppercase truncate">concept · {name}</span>
        </div>
        <div className="p-3"><Layout p={p} /></div>
      </div>
      {label && (
        <span className="absolute top-3 right-3 rounded-full bg-white/95 border border-line px-2.5 py-1 font-mono text-[10px] tracking-wide text-muted">
          {label}
        </span>
      )}
    </div>
  );
}
