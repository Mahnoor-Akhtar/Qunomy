import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  Lock,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Cloud,
  Headphones,
  Award,
  Linkedin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import logo from "@/assets/qunomy-logo.png";

const NAV = [
  {
    title: "Product",
    links: ["Features", "Solutions", "Integrations", "Security", "Roadmap"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Partners", "Press", "Contact Us"],
  },
  {
    title: "Resources",
    links: ["Blog", "Help Center", "Guides", "API Documentation", "System Status"],
  },
  {
    title: "Legal",
    links: [
      "Privacy Policy",
      "Terms of Service",
      "Refund Policy",
      "Data Processing Addendum",
      "Cookie Policy",
    ],
  },
];

const TRUST = [
  { Icon: ShieldCheck, title: "Bank-Level Security", body: "Your data is encrypted and always protected." },
  { Icon: Cloud, title: "99.9% Uptime", body: "Reliable performance you can count on." },
  { Icon: Headphones, title: "24/7 Support", body: "We're here to help anytime you need us." },
  { Icon: Award, title: "Trusted by Lawyers", body: "Powering thousands of successful practices." },
];

const SOCIALS = [
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 2500);
  };

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden bg-[#0f1a30] text-[#F5F0E6]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/3 h-[420px] w-[420px] rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(184,134,11,0.5), transparent 65%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #F5F0E6 1px, transparent 1px), linear-gradient(to bottom, #F5F0E6 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-10 sm:px-10 lg:px-16 lg:pt-24">
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Brand + newsletter */}
          <div
            className={`md:col-span-4 transition-all duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <Link to="/" className="inline-flex items-center gap-3">
              <img src={logo} alt="Qanomy" className="h-11 w-auto" />
              <div className="flex flex-col leading-none">
                <span
                  className="text-xl tracking-[0.18em] text-[#F5F0E6]"
                  style={{ fontFamily: "'Libre Baskerville', serif" }}
                >
                  QANOMY
                </span>
                <span className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#B8860B]">
                  Legal Intelligence
                </span>
              </div>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-[#F5F0E6]/55">
              Smart legal practice management software for modern law firms and legal professionals.
            </p>

            <div className="my-8 h-px w-full max-w-xs bg-[#F5F0E6]/10" />

            <h4
              className="text-lg text-[#F5F0E6]"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              Stay Updated
            </h4>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-[#F5F0E6]/50">
              Get product updates, legal tech insights, and exclusive offers.
            </p>

            <form onSubmit={onSubscribe} className="mt-5 max-w-xs">
              <div className="group/form relative flex items-center overflow-hidden rounded-lg border border-[#F5F0E6]/15 bg-[#F5F0E6]/[0.03] transition-all duration-300 focus-within:border-[#B8860B]/70">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent px-4 py-3 text-sm text-[#F5F0E6] placeholder:text-[#F5F0E6]/35 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="m-1 inline-flex h-9 w-10 items-center justify-center rounded-md bg-[#B8860B] text-[#14213D] transition-all duration-300 hover:bg-[#F5F0E6]"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-3 flex items-center gap-2 text-[11px] text-[#F5F0E6]/45">
                <Lock className="h-3 w-3" />
                {subscribed ? "You're on the list." : "We respect your privacy."}
              </p>
            </form>

            {/* Socials */}
            <div className="mt-8 flex items-center gap-2.5">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group/s flex h-9 w-9 items-center justify-center rounded-md border border-[#F5F0E6]/12 bg-[#F5F0E6]/[0.02] text-[#F5F0E6]/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#B8860B] hover:bg-[#B8860B] hover:text-[#14213D]"
                >
                  <Icon className="h-[15px] w-[15px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:col-span-8 md:gap-6">
            {NAV.map((col, i) => (
              <div
                key={col.title}
                className={`transition-all duration-700 ${
                  visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: `${150 + i * 90}ms` }}
              >
                <h4
                  className="mb-6 text-[15px] text-[#F5F0E6]"
                  style={{ fontFamily: "'Libre Baskerville', serif" }}
                >
                  {col.title}
                  <span className="text-[#B8860B]">.</span>
                </h4>
                <ul className="space-y-3.5">
                  {col.links.map((label) => (
                    <li key={label}>
                      <a
                        href="#"
                        className="group/l flex items-center justify-between gap-3 text-[13.5px] text-[#F5F0E6]/60 transition-colors duration-300 hover:text-[#F5F0E6]"
                      >
                        <span className="relative">
                          {label}
                          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#B8860B] transition-all duration-300 group-hover/l:w-full" />
                        </span>
                        <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-[#F5F0E6]/25 transition-all duration-300 group-hover/l:translate-x-0.5 group-hover/l:text-[#B8860B]" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Trust strip */}
        <div
          className={`mt-16 rounded-2xl border border-[#F5F0E6]/10 bg-[#F5F0E6]/[0.02] p-6 sm:p-8 transition-all duration-700 delay-500 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST.map(({ Icon, title, body }) => (
              <div key={title} className="group/t flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#B8860B]/10 text-[#B8860B] transition-all duration-300 group-hover/t:bg-[#B8860B] group-hover/t:text-[#14213D]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[#F5F0E6]">{title}</div>
                  <div className="mt-1 text-xs leading-relaxed text-[#F5F0E6]/55">{body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={`mt-10 grid grid-cols-1 gap-6 border-t border-[#F5F0E6]/10 pt-8 lg:grid-cols-4 lg:items-center transition-all duration-700 delay-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="text-xs text-[#F5F0E6]/55">
            © {new Date().getFullYear()} <span className="text-[#B8860B]">Qanomy</span>. All rights reserved.
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#F5F0E6]/70">
            <MapPin className="h-4 w-4 text-[#F5F0E6]/40" /> Lahore, Pakistan
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#F5F0E6]/70">
            <Phone className="h-4 w-4 text-[#F5F0E6]/40" /> +92 300 1234567
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#F5F0E6]/70">
            <Mail className="h-4 w-4 text-[#F5F0E6]/40" /> hello@qanomy.com
          </div>
        </div>
      </div>
    </footer>
  );
}