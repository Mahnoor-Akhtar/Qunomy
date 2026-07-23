import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Scale, Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import CursorGrid from "@/components/CursorGrid";
import heroVideo from "@/assets/video.mp4";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign in — Qanomy Legal Intelligence" },
      { name: "description", content: "Sign in to your Qanomy account to manage cases, hearings and clients." },
      { property: "og:title", content: "Sign in — Qanomy Legal Intelligence" },
      { property: "og:description", content: "Access your Qanomy digital case diary." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SignIn,
});

function SignIn() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const schema = z.object({
    email: z
      .string()
      .trim()
      .min(1, { message: "Email is required." })
      .email({ message: "Enter a valid email address." })
      .max(255, { message: "Email is too long." }),
    password: z
      .string()
      .min(1, { message: "Password is required." })
      .min(8, { message: "Password must be at least 8 characters." })
      .max(128, { message: "Password is too long." }),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const result = schema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as "email" | "password";
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      if (email.trim().toLowerCase() === "mahnoor@gmail.com" && password === "12345678") {
        try {
          localStorage.setItem(
            "qanomy_user",
            JSON.stringify({ email: email.trim().toLowerCase(), name: "Mahnoor" }),
          );
        } catch {}
        toast.success("Welcome back, Mahnoor.");
        navigate({ to: "/dashboard" });
        return;
      }
      if (email.trim().toLowerCase() === "haris@gmail.com" && password === "12345678") {
        try {
          localStorage.setItem(
            "qanomy_user",
            JSON.stringify({ email: email.trim().toLowerCase(), name: "Haris" }),
          );
        } catch {}
        toast.success("Welcome back, Haris.");
        navigate({ to: "/lawyer-dashboard" });
        return;
      }
      if (email.trim().toLowerCase() === "ijaz@gmail.com" && password === "12345678") {
        try {
          localStorage.setItem(
            "qanomy_user",
            JSON.stringify({ email: email.trim().toLowerCase(), name: "Ijaz" }),
          );
        } catch {}
        toast.success("Welcome, Ijaz.");
        navigate({ to: "/lawyer-dashboard" });
        return;
      }
      if (email.trim().toLowerCase() === "rizwan@gmail.com" && password === "12345678") {
        try {
          localStorage.setItem(
            "qanomy_user",
            JSON.stringify({ email: email.trim().toLowerCase(), name: "Rizwan" }),
          );
        } catch {}
        toast.success("Welcome, Rizwan.");
        navigate({ to: "/client-dashboard" });
        return;
      }
      const message = "Invalid email or password. Please try again.";
      setFormError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#14213D] text-[#F5F0E6]">
      {/* Background video */}
      <video
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Navy filter */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,33,61,0.82) 0%, rgba(20,33,61,0.9) 60%, rgba(20,33,61,0.95) 100%)",
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

      {/* Back home */}
      <Link
        to="/"
        className="absolute left-6 top-6 z-20 inline-flex items-center gap-2 rounded-full border border-[#F5F0E6]/20 bg-[#14213D]/40 px-4 py-2 text-xs font-medium tracking-[0.2em] text-[#F5F0E6] uppercase backdrop-blur-md transition-all hover:border-[#B8860B] hover:text-[#B8860B]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        ← Back
      </Link>

      {/* Form */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <div className="pointer-events-auto w-full max-w-md">
          {/* Brand */}
          <div className="mb-10 flex flex-col items-center">
            <Scale className="h-10 w-10 text-[#B8860B]" strokeWidth={1.25} />
            <div className="mt-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#B8860B]" />
              <span
                className="text-[11px] font-medium uppercase tracking-[0.5em] text-[#B8860B]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Welcome Back
              </span>
              <span className="h-px w-8 bg-[#B8860B]" />
            </div>
            <h1
              className="mt-6 text-center text-3xl font-normal leading-[1.1] tracking-[-0.02em] text-[#F5F0E6] sm:text-4xl"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              Sign in to Qanomy<span className="text-[#B8860B]">.</span>
            </h1>
            <p
              className="mt-3 text-center text-[11px] font-normal uppercase tracking-[0.3em] text-white/60"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Your Digital Case Diary
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

            {/* Email */}
            <div className="group">
              <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.28em] text-white/60">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B8860B]" strokeWidth={1.5} />
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                    if (formError) setFormError(null);
                  }}
                  placeholder="you@firm.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`w-full border-0 border-b bg-transparent py-3 pl-7 pr-2 text-sm text-[#F5F0E6] placeholder:text-white/30 outline-none transition-colors focus:border-[#B8860B] ${
                    errors.email ? "border-red-400/70" : "border-[#F5F0E6]/25"
                  }`}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-xs text-red-300">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="group">
              <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.28em] text-white/60">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B8860B]" strokeWidth={1.5} />
                <input
                  type={show ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((p) => ({ ...p, password: undefined }));
                    if (formError) setFormError(null);
                  }}
                  placeholder="••••••••"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  className={`w-full border-0 border-b bg-transparent py-3 pl-7 pr-9 text-sm text-[#F5F0E6] placeholder:text-white/30 outline-none transition-colors focus:border-[#B8860B] ${
                    errors.password ? "border-red-400/70" : "border-[#F5F0E6]/25"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  aria-label={show ? "Hide password" : "Show password"}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-white/50 transition-colors hover:text-[#B8860B]"
                >
                  {show ? <EyeOff className="h-4 w-4" strokeWidth={1.5} /> : <Eye className="h-4 w-4" strokeWidth={1.5} />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="mt-1.5 text-xs text-red-300">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Row */}
            <div className="mt-1 flex items-center justify-between text-xs">
              <label className="inline-flex cursor-pointer items-center gap-2 text-white/70">
                <input type="checkbox" className="peer sr-only" />
                <span className="flex h-4 w-4 items-center justify-center rounded-sm border border-[#F5F0E6]/30 bg-transparent transition-colors peer-checked:border-[#B8860B] peer-checked:bg-[#B8860B]">
                  <span className="h-2 w-2 rounded-[1px] bg-[#14213D] opacity-0 transition-opacity peer-checked:opacity-100" />
                </span>
                Remember me
              </label>
              <a href="#forgot" className="text-[#B8860B] transition-colors hover:text-[#F5F0E6]">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="group mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#B8860B] px-7 py-3.5 text-sm font-semibold text-[#14213D] shadow-[0_10px_40px_-6px_rgba(184,134,11,0.75)] transition-all duration-300 hover:bg-[#F5F0E6] hover:shadow-[0_14px_46px_-6px_rgba(184,134,11,0.9)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="mt-6 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-white/40">
              <span className="h-px flex-1 bg-[#F5F0E6]/15" />
              New to Qanomy
              <span className="h-px flex-1 bg-[#F5F0E6]/15" />
            </div>

            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#F5F0E6]/30 px-7 py-3.5 text-sm font-medium text-[#F5F0E6] backdrop-blur-sm transition-all duration-300 hover:border-[#B8860B] hover:text-[#B8860B]"
            >
              Create a free account
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
}