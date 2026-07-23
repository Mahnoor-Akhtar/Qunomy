import { createFileRoute, Link } from "@tanstack/react-router";
import LawyerShell from "@/components/dashboard/LawyerShell";
import {
  Check,
  Pencil,
  MoreVertical,
  Briefcase,
  Building,
  Calendar,
  Gavel,
  User,
  FileText,
  CheckCircle,
  File,
  ArrowRight,
  Plus
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/lawyer-case-detail/$caseId")({
  component: CaseDetail,
});

function CaseDetail() {
  const { caseId } = Route.useParams();
  const [activeTab, setActiveTab] = useState("case-info");

  const tabs = [
    { id: "case-info", label: "Case Info" },
    { id: "hearing-history", label: "Hearing History" },
    { id: "documents", label: "Documents (8)" },
    { id: "notes", label: "Notes (5)" },
    { id: "client-info", label: "Client Info" },
    { id: "invoices", label: "Invoices (3)" },
    { id: "activity-log", label: "Activity Log" },
  ];

  return (
    <LawyerShell active="cases">
      <div className="flex flex-col gap-5 max-w-6xl mx-auto h-full pb-10">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#14213D]" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              Case Detail
            </h1>
            <div className="text-xs text-[#1F1F1F]/60 mt-1 flex items-center gap-1.5">
              <Link to="/lawyer-dashboard" className="hover:text-[#14213D] transition">Dashboard</Link>
              <span className="text-[10px]">›</span>
              <Link to="/lawyer-cases" className="hover:text-[#14213D] transition">Cases</Link>
              <span className="text-[10px]">›</span>
              <span className="text-[#14213D] font-medium">Case Detail</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 px-4 py-2 rounded-lg text-xs font-semibold transition-colors shadow-sm">
              <Check className="h-4 w-4" />
              Mark Hearing Done
            </button>
            <button className="flex items-center gap-1.5 bg-white text-[#14213D] hover:bg-gray-50 border border-[#14213D]/15 px-4 py-2 rounded-lg text-xs font-semibold transition-colors shadow-sm">
              <Pencil className="h-4 w-4" />
              Edit Case
            </button>
            <button className="flex items-center gap-1.5 bg-white text-[#14213D] hover:bg-gray-50 border border-[#14213D]/15 px-3 py-2 rounded-lg text-xs font-semibold transition-colors shadow-sm">
              <MoreVertical className="h-4 w-4" />
              More
            </button>
          </div>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Main Card */}
          <div className="lg:col-span-2 bg-white border border-[#14213D]/10 rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0 border border-emerald-100">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#14213D] leading-tight" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                  ABC Corp vs XYZ Bank
                </h2>
                <div className="text-xs text-[#1F1F1F]/60 mt-1 mb-3">Civil Suit No. 456/2023</div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded bg-emerald-100/70 text-emerald-700 text-[10px] font-semibold">
                    Pending
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded border border-amber-200 bg-amber-50 text-amber-600 text-[10px] font-semibold">
                    Medium Priority
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-5 border-t border-[#14213D]/10">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#1F1F1F]/60 font-medium mb-1">
                  <Building className="h-3 w-3" /> Court
                </div>
                <div className="text-[13px] font-semibold text-[#14213D]">Banking Court, Lahore</div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#1F1F1F]/60 font-medium mb-1">
                  <Calendar className="h-3 w-3" /> Next Hearing
                </div>
                <div className="text-[13px] font-semibold text-[#14213D]">23 Jul 2025, 11:30 AM</div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#1F1F1F]/60 font-medium mb-1">
                  <Gavel className="h-3 w-3" /> Judge
                </div>
                <div className="text-[13px] font-semibold text-[#14213D]">Saima Parveen</div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#1F1F1F]/60 font-medium mb-1">
                  <User className="h-3 w-3" /> Assigned Lawyer
                </div>
                <div className="text-[13px] font-semibold text-[#14213D]">Saad Iqbal</div>
              </div>
            </div>
          </div>

          {/* Quick Info Card */}
          <div className="bg-white border border-[#14213D]/10 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold text-[#14213D] mb-4" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              Quick Info
            </h3>
            
            <div className="grid grid-cols-2 gap-y-5 gap-x-4">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#1F1F1F]/60 font-medium mb-1">
                  <Calendar className="h-3 w-3" /> Filing Date
                </div>
                <div className="text-[11px] font-semibold text-[#14213D]">12 Oct 2023</div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#1F1F1F]/60 font-medium mb-1">
                  <FileText className="h-3 w-3" /> Case Type
                </div>
                <div className="text-[11px] font-semibold text-[#14213D]">Civil</div>
              </div>
              <div className="col-span-2">
                <div className="flex items-center gap-1.5 text-[10px] text-[#1F1F1F]/60 font-medium mb-1">
                  <CheckCircle className="h-3 w-3" /> Case Stage
                </div>
                <div className="text-[11px] font-semibold text-[#14213D]">Arguments</div>
              </div>
              <div className="col-span-2">
                <div className="flex items-center gap-1.5 text-[10px] text-[#1F1F1F]/60 font-medium mb-1">
                  <File className="h-3 w-3" /> Last Order
                </div>
                <div className="text-[11px] font-semibold text-[#14213D]">Written arguments directed.</div>
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
                    ? "border-emerald-600 text-emerald-700"
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left: Case Information List */}
                <div className="lg:col-span-2">
                  <h3 className="text-[13px] font-bold text-[#14213D] mb-5" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                    Case Information
                  </h3>
                  
                  <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr] gap-y-4 text-xs">
                    <div className="text-[#1F1F1F]/60 font-medium">Case Title / Case No.</div>
                    <div className="font-semibold text-[#14213D] relative before:content-[':'] before:absolute before:-left-6 sm:before:-left-8 before:text-[#1F1F1F]/40">
                      ABC Corp vs XYZ Bank / CS 456/2023
                    </div>
                    
                    <div className="text-[#1F1F1F]/60 font-medium">Court</div>
                    <div className="font-semibold text-[#14213D] relative before:content-[':'] before:absolute before:-left-6 sm:before:-left-8 before:text-[#1F1F1F]/40">
                      Banking Court, Lahore
                    </div>
                    
                    <div className="text-[#1F1F1F]/60 font-medium">Case Type</div>
                    <div className="font-semibold text-[#14213D] relative before:content-[':'] before:absolute before:-left-6 sm:before:-left-8 before:text-[#1F1F1F]/40">
                      Civil
                    </div>
                    
                    <div className="text-[#1F1F1F]/60 font-medium">Filing Date</div>
                    <div className="font-semibold text-[#14213D] relative before:content-[':'] before:absolute before:-left-6 sm:before:-left-8 before:text-[#1F1F1F]/40">
                      12 Oct 2023
                    </div>
                    
                    <div className="text-[#1F1F1F]/60 font-medium">Next Hearing Date</div>
                    <div className="font-semibold text-[#14213D] relative before:content-[':'] before:absolute before:-left-6 sm:before:-left-8 before:text-[#1F1F1F]/40">
                      23 Jul 2025, 11:30 AM
                    </div>
                    
                    <div className="text-[#1F1F1F]/60 font-medium">Judge / Bench</div>
                    <div className="font-semibold text-[#14213D] relative before:content-[':'] before:absolute before:-left-6 sm:before:-left-8 before:text-[#1F1F1F]/40">
                      Saima Parveen
                    </div>
                    
                    <div className="text-[#1F1F1F]/60 font-medium">Case Status</div>
                    <div className="font-semibold text-[#14213D] relative before:content-[':'] before:absolute before:-left-6 sm:before:-left-8 before:text-[#1F1F1F]/40">
                      Pending
                    </div>
                    
                    <div className="text-[#1F1F1F]/60 font-medium">Case Stage</div>
                    <div className="font-semibold text-[#14213D] relative before:content-[':'] before:absolute before:-left-6 sm:before:-left-8 before:text-[#1F1F1F]/40">
                      Arguments
                    </div>
                    
                    <div className="text-[#1F1F1F]/60 font-medium">Priority</div>
                    <div className="font-semibold text-[#14213D] relative before:content-[':'] before:absolute before:-left-6 sm:before:-left-8 before:text-[#1F1F1F]/40">
                      Medium
                    </div>
                    
                    <div className="text-[#1F1F1F]/60 font-medium">Assigned Lawyer</div>
                    <div className="font-semibold text-[#14213D] relative before:content-[':'] before:absolute before:-left-6 sm:before:-left-8 before:text-[#1F1F1F]/40">
                      Saad Iqbal
                    </div>
                    
                    <div className="text-[#1F1F1F]/60 font-medium">Opposing Party</div>
                    <div className="font-semibold text-[#14213D] relative before:content-[':'] before:absolute before:-left-6 sm:before:-left-8 before:text-[#1F1F1F]/40">
                      XYZ Bank Limited
                    </div>
                    
                    <div className="text-[#1F1F1F]/60 font-medium">Opposing Counsel</div>
                    <div className="font-semibold text-[#14213D] relative before:content-[':'] before:absolute before:-left-6 sm:before:-left-8 before:text-[#1F1F1F]/40">
                      Rana Usman Khalid
                    </div>
                    
                    <div className="text-[#1F1F1F]/60 font-medium">Last Order / Remarks</div>
                    <div className="font-semibold text-[#14213D] relative before:content-[':'] before:absolute before:-left-6 sm:before:-left-8 before:text-[#1F1F1F]/40">
                      Written arguments directed. Next date fixed.
                    </div>
                  </div>
                </div>

                {/* Right: Timeline */}
                <div className="border-t lg:border-t-0 lg:border-l border-[#14213D]/10 pt-6 lg:pt-0 lg:pl-8">
                   <h3 className="text-[13px] font-bold text-[#14213D] mb-5" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                    Timeline <span className="text-[10px] font-medium text-[#1F1F1F]/50 font-sans ml-1">(Latest Activity)</span>
                  </h3>
                  
                  <div className="relative pl-2 pb-2">
                    <div className="absolute left-[13px] top-3 bottom-0 w-px bg-[#14213D]/10"></div>
                    
                    <div className="space-y-6 relative z-10">
                      
                      {/* Timeline Item 1 */}
                      <div className="flex gap-4">
                        <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 border-[2px] border-white">
                          <CheckCircle className="h-3 w-3" />
                        </div>
                        <div>
                          <div className="text-[11px] font-semibold text-[#14213D]">Hearing date updated</div>
                          <div className="text-[10px] text-[#1F1F1F]/60 mt-0.5">by Saad Iqbal</div>
                          <div className="text-[9px] text-[#1F1F1F]/40 mt-1 font-medium">20 Jul 2025, 09:15 AM</div>
                        </div>
                      </div>

                      {/* Timeline Item 2 */}
                      <div className="flex gap-4">
                        <div className="h-6 w-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 border-[2px] border-white">
                          <FileText className="h-3 w-3" />
                        </div>
                        <div>
                          <div className="text-[11px] font-semibold text-[#14213D]">Document uploaded</div>
                          <div className="text-[11px] font-semibold text-[#14213D] mt-0.5 border border-[#14213D]/15 rounded px-2 py-1 inline-block bg-gray-50">
                            Written Arguments.pdf
                          </div>
                          <div className="text-[10px] text-[#1F1F1F]/60 mt-1">by Saad Iqbal</div>
                          <div className="text-[9px] text-[#1F1F1F]/40 mt-1 font-medium">18 Jul 2025, 04:40 PM</div>
                        </div>
                      </div>

                      {/* Timeline Item 3 */}
                      <div className="flex gap-4">
                        <div className="h-6 w-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 border-[2px] border-white">
                          <File className="h-3 w-3" />
                        </div>
                        <div>
                          <div className="text-[11px] font-semibold text-[#14213D]">Note added</div>
                          <div className="text-[10px] text-[#1F1F1F]/70 mt-0.5 leading-relaxed bg-[#F5F0E6]/30 p-2 rounded border border-[#14213D]/5">
                            Prepare case law list.
                          </div>
                          <div className="text-[10px] text-[#1F1F1F]/60 mt-1">by Saad Iqbal</div>
                          <div className="text-[9px] text-[#1F1F1F]/40 mt-1 font-medium">18 Jul 2025, 04:15 PM</div>
                        </div>
                      </div>

                    </div>
                  </div>

                  <button className="mt-6 text-[11px] font-semibold text-[#14213D] hover:text-[#B8860B] flex items-center gap-1.5 transition-colors border border-[#14213D]/15 rounded-lg px-4 py-2 w-full justify-center">
                    View Full Timeline <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

              </div>
            )}
            
            {activeTab !== "case-info" && (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <div className="text-[13px] font-semibold text-[#14213D] mb-1">Tab Content</div>
                <div className="text-[11px] text-[#1F1F1F]/50">Content for {tabs.find(t => t.id === activeTab)?.label} will go here.</div>
              </div>
            )}
          </div>
        </div>

      </div>
    </LawyerShell>
  );
}
