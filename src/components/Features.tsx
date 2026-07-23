import { useState } from "react";
import {
  RefreshCw,
  Smartphone,
  MessageCircle,
  BellRing,
  UserCircle2,
  Receipt,
  FileText,
  Sparkles,
  Scale,
  ShieldCheck,
  Zap,
  Users,
  MessageSquare,
  Mail,
  MessageCircleMore,
} from "lucide-react";
import OptionWheel from "@/components/OptionWheel";
import AnimatedList from "@/components/AnimatedList";

const features = [
  {
    icon: RefreshCw,
    title: "Automatic Case Updates",
    desc: "Fetches hearing dates & case status from eCourts, NCLT, DRT, High Courts and more — synced automatically.",
    channels: ["Auto Sync", "eCourts", "Live Status"],
  },
  {
    icon: Smartphone,
    title: "Smart Client Management",
    desc: "Track cases, store documents and manage your entire practice from your phone.",
    channels: ["Mobile First", "Cloud Sync", "Offline"],
  },
  {
    icon: MessageCircle,
    title: "Daily Cause List on WhatsApp",
    desc: "Receive your complete cause list on WhatsApp and email in PDF & Excel every morning.",
    channels: ["WhatsApp", "Email", "PDF & Excel"],
  },
  {
    icon: BellRing,
    title: "Client Notifications & Reminders",
    desc: "Auto WhatsApp, SMS & email reminders to clients 7 days and 2 days before each hearing.",
    channels: ["WhatsApp", "Email", "SMS"],
  },
  {
    icon: UserCircle2,
    title: "Dedicated Client Portal",
    desc: "Clients get their own portal to view case updates, documents and progress anytime.",
    channels: ["Secure Login", "Case View", "Docs"],
  },
  {
    icon: Receipt,
    title: "Invoice Generation",
    desc: "Generate professional invoices instantly and track pending payments with ease.",
    channels: ["Invoices", "Payments", "Reports"],
  },
  {
    icon: FileText,
    title: "Document Management",
    desc: "Digitise and organise all case documents securely with role-based access.",
    channels: ["Secure Vault", "Role Access", "Search"],
  },
  {
    icon: Sparkles,
    title: "AI Drafting",
    desc: "Generate bail applications, petitions & legal notices with AI in seconds.",
    channels: ["AI Drafts", "Petitions", "Notices"],
  },
];

const channelIcons = [MessageSquare, Mail, MessageCircleMore];

export default function Features() {
  const [active, setActive] = useState(3);
  const ActiveIcon = features[active].icon;

  return (
    <section id="features" className="relative overflow-hidden bg-[#F5F0E6] py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#14213D 1px, transparent 1px), linear-gradient(90deg, #14213D 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #B8860B 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#B8860B]" />
          <span
            className="text-[11px] font-medium uppercase tracking-[0.5em] text-[#B8860B]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Smart Client Management
          </span>
        </div>

        {/* Mobile / tablet: AnimatedList */}
        <div className="mt-10 lg:hidden">
          <AnimatedList
            items={features}
            initialSelectedIndex={0}
            displayScrollbar={false}
            enableArrowNavigation={false}
            onItemSelect={(_, i) => setActive(i)}
            renderItem={(f, i, selected) => {
              const Icon = f.icon;
              return (
                <div className="flex items-start gap-4">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 transition-colors ${
                      selected
                        ? "bg-[#B8860B]/15 text-[#B8860B] ring-[#B8860B]/40"
                        : "bg-[#14213D]/5 text-[#14213D] ring-[#14213D]/10"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#B8860B]"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px w-4 bg-[#B8860B]/40" />
                    </div>
                    <h3
                      className="mt-1 text-[17px] font-semibold leading-tight text-[#14213D]"
                      style={{ fontFamily: "'Libre Baskerville', serif" }}
                    >
                      {f.title}
                      <span className="text-[#B8860B]">.</span>
                    </h3>
                    <p
                      className="mt-2 text-[13px] leading-relaxed text-[#1F1F1F]/70"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {f.desc}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {f.channels.map((c) => (
                        <span
                          key={c}
                          className="rounded-full bg-[#14213D]/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[#14213D]/70"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }}
          />
        </div>

        <div className="mt-14 hidden grid-cols-1 items-center gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
          {/* OptionWheel selector */}
          <div
            className="relative h-[520px] w-full"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute left-10 right-4 top-1/2 z-10 -translate-y-1/2"
            >
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B8860B]/60 to-transparent" />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 z-10 h-2 w-2 -translate-y-1/2 rounded-full bg-[#B8860B] shadow-[0_0_12px_rgba(184,134,11,0.6)]"
            />
            <OptionWheel
              items={features.map((f) => f.title)}
              defaultSelected={active}
              textColor="#14213D"
              activeColor="#B8860B"
              side="left"
              fontSize={1.4}
              spacing={2.2}
              curve={0.85}
              tilt={5}
              blur={1.4}
              fade={0.32}
              minOpacity={0.12}
              smoothing={260}
              inset={56}
              loop={false}
              draggable
              onChange={(i) => setActive(i)}
            />
          </div>

          <div
            key={active}
            className="relative overflow-hidden rounded-[28px] p-8 shadow-2xl shadow-[#14213D]/25 animate-fade-in sm:p-10"
            style={{
              background:
                "linear-gradient(160deg, #14213D 0%, #14213D 55%, #1a2a4d 100%)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.10]"
              style={{
                backgroundImage: "radial-gradient(#F5F0E6 1px, transparent 1px)",
                backgroundSize: "22px 22px",
                maskImage:
                  "radial-gradient(ellipse at 80% 30%, black 30%, transparent 75%)",
              }}
            />
            <Scale
              aria-hidden
              className="pointer-events-none absolute -right-6 top-6 h-[380px] w-[380px] text-[#F5F0E6]/[0.08]"
              strokeWidth={0.6}
            />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#B8860B]/15 text-[#B8860B] ring-1 ring-[#B8860B]/30">
                <ActiveIcon className="h-5 w-5" strokeWidth={2} />
              </div>
              <div
                className="mt-8 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.4em] text-[#B8860B]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span>{String(active + 1).padStart(2, "0")}</span>
                <span className="h-px w-6 bg-[#B8860B]/50" />
                <span className="text-[#F5F0E6]/50">
                  {String(features.length).padStart(2, "0")}
                </span>
              </div>
              <h3
                className="mt-4 max-w-[16ch] text-3xl font-semibold leading-[1.15] tracking-tight text-[#F5F0E6] sm:text-4xl"
                style={{ fontFamily: "'Libre Baskerville', serif" }}
              >
                {features[active].title}
                <span className="text-[#B8860B]">.</span>
              </h3>
              <span aria-hidden className="mt-4 block h-[2px] w-14 bg-[#B8860B]" />
              <p
                className="mt-6 max-w-md text-[15px] leading-relaxed text-[#F5F0E6]/75"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {features[active].desc}
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3 rounded-2xl border border-[#F5F0E6]/10 bg-[#0e1830]/60 p-3 backdrop-blur-sm">
                {features[active].channels.map((c, idx) => {
                  const CIcon = channelIcons[idx % channelIcons.length];
                  return (
                    <div
                      key={c}
                      className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-[12px] text-[#F5F0E6]/90"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#B8860B]/15 text-[#B8860B] ring-1 ring-[#B8860B]/25">
                        <CIcon className="h-4 w-4" strokeWidth={2} />
                      </span>
                      <span className="min-w-0 truncate font-medium leading-tight">
                        {c}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 border-t border-[#14213D]/10 pt-10 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "Secure & Compliant", desc: "Your data is always protected." },
            { icon: Zap, title: "Save Time", desc: "Automate repetitive tasks." },
            { icon: Users, title: "Built for Lawyers", desc: "Focused on what matters most." },
          ].map((t) => {
            const TI = t.icon;
            return (
              <div key={t.title} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-[#14213D]/10 text-[#B8860B]">
                  <TI className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <div
                    className="text-sm font-semibold text-[#14213D]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {t.title}
                  </div>
                  <div
                    className="mt-0.5 text-[13px] text-[#1F1F1F]/65"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {t.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}