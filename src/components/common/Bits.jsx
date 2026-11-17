import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';

export function IconBadge({ icon: Icon, className = '' }) {
  return (
    <span className={`inline-flex w-12 h-12 shrink-0 rounded-2xl grad-icon text-white items-center justify-center shadow-[0_6px_18px_rgba(96,40,215,0.25)] ${className}`} aria-hidden="true">
      <Icon className="w-5 h-5" />
    </span>
  );
}

export function Tag({ children, tone = 'violet' }) {
  const tones = {
    violet: 'bg-lavender text-brand',
    ice: 'bg-ice text-[#0B5C80]',
    navy: 'bg-navy text-white',
    outline: 'bg-white text-muted border border-line',
    amber: 'bg-[#FFF4DE] text-[#8A5200]',
    green: 'bg-[#E6F6EC] text-[#11693A]',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 font-mono text-[11px] leading-5 tracking-wide ${tones[tone] || tones.violet}`}>
      {children}
    </span>
  );
}

export function CheckList({ items, columns = 1, className = '' }) {
  return (
    <ul className={`grid gap-x-6 gap-y-2.5 ${columns === 2 ? 'sm:grid-cols-2' : ''} ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-ink">
          <span className="mt-1 inline-flex w-4.5 h-4.5 shrink-0 rounded-full bg-lavender text-brand items-center justify-center" style={{ width: 18, height: 18 }} aria-hidden="true">
            <Check className="w-3 h-3" strokeWidth={3} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Inline text link with arrow; min 44px tall hit area. */
export function ArrowLink({ to, href, children, className = '', ...rest }) {
  const cls = `group/link inline-flex items-center gap-1.5 min-h-[44px] text-[15px] font-semibold text-brand hover:text-navy transition-colors ${className}`;
  const inner = (
    <>
      <span className="underline-offset-4 group-hover/link:underline">{children}</span>
      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" aria-hidden="true" />
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  return <a href={href} className={cls} {...rest}>{inner}</a>;
}

/** Numbered step list used for workflows. */
export function StepList({ steps }) {
  return (
    <ol className="relative grid gap-4">
      {steps.map((step, i) => (
        <li key={step} className="flex items-start gap-4">
          <span className="font-mono text-xs text-brand bg-lavender rounded-full w-8 h-8 shrink-0 inline-flex items-center justify-center" aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="text-[15px] leading-relaxed text-ink pt-1">{step}</span>
        </li>
      ))}
    </ol>
  );
}
