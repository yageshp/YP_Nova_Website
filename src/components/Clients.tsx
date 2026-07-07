import { useReveal } from "../hooks";
import { ArrowUpRight } from "lucide-react";

const CLIENT_CATEGORIES = [
  "Manufacturing",
  "Healthcare",
  "Construction",
  "Real Estate",
  "Facility Management",
  "Technology",
  "Retail",
  "Hospitality",
];

// Generate placeholder client logos as styled text blocks
const CLIENTS_ROW_1 = [
  "Vertex Industries",
  "MedCore Systems",
  "BuildRight Group",
  "EstateOne",
  "Facilio Partners",
  "TechNova Labs",
  "RetailGrid",
  "StayLux Hotels",
];

const CLIENTS_ROW_2 = [
  "Your Logo Could Be Here",
  "Your Logo Could Be Here",
  "Your Logo Could Be Here",
  "Your Logo Could Be Here",
];

function ClientLogo({ name, placeholder = false }: { name: string; placeholder?: boolean; key?: string | number }) {
  return (
    <div
      className={`group flex items-center justify-center px-8 py-6 rounded-2xl border transition-all duration-500 ${
        placeholder
          ? "border-dashed border-white/10 bg-transparent"
          : "border-white/8 bg-[#131316] hover:border-[#c8a45e]/30 hover:bg-[#18181c]"
      }`}
    >
      <span
        className={`text-lg font-bold tracking-tight transition-all duration-500 ${
          placeholder
            ? "text-[#3a3a3e] group-hover:text-[#8a8a8f]"
            : "text-[#4a4a4e] grayscale group-hover:grayscale-0 group-hover:text-[#c8a45e]"
        }`}
      >
        {name}
      </span>
    </div>
  );
}

export default function Clients() {
  const { ref, inView } = useReveal();

  return (
    <section className="py-32 lg:py-40 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-[#c8a45e]/5 blur-[120px]" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div
          ref={ref}
          className={`reveal ${inView ? "in-view" : ""} text-center max-w-3xl mx-auto mb-16`}
        >
          <span className="text-sm text-[#c8a45e] tracking-widest uppercase font-medium">
            Our Clients
          </span>
          <h2 className="mt-4 text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Trusted by Businesses
            <br />
            <span className="gradient-text italic">Worldwide</span>
          </h2>
          <p className="mt-6 text-lg text-[#8a8a8f] leading-relaxed">
            We build long-term partnerships with startups, SMEs and enterprise
            organizations — delivering systems that grow with them.
          </p>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CLIENT_CATEGORIES.map((cat) => (
            <span
              key={cat}
              className="px-4 py-2 rounded-full border border-white/8 bg-[#131316] text-sm text-[#8a8a8f] hover:text-[#c8a45e] hover:border-[#c8a45e]/30 transition-colors duration-300"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Logo wall row 1 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
          {CLIENTS_ROW_1.map((name) => (
            <ClientLogo key={name} name={name} />
          ))}
        </div>

        {/* Logo wall row 2 - "Your Logo Could Be Here" */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
          {CLIENTS_ROW_2.map((name, i) => (
            <ClientLogo key={i} name={name} placeholder />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl lg:text-3xl font-bold mb-6">
            Let&rsquo;s Build Together
          </h3>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#c8a45e] text-[#0a0a0b] font-semibold hover:bg-[#d4b876] transition-all duration-300 animate-pulse-glow"
          >
            Schedule a Discovery Call
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
