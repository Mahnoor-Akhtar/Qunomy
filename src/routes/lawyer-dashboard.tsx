import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import LawyerShell from "@/components/dashboard/LawyerShell";
import {
  Briefcase,
  Users,
  FileText,
  Gavel,
  Plus,
  File,
  FileSpreadsheet,
  Calendar,
  CheckCircle,
  FileCheck,
  UserPlus,
  Upload,
  ArrowRight,
  AlertTriangle,
  FileDown,
  Bell
} from "lucide-react";

export const Route = createFileRoute("/lawyer-dashboard")({
  component: LawyerDashboard,
});

function LawyerDashboard() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("qanomy_user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);
  const isMember = user?.email === "ijaz@gmail.com";

  const hearingsData = isMember ? [
    { time: "10:00 AM", title: "Muhammad Ahmad vs State", num: "Criminal Case No. 123/2024", court: "Sessions Court, Lahore", judge: "Judge: M. Aslam Khan", room: "Court Room 3" },
    { time: "01:00 PM", title: "Fatima Bibi vs Asif Khan", num: "Family Case No. 789/2024", court: "Family Court, Lahore", judge: "Judge: Farah Naz", room: "Court Room 2" }
  ] : [
    { time: "10:00 AM", title: "Muhammad Ahmad vs State", num: "Criminal Case No. 123/2024", court: "Sessions Court, Lahore", judge: "Judge: M. Aslam Khan", room: "Court Room 3" },
    { time: "11:30 AM", title: "ABC Corp vs XYZ Bank", num: "Civil Suit No. 456/2023", court: "Banking Court, Lahore", judge: "Judge: Saima Parveen", room: "Court Room 1" },
    { time: "01:00 PM", title: "Fatima Bibi vs Asif Khan", num: "Family Case No. 789/2024", court: "Family Court, Lahore", judge: "Judge: Farah Naz", room: "Court Room 2" },
    { time: "03:00 PM", title: "The State vs Imran Ali", num: "FIR No. 987/2024", court: "Anti Terrorism Court", judge: "Judge: M. Tariq Mehmood", room: "Court Room 1" },
  ];

  return (
    <LawyerShell active="dashboard">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-[#14213D] flex items-center gap-2"
              style={{ fontFamily: "'Libre Baskerville', serif" }}>
            Good morning, {user?.name ?? "Haris"}! <span className="text-xl">👋</span>
          </h1>
          <p className="text-xs text-[#1F1F1F]/60 mt-1">Here's what's happening with your cases today.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#B8860B] hover:bg-[#14213D] text-white px-4 py-2 rounded-full text-xs font-semibold transition-colors shadow-sm">
          <Plus className="h-4 w-4" />
          Add New Case
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {/* KPI 1 */}
        <div className="rounded-xl border border-[#14213D]/10 bg-white p-3.5 transition-shadow hover:shadow-[0_8px_24px_-12px_rgba(20,33,61,0.3)]">
          <div className="flex items-start gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
              <Briefcase className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-medium leading-tight text-[#1F1F1F]/55">
                {isMember ? "My Active Cases" : "Total Active Cases"}
              </div>
              <div className="mt-0.5 truncate text-lg font-bold text-[#14213D]"
                   style={{ fontFamily: "'Libre Baskerville', serif" }}>{isMember ? "24" : "326"}</div>
            </div>
          </div>
          <div className="mt-2 text-[10px] font-medium text-emerald-600">
            ↑ 12 <span className="text-[#1F1F1F]/40 font-normal">this month</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="rounded-xl border border-[#14213D]/10 bg-white p-3.5 transition-shadow hover:shadow-[0_8px_24px_-12px_rgba(20,33,61,0.3)]">
          <div className="flex items-start gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <Users className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-medium leading-tight text-[#1F1F1F]/55">
                {isMember ? "My Clients" : "Total Clients"}
              </div>
              <div className="mt-0.5 truncate text-lg font-bold text-[#14213D]"
                   style={{ fontFamily: "'Libre Baskerville', serif" }}>{isMember ? "12" : "152"}</div>
            </div>
          </div>
          <div className="mt-2 text-[10px] font-medium text-[#1F1F1F]/40">
            ↑ 8 this month
          </div>
        </div>

        {/* KPI 3 */}
        <div className="rounded-xl border border-[#14213D]/10 bg-white p-3.5 transition-shadow hover:shadow-[0_8px_24px_-12px_rgba(20,33,61,0.3)]">
          <div className="flex items-start gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <FileText className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-medium leading-tight text-[#1F1F1F]/55">
                {isMember ? "My Pending Invoices" : "Pending Invoices"}
              </div>
              <div className="mt-0.5 truncate text-lg font-bold text-[#14213D]"
                   style={{ fontFamily: "'Libre Baskerville', serif" }}>{isMember ? "3" : "48"}</div>
            </div>
          </div>
          <div className="mt-2 text-[10px] font-medium text-[#1F1F1F]/50">
            PKR 1,245,000
          </div>
        </div>

        {/* KPI 4 */}
        <div className="rounded-xl border border-[#14213D]/10 bg-white p-3.5 transition-shadow hover:shadow-[0_8px_24px_-12px_rgba(20,33,61,0.3)]">
          <div className="flex items-start gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
              <Gavel className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-medium leading-tight text-[#1F1F1F]/55">
                {isMember ? "My Today's Hearings" : "Today's Hearings"}
              </div>
              <div className="mt-0.5 truncate text-lg font-bold text-[#14213D]"
                   style={{ fontFamily: "'Libre Baskerville', serif" }}>{isMember ? "2" : "15"}</div>
            </div>
          </div>
          <button className="mt-2 text-[10px] font-medium text-blue-600 hover:text-[#14213D] underline">
            View cause list
          </button>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-3">
        
        {/* Left Section (Spans 3 columns on xl) */}
        <div className="xl:col-span-3 flex flex-col gap-3">
          
          {/* Top Row of Left Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            
            {/* Today's Hearings Table (Spans 2 columns on lg) */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-[#14213D]/10 overflow-hidden flex flex-col p-3.5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="flex items-center gap-1.5 text-xs font-semibold text-[#14213D]"
                    style={{ fontFamily: "'Libre Baskerville', serif" }}>
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-[#14213D]/5">
                    <Gavel className="h-3 w-3" />
                  </span>
                  Today's Hearings
                  <span className="text-[#1F1F1F]/40 font-normal text-[10px] ml-1" style={{ fontFamily: "'Inter', sans-serif" }}>(Tuesday, 22 July 2025)</span>
                </h2>
                <button className="rounded-full border border-[#14213D]/15 bg-white px-2.5 py-1 text-[10px] font-semibold text-[#14213D] transition-colors hover:border-[#B8860B] hover:text-[#B8860B]">
                  View All
                </button>
              </div>
              
              <div className="flex-1 overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <tbody>
                    {hearingsData.map((h, i) => (
                      <tr key={i} className="border-t border-[#14213D]/5 hover:bg-[#14213D]/[0.02] transition">
                        <td className="py-3 px-2 w-20">
                          <div className="text-[11px] font-bold text-emerald-600 leading-tight">{h.time.split(' ')[0]}</div>
                          <div className="text-[9px] font-bold text-emerald-600 leading-tight">{h.time.split(' ')[1]}</div>
                        </td>
                        <td className="py-3 px-2">
                          <div className="text-[11px] font-semibold text-[#14213D]">{h.title}</div>
                          <div className="text-[9px] text-[#1F1F1F]/50 mt-0.5">{h.num}</div>
                        </td>
                        <td className="py-3 px-2">
                          <div className="text-[11px] text-[#1F1F1F]/75">{h.court}</div>
                          <div className="text-[9px] text-[#1F1F1F]/50 mt-0.5">{h.judge}</div>
                        </td>
                        <td className="py-3 px-2">
                          <div className="text-[10px] text-[#1F1F1F]/70">{h.room}</div>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-semibold bg-emerald-100 text-emerald-700">
                            On Time
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-3 pt-3 border-t border-[#14213D]/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] text-[#1F1F1F]/50">
                  <Calendar className="h-3 w-3" />
                  Cause list exported 22 Jul 2025
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#1F1F1F]/70 mr-1 hidden sm:inline">Export</span>
                  <button className="flex items-center gap-1 px-2 py-1 border border-[#14213D]/15 rounded bg-white text-[9px] font-medium text-[#14213D] hover:border-[#B8860B] hover:text-[#B8860B] transition">
                    <File className="h-2.5 w-2.5" /> PDF
                  </button>
                  <button className="flex items-center gap-1 px-2 py-1 border border-[#14213D]/15 rounded bg-white text-[9px] font-medium text-[#14213D] hover:border-[#B8860B] hover:text-[#B8860B] transition">
                    <FileSpreadsheet className="h-2.5 w-2.5" /> Excel
                  </button>
                </div>
              </div>
            </div>

            {/* Upcoming Hearings (Spans 1 column on lg) */}
            <div className="lg:col-span-1 bg-white rounded-xl border border-[#14213D]/10 flex flex-col p-3.5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="flex items-center gap-1.5 text-xs font-semibold text-[#14213D]"
                    style={{ fontFamily: "'Libre Baskerville', serif" }}>
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-[#14213D]/5">
                    <Calendar className="h-3 w-3" />
                  </span>
                  Upcoming Hearings
                </h2>
                <button className="rounded-full border border-[#14213D]/15 bg-white px-2.5 py-1 text-[10px] font-semibold text-[#14213D] transition-colors hover:border-[#B8860B] hover:text-[#B8860B]">
                  View All
                </button>
              </div>
              
              <div className="flex-1 space-y-3">
                {[
                  { d: "23", m: "Jul", day: "Wednesday", h: "8 Hearings" },
                  { d: "24", m: "Jul", day: "Thursday", h: "11 Hearings" },
                  { d: "25", m: "Jul", day: "Friday", h: "7 Hearings" },
                  { d: "26", m: "Jul", day: "Saturday", h: "5 Hearings" },
                  { d: "28", m: "Jul", day: "Monday", h: "9 Hearings" },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-center w-6">
                          <div className="text-[13px] font-bold text-[#14213D] leading-tight">{item.d}</div>
                          <div className="text-[8px] font-bold text-[#1F1F1F]/50 uppercase">{item.m}</div>
                        </div>
                        <div className="text-[11px] font-medium text-[#1F1F1F]/70">{item.day}</div>
                      </div>
                      <div className="text-[9px] font-semibold text-[#14213D] bg-[#14213D]/5 px-2 py-0.5 rounded">{item.h}</div>
                    </div>
                    {i < 4 && <div className="w-full h-px bg-[#14213D]/5 mt-3"></div>}
                  </div>
                ))}
              </div>
              
              <div className="mt-3 pt-3 border-t border-[#14213D]/10 text-center">
                <button className="text-[10px] font-semibold text-blue-600 flex items-center justify-center gap-1.5 w-full hover:text-[#14213D]">
                  <Calendar className="h-3 w-3" /> View Full Calendar
                </button>
              </div>
            </div>

          </div>

          {/* Quick Actions (Full width of the Left Section) */}
          <div className="bg-white rounded-xl border border-[#14213D]/10 p-3.5">
            <h2 className="flex items-center gap-1.5 text-xs font-semibold text-[#14213D] mb-3"
                style={{ fontFamily: "'Libre Baskerville', serif" }}>
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              <button className="flex items-center gap-1.5 justify-center p-2 border border-[#14213D]/10 rounded bg-white hover:border-[#B8860B] group transition">
                <Plus className="h-3.5 w-3.5 text-emerald-600 group-hover:text-[#B8860B]" />
                <span className="text-[9px] font-medium text-[#14213D] group-hover:text-[#B8860B]">Add Case</span>
              </button>
              
              <button className="flex items-center gap-1.5 justify-center p-2 border border-[#14213D]/10 rounded bg-white hover:border-[#B8860B] group transition">
                <UserPlus className="h-3.5 w-3.5 text-blue-600 group-hover:text-[#B8860B]" />
                <span className="text-[9px] font-medium text-[#14213D] group-hover:text-[#B8860B]">Add Client</span>
              </button>

              <button className="flex items-center gap-1.5 justify-center p-2 border border-[#14213D]/10 rounded bg-white hover:border-[#B8860B] group transition">
                <Upload className="h-3.5 w-3.5 text-purple-600 group-hover:text-[#B8860B]" />
                <span className="text-[9px] font-medium text-[#14213D] group-hover:text-[#B8860B]">Upload Doc</span>
              </button>

              <button className="flex items-center gap-1.5 justify-center p-2 border border-[#14213D]/10 rounded bg-white hover:border-[#B8860B] group transition">
                <CheckCircle className="h-3.5 w-3.5 text-amber-500 group-hover:text-[#B8860B]" />
                <span className="text-[9px] font-medium text-[#14213D] group-hover:text-[#B8860B]">Mark Done</span>
              </button>

              <button className="flex items-center gap-1.5 justify-center p-2 border border-[#14213D]/10 rounded bg-white hover:border-[#B8860B] group transition">
                <FileText className="h-3.5 w-3.5 text-sky-600 group-hover:text-[#B8860B]" />
                <span className="text-[9px] font-medium text-[#14213D] group-hover:text-[#B8860B]">Invoice</span>
              </button>

              {!isMember && (
                <button className="flex items-center gap-1.5 justify-center p-2 border border-[#14213D]/10 rounded bg-white hover:border-[#B8860B] group transition">
                  <FileDown className="h-3.5 w-3.5 text-slate-600 group-hover:text-[#B8860B]" />
                  <span className="text-[9px] font-medium text-[#14213D] group-hover:text-[#B8860B]">Export</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Right Section (Spans 1 column on xl) */}
        <div className="xl:col-span-1 flex flex-col gap-3">
          
          {/* Overdue / Missed */}
          <div className="bg-rose-50/50 rounded-xl border border-rose-100 p-3.5">
            <div className="flex items-start justify-between mb-1">
              <h2 className="text-xs font-semibold text-rose-800" style={{ fontFamily: "'Libre Baskerville', serif" }}>Overdue / Missed</h2>
              <AlertTriangle className="h-4 w-4 text-rose-500" />
            </div>
            <div className="text-2xl font-bold text-rose-600 leading-tight">{isMember ? "1" : "6"}</div>
            <div className="text-[10px] font-semibold text-rose-600 mb-1">Hearings Overdue</div>
            <div className="text-[9px] text-rose-700/60 mb-2">Update dates to avoid missing cases</div>
            <button className="w-full bg-rose-100 hover:bg-rose-200 text-rose-700 py-1.5 rounded text-[10px] font-semibold transition">
              View Overdue Cases
            </button>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-[#14213D]/10 flex flex-col p-3.5 h-full">
             <div className="flex items-center justify-between mb-3">
              <h2 className="flex items-center gap-1.5 text-xs font-semibold text-[#14213D]"
                  style={{ fontFamily: "'Libre Baskerville', serif" }}>
                <span className="flex h-5 w-5 items-center justify-center rounded bg-[#14213D]/5">
                  <Bell className="h-3 w-3" />
                </span>
                Recent Activity
              </h2>
              <button className="rounded-full border border-[#14213D]/15 bg-white px-2.5 py-1 text-[10px] font-semibold text-[#14213D] transition-colors hover:border-[#B8860B] hover:text-[#B8860B]">
                View All
              </button>
            </div>
            
            <div className="flex-1 relative pl-1 pb-1">
              <div className="absolute left-4 top-2 bottom-2 w-px bg-[#14213D]/10"></div>
              
              <div className="space-y-4 relative z-10">
                <div className="flex gap-3">
                  <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 border-[2px] border-white">
                    <Calendar className="h-3 w-3" />
                  </div>
                  <div>
                    <div className="text-[10px] text-[#1F1F1F]/80">
                      <span className="font-semibold text-[#14213D]">{isMember ? "You" : "Aqsa Malik"}</span> updated hearing date in Case #123/2024
                    </div>
                    <div className="text-[9px] text-[#1F1F1F]/40 mt-0.5">10 minutes ago</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 border-[2px] border-white">
                    <FileText className="h-3 w-3" />
                  </div>
                  <div>
                    <div className="text-[10px] text-[#1F1F1F]/80">Document uploaded in Case #456/2023</div>
                    <div className="text-[9px] text-[#1F1F1F]/40 mt-0.5">25 minutes ago</div>
                  </div>
                </div>

                {!isMember && (
                  <>
                    <div className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 border-[2px] border-white">
                        <FileCheck className="h-3 w-3" />
                      </div>
                      <div>
                        <div className="text-[10px] text-[#1F1F1F]/80">Invoice #INV-2025-034 generated for ABC Corp</div>
                        <div className="text-[9px] text-[#1F1F1F]/40 mt-0.5">1 hour ago</div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 border-[2px] border-white">
                        <CheckCircle className="h-3 w-3" />
                      </div>
                      <div>
                        <div className="text-[10px] text-[#1F1F1F]/80">Hearing marked completed in Case #789/2024</div>
                        <div className="text-[9px] text-[#1F1F1F]/40 mt-0.5">2 hours ago</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 border-[2px] border-white">
                        <Users className="h-3 w-3" />
                      </div>
                      <div>
                        <div className="text-[10px] text-[#1F1F1F]/80">New client added: Zainab Khan</div>
                        <div className="text-[9px] text-[#1F1F1F]/40 mt-0.5">3 hours ago</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="mt-2 pt-2 border-t border-[#14213D]/10 text-center">
              <button className="text-[10px] font-semibold text-blue-600 flex items-center justify-center gap-1 w-full hover:text-[#14213D]">
                View All Activity <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </LawyerShell>
  );
}
