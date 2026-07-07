import { useReveal } from "../hooks";

const TECH_CATEGORIES = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Python", "FastAPI"],
  },
  {
    label: "Database",
    items: ["PostgreSQL", "MongoDB", "Redis"],
  },
  {
    label: "Cloud & DevOps",
    items: ["AWS", "Azure", "Docker", "Kubernetes"],
  },
  {
    label: "AI & ML",
    items: ["OpenAI", "Claude", "Gemini", "LangChain"],
  },
];

const ALL_TECH = TECH_CATEGORIES.flatMap((c) => c.items);

export default function TechStack() {
  const { ref, inView } = useReveal();

  return (
    <section id="solutions" className="py-32 lg:py-40 bg-[#0a0a0b]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div
          ref={ref}
          className={`reveal ${inView ? "in-view" : ""} max-w-3xl mb-16`}
        >
          <span className="text-sm text-[#c8a45e] tracking-widest uppercase font-medium">
            Technology Stack
          </span>
          <h2 className="mt-4 text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Built with the tools
            <br />
            <span className="text-[#8a8a8f]">that power the modern web.</span>
          </h2>
          <p className="mt-6 text-lg text-[#8a8a8f] leading-relaxed">
            We choose technologies based on what solves your problem best — not
            what&rsquo;s trending. Here&rsquo;s the stack we trust in production.
          </p>
        </div>

        {/* Interactive cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {ALL_TECH.map((tech, i) => (
            <div
              key={tech}
              className="card-hover group relative p-6 rounded-2xl border border-white/8 bg-[#131316] overflow-hidden"
              style={{ animationDelay: `${i * 0.03}s` }}
            >
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#c8a45e]/0 group-hover:bg-[#c8a45e]/10 blur-[30px] transition-all duration-500" />
              <div className="relative">
                <div className="text-xs text-[#8a8a8f] mb-2 font-mono">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="text-lg font-semibold text-[#c4c4c8] group-hover:text-[#f5f3ef] transition-colors">
                  {tech}
                </div>
                <div className="mt-3 h-px w-0 group-hover:w-full bg-[#c8a45e] transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Category labels */}
        <div className="mt-12 flex flex-wrap gap-3">
          {TECH_CATEGORIES.map((cat) => (
            <div
              key={cat.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/8 bg-[#131316]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8a45e]" />
              <span className="text-sm text-[#8a8a8f]">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
