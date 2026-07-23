import { createFileRoute, Link } from "@tanstack/react-router";
import LawyerShell from "../components/dashboard/LawyerShell";
import { 
  Edit, 
  Link as LinkIcon, 
  MoreVertical, 
  Copy, 
  Calendar,
  MessageCircle,
  Mail,
  MapPin,
  ArrowRight,
  FileText,
  Image as ImageIcon
} from "lucide-react";

export const Route = createFileRoute("/lawyer-client-detail/$clientId")({
  component: LawyerClientDetail,
});

function LawyerClientDetail() {
  const { clientId } = Route.useParams();

  return (
    <LawyerShell active="clients">
      <div className="flex flex-col gap-6 max-w-[1400px] mx-auto h-full pb-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
          <div>
            <h1 className="text-[28px] font-bold text-[#14213D] leading-tight" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              Client Detail
            </h1>
            <div className="text-[12px] text-[#1F1F1F]/60 mt-1 font-medium flex items-center gap-1.5">
              <span className="hover:text-[#14213D] cursor-pointer transition">Dashboard</span>
              <span>›</span>
              <Link to="/lawyer-clients" className="hover:text-[#14213D] transition">Clients</Link>
              <span>›</span>
              <span className="text-[#14213D]">Client Detail</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="h-9 px-4 flex items-center gap-2 bg-white border border-[#14213D]/10 hover:bg-gray-50 text-[#14213D] rounded-lg text-xs font-bold shadow-sm transition-colors">
              <Edit className="h-4 w-4" />
              Edit Client
            </button>
            <button className="h-9 px-4 flex items-center gap-2 bg-white border border-emerald-600 hover:bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold shadow-sm transition-colors">
              <LinkIcon className="h-4 w-4" />
              Generate Portal Link
            </button>
            <button className="h-9 px-3 flex items-center gap-2 bg-white border border-[#14213D]/10 hover:bg-gray-50 text-[#14213D] rounded-lg text-xs font-bold shadow-sm transition-colors">
              <MoreVertical className="h-4 w-4" />
              More
            </button>
          </div>
        </div>

        {/* Top Summaries */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Main Client Profile */}
          <div className="flex-1 bg-white border border-[#14213D]/10 rounded-xl shadow-sm p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-transparent rounded-bl-full opacity-50 pointer-events-none"></div>
            
            <div className="flex items-start gap-5 mb-8 relative z-10">
              <div className="h-16 w-16 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xl font-bold border border-purple-200">
                MA
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-[20px] font-bold text-[#14213D]">Muhammad Ahmad</h2>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Active</span>
                </div>
                <p className="text-[13px] text-[#1F1F1F]/60 font-medium">Individual Client</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4 border-t border-[#14213D]/10">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#1F1F1F]/40" />
                <div>
                  <div className="text-[10px] font-bold text-[#1F1F1F]/50 uppercase tracking-wider mb-0.5">CNIC</div>
                  <div className="text-[12px] font-bold text-[#14213D]">35202-1234567-1</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-[#1F1F1F]/40" />
                <div>
                  <div className="text-[10px] font-bold text-[#1F1F1F]/50 uppercase tracking-wider mb-0.5">WhatsApp</div>
                  <div className="text-[12px] font-bold text-[#14213D]">0300-1234567</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#1F1F1F]/40" />
                <div>
                  <div className="text-[10px] font-bold text-[#1F1F1F]/50 uppercase tracking-wider mb-0.5">Email</div>
                  <div className="text-[12px] font-bold text-[#14213D]">ahmad@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#1F1F1F]/40" />
                <div>
                  <div className="text-[10px] font-bold text-[#1F1F1F]/50 uppercase tracking-wider mb-0.5">City</div>
                  <div className="text-[12px] font-bold text-[#14213D]">Lahore</div>
                </div>
              </div>
            </div>
          </div>

          {/* Portal Access Card */}
          <div className="w-full lg:w-[320px] bg-white border border-[#14213D]/10 rounded-xl shadow-sm p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-bold text-[#14213D]">Portal Access</h3>
              <div className="flex items-center gap-2">
                <div className="w-8 h-4 rounded-full bg-emerald-500 relative">
                  <div className="absolute top-0.5 right-0.5 h-3 w-3 rounded-full bg-white shadow-sm"></div>
                </div>
                <span className="text-[11px] font-bold text-emerald-600">Enabled</span>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <div>
                <div className="text-[11px] font-bold text-[#1F1F1F]/50 mb-1">Portal Email</div>
                <div className="flex items-center gap-2">
                  <div className="text-[12px] font-bold text-[#14213D] truncate">ahmad_3520212345671@noorportal.pk</div>
                  <button className="text-[#1F1F1F]/40 hover:text-[#14213D] transition"><Copy className="h-3.5 w-3.5" /></button>
                </div>
              </div>
              <div>
                <div className="text-[11px] font-bold text-[#1F1F1F]/50 mb-1">Status</div>
                <div className="text-[12px] font-bold text-[#14213D]">Active since 12 Jan 2025</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-[#14213D]/10 px-2">
          {["Overview", "Cases (5)", "Invoices (3)", "Documents (12)", "Notes (4)", "Activity Log"].map((tab, i) => (
            <button 
              key={tab}
              className={`px-4 py-3 text-[13px] font-bold border-b-2 transition-colors ${
                i === 0 
                  ? "border-emerald-500 text-emerald-700" 
                  : "border-transparent text-[#1F1F1F]/60 hover:text-[#14213D] hover:border-[#14213D]/20"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* About Client */}
          <div className="bg-white border border-[#14213D]/10 rounded-xl shadow-sm p-6">
            <h3 className="text-[15px] font-bold text-[#14213D] mb-5">About Client</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-[100px] text-[12px] font-bold text-[#1F1F1F]/50">Client Type</div>
                <div className="flex-1 text-[12px] font-bold text-[#14213D] flex items-center gap-2">
                  : Individual
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-[100px] text-[12px] font-bold text-[#1F1F1F]/50">Occupation</div>
                <div className="flex-1 text-[12px] font-medium text-[#14213D] flex items-center gap-2">
                  <span className="font-bold">:</span> Businessman
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-[100px] text-[12px] font-bold text-[#1F1F1F]/50">Address</div>
                <div className="flex-1 text-[12px] font-medium text-[#14213D] flex gap-2">
                  <span className="font-bold">:</span> 23-A, Model Town, Lahore
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-[100px] text-[12px] font-bold text-[#1F1F1F]/50">Referred By</div>
                <div className="flex-1 text-[12px] font-medium text-[#14213D] flex gap-2">
                  <span className="font-bold">:</span> Mr. Saad Iqbal
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-[100px] text-[12px] font-bold text-[#1F1F1F]/50">Notes</div>
                <div className="flex-1 text-[12px] font-medium text-[#14213D] flex gap-2 leading-relaxed">
                  <span className="font-bold">:</span> Important client. Regular follow ups.
                </div>
              </div>
            </div>
          </div>

          {/* Outstanding Summary */}
          <div className="bg-white border border-[#14213D]/10 rounded-xl shadow-sm p-6 flex flex-col justify-between">
            <h3 className="text-[15px] font-bold text-[#14213D] mb-5">Outstanding Summary</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              
              <div className="bg-gray-50 border border-[#14213D]/10 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                <div className="text-[12px] font-bold text-[#1F1F1F]/60 mb-2">Total Invoices</div>
                <div className="text-[20px] font-bold text-[#14213D] leading-tight">3</div>
                <div className="text-[10px] text-[#1F1F1F]/50 mt-1">PKR 235,000</div>
              </div>
              
              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                <div className="text-[12px] font-bold text-[#1F1F1F]/60 mb-2">Paid Amount</div>
                <div className="text-[16px] font-bold text-emerald-600 leading-tight">PKR 150,000</div>
              </div>

              <div className="bg-rose-50 border border-rose-100 rounded-lg p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="text-[12px] font-bold text-[#1F1F1F]/60 mb-2">Outstanding</div>
                <div className="text-[16px] font-bold text-rose-600 leading-tight">PKR 85,000</div>
              </div>

            </div>
            <div className="flex justify-end">
              <button className="text-[12px] font-bold text-[#1F1F1F]/60 hover:text-[#14213D] flex items-center gap-1 transition-colors">
                View All Invoices <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Recent Cases */}
          <div className="bg-white border border-[#14213D]/10 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-[#14213D]/10">
              <h3 className="text-[15px] font-bold text-[#14213D]">Recent Cases</h3>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-2 py-2 text-[8px] font-bold text-[#14213D] uppercase">Case No.</th>
                    <th className="px-2 py-2 text-[8px] font-bold text-[#14213D] uppercase">Case Title</th>
                    <th className="px-2 py-2 text-[8px] font-bold text-[#14213D] uppercase">Court</th>
                    <th className="px-2 py-2 text-[8px] font-bold text-[#14213D] uppercase">Next Hearing</th>
                    <th className="px-2 py-2 text-[8px] font-bold text-[#14213D] uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[#14213D]/5">
                    <td className="px-2 py-2 text-[10px] font-medium text-[#1F1F1F]/80">CC 123/2024</td>
                    <td className="px-2 py-2 text-[10px] font-bold text-[#14213D]">Muhammad Ahmad vs State</td>
                    <td className="px-2 py-2 text-[10px] font-medium text-[#1F1F1F]/80">Sessions Court, Lahore</td>
                    <td className="px-2 py-2 text-[10px] font-bold text-[#14213D]">22 May 2025</td>
                    <td className="px-2 py-2">
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">Pending</span>
                    </td>
                  </tr>
                  <tr className="border-t border-[#14213D]/5">
                    <td className="px-2 py-2 text-[10px] font-medium text-[#1F1F1F]/80">CS 456/2023</td>
                    <td className="px-2 py-2 text-[10px] font-bold text-[#14213D]">Ahmad vs ABC Corp</td>
                    <td className="px-2 py-2 text-[10px] font-medium text-[#1F1F1F]/80">Banking Court, Lahore</td>
                    <td className="px-2 py-2 text-[10px] font-bold text-[#14213D]">28 May 2025</td>
                    <td className="px-2 py-2">
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">Pending</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-gray-50/50 border-t border-[#14213D]/10 flex justify-end">
              <button className="text-[12px] font-bold text-[#1F1F1F]/60 hover:text-[#14213D] flex items-center gap-1 transition-colors">
                View All Cases <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Recent Documents */}
          <div className="bg-white border border-[#14213D]/10 rounded-xl shadow-sm flex flex-col">
            <div className="p-5 border-b border-[#14213D]/10">
              <h3 className="text-[15px] font-bold text-[#14213D]">Recent Documents</h3>
            </div>
            
            <div className="flex-1 p-5 space-y-4">
              
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-rose-50 flex items-center justify-center text-rose-500">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-[#14213D] group-hover:text-emerald-600 transition-colors cursor-pointer leading-tight">Agreement.pdf</div>
                    <div className="text-[10px] font-medium text-[#1F1F1F]/50 mt-0.5">Uploaded on 10 May 2025</div>
                  </div>
                </div>
                <div className="text-[11px] font-bold text-[#1F1F1F]/60">2.4 MB</div>
              </div>

              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-rose-50 flex items-center justify-center text-rose-500">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-[#14213D] group-hover:text-emerald-600 transition-colors cursor-pointer leading-tight">Power of Attorney.pdf</div>
                    <div className="text-[10px] font-medium text-[#1F1F1F]/50 mt-0.5">Uploaded on 02 May 2025</div>
                  </div>
                </div>
                <div className="text-[11px] font-bold text-[#1F1F1F]/60">1.1 MB</div>
              </div>

              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500">
                    <ImageIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-[#14213D] group-hover:text-emerald-600 transition-colors cursor-pointer leading-tight">CNIC Copy.jpg</div>
                    <div className="text-[10px] font-medium text-[#1F1F1F]/50 mt-0.5">Uploaded on 15 Apr 2025</div>
                  </div>
                </div>
                <div className="text-[11px] font-bold text-[#1F1F1F]/60">0.6 MB</div>
              </div>

            </div>

            <div className="p-4 bg-gray-50/50 border-t border-[#14213D]/10 flex justify-end mt-auto">
              <button className="text-[12px] font-bold text-[#1F1F1F]/60 hover:text-[#14213D] flex items-center gap-1 transition-colors">
                View All Documents <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </LawyerShell>
  );
}
