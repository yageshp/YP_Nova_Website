import { useReveal } from "../hooks";
import { Factory, HeartPulse, HardHat, Building2, Hop as Home, ShoppingBag, Banknote, UtensilsCrossed, GraduationCap, Landmark, Truck } from "lucide-react";

const INDUSTRIES = [
  { icon: Factory, name: "Manufacturing" },
  { icon: HeartPulse, name: "Healthcare" },
  { icon: HardHat, name: "Construction" },
  { icon: Building2, name: "Facility Management" },
  { icon: Home, name: "Real Estate" },
  { icon: ShoppingBag, name: "Retail" },
  { icon: Banknote, name: "Finance" },
  { icon: UtensilsCrossed, name: "Hospitality" },
  { icon: GraduationCap, name: "Education" },
  { icon: Landmark, name: "Government" },
  { icon: Truck, name: "Logistics" },
];

export default function Industries() {
  const { ref, inView } = useReveal();

  return (
    <section id="industries" className="py-32 lg:py-40 relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div
          ref={ref}
          className={`reveal ${inView ? "in-view" : ""} max-w-3xl mb-16`}
        >
          <span className="text-sm text-[#c8a45e] tracking-widest uppercase font-medium">
            Industries We Serve
          </span>
          <h2 className="mt-4 text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Domain expertise across
            <br />
            <span className="text-[#8a8a8f]">the industries that matter.</span>
          </h2>
          <p className="mt-6 text-lg text-[#8a8a8f] leading-relaxed">
            We don&rsquo;t write generic software. Every engagement starts with
            deep domain research — so the systems we build fit your industry
            like they were designed for it. Because they were.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {INDUSTRIES.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.name}
                className="card-hover group flex items-center gap-4 p-6 rounded-2xl border border-white/8 bg-[#131316]"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center group-hover:bg-[#c8a45e] group-hover:border-[#c8a45e] transition-all duration-500">
                  <Icon
                    size={20}
                    className="text-[#c8a45e] group-hover:text-[#0a0a0b] transition-colors duration-500"
                  />
                </div>
                <span className="font-medium text-[#c4c4c8] group-hover:text-[#f5f3ef] transition-colors">
                  {industry.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
