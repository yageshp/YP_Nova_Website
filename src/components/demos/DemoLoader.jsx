import React, { useEffect, useRef, useState } from 'react';
import { Info, Loader2 } from 'lucide-react';
import { isPrerender } from '@/utils/boot';

const DEMO_LABEL = 'Illustrative interface — sample data';
const TITLES = { mis: 'Operations MIS', vms: 'Visitor Management', permit: 'Work Permits', cms: 'Complaint Desk' };
const EXPORTS = { mis: 'MisDemo', vms: 'VmsDemo', permit: 'PermitDemo', cms: 'CmsDemo' };

/**
 * Loads an interactive demo only when it scrolls near the viewport, as a separate JavaScript chunk,
 * so pages that never show a demo do not download its code. The placeholder reserves the demo's
 * space (no layout shift) and is what the pre-rendered HTML contains, so hydration matches.
 */
export function DemoLoader({ name }) {
  const [Comp, setComp] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    if (isPrerender() || !ref.current) return undefined;
    let cancelled = false;
    const load = () => import(/* webpackChunkName: "demos" */ './index').then((m) => { if (!cancelled) setComp(() => m[EXPORTS[name]]); });
    if (typeof IntersectionObserver === 'undefined') { load(); return () => { cancelled = true; }; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); load(); } }, { rootMargin: '800px 0px' });
    io.observe(ref.current);
    return () => { cancelled = true; io.disconnect(); };
  }, [name]);

  if (Comp) return <Comp />;
  return (
    <div ref={ref} data-testid={`demo-placeholder-${name}`} className="rounded-[20px] border border-line bg-white shadow-[0_24px_60px_rgba(16,23,45,0.12)] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#F6F5FA] border-b border-line">
        <span className="font-mono text-[11px] text-muted">{TITLES[name]}</span>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#FFF4DE] text-[#7A4800] px-2.5 py-0.5 font-mono text-[10px] sm:text-[11px]">
          <Info className="w-3 h-3" aria-hidden="true" /> {DEMO_LABEL}
        </span>
      </div>
      <div className="md:grid md:grid-cols-[200px_minmax(0,1fr)] lg:grid-cols-[216px_minmax(0,1fr)] min-h-[560px]">
        <div className="bg-navy h-14 md:h-auto" aria-hidden="true" />
        <div className="flex items-center justify-center gap-2 p-8 text-[14px] text-muted bg-[#FBFAFE] min-h-[504px]">
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Loading interactive demo…
        </div>
      </div>
    </div>
  );
}
