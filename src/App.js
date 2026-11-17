import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { TopNav } from '@/components/layout/TopNav';
import { Footer, CopyrightBar } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { CustomCursor } from '@/components/animations/CustomCursor';

import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Solutions from '@/pages/Solutions';
import CaseStudies from '@/pages/CaseStudies';
import CaseStudyDetail from '@/pages/CaseStudyDetail';
import Industries from '@/pages/Industries';
import IndustryDetail from '@/pages/IndustryDetail';
import Insights from '@/pages/Insights';
import InsightDetail from '@/pages/InsightDetail';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import { Privacy, Terms } from '@/pages/Legal';
import NotFound from '@/pages/NotFound';
import ServiceLanding from '@/pages/ServiceLanding';
import SolutionPage from '@/pages/SolutionPage';
import { featuredProject } from '@/data/caseStudies';
import { servicePages } from '@/data/servicePages';
import { setBootFromHtml } from '@/utils/boot';
import { trackPageView } from '@/services/analytics';

/** Scrolls to top on navigation, or to the #anchor when the URL has one. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
    } else {
      setBootFromHtml(false); // later pages animate in as normal
      requestAnimationFrame(() => trackPageView(pathname));
    }
  }, [pathname]);
  useEffect(() => {
    if (hash) {
      // wait a frame so the target page has rendered
      const id = requestAnimationFrame(() => {
        const el = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (el) el.scrollIntoView({ block: 'start' });
        else window.scrollTo(0, 0);
      });
      return () => cancelAnimationFrame(id);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <div className="App min-h-screen bg-white flex flex-col">
      <BrowserRouter>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <CustomCursor />
        <ScrollManager />
        <TopNav />
        <main id="main-content" data-testid="main-content" tabIndex={-1} className="flex-1 outline-none">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/solutions/:slug" element={<SolutionPage />} />
            {servicePages.map((p) => (
              <Route key={p.slug} path={`/${p.slug}`} element={<ServiceLanding slug={p.slug} />} />
            ))}
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path={`/case-studies/${featuredProject.slug}`} element={<CaseStudyDetail />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/industries/:slug" element={<IndustryDetail />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<InsightDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <CopyrightBar />
        <BottomNav />
        <WhatsAppFloat />
      </BrowserRouter>
    </div>
  );
}
