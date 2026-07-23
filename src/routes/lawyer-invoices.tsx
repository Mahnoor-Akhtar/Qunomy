import { createFileRoute } from "@tanstack/react-router";
import LawyerShell from "../components/dashboard/LawyerShell";
import { 
  Search, Filter, Download, Plus, Eye, Edit2, 
  MoreVertical, X, Check, Bell, User, Scale,
  FileText, Banknote, CreditCard, AlertCircle, Calendar, Trash2, Printer, Share2, ArrowRight
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/lawyer-invoices")({
  component: LawyerInvoices,
});

const MOCK_INVOICES = [
  { id: "INV-2025-051", client: "Muhammad Ahmad", case1: "CS 456/2023", case2: "ABC Corp vs XYZ Bank", issueDate: "22 May 2025", dueDate: "05 Jun 2025", amount: 150000, paid: 150000, status: "Paid" },
  { id: "INV-2025-050", client: "ABC Corporation (Pvt) Ltd.", case1: "CS 123/2024", case2: "Muhammad Ahmad vs State", issueDate: "20 May 2025", dueDate: "04 Jun 2025", amount: 250000, paid: 100000, status: "Partial" },
  { id: "INV-2025-049", client: "Zainab Khan", case1: "FC 789/2024", case2: "Fatima Bibi vs Asif Khan", issueDate: "18 May 2025", dueDate: "01 Jun 2025", amount: 75000, paid: 0, status: "Unpaid" },
  { id: "INV-2025-048", client: "Pakistan Builders", case1: "CS 654/2023", case2: "Pak Builders vs Contractor", issueDate: "15 May 2025", dueDate: "30 May 2025", amount: 120000, paid: 120000, status: "Paid" },
  { id: "INV-2025-047", client: "Ali Raza", case1: "CR 112/2024", case2: "The State vs Imran Ali", issueDate: "10 May 2025", dueDate: "25 May 2025", amount: 95000, paid: 0, status: "Overdue" },
  { id: "INV-2025-046", client: "Fatima Bibi", case1: "FC 101/2024", case2: "Zainab Khan vs Waseem Khan", issueDate: "08 May 2025", dueDate: "23 May 2025", amount: 60000, paid: 0, status: "Unpaid" },
  { id: "INV-2025-045", client: "Tech Solutions Inc.", case1: "CS 882/2023", case2: "Tech Solutions vs Media Corp", issueDate: "01 May 2025", dueDate: "15 May 2025", amount: 350000, paid: 350000, status: "Paid" },
  { id: "INV-2025-044", client: "Ahmed & Sons", case1: "CP 23/2024", case2: "Tax Appeal Tribunal", issueDate: "28 Apr 2025", dueDate: "12 May 2025", amount: 180000, paid: 90000, status: "Partial" },
  { id: "INV-2025-043", client: "Hassan Traders", case1: "CS 14/2024", case2: "Hassan Traders vs Customs", issueDate: "20 Apr 2025", dueDate: "05 May 2025", amount: 125000, paid: 0, status: "Overdue" },
  { id: "INV-2025-042", client: "Dr. Ayesha Malik", case1: "FC 445/2023", case2: "Ayesha Malik vs Hospital Board", issueDate: "15 Apr 2025", dueDate: "30 Apr 2025", amount: 90000, paid: 90000, status: "Paid" },
];

const MOCK_INVOICE_ITEMS = [
  { id: 1, description: "Legal Consultation & Advice", qty: 1, rate: 80000, amount: 80000 },
  { id: 2, description: "Drafting of Suit", qty: 1, rate: 60000, amount: 60000 },
  { id: 3, description: "Court Appearance (2 Dates)", qty: 2, rate: 25000, amount: 50000 },
  { id: 4, description: "Documentation & Filing Charges", qty: 1, rate: 25000, amount: 25000 },
  { id: 5, description: "Miscellaneous Expenses", qty: 1, rate: 10000, amount: 10000 },
];

function LawyerInvoices() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("preview"); // preview, activity

  const formatMoney = (amount: number) => {
    return amount.toLocaleString('en-US');
  };

  return (
    <LawyerShell active="invoices">
      <div className="flex flex-col h-full space-y-4 max-w-[1400px] mx-auto w-full">
        <div className="flex justify-between items-center shrink-0">
          <div>
            <h1 className="text-[24px] font-bold text-[#14213D] tracking-tight">Invoices & Billing</h1>
            <div className="text-[12px] font-medium text-[#1F1F1F]/50 mt-1 flex items-center gap-2">
              <span>Dashboard</span>
              <span className="h-1 w-1 rounded-full bg-[#1F1F1F]/20"></span>
              <span className="text-[#14213D]">Invoices</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="h-10 px-4 flex items-center gap-2 bg-white border border-[#14213D]/10 hover:bg-gray-50 rounded-lg transition-colors shadow-sm">
              <Download className="h-4 w-4 text-[#1F1F1F]/60" /> 
              <span className="text-[13px] font-bold text-[#14213D]">Export</span>
            </button>
            <button 
             onClick={() => setIsCreateModalOpen(true)}
             className="h-10 px-5 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[13px] font-bold transition-colors shadow-sm"
            >
              <Plus className="h-4 w-4" /> Create Invoice
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white border border-[#14213D]/10 rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
              <FileText className="h-4 w-4 text-emerald-500" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-[#1F1F1F]/50">Total Invoices</div>
              <div className="text-[18px] font-bold text-[#14213D] leading-tight mt-0.5">128</div>
              <div className="text-[10px] text-[#1F1F1F]/40 mt-0.5">This Month</div>
            </div>
          </div>

          <div className="bg-white border border-[#14213D]/10 rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <Banknote className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-[#1F1F1F]/50">Total Billed</div>
              <div className="text-[18px] font-bold text-[#14213D] leading-tight mt-0.5">PKR 1,850,000</div>
              <div className="text-[10px] text-[#1F1F1F]/40 mt-0.5">This Month</div>
            </div>
          </div>

          <div className="bg-white border border-[#14213D]/10 rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
              <CreditCard className="h-4 w-4 text-orange-500" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-[#1F1F1F]/50">Paid Amount</div>
              <div className="text-[18px] font-bold text-[#14213D] leading-tight mt-0.5">PKR 1,125,000</div>
              <div className="text-[10px] text-[#1F1F1F]/40 mt-0.5">This Month</div>
            </div>
          </div>

          <div className="bg-white border border-[#14213D]/10 rounded-xl p-4 flex items-center gap-3 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 h-16 w-16 bg-red-50 rounded-full blur-2xl -mr-4 -mt-4"></div>
            <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center shrink-0 relative z-10">
              <AlertCircle className="h-4 w-4 text-red-500" />
            </div>
            <div className="relative z-10">
              <div className="text-[11px] font-bold text-[#1F1F1F]/50">Outstanding</div>
              <div className="text-[18px] font-bold text-[#14213D] leading-tight mt-0.5">PKR 725,000</div>
              <div className="text-[10px] text-[#1F1F1F]/40 mt-0.5">This Month</div>
            </div>
          </div>
        </div>

        {/* Toolbar & Table */}
        <div className="bg-white border border-[#14213D]/10 rounded-xl shadow-sm flex flex-col flex-1 min-h-0">
          
          {/* Toolbar */}
          <div className="p-4 border-b border-[#14213D]/10 flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F1F1F]/40" />
              <input 
                type="text" 
                placeholder="Search by invoice no., client, case, amount..." 
                className="w-full pl-9 pr-4 h-9 bg-gray-50 border border-[#14213D]/10 rounded-lg text-[12px] font-medium text-[#14213D] placeholder:text-[#1F1F1F]/40 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
              />
            </div>
            
            <select className="h-9 px-3 bg-white border border-[#14213D]/10 rounded-lg text-[12px] font-bold text-[#14213D] focus:outline-none focus:border-emerald-500">
              <option>All Status</option>
            </select>

            <select className="h-9 px-3 bg-white border border-[#14213D]/10 rounded-lg text-[12px] font-bold text-[#14213D] focus:outline-none focus:border-emerald-500">
              <option>All Clients</option>
            </select>

            <select className="h-9 px-3 bg-white border border-[#14213D]/10 rounded-lg text-[12px] font-bold text-[#14213D] focus:outline-none focus:border-emerald-500">
              <option>All Case Status</option>
            </select>

            <div className="h-9 px-3 bg-white border border-[#14213D]/10 rounded-lg text-[12px] font-bold text-[#14213D] flex items-center gap-2">
               01 May 2025 - 31 May 2025
               <Calendar className="h-4 w-4 text-[#1F1F1F]/40 ml-1" />
            </div>

            <button className="h-9 px-4 flex items-center gap-2 border border-[#14213D]/10 rounded-lg text-[12px] font-bold text-[#14213D] hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4 text-[#1F1F1F]/50" /> Filter
            </button>
          </div>

          {/* Table Area */}
          <div className="flex-1 overflow-y-auto min-h-0 bg-white">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="bg-white border-b border-[#14213D]/10">
                   <th className="px-2 py-2.5 text-[9px] font-bold text-[#1F1F1F]/60 uppercase tracking-wider w-8">#</th>
                   <th className="px-2 py-2.5 text-[9px] font-bold text-[#1F1F1F]/60 uppercase tracking-wider whitespace-nowrap">Invoice No.</th>
                   <th className="px-2 py-2.5 text-[9px] font-bold text-[#1F1F1F]/60 uppercase tracking-wider">Client</th>
                   <th className="px-2 py-2.5 text-[9px] font-bold text-[#1F1F1F]/60 uppercase tracking-wider">Case</th>
                   <th className="px-2 py-2.5 text-[9px] font-bold text-[#1F1F1F]/60 uppercase tracking-wider whitespace-nowrap">Issue Date</th>
                   <th className="px-2 py-2.5 text-[9px] font-bold text-[#1F1F1F]/60 uppercase tracking-wider whitespace-nowrap">Due Date</th>
                   <th className="px-2 py-2.5 text-[9px] font-bold text-[#1F1F1F]/60 uppercase tracking-wider">Amount</th>
                   <th className="px-2 py-2.5 text-[9px] font-bold text-[#1F1F1F]/60 uppercase tracking-wider">Paid</th>
                   <th className="px-2 py-2.5 text-[9px] font-bold text-[#1F1F1F]/60 uppercase tracking-wider">Status</th>
                   <th className="px-2 py-2.5 text-[9px] font-bold text-[#1F1F1F]/60 uppercase tracking-wider text-right">Actions</th>
                 </tr>
               </thead>
               <tbody>
                 {MOCK_INVOICES.map((inv, idx) => (
                   <tr key={inv.id} className="border-b border-[#14213D]/5 hover:bg-gray-50/80 transition-all duration-200 group">
                     <td className="px-2 py-2.5 text-[10px] font-medium text-[#1F1F1F]/50">{idx + 1}</td>
                     <td className="px-2 py-2.5 text-[10px] font-bold text-[#14213D] whitespace-nowrap">{inv.id}</td>
                     <td className="px-2 py-2.5 text-[10px] font-bold text-[#14213D] leading-tight max-w-[120px] truncate" title={inv.client}>{inv.client}</td>
                     <td className="px-2 py-2.5 max-w-[140px] truncate" title={inv.case1}>
                       <div className="text-[10px] font-bold text-[#14213D] leading-tight truncate">{inv.case1}</div>
                       <div className="text-[9px] text-[#1F1F1F]/50 mt-0.5 leading-tight truncate">{inv.case2}</div>
                     </td>
                     <td className="px-2 py-2.5 text-[10px] font-medium text-[#1F1F1F]/70 whitespace-nowrap">{inv.issueDate}</td>
                     <td className="px-2 py-2.5 text-[10px] font-medium text-[#1F1F1F]/70 whitespace-nowrap">{inv.dueDate}</td>
                     <td className="px-2 py-2.5 text-[10px] font-bold text-[#14213D] whitespace-nowrap">PKR {formatMoney(inv.amount)}</td>
                     <td className="px-2 py-2.5 text-[10px] font-bold text-[#14213D] whitespace-nowrap">PKR {formatMoney(inv.paid)}</td>
                     <td className="px-2 py-2.5">
                       <span className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wide whitespace-nowrap ${
                         inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                         inv.status === 'Partial' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                         inv.status === 'Overdue' ? 'bg-red-50 text-red-600 border border-red-100' :
                         'bg-rose-50 text-rose-600 border border-rose-100'
                       }`}>
                         {inv.status}
                       </span>
                     </td>
                     <td className="px-2 py-2.5">
                       <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button 
                          onClick={() => { setSelectedInvoice(inv); setIsViewModalOpen(true); }}
                          className="h-7 w-7 rounded-lg flex items-center justify-center bg-white border border-[#14213D]/10 text-[#1F1F1F]/40 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-all shadow-sm"
                         >
                           <Eye className="h-3.5 w-3.5" />
                         </button>
                         <button 
                          onClick={() => { setSelectedInvoice(inv); setIsCreateModalOpen(true); }}
                          className="h-7 w-7 rounded-lg flex items-center justify-center bg-white border border-[#14213D]/10 text-[#1F1F1F]/40 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all shadow-sm"
                         >
                           <Edit2 className="h-3.5 w-3.5" />
                         </button>
                         <button 
                          onClick={() => { setSelectedInvoice(inv); setIsPaymentModalOpen(true); }}
                          className="h-7 w-7 rounded-lg flex items-center justify-center bg-white border border-[#14213D]/10 text-[#1F1F1F]/40 hover:text-[#14213D] hover:border-[#14213D]/20 hover:bg-gray-50 transition-all shadow-sm"
                         >
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
          <div className="p-3 border-t border-[#14213D]/10 flex items-center justify-between">
            <div className="text-[11px] font-medium text-[#1F1F1F]/50">Showing 1 to 6 of 128 invoices</div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <button className="h-7 w-7 rounded flex items-center justify-center border border-[#14213D]/10 text-[#1F1F1F]/40 hover:bg-gray-50 transition-colors">‹</button>
                <button className="h-7 w-7 rounded flex items-center justify-center bg-emerald-600 text-white text-[11px] font-bold">1</button>
                <button className="h-7 w-7 rounded flex items-center justify-center hover:bg-gray-50 text-[11px] font-medium text-[#1F1F1F]/70">2</button>
                <button className="h-7 w-7 rounded flex items-center justify-center hover:bg-gray-50 text-[11px] font-medium text-[#1F1F1F]/70">3</button>
                <button className="h-7 w-7 rounded flex items-center justify-center hover:bg-gray-50 text-[11px] font-medium text-[#1F1F1F]/70">4</button>
                <button className="h-7 w-7 rounded flex items-center justify-center hover:bg-gray-50 text-[11px] font-medium text-[#1F1F1F]/70">5</button>
                <span className="text-[11px] font-medium text-[#1F1F1F]/40 px-1">...</span>
                <button className="h-7 w-7 rounded flex items-center justify-center hover:bg-gray-50 text-[11px] font-medium text-[#1F1F1F]/70">22</button>
                <button className="h-7 w-7 rounded flex items-center justify-center border border-[#14213D]/10 text-[#14213D] hover:bg-gray-50 transition-colors">›</button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium text-[#1F1F1F]/50">Rows per page:</span>
                <select className="h-7 px-2 border border-[#14213D]/10 rounded text-[11px] font-bold text-[#14213D] focus:outline-none">
                  <option>10</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Create/Edit Invoice Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#14213D]/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[800px] flex flex-col overflow-hidden max-h-[90vh]">
            <div className="p-6 border-b border-[#14213D]/10 flex items-center justify-between">
              <h2 className="text-[18px] font-bold text-[#14213D]">Create / Edit Invoice</h2>
              <div className="flex items-center gap-3">
                <button 
                 onClick={() => setIsCreateModalOpen(false)}
                 className="px-5 py-2 rounded-lg border border-[#14213D]/10 text-[12px] font-bold text-[#14213D] hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                 onClick={() => setIsCreateModalOpen(false)}
                 className="px-5 py-2 rounded-lg bg-emerald-600 text-[12px] font-bold text-white hover:bg-emerald-700 transition-colors"
                >
                  Save Invoice
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex flex-row justify-between mb-1.5">
                    <label className="text-[11px] font-bold text-[#1F1F1F]/70">Client <span className="text-red-500">*</span></label>
                    <button className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700">+ New Client</button>
                  </div>
                  <select className="w-full h-10 px-3 bg-white border border-[#14213D]/10 rounded-lg text-[12px] font-medium text-[#14213D] focus:outline-none focus:border-emerald-500">
                    <option>ABC Corporation (Pvt) Ltd.</option>
                  </select>
                </div>
                <div>
                  <div className="flex flex-row justify-between mb-1.5">
                    <label className="text-[11px] font-bold text-[#1F1F1F]/70">Case <span className="text-red-500">*</span></label>
                    <button className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700">+ New Case</button>
                  </div>
                  <select className="w-full h-10 px-3 bg-white border border-[#14213D]/10 rounded-lg text-[12px] font-medium text-[#14213D] focus:outline-none focus:border-emerald-500">
                    <option>CS 123/2024 - Muhammad Ahmad vs State</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-bold text-[#1F1F1F]/70 mb-1.5">Invoice Date <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input type="text" defaultValue="20 May 2025" className="w-full h-10 pl-3 pr-10 bg-white border border-[#14213D]/10 rounded-lg text-[12px] font-medium text-[#14213D] focus:outline-none focus:border-emerald-500" />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F1F1F]/40 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#1F1F1F]/70 mb-1.5">Due Date <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input type="text" defaultValue="04 Jun 2025" className="w-full h-10 pl-3 pr-10 bg-white border border-[#14213D]/10 rounded-lg text-[12px] font-medium text-[#14213D] focus:outline-none focus:border-emerald-500" />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F1F1F]/40 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-bold text-[#1F1F1F]/70 mb-1.5">Payment Terms</label>
                  <select className="w-full h-10 px-3 bg-white border border-[#14213D]/10 rounded-lg text-[12px] font-medium text-[#14213D] focus:outline-none focus:border-emerald-500">
                    <option>15 Days</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#1F1F1F]/70 mb-1.5">Currency</label>
                  <select className="w-full h-10 px-3 bg-white border border-[#14213D]/10 rounded-lg text-[12px] font-medium text-[#14213D] focus:outline-none focus:border-emerald-500">
                    <option>PKR</option>
                  </select>
                </div>
              </div>

              <div>
                <h3 className="text-[14px] font-bold text-[#14213D] mb-4">Invoice Items</h3>
                <table className="w-full text-left border-collapse mb-4">
                  <thead>
                    <tr className="border-b border-[#14213D]/10">
                      <th className="py-3 text-[11px] font-bold text-[#1F1F1F]/50 w-10">#</th>
                      <th className="py-3 text-[11px] font-bold text-[#1F1F1F]/50">Description</th>
                      <th className="py-3 text-[11px] font-bold text-[#1F1F1F]/50 text-center w-20">Qty</th>
                      <th className="py-3 text-[11px] font-bold text-[#1F1F1F]/50 text-right w-32">Rate (PKR)</th>
                      <th className="py-3 text-[11px] font-bold text-[#1F1F1F]/50 text-right w-32">Amount (PKR)</th>
                      <th className="py-3 text-[11px] font-bold text-[#1F1F1F]/50 text-center w-16">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_INVOICE_ITEMS.map((item, idx) => (
                      <tr key={item.id} className="border-b border-[#14213D]/5">
                        <td className="py-3 text-[12px] font-medium text-[#1F1F1F]/50">{idx + 1}</td>
                        <td className="py-3 text-[12px] font-bold text-[#14213D]">{item.description}</td>
                        <td className="py-3 text-[12px] font-medium text-[#1F1F1F]/70 text-center">{item.qty}</td>
                        <td className="py-3 text-[12px] font-medium text-[#1F1F1F]/70 text-right">{formatMoney(item.rate)}</td>
                        <td className="py-3 text-[12px] font-medium text-[#1F1F1F]/70 text-right">{formatMoney(item.amount)}</td>
                        <td className="py-3 text-center">
                          <button className="h-7 w-7 rounded inline-flex items-center justify-center hover:bg-gray-100 text-[#1F1F1F]/40 hover:text-red-500 transition-colors">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="w-full py-3 rounded-lg border-2 border-dashed border-[#14213D]/20 text-[12px] font-bold text-[#1F1F1F]/50 hover:bg-gray-50 hover:border-[#14213D]/30 transition-colors flex items-center justify-center gap-2">
                  <Plus className="h-4 w-4" /> Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Record Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#14213D]/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[800px] flex overflow-hidden max-h-[90vh]">
            <button 
              onClick={() => setIsPaymentModalOpen(false)}
              className="absolute top-4 right-4 h-8 w-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white text-white hover:text-[#14213D] transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left Column: Payment Summary & Record Payment */}
            <div className="w-[440px] p-8 overflow-y-auto">
              <h2 className="text-[16px] font-bold text-[#14213D] mb-5">Payment Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-medium text-[#1F1F1F]/70">Subtotal</span>
                  <span className="font-medium text-[#14213D]">PKR 225,000</span>
                </div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-medium text-[#1F1F1F]/70">Tax (11%)</span>
                  <span className="font-medium text-[#14213D]">PKR 24,750</span>
                </div>
                <div className="h-[1px] bg-[#14213D]/10"></div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-bold text-[#14213D]">Total Amount</span>
                  <span className="font-bold text-emerald-600">PKR 249,750</span>
                </div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-medium text-[#1F1F1F]/70">Paid Amount</span>
                  <span className="font-medium text-[#14213D]">PKR 100,000</span>
                </div>
                <div className="h-[1px] bg-[#14213D]/10"></div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-bold text-red-500">Outstanding Amount</span>
                  <span className="font-bold text-red-500">PKR 149,750</span>
                </div>
              </div>

              <h2 className="text-[16px] font-bold text-[#14213D] mb-5">Record Payment</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1F1F1F]/70 mb-1.5">Amount <span className="text-red-500">*</span></label>
                    <input type="text" defaultValue="100000" className="w-full h-10 px-3 bg-white border border-[#14213D]/10 rounded-lg text-[12px] font-medium text-[#14213D] focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#1F1F1F]/70 mb-1.5">Payment Date <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input type="text" defaultValue="20 May 2025" className="w-full h-10 pl-3 pr-10 bg-white border border-[#14213D]/10 rounded-lg text-[12px] font-medium text-[#14213D] focus:outline-none focus:border-emerald-500" />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F1F1F]/40 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1F1F1F]/70 mb-1.5">Payment Method <span className="text-red-500">*</span></label>
                    <select className="w-full h-10 px-3 bg-white border border-[#14213D]/10 rounded-lg text-[12px] font-medium text-[#14213D] focus:outline-none focus:border-emerald-500">
                      <option>Bank Transfer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#1F1F1F]/70 mb-1.5">Reference / Transaction ID</label>
                    <input type="text" defaultValue="FT25140098123" className="w-full h-10 px-3 bg-white border border-[#14213D]/10 rounded-lg text-[12px] font-medium text-[#14213D] focus:outline-none focus:border-emerald-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1F1F1F]/70 mb-1.5">Notes (Optional)</label>
                  <textarea rows={3} defaultValue="Partial payment received." className="w-full p-3 bg-white border border-[#14213D]/10 rounded-lg text-[12px] font-medium text-[#14213D] focus:outline-none focus:border-emerald-500 resize-none"></textarea>
                </div>

                <button 
                 onClick={() => setIsPaymentModalOpen(false)}
                 className="w-full h-10 rounded-lg bg-emerald-600 text-[13px] font-bold text-white hover:bg-emerald-700 transition-colors"
                >
                  Record Payment
                </button>
              </div>
            </div>

            {/* Right Column: Payment History */}
            <div className="flex-1 bg-gray-50 border-l border-[#14213D]/10 p-8 overflow-y-auto">
              <h2 className="text-[16px] font-bold text-[#14213D] mb-6">Payment History</h2>
              
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-[#14213D]/10">
                {/* Timeline Item 1 */}
                <div className="relative flex items-start gap-4">
                  <div className="absolute left-0 mt-1 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 z-10">
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                  </div>
                  <div className="pl-10">
                    <div className="text-[11px] font-medium text-[#1F1F1F]/50 mb-0.5">20 May 2025</div>
                    <div className="text-[13px] font-bold text-[#14213D] mb-1">Payment Received</div>
                    <div className="text-[14px] font-bold text-emerald-600 mb-2">PKR 100,000</div>
                    <div className="text-[11px] text-[#1F1F1F]/70 mb-0.5">via Bank Transfer</div>
                    <div className="text-[11px] text-[#1F1F1F]/50">Ref: FT25140098123</div>
                  </div>
                </div>

                {/* Timeline Item 2 */}
                <div className="relative flex items-start gap-4">
                  <div className="absolute left-0 mt-1 flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 border border-blue-200 z-10">
                    <AlertCircle className="h-3.5 w-3.5 text-blue-600" />
                  </div>
                  <div className="pl-10">
                    <div className="text-[11px] font-medium text-[#1F1F1F]/50 mb-0.5">20 May 2025</div>
                    <div className="text-[13px] font-bold text-[#14213D] mb-1">Invoice Created</div>
                    <div className="text-[11px] text-[#1F1F1F]/70">by Ali Raza</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Invoice Modal */}
      {isViewModalOpen && selectedInvoice && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#14213D]/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[850px] flex flex-col overflow-hidden max-h-[95vh]">
            <div className="p-4 border-b border-[#14213D]/10 flex items-center justify-between">
              <div className="flex gap-6 pl-4">
                <button 
                  onClick={() => setActiveTab('preview')}
                  className={`text-[13px] font-bold py-2 border-b-2 transition-colors ${activeTab === 'preview' ? 'text-emerald-600 border-emerald-600' : 'text-[#1F1F1F]/40 border-transparent hover:text-[#14213D]'}`}
                >
                  Invoice Preview
                </button>
                <button 
                  onClick={() => setActiveTab('activity')}
                  className={`text-[13px] font-bold py-2 border-b-2 transition-colors ${activeTab === 'activity' ? 'text-emerald-600 border-emerald-600' : 'text-[#1F1F1F]/40 border-transparent hover:text-[#14213D]'}`}
                >
                  Activity Log
                </button>
              </div>
              <div className="flex items-center gap-3 pr-2">
                <button className="h-8 w-8 rounded flex items-center justify-center hover:bg-gray-100 text-[#1F1F1F]/50 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                </button>
                <button 
                 onClick={() => setIsViewModalOpen(false)}
                 className="h-8 w-8 rounded flex items-center justify-center hover:bg-gray-100 text-[#1F1F1F]/50 hover:text-[#14213D] transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6 flex justify-center">
              {activeTab === 'preview' ? (
                <div className="bg-white border border-[#14213D]/10 rounded-xl shadow-sm w-full max-w-[700px] p-8">
                  {/* Invoice Header */}
                  <div className="flex justify-between items-start mb-10">
                    <div className="flex items-center gap-3">
                      <Scale className="h-10 w-10 text-[#B8860B]" />
                      <div className="flex flex-col">
                        <span className="text-[18px] font-bold text-[#14213D] leading-tight" style={{ fontFamily: "'Libre Baskerville', serif" }}>Qunomy</span>
                        <span className="text-[11px] font-medium text-[#1F1F1F]/50">Law Associates</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <h1 className="text-[28px] font-bold text-emerald-600 tracking-tight">INVOICE</h1>
                      <div className="text-[14px] font-bold text-[#1F1F1F]/70">{selectedInvoice.id}</div>
                    </div>
                  </div>

                  {/* Addresses */}
                  <div className="grid grid-cols-2 gap-10 mb-8">
                    <div>
                      <h3 className="text-[11px] font-bold text-[#1F1F1F]/50 mb-2">From:</h3>
                      <div className="text-[13px] font-bold text-[#14213D] mb-1">Qunomy Law Associates</div>
                      <div className="text-[12px] text-[#1F1F1F]/70 leading-relaxed">
                        23-A, Model Town, Lahore,<br/>
                        Punjab, Pakistan<br/>
                        NTN: 1234567-8
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[11px] font-bold text-[#1F1F1F]/50 mb-2">To:</h3>
                      <div className="text-[13px] font-bold text-[#14213D] mb-1">{selectedInvoice.client}</div>
                      <div className="text-[12px] text-[#1F1F1F]/70 leading-relaxed">
                        45-D, Gulberg III,<br/>
                        Lahore, Pakistan<br/>
                        NTN: 7654321-0
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-10 mb-10 text-[12px]">
                    <div className="space-y-2">
                      <div className="flex"><span className="w-28 text-[#1F1F1F]/60">Invoice Date</span><span className="font-bold text-[#14213D]">: {selectedInvoice.issueDate}</span></div>
                      <div className="flex"><span className="w-28 text-[#1F1F1F]/60">Due Date</span><span className="font-bold text-[#14213D]">: {selectedInvoice.dueDate}</span></div>
                      <div className="flex items-start"><span className="w-28 text-[#1F1F1F]/60 shrink-0">Case Reference</span><span className="font-bold text-[#14213D]">: {selectedInvoice.case1}<br/>{selectedInvoice.case2}</span></div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex"><span className="w-28 text-[#1F1F1F]/60">Payment Terms</span><span className="font-bold text-[#14213D]">: 15 Days</span></div>
                      <div className="flex"><span className="w-28 text-[#1F1F1F]/60">Currency</span><span className="font-bold text-[#14213D]">: PKR</span></div>
                    </div>
                  </div>

                  {/* Invoice Table */}
                  <table className="w-full text-left border-collapse mb-8">
                    <thead>
                      <tr className="border-y border-[#14213D]/10">
                        <th className="py-3 text-[11px] font-bold text-[#1F1F1F]/60 w-10">#</th>
                        <th className="py-3 text-[11px] font-bold text-[#1F1F1F]/60">Description</th>
                        <th className="py-3 text-[11px] font-bold text-[#1F1F1F]/60 text-center w-20">Qty</th>
                        <th className="py-3 text-[11px] font-bold text-[#1F1F1F]/60 text-right w-24">Rate</th>
                        <th className="py-3 text-[11px] font-bold text-[#1F1F1F]/60 text-right w-24">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MOCK_INVOICE_ITEMS.map((item, idx) => (
                        <tr key={item.id} className="border-b border-[#14213D]/5">
                          <td className="py-3 text-[12px] font-medium text-[#1F1F1F]/50">{idx + 1}</td>
                          <td className="py-3 text-[12px] font-medium text-[#14213D]">{item.description}</td>
                          <td className="py-3 text-[12px] font-medium text-[#1F1F1F]/70 text-center">{item.qty}</td>
                          <td className="py-3 text-[12px] font-medium text-[#1F1F1F]/70 text-right">{formatMoney(item.rate)}</td>
                          <td className="py-3 text-[12px] font-medium text-[#1F1F1F]/70 text-right">{formatMoney(item.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Totals */}
                  <div className="flex justify-end mb-10">
                    <div className="w-64 space-y-3">
                      <div className="flex justify-between text-[12px]">
                        <span className="text-[#1F1F1F]/60">Subtotal</span>
                        <span className="font-bold text-[#14213D]">PKR 225,000</span>
                      </div>
                      <div className="flex justify-between text-[12px]">
                        <span className="text-[#1F1F1F]/60">Tax (Sales Tax 11%)</span>
                        <span className="font-bold text-[#14213D]">PKR 24,750</span>
                      </div>
                      <div className="h-[1px] bg-[#14213D]/10"></div>
                      <div className="flex justify-between text-[13px]">
                        <span className="font-bold text-[#14213D]">Total Amount</span>
                        <span className="font-bold text-emerald-600">PKR 249,750</span>
                      </div>
                      <div className="flex justify-between text-[12px]">
                        <span className="text-[#1F1F1F]/60">Paid Amount</span>
                        <span className="font-bold text-[#14213D]">PKR 100,000</span>
                      </div>
                      <div className="bg-red-50 text-red-600 p-2 rounded-lg flex justify-between text-[13px] font-bold mt-2">
                        <span>Outstanding Amount</span>
                        <span>PKR 149,750</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-[12px] font-bold text-[#14213D] mb-1">Amount in Words:</h3>
                      <p className="text-[11px] text-[#1F1F1F]/70">Pakistani Rupees Two Hundred Forty Nine Thousand Seven Hundred Fifty Only.</p>
                    </div>
                    <div>
                      <h3 className="text-[12px] font-bold text-[#14213D] mb-1">Bank Details:</h3>
                      <div className="text-[11px] text-[#1F1F1F]/70 leading-relaxed">
                        Meezan Bank Limited<br/>
                        Account Title: Qunomy Law Associates<br/>
                        Account No: 1234-0100123456<br/>
                        IBAN: PK36MEZN00012340100123456
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="bg-white border border-[#14213D]/10 rounded-xl shadow-sm w-full max-w-[700px] p-8 min-h-[500px]">
                  <h3 className="text-[16px] font-bold text-[#14213D] mb-6">Activity Log</h3>
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-[#14213D]/10">
                    <div className="relative flex items-start gap-4">
                      <div className="absolute left-0 mt-1 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 z-10">
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      </div>
                      <div className="pl-10">
                        <div className="text-[11px] font-medium text-[#1F1F1F]/50 mb-0.5">20 May 2025 at 11:30 AM</div>
                        <div className="text-[13px] font-bold text-[#14213D] mb-1">Payment of PKR 100,000 received</div>
                        <div className="text-[11px] text-[#1F1F1F]/70">Recorded by Admin</div>
                      </div>
                    </div>
                    <div className="relative flex items-start gap-4">
                      <div className="absolute left-0 mt-1 flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 border border-blue-200 z-10">
                        <AlertCircle className="h-3.5 w-3.5 text-blue-600" />
                      </div>
                      <div className="pl-10">
                        <div className="text-[11px] font-medium text-[#1F1F1F]/50 mb-0.5">19 May 2025 at 04:15 PM</div>
                        <div className="text-[13px] font-bold text-[#14213D] mb-1">Invoice Sent to Client</div>
                        <div className="text-[11px] text-[#1F1F1F]/70">via Email to abc@example.com</div>
                      </div>
                    </div>
                    <div className="relative flex items-start gap-4">
                      <div className="absolute left-0 mt-1 flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 border border-gray-200 z-10">
                        <Plus className="h-3.5 w-3.5 text-gray-500" />
                      </div>
                      <div className="pl-10">
                        <div className="text-[11px] font-medium text-[#1F1F1F]/50 mb-0.5">18 May 2025 at 10:00 AM</div>
                        <div className="text-[13px] font-bold text-[#14213D] mb-1">Invoice Created</div>
                        <div className="text-[11px] text-[#1F1F1F]/70">by Ali Raza</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-[#14213D]/10 bg-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 flex items-center gap-2 rounded-lg border border-[#14213D]/10 text-[12px] font-bold text-[#14213D] hover:bg-gray-50 transition-colors">
                  <Download className="h-4 w-4" /> Download PDF
                </button>
                <button className="px-4 py-2 flex items-center gap-2 rounded-lg border border-[#14213D]/10 text-[12px] font-bold text-[#14213D] hover:bg-gray-50 transition-colors">
                  <FileText className="h-4 w-4" /> Export Excel
                </button>
                <button className="px-4 py-2 flex items-center gap-2 rounded-lg border border-[#14213D]/10 text-[12px] font-bold text-[#14213D] hover:bg-gray-50 transition-colors">
                  <Printer className="h-4 w-4" /> Print
                </button>
              </div>
              <button className="px-5 py-2 flex items-center gap-2 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-[12px] font-bold text-white transition-colors">
                 <Share2 className="h-4 w-4" /> Share via WhatsApp
              </button>
            </div>

          </div>
        </div>
      )}
    </LawyerShell>
  );
}

export default LawyerInvoices;
