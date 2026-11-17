import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { isPrerender, isBootFromHtml } from '@/utils/boot';

/**
 * Reveals content once it scrolls into view.
 * Returns isInView: false (hidden, waiting) | true (animate in) | 'static' (show immediately, no animation).
 * - While pre-rendering: always 'static' so the saved HTML contains visible content.
 * - When booting from pre-rendered HTML: elements already in the viewport are 'static'
 *   (decided before the first paint, so nothing flickers); the rest reveal on scroll as usual.
 * Falls back to visible when IntersectionObserver is unavailable.
 */
export function useInViewAnimation({ threshold = 0.08, triggerOnce = true } = {}) {
  const ref = useRef(null);
  // First render matches the pre-rendered HTML ('static') when pre-rendering or hydrating.
  const [isInView, setIsInView] = useState(() => (isPrerender() || isBootFromHtml() ? 'static' : false));

  useLayoutEffect(() => {
    if (!isBootFromHtml() || !ref.current) return;
    // Hydrating: content already on screen stays put; content below the fold is hidden
    // before the first paint and revealed on scroll as usual.
    const r = ref.current.getBoundingClientRect();
    if (!(r.top < window.innerHeight && r.bottom > 0)) setIsInView(false);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || isPrerender()) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView((v) => (v === 'static' ? v : true));
          if (triggerOnce) observer.unobserve(node);
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, triggerOnce]);

  return { ref, isInView };
}
