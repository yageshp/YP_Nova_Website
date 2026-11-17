import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';
import { container } from '@/components/common/PageShell';
import { approachSteps } from '@/data/approach';

/**
 * "The YP Nova Approach" carousel.
 *
 * This keeps the original testimonial carousel's card design and motion, but the
 * cards are statements written by YP Nova about how we work. They are NOT customer
 * quotations. To publish genuine testimonials later, add approved entries to
 * `verifiedTestimonials` (with written permission) — never invent them.
 */
export const verifiedTestimonials = []; // { quote, name, role, company } — approved, real feedback only

/** "How We Approach Every Project" — our own delivery process, not customer testimonials. */
const approach = approachSteps.map(({ title, text }) => ({ title, text }));

const QuoteIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 18.6667C12 21.6122 9.61218 24 6.66667 24C3.72115 24 1.33333 21.6122 1.33333 18.6667C1.33333 15.7212 3.72115 13.3333 6.66667 13.3333C8.63637 13.3333 10.3582 14.4013 11.2727 16H12V18.6667ZM28 18.6667C28 21.6122 25.6122 24 22.6667 24C19.7212 24 17.3333 21.6122 17.3333 18.6667C17.3333 15.7212 19.7212 13.3333 22.6667 13.3333C24.6364 13.3333 26.3582 14.4013 27.2727 16H28V18.6667Z" fill="#7C3AED" fillOpacity="0.16" />
    <path d="M12 16L12 8C6.10862 8 1.33333 12.7753 1.33333 18.6667" stroke="#6028D7" strokeWidth="2" strokeLinecap="round" />
    <path d="M28 16L28 8C22.1086 8 17.3333 12.7753 17.3333 18.6667" stroke="#6028D7" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export function TestimonialCarousel() {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const hasTestimonials = verifiedTestimonials.length > 0;
  const cards = hasTestimonials
    ? verifiedTestimonials.map((t) => ({ title: `${t.name} · ${t.role}, ${t.company}`, text: t.quote }))
    : approach;

  const step = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('[data-card]');
    const amount = card ? card.getBoundingClientRect().width + 20 : 320;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
    const atStart = track.scrollLeft <= 8;
    if (dir > 0 && atEnd) track.scrollTo({ left: 0, behavior: 'smooth' });
    else if (dir < 0 && atStart) track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    else track.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  // Gentle auto-advance; pauses on hover/focus and is disabled for reduced motion.
  useEffect(() => {
    if (paused) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return; // only while visible
      step(1);
    }, 4500);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section data-testid="approach-section" className="w-full py-14 md:py-20 overflow-hidden">
      <div className={`${container} mb-8 md:mb-10 flex flex-col md:flex-row justify-between md:items-end gap-5`}>
        <Reveal className="max-w-2xl">
          <p className="eyebrow mb-3">{hasTestimonials ? 'Client feedback' : 'How we work with you'}</p>
          <h2 className="h-section">
            {hasTestimonials ? <>What our <span className="font-serif grad-text">clients</span> say</> : <>How We Approach <span className="font-serif grad-text">Every Project</span></>}
          </h2>
          {!hasTestimonials && (
            <p className="lead mt-4">Six stages we follow on every engagement, from the first conversation to support after go-live.</p>
          )}
        </Reveal>
        <div className="flex items-center gap-3 shrink-0">
          <button type="button" onClick={() => step(-1)} data-testid="testimonial-prev" aria-label="Previous card"
            className="w-12 h-12 rounded-full border border-line bg-white text-navy inline-flex items-center justify-center hover:border-purple/40 hover:text-brand transition-colors">
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => step(1)} data-testid="testimonial-next" aria-label="Next card"
            className="w-12 h-12 rounded-full border border-line bg-white text-navy inline-flex items-center justify-center hover:border-purple/40 hover:text-brand transition-colors">
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
      >
        <ul
          ref={trackRef}
          tabIndex={0}
          aria-label={hasTestimonials ? 'Client feedback' : 'How we approach every project'}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth px-5 sm:px-6 lg:px-[max(2rem,calc((100vw-1200px)/2+2rem))] scroll-pl-5 sm:scroll-pl-6 lg:[scroll-padding-left:max(2rem,calc((100vw-1200px)/2+2rem))] pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {cards.map((c, i) => (
            <li
              key={c.title}
              data-card
              className="snap-start shrink-0 w-[min(84vw,400px)] bg-white border border-line rounded-[28px] md:rounded-[32px] shadow-card p-6 md:p-8 flex flex-col"
            >
              {hasTestimonials ? <QuoteIcon /> : (
                <span className="self-start font-mono text-xs font-medium text-brand bg-lavender rounded-full px-2.5 py-1" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              )}
              <p className="mt-5 text-base md:text-[17px] leading-relaxed text-ink">{c.text}</p>
              <div className="mt-auto pt-6 flex items-center justify-between gap-3">
                <h3 className="font-display font-bold text-[15px] text-navy">{c.title}</h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
