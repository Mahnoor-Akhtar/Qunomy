import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ClientShell from "../components/dashboard/ClientShell";
import {
  Briefcase,
  Calendar,
  FileText,
  Receipt,
  MessageSquare,
  AlertCircle,
  Clock,
  Download,
  Eye,
  Gavel,
  CheckCircle2,
  Bell,
  User
} from "lucide-react";

export const Route = createFileRoute("/client-dashboard")({
  component: ClientDashboard,
});

function ClientDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("qanomy_user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <ClientShell active="dashboard">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-[#14213D] flex items-center gap-2"
              style={{ fontFamily: "'Libre Baskerville', serif" }}>
            Welcome back, {user?.name ?? "Client"}! <span className="text-xl">👋</span>
          </h1>
          <p className="text-xs text-[#1F1F1F]/60 mt-1">Here's an overview of your cases and recent updates.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
        {/* KPI 1 */}
        <div className="rounded-xl border border-[#14213D]/10 bg-white p-3.5 transition-shadow hover:shadow-[0_8px_24px_-12px_rgba(20,33,61,0.3)]">
          <div className="flex items-start gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
              <Briefcase className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-medium leading-tight text-[#1F1F1F]/55">
                Total Cases
              </div>
              <div className="mt-0.5 truncate text-lg font-bold text-[#14213D]"
                   style={{ fontFamily: "'Libre Baskerville', serif" }}>2</div>
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="rounded-xl border border-[#14213D]/10 bg-white p-3.5 transition-shadow hover:shadow-[0_8px_24px_-12px_rgba(20,33,61,0.3)]">
          <div className="flex items-start gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <Calendar className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-medium leading-tight text-[#1F1F1F]/55">
                Upcoming Hearings
              </div>
              <div className="mt-0.5 truncate text-lg font-bold text-[#14213D]"
                   style={{ fontFamily: "'Libre Baskerville', serif" }}>1</div>
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="rounded-xl border border-[#14213D]/10 bg-white p-3.5 transition-shadow hover:shadow-[0_8px_24px_-12px_rgba(20,33,61,0.3)]">
          <div className="flex items-start gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <Receipt className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-medium leading-tight text-[#1F1F1F]/55">
                Pending Invoices
              </div>
              <div className="mt-0.5 truncate text-lg font-bold text-[#14213D]"
                   style={{ fontFamily: "'Libre Baskerville', serif" }}>1</div>
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="rounded-xl border border-[#14213D]/10 bg-white p-3.5 transition-shadow hover:shadow-[0_8px_24px_-12px_rgba(20,33,61,0.3)]">
          <div className="flex items-start gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
              <CheckCircle2 className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-medium leading-tight text-[#1F1F1F]/55">
                Paid Invoices
              </div>
              <div className="mt-0.5 truncate text-lg font-bold text-[#14213D]"
                   style={{ fontFamily: "'Libre Baskerville', serif" }}>3</div>
            </div>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="rounded-xl border border-[#14213D]/10 bg-white p-3.5 transition-shadow hover:shadow-[0_8px_24px_-12px_rgba(20,33,61,0.3)]">
          <div className="flex items-start gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
              <FileText className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-medium leading-tight text-[#1F1F1F]/55">
                Shared Documents
              </div>
              <div className="mt-0.5 truncate text-lg font-bold text-[#14213D]"
                   style={{ fontFamily: "'Libre Baskerville', serif" }}>8</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Left Section - Main Content */}
        <div className="xl:col-span-2 flex flex-col gap-4">
          
          {/* Next Hearing Card */}
          <div className="bg-white rounded-xl border border-red-100 p-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-red-100 text-red-600 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Important
                  </span>
                  <span className="text-[10px] font-semibold text-[#1F1F1F]/60 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Tomorrow, 10:00 AM
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#14213D] leading-tight">Muhammad Ahmad vs State</h3>
                <p className="text-[11px] text-[#1F1F1F]/70 mt-1">Criminal Case No. 123/2024</p>
                <div className="text-[11px] text-[#1F1F1F]/60 mt-1 flex items-center gap-1">
                  <Gavel className="h-3 w-3" /> Sessions Court, Lahore - Court Room 3
                </div>
              </div>
              <button 
                onClick={() => navigate({ to: "/client-hearings" })}
                className="text-[11px] font-bold text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors border border-red-100"
              >
                View Details
              </button>
            </div>
          </div>

          {/* My Cases Table */}
          <div className="bg-white rounded-xl border border-[#14213D]/10 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-3.5 border-b border-[#14213D]/10">
              <h2 className="flex items-center gap-1.5 text-xs font-semibold text-[#14213D]"
                  style={{ fontFamily: "'Libre Baskerville', serif" }}>
                <span className="flex h-5 w-5 items-center justify-center rounded bg-[#14213D]/5">
                  <Briefcase className="h-3 w-3" />
                </span>
                My Cases
              </h2>
              <button 
                onClick={() => navigate({ to: "/client-cases" })}
                className="text-[10px] font-semibold text-[#B8860B] hover:text-[#14213D] transition-colors"
              >
                View all cases →
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-[#14213D]/10">
                    <th className="px-4 py-2.5 text-[10px] font-semibold text-[#1F1F1F]/60">Case Title</th>
                    <th className="px-4 py-2.5 text-[10px] font-semibold text-[#1F1F1F]/60">Court</th>
                    <th className="px-4 py-2.5 text-[10px] font-semibold text-[#1F1F1F]/60">Status</th>
                    <th className="px-4 py-2.5 text-[10px] font-semibold text-[#1F1F1F]/60 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#14213D]/5 hover:bg-gray-50/50 transition-colors group">
                    <td className="px-4 py-3">
                      <div className="text-[11px] font-bold text-[#14213D]">Muhammad Ahmad vs State</div>
                      <div className="text-[10px] text-[#1F1F1F]/50">Criminal Case No. 123/2024</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[10px] text-[#1F1F1F]/70">Sessions Court, Lahore</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[9px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                        Active
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button 
                        onClick={() => navigate({ to: "/client-cases" })}
                        className="h-7 w-7 rounded flex items-center justify-center bg-white border border-[#14213D]/10 text-[#1F1F1F]/40 hover:text-[#14213D] transition-all ml-auto"
                      >
                        <Eye className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-4 py-3">
                      <div className="text-[11px] font-bold text-[#14213D]">ABC Corp vs XYZ Bank</div>
                      <div className="text-[10px] text-[#1F1F1F]/50">Civil Suit No. 456/2023</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[10px] text-[#1F1F1F]/70">Banking Court, Lahore</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[9px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                        Active
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button 
                        onClick={() => navigate({ to: "/client-cases" })}
                        className="h-7 w-7 rounded flex items-center justify-center bg-white border border-[#14213D]/10 text-[#1F1F1F]/40 hover:text-[#14213D] transition-all ml-auto"
                      >
                        <Eye className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Shared Documents */}
            <div className="bg-white rounded-xl border border-[#14213D]/10 p-3.5 flex flex-col h-full">
              <div className="flex items-center justify-between mb-3 border-b border-[#14213D]/10 pb-2">
                <h2 className="flex items-center gap-1.5 text-xs font-semibold text-[#14213D]"
                    style={{ fontFamily: "'Libre Baskerville', serif" }}>
                  <FileText className="h-3.5 w-3.5 text-[#1F1F1F]/50" /> Shared Documents
                </h2>
                <button onClick={() => navigate({ to: "/client-documents" })} className="text-[9px] font-semibold text-[#B8860B] hover:text-[#14213D]">View All</button>
              </div>
              <div className="flex flex-col gap-2 overflow-y-auto pr-1">
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 border border-transparent hover:border-[#14213D]/10 transition-all cursor-pointer group">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                      <FileText className="h-3 w-3" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[#14213D]">Bail_Application_Signed.pdf</div>
                      <div className="text-[9px] text-[#1F1F1F]/50">Shared on Oct 12, 2024</div>
                    </div>
                  </div>
                  <button className="h-6 w-6 rounded bg-white border border-[#14213D]/10 flex items-center justify-center text-[#1F1F1F]/40 hover:text-emerald-600 transition-colors opacity-0 group-hover:opacity-100">
                    <Download className="h-3 w-3" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 border border-transparent hover:border-[#14213D]/10 transition-all cursor-pointer group">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded bg-amber-50 text-amber-600 flex items-center justify-center">
                      <FileText className="h-3 w-3" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[#14213D]">Court_Order_01Oct.pdf</div>
                      <div className="text-[9px] text-[#1F1F1F]/50">Shared on Oct 02, 2024</div>
                    </div>
                  </div>
                  <button className="h-6 w-6 rounded bg-white border border-[#14213D]/10 flex items-center justify-center text-[#1F1F1F]/40 hover:text-emerald-600 transition-colors opacity-0 group-hover:opacity-100">
                    <Download className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Pending Invoices */}
            <div className="bg-white rounded-xl border border-[#14213D]/10 p-3.5 flex flex-col h-full">
              <div className="flex items-center justify-between mb-3 border-b border-[#14213D]/10 pb-2">
                <h2 className="flex items-center gap-1.5 text-xs font-semibold text-[#14213D]"
                    style={{ fontFamily: "'Libre Baskerville', serif" }}>
                  <Receipt className="h-3.5 w-3.5 text-[#1F1F1F]/50" /> Invoices & Payments
                </h2>
                <button onClick={() => navigate({ to: "/client-invoices" })} className="text-[9px] font-semibold text-[#B8860B] hover:text-[#14213D]">View All</button>
              </div>
              <div className="flex flex-col gap-2 overflow-y-auto pr-1">
                <div className="p-2.5 rounded-lg border border-amber-100 bg-amber-50 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-[#14213D]">INV-2024-089</div>
                    <div className="text-[9px] text-[#1F1F1F]/60 mt-0.5">Due: Oct 30, 2024</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] font-bold text-amber-700">PKR {formatMoney(50000)}</div>
                    <button onClick={() => navigate({ to: "/client-invoices" })} className="text-[9px] font-semibold text-amber-600 hover:text-amber-800 underline mt-0.5">Pay Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Right Section - Sidebar Content */}
        <div className="flex flex-col gap-4">
          
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-[#14213D]/10 p-3.5">
            <h2 className="text-xs font-semibold text-[#14213D] mb-3 pb-2 border-b border-[#14213D]/10"
                style={{ fontFamily: "'Libre Baskerville', serif" }}>
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => navigate({ to: "/client-cases" })} className="flex flex-col items-center justify-center p-3 rounded-lg border border-[#14213D]/10 hover:border-[#B8860B] hover:bg-[#B8860B]/5 transition-all group">
                <Briefcase className="h-5 w-5 text-[#1F1F1F]/40 group-hover:text-[#B8860B] mb-1.5 transition-colors" />
                <span className="text-[10px] font-semibold text-[#14213D]">View My Cases</span>
              </button>
              <button onClick={() => navigate({ to: "/client-hearings" })} className="flex flex-col items-center justify-center p-3 rounded-lg border border-[#14213D]/10 hover:border-[#B8860B] hover:bg-[#B8860B]/5 transition-all group">
                <Calendar className="h-5 w-5 text-[#1F1F1F]/40 group-hover:text-[#B8860B] mb-1.5 transition-colors" />
                <span className="text-[10px] font-semibold text-[#14213D]">View Calendar</span>
              </button>
              <button onClick={() => navigate({ to: "/client-invoices" })} className="flex flex-col items-center justify-center p-3 rounded-lg border border-[#14213D]/10 hover:border-[#B8860B] hover:bg-[#B8860B]/5 transition-all group">
                <Receipt className="h-5 w-5 text-[#1F1F1F]/40 group-hover:text-[#B8860B] mb-1.5 transition-colors" />
                <span className="text-[10px] font-semibold text-[#14213D]">View Invoices</span>
              </button>
              <button onClick={() => navigate({ to: "/client-messages" })} className="flex flex-col items-center justify-center p-3 rounded-lg border border-[#14213D]/10 hover:border-[#B8860B] hover:bg-[#B8860B]/5 transition-all group">
                <MessageSquare className="h-5 w-5 text-[#1F1F1F]/40 group-hover:text-[#B8860B] mb-1.5 transition-colors" />
                <span className="text-[10px] font-semibold text-[#14213D]">Message Lawyer</span>
              </button>
              <button onClick={() => navigate({ to: "/client-profile" })} className="col-span-2 flex items-center justify-center gap-2 p-2 rounded-lg border border-[#14213D]/10 hover:border-[#B8860B] hover:bg-[#B8860B]/5 transition-all group">
                <User className="h-4 w-4 text-[#1F1F1F]/40 group-hover:text-[#B8860B] transition-colors" />
                <span className="text-[10px] font-semibold text-[#14213D]">Update My Profile</span>
              </button>
            </div>
          </div>

          {/* Notifications / Recent Activity Panel */}
          <div className="bg-white rounded-xl border border-[#14213D]/10 p-3.5 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-3 border-b border-[#14213D]/10 pb-2">
              <h2 className="flex items-center gap-1.5 text-xs font-semibold text-[#14213D]"
                  style={{ fontFamily: "'Libre Baskerville', serif" }}>
                <Bell className="h-3.5 w-3.5 text-[#1F1F1F]/50" /> Notifications & Activity
              </h2>
            </div>
            <div className="relative pl-3 border-l border-[#14213D]/10 flex flex-col gap-4">
              <div className="relative">
                <div className="absolute -left-[17px] top-1 h-2 w-2 rounded-full bg-blue-500 border-2 border-white"></div>
                <div className="text-[10px] font-bold text-[#14213D]">Hearing Reminder</div>
                <div className="text-[10px] text-[#1F1F1F]/70 leading-relaxed mt-0.5">
                  You have a hearing scheduled for tomorrow at 10:00 AM at Sessions Court.
                </div>
                <div className="text-[8px] text-[#1F1F1F]/40 mt-1">2 hours ago</div>
              </div>
              <div className="relative">
                <div className="absolute -left-[17px] top-1 h-2 w-2 rounded-full bg-emerald-500 border-2 border-white"></div>
                <div className="text-[10px] font-bold text-[#14213D]">Document Shared</div>
                <div className="text-[10px] text-[#1F1F1F]/70 leading-relaxed mt-0.5">
                  Advocate Haris shared "Bail_Application_Signed.pdf" with you.
                </div>
                <div className="text-[8px] text-[#1F1F1F]/40 mt-1">Yesterday</div>
              </div>
              <div className="relative">
                <div className="absolute -left-[17px] top-1 h-2 w-2 rounded-full bg-amber-500 border-2 border-white"></div>
                <div className="text-[10px] font-bold text-[#14213D]">Invoice Generated</div>
                <div className="text-[10px] text-[#1F1F1F]/70 leading-relaxed mt-0.5">
                  A new invoice INV-2024-089 has been generated.
                </div>
                <div className="text-[8px] text-[#1F1F1F]/40 mt-1">Oct 12, 2024</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </ClientShell>
  );
}
