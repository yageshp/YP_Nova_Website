import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { company, navLinks, footerServiceLinks } from '@/config/company';
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon';

const linkCls = 'inline-flex items-center min-h-[40px] text-[15px] text-ink hover:text-brand transition-colors';
const headCls = 'font-mono text-xs uppercase tracking-[0.16em] text-muted mb-2';

export function Footer() {
  const footerNav = ['Home', 'Services', 'Solutions', 'Industries', 'Case Studies', 'Insights', 'About', 'Contact'].map(
    (label) => navLinks.find((l) => l.label === label),
  );

  return (
    <footer data-testid="site-footer" className="w-full border-t border-line bg-white">
      <div className="max-w-site mx-auto px-5 sm:px-6 lg:px-8 pt-14 md:pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1fr_1.2fr] gap-x-8 gap-y-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 max-w-sm">
            <Link to="/" className="inline-flex rounded-xl" aria-label="YP Nova — home">
              <img src="/yp-nova-logo.webp" alt="YP Nova logo" width="428" height="330" loading="lazy" className="h-24 md:h-28 w-auto object-contain" />
            </Link>
            <p className="mt-4 font-serif !text-2xl grad-text inline-block">{company.tagline}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              Custom software, AI-enabled automation, SaaS applications and business dashboards — the technology
              brand of {company.parentCompany}
            </p>
            <Button to="/contact" variant="primary" className="mt-6" data-testid="footer-cta">
              Book a Discovery Call
            </Button>
          </div>

          <nav aria-label="Footer" className="flex flex-col">
            <h2 className={headCls}>Navigation</h2>
            {footerNav.map((l) => (
              <Link key={l.to} to={l.to} className={linkCls}>{l.label}</Link>
            ))}
          </nav>

          <nav aria-label="Services" className="flex flex-col">
            <h2 className={headCls}>Services</h2>
            {footerServiceLinks.map((l) => (
              <Link key={l.to} to={l.to} className={linkCls}>{l.label}</Link>
            ))}
          </nav>

          <div className="flex flex-col sm:col-span-2 lg:col-span-1">
            <h2 className={headCls}>Contact</h2>
            <a href={company.phone.href} data-testid="footer-phone" className={`${linkCls} gap-2.5 font-medium`}>
              <Phone className="w-4 h-4 text-brand shrink-0" aria-hidden="true" /> {company.phone.display}
            </a>
            <a href={company.whatsapp.href} target="_blank" rel="noopener noreferrer" data-testid="footer-whatsapp" className={`${linkCls} gap-2.5 font-medium`}>
              <WhatsAppIcon className="w-4 h-4 text-[#1DA851] shrink-0" /> WhatsApp {company.phone.display}
              <span className="sr-only">(opens WhatsApp)</span>
            </a>
            <a href={company.email.href} data-testid="footer-email" className={`${linkCls} gap-2.5 font-medium break-all`}>
              <Mail className="w-4 h-4 text-brand shrink-0" aria-hidden="true" /> {company.email.address}
            </a>
            <a href={company.location.mapsUrl} target="_blank" rel="noopener noreferrer" data-testid="footer-maps" className={`${linkCls} gap-2.5 font-medium`}>
              <MapPin className="w-4 h-4 text-brand shrink-0" aria-hidden="true" /> View on Google Maps
              <ArrowUpRight className="w-3.5 h-3.5 -ml-1" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            {company.workingHours && <p className="mt-2 text-sm text-muted">{company.workingHours}</p>}
            {company.social.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-x-4">
                {company.social.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className={linkCls}>{s.label}</a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

export function CopyrightBar() {
  return (
    <div className="w-full border-t border-line bg-[#FAF8FF] pb-24 lg:pb-0">
      <div className="max-w-site mx-auto px-5 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row md:items-center justify-between gap-3 text-sm text-muted">
        <span>
          © {new Date().getFullYear()} {company.brandName} · A brand of {company.parentCompany}
        </span>
        <span className="flex items-center gap-5">
          <Link to="/privacy" className="inline-flex items-center min-h-[40px] hover:text-brand">Privacy Policy</Link>
          <Link to="/terms" className="inline-flex items-center min-h-[40px] hover:text-brand">Terms of Service</Link>
        </span>
      </div>
    </div>
  );
}
