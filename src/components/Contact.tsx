import { useState, type FormEvent } from "react";
import { useReveal } from "../hooks";
import { Mail, Phone, Linkedin, Github, MapPin, Send, Calendar } from "lucide-react";

export default function Contact() {
  const { ref, inView } = useReveal();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: "", email: "", company: "", budget: "", message: "" });
  };

  return (
    <section id="contact" className="py-32 lg:py-40 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#c8a45e]/5 blur-[120px]" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div
          ref={ref}
          className={`reveal ${inView ? "in-view" : ""} max-w-3xl mb-16`}
        >
          <span className="text-sm text-[#c8a45e] tracking-widest uppercase font-medium">
            Contact
          </span>
          <h2 className="mt-4 text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Let&rsquo;s build something
            <br />
            <span className="gradient-text italic">worth scaling.</span>
          </h2>
          <p className="mt-6 text-lg text-[#8a8a8f] leading-relaxed">
            Tell us about your project. We&rsquo;ll respond within one business
            day with next steps — whether that&rsquo;s a discovery call, a
            technical scoping session, or a direct introduction to our
            engineering team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Form */}
          <div className="lg:col-span-3 p-8 lg:p-10 rounded-3xl border border-white/8 bg-[#131316]">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6">
                  <Send size={28} className="text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Message received.</h3>
                <p className="text-[#8a8a8f] max-w-md">
                  Thank you for reaching out. A member of our team will respond
                  within one business day to schedule your discovery call.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm text-[#8a8a8f] mb-2 block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#0a0a0b] border border-white/8 text-[#f5f3ef] focus:border-[#c8a45e]/40 focus:outline-none transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-[#8a8a8f] mb-2 block">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#0a0a0b] border border-white/8 text-[#f5f3ef] focus:border-[#c8a45e]/40 focus:outline-none transition-colors"
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm text-[#8a8a8f] mb-2 block">
                      Company
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#0a0a0b] border border-white/8 text-[#f5f3ef] focus:border-[#c8a45e]/40 focus:outline-none transition-colors"
                      placeholder="Acme Corp"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-[#8a8a8f] mb-2 block">
                      Project Budget
                    </label>
                    <select
                      value={form.budget}
                      onChange={(e) =>
                        setForm({ ...form, budget: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#0a0a0b] border border-white/8 text-[#f5f3ef] focus:border-[#c8a45e]/40 focus:outline-none transition-colors"
                    >
                      <option value="">Select range</option>
                      <option value="25-50k">$25K - $50K</option>
                      <option value="50-100k">$50K - $100K</option>
                      <option value="100-250k">$100K - $250K</option>
                      <option value="250k+">$250K+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-[#8a8a8f] mb-2 block">
                    Project Details
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0b] border border-white/8 text-[#f5f3ef] focus:border-[#c8a45e]/40 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your project goals, timeline, and what you're looking to build..."
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#c8a45e] text-[#0a0a0b] font-semibold hover:bg-[#d4b876] transition-all duration-300"
                >
                  Send Message
                  <Send
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            {/* Calendly */}
            <a
              href="#contact"
              className="card-hover group block p-8 rounded-3xl border border-white/8 bg-[#131316]"
            >
              <div className="w-12 h-12 rounded-xl bg-[#c8a45e]/10 border border-[#c8a45e]/20 flex items-center justify-center mb-5">
                <Calendar size={22} className="text-[#c8a45e]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Schedule a Discovery Call
              </h3>
              <p className="text-sm text-[#8a8a8f] leading-relaxed">
                Book a 30-minute consultation directly on our calendar. No
                pressure, no sales pitch — just a technical conversation.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-[#c8a45e] group-hover:gap-2 transition-all">
                Open calendar →
              </span>
            </a>

            {/* Contact details */}
            <div className="p-8 rounded-3xl border border-white/8 bg-[#131316] space-y-5">
              <a
                href="mailto:hello@novaops.io"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center group-hover:bg-[#c8a45e] transition-colors duration-300">
                  <Mail
                    size={18}
                    className="text-[#c8a45e] group-hover:text-[#0a0a0b] transition-colors"
                  />
                </div>
                <div>
                  <div className="text-xs text-[#8a8a8f]">Business Email</div>
                  <div className="text-sm font-medium text-[#f5f3ef]">
                    hello@novaops.io
                  </div>
                </div>
              </a>

              <a href="tel:+12025550100" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center group-hover:bg-[#c8a45e] transition-colors duration-300">
                  <Phone
                    size={18}
                    className="text-[#c8a45e] group-hover:text-[#0a0a0b] transition-colors"
                  />
                </div>
                <div>
                  <div className="text-xs text-[#8a8a8f]">Phone</div>
                  <div className="text-sm font-medium text-[#f5f3ef]">
                    +1 (202) 555-0100
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-3 pt-2">
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

            {/* Map placeholder */}
            <div className="p-8 rounded-3xl border border-white/8 bg-[#131316]">
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={18} className="text-[#c8a45e]" />
                <span className="text-sm font-semibold">Global Delivery Hubs</span>
              </div>
              <div className="space-y-2 text-sm text-[#8a8a8f]">
                <div>San Francisco · United States</div>
                <div>Singapore · APAC</div>
                <div>Bengaluru · India</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
