import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, UserCircle2, CalendarDays } from "lucide-react";
import logo from "@/assets/logo.png";

const links = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Challenges", href: "#challenges" },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <div className="pointer-events-auto mx-auto mt-4 flex w-[95%] max-w-7xl items-center justify-between rounded-full border border-[#F5F0E6]/15 pl-4 pr-2 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] transition-all duration-300"
           style={{
             height: scrolled ? "68px" : "76px",
             backgroundColor: scrolled ? "rgba(14,26,51,0.95)" : "rgba(20,33,61,0.85)",
             backdropFilter: "blur(16px) saturate(140%)",
           }}>
        {/* Logo */}
        <Link to="/" className="group flex shrink-0 items-center gap-3">
          <img
            src={logo}
            alt="Qunomy"
            className="h-11 w-auto transition-transform duration-300 group-hover:scale-105"
          />
          <span className="flex flex-col leading-none">
            <span
              className="text-xl font-bold tracking-[0.14em] text-[#F5F0E6]"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              QUNOMY
            </span>
            <span
              className="mt-1 text-[9px] font-medium tracking-[0.32em] text-[#B8860B]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              LEGAL INTELLIGENCE
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setActive(l.href)}
                className={`group relative text-sm font-medium transition-colors hover:text-[#B8860B] ${
                  active === l.href ? "text-[#B8860B]" : "text-[#F5F0E6]"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {l.label}
                <span
                  className={`pointer-events-none absolute -bottom-2 left-0 h-[2px] bg-[#B8860B] transition-all duration-300 ${
                    active === l.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden shrink-0 items-center gap-5 lg:flex">
          <span className="h-6 w-px bg-[#F5F0E6]/20" />
          <Link
            to="/signin"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#F5F0E6] transition-colors hover:text-[#B8860B]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <UserCircle2 className="h-5 w-5" strokeWidth={1.5} />
            Sign in
          </Link>
          <a
            href="#demo"
            className="inline-flex items-center gap-2 rounded-full bg-[#B8860B] px-6 py-3 text-sm font-semibold text-[#14213D] shadow-lg shadow-[#B8860B]/30 transition-all duration-300 hover:bg-[#F5F0E6] hover:text-[#14213D]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <CalendarDays className="h-4 w-4" strokeWidth={2} />
            Book a Demo
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#F5F0E6] lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="pointer-events-auto mx-auto mt-2 w-[95%] max-w-6xl overflow-hidden rounded-2xl border border-[#F5F0E6]/15 bg-[#14213D]/95 shadow-2xl backdrop-blur-md lg:hidden"
             style={{ backdropFilter: "blur(16px) saturate(140%)" }}>
          <ul className="flex flex-col gap-1 p-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-[#F5F0E6] transition-colors hover:bg-[#F5F0E6]/5 hover:text-[#B8860B]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-2 flex gap-3 px-1 pb-1">
              <Link
                to="/signin"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full border border-[#F5F0E6]/30 px-4 py-2.5 text-center text-sm font-medium text-[#F5F0E6]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Sign in
              </Link>
              <a
                href="#demo"
                className="flex-1 rounded-full bg-[#B8860B] px-4 py-2.5 text-center text-sm font-semibold text-[#14213D]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Book a Demo
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}