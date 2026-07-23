import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  Users,
  LifeBuoy,
  BarChart2,
  Settings,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  FileText,
  ShieldCheck,
} from "lucide-react";
import logo from "@/assets/logo.png";

export type NavKey =
  | "dashboard"
  | "firms"
  | "subs"
  | "users"
  | "tickets"
  | "analytics"
  | "audit-logs"
  | "settings";

export const NAV: { key: NavKey; label: string; to: string; icon: typeof LayoutDashboard }[] = [
  { key: "dashboard", label: "Platform Dashboard",      to: "/dashboard",     icon: LayoutDashboard },
  { key: "firms",     label: "Firms",                   to: "/firms",         icon: Building2 },
  { key: "subs",      label: "Subscriptions & Billing", to: "/subscriptions", icon: CreditCard },
  { key: "tickets",   label: "Support Tickets",         to: "/tickets",       icon: LifeBuoy },
  { key: "users",     label: "Global Users",            to: "/users",         icon: Users },
  { key: "analytics", label: "Analytics",               to: "/reports",       icon: BarChart2 },
  { key: "audit-logs",label: "Audit Logs",              to: "/audit-logs",    icon: FileText },
  { key: "settings",  label: "Master Settings",         to: "/settings",      icon: ShieldCheck },
];

export default function AdminShell({
  active,
  title,
  subtitle,
  headerRight,
  children,
}: {
  active: NavKey;
  title: string;
  subtitle?: string;
  headerRight?: ReactNode;
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
      className="flex min-h-screen w-full bg-[#F5F0E6] text-[#1F1F1F]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <aside className="sticky top-0 z-30 hidden h-screen w-[240px] shrink-0 flex-col border-r border-[#14213D]/10 bg-[#14213D] text-[#F5F0E6] lg:flex">
        <div className="flex items-center gap-3 px-5 py-5">
          <img src={logo} alt="Qanomy" className="h-9 w-auto" />
          <span
            className="text-lg font-semibold tracking-[0.12em] text-[#F5F0E6]"
            style={{ fontFamily: "'Libre Baskerville', serif" }}
          >
            Qanomy
          </span>
        </div>

        <nav className="mt-2 flex-1 overflow-y-auto px-3">
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => {
              const Icon = item.icon;
              const isActive = item.key === active;
              return (
                <li key={item.key}>
                  <Link
                    to={item.to}
                    className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
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

        <div className="flex items-center gap-3 border-t border-[#F5F0E6]/10 px-4 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#B8860B] text-sm font-semibold text-[#14213D]">
            {(user?.name?.[0] ?? "M").toUpperCase()}
          </div>
          <div className="flex-1 leading-tight">
            <div className="text-[13px] font-semibold text-[#F5F0E6]">Platform Admin</div>
            <div className="text-[10px] text-[#F5F0E6]/50">{user?.email ?? "admin@qanomy.pk"}</div>
          </div>
          <button
            onClick={logout}
            aria-label="Sign out"
            className="rounded-full p-1.5 text-[#F5F0E6]/60 transition-colors hover:bg-white/10 hover:text-[#B8860B]"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-[#14213D]/10 bg-[#F5F0E6]/85 px-6 py-4 backdrop-blur-md">
          <div className="min-w-0">
            <h1
              className="truncate text-xl font-semibold text-[#14213D]"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              {title}
            </h1>
            {subtitle && <p className="mt-0.5 text-xs text-[#1F1F1F]/60">{subtitle}</p>}
          </div>
          <div className="ml-auto flex flex-1 items-center justify-end gap-3">
            {headerRight ?? (
              <div className="relative hidden max-w-sm flex-1 md:block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1F1F1F]/40" />
                <input
                  placeholder="Search…"
                  className="w-full rounded-full border border-[#14213D]/15 bg-white py-2.5 pl-9 pr-4 text-sm outline-none placeholder:text-[#1F1F1F]/40 focus:border-[#B8860B]"
                />
              </div>
            )}
            <button className="relative rounded-full border border-[#14213D]/15 bg-white p-2.5 text-[#14213D] transition-colors hover:border-[#B8860B] hover:text-[#B8860B]">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#B8860B] text-[9px] font-bold text-[#14213D]">
                4
              </span>
            </button>
            <div className="hidden items-center gap-2 rounded-full border border-[#14213D]/15 bg-white px-3 py-1.5 sm:flex">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#14213D] text-xs font-semibold text-[#F5F0E6]">
                {(user?.name?.[0] ?? "M").toUpperCase()}
              </div>
              <div className="pr-1 text-xs leading-tight">
                <div className="font-semibold text-[#14213D]">
                  {user?.name ?? "Mahnoor"} <span className="text-[#1F1F1F]/50">(Admin)</span>
                </div>
                <div className="text-[10px] text-[#1F1F1F]/50">Super Admin</div>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-[#1F1F1F]/50" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </main>
    </div>
  );
}