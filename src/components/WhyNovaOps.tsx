import { useReveal } from "../hooks";
import {
  ShieldCheck,
  Sparkles,
  Cloud,
  TrendingUp,
  Lock,
  MessageSquare,
  Users,
  HeartHandshake,
} from "lucide-react";

const REASONS = [
  { icon: ShieldCheck, title: "Enterprise Ready", desc: "SOC 2-aligned practices, audit trails, role-based access, and compliance built in from day one." },
  { icon: Sparkles, title: "AI First", desc: "We design systems with AI at the core — not bolted on. Every workflow is an automation candidate." },
  { icon: Cloud, title: "Cloud Native", desc: "Containerized, scalable, and deployed on modern cloud infrastructure that grows with you." },
  { icon: TrendingUp, title: "Scalable Systems", desc: "Architectures designed to handle 10x growth without rewrites — because your success shouldn't break your software." },
  { icon: Lock, title: "Secure Development", desc: "Security integrated into every sprint — threat modeling, code review, and penetration testing as standard practice." },
  { icon: MessageSquare, title: "Transparent Communication", desc: "Weekly demos, shared roadmaps, and direct access to engineers. You always know what's happening." },
  { icon: Users, title: "Dedicated Team", desc: "A senior team assigned to your project — not rotated between clients. Continuity matters." },
  { icon: HeartHandshake, title: "Long-Term Support", desc: "We don't disappear after launch. Ongoing maintenance, optimization, and evolution are part of the partnership." },
];

export default function WhyNovaOps() {
  const { ref, inView } = useReveal();

  return (
    <section className="py-32 lg:py-40 bg-[#0a0a0b]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div
          ref={ref}
          className={`reveal ${inView ? "in-view" : ""} max-w-3xl mb-16`}
        >
          <span className="text-sm text-[#c8a45e] tracking-widest uppercase font-medium">
            Why NovaOps
          </span>
          <h2 className="mt-4 text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Eight reasons enterprises
            <br />
            <span className="text-[#8a8a8f]">choose to build with us.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {REASONS.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="card-hover group p-8 rounded-2xl border border-white/8 bg-[#131316] relative overflow-hidden"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#c8a45e]/0 group-hover:bg-[#c8a45e]/5 blur-[30px] transition-all duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mb-5 group-hover:bg-[#c8a45e] group-hover:border-[#c8a45e] transition-all duration-500">
                    <Icon
                      size={22}
                      className="text-[#c8a45e] group-hover:text-[#0a0a0b] transition-colors duration-500"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
                  <p className="text-sm text-[#8a8a8f] leading-relaxed">
                    {reason.desc}
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
