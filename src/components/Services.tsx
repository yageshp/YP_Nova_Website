import { useReveal } from "../hooks";
import { Brain, Bot, Code as Code2, Building2, Users, Globe, Cloud, GitBranch, Workflow, ChartBar as BarChart3, PenTool, Lightbulb } from "lucide-react";

const SERVICES = [
  {
    icon: Brain,
    title: "Enterprise AI",
    desc: "Production-grade AI systems — RAG pipelines, LLM fine-tuning, and intelligent document processing built for scale and compliance.",
  },
  {
    icon: Bot,
    title: "Generative AI",
    desc: "Custom GPT integrations, content generation engines, and conversational AI tailored to your domain and brand voice.",
  },
  {
    icon: Bot,
    title: "AI Agents",
    desc: "Autonomous agents that orchestrate multi-step workflows, integrate with your tools, and execute decisions with guardrails.",
  },
  {
    icon: Code2,
    title: "Custom Software",
    desc: "Bespoke platforms engineered around your exact business logic — from internal tools to customer-facing products.",
  },
  {
    icon: Building2,
    title: "Enterprise SaaS",
    desc: "Multi-tenant SaaS architectures with role-based access, billing, audit trails, and enterprise-grade security.",
  },
  {
    icon: Building2,
    title: "ERP",
    desc: "Unified ERP systems connecting finance, inventory, HR, and operations into a single source of truth.",
  },
  {
    icon: Users,
    title: "CRM",
    desc: "Customer relationship platforms with pipeline automation, segmentation, and deep analytics for revenue teams.",
  },
  {
    icon: Globe,
    title: "Web Development",
    desc: "High-performance web applications with modern frameworks, SSR, and pixel-perfect design systems.",
  },
  {
    icon: Globe,
    title: "Mobile Apps",
    desc: "Native and cross-platform mobile applications for iOS and Android with offline-first architecture.",
  },
  {
    icon: Cloud,
    title: "Cloud Engineering",
    desc: "Cloud architecture, migration, and optimization across AWS, Azure, and GCP — built for cost and scale.",
  },
  {
    icon: GitBranch,
    title: "DevOps",
    desc: "CI/CD pipelines, infrastructure as code, container orchestration, and observability for reliable delivery.",
  },
  {
    icon: Workflow,
    title: "Automation",
    desc: "Workflow automation that eliminates manual processes — from approvals to data sync to reporting.",
  },
  {
    icon: BarChart3,
    title: "Business Intelligence",
    desc: "Data warehouses, ETL pipelines, and interactive dashboards that turn raw data into decisions.",
  },
  {
    icon: PenTool,
    title: "UI/UX",
    desc: "Research-driven design systems, prototyping, and user testing for products people love to use.",
  },
  {
    icon: Lightbulb,
    title: "IT Consulting",
    desc: "Technology strategy, architecture reviews, and digital transformation roadmaps from senior engineers.",
  },
];

export default function Services() {
  const { ref, inView } = useReveal();

  return (
    <section id="services" className="py-32 lg:py-40 relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div
          ref={ref}
          className={`reveal ${inView ? "in-view" : ""} max-w-3xl mb-20`}
        >
          <span className="text-sm text-[#c8a45e] tracking-widest uppercase font-medium">
            What We Do
          </span>
          <h2 className="mt-4 text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Full-stack engineering for
            <br />
            <span className="text-[#8a8a8f]">every layer of your business.</span>
          </h2>
          <p className="mt-6 text-lg text-[#8a8a8f] leading-relaxed">
            From AI agents to enterprise ERP, we build the systems that power
            modern operations — designed, engineered, and maintained by a team
            that treats your roadmap as our own.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="card-hover group p-8 rounded-2xl border border-white/8 bg-[#131316] relative overflow-hidden"
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#c8a45e]/0 group-hover:bg-[#c8a45e]/5 blur-[40px] transition-all duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mb-6 group-hover:bg-[#c8a45e] group-hover:border-[#c8a45e] transition-all duration-500">
                    <Icon
                      size={22}
                      className="text-[#c8a45e] group-hover:text-[#0a0a0b] transition-colors duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-sm text-[#8a8a8f] leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
