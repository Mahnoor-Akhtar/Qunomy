import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Download,
  Users as UsersIcon,
  UserCheck,
  UserX,
  MoreHorizontal,
  KeyRound,
  Ban,
  LogIn,
  LogOut,
  ShieldAlert,
  FileText,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Mail,
  Phone,
  Building2,
  Calendar,
  Globe,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import AdminShell from "@/components/dashboard/AdminShell";

export const Route = createFileRoute("/users")({
  head: () => ({
    meta: [
      { title: "Global Users — Qunomy Platform" },
      { name: "description", content: "Search and manage users across all firms on the Qunomy platform." },
    ],
  }),
  component: GlobalUsersPage,
});

type Role = "Owner" | "Admin" | "Lawyer" | "Clerk" | "Assistant" | "Viewer";
type Status = "Active" | "Blocked" | "Inactive";

type PlatformUser = {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  firm: string;
  role: Role;
  email: string;
  emailVerified: boolean;
  phone: string;
  phoneVerified: boolean;
  joinedDate: string;
  status: Status;
  lastLogin: string;
  ipAddress: string;
  passwordChanged: string;
  twoFactorEnabled: boolean;
};

const INITIAL_USERS: PlatformUser[] = [
  {
    id: "usr-1",
    name: "Adv. Saqib Malik",
    initials: "SM",
    avatarBg: "bg-blue-600 text-white",
    firm: "Malik Law Chambers",
    role: "Owner",
    email: "saqib@maliklaw.pk",
    emailVerified: true,
    phone: "0300-1234567",
    phoneVerified: true,
    joinedDate: "19 May 2025",
    status: "Active",
    lastLogin: "21 May 2025, 11:02 AM",
    ipAddress: "103.121.45.67",
    passwordChanged: "19 May 2025, 10:11 AM",
    twoFactorEnabled: true,
  },
  {
    id: "usr-2",
    name: "Usman Ali",
    initials: "UA",
    avatarBg: "bg-slate-700 text-white",
    firm: "Malik Law Chambers",
    role: "Admin",
    email: "usman@maliklaw.pk",
    emailVerified: true,
    phone: "0301-9876543",
    phoneVerified: true,
    joinedDate: "19 May 2025",
    status: "Active",
    lastLogin: "21 May 2025, 11:18 AM",
    ipAddress: "103.121.45.67",
    passwordChanged: "19 May 2025, 09:30 AM",
    twoFactorEnabled: true,
  },
  {
    id: "usr-3",
    name: "Ayesha Noor",
    initials: "AA",
    avatarBg: "bg-teal-700 text-white",
    firm: "Khan & Associates",
    role: "Lawyer",
    email: "ayesha@khanassociates.pk",
    emailVerified: true,
    phone: "0321-4567890",
    phoneVerified: true,
    joinedDate: "20 May 2025",
    status: "Active",
    lastLogin: "21 May 2025, 10:58 AM",
    ipAddress: "103.98.76.54",
    passwordChanged: "20 May 2025, 08:15 AM",
    twoFactorEnabled: false,
  },
  {
    id: "usr-4",
    name: "Farhan Siddiqui",
    initials: "FS",
    avatarBg: "bg-indigo-700 text-white",
    firm: "Justice Partners",
    role: "Clerk",
    email: "farhan@justicepartners.pk",
    emailVerified: true,
    phone: "0311-2233445",
    phoneVerified: false,
    joinedDate: "18 May 2025",
    status: "Active",
    lastLogin: "21 May 2025, 10:42 AM",
    ipAddress: "112.78.45.23",
    passwordChanged: "18 May 2025, 02:00 PM",
    twoFactorEnabled: false,
  },
  {
    id: "usr-5",
    name: "Muhammad Bilal",
    initials: "MB",
    avatarBg: "bg-purple-700 text-white",
    firm: "Legal Vision Advocates",
    role: "Lawyer",
    email: "bilal@legalvision.pk",
    emailVerified: false,
    phone: "0333-8765432",
    phoneVerified: false,
    joinedDate: "18 May 2025",
    status: "Blocked",
    lastLogin: "21 May 2025, 09:22 AM",
    ipAddress: "203.0.113.5",
    passwordChanged: "18 May 2025, 11:00 AM",
    twoFactorEnabled: false,
  },
  {
    id: "usr-6",
    name: "Sana Khan",
    initials: "SK",
    avatarBg: "bg-rose-700 text-white",
    firm: "Ahmad Legal Consultants",
    role: "Assistant",
    email: "sana@ahmadlegal.pk",
    emailVerified: true,
    phone: "0305-1122334",
    phoneVerified: true,
    joinedDate: "17 May 2025",
    status: "Active",
    lastLogin: "20 May 2025, 04:15 PM",
    ipAddress: "182.185.12.90",
    passwordChanged: "17 May 2025, 01:20 PM",
    twoFactorEnabled: true,
  },
  {
    id: "usr-7",
    name: "Imran Mehmood",
    initials: "IM",
    avatarBg: "bg-emerald-700 text-white",
    firm: "Mehmood & Co.",
    role: "Lawyer",
    email: "imran@mehmoodco.pk",
    emailVerified: true,
    phone: "0302-3344556",
    phoneVerified: true,
    joinedDate: "17 May 2025",
    status: "Active",
    lastLogin: "21 May 2025, 10:15 AM",
    ipAddress: "45.116.233.10",
    passwordChanged: "17 May 2025, 10:00 AM",
    twoFactorEnabled: true,
  },
  {
    id: "usr-8",
    name: "Rizwan Ali",
    initials: "RA",
    avatarBg: "bg-cyan-700 text-white",
    firm: "Rizwi Law Firm",
    role: "Clerk",
    email: "rizwan@rizvilaw.pk",
    emailVerified: true,
    phone: "0315-0677889",
    phoneVerified: false,
    joinedDate: "18 May 2025",
    status: "Active",
    lastLogin: "19 May 2025, 03:20 PM",
    ipAddress: "118.102.33.11",
    passwordChanged: "18 May 2025, 09:12 AM",
    twoFactorEnabled: false,
  },
  {
    id: "usr-9",
    name: "Nadeem Malik",
    initials: "NM",
    avatarBg: "bg-amber-700 text-white",
    firm: "Al-Haq Legal",
    role: "Viewer",
    email: "nadeem@alhaqlegal.pk",
    emailVerified: true,
    phone: "0308-9988776",
    phoneVerified: false,
    joinedDate: "16 May 2025",
    status: "Inactive",
    lastLogin: "16 May 2025, 05:00 PM",
    ipAddress: "175.107.22.44",
    passwordChanged: "16 May 2025, 04:30 PM",
    twoFactorEnabled: false,
  },
  {
    id: "usr-10",
    name: "Zafar Iqbal",
    initials: "ZQ",
    avatarBg: "bg-sky-700 text-white",
    firm: "Zafar & Co. Advocates",
    role: "Lawyer",
    email: "zafar@zafarco.pk",
    emailVerified: true,
    phone: "0334-5566778",
    phoneVerified: true,
    joinedDate: "15 May 2025",
    status: "Active",
    lastLogin: "21 May 2025, 08:45 AM",
    ipAddress: "110.39.12.88",
    passwordChanged: "15 May 2025, 11:30 AM",
    twoFactorEnabled: true,
  },
];

const ROLE_BADGES: Record<Role, string> = {
  Owner: "bg-purple-100 text-purple-700 border-purple-200",
  Admin: "bg-blue-100 text-blue-700 border-blue-200",
  Lawyer: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Clerk: "bg-amber-100 text-amber-700 border-amber-200",
  Assistant: "bg-indigo-100 text-indigo-700 border-indigo-200",
  Viewer: "bg-gray-100 text-gray-700 border-gray-200",
};

const STATUS_BADGES: Record<Status, string> = {
  Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Blocked: "bg-rose-100 text-rose-700 border-rose-200",
  Inactive: "bg-gray-100 text-gray-600 border-gray-200",
};

export default function GlobalUsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<PlatformUser[]>(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [firmFilter, setFirmFilter] = useState<string>("All Firms");
  const [roleFilter, setRoleFilter] = useState<string>("All Roles");
  const [statusFilter, setStatusFilter] = useState<string>("All Status");
  const [activeTab, setActiveTab] = useState<"overview" | "activity" | "sessions">("overview");

  // Filtering
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.includes(q) ||
        u.firm.toLowerCase().includes(q);
      const matchesFirm = firmFilter === "All Firms" || u.firm === firmFilter;
      const matchesRole = roleFilter === "All Roles" || u.role === roleFilter;
      const matchesStatus = statusFilter === "All Status" || u.status === statusFilter;
      return matchesSearch && matchesFirm && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, firmFilter, roleFilter, statusFilter]);

  // Actions
  const handleToggleBlock = (user: PlatformUser) => {
    const newStatus: Status = user.status === "Blocked" ? "Active" : "Blocked";
    const updated = users.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u));
    setUsers(updated);
    toast.success(
      newStatus === "Blocked"
        ? `User ${user.name} has been blocked.`
        : `User ${user.name} has been unblocked.`,
    );
  };

  const handleResetPassword = (user: PlatformUser) => {
    toast.success(`Password reset email sent to ${user.email}`);
  };

  const handleLoginAsUser = (user: PlatformUser) => {
    toast.info(`Simulating impersonation session for ${user.name} (${user.email})`);
  };

  const handleForceLogout = (user: PlatformUser) => {
    toast.success(`Forced logout from all devices for ${user.name}`);
  };

  const exportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Name,Firm,Role,Email,Phone,Joined,Status"]
        .concat(
          filteredUsers.map(
            (u) => `"${u.name}","${u.firm}","${u.role}","${u.email}","${u.phone}","${u.joinedDate}","${u.status}"`,
          ),
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "global_users_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Exported global users list to CSV");
  };

  // Firms list for dropdown
  const firmOptions = useMemo(() => {
    const set = new Set(users.map((u) => u.firm));
    return ["All Firms", ...(Array.from(set) as string[])];
  }, [users]);

  return (
    <AdminShell
      active="users"
      title="Global Users"
      subtitle="Search and manage users across all firms on the platform."
    >
      <div className="space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-col gap-3 rounded-xl border border-gray-200/80 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, phone, CNIC or firm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50/50 py-2 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={firmFilter}
              onChange={(e) => setFirmFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500"
            >
              {firmOptions.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500"
            >
              <option value="All Roles">All Roles</option>
              <option value="Owner">Owner</option>
              <option value="Admin">Admin</option>
              <option value="Lawyer">Lawyer</option>
              <option value="Clerk">Clerk</option>
              <option value="Assistant">Assistant</option>
              <option value="Viewer">Viewer</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500"
            >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Blocked">Blocked</option>
              <option value="Inactive">Inactive</option>
            </select>

            <button
              onClick={() => {
                setSearchQuery("");
                setFirmFilter("All Firms");
                setRoleFilter("All Roles");
                setStatusFilter("All Status");
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <Filter className="h-4 w-4 text-gray-500" />
              Filter
            </button>

            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <Download className="h-4 w-4 text-gray-500" />
              Export
            </button>
          </div>
        </div>

        {/* Top Summary Stat Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-xl border border-gray-200/80 bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <UsersIcon className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500">Total Users</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">1,842</span>
                <span className="text-xs text-gray-500">Across 214 firms</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-gray-200/80 bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <UserCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500">Active Users</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">1,736</span>
                <span className="rounded font-semibold text-xs text-emerald-600 bg-emerald-50 px-1.5 py-0.5">
                  94.2%
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-gray-200/80 bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <UserX className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500">Blocked Users</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">73</span>
                <span className="rounded font-semibold text-xs text-rose-600 bg-rose-50 px-1.5 py-0.5">
                  4.0%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout: Full Width Table */}
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200/80 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h2 className="text-base font-semibold text-gray-900">
                Users ({filteredUsers.length})
              </h2>
              <div className="text-xs text-gray-500">
                Showing 1-{filteredUsers.length} of {filteredUsers.length}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] text-gray-600">
                <thead className="border-b border-gray-100 bg-gray-50/50 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3">User</th>
                    <th className="px-5 py-3">Firm</th>
                    <th className="px-5 py-3">Role</th>
                    <th className="px-5 py-3">Email / Phone</th>
                    <th className="px-5 py-3">Joined Date</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map((u) => {
                    return (
                      <tr
                        key={u.id}
                        onClick={() => navigate({ to: '/user-detail/$userId', params: { userId: u.id } })}
                        className="cursor-pointer transition-colors hover:bg-blue-50/40"
                      >
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${u.avatarBg}`}
                            >
                              {u.initials}
                            </div>
                            <span className="font-medium text-gray-900 whitespace-nowrap">
                              {u.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-gray-700 whitespace-nowrap">{u.firm}</td>
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${
                              ROLE_BADGES[u.role]
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-xs leading-tight whitespace-nowrap">
                          <div className="text-gray-900">{u.email}</div>
                          <div className="text-gray-400">{u.phone}</div>
                        </td>
                        <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap text-xs">
                          {u.joinedDate}
                        </td>
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                              STATUS_BADGES[u.status]
                            }`}
                          >
                            {u.status}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right whitespace-nowrap">
                          <div className="relative inline-block text-left">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                        No users found matching your filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 px-6 py-4 sm:flex-row">
              <div className="text-xs text-gray-500">
                Showing 1 to {filteredUsers.length} of 1,842 users
              </div>
              <div className="flex items-center gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-medium text-white shadow-sm">
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
                  185
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50">
                  ChevronRight
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
      </div>
    </AdminShell>
  );
}
