import { useReveal } from "../hooks";

export default function Quote() {
  const { ref, inView } = useReveal();

  return (
    <section className="py-32 lg:py-48 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#c8a45e]/5 blur-[150px]" />

      <div
        ref={ref}
        className={`relative max-w-5xl mx-auto px-6 lg:px-10 text-center reveal ${
          inView ? "in-view" : ""
        }`}
      >
        <div className="text-6xl text-[#c8a45e] font-serif leading-none mb-8">
          &ldquo;
        </div>
        <h2 className="text-3xl lg:text-5xl font-bold leading-[1.2] tracking-tight">
          We don&rsquo;t just build software.
          <br />
          <span className="gradient-text italic">
            We engineer digital systems that help businesses grow.
          </span>
        </h2>

        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="w-12 h-px bg-[#c8a45e]" />
          <span className="text-sm tracking-widest uppercase text-[#8a8a8f]">
            NovaOps
          </span>
          <div className="w-12 h-px bg-[#c8a45e]" />
        </div>

        {/* Pillars */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
          {[
            "Enterprise AI",
            "Cloud Engineering",
            "Digital Transformation",
            "Automation",
          ].map((pillar) => (
            <span
              key={pillar}
              className="px-5 py-2 rounded-full border border-white/10 text-sm text-[#c4c4c8] hover:border-[#c8a45e]/40 hover:text-[#c8a45e] transition-colors duration-300"
            >
              {pillar}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
