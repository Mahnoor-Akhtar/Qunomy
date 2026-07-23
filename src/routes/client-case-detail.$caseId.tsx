import { createFileRoute, Link } from "@tanstack/react-router";
import ClientShell from "@/components/dashboard/ClientShell";
import {
  Briefcase,
  Building,
  Calendar,
  Gavel,
  User,
  CheckCircle,
  File
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/client-case-detail/$caseId")({
  component: ClientCaseDetail,
});

function ClientCaseDetail() {
  const { caseId } = Route.useParams();
  const [activeTab, setActiveTab] = useState("case-info");

  const tabs = [
    { id: "case-info", label: "Case Info" },
    { id: "hearing-history", label: "Hearing History" }
  ];

  return (
    <ClientShell active="cases">
      <div className="flex flex-col gap-5 max-w-6xl mx-auto h-full pb-10">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#14213D]" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              Case Detail
            </h1>
            <div className="text-xs text-[#1F1F1F]/60 mt-1 flex items-center gap-1.5">
              <Link to="/client-dashboard" className="hover:text-[#14213D] transition">Dashboard</Link>
              <span className="text-[10px]">›</span>
              <Link to="/client-cases" className="hover:text-[#14213D] transition">My Cases</Link>
              <span className="text-[10px]">›</span>
              <span className="text-[#14213D] font-medium">Case {caseId}</span>
            </div>
          </div>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Main Card */}
          <div className="lg:col-span-2 bg-white border border-[#14213D]/10 rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0 border border-blue-100">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#14213D] leading-tight" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                  Muhammad Ahmad vs State
                </h2>
                <div className="text-xs text-[#1F1F1F]/60 mt-1 mb-3">Criminal Case No. 123/2024</div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-bold">
                    Active
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-5 border-t border-[#14213D]/10">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#1F1F1F]/60 font-medium mb-1">
                  <Building className="h-3 w-3" /> Court
                </div>
                <div className="text-[13px] font-semibold text-[#14213D]">Sessions Court, Lahore</div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#1F1F1F]/60 font-medium mb-1">
                  <Calendar className="h-3 w-3" /> Next Hearing
                </div>
                <div className="text-[13px] font-semibold text-[#14213D]">22 Jul 2025, 10:00 AM</div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#1F1F1F]/60 font-medium mb-1">
                  <Gavel className="h-3 w-3" /> Judge
                </div>
                <div className="text-[13px] font-semibold text-[#14213D]">M. Aslam Khan</div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#1F1F1F]/60 font-medium mb-1">
                  <User className="h-3 w-3" /> Assigned Lawyer
                </div>
                <div className="text-[13px] font-semibold text-[#14213D]">Aqsa Malik</div>
              </div>
            </div>
          </div>

          {/* Quick Info Card */}
          <div className="bg-white border border-[#14213D]/10 rounded-xl p-5 shadow-sm flex flex-col justify-center">
            <h3 className="text-xs font-bold text-[#14213D] mb-4" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              Quick Info
            </h3>
            
            <div className="grid grid-cols-2 gap-y-5 gap-x-4">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#1F1F1F]/60 font-medium mb-1">
                  <Calendar className="h-3 w-3" /> Filing Date
                </div>
                <div className="text-[11px] font-semibold text-[#14213D]">05 Jan 2024</div>
              </div>
              <div className="col-span-2">
                <div className="flex items-center gap-1.5 text-[10px] text-[#1F1F1F]/60 font-medium mb-1">
                  <CheckCircle className="h-3 w-3" /> Case Stage
                </div>
                <div className="text-[11px] font-semibold text-[#14213D]">Evidence</div>
              </div>
              <div className="col-span-2">
                <div className="flex items-center gap-1.5 text-[10px] text-[#1F1F1F]/60 font-medium mb-1">
                  <File className="h-3 w-3" /> Last Order
                </div>
                <div className="text-[11px] font-semibold text-[#14213D]">Witness summoned.</div>
              </div>
            </div>
          </div>

        </div>

        {/* Tabs Content */}
        <div className="bg-white border border-[#14213D]/10 rounded-xl shadow-sm overflow-hidden flex flex-col">
          
          {/* Tabs Navigation */}
          <div className="flex items-center px-2 pt-2 border-b border-[#14213D]/10 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-[11px] font-semibold transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-[#B8860B] text-[#14213D]"
                    : "border-transparent text-[#1F1F1F]/60 hover:text-[#14213D] hover:border-[#14213D]/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Body */}
          <div className="p-5">
            {activeTab === "case-info" && (
              <div className="grid grid-cols-1 gap-8 max-w-2xl">
                <div>
                  <h3 className="text-[13px] font-bold text-[#14213D] mb-5" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                    Case Information
                  </h3>
                  
                  <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr] gap-y-4 text-xs">
                    <div className="text-[#1F1F1F]/60 font-medium">Case Title / Case No.</div>
                    <div className="font-semibold text-[#14213D] relative before:content-[':'] before:absolute before:-left-6 sm:before:-left-8 before:text-[#1F1F1F]/40">
                      Muhammad Ahmad vs State / Criminal Case No. 123/2024
                    </div>
                    
                    <div className="text-[#1F1F1F]/60 font-medium">Court</div>
                    <div className="font-semibold text-[#14213D] relative before:content-[':'] before:absolute before:-left-6 sm:before:-left-8 before:text-[#1F1F1F]/40">
                      Sessions Court, Lahore
                    </div>
                    
                    <div className="text-[#1F1F1F]/60 font-medium">Case Type</div>
                    <div className="font-semibold text-[#14213D] relative before:content-[':'] before:absolute before:-left-6 sm:before:-left-8 before:text-[#1F1F1F]/40">
                      Criminal
                    </div>
                    
                    <div className="text-[#1F1F1F]/60 font-medium">Next Hearing Date</div>
                    <div className="font-semibold text-[#14213D] relative before:content-[':'] before:absolute before:-left-6 sm:before:-left-8 before:text-[#1F1F1F]/40">
                      22 Jul 2025, 10:00 AM
                    </div>
                    
                    <div className="text-[#1F1F1F]/60 font-medium">Judge / Bench</div>
                    <div className="font-semibold text-[#14213D] relative before:content-[':'] before:absolute before:-left-6 sm:before:-left-8 before:text-[#1F1F1F]/40">
                      M. Aslam Khan
                    </div>
                    
                    <div className="text-[#1F1F1F]/60 font-medium">Opposing Party</div>
                    <div className="font-semibold text-[#14213D] relative before:content-[':'] before:absolute before:-left-6 sm:before:-left-8 before:text-[#1F1F1F]/40">
                      State
                    </div>
                    
                    <div className="text-[#1F1F1F]/60 font-medium">Last Order / Remarks</div>
                    <div className="font-semibold text-[#14213D] relative before:content-[':'] before:absolute before:-left-6 sm:before:-left-8 before:text-[#1F1F1F]/40">
                      Witness summoned. Next date fixed for recording evidence.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "hearing-history" && (
              <div>
                <h3 className="text-[13px] font-bold text-[#14213D] mb-5" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                  Hearing History
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-[#14213D]/10 bg-gray-50/50">
                        <th className="py-2.5 px-4 text-[10px] font-semibold text-[#1F1F1F]/60 uppercase">Date</th>
                        <th className="py-2.5 px-4 text-[10px] font-semibold text-[#1F1F1F]/60 uppercase">Purpose</th>
                        <th className="py-2.5 px-4 text-[10px] font-semibold text-[#1F1F1F]/60 uppercase">Outcome/Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#14213D]/5">
                        <td className="py-3 px-4 text-[11px] font-bold text-[#14213D]">22 Jun 2025</td>
                        <td className="py-3 px-4 text-[11px] text-[#1F1F1F]/80">Framing of Charge</td>
                        <td className="py-3 px-4 text-[11px] text-[#1F1F1F]/80">Charge framed, prosecution witnesses summoned.</td>
                      </tr>
                      <tr className="border-b border-[#14213D]/5">
                        <td className="py-3 px-4 text-[11px] font-bold text-[#14213D]">15 May 2025</td>
                        <td className="py-3 px-4 text-[11px] text-[#1F1F1F]/80">Distribution of Copies</td>
                        <td className="py-3 px-4 text-[11px] text-[#1F1F1F]/80">Copies distributed under 265-C CrPC.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </ClientShell>
  );
}
