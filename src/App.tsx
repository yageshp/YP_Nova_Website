import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Quote from "./components/Quote";
import Services from "./components/Services";
import CaseStudies from "./components/CaseStudies";
import Industries from "./components/Industries";
import TechStack from "./components/TechStack";
import Process from "./components/Process";
import WhyNovaOps from "./components/WhyNovaOps";
import Clients from "./components/Clients";
import Testimonials from "./components/Testimonials";
import Insights from "./components/Insights";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingNav from "./components/FloatingNav";

export default function App() {
  return (
    <>
      <div className="noise-overlay" />
      <Navigation />
      <main>
        <Hero />
        <Marquee />
        <Quote />
        <Services />
        <CaseStudies />
        <Industries />
        <TechStack />
        <Process />
        <WhyNovaOps />
        <Clients />
        <Testimonials />
        <Insights />
        <About />
        <Contact />
      </main>
      <Footer />
      <FloatingNav />
    </>
  );
}
