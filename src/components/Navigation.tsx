import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Solutions", href: "#solutions" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Industries", href: "#industries" },
  { label: "Insights", href: "#insights" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0b]/80 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#c8a45e] to-[#8a6d3a] flex items-center justify-center font-bold text-[#0a0a0b] text-lg transition-transform duration-500 group-hover:rotate-12">
              N
            </div>
            <span className="font-bold text-xl tracking-tight">
              Nova<span className="text-[#c8a45e]">Ops</span>
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="px-4 py-2 text-sm text-[#8a8a8f] hover:text-[#f5f3ef] transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-[#c8a45e] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden lg:inline-flex items-center px-5 py-2.5 rounded-full bg-[#f5f3ef] text-[#0a0a0b] text-sm font-semibold hover:bg-[#c8a45e] transition-colors duration-300"
          >
            Book Free Consultation
          </a>

          <button
            className="lg:hidden text-[#f5f3ef]"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0a0a0b] transition-all duration-500 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-2">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-2xl font-semibold text-[#8a8a8f] hover:text-[#c8a45e] transition-colors py-2"
              style={{
                animation: open ? `fadeUp 0.5s ${i * 0.05}s both` : "none",
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-6 px-8 py-3 rounded-full bg-[#c8a45e] text-[#0a0a0b] font-semibold"
          >
            Book Free Consultation
          </a>
        </div>
      </div>
    </>
  );
}
