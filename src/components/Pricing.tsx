import { Check, Sparkles, Scale, Building2, Rocket, ShieldCheck, Lock, Headphones, Star } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

type Plan = {
  name: string;
  icon: typeof Scale;
  price: string;
  period: string;
  badge?: string;
  tagline: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: "Free",
    icon: Scale,
    price: "PKR 0",
    period: "/ mo",
    badge: "Free Trial",
    tagline: "Get started with no commitment.",
    features: [
      "Free for 30 days",
      "Case Management",
      "Invoice Generation",
      "Cause List on WhatsApp",
      "Client Portal",
      "Notifications to Clients",
    ],
    cta: "Get Started Free",
  },
  {
    name: "Basic",
    icon: Rocket,
    price: "PKR 1,499",
    period: "/ mo",
    badge: "For Small Teams",
    tagline: "Recommended for team size of 1 to 5.",
    features: [
      "Everything in Free, plus:",
      "Up to 2,000 Cases",
      "5 GB Document Storage",
      "Up to 5 Team Members",
      "Automatic Date Reminders (Email)",
    ],
    cta: "Try it Free",
  },
  {
    name: "Pro",
    icon: Sparkles,
    price: "PKR 3,999",
    period: "/ mo",
    badge: "For Mid-Sized Teams",
    tagline: "Recommended for team size of 5 to 10.",
    features: [
      "Everything in Basic, plus:",
      "Up to 5,000 Cases",
      "25 GB Document Storage",
      "Up to 10 Team Members",
      "Reminders via Email & WhatsApp",
    ],
    cta: "Try it Free",
    featured: true,
  },
  {
    name: "Enterprise",
    icon: Building2,
    price: "Let's talk",
    period: "",
    badge: "For Large Teams",
    tagline: "Recommended for teams of 10 and above.",
    features: [
      "Everything in Pro, plus:",
      "5,000+ Cases",
      "10+ Team Members",
      "1,000+ Clients",
      "Customised Features & SLA",
    ],
    cta: "Contact Sales",
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden px-6 py-24 sm:py-32"
      style={{ backgroundColor: "#F5F0E6" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 0%, rgba(184,134,11,0.08) 0%, transparent 70%), radial-gradient(50% 40% at 50% 100%, rgba(20,33,61,0.06) 0%, transparent 70%)",
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
              Pricing
            </span>
            <span className="h-px w-8 bg-[#B8860B]" />
          </div>
          <h2
            className="text-3xl leading-tight tracking-tight text-[#14213D] sm:text-4xl md:text-5xl"
            style={{ fontFamily: "'Libre Baskerville', serif" }}
          >
            Plans built for every practice<span className="text-[#B8860B]">.</span>
          </h2>
          <p
            className="mt-5 text-base leading-relaxed text-[#5C7A99]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Transparent pricing. No hidden fees. Cancel anytime during your first 30 days.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const spotlight = plan.featured
              ? "rgba(245, 215, 122, 0.35)"
              : "rgba(184, 134, 11, 0.18)";
            return (
              <SpotlightCard
                key={plan.name}
                spotlightColor={spotlight}
                className={`${plan.featured ? "featured lg:-translate-y-4" : ""} h-full`}
              >
                <div className="flex h-full flex-col p-7 sm:p-8">
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#B8860B] px-3.5 py-1.5 shadow-[0_8px_20px_-6px_rgba(184,134,11,0.6)]">
                      <Star className="h-3 w-3 text-[#14213D]" strokeWidth={2.5} fill="#14213D" />
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#14213D]"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6 flex items-center gap-3">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: plan.featured
                          ? "rgba(184,134,11,0.15)"
                          : "rgba(20,33,61,0.06)",
                        border: plan.featured
                          ? "1px solid rgba(184,134,11,0.4)"
                          : "1px solid rgba(20,33,61,0.12)",
                      }}
                    >
                      <Icon
                        className={plan.featured ? "h-5 w-5 text-[#B8860B]" : "h-5 w-5 text-[#14213D]"}
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3
                      className={
                        plan.featured
                          ? "text-xl font-normal tracking-tight text-[#F5F0E6]"
                          : "text-xl font-normal tracking-tight text-[#14213D]"
                      }
                      style={{ fontFamily: "'Libre Baskerville', serif" }}
                    >
                      {plan.name}
                    </h3>
                  </div>

                  {plan.badge && (
                    <p
                      className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B8860B]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {plan.badge}
                    </p>
                  )}

                  <div className="mb-2 flex items-baseline gap-1">
                    <span
                      className={
                        plan.featured
                          ? "text-4xl font-semibold tracking-tight text-[#F5F0E6] sm:text-5xl"
                          : "text-4xl font-semibold tracking-tight text-[#14213D] sm:text-5xl"
                      }
                      style={{ fontFamily: "'Libre Baskerville', serif" }}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span
                        className={plan.featured ? "text-sm text-[#8FA5C0]" : "text-sm text-[#5C7A99]"}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p
                    className={
                      plan.featured
                        ? "mb-8 text-sm leading-relaxed text-[#8FA5C0]"
                        : "mb-8 text-sm leading-relaxed text-[#5C7A99]"
                    }
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {plan.tagline}
                  </p>

                  <div
                    className={
                      plan.featured
                        ? "mb-6 h-px w-full bg-gradient-to-r from-transparent via-[#F5F0E6]/15 to-transparent"
                        : "mb-6 h-px w-full bg-gradient-to-r from-transparent via-[#14213D]/15 to-transparent"
                    }
                  />

                  <ul className="mb-10 space-y-3.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                          style={{
                            backgroundColor: plan.featured
                              ? "rgba(184,134,11,0.15)"
                              : "rgba(184,134,11,0.15)",
                          }}
                        >
                          <Check
                            className="h-3 w-3 text-[#B8860B]"
                            strokeWidth={3}
                          />
                        </span>
                        <span
                          className={
                            plan.featured
                              ? "text-sm leading-relaxed text-[#F5F0E6]/85"
                              : "text-sm leading-relaxed text-[#14213D]/85"
                          }
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#trial"
                    className={
                      plan.featured
                        ? "mt-auto inline-flex items-center justify-center rounded-full bg-[#B8860B] px-6 py-3.5 text-sm font-semibold text-[#14213D] shadow-[0_10px_30px_-8px_rgba(184,134,11,0.7)] transition-all duration-300 hover:bg-[#F5D77A]"
                        : "mt-auto inline-flex items-center justify-center rounded-full border border-[#14213D]/25 px-6 py-3.5 text-sm font-medium text-[#14213D] transition-all duration-300 hover:border-[#B8860B] hover:bg-[#B8860B] hover:text-[#14213D]"
                    }
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {plan.cta}
                  </a>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        <div
          className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-[#14213D]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <div className="inline-flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-[#14213D]" strokeWidth={1.5} />
            <span className="text-sm font-medium">30-Day Money Back Guarantee</span>
          </div>
          <div className="inline-flex items-center gap-2.5">
            <Lock className="h-5 w-5 text-[#14213D]" strokeWidth={1.5} />
            <span className="text-sm font-medium">Secure &amp; Compliant</span>
          </div>
          <div className="inline-flex items-center gap-2.5">
            <Headphones className="h-5 w-5 text-[#14213D]" strokeWidth={1.5} />
            <span className="text-sm font-medium">24/7 Priority Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}