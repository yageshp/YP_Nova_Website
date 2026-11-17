import React from 'react';
import { Link } from 'react-router-dom';

const base =
  'inline-flex items-center justify-center gap-2 min-h-[48px] rounded-full px-6 py-3 text-[15px] font-semibold leading-tight text-center transition-all duration-300 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none';

const variants = {
  primary: 'grad-button text-white shadow-cta hover:shadow-[0_12px_32px_rgba(96,40,215,0.4)] hover:-translate-y-0.5',
  secondary:
    'bg-white text-navy border border-line shadow-card hover:border-purple/40 hover:text-brand hover:-translate-y-0.5',
  // kept for backwards compatibility with the original component API
  tertiary: 'bg-white text-navy border border-line shadow-card hover:text-brand',
  ghost: 'bg-transparent text-navy hover:bg-lavender hover:text-brand',
  onDark: 'bg-white text-navy hover:bg-lavender hover:-translate-y-0.5',
  outlineOnDark: 'bg-transparent text-white border border-white/40 hover:bg-white/10',
};

/**
 * Shared button. Renders a router <Link> (`to`), an anchor (`href`) or a <button>.
 * Minimum 48px tall for comfortable touch targets.
 */
export const Button = ({ variant = 'primary', className = '', href, to, children, ...props }) => {
  const classes = `${base} ${variants[variant] || variants.primary} ${className}`;
  if (to) return <Link to={to} className={classes} {...props}>{children}</Link>;
  if (href) return <a href={href} className={classes} {...props}>{children}</a>;
  return <button type="button" className={classes} {...props}>{children}</button>;
};
