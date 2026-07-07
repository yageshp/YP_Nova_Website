import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background gradient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#c8a45e]/8 blur-[120px] animate-float"
        style={{
          transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`,
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[100px]"
        style={{
          transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px)`,
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-[#8a8a8f] tracking-wide">
              Enterprise AI · Cloud Engineering · Custom Software
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-bold leading-[1.05] tracking-tight fade-up"
            style={{
              fontSize: "clamp(2.75rem, 7vw, 6rem)",
              animationDelay: "0.2s",
            }}
          >
            Building Intelligent
            <br />
            Software for{" "}
            <span className="gradient-text italic">Modern Enterprises.</span>
          </h1>

          {/* Subheadline */}
          <p
            className="mt-8 text-lg lg:text-xl text-[#8a8a8f] max-w-2xl leading-relaxed fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            NovaOps helps businesses automate, scale and transform using AI,
            Cloud and Enterprise Software — engineered systems that deliver
            measurable outcomes, not just features.
          </p>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-col sm:flex-row gap-4 fade-up"
            style={{ animationDelay: "0.6s" }}
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#c8a45e] text-[#0a0a0b] font-semibold hover:bg-[#d4b876] transition-all duration-300 animate-pulse-glow"
            >
              Book Free Consultation
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
            <a
              href="#case-studies"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 text-[#f5f3ef] font-semibold hover:bg-white/5 hover:border-white/30 transition-all duration-300"
            >
              View Case Studies
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>

          {/* Stats */}
          <div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 fade-up"
            style={{ animationDelay: "0.8s" }}
          >
            {[
              { value: "120+", label: "Enterprise Projects" },
              { value: "40+", label: "Industries Served" },
              { value: "8", label: "Years of Engineering" },
              { value: "99.9%", label: "Uptime SLA" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl lg:text-4xl font-bold text-[#f5f3ef]">
                  {stat.value}
                </div>
                <div className="text-sm text-[#8a8a8f] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8a8a8f]">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}
