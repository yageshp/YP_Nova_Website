import { useState } from "react";
import { useReveal } from "../hooks";
import { ArrowUpRight, Layers, CircleAlert as AlertCircle, TrendingUp } from "lucide-react";

const PROJECTS = [
  {
    name: "Visitor Management System",
    short: "Touchless check-in and real-time visitor tracking for enterprise facilities.",
    problem:
      "Manual visitor logs created security gaps, long queues, and zero visibility into who was on-site at any given time.",
    stack: ["React", "Node.js", "PostgreSQL", "AWS", "Redis"],
    impact: "Reduced check-in time by 80% and enabled real-time visitor analytics across 12 facilities.",
    preview: "dashboard",
  },
  {
    name: "Management Information System",
    short: "Centralized reporting and decision-support platform for executive teams.",
    problem:
      "Fragmented data across departments meant leadership spent days compiling reports instead of making decisions.",
    stack: ["Next.js", "Python", "FastAPI", "PostgreSQL", "Docker"],
    impact: "Cut report generation from 3 days to 15 minutes, giving executives real-time KPIs.",
    preview: "analytics",
  },
  {
    name: "Work Permit System",
    short: "Digital permit-to-work workflow with risk assessment and approval chains.",
    problem:
      "Paper-based permits caused delays, lost records, and compliance risks in high-stakes industrial environments.",
    stack: ["React", "Node.js", "MongoDB", "Azure", "Kubernetes"],
    impact: "Eliminated paper permits entirely and reduced permit approval time by 65%.",
    preview: "workflow",
  },
  {
    name: "Complaint Management System",
    short: "Omnichannel complaint intake with SLA tracking and auto-routing.",
    problem:
      "Complaints scattered across email, phone, and in-person visits with no tracking or accountability.",
    stack: ["Next.js", "Python", "PostgreSQL", "AWS", "LangChain"],
    impact: "Achieved 94% first-response within SLA and 3x faster resolution times.",
    preview: "tickets",
  },
  {
    name: "Facility Management ERP",
    short: "Unified ERP for maintenance, assets, vendors, and workforce scheduling.",
    problem:
      "Disjointed spreadsheets for maintenance, vendors, and assets led to missed service and budget overruns.",
    stack: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
    impact: "Reduced maintenance costs by 30% and improved asset uptime to 98%.",
    preview: "erp",
  },
  {
    name: "AI Automation Platform",
    short: "LLM-powered automation engine for document processing and decision support.",
    problem:
      "Teams spent 60% of their time on repetitive document review, classification, and data entry tasks.",
    stack: ["Python", "FastAPI", "OpenAI", "LangChain", "PostgreSQL"],
    impact: "Automated 70% of document workflows, saving 1,200+ hours per month.",
    preview: "ai",
  },
];

function AnimatedPreview({ type }: { type: string }) {
  const [active, setActive] = useState(0);

  // Auto-cycle preview states
  if (typeof window !== "undefined") {
    setTimeout(() => setActive((p) => (p + 1) % 3), 3000);
  }

  const bars = [40, 65, 45, 80, 55, 90, 70];

  return (
    <div className="relative h-48 rounded-xl bg-[#0a0a0b] border border-white/8 overflow-hidden">
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,164,94,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(200,164,94,0.3) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="relative p-4 h-full flex flex-col">
        {/* Window dots */}
        <div className="flex gap-1.5 mb-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>

        {type === "dashboard" && (
          <div className="flex-1 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`rounded-lg border border-white/8 p-2 transition-all duration-500 ${
                  active === i ? "bg-[#c8a45e]/10 border-[#c8a45e]/30" : "bg-white/5"
                }`}
              >
                <div className="h-1.5 w-8 bg-white/20 rounded mb-1" />
                <div className="h-3 w-12 bg-[#c8a45e]/40 rounded" />
              </div>
            ))}
          </div>
        )}

        {type === "analytics" && (
          <div className="flex-1 flex items-end gap-1.5">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-[#c8a45e]/20 to-[#c8a45e]/60 transition-all duration-700"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        )}

        {type === "workflow" && (
          <div className="flex-1 flex items-center justify-around">
            {["Draft", "Review", "Approve", "Issue"].map((step, i) => (
              <div key={step} className="flex flex-col items-center gap-1">
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs transition-all duration-500 ${
                    active >= i
                      ? "border-[#c8a45e] bg-[#c8a45e]/20 text-[#c8a45e]"
                      : "border-white/10 text-[#8a8a8f]"
                  }`}
                >
                  {i + 1}
                </div>
                <span className="text-[8px] text-[#8a8a8f]">{step}</span>
              </div>
            ))}
          </div>
        )}

        {type === "tickets" && (
          <div className="flex-1 space-y-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`flex items-center gap-2 rounded-lg border p-1.5 transition-all duration-500 ${
                  active === i ? "border-[#c8a45e]/30 bg-[#c8a45e]/5" : "border-white/8 bg-white/5"
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#c8a45e]" />
                <div className="h-1.5 flex-1 bg-white/10 rounded" />
                <div className="h-1.5 w-8 bg-white/20 rounded" />
              </div>
            ))}
          </div>
        )}

        {type === "erp" && (
          <div className="flex-1 grid grid-cols-4 gap-1.5">
            {["Inv", "Maint", "Vendor", "HR"].map((label, i) => (
              <div
                key={label}
                className={`rounded-lg border p-1.5 flex flex-col justify-center items-center transition-all duration-500 ${
                  active === i ? "bg-[#c8a45e]/10 border-[#c8a45e]/30" : "border-white/8 bg-white/5"
                }`}
              >
                <div className="text-[8px] text-[#c4c4c8]">{label}</div>
                <div className="text-xs font-bold text-[#c8a45e] mt-0.5">
                  {Math.floor(Math.random() * 90 + 10)}
                </div>
              </div>
            ))}
          </div>
        )}

        {type === "ai" && (
          <div className="flex-1 flex flex-col justify-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#c8a45e]/20 border border-[#c8a45e]/40 flex items-center justify-center text-[8px] text-[#c8a45e]">
                AI
              </div>
              <div className="h-1.5 flex-1 bg-white/10 rounded" />
            </div>
            {[0, 1].map((i) => (
              <div
                key={i}
                className="h-1.5 rounded bg-[#c8a45e]/30 transition-all duration-700"
                style={{ width: `${60 + active * 15}%` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const { ref, inView } = useReveal();

  return (
    <section id="case-studies" className="py-32 lg:py-40 bg-[#0a0a0b]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div
          ref={ref}
          className={`reveal ${inView ? "in-view" : ""} flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-20`}
        >
          <div className="max-w-2xl">
            <span className="text-sm text-[#c8a45e] tracking-widest uppercase font-medium">
              Featured Case Studies
            </span>
            <h2 className="mt-4 text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              Real systems.
              <br />
              <span className="text-[#8a8a8f]">Real business impact.</span>
            </h2>
          </div>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#c8a45e] hover:text-[#d4b876] transition-colors"
          >
            Start your project
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <div
              key={project.name}
              className="card-hover group rounded-3xl border border-white/8 bg-[#131316] overflow-hidden"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {/* Preview */}
              <div className="p-6 pb-0">
                <AnimatedPreview type={project.preview} />
              </div>

              {/* Content */}
              <div className="p-6 pt-5">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[#c8a45e] transition-colors duration-300">
                  {project.name}
                </h3>
                <p className="text-sm text-[#8a8a8f] leading-relaxed mb-5">
                  {project.short}
                </p>

                {/* Problem */}
                <div className="flex gap-3 mb-4">
                  <AlertCircle
                    size={16}
                    className="shrink-0 text-red-400/60 mt-0.5"
                  />
                  <div>
                    <div className="text-xs font-semibold text-[#c4c4c8] mb-1">
                      Business Problem
                    </div>
                    <p className="text-xs text-[#8a8a8f] leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                </div>

                {/* Stack */}
                <div className="flex gap-3 mb-4">
                  <Layers
                    size={16}
                    className="shrink-0 text-[#c8a45e] mt-0.5"
                  />
                  <div>
                    <div className="text-xs font-semibold text-[#c4c4c8] mb-1.5">
                      Technology Stack
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/8 text-[10px] text-[#c4c4c8]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Impact */}
                <div className="flex gap-3">
                  <TrendingUp
                    size={16}
                    className="shrink-0 text-green-400/70 mt-0.5"
                  />
                  <div>
                    <div className="text-xs font-semibold text-[#c4c4c8] mb-1">
                      Business Impact
                    </div>
                    <p className="text-xs text-[#8a8a8f] leading-relaxed">
                      {project.impact}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
