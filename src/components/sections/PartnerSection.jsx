import React, { useRef } from 'react';
import { Phone, Mail } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Reveal } from '@/components/animations/Reveal';
import { company } from '@/config/company';
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon';

/**
 * Final call-to-action panel (original PartnerSection).
 * The original spawned third-party GIFs under the pointer; that is replaced by a
 * soft violet glow that follows the pointer, updated through CSS variables
 * (no React state, no external assets).
 */
export function PartnerSection() {
  const panelRef = useRef(null);

  const onMove = (e) => {
    const el = panelRef.current;
    if (!el || e.pointerType === 'touch') return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--gx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--gy', `${e.clientY - rect.top}px`);
    el.style.setProperty('--go', '1');
  };
  const onLeave = () => panelRef.current?.style.setProperty('--go', '0');

  return (
    <section data-testid="final-cta" className="w-full pt-4 pb-16 md:pb-24 px-4 sm:px-6">
      <Reveal>
        <div
          ref={panelRef}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          className="relative max-w-[1240px] mx-auto rounded-[28px] md:rounded-[40px] border border-line bg-gradient-to-br from-white via-[#F7F2FF] to-[#EAF8FF] px-6 py-16 sm:px-10 md:py-24 lg:py-28 flex flex-col items-center text-center overflow-hidden shadow-[0_20px_70px_rgba(96,40,215,0.12)]"
        >
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple/15 blur-3xl pointer-events-none animate-pulse-glow" aria-hidden="true" />
          <div className="absolute -bottom-40 -right-40 w-[480px] h-[480px] rounded-full bg-[#BFE9FF]/40 blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="absolute inset-0 tech-grid opacity-40 pointer-events-none" aria-hidden="true" />
          <div
            className="absolute w-[420px] h-[420px] rounded-full pointer-events-none transition-opacity duration-500"
            style={{
              left: 'var(--gx, 50%)', top: 'var(--gy, 50%)', opacity: 'var(--go, 0)',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, rgba(124,58,237,0) 65%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl">
            <p className="eyebrow mb-4">Start a conversation</p>
            <h2 className="h-section !text-[clamp(1.75rem,1.2rem+2.6vw,3.25rem)]">
              Have an Idea or Business Challenge? <span className="font-serif grad-text">Let’s Build</span> Something That Works.
            </h2>
            <p className="lead mt-5 max-w-xl mx-auto">
              Tell us what you want to improve. The first conversation is about understanding your requirement — nothing more.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <Button to="/contact" variant="primary" className="!pl-2 gap-3" data-testid="final-cta-button">
                <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0" aria-hidden="true">
                  <img src="/yp-nova-logo-mark.webp" alt="" width="204" height="160" loading="lazy" className="w-7 h-auto object-contain" />
                </span>
                <span className="pr-3">Discuss Your Project</span>
              </Button>
              <Button href={company.phone.href} variant="secondary">
                <Phone className="w-4 h-4 text-brand" aria-hidden="true" /> {company.phone.display}
              </Button>
              <Button href={company.whatsapp.href} target="_blank" rel="noopener noreferrer" variant="secondary"
                className="!bg-[#25D366] !text-white !border-transparent hover:!bg-[#1EBE5A]" data-testid="final-cta-whatsapp">
                <WhatsAppIcon className="w-5 h-5" /> WhatsApp
              </Button>
            </div>
            <a href={company.email.href} className="mt-4 inline-flex items-center gap-2 min-h-[44px] text-[15px] font-medium text-ink hover:text-brand">
              <Mail className="w-4 h-4 text-brand" aria-hidden="true" /> {company.email.address}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
