import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Download,
  Calendar,
  Activity,
  ShieldCheck,
  AlertTriangle,
  Users as UsersIcon,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import AdminShell from "@/components/dashboard/AdminShell";

export const Route = createFileRoute("/audit-logs")({
  head: () => ({
    meta: [
      { title: "Audit Logs — Qunomy Platform" },
      { name: "description", content: "Track all important actions performed across the platform." },
    ],
  }),
  component: AuditLogsPage,
});

type AuditAction =
  | "Login"
  | "Updated Case"
  | "Uploaded Document"
  | "Created Invoice"
  | "Deleted Document"
  | "Updated Client"
  | "Suspended Firm"
  | "Payment Received"
  | "Plan Changed"
  | "Login Failed";

type AuditEntry = {
  id: number;
  userName: string;
  userEmail: string;
  initials: string;
  avatarBg: string;
  firm: string;
  action: AuditAction;
  details: string;
  timestamp: string;
  ipAddress: string;
  status: "Success" | "Failed" | "Warning";
};

const INITIAL_LOGS: AuditEntry[] = [
  {
    id: 1,
    userName: "Usman Ali",
    userEmail: "usman@maliklaw.pk",
    initials: "UA",
    avatarBg: "bg-slate-700 text-white",
    firm: "Malik Law Chambers",
    action: "Login",
    details: "User logged in successfully",
    timestamp: "21 May 2025, 11:18 AM",
    ipAddress: "103.121.45.67",
    status: "Success",
  },
  {
    id: 2,
    userName: "Adv. Saqib Malik",
    userEmail: "saqib@maliklaw.pk",
    initials: "SM",
    avatarBg: "bg-blue-600 text-white",
    firm: "Malik Law Chambers",
    action: "Updated Case",
    details: 'Updated case "C-2023-0456" next hearing date',
    timestamp: "21 May 2025, 11:12 AM",
    ipAddress: "103.121.45.67",
    status: "Success",
  },
  {
    id: 3,
    userName: "Ayesha Noor",
    userEmail: "ayesha@khanassociates.pk",
    initials: "AY",
    avatarBg: "bg-teal-700 text-white",
    firm: "Khan & Associates",
    action: "Uploaded Document",
    details: 'Uploaded document in case "D-2024-1123"',
    timestamp: "21 May 2025, 10:58 AM",
    ipAddress: "103.98.76.54",
    status: "Success",
  },
  {
    id: 4,
    userName: "Farhan Siddiqui",
    userEmail: "farhan@justicepartners.pk",
    initials: "FS",
    avatarBg: "bg-indigo-700 text-white",
    firm: "Justice Partners",
    action: "Created Invoice",
    details: "Created invoice INV-2025-1023",
    timestamp: "21 May 2025, 10:42 AM",
    ipAddress: "112.78.45.23",
    status: "Success",
  },
  {
    id: 5,
    userName: "Ayesha Noor",
    userEmail: "ayesha@khanassociates.pk",
    initials: "AA",
    avatarBg: "bg-teal-700 text-white",
    firm: "Khan & Associates",
    action: "Deleted Document",
    details: 'Deleted document "Affidavit.pdf" from case "D-2024-1123"',
    timestamp: "21 May 2025, 10:28 AM",
    ipAddress: "103.98.76.54",
    status: "Warning",
  },
  {
    id: 6,
    userName: "Imran Mehmood",
    userEmail: "imran@mehmoodco.pk",
    initials: "IM",
    avatarBg: "bg-emerald-700 text-white",
    firm: "Mehmood & Co.",
    action: "Updated Client",
    details: 'Updated client "Akbar Industries (Pvt.) Ltd."',
    timestamp: "21 May 2025, 10:15 AM",
    ipAddress: "45.116.233.10",
    status: "Success",
  },
  {
    id: 7,
    userName: "Platform Admin",
    userEmail: "admin@casediary.pk",
    initials: "PA",
    avatarBg: "bg-rose-700 text-white",
    firm: "Platform",
    action: "Suspended Firm",
    details: 'Suspended firm "Rizwi Law Firm"',
    timestamp: "21 May 2025, 09:52 AM",
    ipAddress: "118.102.33.11",
    status: "Warning",
  },
  {
    id: 8,
    userName: "Usman Ali",
    userEmail: "usman@maliklaw.pk",
    initials: "UA",
    avatarBg: "bg-slate-700 text-white",
    firm: "Malik Law Chambers",
    action: "Payment Received",
    details: "Payment received PKR 28,799 via JazzCash",
    timestamp: "21 May 2025, 09:41 AM",
    ipAddress: "103.121.45.67",
    status: "Success",
  },
  {
    id: 9,
    userName: "System",
    userEmail: "system@casediary.pk",
    initials: "SA",
    avatarBg: "bg-purple-700 text-white",
    firm: "Platform",
    action: "Plan Changed",
    details: 'Firm "Legal Vision Advocates" changed plan to Pro',
    timestamp: "21 May 2025, 09:30 AM",
    ipAddress: "203.0.113.5",
    status: "Success",
  },
  {
    id: 10,
    userName: "Muhammad Bilal",
    userEmail: "bilal@legalvision.pk",
    initials: "MM",
    avatarBg: "bg-rose-600 text-white",
    firm: "Legal Vision Advocates",
    action: "Login Failed",
    details: "Failed login attempt (incorrect password)",
    timestamp: "21 May 2025, 09:22 AM",
    ipAddress: "203.0.113.5",
    status: "Failed",
  },
];

const ACTION_BADGES: Record<AuditAction, string> = {
  Login: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Updated Case": "bg-blue-50 text-blue-700 border-blue-200",
  "Uploaded Document": "bg-purple-50 text-purple-700 border-purple-200",
  "Created Invoice": "bg-blue-50 text-blue-700 border-blue-200",
  "Deleted Document": "bg-rose-50 text-rose-700 border-rose-200",
  "Updated Client": "bg-blue-50 text-blue-700 border-blue-200",
  "Suspended Firm": "bg-rose-50 text-rose-700 border-rose-200",
  "Payment Received": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Plan Changed": "bg-purple-50 text-purple-700 border-purple-200",
  "Login Failed": "bg-rose-100 text-rose-800 border-rose-300 font-semibold",
};

function AuditLogsPage() {
  const [logs] = useState<AuditEntry[]>(INITIAL_LOGS);
  const [search, setSearch] = useState("");
  const [firmFilter, setFirmFilter] = useState("All Firms");
  const [actionFilter, setActionFilter] = useState("All Actions");
  const [userFilter, setUserFilter] = useState("All Users");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        log.userName.toLowerCase().includes(q) ||
        log.userEmail.toLowerCase().includes(q) ||
        log.action.toLowerCase().includes(q) ||
        log.details.toLowerCase().includes(q) ||
        log.firm.toLowerCase().includes(q);
      const matchesFirm = firmFilter === "All Firms" || log.firm === firmFilter;
      const matchesAction = actionFilter === "All Actions" || log.action === actionFilter;
      const matchesUser = userFilter === "All Users" || log.userName === userFilter;
      const matchesStatus = statusFilter === "All Status" || log.status === statusFilter;
      return matchesSearch && matchesFirm && matchesAction && matchesUser && matchesStatus;
    });
  }, [logs, search, firmFilter, actionFilter, userFilter, statusFilter]);

  const exportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,User,Email,Firm,Action,Details,Timestamp,IP Address"]
        .concat(
          filteredLogs.map(
            (l) =>
              `"${l.id}","${l.userName}","${l.userEmail}","${l.firm}","${l.action}","${l.details}","${l.timestamp}","${l.ipAddress}"`,
          ),
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "audit_logs_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Exported audit logs to CSV");
  };

  return (
    <AdminShell
      active="audit-logs"
      title="Audit Logs"
      subtitle="Track all important actions performed across the platform."
    >
      <div className="space-y-6">
        {/* Top Controls Row */}
        <div className="flex flex-col gap-3 rounded-xl border border-gray-200/80 bg-white p-4 shadow-sm xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {/* Date Range Picker */}
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2 text-xs font-medium text-gray-700">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>01 May 2025 - 21 May 2025</span>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[280px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by user name, email, action, or firm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50/50 py-2 pl-9 pr-3 text-xs outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={firmFilter}
              onChange={(e) => setFirmFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none"
            >
              <option value="All Firms">All Firms</option>
              <option value="Malik Law Chambers">Malik Law Chambers</option>
              <option value="Khan & Associates">Khan & Associates</option>
              <option value="Justice Partners">Justice Partners</option>
              <option value="Legal Vision Advocates">Legal Vision Advocates</option>
              <option value="Mehmood & Co.">Mehmood & Co.</option>
              <option value="Platform">Platform</option>
            </select>

            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none"
            >
              <option value="All Actions">All Actions</option>
              <option value="Login">Login</option>
              <option value="Updated Case">Updated Case</option>
              <option value="Uploaded Document">Uploaded Document</option>
              <option value="Created Invoice">Created Invoice</option>
              <option value="Deleted Document">Deleted Document</option>
              <option value="Updated Client">Updated Client</option>
              <option value="Suspended Firm">Suspended Firm</option>
              <option value="Payment Received">Payment Received</option>
              <option value="Plan Changed">Plan Changed</option>
              <option value="Login Failed">Login Failed</option>
            </select>

            <select
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none"
            >
              <option value="All Users">All Users</option>
              <option value="Usman Ali">Usman Ali</option>
              <option value="Adv. Saqib Malik">Adv. Saqib Malik</option>
              <option value="Ayesha Noor">Ayesha Noor</option>
              <option value="Farhan Siddiqui">Farhan Siddiqui</option>
              <option value="Imran Mehmood">Imran Mehmood</option>
              <option value="Platform Admin">Platform Admin</option>
              <option value="Muhammad Bilal">Muhammad Bilal</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none"
            >
              <option value="All Status">All Status</option>
              <option value="Success">Success</option>
              <option value="Failed">Failed</option>
              <option value="Warning">Warning</option>
            </select>

            <button
              onClick={() => {
                setSearch("");
                setFirmFilter("All Firms");
                setActionFilter("All Actions");
                setUserFilter("All Users");
                setStatusFilter("All Status");
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              <Filter className="h-3.5 w-3.5 text-gray-500" />
              Filter
            </button>

            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              <Download className="h-3.5 w-3.5 text-gray-500" />
              Export
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-4 rounded-xl border border-gray-200/80 bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500">Total Activities</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">12,842</span>
              </div>
              <div className="mt-0.5 text-xs text-emerald-600 font-semibold">
                ↑ 18.7% <span className="text-gray-400 font-normal">vs previous 30 days</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-gray-200/80 bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500">Successful Actions</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">12,201</span>
              </div>
              <div className="mt-0.5 text-xs text-emerald-600 font-semibold">
                95.0% <span className="text-gray-400 font-normal">of total</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-gray-200/80 bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500">Failed Actions</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">641</span>
              </div>
              <div className="mt-0.5 text-xs text-amber-600 font-semibold">
                5.0% <span className="text-gray-400 font-normal">of total</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-gray-200/80 bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <UsersIcon className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500">Unique Users</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">186</span>
              </div>
              <div className="mt-0.5 text-xs text-gray-500">Across 214 firms</div>
            </div>
          </div>
        </div>

        {/* Audit Logs Table */}
        <div className="rounded-xl border border-gray-200/80 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="border-b border-gray-100 bg-gray-50/50 font-medium text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="w-10 px-4 py-3 text-center">#</th>
                  <th className="px-5 py-3">User</th>
                  <th className="px-5 py-3">Firm</th>
                  <th className="px-5 py-3">Action</th>
                  <th className="px-5 py-3">Details</th>
                  <th className="px-5 py-3">Timestamp</th>
                  <th className="px-5 py-3">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLogs.map((l) => (
                  <tr key={l.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-4 py-3.5 text-center text-gray-400 font-medium">{l.id}</td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${l.avatarBg}`}
                        >
                          {l.initials}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{l.userName}</div>
                          <div className="text-[11px] text-gray-400">{l.userEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-gray-700 whitespace-nowrap">
                      {l.firm}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${
                          ACTION_BADGES[l.action]
                        }`}
                      >
                        {l.action}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-700 max-w-md truncate">{l.details}</td>
                    <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">{l.timestamp}</td>
                    <td className="px-5 py-3.5 font-mono text-gray-600 whitespace-nowrap">
                      {l.ipAddress}
                    </td>
                  </tr>
                ))}
                {filteredLogs.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      No audit activities found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Pagination */}
          <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 px-6 py-4 sm:flex-row">
            <div className="text-xs text-gray-500">
              Showing 1 to {filteredLogs.length} of 12,842 activities
            </div>
            <div className="flex items-center gap-1.5">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white shadow-sm">
                1
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50">
                3
              </button>
              <span className="text-xs text-gray-400">...</span>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50">
                1,285
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50">
                <ChevronRight className="h-4 w-4" />
              </button>

              <select className="ml-2 rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 outline-none">
                <option>10 / page</option>
                <option>25 / page</option>
                <option>50 / page</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
