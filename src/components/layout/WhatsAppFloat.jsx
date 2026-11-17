import React from 'react';
import { useLocation } from 'react-router-dom';
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon';
import { company } from '@/config/company';

/**
 * Large floating WhatsApp button, fixed to the right-hand side of every page.
 * On phones it sits above the quick-contact bar (BottomNav) so the two never overlap;
 * on the Contact page (where that bar is hidden) it drops to the corner.
 */
export function WhatsAppFloat() {
  const { pathname } = useLocation();
  const low = pathname === '/contact';
  return (
    <a
      href={company.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="whatsapp-float"
      aria-label={`${company.whatsapp.label} — ${company.phone.display} (opens WhatsApp)`}
      className={`group fixed z-30 right-4 sm:right-5 lg:right-7 ${low ? 'bottom-5' : 'bottom-[92px]'} lg:bottom-7
        inline-flex items-center justify-center w-[60px] h-[60px] lg:w-16 lg:h-16 rounded-full
        bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)]
        hover:bg-[#1EBE5A] hover:scale-105 active:scale-95 transition-all duration-300`}
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 motion-safe:animate-ping [animation-duration:2.6s]" aria-hidden="true" />
      <WhatsAppIcon className="relative w-8 h-8 lg:w-9 lg:h-9" />
      <span
        className="pointer-events-none absolute right-full mr-3 hidden lg:block whitespace-nowrap rounded-full bg-navy text-white text-sm font-semibold px-4 py-2 shadow-lift
          opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 transition-all duration-300"
        aria-hidden="true"
      >
        {company.whatsapp.label}
      </span>
    </a>
  );
}
