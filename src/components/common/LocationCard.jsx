import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Navigation, ExternalLink, CalendarClock, Globe } from 'lucide-react';
import { Button } from './Button';
import { company } from '@/config/company';
import { seo } from '@/config/seo';

/**
 * Service area & meetings (Contact page).
 * YP Nova has no customer-facing walk-in office, so no address is shown and the Google Maps link
 * is offered only for directions to a meeting that has been arranged in advance.
 */
export function LocationCard() {
  const { mapsUrl, directionsUrl } = company.location;
  return (
    <section aria-labelledby="service-area-h" className="card overflow-hidden" data-testid="location-card">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="p-6 sm:p-8 md:p-10">
          <p className="eyebrow mb-3">India &amp; international clients</p>
          <h2 id="service-area-h" className="h-section !text-[clamp(1.5rem,1.15rem+1.4vw,2.25rem)]">
            Working with clients <span className="font-serif grad-text">everywhere</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink">
            YP Nova works with clients across India and around the world. Projects are delivered remotely, so where your business is
            located is never a barrier. We do not operate a walk-in office: meetings are arranged in advance — over a video call, at
            your premises where practical, or at a place we confirm with you when we schedule the meeting.
          </p>
          <ul className="mt-6 flex flex-col gap-3 text-[15px] text-ink">
            <li className="flex items-start gap-3"><CalendarClock className="w-5 h-5 mt-0.5 shrink-0 text-brand" aria-hidden="true" /> <span>Call or WhatsApp <a href={company.phone.href} className="inline-block py-2 -my-2 font-semibold text-brand underline underline-offset-4">{company.phone.display}</a>, or email <a href={company.email.href} className="inline-block py-2 -my-2 font-semibold text-brand underline underline-offset-4">{company.email.address}</a>, to arrange a meeting.</span></li>
            <li className="flex items-start gap-3"><Globe className="w-5 h-5 mt-0.5 shrink-0 text-brand" aria-hidden="true" /> <span>Website: <a href={`${seo.siteUrl}/`} className="inline-block py-2 -my-2 font-semibold text-brand underline underline-offset-4">ypnova.com</a></span></li>
          </ul>
          <p className="mt-6 text-[14px] text-muted">
            Explore our <Link to="/custom-software-development" className="font-semibold text-brand underline underline-offset-4">custom software development</Link>,{' '}
            <Link to="/custom-erp-development" className="font-semibold text-brand underline underline-offset-4">custom ERP development</Link> and{' '}
            <Link to="/business-process-automation" className="font-semibold text-brand underline underline-offset-4">business process automation</Link> services.
          </p>
        </div>
        <div className="p-6 sm:p-8 md:p-10 grad-soft border-t lg:border-t-0 lg:border-l border-line flex flex-col justify-center gap-4">
          <span className="inline-flex w-12 h-12 rounded-2xl bg-white border border-line text-brand items-center justify-center" aria-hidden="true">
            <MapPin className="w-6 h-6" />
          </span>
          <h3 className="h-card !text-[1.25rem]">Google Maps location</h3>
          <p className="text-[15px] leading-relaxed text-muted">
            For a meeting that has been scheduled with us, use these links for the location and directions. Please contact us first — the location is
            not staffed for walk-in visits.
          </p>
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 [&>a]:whitespace-nowrap">
            <Button href={mapsUrl} target="_blank" rel="noopener noreferrer" variant="primary" data-testid="open-in-maps">
              <ExternalLink className="w-4 h-4" aria-hidden="true" /> Open in Google Maps
            </Button>
            <Button href={directionsUrl} target="_blank" rel="noopener noreferrer" variant="secondary" data-testid="get-directions">
              <Navigation className="w-4 h-4" aria-hidden="true" /> Get directions
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
