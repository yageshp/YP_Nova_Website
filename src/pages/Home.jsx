import React from 'react';
import { Button } from '@/components/common/Button';
import { TestimonialSection } from '@/components/sections/TestimonialSection';
import { ServicesOverview } from '@/components/sections/ServicesOverview';
import { FeaturedSolutions } from '@/components/sections/FeaturedSolutions';
import { FeaturedProject } from '@/components/sections/FeaturedProject';
import { IndustriesStrip } from '@/components/sections/IndustriesStrip';
import { WhyUsSection } from '@/components/sections/WhyUsSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { TechStackSection } from '@/components/sections/TechStackSection';
import { TestimonialCarousel } from '@/components/sections/TestimonialCarousel';
import { TrustedBySection } from '@/components/sections/TrustedBySection';
import { PartnerSection } from '@/components/sections/PartnerSection';
import { useSeo } from '@/hooks/useSeo';
import { ServiceLinksBand } from '@/components/sections/ServiceLinksBand';

export default function Home() {
  useSeo({
    title: 'YP Nova | Custom Software, ERP & AI Development Company',
    description:
      'YP Nova develops custom software, ERP applications, AI solutions, business automation and SaaS platforms for growing businesses in India.',
    path: '/',
  });

  return (
    <div data-testid="home-page" className="relative">
      {/* 1 · HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grad-soft pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none [mask-image:radial-gradient(circle_at_50%_35%,black_20%,transparent_70%)]" aria-hidden="true" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[min(640px,120vw)] h-[520px] rounded-full bg-purple/10 blur-3xl pointer-events-none animate-pulse-glow" aria-hidden="true" />
        <div className="absolute top-40 -left-24 w-72 h-72 rounded-full bg-[#BFE9FF]/40 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute top-32 -right-24 w-72 h-72 rounded-full bg-soft/25 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white pointer-events-none" aria-hidden="true" />

        <div className="relative mx-auto max-w-[920px] px-5 sm:px-6 pt-12 sm:pt-16 md:pt-20 pb-12 md:pb-16 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple/20 bg-white/80 backdrop-blur px-3.5 sm:px-4 py-1.5 shadow-[0_4px_20px_rgba(124,58,237,0.1)] animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-purple opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple" />
            </span>
            <span className="font-mono text-[9.5px] xs:text-[10px] sm:text-[11px] font-medium tracking-[0.06em] xs:tracking-[0.1em] sm:tracking-[0.18em] uppercase text-brand text-left">
              Enterprise Software · AI · Business Automation
            </span>
          </div>

          <h1 data-testid="hero-title" className="h-hero mt-6 animate-fade-in-up" style={{ animationDelay: '0.12s' }}>
            Building <span className="font-serif grad-text">Intelligent</span>{' '}
            <span className="font-serif grad-text">Software</span>
            <br className="hidden sm:block" /> for <span className="font-serif grad-text">Modern Enterprises.</span>
          </h1>

          <p className="font-serif !text-[1.6rem] sm:!text-[1.9rem] text-brand mt-5 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Your Imagination. Our Creation.
          </p>

          <p className="lead mt-5 max-w-[620px] animate-fade-in-up" style={{ animationDelay: '0.28s' }}>
            From custom business applications to AI-powered automation, YP Nova helps businesses simplify operations,
            connect workflows and turn ideas into scalable digital solutions.
          </p>

          <div className="w-full sm:w-auto flex flex-col sm:flex-row justify-center gap-3 mt-8 animate-fade-in-up" style={{ animationDelay: '0.36s' }}>
            <Button to="/contact" variant="primary" data-testid="hero-cta-start">Book a Discovery Call</Button>
            <Button to="/case-studies" variant="secondary" data-testid="hero-cta-work">Explore Our Work</Button>
          </div>

          <div className="mt-9 inline-flex items-center gap-2 rounded-full border border-line bg-white/90 pl-3 pr-4 py-1.5 shadow-card animate-fade-in-up" style={{ animationDelay: '0.44s' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden="true" />
            <span className="font-mono text-[11px] text-ink">$ ypnova --build your-idea</span>
          </div>
        </div>
      </section>

      {/* Brand visual: animated (illustrative) operations dashboard */}
      <TestimonialSection />

      {/* 2 · Services overview */}
      <ServicesOverview />
      <ServiceLinksBand />
      {/* 3 · Featured solutions */}
      <FeaturedSolutions />
      {/* 4 · Featured project */}
      <FeaturedProject />
      {/* 5 · Industries */}
      <IndustriesStrip />
      {/* 6 · Why YP Nova */}
      <WhyUsSection />
      {/* 7 · Development process */}
      <ProcessSection />
      {/* 8 · Technology stack */}
      <TechStackSection />
      {/* 9 · Trust: the YP Nova approach (no fabricated testimonials or logos) */}
      <TestimonialCarousel />
      <TrustedBySection />
      {/* 10 · Final CTA */}
      <PartnerSection />
    </div>
  );
}
