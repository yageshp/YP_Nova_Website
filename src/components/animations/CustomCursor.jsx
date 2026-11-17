import { useEffect, useRef } from 'react';

const INTERACTIVE =
  'a, button, [role="button"], label, select, summary, [data-cursor="hover"], .card-hover';
const TEXT_ENTRY = 'input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]), textarea, iframe';

/**
 * YP Nova signature cursor: a small violet ring with a centre dot and a faint
 * delayed trailing ring.
 *
 * - Runs only for fine pointers with hover (mouse / trackpad) and when the
 *   visitor has not asked for reduced motion. Touch devices never see it.
 * - Positions are written straight to the DOM inside one requestAnimationFrame
 *   loop; no React state changes on pointer movement.
 * - The native cursor is hidden only while this component is active (via the
 *   html.has-custom-cursor class), so it remains as a fallback.
 * - All layers are pointer-events:none and aria-hidden: clicks, text selection
 *   and keyboard use are unaffected.
 */
export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const dot = dotRef.current;
    const ring = ringRef.current;
    const trail = trailRef.current;
    const layers = [dot, ring, trail];
    let stop = null;

    const start = () => {
      const root = document.documentElement;
      let x = 0, y = 0, rx = 0, ry = 0, tx = 0, ty = 0;
      let raf = 0;
      let seen = false;

      const frame = () => {
        rx += (x - rx) * 0.35;
        ry += (y - ry) * 0.35;
        tx += (x - tx) * 0.12;
        ty += (y - ty) * 0.12;
        dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
        trail.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        // Sleep once everything has caught up; the next pointer move wakes the loop.
        raf = Math.abs(x - tx) + Math.abs(y - ty) > 0.1 ? requestAnimationFrame(frame) : 0;
      };

      const onMove = (e) => {
        if (e.pointerType && e.pointerType !== 'mouse') return;
        x = e.clientX;
        y = e.clientY;
        if (!seen) {
          seen = true;
          rx = tx = x;
          ry = ty = y;
          root.classList.add('has-custom-cursor');
          layers.forEach((l) => l.classList.add('is-visible'));
        }
        if (!raf) raf = requestAnimationFrame(frame);
      };

      // Event delegation: one listener instead of one per interactive element.
      const onOver = (e) => {
        const t = e.target instanceof Element ? e.target : null;
        const hover = !!(t && t.closest(INTERACTIVE));
        const text = !!(t && t.closest(TEXT_ENTRY));
        ring.classList.toggle('is-hover', hover);
        trail.classList.toggle('is-hover', hover);
        layers.forEach((l) => l.classList.toggle('is-text', text));
      };
      const onDown = () => ring.classList.add('is-down');
      const onUp = () => ring.classList.remove('is-down');
      const onLeave = () => layers.forEach((l) => l.classList.remove('is-visible'));
      const onEnter = () => seen && layers.forEach((l) => l.classList.add('is-visible'));

      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerover', onOver, { passive: true });
      window.addEventListener('pointerdown', onDown, { passive: true });
      window.addEventListener('pointerup', onUp, { passive: true });
      document.documentElement.addEventListener('mouseleave', onLeave);
      document.documentElement.addEventListener('mouseenter', onEnter);

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerover', onOver);
        window.removeEventListener('pointerdown', onDown);
        window.removeEventListener('pointerup', onUp);
        document.documentElement.removeEventListener('mouseleave', onLeave);
        document.documentElement.removeEventListener('mouseenter', onEnter);
        root.classList.remove('has-custom-cursor');
        layers.forEach((l) => l.classList.remove('is-visible', 'is-hover', 'is-text', 'is-down'));
      };
    };

    const evaluate = () => {
      if (stop) {
        stop();
        stop = null;
      }
      if (fine.matches && !reduce.matches) stop = start();
    };
    evaluate();
    fine.addEventListener?.('change', evaluate);
    reduce.addEventListener?.('change', evaluate);
    return () => {
      fine.removeEventListener?.('change', evaluate);
      reduce.removeEventListener?.('change', evaluate);
      if (stop) stop();
    };
  }, []);

  return (
    <div aria-hidden="true">
      <div ref={trailRef} className="cursor-layer cursor-trail"><span /></div>
      <div ref={ringRef} className="cursor-layer cursor-ring"><span /></div>
      <div ref={dotRef} className="cursor-layer cursor-dot"><span /></div>
    </div>
  );
}
