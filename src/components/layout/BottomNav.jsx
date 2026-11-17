import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MessageSquareText } from 'lucide-react';
import { company } from '@/config/company';
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon';

/**
 * Floating contact shortcut (kept from the original site).
 * - Phones / tablets: a three-action bar — Call, Email, Enquire.
 * - Desktop: the original logo + CTA pill.
 * Appears after the visitor scrolls past the hero; hidden on the Contact page.
 */
export function BottomNav() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 320;
      setVisible(window.scrollY > 420 && !(nearBottom && window.innerWidth >= 1024));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  if (pathname === '/contact') return null;

  const action = 'flex-1 inline-flex flex-col items-center justify-center gap-0.5 min-h-[52px] rounded-2xl text-[12px] font-semibold';

  return (
    <div
      data-testid="bottom-nav"
      className={`fixed z-30 left-1/2 -translate-x-1/2 bottom-3 lg:bottom-6 w-[calc(100%-24px)] max-w-[420px] lg:w-auto lg:max-w-none transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
      aria-hidden={!visible}
    >
      {/* Mobile / tablet */}
      <nav aria-label="Quick contact" className="lg:hidden flex items-stretch gap-1.5 p-1.5 rounded-[22px] bg-white/95 backdrop-blur border border-line shadow-[0_10px_40px_rgba(16,23,45,0.18)]">
        <a href={company.phone.href} tabIndex={visible ? 0 : -1} data-testid="bottom-call" className={`${action} text-navy hover:bg-lavender`}>
          <Phone className="w-[18px] h-[18px] text-brand" aria-hidden="true" /> Call
        </a>
        <a href={company.whatsapp.href} target="_blank" rel="noopener noreferrer" tabIndex={visible ? 0 : -1} data-testid="bottom-whatsapp" className={`${action} text-navy hover:bg-[#E8F9EF]`}>
          <WhatsAppIcon className="w-[18px] h-[18px] text-[#1DA851]" /> WhatsApp
        </a>
        <a href={company.email.href} tabIndex={visible ? 0 : -1} data-testid="bottom-email" className={`${action} text-navy hover:bg-lavender`}>
          <Mail className="w-[18px] h-[18px] text-brand" aria-hidden="true" /> Email
        </a>
        <Link to="/contact" tabIndex={visible ? 0 : -1} data-testid="bottom-enquire" className={`${action} grad-button text-white flex-[1.4]`}>
          <MessageSquareText className="w-[18px] h-[18px]" aria-hidden="true" /> Enquire
        </Link>
      </nav>

      {/* Desktop pill */}
      <div className="hidden lg:flex items-center gap-4 bg-white/95 backdrop-blur rounded-full pl-4 pr-2 py-2 border border-line shadow-[0_10px_40px_rgba(16,23,45,0.16)]">
        <Link to="/" tabIndex={visible ? 0 : -1} aria-label="YP Nova — home" className="inline-flex rounded-lg">
          <img src="/yp-nova-logo-mark.webp" alt="" width="204" height="160" loading="lazy" className="h-9 w-auto object-contain" />
        </Link>
        <a href={company.phone.href} tabIndex={visible ? 0 : -1} className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-brand">
          <Phone className="w-4 h-4 text-brand" aria-hidden="true" /> {company.phone.display}
        </a>
        <a href={company.whatsapp.href} target="_blank" rel="noopener noreferrer" tabIndex={visible ? 0 : -1}
          aria-label={`WhatsApp YP Nova on ${company.phone.display}`}
          className="inline-flex w-10 h-10 rounded-full items-center justify-center text-[#1DA851] hover:bg-[#E8F9EF]">
          <WhatsAppIcon className="w-5 h-5" />
        </a>
        <Link to="/contact" tabIndex={visible ? 0 : -1} className="inline-flex items-center min-h-[44px] grad-button text-white rounded-full px-5 text-sm font-semibold hover:shadow-cta transition-shadow">
          Book a Discovery Call
        </Link>
      </div>
    </div>
  );
}
