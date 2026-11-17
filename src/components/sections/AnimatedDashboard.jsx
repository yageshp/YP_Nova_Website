import React, { useEffect, useState } from 'react';
import { isPrerender } from '@/utils/boot';

/**
 * AnimatedDashboard — self-contained animated operations dashboard mock (original
 * component, re-themed to the light YP Nova palette). All figures are sample data
 * and the window is labelled as illustrative.
 */
const bars = [
  [42, 68, 55, 82, 71, 90, 78],
  [55, 47, 78, 63, 88, 72, 95],
  [30, 62, 48, 74, 66, 84, 70],
  [50, 72, 60, 88, 76, 92, 82],
];
const kpis = [
  { label: 'Visitors today', value: ['36', '41', '47', '52'] },
  { label: 'Active permits', value: ['8', '9', '7', '10'] },
  { label: 'Open complaints', value: ['5', '4', '6', '3'] },
];

export function AnimatedDashboard({ className = '' }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (isPrerender() || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setTick((t) => (t + 1) % 4), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      role="img"
      aria-label="Illustrative operations dashboard with sample data: visitors, permits, complaints and meter-reading trend"
      className={`relative rounded-[22px] overflow-hidden bg-white border border-line shadow-[0_24px_70px_rgba(96,40,215,0.16)] text-left ${className}`}
    >
      <div aria-hidden="true">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 sm:px-5 py-3 border-b border-line bg-[#FBFAFE]">
          <span className="w-2.5 h-2.5 rounded-full bg-soft" />
          <span className="w-2.5 h-2.5 rounded-full bg-lavender border border-soft/50" />
          <span className="w-2.5 h-2.5 rounded-full bg-ice border border-soft/50" />
          <span className="ml-2 font-mono text-[10px] tracking-widest text-muted uppercase truncate">ypnova · operations</span>
          <span className="ml-auto shrink-0 rounded-full bg-lavender text-brand px-2.5 py-0.5 font-mono text-[10px]">Illustrative · sample data</span>
        </div>

        <div className="relative p-4 sm:p-5 bg-gradient-to-br from-white via-[#FBF9FF] to-[#F3FAFF]">
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {kpis.map((k, i) => (
              <div key={k.label} className="rounded-xl bg-white border border-line px-2.5 sm:px-3 py-2.5">
                <div className="font-mono text-[8px] sm:text-[9px] tracking-wider text-muted uppercase leading-tight min-h-[20px]">{k.label}</div>
                <div className={`mt-1 font-display text-lg sm:text-2xl font-bold tabular-nums ${i === 0 ? 'text-brand' : 'text-navy'}`}>
                  {k.value[tick]}
                </div>
              </div>
            ))}
          </div>

          {/* Trend line */}
          <div className="mt-3 rounded-xl bg-white border border-line p-3">
            <div className="flex items-center justify-between gap-2">
              <div className="font-mono text-[9px] tracking-wider text-muted uppercase">Meter readings · trend</div>
              <div className="flex gap-1">
                {['7D', '30D', '90D'].map((t, i) => (
                  <span key={t} className={`font-mono text-[9px] px-2 py-0.5 rounded-full ${i === 1 ? 'bg-lavender text-brand' : 'text-muted'}`}>{t}</span>
                ))}
              </div>
            </div>
            <svg viewBox="0 0 300 70" className="w-full h-16 mt-2 overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="yp-spark" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#6028D7" />
                  <stop offset="100%" stopColor="#A78BFA" />
                </linearGradient>
                <linearGradient id="yp-spark-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 55 L25 45 L50 50 L75 32 L100 40 L125 26 L150 34 L175 22 L200 30 L225 16 L250 20 L275 10 L300 14 L300 70 L0 70 Z" fill="url(#yp-spark-fill)" />
              <path
                d="M0 55 L25 45 L50 50 L75 32 L100 40 L125 26 L150 34 L175 22 L200 30 L225 16 L250 20 L275 10 L300 14"
                stroke="url(#yp-spark)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
                vectorEffect="non-scaling-stroke" strokeDasharray="600" strokeDashoffset="600"
                style={{ animation: 'sparkDraw 2.6s ease-out 0.3s forwards' }}
              />
            </svg>
          </div>

          {/* Bars */}
          <div className="mt-3 rounded-xl bg-white border border-line p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="font-mono text-[9px] tracking-wider text-muted uppercase">Complaints closed · by day</div>
              <div className="font-mono text-[9px] text-muted">Mon → Sun</div>
            </div>
            <div className="flex items-end justify-between gap-2 h-20 sm:h-24">
              {bars[tick].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-brand to-soft transition-[height] duration-700 ease-out"
                    style={{ height: `${h}%`, minHeight: 6 }}
                  />
                  <div className="font-mono text-[8px] text-muted">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
