import { useState, useEffect } from "react";
import { useReveal } from "../hooks";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "NovaOps rebuilt our entire visitor management infrastructure in 12 weeks. The system now handles 5,000+ daily check-ins across 12 facilities with zero downtime. They didn't just deliver software — they delivered a business outcome.",
    author: "Director of Operations",
    company: "Vertex Industries",
    role: "Manufacturing · 2,000+ employees",
  },
  {
    quote:
      "We engaged NovaOps to build an AI automation platform for document processing. Within three months, they reduced manual review time by 70% and saved us over 1,200 hours per month. The ROI was immediate and measurable.",
    author: "VP of Technology",
    company: "MedCore Systems",
    role: "Healthcare · 500+ employees",
  },
  {
    quote:
      "The NovaOps team treated our work permit system like it was their own product. Every edge case was considered, every compliance requirement met. We went from paper-based permits to a fully digital, auditable workflow in one quarter.",
    author: "Head of Compliance",
    company: "BuildRight Group",
    role: "Construction · 1,500+ employees",
  },
  {
    quote:
      "What sets NovaOps apart is their communication. Weekly demos, transparent roadmaps, and direct access to the engineering team. We always knew exactly where the project stood and what was coming next.",
    author: "Chief Technology Officer",
    company: "EstateOne",
    role: "Real Estate · 800+ employees",
  },
];

export default function Testimonials() {
  const { ref, inView } = useReveal();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((p) => (p + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setActive((p) => (p + 1) % TESTIMONIALS.length);
  const prev = () => setActive((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="py-32 lg:py-40 bg-[#0a0a0b] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c8a45e]/5 blur-[120px]" />

      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div
          ref={ref}
          className={`reveal ${inView ? "in-view" : ""} text-center mb-12`}
        >
          <span className="text-sm text-[#c8a45e] tracking-widest uppercase font-medium">
            Client Testimonials
          </span>
          <h2 className="mt-4 text-4xl lg:text-5xl font-bold tracking-tight">
            What our partners say.
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="w-full shrink-0 px-2">
                  <div className="text-center">
                    <Quote
                      size={40}
                      className="text-[#c8a45e]/40 mx-auto mb-8"
                    />
                    <p className="text-xl lg:text-2xl leading-relaxed text-[#e0e0e4] font-light">
                      {t.quote}
                    </p>
                    <div className="mt-10">
                      <div className="text-lg font-semibold text-[#f5f3ef]">
                        {t.author}
                      </div>
                      <div className="text-sm text-[#c8a45e] mt-1">
                        {t.company}
                      </div>
                      <div className="text-sm text-[#8a8a8f] mt-1">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-[#8a8a8f] hover:text-[#c8a45e] hover:border-[#c8a45e]/30 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    active === i
                      ? "w-8 bg-[#c8a45e]"
                      : "w-2 bg-white/15"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-[#8a8a8f] hover:text-[#c8a45e] hover:border-[#c8a45e]/30 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
