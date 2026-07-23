import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Building2,
  BarChart3,
  Eye,
  ChevronDown,
  IndianRupee,
  UserPlus,
  Hourglass,
  Headphones,
  Cloud,
  ShieldCheck,
  Briefcase,
  UserCheck,
  FileText,
  Users,
  Search,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import AdminShell from "@/components/dashboard/AdminShell";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Platform Dashboard — Qunomy" },
      { name: "description", content: "Global overview of firms, subscriptions, revenue and support for Qunomy administrators." },
      { property: "og:title", content: "Platform Dashboard — Qunomy" },
      { property: "og:description", content: "Manage firms, subscriptions and revenue across the Qunomy platform." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const REVENUE = [
  { m: "Jun", v: 1_800_000 }, { m: "Jul", v: 2_050_000 }, { m: "Aug", v: 2_150_000 },
  { m: "Sep", v: 2_000_000 }, { m: "Oct", v: 1_950_000 }, { m: "Nov", v: 2_250_000 },
  { m: "Dec", v: 2_400_000 }, { m: "Jan", v: 2_600_000 }, { m: "Feb", v: 2_700_000 },
  { m: "Mar", v: 2_950_000 }, { m: "Apr", v: 2_850_000 }, { m: "May", v: 2_845_600 },
];

const PLAN_MIX = [
  { name: "Professional", value: 35.2, firms: 437, color: "#3B82F6" },
  { name: "Business",     value: 28.6, firms: 356, color: "#10B981" },
  { name: "Enterprise",   value: 19.8, firms: 246, color: "#8B5CF6" },
  { name: "Basic",        value: 11.3, firms: 140, color: "#F59E0B" },
  { name: "Trial",        value: 5.1,  firms: 63,  color: "#F97316" },
];

type Plan   = "Professional" | "Business" | "Enterprise" | "Basic";
type Status = "Active" | "Trial" | "Inactive";

const FIRMS: { name: string; plan: Plan; date: string; status: Status }[] = [
  { name: "Khan & Associates",       plan: "Professional", date: "20 May 2025", status: "Active" },
  { name: "Malik Law Chambers",      plan: "Business",     date: "19 May 2025", status: "Active" },
  { name: "Legal Vision Advocates",  plan: "Enterprise",   date: "18 May 2025", status: "Active" },
  { name: "Justice Partners",        plan: "Professional", date: "17 May 2025", status: "Trial" },
  { name: "Siddiqui Law Associates", plan: "Basic",        date: "16 May 2025", status: "Active" },
];

const PLAN_BADGE: Record<Plan, string> = {
  Professional: "bg-blue-100 text-blue-700",
  Business:     "bg-emerald-100 text-emerald-700",
  Enterprise:   "bg-violet-100 text-violet-700",
  Basic:        "bg-amber-100 text-amber-700",
};
const STATUS_BADGE: Record<Status, string> = {
  Active:   "bg-emerald-100 text-emerald-700",
  Trial:    "bg-amber-100 text-amber-700",
  Inactive: "bg-rose-100 text-rose-700",
};

const TINTS: Record<string, { bg: string; fg: string }> = {
  blue:    { bg: "bg-blue-100",    fg: "text-blue-600" },
  emerald: { bg: "bg-emerald-100", fg: "text-emerald-600" },
  violet:  { bg: "bg-violet-100",  fg: "text-violet-600" },
  amber:   { bg: "bg-amber-100",   fg: "text-amber-600" },
  rose:    { bg: "bg-rose-100",    fg: "text-rose-600" },
  slate:   { bg: "bg-slate-100",   fg: "text-slate-600" },
  sky:     { bg: "bg-sky-100",     fg: "text-sky-600" },
};

function Dashboard() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => FIRMS.filter((f) => !query || f.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <AdminShell
      active="dashboard"
      title="Platform Dashboard"
      subtitle="Welcome back, Admin. Here's what's happening on your platform."
      headerRight={
        <div className="relative hidden max-w-xs flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#1F1F1F]/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search firms, users, tickets…"
            className="w-full rounded-full border border-[#14213D]/15 bg-white py-2 pl-8 pr-3 text-xs outline-none placeholder:text-[#1F1F1F]/40 focus:border-[#B8860B]"
          />
        </div>
      }
    >
      {/* ── KPI Row ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3 xl:grid-cols-6">
        <Kpi tint="blue"    icon={Building2}  label="Total Firms"            value="1,248"        delta="+12.5% from last month" />
        <Kpi tint="emerald" icon={FileText}   label="Active Subscriptions"   value="982"          delta="+8.7% from last month" />
        <Kpi tint="violet"  icon={IndianRupee}label="Monthly Revenue"        value="PKR 28.4L"    delta="+15.3% from last month" />
        <Kpi tint="amber"   icon={UserPlus}   label="New Signups"            value="156"          delta="+18.4% from last month" />
        <Kpi tint="rose"    icon={Hourglass}  label="Expiring Trials"        value="23"           delta="In next 7 days" muted />
        <Kpi tint="slate"   icon={Headphones} label="Tickets Open"           value="34"           cta="View tickets →" />
      </div>

      {/* ── Middle: Table + Charts (all in one row) ──────────────── */}
      <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-4">

        {/* Recent Firms table — spans 2 of 4 cols */}
        <section className="xl:col-span-2 rounded-xl border border-[#14213D]/10 bg-white p-3.5">
          <div className="mb-2.5 flex items-center justify-between">
            <h2 className="flex items-center gap-1.5 text-xs font-semibold text-[#14213D]"
                style={{ fontFamily: "'Libre Baskerville', serif" }}>
              <span className="flex h-5 w-5 items-center justify-center rounded bg-[#14213D]/5">
                <Building2 className="h-3 w-3" />
              </span>
              Recent Firms
            </h2>
            <Link to="/firms"
              className="rounded-full border border-[#14213D]/15 bg-white px-2.5 py-1 text-[10px] font-semibold text-[#14213D] transition-colors hover:border-[#B8860B] hover:text-[#B8860B]">
              View All Firms
            </Link>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left text-[10px] font-medium text-[#1F1F1F]/50">
                <th className="pb-2">Firm Name</th>
                <th className="pb-2">Plan</th>
                <th className="pb-2">Signup Date</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((f, i) => (
                <tr key={i} className="border-t border-[#14213D]/5">
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F5F0E6] text-[10px] font-semibold text-[#14213D]">
                        {f.name[0]}
                      </div>
                      <span className="text-[11px] font-medium text-[#14213D]">{f.name}</span>
                    </div>
                  </td>
                  <td className="py-2">
                    <span className={`rounded px-2 py-0.5 text-[10px] font-semibold ${PLAN_BADGE[f.plan]}`}>{f.plan}</span>
                  </td>
                  <td className="py-2 text-[10px] text-[#1F1F1F]/70">{f.date}</td>
                  <td className="py-2">
                    <span className={`rounded px-2 py-0.5 text-[10px] font-semibold ${STATUS_BADGE[f.status]}`}>{f.status}</span>
                  </td>
                  <td className="py-2">
                    <Link to="/firms"
                      className="inline-flex items-center gap-1 rounded border border-[#14213D]/15 bg-white px-2 py-0.5 text-[10px] font-semibold text-[#14213D] transition-colors hover:border-[#B8860B] hover:text-[#B8860B]">
                      <Eye className="h-3 w-3" /> View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>


        {/* Revenue chart — col 3 of 4 */}
        <section className="rounded-xl border border-[#14213D]/10 bg-white p-3.5">
            <div className="mb-1.5 flex items-center justify-between">
              <h2 className="flex items-center gap-1.5 text-xs font-semibold text-[#14213D]"
                  style={{ fontFamily: "'Libre Baskerville', serif" }}>
                <span className="flex h-5 w-5 items-center justify-center rounded bg-[#14213D]/5">
                  <BarChart3 className="h-3 w-3" />
                </span>
                Revenue Growth
              </h2>
              <button className="inline-flex items-center gap-0.5 rounded border border-[#14213D]/15 bg-white px-2 py-0.5 text-[10px] font-medium text-[#14213D]">
                12 Months <ChevronDown className="h-2.5 w-2.5" />
              </button>
            </div>
            <div className="h-[120px] w-full">
              <ResponsiveContainer>
                <LineChart data={REVENUE} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#14213D" strokeOpacity={0.06} />
                  <XAxis dataKey="m" tick={{ fontSize: 9, fill: "#1F1F1F80" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: "#1F1F1F80" }} axisLine={false} tickLine={false}
                    tickFormatter={(v) => v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}M` : `${v / 1000}K`} />
                  <Tooltip formatter={(v: number) => `PKR ${v.toLocaleString("en-PK")}`}
                    contentStyle={{ borderRadius: 6, borderColor: "#14213D22", fontSize: 11 }} />
                  <Line type="monotone" dataKey="v" stroke="#3B82F6" strokeWidth={2} dot={{ r: 2, fill: "#3B82F6" }} activeDot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

        {/* Firms by Plan — col 4 of 4 */}
        <section className="rounded-xl border border-[#14213D]/10 bg-white p-3.5">
            <h2 className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[#14213D]"
                style={{ fontFamily: "'Libre Baskerville', serif" }}>
              <span className="flex h-5 w-5 items-center justify-center rounded bg-[#14213D]/5">
                <BarChart3 className="h-3 w-3" />
              </span>
              Firms by Plan
            </h2>
            <div className="flex items-center gap-3">
              <div className="h-[110px] w-[110px] shrink-0">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={PLAN_MIX} outerRadius={50} dataKey="value" stroke="#fff" strokeWidth={1.5}>
                      {PLAN_MIX.map((p) => <Cell key={p.name} fill={p.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number, n) => [`${v}%`, n]} contentStyle={{ borderRadius: 6, fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1">
                <div className="mb-1 flex justify-between text-[9px] font-medium uppercase tracking-widest text-[#1F1F1F]/50">
                  <span>Plan</span><span>Firms</span>
                </div>
                <ul className="space-y-1.5">
                  {PLAN_MIX.map((p) => (
                    <li key={p.name} className="grid grid-cols-[1fr_auto] items-center gap-2 text-[10px]">
                      <span className="flex items-center gap-1.5 truncate text-[#1F1F1F]/75">
                        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: p.color }} />
                        <span className="truncate">{p.name}</span>
                      </span>
                      <span className="whitespace-nowrap font-semibold text-[#14213D]">
                        {p.firms} <span className="font-normal text-[#1F1F1F]/45">({p.value}%)</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-1.5 flex justify-between border-t border-[#14213D]/10 pt-1.5 text-[10px] font-semibold text-[#14213D]">
                  <span>Total</span><span>1,242</span>
                </div>
              </div>
            </div>
          </section>

      </div>

      {/* ── Bottom Stats Row ─────────────────────────────────────── */}
      <section className="mt-3 grid grid-cols-2 gap-3 rounded-xl border border-[#14213D]/10 bg-white p-3.5 md:grid-cols-3 xl:grid-cols-5">
        <MiniStat icon={Users}      tint="blue"    label="Total Users"               value="4,562" />
        <MiniStat icon={UserCheck}  tint="emerald" label="Active Users (Month)"      value="3,248"  delta="+9.2%" />
        <MiniStat icon={Briefcase}  tint="violet"  label="Total Cases"               value="128,542" />
        <MiniStat icon={Cloud}      tint="sky"     label="Storage Used"              value="256.8 GB" hint="/ 2 TB" />
        <MiniStat icon={ShieldCheck}tint="emerald" label="System Status"             value="Operational" small />
      </section>
    </AdminShell>
  );
}

/* ── Sub-components ──────────────────────────────────────────── */

function Kpi({ label, value, delta, cta, muted, icon: Icon, tint }: {
  label: string; value: string; delta?: string; cta?: string; muted?: boolean;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; tint: string;
}) {
  const t = TINTS[tint];
  return (
    <div className="rounded-xl border border-[#14213D]/10 bg-white p-3 transition-shadow hover:shadow-[0_8px_24px_-12px_rgba(20,33,61,0.3)]">
      <div className="flex items-start gap-2.5">
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${t.bg} ${t.fg}`}>
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-medium leading-tight text-[#1F1F1F]/55">{label}</div>
          <div className="mt-0.5 truncate text-sm font-bold text-[#14213D]"
               style={{ fontFamily: "'Libre Baskerville', serif" }}>{value}</div>
        </div>
      </div>
      {delta && (
        <div className={`mt-2 text-[10px] font-medium ${muted ? "text-rose-600" : "text-emerald-600"}`}>
          {muted ? delta : `↑ ${delta}`}
        </div>
      )}
      {cta && (
        <button className="mt-2 text-[10px] font-semibold text-blue-600 hover:text-[#14213D]">{cta}</button>
      )}
    </div>
  );
}

function MiniStat({ label, value, delta, hint, small, icon: Icon, tint }: {
  label: string; value: string; delta?: string; hint?: string; small?: boolean;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; tint: string;
}) {
  const t = TINTS[tint];
  return (
    <div className="flex items-center gap-2.5">
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${t.bg} ${t.fg}`}>
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <div className="text-[10px] text-[#1F1F1F]/55">{label}</div>
        <div className={`font-semibold text-[#14213D] ${small ? "text-[11px]" : "text-xs"}`}>
          {value}
          {hint  && <span className="ml-1 text-[9px] font-normal text-[#1F1F1F]/50">{hint}</span>}
          {delta && <span className="ml-1.5 text-[10px] font-medium text-emerald-600">↑ {delta}</span>}
        </div>
      </div>
    </div>
  );
}