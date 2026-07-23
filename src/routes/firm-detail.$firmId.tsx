import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft, Mail, Phone, MapPin, LogIn, CheckCircle2,
  Pause, AlertTriangle, Trash2, Users, Briefcase, HardDrive,
  FileText, CreditCard, Calendar, Download, UserCircle2,
  Shield, X, ChevronDown, RotateCw, AlertCircle, Clock,
  Activity, Eye, EyeOff,
} from "lucide-react";
import AdminShell from "@/components/dashboard/AdminShell";
import { FIRMS, PLAN_BADGE, STATUS_BADGE } from "./firms";
import { toast } from "sonner";
import { exportToCSV } from "@/utils/export";

export const Route = createFileRoute("/firm-detail/$firmId")({
  head: () => ({
    meta: [
      { title: "Firm Details — Qunomy" },
      { name: "description", content: "View detailed information about a registered law firm." },
    ],
  }),
  component: FirmDetailPage,
});

const TABS = ["Overview", "Subscription History", "Users", "Audit Log"] as const;
type Tab = (typeof TABS)[number];
type Modal = "manage-sub" | "suspend" | "warning" | "delete" | null;

/* ── Static mock data ───────────────────────────────────────── */

const SUB_HISTORY = [
  { date: "19 May 2025", event: "Upgraded to Business Plan",   amount: "PKR 8,999",  status: "Paid",    invoice: "INV-2025-0052" },
  { date: "19 Apr 2025", event: "Monthly renewal — Business",  amount: "PKR 8,999",  status: "Paid",    invoice: "INV-2025-0038" },
  { date: "19 Mar 2025", event: "Monthly renewal — Business",  amount: "PKR 8,999",  status: "Paid",    invoice: "INV-2025-0024" },
  { date: "19 Feb 2025", event: "Monthly renewal — Basic",     amount: "PKR 2,999",  status: "Paid",    invoice: "INV-2025-0011" },
  { date: "19 Jan 2025", event: "Subscribed to Basic Plan",    amount: "PKR 2,999",  status: "Paid",    invoice: "INV-2025-0003" },
  { date: "01 Jan 2025", event: "30-day free trial started",   amount: "PKR 0",      status: "Trial",   invoice: "—" },
];

const FIRM_USERS = [
  { id: "u1", name: "Adv. Saqib Malik",    email: "saqib@maliklaw.pk",       role: "Owner",   status: "Active",   lastLogin: "21 May 2025, 10:15 AM" },
  { id: "u2", name: "Adv. Sara Ahmed",     email: "sara@maliklaw.pk",         role: "Lawyer",  status: "Active",   lastLogin: "21 May 2025, 09:40 AM" },
  { id: "u3", name: "Adv. Bilal Raza",     email: "bilal@maliklaw.pk",        role: "Lawyer",  status: "Active",   lastLogin: "20 May 2025, 04:30 PM" },
  { id: "u4", name: "Asst. Nadia Pervaiz", email: "nadia@maliklaw.pk",        role: "Staff",   status: "Active",   lastLogin: "20 May 2025, 02:00 PM" },
  { id: "u5", name: "Adv. Omar Farooq",    email: "omar@maliklaw.pk",         role: "Lawyer",  status: "Inactive", lastLogin: "10 May 2025, 11:00 AM" },
];

const AUDIT_ENTRIES = [
  { time: "21 May 2025, 10:18 AM", action: "Document uploaded",         by: "Adv. Saqib Malik",  type: "info" },
  { time: "21 May 2025, 09:55 AM", action: "New case created (RC-2025-0512)", by: "Adv. Sara Ahmed", type: "info" },
  { time: "20 May 2025, 05:10 PM", action: "User Nadia Pervaiz added",  by: "Adv. Saqib Malik",  type: "success" },
  { time: "20 May 2025, 03:45 PM", action: "Subscription upgraded to Business", by: "System",    type: "success" },
  { time: "18 May 2025, 02:30 PM", action: "Failed login attempt",      by: "Unknown",            type: "warning" },
  { time: "17 May 2025, 11:00 AM", action: "Hearing reminder sent (RC-2025-0488)", by: "System", type: "info" },
  { time: "15 May 2025, 09:15 AM", action: "Case closed (RC-2025-0410)", by: "Adv. Bilal Raza",  type: "info" },
];

const PLANS = [
  { key: "Basic",        label: "Basic Plan",        price: "PKR 2,999 / month" },
  { key: "Professional", label: "Professional Plan",  price: "PKR 5,999 / month" },
  { key: "Business",     label: "Business Plan",      price: "PKR 8,999 / month" },
  { key: "Enterprise",   label: "Enterprise Plan",    price: "PKR 12,000 / month" },
];

const USAGE_TINTS: Record<string, { bar: string; bg: string; text: string }> = {
  emerald: { bar: "bg-emerald-500", bg: "bg-emerald-50",  text: "text-emerald-700" },
  blue:    { bar: "bg-blue-500",    bg: "bg-blue-50",     text: "text-blue-700" },
  amber:   { bar: "bg-amber-500",   bg: "bg-amber-50",    text: "text-amber-700" },
  violet:  { bar: "bg-violet-500",  bg: "bg-violet-50",   text: "text-violet-700" },
};

const AUDIT_TYPE_STYLE: Record<string, string> = {
  info:    "bg-blue-100 text-blue-700",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  error:   "bg-rose-100 text-rose-700",
};

/* ── Main component ─────────────────────────────────────────── */

function FirmDetailPage() {
  const { firmId }    = Route.useParams();
  const navigate      = useNavigate();
  const [tab, setTab] = useState<Tab>("Overview");
  const [modal, setModal] = useState<Modal>(null);

  // Modal state
  const [selectedPlan, setSelectedPlan] = useState("Business");
  const [selectedBilling, setSelectedBilling] = useState<"Monthly" | "Yearly">("Monthly");
  const [warningMsg, setWarningMsg] = useState("");
  const [suspendReason, setSuspendReason] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [firmStatus, setFirmStatus] = useState<"Active" | "Suspended">("Active");

  const firm = FIRMS.find((f) => f.id === firmId) ?? FIRMS[0];

  const closeModal = () => setModal(null);

  const handleSuspend = () => {
    setFirmStatus("Suspended");
    toast.warning(`${firm.name} has been suspended.`);
    closeModal();
  };

  const handleSendWarning = () => {
    if (!warningMsg.trim()) { toast.error("Please enter a warning message."); return; }
    toast.success(`Warning sent to ${firm.name}`);
    setWarningMsg("");
    closeModal();
  };

  const handleDelete = () => {
    if (deleteConfirm !== firm.name) { toast.error("Firm name doesn't match. Please try again."); return; }
    toast.error(`${firm.name} has been deleted.`);
    closeModal();
    navigate({ to: "/firms" });
  };

  const handleManageSub = () => {
    toast.success(`Subscription updated to ${selectedPlan} (${selectedBilling})`);
    closeModal();
  };

  return (
    <AdminShell
      active="firms"
      title="Firm Details"
      subtitle={firm.name}
      headerRight={
        <Link
          to="/firms"
          className="inline-flex items-center gap-2 rounded-full border border-[#14213D]/15 bg-white px-4 py-2 text-xs font-semibold text-[#14213D] transition-colors hover:border-[#B8860B] hover:text-[#B8860B]"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Firms
        </Link>
      }
    >
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_340px]">

        {/* ── Left ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">

          {/* Header card */}
          <section className="rounded-2xl border border-[#14213D]/10 bg-white p-5">
            <div className="flex flex-wrap items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#F5F0E6] text-2xl font-bold text-[#14213D]"
                   style={{ fontFamily: "'Libre Baskerville', serif" }}>
                {firm.name[0]}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-bold text-[#14213D]" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                    {firm.name}
                  </h2>
                  <span className={`rounded-md px-2.5 py-0.5 text-[11px] font-semibold ${firmStatus === "Suspended" ? "bg-rose-100 text-rose-700" : STATUS_BADGE[firm.status]}`}>
                    {firmStatus}
                  </span>
                  <span className={`rounded-md px-2.5 py-0.5 text-[11px] font-semibold ${PLAN_BADGE[firm.plan]}`}>{firm.plan}</span>
                </div>
                <div className="mt-1.5 text-sm font-medium text-[#14213D]/70">{firm.ownerName}</div>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#1F1F1F]/60">
                  <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" />{firm.ownerEmail}</span>
                  <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" />{firm.ownerPhone}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{firm.city}, Pakistan</span>
                </div>
              </div>
              <button
                onClick={() => toast.success(`Logging in as ${firm.name}…`)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#14213D] px-4 py-2.5 text-xs font-semibold text-[#F5F0E6] shadow-md transition-all hover:bg-[#14213D]/90"
              >
                <LogIn className="h-4 w-4" /> Login as Firm
              </button>
            </div>

            {/* Tabs */}
            <div className="mt-5 flex gap-6 border-b border-[#14213D]/10 text-xs font-medium">
              {TABS.map((t) => (
                <button key={t} onClick={() => setTab(t)}
                  className={`-mb-px border-b-2 pb-2.5 transition-colors ${
                    tab === t ? "border-[#B8860B] text-[#14213D] font-semibold" : "border-transparent text-[#1F1F1F]/50 hover:text-[#14213D]"
                  }`}>{t}
                </button>
              ))}
            </div>

            {/* ── Tab: Overview ── */}
            {tab === "Overview" && (
              <div className="mt-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[#14213D]">Usage Summary</h3>
                  <div className="flex items-center gap-2 text-[10px] text-[#1F1F1F]/50">
                    <span className="rounded-md border border-[#14213D]/15 bg-white px-2 py-1 font-medium text-[#14213D]">This Month</span>
                    <span>Last updated: 21 May 2025, 10:30 AM</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  <UsageStat icon={Users}     tint="emerald" label="Users"     value={`${firm.users} / ${firm.usersCap}`}             pct={(firm.users / firm.usersCap) * 100} />
                  <UsageStat icon={Briefcase} tint="blue"    label="Cases"     value={`${firm.cases} / Unlimited`}                    pct={60} />
                  <UsageStat icon={HardDrive} tint="amber"   label="Storage"   value={`${firm.storageGb} GB / ${firm.storageCap} GB`} pct={(firm.storageGb / firm.storageCap) * 100} />
                  <UsageStat icon={FileText}  tint="violet"  label="Documents" value={firm.documents.toLocaleString()}                pct={40} />
                </div>
              </div>
            )}

            {/* ── Tab: Subscription History ── */}
            {tab === "Subscription History" && (
              <div className="mt-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[#14213D]">Subscription History</h3>
                  <button onClick={() => {
                    exportToCSV(SUB_HISTORY, "subscription_history", [
                      { key: "date", label: "Date" },
                      { key: "event", label: "Event" },
                      { key: "amount", label: "Amount" },
                      { key: "status", label: "Status" },
                      { key: "invoice", label: "Invoice" }
                    ]);
                    toast.success("Exported subscription history to CSV");
                  }} className="inline-flex items-center gap-1.5 rounded-lg border border-[#14213D]/15 bg-white px-3 py-1.5 text-xs font-medium text-[#14213D] hover:border-[#B8860B] hover:text-[#B8860B] transition-colors">
                    <Download className="h-3.5 w-3.5" /> Export
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-left text-[10px] font-medium text-[#1F1F1F]/50">
                        <th className="pb-2.5">Date</th>
                        <th className="pb-2.5">Event</th>
                        <th className="pb-2.5">Amount</th>
                        <th className="pb-2.5">Status</th>
                        <th className="pb-2.5">Invoice</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SUB_HISTORY.map((h, i) => (
                        <tr key={i} className="border-t border-[#14213D]/5">
                          <td className="py-2.5 text-[#1F1F1F]/60 whitespace-nowrap">{h.date}</td>
                          <td className="py-2.5 font-medium text-[#14213D]">{h.event}</td>
                          <td className="py-2.5 font-semibold text-[#14213D]">{h.amount}</td>
                          <td className="py-2.5">
                            <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                              h.status === "Paid"  ? "bg-emerald-100 text-emerald-700" :
                              h.status === "Trial" ? "bg-amber-100 text-amber-700" :
                              "bg-rose-100 text-rose-700"
                            }`}>{h.status}</span>
                          </td>
                          <td className="py-2.5">
                            {h.invoice !== "—" ? (
                              <button className="inline-flex items-center gap-1 text-blue-600 hover:underline">
                                <Download className="h-3 w-3" /> {h.invoice}
                              </button>
                            ) : <span className="text-[#1F1F1F]/40">—</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── Tab: Users ── */}
            {tab === "Users" && (
              <div className="mt-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[#14213D]">
                    Users <span className="ml-1 rounded-md bg-[#14213D]/8 px-2 py-0.5 text-[10px] font-semibold text-[#14213D]/60">{FIRM_USERS.length} / {firm.usersCap}</span>
                  </h3>
                  <button onClick={() => {
                    exportToCSV(FIRM_USERS, "firm_users", [
                      { key: "name", label: "Name" },
                      { key: "email", label: "Email" },
                      { key: "role", label: "Role" },
                      { key: "status", label: "Status" },
                      { key: "lastLogin", label: "Last Login" }
                    ]);
                    toast.success("Exported users to CSV");
                  }} className="inline-flex items-center gap-1.5 rounded-lg border border-[#14213D]/15 bg-white px-3 py-1.5 text-xs font-medium text-[#14213D] hover:border-[#B8860B] hover:text-[#B8860B] transition-colors">
                    <Download className="h-3.5 w-3.5" /> Export
                  </button>
                </div>
                <div className="space-y-1">
                  {FIRM_USERS.map((u) => (
                    <div key={u.id} className="flex items-center gap-3 rounded-xl border border-[#14213D]/5 bg-[#F5F0E6]/30 p-3 hover:bg-[#F5F0E6]/60 transition-colors">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#14213D]/10 text-[11px] font-bold text-[#14213D]">
                        {u.name.split(" ").slice(-1)[0]?.[0] ?? u.name[0]}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-[#14213D]">{u.name}</div>
                        <div className="text-[10px] text-[#1F1F1F]/55">{u.email}</div>
                      </div>
                      <span className="shrink-0 rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">{u.role}</span>
                      <span className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold ${u.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                        {u.status}
                      </span>
                      <div className="hidden shrink-0 items-center gap-1 text-[10px] text-[#1F1F1F]/45 sm:flex">
                        <Clock className="h-3 w-3" /> {u.lastLogin}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Tab: Audit Log ── */}
            {tab === "Audit Log" && (
              <div className="mt-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[#14213D]">Audit Log</h3>
                  <button onClick={() => {
                    exportToCSV(AUDIT_ENTRIES, "audit_logs", [
                      { key: "action", label: "Action" },
                      { key: "by", label: "User" },
                      { key: "time", label: "Timestamp" },
                      { key: "type", label: "Type" }
                    ]);
                    toast.success("Exported audit logs to CSV");
                  }} className="inline-flex items-center gap-1.5 rounded-lg border border-[#14213D]/15 bg-white px-3 py-1.5 text-xs font-medium text-[#14213D] hover:border-[#B8860B] hover:text-[#B8860B] transition-colors">
                    <Download className="h-3.5 w-3.5" /> Export
                  </button>
                </div>
                <div className="space-y-2">
                  {AUDIT_ENTRIES.map((e, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl border border-[#14213D]/5 p-3">
                      <span className={`mt-0.5 shrink-0 rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${AUDIT_TYPE_STYLE[e.type]}`}>
                        {e.type}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-medium text-[#14213D]">{e.action}</div>
                        <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[10px] text-[#1F1F1F]/50">
                          <span className="flex items-center gap-1"><UserCircle2 className="h-3 w-3" />{e.by}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{e.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Firm Information */}
          <section className="rounded-2xl border border-[#14213D]/10 bg-white p-5">
            <h3 className="mb-4 text-sm font-semibold text-[#14213D]">Firm Information</h3>
            <div className="grid grid-cols-1 gap-x-8 gap-y-0 md:grid-cols-2">
              <Row label="Firm Name"   value={firm.name} />
              <Row label="Owner"       value={firm.ownerName} />
              <Row label="Email"       value={firm.ownerEmail} />
              <Row label="Phone"       value={firm.ownerPhone} />
              <Row label="Address"     value={firm.address} />
              <Row label="Joined Date" value={`${firm.joined}, 03:15 PM`} />
              <Row label="Status"      value={<span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${firmStatus === "Suspended" ? "bg-rose-100 text-rose-700" : STATUS_BADGE[firm.status]}`}>{firmStatus}</span>} />
              <Row label="City"        value={firm.city} />
            </div>
          </section>
        </div>

        {/* ── Right ────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">

          {/* Current Subscription */}
          <section className="rounded-2xl border border-[#14213D]/10 bg-white p-5">
            <h3 className="mb-4 text-sm font-semibold text-[#14213D]">Current Subscription</h3>
            <dl className="space-y-0">
              <Row label="Plan"              value={<span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${PLAN_BADGE[firm.plan]}`}>{firm.plan} Plan</span>} />
              <Row label="Billing Cycle"     value={firm.billing} />
              <Row label="Amount"            value={`PKR ${firm.amount.toLocaleString("en-PK")} / ${firm.billing === "Yearly" ? "year" : "month"}`} />
              <Row label="Next Billing Date" value={firm.nextBilling} />
              <Row label="Payment Method"    value={firm.paymentMethod} />
              <Row label="Auto Renew"        value={
                firm.autoRenew
                  ? <span className="inline-flex items-center gap-1 font-medium text-emerald-600"><CheckCircle2 className="h-3.5 w-3.5" /> Enabled</span>
                  : <span className="font-medium text-rose-600">Disabled</span>
              } />
            </dl>
            <button
              onClick={() => setModal("manage-sub")}
              className="mt-4 w-full rounded-xl bg-[#14213D] py-2.5 text-xs font-semibold text-[#F5F0E6] transition-colors hover:bg-[#B8860B]"
            >
              Manage Subscription
            </button>
          </section>

          {/* Actions */}
          <section className="rounded-2xl border border-[#14213D]/10 bg-white p-5">
            <h3 className="mb-3 text-sm font-semibold text-[#14213D]">Actions</h3>
            <div className="flex flex-col gap-2">
              <button onClick={() => setModal("suspend")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-100">
                <Pause className="h-3.5 w-3.5" /> Suspend Firm
              </button>
              <button onClick={() => setModal("warning")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-100">
                <AlertTriangle className="h-3.5 w-3.5" /> Send Warning
              </button>
              <button onClick={() => setModal("delete")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-semibold text-rose-700 transition-colors hover:bg-rose-100">
                <Trash2 className="h-3.5 w-3.5" /> Delete Firm
              </button>
            </div>
            <p className="mt-3 text-[10px] text-[#1F1F1F]/50">
              All actions are logged in{" "}
              <button onClick={() => setTab("Audit Log")} className="text-blue-600 hover:underline">Audit Log</button>
            </p>
          </section>
        </div>
      </div>

      {/* ════════════════════════════════════════════════
           MODALS
      ════════════════════════════════════════════════ */}

      {/* ── Manage Subscription modal ── */}
      {modal === "manage-sub" && (
        <ModalWrapper title="Manage Subscription" icon={<CreditCard className="h-5 w-5 text-[#14213D]" />} onClose={closeModal}>
          <p className="mb-4 text-xs text-[#1F1F1F]/60">
            Current plan: <strong className="text-[#14213D]">{firm.plan} Plan ({firm.billing})</strong>
          </p>

          <label className="mb-1 block text-[11px] font-semibold text-[#14213D]">Select Plan</label>
          <div className="mb-4 grid grid-cols-2 gap-2">
            {PLANS.map((p) => (
              <button key={p.key} onClick={() => setSelectedPlan(p.key)}
                className={`rounded-xl border p-3 text-left transition-all ${
                  selectedPlan === p.key
                    ? "border-[#B8860B] bg-[#B8860B]/8 shadow-sm"
                    : "border-[#14213D]/10 bg-white hover:border-[#14213D]/30"
                }`}>
                <div className="text-xs font-bold text-[#14213D]">{p.label}</div>
                <div className="mt-0.5 text-[10px] text-[#1F1F1F]/55">{p.price}</div>
              </button>
            ))}
          </div>

          <label className="mb-1 block text-[11px] font-semibold text-[#14213D]">Billing Cycle</label>
          <div className="mb-4 flex gap-2">
            {(["Monthly", "Yearly"] as const).map((b) => (
              <button key={b} onClick={() => setSelectedBilling(b)}
                className={`flex-1 rounded-xl border py-2 text-xs font-semibold transition-all ${
                  selectedBilling === b ? "border-[#B8860B] bg-[#B8860B]/8 text-[#14213D]" : "border-[#14213D]/10 text-[#1F1F1F]/60 hover:border-[#14213D]/30"
                }`}>
                {b} {b === "Yearly" && <span className="ml-1 text-emerald-600">(Save 15%)</span>}
              </button>
            ))}
          </div>

          <div className="mb-4 rounded-xl bg-[#F5F0E6] p-3 text-xs text-[#14213D]">
            <div className="font-semibold">Change Summary</div>
            <div className="mt-1 text-[#1F1F1F]/60">
              {firm.plan} Plan → <strong>{selectedPlan} Plan</strong> · {selectedBilling} billing
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={closeModal} className="flex-1 rounded-xl border border-[#14213D]/15 py-2.5 text-xs font-semibold text-[#14213D] hover:bg-[#F5F0E6]">Cancel</button>
            <button onClick={handleManageSub} className="flex-1 rounded-xl bg-[#14213D] py-2.5 text-xs font-semibold text-[#F5F0E6] hover:bg-[#14213D]/90">Update Subscription</button>
          </div>
        </ModalWrapper>
      )}

      {/* ── Suspend modal ── */}
      {modal === "suspend" && (
        <ModalWrapper title="Suspend Firm" icon={<Pause className="h-5 w-5 text-amber-600" />} onClose={closeModal} danger="amber">
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <div className="text-xs text-amber-700">
                Suspending <strong>{firm.name}</strong> will immediately disable all logins and block all platform access for this firm's users.
              </div>
            </div>
          </div>

          <label className="mb-1 block text-[11px] font-semibold text-[#14213D]">Reason for Suspension</label>
          <textarea
            value={suspendReason}
            onChange={(e) => setSuspendReason(e.target.value)}
            rows={3}
            placeholder="Enter reason (e.g. payment overdue, policy violation)…"
            className="mb-4 w-full rounded-xl border border-[#14213D]/15 bg-[#F5F0E6]/40 p-3 text-xs outline-none focus:border-[#B8860B] resize-none"
          />

          <div className="flex gap-2">
            <button onClick={closeModal} className="flex-1 rounded-xl border border-[#14213D]/15 py-2.5 text-xs font-semibold text-[#14213D] hover:bg-[#F5F0E6]">Cancel</button>
            <button onClick={handleSuspend} className="flex-1 rounded-xl bg-amber-500 py-2.5 text-xs font-semibold text-white hover:bg-amber-600">Suspend Firm</button>
          </div>
        </ModalWrapper>
      )}

      {/* ── Send Warning modal ── */}
      {modal === "warning" && (
        <ModalWrapper title="Send Warning" icon={<AlertTriangle className="h-5 w-5 text-amber-600" />} onClose={closeModal} danger="amber">
          <p className="mb-3 text-xs text-[#1F1F1F]/60">
            A warning email will be sent to <strong className="text-[#14213D]">{firm.ownerEmail}</strong>
          </p>

          <label className="mb-1 block text-[11px] font-semibold text-[#14213D]">Warning Type</label>
          <div className="mb-3 grid grid-cols-2 gap-2">
            {["Payment Overdue", "Policy Violation", "Excessive Usage", "Suspicious Activity"].map((wt) => (
              <button key={wt}
                className="rounded-xl border border-[#14213D]/10 bg-white p-2 text-left text-[10px] font-medium text-[#14213D] hover:border-[#B8860B] transition-colors"
                onClick={() => setWarningMsg(prev => prev ? prev : `Warning: ${wt} — please resolve this issue within 7 days.`)}>
                {wt}
              </button>
            ))}
          </div>

          <label className="mb-1 block text-[11px] font-semibold text-[#14213D]">Message</label>
          <textarea
            value={warningMsg}
            onChange={(e) => setWarningMsg(e.target.value)}
            rows={4}
            placeholder="Enter your warning message to the firm…"
            className="mb-4 w-full rounded-xl border border-[#14213D]/15 bg-[#F5F0E6]/40 p-3 text-xs outline-none focus:border-[#B8860B] resize-none"
          />

          <div className="flex gap-2">
            <button onClick={closeModal} className="flex-1 rounded-xl border border-[#14213D]/15 py-2.5 text-xs font-semibold text-[#14213D] hover:bg-[#F5F0E6]">Cancel</button>
            <button onClick={handleSendWarning} className="flex-1 rounded-xl bg-amber-500 py-2.5 text-xs font-semibold text-white hover:bg-amber-600">Send Warning</button>
          </div>
        </ModalWrapper>
      )}

      {/* ── Delete Firm modal ── */}
      {modal === "delete" && (
        <ModalWrapper title="Delete Firm" icon={<Trash2 className="h-5 w-5 text-rose-600" />} onClose={closeModal} danger="rose">
          <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
              <div className="text-xs text-rose-700">
                This action is <strong>permanent and irreversible</strong>. All data associated with <strong>{firm.name}</strong> — including cases, documents, users, and billing history — will be permanently deleted.
              </div>
            </div>
          </div>

          <p className="mb-2 text-[11px] font-semibold text-[#14213D]">
            Type <span className="font-mono text-rose-600">"{firm.name}"</span> to confirm
          </p>
          <input
            value={deleteConfirm}
            onChange={(e) => setDeleteConfirm(e.target.value)}
            placeholder={firm.name}
            className="mb-4 w-full rounded-xl border border-rose-200 bg-rose-50/50 p-3 text-xs outline-none focus:border-rose-400"
          />

          <div className="flex gap-2">
            <button onClick={closeModal} className="flex-1 rounded-xl border border-[#14213D]/15 py-2.5 text-xs font-semibold text-[#14213D] hover:bg-[#F5F0E6]">Cancel</button>
            <button
              onClick={handleDelete}
              disabled={deleteConfirm !== firm.name}
              className="flex-1 rounded-xl bg-rose-600 py-2.5 text-xs font-semibold text-white transition-all hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Permanently Delete
            </button>
          </div>
        </ModalWrapper>
      )}
    </AdminShell>
  );
}

/* ── Modal wrapper ───────────────────────────────────────────── */

function ModalWrapper({
  children, title, icon, onClose, danger,
}: {
  children: React.ReactNode;
  title: string;
  icon: React.ReactNode;
  onClose: () => void;
  danger?: "amber" | "rose";
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
         style={{ background: "rgba(20,33,61,0.55)", backdropFilter: "blur(4px)" }}
         onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl border border-[#14213D]/10 bg-white shadow-2xl"
           onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={`flex items-center justify-between rounded-t-2xl border-b px-5 py-4 ${
          danger === "rose"  ? "border-rose-100 bg-rose-50" :
          danger === "amber" ? "border-amber-100 bg-amber-50" :
          "border-[#14213D]/8 bg-[#F5F0E6]/60"
        }`}>
          <div className="flex items-center gap-2.5">
            {icon}
            <h3 className="text-sm font-bold text-[#14213D]" style={{ fontFamily: "'Libre Baskerville', serif" }}>{title}</h3>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 text-[#1F1F1F]/50 hover:bg-black/5 hover:text-[#14213D]">
            <X className="h-4 w-4" />
          </button>
        </div>
        {/* Body */}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

/* ── Small helpers ───────────────────────────────────────────── */

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-[#14213D]/5 py-2.5 last:border-0">
      <dt className="shrink-0 text-[11px] text-[#1F1F1F]/50">{label}</dt>
      <dd className="text-right text-[11px] font-medium text-[#14213D]">{value}</dd>
    </div>
  );
}

function UsageStat({
  icon: Icon, tint, label, value, pct,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  tint: string; label: string; value: string; pct: number;
}) {
  const t = USAGE_TINTS[tint];
  return (
    <div className={`rounded-xl ${t.bg} p-3`}>
      <div className={`flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest ${t.text}`}>
        <Icon className="h-3.5 w-3.5" strokeWidth={2} />
        {label}
      </div>
      <div className="mt-2 text-sm font-bold text-[#14213D]">{value}</div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/60">
        <div className={`h-full ${t.bar} rounded-full transition-all`} style={{ width: `${Math.min(100, Math.max(3, pct))}%` }} />
      </div>
    </div>
  );
}
