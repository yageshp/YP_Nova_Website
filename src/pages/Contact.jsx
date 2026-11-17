import React from 'react';
import { Mail, MapPin, Phone, ArrowUpRight, Clock, Globe } from 'lucide-react';
import { PageHeader, Section } from '@/components/common/PageShell';
import { ContactForm } from '@/components/forms/ContactForm';
import { LocationCard } from '@/components/common/LocationCard';
import { company } from '@/config/company';
import { seo } from '@/config/seo';
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon';
import { useSeo } from '@/hooks/useSeo';

function InfoRow({ icon: Icon, label, value, href, external, testId }) {
  const inner = (
    <>
      <span className="inline-flex w-11 h-11 shrink-0 rounded-xl bg-white/10 border border-white/15 items-center justify-center" aria-hidden="true">
        <Icon className="w-5 h-5" />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-soft">{label}</span>
        <span className="block text-base sm:text-[17px] font-semibold text-white break-words">
          {value} {external && <ArrowUpRight className="inline w-4 h-4" aria-hidden="true" />}
        </span>
      </span>
    </>
  );
  const cls = 'flex items-center gap-4 min-h-[56px] rounded-2xl -mx-2 px-2 py-1.5 hover:bg-white/10 transition-colors';
  return href ? (
    <a href={href} data-testid={testId} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {inner}
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

export default function Contact() {
  useSeo({
    title: 'Contact YP Nova | Call, WhatsApp or Email',
    description: `Contact YP Nova about custom software, ERP, AI or automation projects. Call or WhatsApp ${company.phone.display} or email ${company.email.address}. Meetings by appointment.`,
    path: '/contact',
    pageType: 'ContactPage',
    breadcrumbs: [{ name: 'Contact', path: '/contact' }],
  });

  return (
    <div data-testid="contact-page">
      <PageHeader
        eyebrow="Contact"
        title={<>Contact YP Nova — <span className="font-serif grad-text">let’s talk about your project.</span></>}
        subtitle="Tell us what you would like to build or improve. Share as much or as little as you have — a rough idea is enough to start."
      />

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6 lg:gap-8 items-start">
          {/* Left: contact details */}
          <aside aria-label="Contact details" className="relative overflow-hidden rounded-[28px] bg-navy text-white p-6 sm:p-8 md:p-10 lg:sticky lg:top-24">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-purple/40 blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="absolute -bottom-28 -left-20 w-64 h-64 rounded-full bg-brand/40 blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="relative">
              <h2 className="h-section !text-white !text-[clamp(1.6rem,1.3rem+1.2vw,2.1rem)]">
                Speak to us <span className="font-serif text-soft">directly.</span>
              </h2>
              <p className="mt-3 text-[#C9CFDD] leading-relaxed">
                Prefer a call or an email? Use whichever is easiest. We read every enquiry ourselves.
              </p>

              <div className="mt-7 flex flex-col gap-2">
                <InfoRow icon={Phone} label="Phone" value={company.phone.display} href={company.phone.href} testId="contact-phone" />
                <InfoRow icon={WhatsAppIcon} label="WhatsApp" value={`Chat on ${company.phone.display}`} href={company.whatsapp.href} external testId="contact-whatsapp" />
                <InfoRow icon={Mail} label="Email" value={company.email.address} href={company.email.href} testId="contact-email" />
                <InfoRow icon={Globe} label="Website" value="ypnova.com" href={`${seo.siteUrl}/`} testId="contact-website" />
                <InfoRow icon={MapPin} label="Service area" value="Mumbai · Navi Mumbai · Maharashtra · India" />
                <InfoRow icon={MapPin} label="Meetings by appointment" value="Google Maps location" href={company.location.mapsUrl} external testId="contact-maps" />
                {company.workingHours && <InfoRow icon={Clock} label="Working hours" value={company.workingHours} />}
              </div>

              {company.social.length > 0 && (
                <div className="mt-6 pt-6 border-t border-white/15 flex flex-wrap gap-x-5 gap-y-1">
                  {company.social.map((s) => (
                    <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 min-h-[44px] text-[#C9CFDD] hover:text-white">
                      {s.label} <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              )}

              <p className="mt-7 pt-6 border-t border-white/15 text-sm text-[#C9CFDD]">
                {company.brandName} · A brand of {company.parentCompany}
              </p>
            </div>
          </aside>

          {/* Right: enquiry form */}
          <div className="card p-6 sm:p-8 md:p-10">
            <h2 className="h-card !text-[1.5rem]">Project enquiry</h2>
            <p className="mt-1.5 mb-7 text-[15px] text-muted">Four required fields. The rest help us prepare for the conversation.</p>
            <ContactForm />
          </div>
        </div>
      </Section>

      <Section className="[&>div]:!pt-0">
        <LocationCard />
      </Section>

    </div>
  );
}
