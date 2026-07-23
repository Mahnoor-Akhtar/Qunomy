import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Scale, Mail, Lock, User, Building2, ArrowRight, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import CursorGrid from "@/components/CursorGrid";
import heroVideo from "@/assets/video.mp4";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create account — Qanomy Legal Intelligence" },
      { name: "description", content: "Create your Qanomy account and start a 30-day free trial." },
      { property: "og:title", content: "Create account — Qanomy Legal Intelligence" },
      { property: "og:description", content: "Start your 30-day free trial of Qanomy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SignUp,
});

function SignUp() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: "", firm: "", email: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form | "terms", string>>>({});
  const [terms, setTerms] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const schema = z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: "Full name is required." })
      .max(100, { message: "Name is too long." }),
    firm: z
      .string()
      .trim()
      .min(1, { message: "Firm or chamber is required." })
      .max(120, { message: "Firm name is too long." }),
    email: z
      .string()
      .trim()
      .min(1, { message: "Email is required." })
      .email({ message: "Enter a valid email address." })
      .max(255, { message: "Email is too long." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .max(128, { message: "Password is too long." })
      .regex(/[A-Za-z]/, { message: "Password must include a letter." })
      .regex(/[0-9]/, { message: "Password must include a number." }),
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
    if (formError) setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const result = schema.safeParse(form);
    const fieldErrors: Partial<Record<keyof typeof form | "terms", string>> = {};
    if (!result.success) {
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof typeof form;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
    }
    if (!terms) fieldErrors.terms = "Please accept the Terms and Privacy Policy.";
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      const message = "We couldn't create your account. Please try again.";
      setFormError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#14213D] text-[#F5F0E6]">
      <video
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,33,61,0.82) 0%, rgba(20,33,61,0.9) 60%, rgba(20,33,61,0.95) 100%)",
        }}
      />
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

      <Link
        to="/"
        className="absolute left-6 top-6 z-20 inline-flex items-center gap-2 rounded-full border border-[#F5F0E6]/20 bg-[#14213D]/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#F5F0E6] backdrop-blur-md transition-all hover:border-[#B8860B] hover:text-[#B8860B]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        ← Back
      </Link>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <div className="pointer-events-auto w-full max-w-md">
          <div className="mb-10 flex flex-col items-center">
            <Scale className="h-10 w-10 text-[#B8860B]" strokeWidth={1.25} />
            <div className="mt-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#B8860B]" />
              <span
                className="text-[11px] font-medium uppercase tracking-[0.5em] text-[#B8860B]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Start Free Trial
              </span>
              <span className="h-px w-8 bg-[#B8860B]" />
            </div>
            <h1
              className="mt-6 text-center text-3xl font-normal leading-[1.1] tracking-[-0.02em] text-[#F5F0E6] sm:text-4xl"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              Create your account<span className="text-[#B8860B]">.</span>
            </h1>
            <p
              className="mt-3 text-center text-[11px] font-normal uppercase tracking-[0.3em] text-white/60"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              30 Days Free · No Card Required
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {formError && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-md border border-red-400/40 bg-red-500/10 px-3 py-2 text-xs text-red-200"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
                <span>{formError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Full name" icon={User} error={errors.name}>
                <input
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Ayesha Khan"
                  aria-invalid={!!errors.name}
                  className={inputBase(errors.name)}
                />
              </Field>
              <Field label="Firm / Chamber" icon={Building2} error={errors.firm}>
                <input
                  type="text"
                  autoComplete="organization"
                  value={form.firm}
                  onChange={set("firm")}
                  placeholder="Khan & Associates"
                  aria-invalid={!!errors.firm}
                  className={inputBase(errors.firm)}
                />
              </Field>
            </div>

            <Field label="Email" icon={Mail} error={errors.email}>
              <input
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={set("email")}
                placeholder="you@firm.com"
                aria-invalid={!!errors.email}
                className={inputBase(errors.email)}
              />
            </Field>

            <Field label="Password" icon={Lock} error={errors.password}>
              <input
                type={show ? "text" : "password"}
                autoComplete="new-password"
                value={form.password}
                onChange={set("password")}
                placeholder="Min 8 chars, letters + numbers"
                aria-invalid={!!errors.password}
                className={inputBase(errors.password) + " pr-9"}
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                aria-label={show ? "Hide password" : "Show password"}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-white/50 transition-colors hover:text-[#B8860B]"
              >
                {show ? <EyeOff className="h-4 w-4" strokeWidth={1.5} /> : <Eye className="h-4 w-4" strokeWidth={1.5} />}
              </button>
            </Field>

            <div className="mt-1">
              <label className="inline-flex cursor-pointer items-start gap-2 text-xs text-white/70">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={terms}
                  onChange={(e) => {
                    setTerms(e.target.checked);
                    if (errors.terms) setErrors((p) => ({ ...p, terms: undefined }));
                  }}
                />
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-[#F5F0E6]/30 bg-transparent transition-colors peer-checked:border-[#B8860B] peer-checked:bg-[#B8860B]">
                  <span className="h-2 w-2 rounded-[1px] bg-[#14213D] opacity-0 transition-opacity peer-checked:opacity-100" />
                </span>
                <span>
                  I agree to Qanomy's{" "}
                  <a href="#terms" className="text-[#B8860B] hover:text-[#F5F0E6]">Terms</a> and{" "}
                  <a href="#privacy" className="text-[#B8860B] hover:text-[#F5F0E6]">Privacy Policy</a>.
                </span>
              </label>
              {errors.terms && <p className="mt-1.5 text-xs text-red-300">{errors.terms}</p>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="group mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#B8860B] px-7 py-3.5 text-sm font-semibold text-[#14213D] shadow-[0_10px_40px_-6px_rgba(184,134,11,0.75)] transition-all duration-300 hover:bg-[#F5F0E6] hover:shadow-[0_14px_46px_-6px_rgba(184,134,11,0.9)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                  Creating account…
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>

            <p className="mt-2 text-center text-xs text-white/60">
              Already have an account?{" "}
              <Link to="/signin" className="text-[#B8860B] transition-colors hover:text-[#F5F0E6]">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

const inputBase = (hasError?: string) =>
  `w-full border-0 border-b bg-transparent py-3 pl-7 pr-2 text-sm text-[#F5F0E6] placeholder:text-white/30 outline-none transition-colors focus:border-[#B8860B] ${
    hasError ? "border-red-400/70" : "border-[#F5F0E6]/25"
  }`;

function Field({
  label,
  icon: Icon,
  error,
  children,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.28em] text-white/60">
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B8860B]" strokeWidth={1.5} />
        {children}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-300">{error}</p>}
    </div>
  );
}