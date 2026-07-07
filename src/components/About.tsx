import { useReveal } from "../hooks";
import { Target, Eye, Gem, Users, Award, Globe as Globe2 } from "lucide-react";

const VALUES = [
  { title: "Engineering Excellence", desc: "We hold ourselves to a higher standard. Code is reviewed, tested, and documented — always." },
  { title: "Outcome Over Output", desc: "We measure success by business impact, not lines of code or hours billed." },
  { title: "Radical Transparency", desc: "Honest timelines, honest estimates, honest communication — even when it's hard." },
  { title: "Long-Term Thinking", desc: "We build systems designed to last years, not sprints. Your future self will thank you." },
];

const LEADERSHIP = [
  { name: "Arjun Mehta", role: "Founder & CEO", focus: "Strategy · Enterprise Architecture" },
  { name: "Sara Chen", role: "VP of Engineering", focus: "Cloud · DevOps · Scalability" },
  { name: "David Okonkwo", role: "Head of AI", focus: "LLM Systems · AI Agents · RAG" },
  { name: "Lena Petrova", role: "Head of Design", focus: "Product Design · Design Systems" },
];

export default function About() {
  const { ref, inView } = useReveal();

  return (
    <section id="about" className="py-32 lg:py-40 bg-[#0a0a0b]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div
          ref={ref}
          className={`reveal ${inView ? "in-view" : ""} max-w-3xl mb-20`}
        >
          <span className="text-sm text-[#c8a45e] tracking-widest uppercase font-medium">
            About NovaOps
          </span>
          <h2 className="mt-4 text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            We are engineers who
            <br />
            <span className="text-[#8a8a8f]">happen to build businesses.</span>
          </h2>
          <p className="mt-6 text-lg text-[#8a8a8f] leading-relaxed">
            NovaOps was founded by a team of senior engineers who were tired of
            watching enterprises pay for software that didn&rsquo;t solve real
            problems. We build differently — with domain depth, engineering
            rigor, and a partnership model that keeps us accountable long after
            launch.
          </p>
        </div>

        {/* Mission / Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
          <div className="card-hover p-10 rounded-3xl border border-white/8 bg-[#131316]">
            <div className="w-14 h-14 rounded-2xl bg-[#c8a45e]/10 border border-[#c8a45e]/20 flex items-center justify-center mb-6">
              <Target size={26} className="text-[#c8a45e]" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-[#8a8a8f] leading-relaxed">
              To engineer software systems that create measurable competitive
              advantage for our clients — combining AI, cloud, and deep
              engineering expertise to solve problems that off-the-shelf
              software cannot.
            </p>
          </div>
          <div className="card-hover p-10 rounded-3xl border border-white/8 bg-[#131316]">
            <div className="w-14 h-14 rounded-2xl bg-[#c8a45e]/10 border border-[#c8a45e]/20 flex items-center justify-center mb-6">
              <Eye size={26} className="text-[#c8a45e]" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-[#8a8a8f] leading-relaxed">
              A world where every enterprise — regardless of size — has access
              to world-class engineering talent and AI capabilities. We&rsquo;re
              making that real, one system at a time.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <Gem size={22} className="text-[#c8a45e]" />
            <h3 className="text-2xl font-bold">Our Values</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {VALUES.map((value, i) => (
              <div
                key={value.title}
                className="card-hover p-8 rounded-2xl border border-white/8 bg-[#131316]"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <h4 className="text-lg font-semibold mb-3">{value.title}</h4>
                <p className="text-sm text-[#8a8a8f] leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <Users size={22} className="text-[#c8a45e]" />
            <h3 className="text-2xl font-bold">Leadership</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {LEADERSHIP.map((person, i) => (
              <div
                key={person.name}
                className="card-hover group p-8 rounded-2xl border border-white/8 bg-[#131316] text-center"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#c8a45e]/20 to-[#c8a45e]/5 border border-white/10 mx-auto mb-5 flex items-center justify-center text-2xl font-bold text-[#c8a45e]">
                  {person.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h4 className="text-lg font-semibold">{person.name}</h4>
                <p className="text-sm text-[#c8a45e] mt-1">{person.role}</p>
                <p className="text-xs text-[#8a8a8f] mt-2">{person.focus}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why NovaOps + Global Delivery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card-hover p-10 rounded-3xl border border-white/8 bg-[#131316]">
            <div className="flex items-center gap-3 mb-6">
              <Award size={24} className="text-[#c8a45e]" />
              <h3 className="text-2xl font-bold">Why NovaOps</h3>
            </div>
            <ul className="space-y-3">
              {[
                "Senior engineers on every project — no juniors learning on your dime",
                "Fixed-scope or dedicated team models — your choice",
                "Weekly demos and shared roadmaps — full visibility",
                "Post-launch support and evolution — we don't disappear",
                "AI-first approach to every system we build",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-[#8a8a8f]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8a45e] mt-2.5 shrink-0" />
                  <span className="text-sm leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-hover p-10 rounded-3xl border border-white/8 bg-[#131316]">
            <div className="flex items-center gap-3 mb-6">
              <Globe2 size={24} className="text-[#c8a45e]" />
              <h3 className="text-2xl font-bold">Global Delivery</h3>
            </div>
            <p className="text-[#8a8a8f] leading-relaxed mb-6">
              Our distributed delivery model combines onshore client
              engagement with offshore engineering — giving you the best of
              both worlds: real-time collaboration with senior architects, and
              round-the-clock engineering velocity.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "3", label: "Delivery Hubs" },
                { value: "24/7", label: "Engineering Coverage" },
                { value: "40+", label: "Countries Served" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-[#f5f3ef]">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#8a8a8f] mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
