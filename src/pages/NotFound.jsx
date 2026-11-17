import React from 'react';
import { Button } from '@/components/common/Button';
import { container } from '@/components/common/PageShell';
import { useSeo } from '@/hooks/useSeo';

export default function NotFound() {
  useSeo({ title: 'Page not found', description: 'The page you are looking for could not be found.', noindex: true });
  return (
    <section data-testid="not-found-page" className="grad-soft border-b border-line">
      <div className={`${container} py-24 md:py-32 text-center flex flex-col items-center`}>
        <p className="eyebrow mb-4">Error 404</p>
        <h1 className="h-page">This page could not be <span className="font-serif grad-text">found.</span></h1>
        <p className="lead mt-5 max-w-md">The link may be out of date, or the page may have moved.</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button to="/" variant="primary">Back to home</Button>
          <Button to="/contact" variant="secondary">Contact us</Button>
        </div>
      </div>
    </section>
  );
}
