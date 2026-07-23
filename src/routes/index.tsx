import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Scale, CalendarDays, Sparkles, ArrowRight } from "lucide-react";
import CursorGrid from "@/components/CursorGrid";
import SplitText from "@/components/SplitText";
import Navbar from "@/components/Navbar";
import Features from "@/components/Features";
import Challenges from "@/components/Challenges";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Solutions from "@/components/Solutions";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import heroVideo from "@/assets/video.mp4";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Qanomy — Engineered Intelligence" },
      { name: "description", content: "Qanomy builds precision technology systems that turn ambitious ideas into engineered reality." },
      { property: "og:title", content: "Qanomy — Engineered Intelligence" },
      { property: "og:description", content: "Qanomy builds precision technology systems that turn ambitious ideas into engineered reality." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [step, setStep] = useState(0);
  const advance = () => setStep((s) => s + 1);

  const lines = [
    {
      text: "Never Miss a Hearing Date Again",
      className:
        "max-w-[18ch] text-[1.5rem] font-normal leading-[1.15] tracking-[-0.02em] text-white sm:text-[2rem] sm:leading-[1.1] md:text-[2.5rem] md:leading-[1.08] md:tracking-[-0.025em] lg:text-[3.25rem] lg:leading-[1.05] lg:tracking-[-0.03em]",
      splitType: "chars" as const,
      delay: 30,
      duration: 0.8,
      style: { fontFamily: "'Libre Baskerville', serif" },
      suffix: <span className="text-[#B8860B]">.</span>,
    },
    {
      text: "Your Smart Digital Case Diary.",
      className:
        "mt-4 max-w-2xl text-[0.85rem] font-light italic leading-[1.4] tracking-[0.01em] sm:mt-5 sm:text-base md:text-[1.1rem] md:leading-[1.4] lg:text-[1.25rem]",
      splitType: "chars" as const,
      delay: 25,
      duration: 0.7,
      style: { fontFamily: "'Libre Baskerville', serif", color: "#8FA5C0" },
    },
    {
      text: "The most intuitive case management platform, built for modern lawyers.",
      className:
        "mt-4 max-w-sm text-[0.6875rem] font-normal leading-[1.7] tracking-[0.08em] text-white/70 sm:mt-5 sm:max-w-lg sm:text-[0.75rem] sm:tracking-[0.1em] md:text-[0.8125rem] md:leading-[1.75] md:tracking-[0.12em]",
      splitType: "words" as const,
      delay: 40,
      duration: 0.6,
      style: { fontFamily: "'Inter', sans-serif", textTransform: "uppercase" as const },
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background video */}
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Navy filter overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,33,61,0.78) 0%, rgba(20,33,61,0.85) 60%, rgba(20,33,61,0.92) 100%)",
          }}
        />
        {/* Cursor grid overlay */}
        <div className="absolute inset-0">
          <CursorGrid
            color="#B8860B"
            cellSize={64}
            radius={180}
            gridOpacity={0.06}
            maxOpacity={0.9}
            fillOpacity={0.12}
          />
        </div>
        {/* Text content */}
        <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-6 pt-32 pb-16 text-center sm:pt-36">
          <div className="mb-4 flex justify-center">
            <Scale className="h-10 w-10 text-[#B8860B]" strokeWidth={1.25} />
          </div>
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-[#B8860B]" />
            <span
              className="text-[11px] font-medium uppercase tracking-[0.5em]"
              style={{ color: "#B8860B" }}
            >
              Qanomy Legal Intelligence
            </span>
            <span className="h-px w-8 bg-[#B8860B]" />
          </div>
          {lines.map((line, i) =>
            i <= step ? (
            <div key={i} className="w-full flex justify-center">
                <div style={line.style} className="inline-flex items-baseline justify-center">
                  <SplitText
                    tag={i === 0 ? "h1" : "p"}
                    text={line.text}
                    className={line.className}
                    delay={line.delay}
                    duration={line.duration}
                    ease="power3.out"
                    splitType={line.splitType}
                    from={{ opacity: 0, y: 30 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="0px"
                    textAlign="center"
                    onLetterAnimationComplete={i === step ? advance : undefined}
                  />
                  {line.suffix}
                </div>
              </div>
            ) : null
          )}
          {step >= lines.length && (
            <div className="pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-in">
              <a
                href="#trial"
                className="group inline-flex items-center gap-2 rounded-full bg-[#B8860B] px-7 py-3.5 text-sm font-semibold text-[#14213D] shadow-[0_10px_40px_-6px_rgba(184,134,11,0.75)] transition-all duration-300 hover:bg-[#F5F0E6] hover:shadow-[0_14px_46px_-6px_rgba(184,134,11,0.9)]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <Sparkles className="h-4 w-4" strokeWidth={2} />
                Start 30-Day Free Trial
                <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-full border border-[#F5F0E6]/40 px-7 py-3.5 text-sm font-medium text-[#F5F0E6] backdrop-blur-sm transition-all duration-300 hover:border-[#B8860B] hover:text-[#B8860B]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <CalendarDays className="h-4 w-4" strokeWidth={2} />
                Book a Demo
              </a>
            </div>
          )}
          <div className="pointer-events-none absolute bottom-8 left-0 right-0 flex justify-center" style={{ color: "#5C7A99" }}>
            <span className="text-xs uppercase tracking-[0.3em]">Scroll to explore</span>
          </div>
        </div>
      </section>
      <Features />
      <Challenges />
      <Solutions />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
