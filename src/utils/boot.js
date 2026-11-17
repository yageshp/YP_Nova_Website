/**
 * Rendering-mode flags shared by the pre-renderer and the browser.
 *
 * - PRERENDER: true while scripts/prerender.js is capturing a page. Scroll-reveal content is
 *   rendered visible so the saved HTML is complete and readable without JavaScript.
 * - BOOT_FROM_HTML: true when the browser opened a pre-rendered page. React re-renders the same
 *   markup; content already on screen is NOT faded in a second time (no flash, no layout shift).
 *   Cleared on the first client-side navigation so later pages animate as normal.
 */
export const isPrerender = () => typeof window !== 'undefined' && window.__YP_PRERENDER__ === true;

let bootFromHtml = false;
export const setBootFromHtml = (v) => {
  bootFromHtml = v;
  if (typeof document !== 'undefined') document.documentElement.classList.toggle('boot-static', v);
};
export const isBootFromHtml = () => bootFromHtml;
