import { useState } from "react";
import { Plus, Minus, LayoutGrid, HelpCircle, Star, ShieldCheck, CreditCard, MessageSquareText, Mail, ArrowRight, Scale } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

type Category = "all" | "general" | "features" | "security" | "billing";

const CATEGORIES: { id: Category; label: string; icon: typeof LayoutGrid }[] = [
  { id: "all", label: "All Questions", icon: LayoutGrid },
  { id: "general", label: "General", icon: HelpCircle },
  { id: "features", label: "Features", icon: Star },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "billing", label: "Billing", icon: CreditCard },
];

const FAQS: { q: string; a: string; category: Exclude<Category, "all"> }[] = [
  {
    q: "What is Qunomy?",
    a: "Qunomy is a smart digital case management platform built for modern lawyers and law firms. It helps you manage cases, clients, tasks, documents, and reminders all in one place.",
    category: "general",
  },
  {
    q: "Who is Qunomy designed for?",
    a: "Qunomy is designed for criminal lawyers, boutique law firms, chamber advocates, and legal teams across Pakistan who want an organized, automated workflow.",
    category: "general",
  },
  {
    q: "Can I access Qunomy on my mobile device?",
    a: "Yes. Qunomy works seamlessly on mobile browsers and offers native-quality experiences on both iOS and Android through our responsive web app.",
    category: "features",
  },
  {
    q: "How secure is my data with Qunomy?",
    a: "Your data is encrypted at rest and in transit. We follow industry-standard security protocols, run regular audits, and never share your client information with third parties.",
    category: "security",
  },
  {
    q: "Can I integrate Qunomy with other tools?",
    a: "Yes. Qunomy connects with Google Calendar, WhatsApp for notifications, cloud storage services, and popular accounting tools through our growing integrations library.",
    category: "features",
  },
  {
    q: "What is included in the free trial?",
    a: "The 30-day free trial gives you full access to every feature of the Pro plan — unlimited cases, client management, automated hearing alerts, and priority support.",
    category: "billing",
  },
];

export default function FAQ() {
  const [active, setActive] = useState<Category>("all");
  const [open, setOpen] = useState<number | null>(0);

  const filtered = active === "all" ? FAQS : FAQS.filter((f) => f.category === active);

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[#F5F0E6] py-24 sm:py-28 lg:py-32"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Watermark scale */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-8 top-24 hidden opacity-[0.05] lg:block"
      >
        <Scale className="h-72 w-72 text-[#14213D]" strokeWidth={1} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.35em] text-[#B8860B]">
            <span className="h-px w-8 bg-[#B8860B]" />
            FAQ
            <span className="h-px w-8 bg-[#B8860B]" />
          </div>
          <ScrollReveal
            baseOpacity={0}
            enableBlur
            baseRotation={3}
            blurStrength={6}
            containerClassName="!my-0"
            textClassName="!font-normal text-[#14213D]"
          >
            Frequently Asked Questions
          </ScrollReveal>
          <p className="mx-auto mt-4 max-w-xl text-sm text-[#1F1F1F]/60 sm:text-base">
            Everything you need to know about Qunomy and how it works.
          </p>
        </div>

        {/* Filter pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-3">
          {CATEGORIES.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => {
                  setActive(id);
                  setOpen(0);
                }}
                className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-medium transition-all duration-300 sm:text-sm ${
                  isActive
                    ? "border-[#14213D] bg-[#14213D] text-[#F5F0E6] shadow-[0_10px_30px_-12px_rgba(20,33,61,0.6)]"
                    : "border-[#14213D]/15 bg-white/70 text-[#14213D]/70 hover:border-[#14213D]/40 hover:text-[#14213D]"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            );
          })}
        </div>

        {/* Main grid: FAQ list + support card */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Accordion */}
          <div className="lg:col-span-8">
            <ul className="space-y-3">
              {filtered.map((item, idx) => {
                const isOpen = open === idx;
                return (
                  <li
                    key={item.q}
                    className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                      isOpen
                        ? "border-[#B8860B]/40 bg-[#B8860B]/[0.06] shadow-[0_20px_50px_-24px_rgba(184,134,11,0.35)]"
                        : "border-[#14213D]/10 bg-white/70 hover:border-[#14213D]/25 hover:bg-white"
                    }`}
                  >
                    {isOpen && (
                      <span className="absolute left-0 top-0 h-full w-1 bg-[#B8860B]" />
                    )}
                    <button
                      onClick={() => setOpen(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                            isOpen ? "bg-[#B8860B] text-[#14213D]" : "bg-[#14213D]/5 text-[#14213D]/60 group-hover:bg-[#14213D]/10"
                          }`}
                        >
                          {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                        </span>
                        <span className="text-sm font-semibold text-[#14213D] sm:text-[15px]">
                          {item.q}
                        </span>
                      </span>
                    </button>
                    <div
                      className="grid transition-all duration-500 ease-out"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 pl-[3.75rem] text-sm leading-relaxed text-[#1F1F1F]/70 sm:px-6 sm:pb-6 sm:pl-[4.25rem] sm:text-[14.5px]">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Support card */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 overflow-hidden rounded-3xl border border-[#14213D]/20 bg-[#14213D] p-8 text-[#F5F0E6] shadow-[0_30px_80px_-30px_rgba(20,33,61,0.5)]">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-40 blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(184,134,11,0.7), transparent 70%)" }}
              />
              <div className="relative">
                <div className="mb-6 flex items-center gap-3">
                  <div className="relative">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#5C7A99]/30 text-[#F5F0E6]">
                      <HelpCircle className="h-5 w-5" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-lg bg-[#B8860B] text-[#14213D] shadow-lg">
                      <MessageSquareText className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
                <h3
                  className="text-2xl leading-tight text-[#F5F0E6]"
                  style={{ fontFamily: "'Libre Baskerville', serif" }}
                >
                  Still have<br />questions?
                </h3>
                <p className="mt-3 text-sm text-[#F5F0E6]/60">
                  Our support team is here to help you 24/7.
                </p>

                <a
                  href="#contact"
                  className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#B8860B] px-5 py-3 text-sm font-semibold text-[#14213D] transition-all duration-300 hover:bg-[#F5F0E6]"
                >
                  <MessageSquareText className="h-4 w-4" />
                  Contact Support
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>

                <div className="my-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#F5F0E6]/40">
                  <span className="h-px flex-1 bg-[#F5F0E6]/15" />
                  or
                  <span className="h-px flex-1 bg-[#F5F0E6]/15" />
                </div>

                <a
                  href="mailto:hello@qunomy.com"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-[#F5F0E6]/25 px-5 py-3 text-sm font-medium text-[#F5F0E6] transition-all duration-300 hover:border-[#B8860B] hover:text-[#B8860B]"
                >
                  <Mail className="h-4 w-4" />
                  Email Us
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}