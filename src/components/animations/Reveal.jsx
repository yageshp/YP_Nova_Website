import React from 'react';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';

/** Fades children up when scrolled into view. `delay` in seconds. */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const { ref, isInView } = useInViewAnimation();
  const state = isInView === 'static' ? '' : isInView ? 'animate-fade-in-up' : 'opacity-0';
  return (
    <Tag
      ref={ref}
      className={`${state} ${className}`}
      style={state === 'animate-fade-in-up' ? { animationDelay: `${delay}s` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
