import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Phone, Mail } from 'lucide-react';
import { company, navLinks } from '@/config/company';
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon';

const testId = (prefix, label) => `${prefix}-${label.toLowerCase().replace(/\s+/g, '-')}`;

export function TopNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  // Close the mobile panel on navigation
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // While the panel is open: lock background scroll, close on Escape, keep Tab inside header
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = [toggleRef.current, ...panelRef.current.querySelectorAll('a, button')];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <header
      data-testid="top-nav"
      className={`sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b transition-shadow duration-300 ${
        scrolled || open ? 'border-line shadow-[0_6px_24px_rgba(16,23,45,0.06)]' : 'border-line/70'
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between gap-3">
        <Link to="/" data-testid="nav-logo" className="flex items-center shrink-0 group rounded-xl" aria-label="YP Nova — home">
          <img
            src="/yp-nova-logo-header.webp"
            alt="YP Nova logo"
            width="254"
            height="208"
            className="h-12 sm:h-[52px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.04]"
          />
        </Link>

        {/* Desktop links */}
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-0.5 xl:gap-1">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              data-testid={testId('nav-link', l.label)}
              className={({ isActive }) =>
                `px-2.5 xl:px-3.5 py-2 rounded-full text-[14px] xl:text-[15px] font-medium whitespace-nowrap transition-colors duration-200 ${
                  isActive ? 'bg-lavender text-brand' : 'text-ink hover:bg-lavender/60 hover:text-brand'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-1 shrink-0">
          <a
            href={company.phone.href}
            data-testid="nav-phone"
            aria-label={`Call YP Nova on ${company.phone.display}`}
            title={company.phone.display}
            className="hidden xl:inline-flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] min-[1360px]:px-3 rounded-full text-[14px] font-medium text-ink hover:text-brand hover:bg-lavender/60"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            <span className="hidden min-[1360px]:inline">{company.phone.display}</span>
          </a>
          <a
            href={company.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="nav-whatsapp"
            aria-label={`WhatsApp YP Nova on ${company.phone.display}`}
            title="Chat on WhatsApp"
            className="w-11 h-11 rounded-full inline-flex items-center justify-center text-[#1DA851] hover:bg-[#E8F9EF] transition-colors"
          >
            <WhatsAppIcon className="w-[22px] h-[22px]" />
          </a>
          <Link
            to="/contact"
            data-testid="nav-cta-start-project"
            className="inline-flex items-center gap-1.5 min-h-[44px] grad-button text-white rounded-full px-4 xl:px-5 text-[14px] font-semibold whitespace-nowrap shadow-cta hover:shadow-[0_10px_28px_rgba(96,40,215,0.4)] transition-shadow"
          >
            Book a Discovery Call <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Mobile: quick call + toggle */}
        <div className="flex lg:hidden items-center gap-1">
          <a
            href={company.phone.href}
            data-testid="nav-mobile-call"
            aria-label={`Call YP Nova on ${company.phone.display}`}
            className="w-11 h-11 rounded-full inline-flex items-center justify-center text-brand hover:bg-lavender"
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
          </a>
          <a
            href={company.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="nav-mobile-whatsapp"
            aria-label={`WhatsApp YP Nova on ${company.phone.display}`}
            className="w-11 h-11 rounded-full inline-flex items-center justify-center text-[#1DA851] hover:bg-[#E8F9EF]"
          >
            <WhatsAppIcon className="w-[22px] h-[22px]" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            data-testid="nav-mobile-toggle"
            onClick={() => setOpen((v) => !v)}
            className="w-11 h-11 rounded-full inline-flex items-center justify-center text-navy hover:bg-lavender"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          data-testid="nav-mobile-menu"
          className="lg:hidden absolute inset-x-0 top-full bg-white border-t border-line shadow-[0_24px_40px_rgba(16,23,45,0.12)] max-h-[calc(100dvh-68px)] overflow-y-auto overscroll-contain"
        >
          <nav aria-label="Mobile" className="max-w-[720px] mx-auto px-4 sm:px-6 pt-3 pb-6 flex flex-col">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                data-testid={testId('mobile-nav-link', l.label)}
                className={({ isActive }) =>
                  `flex items-center min-h-[48px] px-4 rounded-2xl text-[17px] font-medium ${
                    isActive ? 'bg-lavender text-brand' : 'text-navy hover:bg-lavender/60'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              data-testid="mobile-nav-cta"
              className="mt-4 inline-flex items-center justify-center gap-1.5 min-h-[52px] grad-button text-white rounded-full px-5 text-base font-semibold shadow-cta"
            >
              Book a Discovery Call <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <div className="mt-4 grid grid-cols-1 xs:grid-cols-2 gap-2">
              <a href={company.phone.href} className="inline-flex items-center justify-center gap-2 min-h-[48px] rounded-full border border-line text-navy text-[15px] font-medium px-3">
                <Phone className="w-4 h-4 text-brand" aria-hidden="true" /> {company.phone.display}
              </a>
              <a href={company.whatsapp.href} target="_blank" rel="noopener noreferrer" data-testid="mobile-menu-whatsapp"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] rounded-full bg-[#25D366] text-white text-[15px] font-semibold px-3">
                <WhatsAppIcon className="w-[18px] h-[18px]" /> WhatsApp
              </a>
              <a href={company.email.href} className="xs:col-span-2 inline-flex items-center justify-center gap-2 min-h-[48px] rounded-full border border-line text-navy text-[15px] font-medium px-3">
                <Mail className="w-4 h-4 text-brand" aria-hidden="true" /> {company.email.address}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
