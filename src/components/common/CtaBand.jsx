import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { Button } from './Button';
import { container } from './PageShell';
import { company } from '@/config/company';
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon';

/**
 * Closing call-to-action used at the bottom of interior pages.
 * One navy block per page keeps the site light overall.
 */
export function CtaBand({
  title = 'Have an idea or a business challenge?',
  text = 'Tell us what you want to improve. We will come back with questions, a suggested approach and an estimate based on your actual requirements.',
  cta = 'Discuss Your Project',
  to = '/contact',
}) {
  return (
    <section className={`${container} py-14 md:py-20`}>
      <div className="relative overflow-hidden rounded-[28px] md:rounded-[36px] bg-navy text-white px-6 py-10 sm:px-10 md:px-14 md:py-14">
        <div className="absolute -top-28 -right-20 w-80 h-80 rounded-full bg-purple/40 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-32 -left-16 w-72 h-72 rounded-full bg-brand/40 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="h-section !text-white">{title}</h2>
            <p className="mt-4 text-[#C9CFDD] text-base md:text-lg leading-relaxed">{text}</p>
          </div>
          <div className="flex flex-col gap-3 w-full sm:w-auto shrink-0">
            <Button to={to} variant="onDark" data-testid="cta-band-button">{cta}</Button>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-x-5 gap-y-1 text-sm text-[#C9CFDD]">
              <a href={company.phone.href} className="inline-flex items-center gap-2 min-h-[44px] hover:text-white">
                <Phone className="w-4 h-4" aria-hidden="true" /> {company.phone.display}
              </a>
              <a href={company.whatsapp.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 min-h-[44px] hover:text-white">
                <WhatsAppIcon className="w-4 h-4 text-[#4ADE80]" /> WhatsApp us
              </a>
              <a href={company.email.href} className="inline-flex items-center gap-2 min-h-[44px] hover:text-white">
                <Mail className="w-4 h-4" aria-hidden="true" /> {company.email.address}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
