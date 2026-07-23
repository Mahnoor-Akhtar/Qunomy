import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft, KeyRound, Ban, LogIn,
  ShieldAlert, Activity, FileText,
  User, Mail, Phone, Building2, Globe
} from "lucide-react";
import AdminShell from "@/components/dashboard/AdminShell";
import { toast } from "sonner";

export const Route = createFileRoute("/user-detail/$userId")({
  head: () => ({
    meta: [
      { title: "User Details — Qanomy" },
      { name: "description", content: "View professional profile of user." },
    ],
  }),
  component: UserDetailPage,
});

const TABS = ["Overview", "Activity Log", "Sessions"] as const;
type Tab = (typeof TABS)[number];

function UserDetailPage() {
  const { userId } = Route.useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("Overview");

  // Mock data to match the requested UI
  const user = {
    id: userId,
    name: "Imran Mehmood",
    initials: "IM",
    avatarBg: "bg-emerald-600 text-white",
    role: "Lawyer",
    firm: "Mehmood & Co.",
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
  };

  return (
    <AdminShell
      active="users"
      title="Global Users"
      subtitle="View and manage user profile details."
    >
      <div className="mx-auto max-w-[1200px] animate-fade-in space-y-6 pb-20">
        
        {/* ── Top Navigation & Header ───────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-4">
            <button 
              onClick={() => navigate({ to: "/users" })}
              className="group inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Global Users
            </button>

            <div className="flex items-start gap-5">
              <div className={`flex h-20 w-20 items-center justify-center rounded-2xl text-2xl font-bold shadow-sm ${user.avatarBg}`}>
                {user.initials}
              </div>
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
                    {user.name}
                  </h1>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border shadow-sm ${
                    user.status === 'Active' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                    {user.status}
                  </span>
                </div>
                <div className="text-sm font-semibold text-gray-600">
                  {user.role} • <span className="text-blue-600">{user.firm}</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                  <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {user.email}</span>
                  <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {user.phone}</span>
                </div>
                <div className="text-[11px] text-gray-400 font-medium">
                  Member since {user.joinedDate}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main 2-Column Layout ──────────────────────────────── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Left Column (Main Content - 8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Elegant Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto hide-scrollbar gap-6">
                {TABS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`relative whitespace-nowrap pb-4 text-sm font-semibold transition-all ${
                      tab === t
                        ? "text-blue-600"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {t}
                    {tab === t && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Overview Tab Content */}
            {tab === "Overview" && (
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-100">
                  
                  <div className="flex items-center justify-between p-5 hover:bg-gray-50/50 transition-colors">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 w-1/3">Full Name</span>
                    <span className="text-sm font-bold text-gray-900 w-2/3 text-right">{user.name}</span>
                  </div>

                  <div className="flex items-center justify-between p-5 hover:bg-gray-50/50 transition-colors">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 w-1/3">Email</span>
                    <div className="flex items-center gap-2 justify-end w-2/3">
                      <span className="text-sm font-semibold text-gray-700">{user.email}</span>
                      {user.emailVerified && (
                        <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 border border-emerald-100">Verified</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-5 hover:bg-gray-50/50 transition-colors">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 w-1/3">Phone</span>
                    <div className="flex items-center gap-2 justify-end w-2/3">
                      <span className="text-sm font-semibold text-gray-700">{user.phone}</span>
                      {user.phoneVerified && (
                        <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 border border-emerald-100">Verified</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-5 hover:bg-gray-50/50 transition-colors">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 w-1/3">Role</span>
                    <span className="text-sm font-bold text-gray-900 w-2/3 text-right">{user.role}</span>
                  </div>

                  <div className="flex items-center justify-between p-5 hover:bg-gray-50/50 transition-colors">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 w-1/3">Firm</span>
                    <span className="text-sm font-bold text-blue-600 w-2/3 text-right">{user.firm}</span>
                  </div>

                  <div className="flex items-center justify-between p-5 hover:bg-gray-50/50 transition-colors">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 w-1/3">Status</span>
                    <span className={`text-sm font-bold w-2/3 text-right ${user.status === 'Active' ? 'text-emerald-600' : 'text-rose-600'}`}>{user.status}</span>
                  </div>

                  <div className="flex items-center justify-between p-5 hover:bg-gray-50/50 transition-colors">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 w-1/3">Last Login</span>
                    <span className="text-sm font-semibold text-gray-700 w-2/3 text-right">{user.lastLogin}</span>
                  </div>

                  <div className="flex items-center justify-between p-5 hover:bg-gray-50/50 transition-colors">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 w-1/3">IP Address</span>
                    <span className="text-sm font-mono text-gray-700 w-2/3 text-right">{user.ipAddress}</span>
                  </div>

                  <div className="flex items-center justify-between p-5 hover:bg-gray-50/50 transition-colors">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 w-1/3">Password Changed</span>
                    <span className="text-sm font-semibold text-gray-700 w-2/3 text-right">{user.passwordChanged}</span>
                  </div>

                  <div className="flex items-center justify-between p-5 hover:bg-gray-50/50 transition-colors">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 w-1/2">Two-Factor Authentication</span>
                    <span className={`text-sm font-bold w-1/2 text-right ${user.twoFactorEnabled ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {user.twoFactorEnabled ? "✓ Enabled" : "Disabled"}
                    </span>
                  </div>

                </div>
              </div>
            )}

            {/* Other Tabs Placeholders */}
            {tab !== "Overview" && (
              <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50">
                <Activity className="mb-3 h-8 w-8 text-gray-300" />
                <h3 className="text-sm font-bold text-gray-900">No {tab.toLowerCase()} data yet</h3>
                <p className="mt-1 text-xs text-gray-500">Items added will appear here.</p>
              </div>
            )}
            
          </div>

          {/* Right Column (Sidebar - 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Actions Card */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 bg-gray-50/80 px-6 py-4">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-gray-500">Quick Actions</h3>
              </div>
              <div className="p-6 space-y-3">
                <button 
                  onClick={() => toast.success("Password reset email sent")}
                  className="flex w-full items-center justify-start gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 shadow-sm transition-all hover:border-blue-400 hover:ring-1 hover:ring-blue-400 focus:outline-none"
                >
                  <KeyRound className="h-4.5 w-4.5 text-blue-500" /> Reset Password
                </button>
                
                <button 
                  onClick={() => toast.success("User logged out from all devices")}
                  className="flex w-full items-center justify-start gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 shadow-sm transition-all hover:border-amber-400 hover:ring-1 hover:ring-amber-400 focus:outline-none"
                >
                  <Ban className="h-4.5 w-4.5 text-amber-500" /> Force Logout from All Devices
                </button>

                <button 
                  onClick={() => toast.success("User blocked")}
                  className="flex w-full items-center justify-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700 shadow-sm transition-all hover:bg-rose-100 focus:outline-none"
                >
                  <ShieldAlert className="h-4.5 w-4.5 text-rose-600" /> Block User
                </button>

                <button 
                  onClick={() => navigate({ to: "/audit-logs" })}
                  className="flex w-full items-center justify-start gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:outline-none"
                >
                  <FileText className="h-4.5 w-4.5 text-gray-500" /> View Audit Log
                </button>

                <div className="mt-4 rounded-lg bg-blue-50 p-3 text-[11px] font-medium text-blue-700 border border-blue-100 leading-relaxed">
                  Note: All actions are logged in Audit Logs.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AdminShell>
  );
}
