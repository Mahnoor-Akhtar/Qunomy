import { useEffect, useRef, useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight, Scale, Users, Briefcase, Clock, Star as StarIcon } from "lucide-react";

type T = { name: string; role: string; city: string; quote: string; avatar: string };

const testimonials: T[] = [
  { name: "Ahmed Raza Khan", role: "Criminal Advocate", city: "Lahore", quote: "Qanomy ne meri practice badal di. Hearing dates ka koi tension nahi — automated reminders time par milte hain.", avatar: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=400&h=400&fit=crop&crop=faces&auto=format&q=80" },
  { name: "Ayesha Siddiqui", role: "Partner, Siddiqui Law", city: "Karachi", quote: "Client management itna smooth pehle kabhi nahi tha. Team ki productivity double ho gayi hai.", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces&auto=format&q=80" },
  { name: "Bilal Hussain", role: "Chamber Advocate", city: "Islamabad", quote: "Court integration feature is a game changer. Cause list directly mere dashboard par aati hai.", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces&auto=format&q=80" },
  { name: "Fatima Zahra", role: "Corporate Counsel", city: "Rawalpindi", quote: "Case diary maintain karna ab minutes ka kaam hai. Interface bilkul intuitive hai.", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces&auto=format&q=80" },
  { name: "Usman Tariq", role: "Senior Advocate", city: "Faisalabad", quote: "30 saal ki practice mein aisa reliable tool nahi dekha. Highly recommended for every lawyer.", avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=faces&auto=format&q=80" },
  { name: "Zainab Ali", role: "Family Law Attorney", city: "Multan", quote: "WhatsApp aur SMS notifications se clients hamesha updated rehte hain. Trust build karne mein madad ki.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces&auto=format&q=80" },
  { name: "Hassan Sheikh", role: "Boutique Firm Owner", city: "Peshawar", quote: "Chhoti firm ke liye perfect solution. Cost effective aur enterprise-grade features.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces&auto=format&q=80" },
  { name: "Sana Malik", role: "Litigation Lawyer", city: "Sialkot", quote: "Deadlines miss karne ka dar khatam. Ab focus sirf case pe hota hai, admin par nahi.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces&auto=format&q=80" },
  { name: "Imran Qureshi", role: "High Court Advocate", city: "Lahore", quote: "Document management aur case history ek jagah — brilliant execution by the Qanomy team.", avatar: "https://images.unsplash.com/photo-1615109398623-88346a601842?w=400&h=400&fit=crop&crop=faces&auto=format&q=80" },
  { name: "Hira Nawaz", role: "Legal Consultant", city: "Karachi", quote: "Simple, elegant, aur powerful. Har lawyer ko yeh try karna chahiye.", avatar: "https://images.unsplash.com/photo-1592621385612-4d7129426394?w=400&h=400&fit=crop&crop=faces&auto=format&q=80" },
];

function Card({ t, active }: { t: T; active: boolean }) {
  const isNavy = active;
  return (
    <div
      className={`relative flex h-full w-full flex-col gap-5 overflow-hidden rounded-[24px] border p-6 transition-colors duration-500 sm:p-7 ${
        isNavy
          ? "border-[#B8860B]/40 shadow-[0_30px_70px_-20px_rgba(20,33,61,0.55)]"
          : "border-[#14213D]/10 bg-white shadow-[0_16px_40px_-20px_rgba(20,33,61,0.25)]"
      }`}
      style={
        isNavy
          ? { background: "linear-gradient(160deg, #14213D 0%, #14213D 55%, #1a2a4d 100%)" }
          : undefined
      }
    >
      {isNavy && (
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
      )}
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          isNavy ? "bg-[#B8860B] text-[#14213D]" : "bg-[#B8860B]/15 text-[#B8860B]"
        } shadow-sm`}
      >
        <Quote className="h-4 w-4" strokeWidth={2.5} />
      </div>
      <div className="relative flex items-center gap-1 text-[#B8860B]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-[#B8860B]" strokeWidth={0} />
        ))}
      </div>
      <p
        className={`relative text-[15px] leading-[1.65] ${isNavy ? "text-[#F5F0E6]" : "text-[#1F1F1F]"}`}
        style={{ fontFamily: "'Libre Baskerville', serif" }}
      >
        “{t.quote}”
      </p>
      <div
        className={`relative mt-auto flex items-center gap-3 border-t pt-4 ${
          isNavy ? "border-[#F5F0E6]/15" : "border-[#14213D]/10"
        }`}
      >
        <img
          src={t.avatar}
          alt={t.name}
          className="h-11 w-11 shrink-0 rounded-full border-2 border-[#B8860B]/40 bg-[#14213D] object-cover"
          loading="lazy"
          draggable={false}
        />
        <div className="min-w-0">
          <div
            className={`truncate text-sm font-semibold ${isNavy ? "text-[#F5F0E6]" : "text-[#14213D]"}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {t.name}
          </div>
          <div
            className={`truncate text-[11px] uppercase tracking-[0.15em] ${isNavy ? "text-[#B8860B]" : "text-[#5C7A99]"}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {t.role} · {t.city}
          </div>
        </div>
      </div>
    </div>
  );
}

const stats = [
  { icon: Users, value: "2500+", label: "Lawyers Trust Qanomy" },
  { icon: Briefcase, value: "15,000+", label: "Cases Managed" },
  { icon: Clock, value: "2M+", label: "Hours Saved" },
  { icon: StarIcon, value: "4.9/5", label: "Average Rating" },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;
  const touchX = useRef<number | null>(null);

  const go = (dir: number) => setActive((i) => (i + dir + total) % total);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % total), 4200);
    return () => clearInterval(id);
  }, [paused, total]);

  const onTouchStart = (e: React.TouchEvent) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  return (
    <section id="testimonials" className="relative overflow-hidden bg-[#F5F0E6] py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #14213D 0%, transparent 45%), radial-gradient(circle at 80% 80%, #B8860B 0%, transparent 45%)",
        }}
      />
      <Scale
        aria-hidden
        className="pointer-events-none absolute right-6 top-24 h-56 w-56 text-[#B8860B]/10 sm:right-16 sm:top-28 sm:h-72 sm:w-72"
        strokeWidth={0.8}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-[#B8860B]" />
            <span
              className="text-[11px] font-medium uppercase tracking-[0.4em] text-[#B8860B]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              What Our Clients Say
            </span>
            <span className="h-px w-8 bg-[#B8860B]" />
          </div>
          <h2
            className="text-3xl leading-[1.15] tracking-[-0.02em] text-[#14213D] sm:text-4xl md:text-5xl"
            style={{ fontFamily: "'Libre Baskerville', serif" }}
          >
            Trusted by Legal Professionals<span className="text-[#B8860B]">.</span>
          </h2>
          <p
            className="mt-5 text-sm leading-relaxed text-[#5C7A99] sm:text-base"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Real experiences from lawyers who rely on Qanomy to deliver results every day.
          </p>
        </div>

        {/* Coverflow */}
        <div
          className="relative mx-auto h-[440px] w-full select-none sm:h-[460px]"
          style={{ perspective: "2000px" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            {testimonials.map((t, i) => {
              let offset = i - active;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;
              const abs = Math.abs(offset);
              const isActive = offset === 0;
              const visible = abs <= 2;
              const translateX = offset * 240;
              const translateZ = isActive ? 0 : -abs * 90;
              const rotateY = 0;
              const scale = isActive ? 1.1 : Math.max(0.78, 1 - abs * 0.11);
              const opacity = visible ? (isActive ? 1 : Math.max(0.55, 1 - abs * 0.22)) : 0;
              const zIndex = 100 - abs;
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show testimonial from ${t.name}`}
                  onClick={() => setActive(i)}
                  className="absolute left-1/2 top-1/2 h-[380px] w-[280px] cursor-pointer text-left transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none sm:w-[320px]"
                  style={{
                    transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex,
                    pointerEvents: "auto",
                    transformStyle: "preserve-3d",
                    filter: isActive ? "none" : `blur(${Math.min(abs * 0.4, 1.2)}px)`,
                  }}
                >
                  <Card t={t} active={isActive} />
                </button>
              );
            })}
          </div>

          {/* Arrows */}
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
            className="absolute left-0 top-1/2 z-[200] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#14213D]/15 bg-white text-[#14213D] shadow-md transition-all hover:border-[#B8860B]/60 hover:text-[#B8860B] sm:left-4"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(1)}
            className="absolute right-0 top-1/2 z-[200] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#14213D]/15 bg-white text-[#14213D] shadow-md transition-all hover:border-[#B8860B]/60 hover:text-[#B8860B] sm:right-4"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-[#B8860B]" : "w-1.5 bg-[#14213D]/25 hover:bg-[#14213D]/50"
              }`}
            />
          ))}
        </div>

        {/* Stats strip */}
        <div
          className="relative mt-16 overflow-hidden rounded-[24px] p-6 shadow-2xl shadow-[#14213D]/25 sm:p-8"
          style={{
            background:
              "linear-gradient(160deg, #14213D 0%, #14213D 55%, #1a2a4d 100%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: "radial-gradient(#F5F0E6 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="relative grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#B8860B]/15 text-[#B8860B] ring-1 ring-[#B8860B]/30">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div
                    className="text-2xl font-semibold leading-tight text-[#F5F0E6] sm:text-[26px]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {value}
                  </div>
                  <div
                    className="text-[11px] uppercase tracking-[0.15em] text-[#B8860B]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}