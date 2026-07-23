import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import LawyerShell from "@/components/dashboard/LawyerShell";
import {
  Search,
  Calendar,
  Filter,
  RotateCcw,
  Eye,
  Pencil,
  MoreVertical,
  Download,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from "lucide-react";

export const Route = createFileRoute("/lawyer-cases")({
  component: LawyerCases,
});

function LawyerCases() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("qanomy_user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);
  const isMember = user?.email === "ijaz@gmail.com";
  // Simulate permissions for members (controlled by Firm Admin)
  const canAddCases = !isMember; // change to true to simulate permission granted

  const allCasesData = [
    {
      id: 1,
      title: "Muhammad Ahmad vs State",
      no: "Criminal Case No. 123/2024",
      clientName: "Muhammad Ahmad",
      clientPhone: "0300-1234567",
      court: "Sessions Court, Lahore",
      type: "Criminal",
      nextHearingDate: "22 Jul 2025",
      nextHearingTime: "10:00 AM",
      status: "Pending",
      lawyer: "Aqsa Malik",
      priority: "High",
    },
    {
      id: 2,
      title: "ABC Corp vs XYZ Bank",
      no: "Civil Suit No. 456/2023",
      clientName: "ABC Corporation",
      clientPhone: "042-1112345",
      court: "Banking Court, Lahore",
      type: "Civil",
      nextHearingDate: "23 Jul 2025",
      nextHearingTime: "11:30 AM",
      status: "Pending",
      lawyer: "Saad Iqbal",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Fatima Bibi vs Asif Khan",
      no: "Family Case No. 789/2024",
      clientName: "Fatima Bibi",
      clientPhone: "0312-7654321",
      court: "Family Court, Lahore",
      type: "Family",
      nextHearingDate: "24 Jul 2025",
      nextHearingTime: "01:00 PM",
      status: "Adjourned",
      lawyer: "Farah Naz",
      priority: "Medium",
    },
    {
      id: 4,
      title: "The State vs Imran Ali",
      no: "FIR No. 987/2024",
      clientName: "State",
      clientPhone: "N/A",
      court: "Anti Terrorism Court, Lahore",
      type: "Criminal",
      nextHearingDate: "25 Jul 2025",
      nextHearingTime: "03:00 PM",
      status: "Pending",
      lawyer: "M. Tariq Mehmood",
      priority: "High",
    },
    {
      id: 5,
      title: "Zainab Khan vs Waseem Khan",
      no: "Family Case No. 101/2024",
      clientName: "Zainab Khan",
      clientPhone: "0305-1112233",
      court: "Family Court, Lahore",
      type: "Family",
      nextHearingDate: "28 Jul 2025",
      nextHearingTime: "11:00 AM",
      status: "Disposed",
      lawyer: "Farah Naz",
      priority: "Low",
    },
  ];

  const casesData = isMember 
    ? allCasesData.map(c => ({ ...c, lawyer: "Ijaz" })).slice(0, 2) // mock member cases
    : allCasesData;

  return (
    <LawyerShell active="cases">
      <div className="flex flex-col gap-5 h-full">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#14213D]" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              Cases
            </h1>
            <div className="text-xs text-[#1F1F1F]/60 mt-1 flex items-center gap-1.5">
              <span>Dashboard</span>
              <span className="text-[10px]">›</span>
              <span className="text-[#14213D] font-medium">Cases</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!isMember && (
              <button className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors shadow-sm">
                <Download className="h-4 w-4" />
                Import Cases
              </button>
            )}
            {(!isMember || canAddCases) && (
              <Link to="/lawyer-cases-new" className="flex items-center gap-2 bg-[#B8860B] hover:bg-[#14213D] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors shadow-sm">
                <Plus className="h-4 w-4" />
                Add New Case
              </Link>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-[#14213D]/10 rounded-xl p-3 flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F1F1F]/40" />
            <input 
              type="text" 
              placeholder="Search by case title, case no, client, court..." 
              className="w-full pl-9 pr-4 py-2 border border-[#14213D]/15 rounded-lg text-[11px] focus:outline-none focus:border-[#B8860B]"
            />
          </div>
          <div className="relative">
            <select className="appearance-none pl-3 pr-8 py-2 border border-[#14213D]/15 rounded-lg text-[11px] text-[#1F1F1F]/80 focus:outline-none focus:border-[#B8860B] min-w-[120px] bg-transparent">
              <option value="">Court</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#1F1F1F]/40 pointer-events-none" />
          </div>
          <div className="relative">
            <select className="appearance-none pl-3 pr-8 py-2 border border-[#14213D]/15 rounded-lg text-[11px] text-[#1F1F1F]/80 focus:outline-none focus:border-[#B8860B] min-w-[120px] bg-transparent">
              <option value="">Status</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#1F1F1F]/40 pointer-events-none" />
          </div>
          <div className="relative">
            <select className="appearance-none pl-3 pr-8 py-2 border border-[#14213D]/15 rounded-lg text-[11px] text-[#1F1F1F]/80 focus:outline-none focus:border-[#B8860B] min-w-[120px] bg-transparent">
              <option value="">Case Type</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#1F1F1F]/40 pointer-events-none" />
          </div>
          <div className="relative">
            <select className="appearance-none pl-3 pr-8 py-2 border border-[#14213D]/15 rounded-lg text-[11px] text-[#1F1F1F]/80 focus:outline-none focus:border-[#B8860B] min-w-[160px] bg-transparent">
              <option value="">Assigned Lawyer</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#1F1F1F]/40 pointer-events-none" />
          </div>
          <div className="relative flex items-center">
             <input 
              type="text" 
              placeholder="Next Hearing Date" 
              className="pl-3 pr-9 py-2 border border-[#14213D]/15 rounded-lg text-[11px] text-[#1F1F1F]/80 focus:outline-none focus:border-[#B8860B] w-[140px]"
            />
            <Calendar className="absolute right-3 h-3.5 w-3.5 text-[#1F1F1F]/40 pointer-events-none" />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-semibold text-[#1F1F1F]/60 hover:text-[#14213D] transition">
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 border border-[#14213D]/15 rounded-lg text-[11px] font-semibold text-[#14213D] hover:border-[#B8860B] hover:text-[#B8860B] transition">
            <Filter className="h-3.5 w-3.5" />
            More Filters
          </button>
        </div>

        {/* Table Area */}
        <div className="bg-white border border-[#14213D]/10 rounded-xl overflow-hidden flex flex-col flex-1">
          <div className="overflow-x-auto flex-1">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#14213D]/10 text-left">
                  <th className="py-2 px-2 text-[8px] font-semibold text-[#1F1F1F]/60 uppercase tracking-wider w-10">#</th>
                  <th className="py-2 px-2 text-[8px] font-semibold text-[#14213D] uppercase tracking-wider">Case Title / Case No.</th>
                  <th className="py-2 px-2 text-[8px] font-semibold text-[#14213D] uppercase tracking-wider">Client</th>
                  <th className="py-2 px-2 text-[8px] font-semibold text-[#14213D] uppercase tracking-wider">Court</th>
                  <th className="py-2 px-2 text-[8px] font-semibold text-[#14213D] uppercase tracking-wider">Case Type</th>
                  <th className="py-2 px-2 text-[8px] font-semibold text-[#14213D] uppercase tracking-wider cursor-pointer">
                    <div className="flex items-center gap-1">Next Hearing Date <span className="text-[8px]">↓</span></div>
                  </th>
                  <th className="py-2 px-2 text-[8px] font-semibold text-[#14213D] uppercase tracking-wider">Status</th>
                  <th className="py-2 px-2 text-[8px] font-semibold text-[#14213D] uppercase tracking-wider">Assigned Lawyer</th>
                  <th className="py-2 px-2 text-[8px] font-semibold text-[#14213D] uppercase tracking-wider">Priority</th>
                  <th className="py-2 px-2 text-[8px] font-semibold text-[#14213D] uppercase tracking-wider text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {casesData.map((c, i) => (
                  <tr 
                    key={c.id} 
                    className="border-b border-[#14213D]/5 hover:bg-[#14213D]/[0.02] transition cursor-pointer"
                    onClick={() => navigate({ to: `/lawyer-case-detail/${c.id}` as any })}
                  >
                    <td className="py-2 px-2 text-[9px] font-medium text-[#1F1F1F]/60">{i + 1}</td>
                    <td className="py-2 px-2">
                      <div className="text-[9px] font-semibold text-[#14213D]">{c.title}</div>
                      <div className="text-[9px] text-[#1F1F1F]/50 mt-0.5">{c.no}</div>
                    </td>
                    <td className="py-2 px-2">
                      <div className="text-[9px] font-medium text-[#14213D]">{c.clientName}</div>
                      <div className="text-[9px] text-[#1F1F1F]/50 mt-0.5">{c.clientPhone}</div>
                    </td>
                    <td className="py-2 px-2 text-[9px] text-[#1F1F1F]/80">{c.court}</td>
                    <td className="py-2 px-2 text-[9px] text-[#1F1F1F]/80">{c.type}</td>
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-1.5 text-[9px] font-semibold text-[#14213D]">
                        <Calendar className="h-3 w-3 text-[#1F1F1F]/50" />
                        {c.nextHearingDate}
                      </div>
                      <div className="text-[9px] text-[#1F1F1F]/50 ml-4.5 mt-0.5">{c.nextHearingTime}</div>
                    </td>
                    <td className="py-2 px-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-semibold 
                        ${c.status === 'Pending' ? 'bg-emerald-100/70 text-emerald-700' : ''}
                        ${c.status === 'Adjourned' ? 'bg-blue-100/70 text-blue-700' : ''}
                        ${c.status === 'Disposed' ? 'bg-slate-100 text-slate-600' : ''}
                      `}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-[9px] text-[#1F1F1F]/80">{c.lawyer}</td>
                    <td className="py-2 px-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[9px] font-semibold 
                        ${c.priority === 'High' ? 'border-rose-200 bg-rose-50 text-rose-600' : ''}
                        ${c.priority === 'Medium' ? 'border-amber-200 bg-amber-50 text-amber-600' : ''}
                        ${c.priority === 'Low' ? 'border-emerald-200 bg-emerald-50 text-emerald-600' : ''}
                      `}>
                        {c.priority}
                      </span>
                    </td>
                    <td className="py-2 px-2">
                      <div className="flex items-center justify-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => navigate({ to: `/lawyer-case-detail/${c.id}` as any })}
                          className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#1F1F1F]/40 hover:text-[#14213D] transition-colors"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button className="h-7 w-7 flex items-center justify-center rounded border border-[#14213D]/10 text-[#1F1F1F]/60 hover:text-blue-600 hover:border-blue-200 transition">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button className="h-7 w-7 flex items-center justify-center rounded border border-[#14213D]/10 text-[#1F1F1F]/60 hover:text-[#14213D] hover:border-[#14213D]/30 transition">
                          <MoreVertical className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-3 border-t border-[#14213D]/10 flex items-center justify-between text-[11px] text-[#1F1F1F]/60">
            <div>Showing 1 to 5 of 126 cases</div>
            <div className="flex items-center gap-1.5">
              <button className="h-6 w-6 flex items-center justify-center rounded hover:bg-[#14213D]/5 transition"><ChevronLeft className="h-3.5 w-3.5" /></button>
              <button className="h-6 w-6 flex items-center justify-center rounded bg-emerald-700 text-white font-medium">1</button>
              <button className="h-6 w-6 flex items-center justify-center rounded hover:bg-[#14213D]/5 font-medium transition">2</button>
              <button className="h-6 w-6 flex items-center justify-center rounded hover:bg-[#14213D]/5 font-medium transition">3</button>
              <button className="h-6 w-6 flex items-center justify-center rounded hover:bg-[#14213D]/5 font-medium transition">4</button>
              <button className="h-6 w-6 flex items-center justify-center rounded hover:bg-[#14213D]/5 font-medium transition">5</button>
              <span>...</span>
              <button className="h-6 w-6 flex items-center justify-center rounded hover:bg-[#14213D]/5 font-medium transition">13</button>
              <button className="h-6 w-6 flex items-center justify-center rounded hover:bg-[#14213D]/5 transition"><ChevronRight className="h-3.5 w-3.5" /></button>
            </div>
            <div className="flex items-center gap-2">
              Rows per page: 
              <select className="border border-[#14213D]/15 rounded px-2 py-1 bg-transparent text-[#14213D] font-medium outline-none">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </LawyerShell>
  );
}
