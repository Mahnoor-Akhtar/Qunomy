import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  Users,
  FileText,
  Users2,
  Receipt,
  Bell,
  BarChart2,
  Settings,
  Search,
  Sun,
  ChevronDown,
  LogOut,
  Plus,
  Scale
} from "lucide-react";
import { toast } from "sonner";

export type LawyerNavKey =
  | "dashboard"
  | "cases"
  | "hearings"
  | "clients"
  | "documents"
  | "team"
  | "invoices"
  | "notifications"
  | "reports"
  | "client-portal"
  | "settings";

export const LAWYER_NAV: { key: LawyerNavKey; label: string; to: string; icon: typeof LayoutDashboard }[] = [
  { key: "dashboard", label: "Dashboard", to: "/lawyer-dashboard", icon: LayoutDashboard },
  { key: "cases", label: "Cases", to: "/lawyer-cases", icon: Briefcase },
  { key: "hearings", label: "Hearings & Calendar", to: "/lawyer-hearings", icon: Calendar },
  { key: "clients", label: "Clients", to: "/lawyer-clients", icon: Users },
  { key: "documents", label: "Documents", to: "/lawyer-documents", icon: FileText },
  { key: "team", label: "Team", to: "/lawyer-team", icon: Users2 },
  { key: "invoices", label: "Invoices & Billing", to: "/lawyer-invoices", icon: Receipt },
  { key: "notifications", label: "Notifications", to: "/lawyer-dashboard", icon: Bell },
  { key: "reports", label: "Reports", to: "/lawyer-dashboard", icon: BarChart2 },
  { key: "client-portal", label: "Client Portal", to: "/lawyer-dashboard", icon: Users }, // Using generic icon as placeholder
  { key: "settings", label: "Settings", to: "/lawyer-dashboard", icon: Settings },
];

export default function LawyerShell({
  active,
  title,
  subtitle,
  children,
}: {
  active: LawyerNavKey;
  title?: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("qunomy_user");
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
      localStorage.removeItem("qunomy_user");
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
              Qunomy
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-2 flex-1 overflow-y-auto px-3">
          <ul className="flex flex-col gap-1">
            {LAWYER_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = item.key === active;
              return (
                <li key={item.key}>
                  <Link
                    to={item.to}
                    className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] transition-all ${
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
            {(user?.name?.[0] ?? "A").toUpperCase()}
          </div>
          <div className="flex-1 leading-tight">
            <div className="text-[13px] font-semibold text-[#F5F0E6]">{user?.name ?? "Haris"}</div>
            <div className="text-[10px] text-[#F5F0E6]/50">Admin</div>
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
              <span className="text-[#B8860B]">💬</span> WhatsApp Reminders
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#14213D]/15 bg-white text-[#14213D] transition hover:border-[#B8860B] hover:text-[#B8860B]">
              <Sun className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2 rounded-full border border-[#14213D]/15 bg-white px-4 py-2 text-[11px] font-semibold text-[#14213D] cursor-pointer transition hover:border-[#B8860B]">
              <Scale className="h-3.5 w-3.5 text-[#B8860B]" />
              <span className="font-bold" style={{ fontFamily: "'Libre Baskerville', serif" }}>Qunomy</span>
              <ChevronDown className="h-3 w-3 text-[#1F1F1F]/50" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </main>
    </div>
  );
}
