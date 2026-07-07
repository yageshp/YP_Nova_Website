import { Linkedin, Github, ArrowUp } from "lucide-react";

const FOOTER_LINKS = {
  Solutions: ["Enterprise AI", "Cloud Engineering", "Custom Software", "Automation", "Business Intelligence"],
  Services: ["Web Development", "Mobile Apps", "DevOps", "UI/UX Design", "IT Consulting"],
  Company: ["Case Studies", "Industries", "Insights", "About", "Contact"],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0b] pt-20 pb-32 lg:pb-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Top */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#c8a45e] to-[#8a6d3a] flex items-center justify-center font-bold text-[#0a0a0b] text-lg">
                N
              </div>
              <span className="font-bold text-xl tracking-tight">
                Nova<span className="text-[#c8a45e]">Ops</span>
              </span>
            </a>
            <p className="text-sm text-[#8a8a8f] leading-relaxed max-w-sm mb-6">
              Building intelligent software for modern enterprises. We engineer
              AI, cloud, and custom systems that create measurable competitive
              advantage.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-[#8a8a8f] hover:text-[#c8a45e] hover:border-[#c8a45e]/30 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-[#8a8a8f] hover:text-[#c8a45e] hover:border-[#c8a45e]/30 transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold text-[#f5f3ef] mb-4">
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#8a8a8f] hover:text-[#c8a45e] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#8a8a8f]">
            <span>© 2026 NovaOps. All rights reserved.</span>
            <a href="#" className="hover:text-[#c8a45e] transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-[#c8a45e] transition-colors">
              Terms
            </a>
          </div>
          <a
            href="#home"
            className="group flex items-center gap-2 text-sm text-[#8a8a8f] hover:text-[#c8a45e] transition-colors"
          >
            Back to top
            <ArrowUp
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
