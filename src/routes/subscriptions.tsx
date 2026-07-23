import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Plus, Pencil, Trash2, Filter, Download,
  RotateCw, TrendingUp, TrendingDown, ChevronLeft, ChevronRight,
  Search, X, CheckCircle2, AlertCircle,
  RefreshCw, AlertTriangle,
} from "lucide-react";
import AdminShell from "@/components/dashboard/AdminShell";
import { toast } from "sonner";
import { exportToCSV } from "@/utils/export";

/* ── Types ───────────────────────────────────────────────────── */

type Plan = {
  id: string; name: string; sub: string; monthly: number; yearly: number;
  users: string; cases: string; storage: string; features: string;
  status: "Active" | "Inactive"; iconColor: string; subscribers: number;
};

type Transaction = {
  id: string; firm: string; plan: string; amount: number; date: string;
  status: "Paid" | "Pending" | "Refunded" | "N/A";
  method: string; invoice: string; cycle: string;
};

type FailedPayment = {
  id: string; firm: string; plan: string; amount: number;
  date: string; reason: string; retries: number;
};

/* ── Mock data ───────────────────────────────────────────────── */

const INITIAL_PLANS: Plan[] = [
  { id: "free",       name: "Free",        sub: "For individual lawyers",      monthly: 0,      yearly: 0,      users: "1",         cases: "Up to 20",    storage: "1 GB",   features: "Basic case management, Calendar, Documents",                         status: "Active", iconColor: "bg-emerald-500", subscribers: 63  },
  { id: "basic",      name: "Basic",       sub: "For small law firms",         monthly: 2999,   yearly: 28799,  users: "Up to 5",   cases: "Up to 200",   storage: "10 GB",  features: "All Free + Clients, Invoicing, WhatsApp reminders",                   status: "Active", iconColor: "bg-blue-500",    subscribers: 140 },
  { id: "pro",        name: "Professional",sub: "For growing law firms",       monthly: 5999,   yearly: 57599,  users: "Up to 20",  cases: "Up to 1,000", storage: "50 GB",  features: "All Basic + Team roles, Reports, Bulk import/export",                 status: "Active", iconColor: "bg-violet-500",  subscribers: 437 },
  { id: "business",   name: "Business",    sub: "For established firms",       monthly: 8999,   yearly: 86399,  users: "Up to 50",  cases: "Up to 5,000", storage: "100 GB", features: "All Pro + Priority support, Custom domain, Advanced analytics",       status: "Active", iconColor: "bg-amber-500",   subscribers: 356 },
  { id: "enterprise", name: "Enterprise",  sub: "For large organisations",     monthly: 14999,  yearly: 143999, users: "Unlimited", cases: "Unlimited",   storage: "200 GB", features: "All Business + API access, SSO, Dedicated account manager",           status: "Active", iconColor: "bg-rose-500",    subscribers: 246 },
];

const TRANSACTIONS: Transaction[] = [
  { id: "t1",  firm: "Malik Law Chambers",      plan: "Business",     amount: 8999,   date: "21 May 2025, 10:32 AM", status: "Paid",     method: "JazzCash",      invoice: "INV-2025-1028", cycle: "Monthly" },
  { id: "t2",  firm: "Khan & Associates",        plan: "Professional", amount: 57599,  date: "20 May 2025, 09:14 AM", status: "Paid",     method: "Bank Transfer", invoice: "INV-2025-1027", cycle: "Yearly"  },
  { id: "t3",  firm: "Legal Vision Advocates",   plan: "Enterprise",   amount: 143999, date: "20 May 2025, 08:05 AM", status: "Paid",     method: "Bank Transfer", invoice: "INV-2025-1026", cycle: "Yearly"  },
  { id: "t4",  firm: "Ahmad Legal Consultants",  plan: "Basic",        amount: 2999,   date: "19 May 2025, 04:45 PM", status: "Paid",     method: "EasyPaisa",     invoice: "INV-2025-1024", cycle: "Monthly" },
  { id: "t5",  firm: "Justice Partners",         plan: "Professional", amount: 5999,   date: "19 May 2025, 11:08 AM", status: "Paid",     method: "JazzCash",      invoice: "INV-2025-1023", cycle: "Monthly" },
  { id: "t6",  firm: "Siddiqui Law Associates",  plan: "Basic",        amount: 2999,   date: "18 May 2025, 06:21 PM", status: "Paid",     method: "EasyPaisa",     invoice: "INV-2025-1020", cycle: "Monthly" },
  { id: "t7",  firm: "Rizvi Law Firm",           plan: "Business",     amount: 86399,  date: "18 May 2025, 10:11 AM", status: "Refunded", method: "JazzCash",      invoice: "INV-2025-1019", cycle: "Yearly"  },
  { id: "t8",  firm: "Zafar & Co. Advocates",    plan: "Professional", amount: 5999,   date: "17 May 2025, 02:33 PM", status: "Paid",     method: "JazzCash",      invoice: "INV-2025-1015", cycle: "Monthly" },
  { id: "t9",  firm: "Al-Haq Legal",             plan: "Basic",        amount: 2999,   date: "17 May 2025, 10:50 AM", status: "Pending",  method: "EasyPaisa",     invoice: "INV-2025-1014", cycle: "Monthly" },
  { id: "t10", firm: "Mehmood & Co.",            plan: "Free",         amount: 0,      date: "16 May 2025, 09:00 AM", status: "N/A",      method: "N/A",           invoice: "—",             cycle: "—"       },
];

const INITIAL_FAILED: FailedPayment[] = [
  { id: "f1", firm: "Al-Haq Legal",          plan: "Professional", amount: 5999,  date: "21 May 2025", reason: "Retry limit exceeded", retries: 3 },
  { id: "f2", firm: "Mehmood & Co.",         plan: "Basic",        amount: 2999,  date: "20 May 2025", reason: "Card declined",         retries: 2 },
  { id: "f3", firm: "Bilal Law Associates",  plan: "Business",     amount: 8999,  date: "19 May 2025", reason: "Insufficient funds",    retries: 1 },
  { id: "f4", firm: "Qureshi & Partners",    plan: "Basic",        amount: 2999,  date: "18 May 2025", reason: "Bank server error",     retries: 2 },
  { id: "f5", firm: "Farooq Law Offices",    plan: "Professional", amount: 5999,  date: "17 May 2025", reason: "Card expired",          retries: 3 },
  { id: "f6", firm: "Aslam Legal Services",  plan: "Basic",        amount: 2999,  date: "16 May 2025", reason: "CVV mismatch",          retries: 1 },
];

const BILLING_STATS = [
  { label: "Total Revenue (May)",   value: "PKR 21,48,200", delta: "+18.6%", up: true,  color: "emerald" },
  { label: "Successful Payments",   value: "978",            delta: "+10.5%", up: true,  color: "blue"    },
  { label: "Failed Payments",       value: "6",              delta: "-14.3%", up: false, color: "rose"    },
  { label: "Refunds Issued",        value: "1",              delta: "-50%",   up: false, color: "violet"  },
  { label: "Active Subscriptions",  value: "982",            delta: "+8.7%",  up: true,  color: "amber"   },
  { label: "MRR",                   value: "PKR 54,92,000",  delta: "+15.3%", up: true,  color: "emerald" },
];

const PLAN_REVENUE = [
  { plan: "Enterprise",   firms: 246, revenue: "PKR 35,43,554", pct: 65 },
  { plan: "Business",     firms: 356, revenue: "PKR 80,54,244",  pct: 85 },
  { plan: "Professional", firms: 437, revenue: "PKR 26,19,563", pct: 48 },
  { plan: "Basic",        firms: 140, revenue: "PKR 4,19,860",  pct: 22 },
  { plan: "Free",         firms: 63,  revenue: "PKR 0",          pct: 0  },
];

const PLAN_COLORS: Record<string, string> = {
  Enterprise:   "bg-rose-500",
  Business:     "bg-amber-500",
  Professional: "bg-violet-500",
  Basic:        "bg-blue-500",
  Free:         "bg-emerald-400",
};

const TX_STATUS_STYLE: Record<string, string> = {
  Paid:     "bg-emerald-100 text-emerald-700",
  Pending:  "bg-amber-100 text-amber-700",
  Refunded: "bg-violet-100 text-violet-700",
  "N/A":    "bg-gray-100 text-gray-500",
};

type Tab = "Subscription Plans" | "Payment Transactions" | "Failed Payments" | "Billing Overview";
const TABS: Tab[] = ["Subscription Plans", "Payment Transactions", "Failed Payments", "Billing Overview"];

/* ── Main component ─────────────────────────────────────────── */

function SubscriptionsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Subscription Plans");
  const [plans, setPlans]         = useState<Plan[]>(INITIAL_PLANS);
  const [failedList, setFailedList] = useState<FailedPayment[]>(INITIAL_FAILED);
  const [retryingId, setRetryingId] = useState<string | null>(null);
  const [searchTx, setSearchTx]   = useState("");
  const [searchFailed, setSearchFailed] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [newPlan, setNewPlan]     = useState({ name: "", sub: "", monthly: 0, yearly: 0, users: "5", cases: "100", storage: "10 GB", features: "" });

  const filteredTx = useMemo(() =>
    TRANSACTIONS.filter((t) =>
      !searchTx ||
      t.firm.toLowerCase().includes(searchTx.toLowerCase()) ||
      t.invoice.toLowerCase().includes(searchTx.toLowerCase()) ||
      t.plan.toLowerCase().includes(searchTx.toLowerCase())
    ), [searchTx]);

  const filteredFailed = useMemo(() =>
    failedList.filter((f) =>
      !searchFailed ||
      f.firm.toLowerCase().includes(searchFailed.toLowerCase()) ||
      f.plan.toLowerCase().includes(searchFailed.toLowerCase())
    ), [failedList, searchFailed]);

  const handleRetry = async (item: FailedPayment) => {
    setRetryingId(item.id);
    await new Promise((r) => setTimeout(r, 900));
    setFailedList((prev) => prev.filter((x) => x.id !== item.id));
    setRetryingId(null);
    toast.success(`Retry initiated for ${item.firm} — PKR ${item.amount.toLocaleString()}`);
  };

  const handleAddPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlan.name) { toast.error("Plan name is required"); return; }
    
    if (editingPlanId) {
      setPlans(prev => prev.map(p => p.id === editingPlanId ? { ...p, ...newPlan, monthly: Number(newPlan.monthly), yearly: Number(newPlan.yearly) } : p));
      toast.success(`Plan "${newPlan.name}" updated`);
    } else {
      setPlans((p) => [...p, {
        id: String(Date.now()), name: newPlan.name, sub: newPlan.sub || "Custom plan",
        monthly: Number(newPlan.monthly), yearly: Number(newPlan.yearly),
        users: newPlan.users, cases: newPlan.cases, storage: newPlan.storage,
        features: newPlan.features || "Standard features", status: "Active",
        iconColor: "bg-indigo-500", subscribers: 0,
      }]);
      toast.success(`Plan "${newPlan.name}" added`);
    }
    
    setShowAddModal(false);
    setEditingPlanId(null);
    setNewPlan({ name: "", sub: "", monthly: 0, yearly: 0, users: "5", cases: "100", storage: "10 GB", features: "" });
  };

  return (
    <AdminShell
      active="subs"
      title="Subscriptions & Billing"
      subtitle="Manage subscription plans, pricing and all billing transactions."
    >
      {/* ── Tab bar ───────────────────────────────────────── */}
      <div className="mb-5 flex items-center gap-1 rounded-xl border border-[#14213D]/10 bg-white p-1.5">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`flex-1 rounded-lg py-2 px-3 text-xs font-semibold transition-all ${
              activeTab === t
                ? "bg-[#14213D] text-[#F5F0E6] shadow-sm"
                : "text-[#1F1F1F]/55 hover:bg-[#F5F0E6] hover:text-[#14213D]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════
           TAB 1: Subscription Plans
      ══════════════════════════════════════════════════════ */}
      {activeTab === "Subscription Plans" && (
        <section className="rounded-2xl border border-[#14213D]/10 bg-white">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#14213D]/8 px-5 py-4">
            <div>
              <h2 className="text-sm font-bold text-[#14213D]" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                Subscription Plans
              </h2>
              <p className="mt-0.5 text-[11px] text-[#1F1F1F]/50">Create and manage all subscription tiers and pricing.</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#14213D] px-4 py-2 text-xs font-semibold text-[#F5F0E6] transition-colors hover:bg-[#B8860B]"
            >
              <Plus className="h-3.5 w-3.5" /> Add New Plan
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-[#14213D]/8 bg-[#F5F0E6]/30 text-left text-[10px] font-semibold uppercase tracking-wider text-[#1F1F1F]/50">
                  <th className="px-3 py-2.5">Plan</th>
                  <th className="px-3 py-2.5">Monthly (PKR)</th>
                  <th className="px-3 py-2.5">
                    Yearly (PKR) <span className="ml-1 rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold normal-case text-emerald-700">Save 20%</span>
                  </th>
                  <th className="px-3 py-2.5">Users</th>
                  <th className="px-3 py-2.5">Cases</th>
                  <th className="px-3 py-2.5">Storage</th>
                  <th className="px-3 py-2.5">Subscribers</th>
                  <th className="px-3 py-2.5">Key Features</th>
                  <th className="px-3 py-2.5">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#14213D]/5">
                {plans.map((p) => (
                  <tr key={p.id} className="transition-colors hover:bg-[#F5F0E6]/30">
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${p.iconColor} text-xs font-bold text-white shadow-sm`}>
                          {p.name[0]}
                        </div>
                        <div>
                          <div className="font-bold text-[#14213D]">{p.name}</div>
                          <div className="text-[10px] text-[#1F1F1F]/50">{p.sub}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="font-semibold text-[#14213D]">{p.monthly > 0 ? `PKR ${p.monthly.toLocaleString()}` : "Free"}</div>
                      {p.monthly > 0 && <div className="text-[10px] text-[#1F1F1F]/45">/ month</div>}
                    </td>
                    <td className="px-3 py-3">
                      <div className="font-semibold text-[#14213D]">{p.yearly > 0 ? `PKR ${p.yearly.toLocaleString()}` : "Free"}</div>
                      {p.yearly > 0 && <div className="text-[10px] text-[#1F1F1F]/45">/ year</div>}
                    </td>
                    <td className="px-3 py-3 font-medium text-[#14213D]">{p.users}</td>
                    <td className="px-3 py-3 font-medium text-[#14213D]">{p.cases}</td>
                    <td className="px-3 py-3 font-medium text-[#14213D]">{p.storage}</td>
                    <td className="px-3 py-3">
                      <span className="font-bold text-[#14213D]">{p.subscribers.toLocaleString()}</span>
                      <span className="ml-1 text-[10px] text-[#1F1F1F]/40">firms</span>
                    </td>
                    <td className="max-w-[200px] px-3 py-3 text-[10px] text-[#1F1F1F]/60">{p.features}</td>
                    <td className="px-3 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${p.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => {
                          setNewPlan({ name: p.name, sub: p.sub, monthly: p.monthly, yearly: p.yearly, users: p.users, cases: p.cases, storage: p.storage, features: p.features });
                          setEditingPlanId(p.id);
                          setShowAddModal(true);
                        }}
                          className="rounded-lg border border-[#14213D]/10 p-1.5 text-[#14213D]/40 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => { setPlans((prev) => prev.filter((x) => x.id !== p.id)); toast.success(`Plan "${p.name}" deleted`); }}
                          className="rounded-lg border border-[#14213D]/10 p-1.5 text-[#14213D]/40 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-[#14213D]/8 px-5 py-3 text-[10px] text-[#1F1F1F]/40">All prices are in Pakistani Rupees (PKR) · VAT / GST not included</div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
           TAB 2: Payment Transactions
      ══════════════════════════════════════════════════════ */}
      {activeTab === "Payment Transactions" && (
        <section className="rounded-2xl border border-[#14213D]/10 bg-white">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#14213D]/8 px-5 py-4">
            <div>
              <h2 className="text-sm font-bold text-[#14213D]" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                Payment Transactions
              </h2>
              <p className="mt-0.5 text-[11px] text-[#1F1F1F]/50">All subscription payments, invoices and receipts.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#1F1F1F]/40" />
                <input
                  value={searchTx}
                  onChange={(e) => setSearchTx(e.target.value)}
                  placeholder="Search firm, plan, invoice…"
                  className="h-8 w-52 rounded-lg border border-[#14213D]/15 bg-[#F5F0E6]/30 pl-8 pr-3 text-xs outline-none placeholder:text-[#1F1F1F]/40 focus:border-[#B8860B]"
                />
              </div>
              <button className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#14213D]/15 bg-white px-3 text-xs font-medium text-[#14213D] hover:border-[#B8860B] hover:text-[#B8860B] transition-colors">
                <Filter className="h-3.5 w-3.5" /> Filter
              </button>
              <button onClick={() => {
                exportToCSV(filteredTx, "payment_transactions", [
                  { key: "firm", label: "Firm Name" },
                  { key: "plan", label: "Plan" },
                  { key: "cycle", label: "Cycle" },
                  { key: "amount", label: "Amount (PKR)" },
                  { key: "date", label: "Date & Time" },
                  { key: "status", label: "Status" },
                  { key: "method", label: "Method" },
                  { key: "invoice", label: "Invoice" },
                ]);
                toast.success("Transactions exported");
              }}
                className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#14213D]/15 bg-white px-3 text-xs font-medium text-[#14213D] hover:border-[#B8860B] hover:text-[#B8860B] transition-colors">
                <Download className="h-3.5 w-3.5" /> Export CSV
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-[#14213D]/8 bg-[#F5F0E6]/30 text-left text-[10px] font-semibold uppercase tracking-wider text-[#1F1F1F]/50">
                  <th className="px-3 py-2.5">Firm Name</th>
                  <th className="px-3 py-2.5">Plan</th>
                  <th className="px-3 py-2.5">Cycle</th>
                  <th className="px-3 py-2.5">Amount (PKR)</th>
                  <th className="px-3 py-2.5">Date & Time</th>
                  <th className="px-3 py-2.5">Status</th>
                  <th className="px-3 py-2.5">Method</th>
                  <th className="px-3 py-2.5">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#14213D]/5">
                {filteredTx.map((t) => (
                  <tr key={t.id} className="transition-colors hover:bg-[#F5F0E6]/30">
                    <td className="px-3 py-3 font-semibold text-[#14213D]">{t.firm}</td>
                    <td className="px-3 py-3">
                      <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                        t.plan === "Enterprise"   ? "bg-rose-100 text-rose-700" :
                        t.plan === "Business"     ? "bg-amber-100 text-amber-700" :
                        t.plan === "Professional" ? "bg-violet-100 text-violet-700" :
                        t.plan === "Basic"        ? "bg-blue-100 text-blue-700" :
                        "bg-emerald-100 text-emerald-700"
                      }`}>{t.plan}</span>
                    </td>
                    <td className="px-3 py-3 text-[#1F1F1F]/60">{t.cycle}</td>
                    <td className="px-3 py-3 font-bold text-[#14213D]">
                      {t.amount > 0 ? `PKR ${t.amount.toLocaleString()}` : <span className="text-[#1F1F1F]/40">—</span>}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-[#1F1F1F]/60">{t.date}</td>
                    <td className="px-3 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${TX_STATUS_STYLE[t.status]}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      {t.method !== "N/A"
                        ? <span className="rounded-md bg-[#14213D]/8 px-2 py-0.5 text-[10px] font-medium text-[#14213D]">{t.method}</span>
                        : <span className="text-[#1F1F1F]/40">—</span>}
                    </td>
                    <td className="px-3 py-3">
                      {t.invoice !== "—"
                        ? <button onClick={() => toast.info(`Downloading ${t.invoice}`)} className="inline-flex items-center gap-1 text-blue-600 hover:underline"><Download className="h-3 w-3" />{t.invoice}</button>
                        : <span className="text-[#1F1F1F]/40">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#14213D]/8 px-5 py-3 text-[10px] text-[#1F1F1F]/50">
            <span>Showing 1–{filteredTx.length} of 1,248 transactions</span>
            <div className="flex items-center gap-1">
              <PagerBtn><ChevronLeft className="h-3 w-3" /></PagerBtn>
              <PagerBtn active>1</PagerBtn>
              <PagerBtn>2</PagerBtn>
              <PagerBtn>3</PagerBtn>
              <span className="px-1">…</span>
              <PagerBtn>125</PagerBtn>
              <PagerBtn><ChevronRight className="h-3 w-3" /></PagerBtn>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
           TAB 3: Failed Payments
      ══════════════════════════════════════════════════════ */}
      {activeTab === "Failed Payments" && (
        <section className="rounded-2xl border border-[#14213D]/10 bg-white">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#14213D]/8 px-5 py-4">
            <div className="flex items-center gap-2">
              <div>
                <h2 className="flex items-center gap-2 text-sm font-bold text-[#14213D]" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                  Failed Payments
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[10px] font-bold text-white">
                    {filteredFailed.length}
                  </span>
                </h2>
                <p className="mt-0.5 text-[11px] text-[#1F1F1F]/50">Payments that require retry or manual resolution.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#1F1F1F]/40" />
                <input
                  value={searchFailed}
                  onChange={(e) => setSearchFailed(e.target.value)}
                  placeholder="Search firm or plan…"
                  className="h-8 w-48 rounded-lg border border-[#14213D]/15 bg-[#F5F0E6]/30 pl-8 pr-3 text-xs outline-none placeholder:text-[#1F1F1F]/40 focus:border-[#B8860B]"
                />
              </div>
              <button onClick={() => {
                exportToCSV(filteredFailed, "failed_payments", [
                  { key: "firm", label: "Firm Name" },
                  { key: "plan", label: "Plan" },
                  { key: "amount", label: "Amount (PKR)" },
                  { key: "date", label: "Failed Date" },
                  { key: "reason", label: "Failure Reason" },
                  { key: "retries", label: "Retries" },
                ]);
                toast.success("Exported failed payments");
              }}
                className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#14213D]/15 bg-white px-3 text-xs font-medium text-[#14213D] hover:border-[#B8860B] transition-colors">
                <Download className="h-3.5 w-3.5" /> Export
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-[#14213D]/8 bg-[#F5F0E6]/30 text-left text-[10px] font-semibold uppercase tracking-wider text-[#1F1F1F]/50">
                  <th className="px-3 py-2.5">Firm Name</th>
                  <th className="px-3 py-2.5">Plan</th>
                  <th className="px-3 py-2.5">Amount (PKR)</th>
                  <th className="px-3 py-2.5">Failed Date</th>
                  <th className="px-3 py-2.5">Failure Reason</th>
                  <th className="px-5 py-3 text-center">Retries</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#14213D]/5">
                {filteredFailed.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-sm text-[#1F1F1F]/40">
                      <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-emerald-400" />
                      No failed payments — all clear!
                    </td>
                  </tr>
                ) : filteredFailed.map((f) => (
                  <tr key={f.id} className="transition-colors hover:bg-rose-50/30">
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-100 text-[10px] font-bold text-rose-700">
                          {f.firm[0]}
                        </div>
                        <span className="font-semibold text-[#14213D]">{f.firm}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span className="rounded-md bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-700">{f.plan}</span>
                    </td>
                    <td className="px-3 py-3 font-bold text-[#14213D]">PKR {f.amount.toLocaleString()}</td>
                    <td className="px-3 py-3 text-[#1F1F1F]/60">{f.date}</td>
                    <td className="px-3 py-3">
                      <span className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700">
                        <AlertTriangle className="h-2.5 w-2.5" /> {f.reason}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${f.retries >= 3 ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"}`}>
                        {f.retries}/3
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <button
                        disabled={retryingId === f.id || f.retries >= 3}
                        onClick={() => handleRetry(f)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-[10px] font-semibold text-blue-700 transition-colors hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {retryingId === f.id
                          ? <><RotateCw className="h-3 w-3 animate-spin" /> Retrying…</>
                          : <><RefreshCw className="h-3 w-3" /> Retry</>}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredFailed.length > 0 && (
            <div className="border-t border-[#14213D]/8 px-5 py-3 text-[10px] text-[#1F1F1F]/40">
              Firms with 3/3 retries exhausted require manual resolution via support.
            </div>
          )}
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
           TAB 4: Billing Overview
      ══════════════════════════════════════════════════════ */}
      {activeTab === "Billing Overview" && (
        <div className="space-y-5">
          {/* KPI stat cards */}
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
            {BILLING_STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-[#14213D]/10 bg-white p-4">
                <div className="text-[10px] font-medium text-[#1F1F1F]/55">{s.label}</div>
                <div className="mt-1.5 text-lg font-bold text-[#14213D]" style={{ fontFamily: "'Libre Baskerville', serif" }}>{s.value}</div>
                <div className={`mt-2 flex items-center gap-1 text-[10px] font-semibold ${s.up ? "text-emerald-600" : "text-rose-600"}`}>
                  {s.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {s.delta} vs last month
                </div>
              </div>
            ))}
          </div>

          {/* Revenue by Plan table */}
          <section className="rounded-2xl border border-[#14213D]/10 bg-white">
            <div className="border-b border-[#14213D]/8 px-5 py-4">
              <h2 className="text-sm font-bold text-[#14213D]" style={{ fontFamily: "'Libre Baskerville', serif" }}>Revenue by Plan</h2>
              <p className="mt-0.5 text-[11px] text-[#1F1F1F]/50">Monthly recurring revenue breakdown per subscription tier.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="border-b border-[#14213D]/8 bg-[#F5F0E6]/30 text-left text-[10px] font-semibold uppercase tracking-wider text-[#1F1F1F]/50">
                    <th className="px-3 py-2.5">Plan</th>
                    <th className="px-3 py-2.5">Active Firms</th>
                    <th className="px-3 py-2.5">Monthly Revenue</th>
                    <th className="px-3 py-2.5">Revenue Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#14213D]/5">
                  {PLAN_REVENUE.map((r) => (
                    <tr key={r.plan} className="hover:bg-[#F5F0E6]/30">
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <span className={`h-2.5 w-2.5 rounded-full ${PLAN_COLORS[r.plan]}`} />
                          <span className="font-semibold text-[#14213D]">{r.plan}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 font-medium text-[#14213D]">{r.firms.toLocaleString()}</td>
                      <td className="px-3 py-3 font-bold text-[#14213D]">{r.revenue}</td>
                      <td className="px-3 py-3 w-56">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 rounded-full bg-[#14213D]/8 overflow-hidden">
                            <div className={`h-full rounded-full ${PLAN_COLORS[r.plan]}`} style={{ width: `${r.pct}%` }} />
                          </div>
                          <span className="w-8 text-right font-semibold text-[#14213D]">{r.pct}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-[#14213D]/8 px-5 py-3 text-[10px] text-[#1F1F1F]/40">All figures are in PKR · Updated: 21 May 2025</div>
          </section>

          {/* Monthly summary table */}
          <section className="rounded-2xl border border-[#14213D]/10 bg-white">
            <div className="border-b border-[#14213D]/8 px-5 py-4">
              <h2 className="text-sm font-bold text-[#14213D]" style={{ fontFamily: "'Libre Baskerville', serif" }}>Monthly Billing Summary</h2>
              <p className="mt-0.5 text-[11px] text-[#1F1F1F]/50">Aggregated billing metrics for the last 6 months.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="border-b border-[#14213D]/8 bg-[#F5F0E6]/30 text-left text-[10px] font-semibold uppercase tracking-wider text-[#1F1F1F]/50">
                    <th className="px-3 py-2.5">Month</th>
                    <th className="px-3 py-2.5">Total Revenue</th>
                    <th className="px-3 py-2.5">Successful Txns</th>
                    <th className="px-3 py-2.5">Failed Txns</th>
                    <th className="px-3 py-2.5">Refunds</th>
                    <th className="px-3 py-2.5">Net Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#14213D]/5">
                  {[
                    { month: "May 2025", revenue: "PKR 21,48,200", success: 978, failed: 6,  refunds: 1, net: "PKR 20,39,201" },
                    { month: "Apr 2025", revenue: "PKR 18,12,400", success: 862, failed: 9,  refunds: 2, net: "PKR 17,09,002" },
                    { month: "Mar 2025", revenue: "PKR 16,44,000", success: 784, failed: 11, refunds: 3, net: "PKR 15,58,999" },
                    { month: "Feb 2025", revenue: "PKR 14,28,600", success: 701, failed: 14, refunds: 2, net: "PKR 13,40,602" },
                    { month: "Jan 2025", revenue: "PKR 12,80,500", success: 644, failed: 18, refunds: 4, net: "PKR 11,97,504" },
                    { month: "Dec 2024", revenue: "PKR 11,96,200", success: 598, failed: 21, refunds: 3, net: "PKR 11,02,999" },
                  ].map((row) => (
                    <tr key={row.month} className="hover:bg-[#F5F0E6]/30">
                      <td className="px-3 py-3 font-semibold text-[#14213D]">{row.month}</td>
                      <td className="px-3 py-3 font-bold text-[#14213D]">{row.revenue}</td>
                      <td className="px-3 py-3">
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                          <CheckCircle2 className="h-3 w-3" /> {row.success}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <span className="inline-flex items-center gap-1 font-semibold text-rose-600">
                          <AlertCircle className="h-3 w-3" /> {row.failed}
                        </span>
                      </td>
                      <td className="px-3 py-3 font-medium text-violet-600">{row.refunds}</td>
                      <td className="px-3 py-3 font-bold text-[#14213D]">{row.net}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {/* ── Add/Edit Plan Modal ───────────────────────────────── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
             style={{ background: "rgba(20,33,61,0.55)", backdropFilter: "blur(4px)" }}
             onClick={() => { setShowAddModal(false); setEditingPlanId(null); setNewPlan({ name: "", sub: "", monthly: 0, yearly: 0, users: "5", cases: "100", storage: "10 GB", features: "" }); }}>
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-[#14213D]/8 bg-[#F5F0E6]/60 px-5 py-4 rounded-t-2xl">
              <h3 className="text-sm font-bold text-[#14213D]" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                {editingPlanId ? "Edit Subscription Plan" : "Add New Subscription Plan"}
              </h3>
              <button onClick={() => { setShowAddModal(false); setEditingPlanId(null); setNewPlan({ name: "", sub: "", monthly: 0, yearly: 0, users: "5", cases: "100", storage: "10 GB", features: "" }); }} className="rounded-full p-1.5 text-[#1F1F1F]/40 hover:bg-black/5 hover:text-[#14213D]"><X className="h-4 w-4" /></button>
            </div>
            <form onSubmit={handleAddPlan} className="space-y-4 p-5 text-xs">
              <Field label="Plan Name *" required>
                <input required value={newPlan.name} onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })} placeholder="e.g. Starter" className="field-input" />
              </Field>
              <Field label="Subtitle">
                <input value={newPlan.sub} onChange={(e) => setNewPlan({ ...newPlan, sub: e.target.value })} placeholder="e.g. For solo practitioners" className="field-input" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Monthly Price (PKR)">
                  <input type="number" value={newPlan.monthly} onChange={(e) => setNewPlan({ ...newPlan, monthly: Number(e.target.value) })} className="field-input" />
                </Field>
                <Field label="Yearly Price (PKR)">
                  <input type="number" value={newPlan.yearly} onChange={(e) => setNewPlan({ ...newPlan, yearly: Number(e.target.value) })} className="field-input" />
                </Field>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Field label="Max Users"><input value={newPlan.users} onChange={(e) => setNewPlan({ ...newPlan, users: e.target.value })} className="field-input" /></Field>
                <Field label="Cases"><input value={newPlan.cases} onChange={(e) => setNewPlan({ ...newPlan, cases: e.target.value })} className="field-input" /></Field>
                <Field label="Storage"><input value={newPlan.storage} onChange={(e) => setNewPlan({ ...newPlan, storage: e.target.value })} className="field-input" /></Field>
              </div>
              <Field label="Key Features">
                <textarea rows={2} value={newPlan.features} onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value })} placeholder="Comma-separated feature list…" className="field-input resize-none" />
              </Field>
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => { setShowAddModal(false); setEditingPlanId(null); setNewPlan({ name: "", sub: "", monthly: 0, yearly: 0, users: "5", cases: "100", storage: "10 GB", features: "" }); }} className="flex-1 rounded-xl border border-[#14213D]/15 py-2.5 text-xs font-semibold text-[#14213D] hover:bg-[#F5F0E6]">Cancel</button>
                <button type="submit" className="flex-1 rounded-xl bg-[#14213D] py-2.5 text-xs font-semibold text-[#F5F0E6] hover:bg-[#B8860B] transition-colors">
                  {editingPlanId ? "Update Plan" : "Save Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .field-input {
          margin-top: 4px;
          width: 100%;
          border-radius: 10px;
          border: 1px solid rgba(20,33,61,0.15);
          background: rgba(245,240,230,0.3);
          padding: 8px 12px;
          font-size: 12px;
          outline: none;
        }
        .field-input:focus { border-color: #B8860B; }
      `}</style>
    </AdminShell>
  );
}

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#14213D]">
        {label}{required && <span className="ml-0.5 text-rose-500">*</span>}
      </label>
      {children}
    </div>
  );
}

function PagerBtn({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <button className={`inline-flex h-7 min-w-7 items-center justify-center rounded-md px-2 text-xs font-medium transition-colors ${active ? "bg-[#14213D] text-[#F5F0E6]" : "border border-[#14213D]/15 bg-white text-[#14213D] hover:border-[#B8860B]"}`}>
      {children}
    </button>
  );
}

export const Route = createFileRoute("/subscriptions")({
  head: () => ({
    meta: [
      { title: "Subscriptions & Billing — Qanomy" },
      { name: "description", content: "Manage subscription plans, pricing and all billing transactions." },
    ],
  }),
  component: SubscriptionsPage,
});
