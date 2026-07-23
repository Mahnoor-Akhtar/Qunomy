import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Building2,
  CreditCard,
  TrendingDown,
  UserPlus,
  Download,
  Calendar,
  ChevronDown,
  AlertTriangle,
  Activity,
  Zap,
  Eye,
  BarChart2,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import AdminShell from "@/components/dashboard/AdminShell";
import { toast } from "sonner";
import { exportToCSV } from "@/utils/export";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Analytics Overview — Qunomy Platform" },
      {
        name: "description",
        content:
          "Platform-wide insights and performance metrics for Qunomy administrators.",
      },
      { property: "og:title", content: "Analytics Overview — Qunomy" },
    ],
  }),
  component: ReportsPage,
});

// ─── Data ────────────────────────────────────────────────────────────────────

const REVENUE_DATA = [
  { m: "Apr '24", v: 1_200_000 }, { m: "May '24", v: 1_450_000 },
  { m: "Jun '24", v: 1_600_000 }, { m: "Jul '24", v: 1_750_000 },
  { m: "Aug '24", v: 1_820_000 }, { m: "Sep '24", v: 2_000_000 },
  { m: "Oct '24", v: 2_200_000 }, { m: "Nov '24", v: 2_400_000 },
  { m: "Dec '24", v: 2_550_000 }, { m: "Jan '25", v: 2_700_000 },
  { m: "Feb '25", v: 3_100_000 }, { m: "Mar '25", v: 3_800_000 },
  { m: "Apr '25", v: 4_400_000 }, { m: "May '25", v: 5_124_500 },
];

const CHURN_DATA = [
  { m: "Apr '24", v: 6.2 }, { m: "May '24", v: 5.8 },
  { m: "Jun '24", v: 5.1 }, { m: "Jul '24", v: 4.9 },
  { m: "Aug '24", v: 4.2 }, { m: "Sep '24", v: 3.8 },
  { m: "Oct '24", v: 3.5 }, { m: "Nov '24", v: 3.2 },
  { m: "Dec '24", v: 2.9 }, { m: "Jan '25", v: 2.6 },
  { m: "Feb '25", v: 2.4 }, { m: "Mar '25", v: 2.3 },
  { m: "Apr '25", v: 2.3 }, { m: "May '25", v: 2.23 },
];

const SIGNUPS_DATA = [
  { m: "Apr '24", v: 42 }, { m: "May '24", v: 55 },
  { m: "Jun '24", v: 61 }, { m: "Jul '24", v: 70 },
  { m: "Aug '24", v: 74 }, { m: "Sep '24", v: 88 },
  { m: "Oct '24", v: 95 }, { m: "Nov '24", v: 108 },
  { m: "Dec '24", v: 115 }, { m: "Jan '25", v: 125 },
  { m: "Feb '25", v: 130 }, { m: "Mar '25", v: 138 },
  { m: "Apr '25", v: 140 }, { m: "May '25", v: 142 },
];

const MRR_SIGNUP_DATA = [
  { m: "Apr '24", mrr: 1_200_000, signups: 42 },
  { m: "May '24", mrr: 1_450_000, signups: 55 },
  { m: "Jun '24", mrr: 1_600_000, signups: 61 },
  { m: "Jul '24", mrr: 1_750_000, signups: 70 },
  { m: "Aug '24", mrr: 1_820_000, signups: 74 },
  { m: "Sep '24", mrr: 2_000_000, signups: 88 },
  { m: "Oct '24", mrr: 2_200_000, signups: 95 },
  { m: "Nov '24", mrr: 2_400_000, signups: 108 },
  { m: "Dec '24", mrr: 2_550_000, signups: 115 },
  { m: "Jan '25", mrr: 2_700_000, signups: 125 },
  { m: "Feb '25", mrr: 3_100_000, signups: 130 },
  { m: "Mar '25", mrr: 3_800_000, signups: 138 },
  { m: "Apr '25", mrr: 4_400_000, signups: 140 },
  { m: "May '25", mrr: 5_124_500, signups: 142 },
];

const PLAN_MIX = [
  { name: "Free",       firms: 712, pct: 9.0,  color: "#94A3B8" },
  { name: "Basic",      firms: 398, pct: 28.5, color: "#3B82F6" },
  { name: "Pro",        firms: 610, pct: 41.0, color: "#8B5CF6" },
  { name: "Enterprise", firms: 268, pct: 21.5, color: "#F59E0B" },
];

const FEATURE_USAGE = [
  { feature: "Hearings & Reminders", icon: "📅", firms: 1102, pct: 88.3, color: "#3B82F6" },
  { feature: "Documents",            icon: "📄", firms: 1098, pct: 86.0, color: "#8B5CF6" },
  { feature: "Invoicing & Billing",  icon: "💳", firms: 883,  pct: 71.8, color: "#10B981" },
  { feature: "WhatsApp/SMS Reminders",icon: "💬",firms: 784,  pct: 62.8, color: "#F59E0B" },
  { feature: "Client Portal",        icon: "🌐", firms: 612,  pct: 46.0, color: "#F97316" },
  { feature: "Reports & Analytics",  icon: "📊", firms: 531,  pct: 41.9, color: "#EF4444" },
];

const ACTIVE_FIRMS = [
  { rank: 1, name: "Malik Law Chambers",      logins: 1_942, users: 10, cases: 234, plan: "Pro" },
  { rank: 2, name: "Khan & Associates",        logins: 1_573, users: 12, cases: 348, plan: "Basic" },
  { rank: 3, name: "Legal Vision Advocates",   logins: 1_236, users: 20, cases: 946, plan: "Pro" },
  { rank: 4, name: "Justice Partners",         logins: 878,   users: 8,  cases: 176, plan: "Basic" },
  { rank: 5, name: "Ahmad Legal Consultants",  logins: 864,   users: 15, cases: 362, plan: "Pro" },
];

const AT_RISK_FIRMS = [
  { rank: 1, name: "Rizvi Law Firm",           risk: "High",   lastActive: "12 May 2025", score: 87 },
  { rank: 2, name: "Siddiqui Law Associates",  risk: "High",   lastActive: "10 May 2025", score: 81 },
  { rank: 3, name: "Mehmood & Co.",            risk: "Medium", lastActive: "15 May 2025", score: 58 },
  { rank: 4, name: "Zafar & Co. Advocates",    risk: "Medium", lastActive: "11 May 2025", score: 54 },
  { rank: 5, name: "Al-Haq Legal",             risk: "Medium", lastActive: "12 May 2025", score: 49 },
];

const DATE_RANGES = ["7 Days", "30 Days", "90 Days", "This Year"];
const PERIOD_OPTIONS = ["Monthly", "Weekly", "Daily"];

const PLAN_BADGE: Record<string, string> = {
  Pro:        "bg-violet-100 text-violet-700",
  Basic:      "bg-blue-100 text-blue-700",
  Enterprise: "bg-amber-100 text-amber-700",
  Free:       "bg-slate-100 text-slate-600",
};

const RISK_BADGE: Record<string, string> = {
  High:   "bg-rose-100 text-rose-700",
  Medium: "bg-amber-100 text-amber-700",
  Low:    "bg-emerald-100 text-emerald-700",
};

const RISK_DOT: Record<string, string> = {
  High:   "bg-rose-500",
  Medium: "bg-amber-400",
  Low:    "bg-emerald-500",
};

// ─── Component ───────────────────────────────────────────────────────────────

function ReportsPage() {
  const [activeRange, setActiveRange] = useState("30 Days");
  const [revPeriod,   setRevPeriod]   = useState("Monthly");
  const [churnPeriod, setChurnPeriod] = useState("Monthly");
  const [signupPeriod,setSignupPeriod]= useState("Monthly");
  const [mrrPeriod,   setMrrPeriod]   = useState("Monthly");
  const [activeFirmRange, setActiveFirmRange] = useState("This Month");
  const [featureRange,    setFeatureRange]    = useState("This Month");
  const [atRiskRange,     setAtRiskRange]     = useState("This Month");

  return (
    <AdminShell
      active="analytics"
      title="Analytics Overview"
      subtitle="Platform-wide insights and performance metrics."
      headerRight={
        <div className="flex items-center gap-2">
          {/* Date range pills */}
          <div className="hidden items-center gap-1 rounded-xl border border-[#14213D]/12 bg-white p-1 sm:flex">
            {DATE_RANGES.map((r) => (
              <button
                key={r}
                onClick={() => setActiveRange(r)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  activeRange === r
                    ? "bg-[#14213D] text-[#F5F0E6] shadow-sm"
                    : "text-[#1F1F1F]/60 hover:text-[#14213D]"
                }`}
              >
                {r}
              </button>
            ))}
            <button className="flex items-center gap-1.5 rounded-lg border border-[#B8860B]/40 bg-[#B8860B]/10 px-3 py-1.5 text-xs font-medium text-[#B8860B]">
              <Calendar className="h-3 w-3" /> Custom Range
            </button>
          </div>
          {/* Export */}
          <button
            onClick={() => {
              exportToCSV(REVENUE_DATA, "platform_report", [
                { key: "m", label: "Month" },
                { key: "v", label: "Revenue" },
              ]);
              toast.success("Report exported successfully");
            }}
            className="flex items-center gap-2 rounded-xl border border-[#14213D]/15 bg-white px-4 py-2 text-sm font-semibold text-[#14213D] transition-all hover:border-[#B8860B] hover:text-[#B8860B]"
          >
            <Download className="h-4 w-4" /> Export Report
          </button>
        </div>
      }
    >
      {/* ── KPI Row ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        <KpiCard
          icon={Building2}
          tint="blue"
          label="Total Firms"
          value="1,248"
          delta="+18.6%"
          sub="vs previous 30 days"
          positive
        />
        <KpiCard
          icon={CreditCard}
          tint="violet"
          label="Active Subscriptions"
          value="956"
          delta="+16.2%"
          sub="vs previous 30 days"
          positive
        />
        <KpiCard
          icon={Activity}
          tint="emerald"
          label="Monthly Recurring Revenue"
          value="PKR 5,124,500"
          delta="+18.8%"
          sub="vs previous 30 days"
          positive
        />
        <KpiCard
          icon={UserPlus}
          tint="sky"
          label="New Signups"
          value="142"
          delta="+20.3%"
          sub="vs previous 30 days"
          positive
        />
        <KpiCard
          icon={TrendingDown}
          tint="rose"
          label="Churned Firms"
          value="27"
          delta="-3.1%"
          sub="vs previous 30 days"
          positive={false}
        />
        <KpiCard
          icon={Zap}
          tint="amber"
          label="Churn Rate"
          value="2.23%"
          delta="-0.48pp"
          sub="vs previous 30 days"
          positive
        />
      </div>

      {/* ── Row 1: Revenue + Plan Mix ─────────────────────────── */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-5">
        {/* Revenue area chart */}
        <section className="xl:col-span-3 rounded-2xl border border-[#14213D]/10 bg-white p-5">
          <ChartHeader
            title="Revenue Growth (PKR)"
            period={revPeriod}
            setPeriod={setRevPeriod}
          />
          <div className="mt-4 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#3B82F6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#14213D" strokeOpacity={0.05} />
                <XAxis dataKey="m" tick={{ fontSize: 10, fill: "#1F1F1F80" }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 10, fill: "#1F1F1F80" }}
                  axisLine={false} tickLine={false}
                  tickFormatter={(v) => v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}M` : `${v / 1000}K`}
                />
                <Tooltip
                  formatter={(v: number) => [`PKR ${v.toLocaleString("en-PK")}`, "Revenue"]}
                  contentStyle={{ borderRadius: 8, borderColor: "#14213D22", fontSize: 12 }}
                />
                <Area type="monotone" dataKey="v" stroke="#3B82F6" strokeWidth={2.5}
                  fill="url(#revGrad)" dot={false} activeDot={{ r: 5, fill: "#3B82F6" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Firms by Plan donut */}
        <section className="xl:col-span-2 rounded-2xl border border-[#14213D]/10 bg-white p-5">
          <h3 className="text-sm font-semibold text-[#14213D]" style={{ fontFamily: "'Libre Baskerville', serif" }}>
            Firms by Plan
          </h3>
          <div className="mt-3 flex items-center gap-4">
            <div className="h-[160px] w-[160px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PLAN_MIX}
                    innerRadius={52}
                    outerRadius={75}
                    dataKey="firms"
                    strokeWidth={2}
                    stroke="#fff"
                  >
                    {PLAN_MIX.map((p) => <Cell key={p.name} fill={p.color} />)}
                  </Pie>
                  <Tooltip
                    formatter={(v: number, n) => [v, n]}
                    contentStyle={{ borderRadius: 8, fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {PLAN_MIX.map((p) => (
                <div key={p.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-[#1F1F1F]/75">
                    <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
                    {p.name}
                  </span>
                  <span className="font-semibold text-[#14213D]">
                    {p.firms} <span className="font-normal text-[#1F1F1F]/50">({p.pct}%)</span>
                  </span>
                </div>
              ))}
              <div className="mt-3 flex items-center justify-between border-t border-[#14213D]/10 pt-2 text-xs">
                <span className="font-semibold text-[#14213D]">Total Firms</span>
                <span className="font-bold text-[#14213D]">1,988</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Row 2: Churn + Signups + MRR vs Signups ─────────── */}
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Churn Rate Trend */}
        <section className="rounded-2xl border border-[#14213D]/10 bg-white p-5">
          <ChartHeader title="Churn Rate Trend (%)" period={churnPeriod} setPeriod={setChurnPeriod} />
          <div className="mt-4 h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHURN_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="churnGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#EF4444" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#14213D" strokeOpacity={0.05} />
                <XAxis dataKey="m" tick={{ fontSize: 9, fill: "#1F1F1F80" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "#1F1F1F80" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={[0, 8]} />
                <Tooltip formatter={(v: number) => [`${v}%`, "Churn"]} contentStyle={{ borderRadius: 8, borderColor: "#14213D22", fontSize: 12 }} />
                <Area type="monotone" dataKey="v" stroke="#EF4444" strokeWidth={2}
                  fill="url(#churnGrad)" dot={false} activeDot={{ r: 4, fill: "#EF4444" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* New Signups Trend */}
        <section className="rounded-2xl border border-[#14213D]/10 bg-white p-5">
          <ChartHeader title="New Signups Trend" period={signupPeriod} setPeriod={setSignupPeriod} />
          <div className="mt-4 h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SIGNUPS_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="signupGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#10B981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#14213D" strokeOpacity={0.05} />
                <XAxis dataKey="m" tick={{ fontSize: 9, fill: "#1F1F1F80" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "#1F1F1F80" }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: number) => [v, "Signups"]} contentStyle={{ borderRadius: 8, borderColor: "#14213D22", fontSize: 12 }} />
                <Area type="monotone" dataKey="v" stroke="#10B981" strokeWidth={2}
                  fill="url(#signupGrad)" dot={false} activeDot={{ r: 4, fill: "#10B981" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* MRR vs New Signups dual-axis */}
        <section className="rounded-2xl border border-[#14213D]/10 bg-white p-5">
          <ChartHeader title="MRR vs New Signups" period={mrrPeriod} setPeriod={setMrrPeriod} />
          <div className="mb-2 flex items-center gap-4 text-[10px] font-medium text-[#1F1F1F]/60">
            <span className="flex items-center gap-1"><span className="h-2 w-4 rounded bg-[#8B5CF6]" /> MRR (PKR)</span>
            <span className="flex items-center gap-1"><span className="h-2 w-4 rounded bg-[#10B981]" /> New Signups</span>
          </div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MRR_SIGNUP_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#14213D" strokeOpacity={0.05} />
                <XAxis dataKey="m" tick={{ fontSize: 9, fill: "#1F1F1F80" }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fontSize: 9, fill: "#1F1F1F80" }} axisLine={false} tickLine={false}
                  tickFormatter={(v) => v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}M` : `${v / 1000}K`}
                />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 9, fill: "#1F1F1F80" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, borderColor: "#14213D22", fontSize: 12 }}
                  formatter={(v: number, name: string) =>
                    name === "mrr" ? [`PKR ${v.toLocaleString("en-PK")}`, "MRR"] : [v, "Signups"]
                  }
                />
                <Line yAxisId="left" type="monotone" dataKey="mrr" stroke="#8B5CF6" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                <Line yAxisId="right" type="monotone" dataKey="signups" stroke="#10B981" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* ── Row 3: Active Firms + Feature Usage + At-Risk ────── */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* Most Active Firms */}
        <section className="rounded-2xl border border-[#14213D]/10 bg-white p-5">
          <TableHeader
            title="Most Active Firms (By Total Logins)"
            range={activeFirmRange}
            setRange={setActiveFirmRange}
            options={["This Month", "Last 3 Months", "This Year"]}
          />
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-[10px] font-medium text-[#1F1F1F]/50">
                  <th className="pb-2 pr-3">#</th>
                  <th className="pb-2 pr-3">Firm Name</th>
                  <th className="pb-2 pr-3">Logins</th>
                  <th className="pb-2 pr-3">Users</th>
                  <th className="pb-2">Plan</th>
                </tr>
              </thead>
              <tbody>
                {ACTIVE_FIRMS.map((f) => (
                  <tr key={f.rank} className="border-t border-[#14213D]/5">
                    <td className="py-2.5 pr-3 font-semibold text-[#14213D]/40">{f.rank}</td>
                    <td className="py-2.5 pr-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F5F0E6] text-[10px] font-semibold text-[#14213D]">
                          {f.name[0]}
                        </div>
                        <span className="font-medium text-[#14213D] truncate max-w-[110px]">{f.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 pr-3 font-semibold text-[#14213D]">{f.logins.toLocaleString()}</td>
                    <td className="py-2.5 pr-3 text-[#1F1F1F]/70">{f.users}</td>
                    <td className="py-2.5">
                      <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${PLAN_BADGE[f.plan]}`}>{f.plan}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="mt-3 text-xs font-semibold text-[#B8860B] hover:text-[#14213D] transition-colors">
              View all firms →
            </button>
          </div>
        </section>

        {/* Feature Usage */}
        <section className="rounded-2xl border border-[#14213D]/10 bg-white p-5">
          <TableHeader
            title="Feature Usage (Platform Wide)"
            range={featureRange}
            setRange={setFeatureRange}
            options={["This Month", "Last 3 Months", "This Year"]}
          />
          <div className="mt-3 space-y-3.5">
            {FEATURE_USAGE.map((f) => (
              <div key={f.feature}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 font-medium text-[#1F1F1F]/80">
                    <span>{f.icon}</span>
                    {f.feature}
                  </span>
                  <span className="font-semibold text-[#14213D]">
                    {f.firms.toLocaleString()}
                    <span className="ml-1 font-normal text-[#1F1F1F]/50">({f.pct}%)</span>
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F5F0E6]">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${f.pct}%`, background: f.color }}
                  />
                </div>
              </div>
            ))}
            <button className="mt-1 text-xs font-semibold text-[#B8860B] hover:text-[#14213D] transition-colors">
              View detailed report →
            </button>
          </div>
        </section>

        {/* Firms at Risk */}
        <section className="rounded-2xl border border-[#14213D]/10 bg-white p-5">
          <TableHeader
            title="Firms at Risk (High Churn Risk)"
            range={atRiskRange}
            setRange={setAtRiskRange}
            options={["This Month", "Last 3 Months", "This Year"]}
          />
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-[10px] font-medium text-[#1F1F1F]/50">
                  <th className="pb-2 pr-2">#</th>
                  <th className="pb-2 pr-2">Firm</th>
                  <th className="pb-2 pr-2">Risk</th>
                  <th className="pb-2 pr-2">Last Active</th>
                  <th className="pb-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {AT_RISK_FIRMS.map((f) => (
                  <tr key={f.rank} className="border-t border-[#14213D]/5">
                    <td className="py-2.5 pr-2 font-semibold text-[#14213D]/40">{f.rank}</td>
                    <td className="py-2.5 pr-2 font-medium text-[#14213D] max-w-[100px]">
                      <span className="truncate block">{f.name}</span>
                    </td>
                    <td className="py-2.5 pr-2">
                      <span className={`flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold w-fit ${RISK_BADGE[f.risk]}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${RISK_DOT[f.risk]}`} />
                        {f.risk}
                      </span>
                    </td>
                    <td className="py-2.5 pr-2 text-[#1F1F1F]/60 whitespace-nowrap">{f.lastActive}</td>
                    <td className="py-2.5">
                      <button
                        onClick={() => toast.success(`Viewing ${f.name}`)}
                        className="flex items-center gap-1 rounded-md border border-[#14213D]/15 bg-white px-2 py-1 text-[10px] font-semibold text-[#14213D] transition-colors hover:border-[#B8860B] hover:text-[#B8860B]"
                      >
                        <Eye className="h-3 w-3" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="mt-3 text-xs font-semibold text-[#B8860B] hover:text-[#14213D] transition-colors">
              View all at-risk firms →
            </button>
          </div>
        </section>
      </div>

      {/* ── Footer note ──────────────────────────────────────── */}
      <p className="mt-6 text-[11px] text-[#1F1F1F]/40 text-center">
        All amounts are in PKR. Data is as of 21 May 2025, 10:15 AM.
      </p>
    </AdminShell>
  );
}

// ─── Small helpers ────────────────────────────────────────────────────────────

const TINTS: Record<string, { bg: string; fg: string }> = {
  blue:   { bg: "bg-blue-100",   fg: "text-blue-600" },
  violet: { bg: "bg-violet-100", fg: "text-violet-600" },
  emerald:{ bg: "bg-emerald-100",fg: "text-emerald-600" },
  sky:    { bg: "bg-sky-100",    fg: "text-sky-600" },
  rose:   { bg: "bg-rose-100",   fg: "text-rose-600" },
  amber:  { bg: "bg-amber-100",  fg: "text-amber-600" },
};

function KpiCard({
  icon: Icon, tint, label, value, delta, sub, positive,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  tint: string; label: string; value: string;
  delta: string; sub: string; positive: boolean;
}) {
  const t = TINTS[tint];
  return (
    <div className="rounded-2xl border border-[#14213D]/10 bg-white p-4 transition-shadow hover:shadow-[0_10px_30px_-16px_rgba(20,33,61,0.25)]">
      <div className="flex items-start gap-3">
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${t.bg} ${t.fg}`}>
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-medium leading-snug text-[#1F1F1F]/55">{label}</div>
          <div className="mt-1 truncate text-base font-bold text-[#14213D]" style={{ fontFamily: "'Libre Baskerville', serif" }}>
            {value}
          </div>
        </div>
      </div>
      <div className={`mt-2.5 flex items-center gap-1 text-[10px] font-semibold ${positive ? "text-emerald-600" : "text-rose-500"}`}>
        {positive ? "↑" : "↓"} {delta}
        <span className="font-normal text-[#1F1F1F]/45">{sub}</span>
      </div>
    </div>
  );
}

function ChartHeader({
  title, period, setPeriod,
}: { title: string; period: string; setPeriod: (p: string) => void }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <h3 className="text-sm font-semibold text-[#14213D]" style={{ fontFamily: "'Libre Baskerville', serif" }}>
        {title}
      </h3>
      <div className="relative">
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="appearance-none rounded-lg border border-[#14213D]/15 bg-white py-1 pl-2.5 pr-6 text-[11px] font-medium text-[#14213D] outline-none focus:border-[#B8860B] cursor-pointer"
        >
          {PERIOD_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 text-[#1F1F1F]/50" />
      </div>
    </div>
  );
}

function TableHeader({
  title, range, setRange, options,
}: { title: string; range: string; setRange: (r: string) => void; options: string[] }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <h3 className="text-sm font-semibold text-[#14213D] leading-tight" style={{ fontFamily: "'Libre Baskerville', serif" }}>
        {title}
      </h3>
      <div className="relative shrink-0">
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="appearance-none rounded-lg border border-[#14213D]/15 bg-white py-1 pl-2.5 pr-6 text-[11px] font-medium text-[#14213D] outline-none focus:border-[#B8860B] cursor-pointer"
        >
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 text-[#1F1F1F]/50" />
      </div>
    </div>
  );
}
