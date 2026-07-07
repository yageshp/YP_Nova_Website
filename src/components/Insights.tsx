import { useReveal } from "../hooks";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";

const ARTICLES = [
  {
    category: "AI",
    title: "How RAG Pipelines Are Reshaping Enterprise Knowledge Management",
    excerpt:
      "Retrieval-augmented generation is moving from experiment to production. Here's how enterprises are deploying RAG to unlock internal knowledge at scale.",
    date: "Jul 2026",
    readTime: "8 min read",
  },
  {
    category: "Automation",
    title: "From Manual to Autonomous: Building AI Agents That Actually Work",
    excerpt:
      "Most AI agent demos fail in production. We break down the architecture patterns that make autonomous agents reliable in real business environments.",
    date: "Jun 2026",
    readTime: "12 min read",
  },
  {
    category: "Cloud",
    title: "Cloud Cost Optimization: A Practical Guide for Engineering Teams",
    excerpt:
      "Cloud bills grow silently. This guide walks through the infrastructure, architecture, and monitoring decisions that keep cloud spend predictable.",
    date: "Jun 2026",
    readTime: "10 min read",
  },
  {
    category: "Engineering",
    title: "Why We Default to TypeScript, PostgreSQL, and Docker for New Projects",
    excerpt:
      "Technology choices made early compound over time. We explain the stack we reach for first — and the reasoning behind each decision.",
    date: "May 2026",
    readTime: "7 min read",
  },
  {
    category: "Case Studies",
    title: "Inside the Build: A Facility Management ERP for 12 Sites",
    excerpt:
      "A deep dive into the architecture, challenges, and decisions behind a multi-site facility management ERP that reduced maintenance costs by 30%.",
    date: "May 2026",
    readTime: "15 min read",
  },
  {
    category: "News",
    title: "NovaOps Expands AI Engineering Practice with New LangChain Capabilities",
    excerpt:
      "Our AI engineering team is now building production-grade LLM applications with advanced orchestration, memory, and tool integration capabilities.",
    date: "Apr 2026",
    readTime: "4 min read",
  },
];

const CATEGORIES = [
  "All",
  "Blog",
  "AI",
  "Automation",
  "Cloud",
  "Engineering",
  "Case Studies",
  "News",
];

export default function Insights() {
  const { ref, inView } = useReveal();

  return (
    <section id="insights" className="py-32 lg:py-40 relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div
          ref={ref}
          className={`reveal ${inView ? "in-view" : ""} flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12`}
        >
          <div className="max-w-2xl">
            <span className="text-sm text-[#c8a45e] tracking-widest uppercase font-medium">
              Insights
            </span>
            <h2 className="mt-4 text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              Thinking from
              <br />
              <span className="text-[#8a8a8f]">our engineering bench.</span>
            </h2>
          </div>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#c8a45e] hover:text-[#d4b876] transition-colors"
          >
            View all insights
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm transition-colors duration-300 ${
                i === 0
                  ? "bg-[#c8a45e] text-[#0a0a0b] font-semibold"
                  : "border border-white/8 bg-[#131316] text-[#8a8a8f] hover:text-[#f5f3ef] hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((article, i) => (
            <article
              key={article.title}
              className="card-hover group rounded-2xl border border-white/8 bg-[#131316] overflow-hidden cursor-pointer"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {/* Visual header */}
              <div className="h-44 relative overflow-hidden bg-gradient-to-br from-[#18181c] to-[#0a0a0b]">
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(200,164,94,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(200,164,94,0.5) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#c8a45e]/20 border border-[#c8a45e]/30 text-xs font-medium text-[#c8a45e]">
                  {article.category}
                </div>
                <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#c8a45e] group-hover:border-[#c8a45e] transition-all duration-500">
                  <ArrowUpRight
                    size={16}
                    className="text-[#c8a45e] group-hover:text-[#0a0a0b] transition-colors"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold leading-snug mb-3 group-hover:text-[#c8a45e] transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="text-sm text-[#8a8a8f] leading-relaxed mb-5">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-[#8a8a8f]">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} />
                    {article.readTime}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
