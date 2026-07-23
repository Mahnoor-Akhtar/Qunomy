import { createFileRoute, Link } from "@tanstack/react-router";
import LawyerShell from "@/components/dashboard/LawyerShell";
import {
  Calendar,
  Upload,
  Plus
} from "lucide-react";

export const Route = createFileRoute("/lawyer-cases-new")({
  component: AddNewCase,
});

function AddNewCase() {
  return (
    <LawyerShell active="cases">
      <div className="flex flex-col gap-5 max-w-6xl mx-auto h-full">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#14213D]" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              Add New Case
            </h1>
            <div className="text-xs text-[#1F1F1F]/60 mt-1 flex items-center gap-1.5">
              <Link to="/lawyer-dashboard" className="hover:text-[#14213D] transition">Dashboard</Link>
              <span className="text-[10px]">›</span>
              <Link to="/lawyer-cases" className="hover:text-[#14213D] transition">Cases</Link>
              <span className="text-[10px]">›</span>
              <span className="text-[#14213D] font-medium">Add New Case</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/lawyer-cases" className="px-4 py-2 rounded-lg text-xs font-semibold text-[#1F1F1F]/70 border border-[#14213D]/15 hover:bg-white hover:text-[#14213D] transition-colors shadow-sm bg-white/50">
              Cancel
            </Link>
            <button className="flex items-center gap-2 bg-[#B8860B] hover:bg-[#14213D] text-white px-5 py-2 rounded-lg text-xs font-semibold transition-colors shadow-sm">
              Save Case
            </button>
          </div>
        </div>

        {/* Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-10">
          
          {/* Left Column: Basic Information */}
          <div className="bg-white border border-[#14213D]/10 rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-bold text-[#14213D] mb-5 border-b border-[#14213D]/10 pb-3" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              Basic Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#14213D] mb-1.5">
                  Case Title / Case No. <span className="text-rose-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Muhammad Ahmad vs State / CC 123/2024" 
                  className="w-full px-3 py-2 border border-[#14213D]/15 rounded-lg text-sm text-[#1F1F1F] placeholder:text-[#1F1F1F]/30 focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#14213D] mb-1.5">
                  Court Name <span className="text-rose-500">*</span>
                </label>
                <select className="w-full px-3 py-2 border border-[#14213D]/15 rounded-lg text-sm text-[#1F1F1F]/70 bg-transparent focus:outline-none focus:border-[#B8860B]">
                  <option>Select Court</option>
                  <option>Sessions Court, Lahore</option>
                  <option>High Court, Lahore</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#14213D] mb-1.5">
                  Case Type <span className="text-rose-500">*</span>
                </label>
                <select className="w-full px-3 py-2 border border-[#14213D]/15 rounded-lg text-sm text-[#1F1F1F]/70 bg-transparent focus:outline-none focus:border-[#B8860B]">
                  <option>Select Case Type</option>
                  <option>Criminal</option>
                  <option>Civil</option>
                  <option>Family</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#14213D] mb-1.5">
                    Filing Date
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Select Date" 
                      className="w-full pl-3 pr-9 py-2 border border-[#14213D]/15 rounded-lg text-sm text-[#1F1F1F] placeholder:text-[#1F1F1F]/40 focus:outline-none focus:border-[#B8860B]"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F1F1F]/40 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#14213D] mb-1.5">
                    Next Hearing Date <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Select Date" 
                      className="w-full pl-3 pr-9 py-2 border border-[#14213D]/15 rounded-lg text-sm text-[#1F1F1F] placeholder:text-[#1F1F1F]/40 focus:outline-none focus:border-[#B8860B]"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F1F1F]/40 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#14213D] mb-1.5">
                  Judge / Bench Name
                </label>
                <input 
                  type="text" 
                  placeholder="Enter judge or bench name" 
                  className="w-full px-3 py-2 border border-[#14213D]/15 rounded-lg text-sm text-[#1F1F1F] placeholder:text-[#1F1F1F]/30 focus:outline-none focus:border-[#B8860B]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#14213D] mb-1.5">
                  Case Status <span className="text-rose-500">*</span>
                </label>
                <select className="w-full px-3 py-2 border border-[#14213D]/15 rounded-lg text-sm text-[#1F1F1F]/70 bg-transparent focus:outline-none focus:border-[#B8860B]">
                  <option>Select Status</option>
                  <option>Pending</option>
                  <option>Disposed</option>
                  <option>Adjourned</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#14213D] mb-1.5">
                  Case Stage
                </label>
                <select className="w-full px-3 py-2 border border-[#14213D]/15 rounded-lg text-sm text-[#1F1F1F]/70 bg-transparent focus:outline-none focus:border-[#B8860B]">
                  <option>Select Stage</option>
                  <option>Arguments</option>
                  <option>Evidence</option>
                  <option>Judgment</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#14213D] mb-1.5">
                  Priority
                </label>
                <select className="w-full px-3 py-2 border border-[#14213D]/15 rounded-lg text-sm text-[#1F1F1F]/70 bg-transparent focus:outline-none focus:border-[#B8860B]">
                  <option>Select Priority</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#14213D] mb-1.5">
                  Last Order / Remarks
                </label>
                <textarea 
                  rows={4}
                  placeholder="Enter last order or remarks" 
                  className="w-full px-3 py-2 border border-[#14213D]/15 rounded-lg text-sm text-[#1F1F1F] placeholder:text-[#1F1F1F]/30 focus:outline-none focus:border-[#B8860B] resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Right Column: Parties & Counsel, Assignment, Documents */}
          <div className="flex flex-col gap-5">
            
            {/* Parties & Counsel */}
            <div className="bg-white border border-[#14213D]/10 rounded-xl p-5 shadow-sm">
              <h2 className="text-sm font-bold text-[#14213D] mb-5 border-b border-[#14213D]/10 pb-3" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                Parties & Counsel
              </h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] font-semibold text-[#14213D]">
                      Client <span className="text-rose-500">*</span>
                    </label>
                    <button className="text-[10px] font-semibold text-[#B8860B] hover:text-[#14213D] flex items-center gap-1 transition">
                      <Plus className="h-3 w-3" /> New Client
                    </button>
                  </div>
                  <select className="w-full px-3 py-2 border border-[#14213D]/15 rounded-lg text-sm text-[#1F1F1F]/70 bg-transparent focus:outline-none focus:border-[#B8860B]">
                    <option>Select Client</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#14213D] mb-1.5">
                    Opposing Party
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter opposing party name" 
                    className="w-full px-3 py-2 border border-[#14213D]/15 rounded-lg text-sm text-[#1F1F1F] placeholder:text-[#1F1F1F]/30 focus:outline-none focus:border-[#B8860B]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#14213D] mb-1.5">
                    Opposing Counsel
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter opposing counsel name" 
                    className="w-full px-3 py-2 border border-[#14213D]/15 rounded-lg text-sm text-[#1F1F1F] placeholder:text-[#1F1F1F]/30 focus:outline-none focus:border-[#B8860B]"
                  />
                </div>
              </div>
            </div>

            {/* Assignment */}
            <div className="bg-white border border-[#14213D]/10 rounded-xl p-5 shadow-sm">
              <h2 className="text-sm font-bold text-[#14213D] mb-5 border-b border-[#14213D]/10 pb-3" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                Assignment
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#14213D] mb-1.5">
                    Assigned Lawyer / Team Member <span className="text-rose-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-[#14213D]/15 rounded-lg text-sm text-[#1F1F1F]/70 bg-transparent focus:outline-none focus:border-[#B8860B]">
                    <option>Select Lawyer / Member</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#14213D] mb-1.5">
                    Assistants / Team (Optional)
                  </label>
                  <select className="w-full px-3 py-2 border border-[#14213D]/15 rounded-lg text-sm text-[#1F1F1F]/70 bg-transparent focus:outline-none focus:border-[#B8860B]">
                    <option>Select team members</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white border border-[#14213D]/10 rounded-xl p-5 shadow-sm">
              <h2 className="text-sm font-bold text-[#14213D] mb-5 border-b border-[#14213D]/10 pb-3" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                Documents
              </h2>
              
              <div className="border-2 border-dashed border-[#14213D]/15 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-[#F5F0E6]/30 hover:bg-[#F5F0E6]/60 transition-colors cursor-pointer group">
                <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#14213D]/5 mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="h-5 w-5 text-[#B8860B]" />
                </div>
                <div className="text-sm font-semibold text-[#14213D] mb-1">Drag & drop files here or click to upload</div>
                <div className="text-[10px] text-[#1F1F1F]/50">PDF, DOC, DOCX, JPG, PNG (Max 25MB)</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </LawyerShell>
  );
}
