import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import LawyerShell from "../components/dashboard/LawyerShell";
import { 
  Save, 
  X, 
  Copy, 
  Check,
  ChevronDown
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/lawyer-clients-new")({
  component: LawyerClientsNew,
});

function LawyerClientsNew() {
  const navigate = useNavigate();
  const [portalEnabled, setPortalEnabled] = useState(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <LawyerShell active="clients">
      <div className="flex flex-col gap-6 max-w-[1400px] mx-auto h-full pb-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
          <div>
            <h1 className="text-[28px] font-bold text-[#14213D] leading-tight" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              Add New Client
            </h1>
            <div className="text-[12px] text-[#1F1F1F]/60 mt-1 font-medium flex items-center gap-1.5">
              <span className="hover:text-[#14213D] cursor-pointer transition">Dashboard</span>
              <span>›</span>
              <Link to="/lawyer-clients" className="hover:text-[#14213D] transition">Clients</Link>
              <span>›</span>
              <span className="text-[#14213D]">Add New Client</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Link to="/lawyer-clients" className="h-9 px-4 flex items-center gap-2 bg-white border border-[#14213D]/10 hover:bg-gray-50 text-[#14213D] rounded-lg text-xs font-bold shadow-sm transition-colors">
              <X className="h-4 w-4" />
              Cancel
            </Link>
            <button className="h-9 px-4 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-sm transition-colors">
              <Save className="h-4 w-4" />
              Save Client
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Left Column (Form) */}
          <div className="flex-1 w-full bg-white border border-[#14213D]/10 rounded-xl shadow-sm p-6">
            <h2 className="text-[16px] font-bold text-[#14213D] mb-6">Client Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              
              {/* Client Type */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-[#14213D]">Client Type <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <select className="h-10 w-full pl-3 pr-8 appearance-none bg-gray-50 border border-[#14213D]/10 rounded-lg text-[13px] font-medium text-[#14213D] hover:bg-white focus:outline-none focus:border-emerald-500 transition-colors">
                    <option>Individual</option>
                    <option>Company</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F1F1F]/40 pointer-events-none" />
                </div>
              </div>

              {/* Company Name */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-[#14213D]">Company Name (If applicable)</label>
                <input 
                  type="text" 
                  placeholder="Enter company name"
                  className="h-10 w-full px-3 bg-gray-50 border border-[#14213D]/10 rounded-lg text-[13px] font-medium text-[#14213D] placeholder-[#1F1F1F]/30 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Client Name */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-[#14213D]">Client Name <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="Enter client full name"
                  className="h-10 w-full px-3 bg-gray-50 border border-[#14213D]/10 rounded-lg text-[13px] font-medium text-[#14213D] placeholder-[#1F1F1F]/30 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* NTN */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-[#14213D]">NTN (If applicable)</label>
                <input 
                  type="text" 
                  placeholder="Enter NTN number"
                  className="h-10 w-full px-3 bg-gray-50 border border-[#14213D]/10 rounded-lg text-[13px] font-medium text-[#14213D] placeholder-[#1F1F1F]/30 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* CNIC */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-[#14213D]">CNIC <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="XXXXX-XXXXXXX-X"
                  className="h-10 w-full px-3 bg-gray-50 border border-[#14213D]/10 rounded-lg text-[13px] font-medium text-[#14213D] placeholder-[#1F1F1F]/30 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Occupation */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-[#14213D]">Occupation / Business</label>
                <input 
                  type="text" 
                  placeholder="Enter occupation or business"
                  className="h-10 w-full px-3 bg-gray-50 border border-[#14213D]/10 rounded-lg text-[13px] font-medium text-[#14213D] placeholder-[#1F1F1F]/30 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Phone / WhatsApp */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-[#14213D]">Phone / WhatsApp <span className="text-rose-500">*</span></label>
                <div className="flex h-10">
                  <div className="flex-shrink-0 flex items-center gap-2 px-3 bg-gray-50 border border-[#14213D]/10 border-r-0 rounded-l-lg">
                    <span className="text-[14px]">🇵🇰</span>
                    <span className="text-[12px] font-bold text-[#14213D]">+92</span>
                    <ChevronDown className="h-3 w-3 text-[#1F1F1F]/40" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter phone number"
                    className="flex-1 min-w-0 px-3 bg-gray-50 border border-[#14213D]/10 rounded-r-lg text-[13px] font-medium text-[#14213D] placeholder-[#1F1F1F]/30 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              {/* Referred By */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-[#14213D]">Referred By</label>
                <input 
                  type="text" 
                  placeholder="Enter name (optional)"
                  className="h-10 w-full px-3 bg-gray-50 border border-[#14213D]/10 rounded-lg text-[13px] font-medium text-[#14213D] placeholder-[#1F1F1F]/30 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-[#14213D]">Email</label>
                <input 
                  type="email" 
                  placeholder="Enter email address"
                  className="h-10 w-full px-3 bg-gray-50 border border-[#14213D]/10 rounded-lg text-[13px] font-medium text-[#14213D] placeholder-[#1F1F1F]/30 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Notes */}
              <div className="space-y-1.5 md:row-span-2">
                <label className="text-[12px] font-bold text-[#14213D]">Notes</label>
                <textarea 
                  placeholder="Enter any notes about client"
                  className="h-[104px] w-full p-3 bg-gray-50 border border-[#14213D]/10 rounded-lg text-[13px] font-medium text-[#14213D] placeholder-[#1F1F1F]/30 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                ></textarea>
              </div>

              {/* City */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-[#14213D]">City</label>
                <div className="relative">
                  <select className="h-10 w-full pl-3 pr-8 appearance-none bg-gray-50 border border-[#14213D]/10 rounded-lg text-[13px] font-medium text-[#14213D] hover:bg-white focus:outline-none focus:border-emerald-500 transition-colors">
                    <option>Select City</option>
                    <option>Lahore</option>
                    <option>Karachi</option>
                    <option>Islamabad</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F1F1F]/40 pointer-events-none" />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-1.5 md:col-start-1">
                <label className="text-[12px] font-bold text-[#14213D]">Address</label>
                <textarea 
                  placeholder="Enter full address"
                  className="h-20 w-full p-3 bg-gray-50 border border-[#14213D]/10 rounded-lg text-[13px] font-medium text-[#14213D] placeholder-[#1F1F1F]/30 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                ></textarea>
              </div>
              
            </div>
          </div>

          {/* Right Column (Portal Access) */}
          <div className="w-full lg:w-[340px] shrink-0 flex flex-col gap-6">
            
            <div className="bg-white border border-[#14213D]/10 rounded-xl shadow-sm p-6">
              <h2 className="text-[15px] font-bold text-[#14213D] mb-2">Client Portal Access</h2>
              <p className="text-[12px] text-[#1F1F1F]/60 mb-6 leading-relaxed">
                Allow client to access their cases, hearings, documents and invoices.
              </p>

              <div className="flex items-center gap-3 mb-8">
                <button 
                  onClick={() => setPortalEnabled(!portalEnabled)}
                  className={`w-10 h-6 rounded-full relative transition-colors ${portalEnabled ? "bg-emerald-500" : "bg-gray-200"}`}
                >
                  <div className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${portalEnabled ? "left-[22px]" : "left-1"}`}></div>
                </button>
                <span className="text-[13px] font-bold text-[#14213D]">Enable Portal Access</span>
              </div>

              {portalEnabled && (
                <div className="space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
                  <h3 className="text-[13px] font-bold text-[#14213D] pb-2 border-b border-[#14213D]/10">
                    Portal Credentials <span className="text-[#1F1F1F]/50 font-medium">(Auto Generated)</span>
                  </h3>
                  
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#1F1F1F]/60">Email</label>
                    <div className="flex bg-gray-50 border border-[#14213D]/10 rounded-lg overflow-hidden">
                      <input 
                        type="text" 
                        readOnly 
                        value="ahmad_3520212345671@noorportal.pk"
                        className="flex-1 px-3 py-2 text-[12px] font-medium text-[#14213D] bg-transparent outline-none truncate"
                      />
                      <button 
                        onClick={() => handleCopy("ahmad_3520212345671@noorportal.pk", "email")}
                        className="px-3 flex items-center justify-center text-[#1F1F1F]/40 hover:text-[#14213D] hover:bg-black/5 transition-colors border-l border-[#14213D]/10"
                      >
                        {copiedField === "email" ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#1F1F1F]/60">Temporary Password</label>
                    <div className="flex bg-gray-50 border border-[#14213D]/10 rounded-lg overflow-hidden">
                      <input 
                        type="text" 
                        readOnly 
                        value="NLA@2025#Ahmad"
                        className="flex-1 px-3 py-2 text-[12px] font-medium text-[#14213D] bg-transparent outline-none truncate"
                      />
                      <button 
                        onClick={() => handleCopy("NLA@2025#Ahmad", "password")}
                        className="px-3 flex items-center justify-center text-[#1F1F1F]/40 hover:text-[#14213D] hover:bg-black/5 transition-colors border-l border-[#14213D]/10"
                      >
                        {copiedField === "password" ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
                    <p className="text-[11px] font-medium text-emerald-700 leading-relaxed text-center">
                      Credentials will be sent to client via WhatsApp / Email once saved.
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>
          
        </div>

      </div>
    </LawyerShell>
  );
}
