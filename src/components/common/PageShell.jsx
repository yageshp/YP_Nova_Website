import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const container = 'max-w-site mx-auto px-5 sm:px-6 lg:px-8';

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-3">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
        {items.map((item, i) => (
          <li key={item.label} className="inline-flex items-center gap-1">
            {i > 0 && <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />}
            {item.to ? (
              <Link to={item.to} className="inline-flex items-center min-h-[44px] hover:text-brand underline-offset-4 hover:underline">{item.label}</Link>
            ) : (
              <span aria-current="page" className="text-ink">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Page hero used by all interior pages. */
export function PageHeader({ eyebrow, title, subtitle, breadcrumbs, children }) {
  return (
    <section className="relative overflow-hidden border-b border-line grad-soft">
      <div className="absolute inset-0 tech-grid opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_at_top_right,black_10%,transparent_60%)]" aria-hidden="true" />
      <div className={`${container} relative pt-12 pb-12 md:pt-20 md:pb-16`}>
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        {eyebrow && <p className="eyebrow mb-4 animate-fade-in-up">{eyebrow}</p>}
        <h1 data-testid="page-title" className="h-page max-w-4xl animate-fade-in-up" style={{ animationDelay: '0.06s' }}>
          {title}
        </h1>
        {subtitle && (
          <p className="lead mt-5 max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.12s' }}>
            {subtitle}
          </p>
        )}
        {children && (
          <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.18s' }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

export function Section({ children, className = '', tone = 'white', id, ...rest }) {
  const tones = {
    white: '',
    lavender: 'bg-lavender/60',
    soft: 'grad-soft',
  };
  return (
    <section id={id} className={`${tones[tone] || ''} ${className}`} {...rest}>
      <div className={`${container} py-14 md:py-20`}>{children}</div>
    </section>
  );
}

/** Section heading block: eyebrow + h2 + optional intro, left or centre aligned. */
export function SectionHeading({ eyebrow, title, intro, align = 'left', className = '', as: Tag = 'h2' }) {
  const centred = align === 'center';
  return (
    <div className={`${centred ? 'text-center mx-auto' : ''} max-w-3xl mb-10 md:mb-12 ${className}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <Tag className="h-section">{title}</Tag>
      {intro && <p className={`lead mt-4 ${centred ? 'mx-auto' : ''} max-w-2xl`}>{intro}</p>}
    </div>
  );
}
