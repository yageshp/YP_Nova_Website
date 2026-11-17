import React from 'react';
import { ChevronDown } from 'lucide-react';
import { plainText, RichText } from './RichText';

/**
 * FAQ list using native <details>: answers are always in the HTML (visible to search engines and
 * screen readers), keyboard accessible, no JavaScript needed. The first item starts open.
 */
export function FaqList({ faqs, heading = 'Frequently asked questions', id = 'faq' }) {
  return (
    <section aria-labelledby={`${id}-heading`} id={id} className="scroll-mt-24">
      <h2 id={`${id}-heading`} className="h-section">{heading}</h2>
      <div className="mt-8 flex flex-col gap-3">
        {faqs.map((f, i) => (
          <details key={f.q} open={i === 0} className="group card overflow-hidden [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-start justify-between gap-4 cursor-pointer list-none p-5 sm:p-6 min-h-[56px]">
              <h3 className="font-display font-bold text-[1.0625rem] leading-snug text-navy">{f.q}</h3>
              <ChevronDown className="w-5 h-5 mt-0.5 shrink-0 text-brand transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
            </summary>
            <p className="px-5 sm:px-6 pb-6 -mt-1 text-[15px] leading-relaxed text-muted"><RichText text={f.a} /></p>
          </details>
        ))}
      </div>
    </section>
  );
}

export const faqsPlain = (faqs) => faqs.map((f) => ({ q: f.q, a: plainText(f.a) }));
