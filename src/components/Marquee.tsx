const MARQUEE_ITEMS = [
  "Enterprise Dashboard",
  "AI Agent",
  "ERP",
  "Visitor Management",
  "Work Permit",
  "Facility Management",
  "CRM",
  "HRMS",
  "Analytics",
  "Cloud Infrastructure",
  "Business Intelligence",
  "Automation",
];

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden marquee-pause">
      <div
        className={`flex shrink-0 gap-4 pr-4 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/8 bg-[#18181c] whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-[#c8a45e]" />
            <span className="text-sm font-medium text-[#c4c4c8]">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="py-16 border-y border-white/5 bg-[#0a0a0b]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-8">
        <p className="text-sm text-[#8a8a8f] tracking-widest uppercase">
          Systems We Engineer
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>
    </section>
  );
}
