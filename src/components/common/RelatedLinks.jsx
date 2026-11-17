import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

/** Card grid of internal links with a descriptive title and one-line summary. */
export function RelatedLinks({ title, items, columns = 3 }) {
  if (!items.length) return null;
  const cols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[columns];
  return (
    <div>
      <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted mb-4">{title}</h2>
      <ul className={`grid grid-cols-1 ${cols} gap-4`}>
        {items.map((it) => (
          <li key={it.to}>
            <Link to={it.to} className="group card card-hover h-full p-5 flex items-start gap-4">
              {it.icon && (
                <span className="inline-flex w-10 h-10 shrink-0 rounded-xl bg-lavender text-brand items-center justify-center" aria-hidden="true">
                  <it.icon className="w-5 h-5" />
                </span>
              )}
              <span className="min-w-0">
                <span className="flex items-start gap-1 font-display font-bold text-[1rem] leading-snug text-navy group-hover:text-brand transition-colors">
                  {it.label} <ArrowUpRight className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                </span>
                {it.text && <span className="mt-1 block text-sm leading-relaxed text-muted">{it.text}</span>}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
