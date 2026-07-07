import { useReveal } from "../hooks";

const STEPS = [
  { num: "01", title: "Discovery", desc: "We immerse ourselves in your business — understanding goals, constraints, and the problem worth solving." },
  { num: "02", title: "Business Analysis", desc: "We map workflows, stakeholders, and data flows to define requirements that align with real operations." },
  { num: "03", title: "UI/UX", desc: "We design interfaces and experiences that your team will actually enjoy using — validated through prototyping." },
  { num: "04", title: "Architecture", desc: "We engineer the system blueprint — scalable, secure, and built to evolve with your business." },
  { num: "05", title: "Development", desc: "We build in iterative sprints with weekly demos, so you see progress and shape direction in real time." },
  { num: "06", title: "Testing", desc: "We run automated and manual QA across edge cases, performance, and security before anything ships." },
  { num: "07", title: "Deployment", desc: "We deploy with zero-downtime pipelines, monitoring, and rollback plans — production-ready from day one." },
  { num: "08", title: "Support", desc: "We stay. Ongoing maintenance, optimizations, and feature evolution keep your system performing." },
];

export default function Process() {
  const { ref, inView } = useReveal();

  return (
    <section className="py-32 lg:py-40 relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div
          ref={ref}
          className={`reveal ${inView ? "in-view" : ""} max-w-3xl mb-20`}
        >
          <span className="text-sm text-[#c8a45e] tracking-widest uppercase font-medium">
            How We Work
          </span>
          <h2 className="mt-4 text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            A process engineered
            <br />
            <span className="text-[#8a8a8f]">for predictable delivery.</span>
          </h2>
          <p className="mt-6 text-lg text-[#8a8a8f] leading-relaxed">
            No black boxes. No surprise invoices. Just a transparent,
            battle-tested process that takes you from idea to production — and
            keeps your system running long after launch.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-7 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          <div className="space-y-12 lg:space-y-0">
            {STEPS.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={step.num}
                  className={`relative flex items-center gap-6 lg:gap-0 ${
                    isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-7 lg:left-1/2 -translate-x-1/2 z-10">
                    <div className="w-4 h-4 rounded-full bg-[#c8a45e] border-4 border-[#0a0a0b] animate-pulse-glow" />
                  </div>

                  {/* Content */}
                  <div className="ml-16 lg:ml-0 lg:w-1/2 lg:px-12">
                    <div
                      className={`card-hover p-8 rounded-2xl border border-white/8 bg-[#131316] ${
                        isLeft ? "lg:text-right" : ""
                      }`}
                    >
                      <div
                        className={`text-5xl font-bold text-[#c8a45e]/20 mb-2 ${
                          isLeft ? "lg:text-right" : ""
                        }`}
                      >
                        {step.num}
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-sm text-[#8a8a8f] leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden lg:block lg:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
