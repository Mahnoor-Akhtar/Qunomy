import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  FileText,
  Receipt,
  MessageSquare,
  User,
  LifeBuoy,
  ChevronDown,
  Sun,
  Scale
} from "lucide-react";

export type ClientNavKey =
  | "dashboard"
  | "cases"
  | "hearings"
  | "documents"
  | "invoices"
  | "messages"
  | "profile"
  | "support";

export const CLIENT_NAV: { key: ClientNavKey; label: string; to: string; icon: typeof LayoutDashboard }[] = [
  { key: "dashboard", label: "Dashboard", to: "/client-dashboard", icon: LayoutDashboard },
  { key: "cases", label: "My Cases", to: "/client-cases", icon: Briefcase },
  { key: "hearings", label: "Hearings", to: "/client-hearings", icon: Calendar },
  { key: "documents", label: "Documents", to: "/client-documents", icon: FileText },
  { key: "invoices", label: "Invoices & Payments", to: "/client-invoices", icon: Receipt },
  { key: "messages", label: "Messages", to: "/client-messages", icon: MessageSquare },
  { key: "profile", label: "My Profile", to: "/client-profile", icon: User },
  { key: "support", label: "Support", to: "/client-support", icon: LifeBuoy },
];

export default function ClientShell({
  active,
  children,
}: {
  active: ClientNavKey;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("qanomy_user");
      if (!raw) {
        navigate({ to: "/signin" });
        return;
      }
      setUser(JSON.parse(raw));
    } catch {
      navigate({ to: "/signin" });
    }
  }, [navigate]);

  const logout = () => {
    try {
      localStorage.removeItem("qanomy_user");
    } catch {}
    navigate({ to: "/signin" });
  };

  return (
    <div
      className="flex h-screen w-full bg-[#F5F0E6] text-[#1F1F1F] overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <aside className="sticky top-0 z-30 hidden h-screen w-[240px] shrink-0 flex-col border-r border-[#14213D]/10 bg-[#14213D] text-[#F5F0E6] lg:flex">
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-5 py-5">
          <Scale className="h-8 w-8 text-[#B8860B]" />
          <div className="flex flex-col">
            <span
              className="text-[22px] font-bold tracking-wide text-[#F5F0E6] leading-tight"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              Qanomy
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-2 flex-1 overflow-y-auto px-3">
          <ul className="flex flex-col gap-1">
            {CLIENT_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = item.key === active;
              return (
                <li key={item.key}>
                  <Link
                    to={item.to}
                    className={`group flex w-full items-center gap-3 rounded-lg px-3 py-1.5 text-[12px] transition-all ${
                      isActive
                        ? "bg-[#B8860B] text-[#14213D] font-semibold shadow-[0_6px_20px_-8px_rgba(184,134,11,0.8)]"
                        : "text-[#F5F0E6]/75 hover:bg-white/5 hover:text-[#F5F0E6]"
                    }`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="flex items-center gap-3 border-t border-[#F5F0E6]/10 px-4 py-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#B8860B] text-sm font-semibold text-[#14213D]">
            {(user?.name?.[0] ?? "C").toUpperCase()}
          </div>
          <div className="flex-1 leading-tight">
            <div className="text-[13px] font-semibold text-[#F5F0E6]">{user?.name ?? "Client"}</div>
            <div className="text-[10px] text-[#F5F0E6]/50">Client Portal</div>
          </div>
          <button
            onClick={logout}
            aria-label="Sign out"
            className="rounded-full p-1.5 text-[#F5F0E6]/60 transition-colors hover:bg-white/10 hover:text-[#B8860B]"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#14213D]/10 bg-[#F5F0E6]/85 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button className="lg:hidden">
              <LayoutDashboard className="h-5 w-5 text-[#14213D]" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 rounded-full border border-[#14213D]/15 bg-white px-4 py-2 text-[11px] font-semibold text-[#14213D] transition hover:border-[#B8860B] hover:text-[#B8860B]">
              <span className="text-[#B8860B]">💬</span> Message My Lawyer
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#14213D]/15 bg-white text-[#14213D] transition hover:border-[#B8860B] hover:text-[#B8860B]">
              <Sun className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </main>
    </div>
  );
}
