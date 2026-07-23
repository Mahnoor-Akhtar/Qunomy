import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import { AlertTriangle, FileWarning, ClockAlert, UsersRound, ScrollText, Landmark } from "lucide-react";
import imgHearing from "@/assets/challenge-hearing.png";
import imgFiles from "@/assets/challenge-files.png";
import imgComm from "@/assets/challenge-comm.png";
import imgCauselist from "@/assets/challenge-causelist.png";
import imgCourt from "@/assets/challenge-court.png";
import imgCompliance from "@/assets/challenge-compliance.png";

const challenges = [
  {
    icon: ClockAlert,
    image: imgHearing,
    title: "Missed Hearing Dates",
    desc: "One overlooked cause list entry can cost a client their case — and your credibility. Manual diaries and WhatsApp reminders don't scale.",
  },
  {
    icon: FileWarning,
    image: imgFiles,
    title: "Scattered Case Files",
    desc: "Documents live across email, drives, junior's laptop and paper folders. Finding the latest draft eats hours you should be billing.",
  },
  {
    icon: UsersRound,
    image: imgComm,
    title: "Client Communication Gaps",
    desc: "Clients call for updates you don't have time to give. No status, no trust — no referrals.",
  },
  {
    icon: ScrollText,
    image: imgCauselist,
    title: "Manual Cause List Tracking",
    desc: "Checking court websites every morning is fragile, repetitive work. Miss a listing and the whole day derails.",
  },
  {
    icon: Landmark,
    image: imgCourt,
    title: "No Court Integration",
    desc: "Generic CRMs don't understand Pakistani court hierarchies, FIR numbers or hearing formats. You bend software to law, not the other way around.",
  },
  {
    icon: AlertTriangle,
    image: imgCompliance,
    title: "Compliance & Deadline Risk",
    desc: "Limitation periods, filing windows, appeal deadlines — one slip is malpractice. You need a system that watches the clock for you.",
  },
];

export default function Challenges() {
  return (
    <section id="challenges" className="relative bg-[#F5F0E6] py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#B8860B]" />
          <span
            className="text-[11px] font-medium uppercase tracking-[0.5em] text-[#B8860B]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            The Problem
          </span>
          <span className="h-px w-8 bg-[#B8860B]" />
        </div>
        <h2
          className="text-3xl leading-tight tracking-tight text-[#14213D] sm:text-4xl md:text-5xl"
          style={{ fontFamily: "'Libre Baskerville', serif" }}
        >
          The Challenges Lawyers Face<span className="text-[#B8860B]">.</span>
        </h2>
        <p
          className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#1F1F1F]/70 md:text-base"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Running a modern legal practice means fighting battles outside the courtroom too. Here's what
          Qunomy is built to solve.
        </p>
      </div>

      <div className="mt-12 w-full">
        <ScrollStack
          useWindowScroll
          itemDistance={60}
          itemScale={0.03}
          itemStackDistance={24}
          baseScale={0.9}
          blurAmount={0}
        >
          {challenges.map(({ icon: Icon, title, desc, image }) => (
            <ScrollStackItem key={title} itemClassName="challenge-card">
              <div className="flex h-full items-center gap-6 md:gap-10">
                {/* Left: text */}
                <div className="flex h-full flex-1 flex-col justify-between py-2">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#B8860B] text-[#14213D] shadow-lg shadow-[#B8860B]/20 md:h-14 md:w-14">
                    <Icon className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2} />
                  </div>
                  <div>
                    <h3
                      className="text-2xl leading-tight tracking-tight md:text-4xl"
                      style={{ fontFamily: "'Libre Baskerville', serif" }}
                    >
                      {title}
                    </h3>
                    <p
                      className="mt-3 max-w-xl text-sm leading-relaxed text-[#F5F0E6]/70 md:mt-4 md:text-[15px]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {desc}
                    </p>
                  </div>
                </div>
                {/* Right: illustration */}
                <div className="hidden shrink-0 items-center justify-center sm:flex">
                  <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="h-40 w-40 object-contain drop-shadow-2xl md:h-56 md:w-56 lg:h-64 lg:w-64"
                  />
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}