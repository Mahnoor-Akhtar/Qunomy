import { createFileRoute, useNavigate } from "@tanstack/react-router";
import ClientShell from "../components/dashboard/ClientShell";
import {
  Search,
  Calendar,
  Filter,
  Eye,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from "lucide-react";

export const Route = createFileRoute("/client-cases")({
  component: ClientCases,
});

function ClientCases() {
  const navigate = useNavigate();

  const casesData = [
    {
      id: 1,
      title: "Muhammad Ahmad vs State",
      no: "Criminal Case No. 123/2024",
      court: "Sessions Court, Lahore",
      type: "Criminal",
      nextHearingDate: "22 Jul 2025",
      nextHearingTime: "10:00 AM",
      status: "Active",
      lawyer: "Aqsa Malik",
    },
    {
      id: 2,
      title: "ABC Corp vs XYZ Bank",
      no: "Civil Suit No. 456/2023",
      court: "Banking Court, Lahore",
      type: "Civil",
      nextHearingDate: "23 Jul 2025",
      nextHearingTime: "11:30 AM",
      status: "Active",
      lawyer: "Saad Iqbal",
    },
  ];

  return (
    <ClientShell active="cases">
      <div className="flex flex-col gap-5 h-full">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#14213D]" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              My Cases
            </h1>
            <div className="text-xs text-[#1F1F1F]/60 mt-1 flex items-center gap-1.5">
              <span>Dashboard</span>
              <span className="text-[10px]">›</span>
              <span className="text-[#14213D] font-medium">My Cases</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-[#14213D]/10 rounded-xl p-3 flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F1F1F]/40" />
            <input 
              type="text" 
              placeholder="Search by case title, case no, or court..." 
              className="w-full pl-9 pr-4 py-2 border border-[#14213D]/15 rounded-lg text-[11px] focus:outline-none focus:border-[#B8860B]"
            />
          </div>
          <div className="relative">
            <select className="appearance-none pl-3 pr-8 py-2 border border-[#14213D]/15 rounded-lg text-[11px] text-[#1F1F1F]/80 focus:outline-none focus:border-[#B8860B] min-w-[120px] bg-transparent">
              <option value="">Status</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#1F1F1F]/40 pointer-events-none" />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 border border-[#14213D]/15 rounded-lg text-[11px] font-semibold text-[#14213D] hover:border-[#B8860B] hover:text-[#B8860B] transition">
            <Filter className="h-3.5 w-3.5" />
            Filters
          </button>
        </div>

        {/* Table Area */}
        <div className="bg-white border border-[#14213D]/10 rounded-xl overflow-hidden flex flex-col flex-1">
          <div className="overflow-x-auto flex-1">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#14213D]/10 text-left bg-gray-50/50">
                  <th className="py-2.5 px-4 text-[10px] font-semibold text-[#1F1F1F]/60 uppercase tracking-wider w-10">#</th>
                  <th className="py-2.5 px-4 text-[10px] font-semibold text-[#14213D] uppercase tracking-wider">Case Title / Case No.</th>
                  <th className="py-2.5 px-4 text-[10px] font-semibold text-[#14213D] uppercase tracking-wider">Court</th>
                  <th className="py-2.5 px-4 text-[10px] font-semibold text-[#14213D] uppercase tracking-wider">Case Type</th>
                  <th className="py-2.5 px-4 text-[10px] font-semibold text-[#14213D] uppercase tracking-wider">Assigned Lawyer</th>
                  <th className="py-2.5 px-4 text-[10px] font-semibold text-[#14213D] uppercase tracking-wider">Next Hearing Date</th>
                  <th className="py-2.5 px-4 text-[10px] font-semibold text-[#14213D] uppercase tracking-wider">Status</th>
                  <th className="py-2.5 px-4 text-[10px] font-semibold text-[#14213D] uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {casesData.map((c, i) => (
                  <tr 
                    key={c.id} 
                    className="border-b border-[#14213D]/5 hover:bg-[#14213D]/[0.02] transition cursor-pointer group"
                    onClick={() => navigate({ to: `/client-case-detail/${c.id}` as any })}
                  >
                    <td className="py-3 px-4 text-[10px] font-medium text-[#1F1F1F]/60">{i + 1}</td>
                    <td className="py-3 px-4">
                      <div className="text-[11px] font-bold text-[#14213D]">{c.title}</div>
                      <div className="text-[10px] text-[#1F1F1F]/50 mt-0.5">{c.no}</div>
                    </td>
                    <td className="py-3 px-4 text-[10px] text-[#1F1F1F]/80">{c.court}</td>
                    <td className="py-3 px-4 text-[10px] text-[#1F1F1F]/80">{c.type}</td>
                    <td className="py-3 px-4 text-[10px] font-medium text-[#14213D]">{c.lawyer}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#14213D]">
                        <Calendar className="h-3.5 w-3.5 text-[#1F1F1F]/50" />
                        {c.nextHearingDate}
                      </div>
                      <div className="text-[10px] text-[#1F1F1F]/50 ml-5 mt-0.5">{c.nextHearingTime}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold 
                        ${c.status === 'Active' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-slate-100 text-slate-600 border border-slate-200'}
                      `}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => navigate({ to: `/client-case-detail/${c.id}` as any })}
                          className="h-8 w-8 flex items-center justify-center rounded bg-white border border-[#14213D]/10 text-[#1F1F1F]/40 hover:text-[#14213D] hover:border-[#14213D]/30 transition"
                        >
                          <Eye className="h-4 w-4" />
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
            <div>Showing 1 to 2 of 2 cases</div>
            <div className="flex items-center gap-1.5">
              <button className="h-6 w-6 flex items-center justify-center rounded hover:bg-[#14213D]/5 transition"><ChevronLeft className="h-3.5 w-3.5" /></button>
              <button className="h-6 w-6 flex items-center justify-center rounded bg-[#B8860B] text-white font-medium">1</button>
              <button className="h-6 w-6 flex items-center justify-center rounded hover:bg-[#14213D]/5 transition"><ChevronRight className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        </div>

      </div>
    </ClientShell>
  );
}
