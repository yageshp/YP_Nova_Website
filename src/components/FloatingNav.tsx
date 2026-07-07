import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";

export default function FloatingNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <a
        href="#contact"
        className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#f5f3ef] text-[#0a0a0b] font-semibold text-sm shadow-2xl hover:bg-[#c8a45e] transition-all duration-300 animate-pulse-glow"
      >
        <Calendar size={18} />
        Book Free Consultation
      </a>
    </div>
  );
}
