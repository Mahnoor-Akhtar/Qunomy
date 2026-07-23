import { useState } from "react";
import {
  Gavel,
  Users,
  FileText,
  CalendarClock,
  Briefcase,
  Shield,
  ArrowRight,
  Check,
  ShieldCheck,
  Lock,
  ClipboardList,
} from "lucide-react";

type Solution = {
  title: string;
  eyebrow: string;
  icon: typeof Gavel;
  description: string;
  highlights: string[];
};

const solutions: Solution[] = [
  {
    title: "Litigation Practice",
    eyebrow: "For Trial Lawyers",
    icon: Gavel,
    description:
      "Purpose-built for advocates who spend their days between hearings. Track every cause list, motion, and adjournment without losing a beat.",
    highlights: [
      "Automatic cause list sync from court websites",
      "Hearing reminders on WhatsApp & email",
      "Case history in a single, searchable timeline",
    ],
  },
  {
    title: "Corporate Advisory",
    eyebrow: "For In-House & Boutique Firms",
    icon: Briefcase,
    description:
      "Manage retainers, contracts, and compliance work with clean client dashboards and matter-level financial visibility.",
    highlights: [
      "Matter-based billing with retainer tracking",
      "Contract lifecycle & renewal alerts",
      "Client-side portal with document access",
    ],
  },
  {
    title: "Client Management",
    eyebrow: "For Every Practice",
    icon: Users,
    description:
      "Give clients a professional experience end to end — from intake to case updates — while keeping your team perfectly in sync.",
    highlights: [
      "Branded client portal & intake forms",
      "Automated status updates after every hearing",
      "Secure document sharing with audit trail",
    ],
  },
  {
    title: "Document Vault",
    eyebrow: "For Chambers of Any Size",
    icon: FileText,
    description:
      "Every pleading, order and annexure — encrypted, versioned, and instantly retrievable when you need it in court.",
    highlights: [
      "Encrypted cloud storage with role-based access",
      "OCR search across scanned pleadings",
      "Version history & signed document trail",
    ],
  },
  {
    title: "Calendar & Deadlines",
    eyebrow: "Never Miss a Date",
    icon: CalendarClock,
    description:
      "A single calendar for hearings, limitation dates, filings and internal deadlines — synced across your entire team.",
    highlights: [
      "Limitation & statutory deadline tracking",
      "Team calendar with role-based visibility",
      "Two-way sync with Google & Outlook",
    ],
  },
  {
    title: "Compliance & Security",
    eyebrow: "Built for Legal Data",
    icon: Shield,
    description:
      "Bank-grade encryption, granular permissions and full audit logs so your privileged information stays privileged.",
    highlights: [
      "End-to-end encryption at rest & in transit",
      "Granular team & client permissions",
      "Immutable audit log for every action",
    ],
  },
];

export default function Solutions() {
  const [active, setActive] = useState(0);
  const current = solutions[active];
  const ActiveIcon = current.icon;

  return (
    <section
      id="solutions"
      className="relative overflow-hidden px-6 py-24 sm:py-32"
      style={{ backgroundColor: "#F5F0E6" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 10% 10%, rgba(184,134,11,0.06) 0%, transparent 70%), radial-gradient(50% 50% at 100% 100%, rgba(20,33,61,0.05) 0%, transparent 70%)",
        }}
      />
      {/* Dotted pattern accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-6 top-40 h-40 w-40 opacity-40"
        style={{
          backgroundImage: "radial-gradient(#14213D 1px, transparent 1px)",
          backgroundSize: "12px 12px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-[#B8860B]" />
            <span
              className="text-[11px] font-medium uppercase tracking-[0.5em] text-[#B8860B]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Solutions
            </span>
            <span className="h-px w-8 bg-[#B8860B]" />
          </div>
          <h2
            className="text-3xl leading-tight tracking-tight text-[#14213D] sm:text-4xl md:text-5xl"
            style={{ fontFamily: "'Libre Baskerville', serif" }}
          >
            One platform. Every kind of practice
            <span className="text-[#B8860B]">.</span>
          </h2>
          <p
            className="mt-5 text-base leading-relaxed text-[#5C7A99]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Explore how Qunomy adapts to the way your chambers actually work.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: Item list */}
          <div className="lg:col-span-5">
            <ul className="space-y-3">
              {solutions.map((s, i) => {
                const isActive = i === active;
                const ItemIcon = s.icon;
                return (
                  <li key={s.title}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      className={`group flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-all duration-300 ${
                        isActive
                          ? "border-[#B8860B]/40 bg-[#14213D] shadow-[0_18px_40px_-20px_rgba(20,33,61,0.55)]"
                          : "border-[#14213D]/10 bg-white/60 hover:border-[#14213D]/20 hover:bg-white"
                      }`}
                    >
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                          isActive
                            ? "bg-[#B8860B]/15 ring-1 ring-[#B8860B]/40"
                            : "bg-[#14213D]/[0.04] ring-1 ring-[#14213D]/10"
                        }`}
                      >
                        <ItemIcon
                          className={`h-5 w-5 ${isActive ? "text-[#B8860B]" : "text-[#14213D]"}`}
                          strokeWidth={1.6}
                        />
                      </span>
                      <span
                        className={`w-8 text-sm font-medium tabular-nums ${
                          isActive ? "text-[#B8860B]" : "text-[#5C7A99]"
                        }`}
                        style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`flex-1 text-base font-semibold tracking-tight ${
                          isActive ? "text-[#B8860B]" : "text-[#14213D]"
                        }`}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {s.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: detail card */}
          <div className="lg:col-span-7">
            <div
              key={active}
              className="relative h-full animate-fade-in rounded-3xl border border-[#14213D]/10 bg-white p-8 shadow-[0_24px_60px_-30px_rgba(20,33,61,0.25)] sm:p-10"
            >
              <div className="mb-6 flex items-center gap-4">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: "rgba(184,134,11,0.12)",
                    border: "1px solid rgba(184,134,11,0.35)",
                  }}
                >
                  <ActiveIcon className="h-7 w-7 text-[#B8860B]" strokeWidth={1.5} />
                </div>
                <div>
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#B8860B]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {current.eyebrow}
                  </p>
                  <h3
                    className="mt-1 text-2xl font-normal tracking-tight text-[#14213D] sm:text-3xl"
                    style={{ fontFamily: "'Libre Baskerville', serif" }}
                  >
                    {current.title}
                  </h3>
                </div>
              </div>

              <p
                className="text-base leading-relaxed text-[#14213D]/75"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {current.description}
              </p>

              <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-[#14213D]/15 to-transparent" />

              <ul className="space-y-4">
                {current.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: "rgba(184,134,11,0.18)" }}
                    >
                      <Check className="h-3 w-3 text-[#B8860B]" strokeWidth={3} />
                    </span>
                    <span
                      className="text-sm leading-relaxed text-[#14213D]/85 sm:text-[15px]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {h}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#demo"
                className="group mt-10 inline-flex items-center gap-2 rounded-full bg-[#14213D] px-6 py-3 text-sm font-semibold text-[#F5F0E6] shadow-[0_10px_30px_-8px_rgba(20,33,61,0.4)] transition-all duration-300 hover:bg-[#B8860B] hover:text-[#14213D]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                See it in action
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-16 grid gap-8 border-t border-[#14213D]/10 pt-10 sm:grid-cols-3 sm:gap-6">
          {[
            { icon: ShieldCheck, title: "Bank-Grade Security", desc: "Your data is protected with enterprise grade encryption." },
            { icon: Lock, title: "Granular Access Control", desc: "Define who can access what, down to the smallest detail." },
            { icon: ClipboardList, title: "Full Audit Trail", desc: "Track every action with immutable, tamper-proof logs." },
          ].map(({ icon: TrustIcon, title, desc }) => (
            <div key={title} className="flex items-start gap-4">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: "rgba(20,33,61,0.06)" }}
              >
                <TrustIcon className="h-5 w-5 text-[#14213D]" strokeWidth={1.5} />
              </span>
              <div>
                <p
                  className="text-sm font-semibold text-[#14213D]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {title}
                </p>
                <p
                  className="mt-1 text-xs leading-relaxed text-[#5C7A99]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}