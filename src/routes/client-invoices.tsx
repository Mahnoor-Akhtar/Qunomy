import { createFileRoute } from "@tanstack/react-router";
import ClientShell from "../components/dashboard/ClientShell";
import { 
  Search, Download, Eye, X, FileText, Banknote, CreditCard, AlertCircle
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/client-invoices")({
  component: ClientInvoices,
});

const MOCK_INVOICES = [
  { id: "INV-2025-051", case1: "CC 123/2024", case2: "Muhammad Ahmad vs State", issueDate: "22 May 2025", dueDate: "05 Jun 2025", amount: 150000, paid: 150000, status: "Paid" },
  { id: "INV-2025-050", case1: "CS 456/2023", case2: "ABC Corp vs XYZ Bank", issueDate: "20 May 2025", dueDate: "04 Jun 2025", amount: 250000, paid: 100000, status: "Partial" },
  { id: "INV-2025-049", case1: "CC 123/2024", case2: "Muhammad Ahmad vs State", issueDate: "18 May 2025", dueDate: "01 Jun 2025", amount: 75000, paid: 0, status: "Unpaid" },
];

const MOCK_INVOICE_ITEMS = [
  { id: 1, description: "Legal Consultation & Advice", qty: 1, rate: 80000, amount: 80000 },
  { id: 2, description: "Drafting of Suit", qty: 1, rate: 60000, amount: 60000 },
  { id: 3, description: "Court Appearance (2 Dates)", qty: 2, rate: 25000, amount: 50000 },
  { id: 4, description: "Documentation & Filing Charges", qty: 1, rate: 25000, amount: 25000 },
  { id: 5, description: "Miscellaneous Expenses", qty: 1, rate: 10000, amount: 10000 },
];

function ClientInvoices() {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const formatMoney = (amount: number) => {
    return amount.toLocaleString('en-US');
  };

  return (
    <ClientShell active="invoices">
      <div className="flex flex-col h-full space-y-4 max-w-[1400px] mx-auto w-full pb-10">
        <div className="flex justify-between items-center shrink-0 mt-2">
          <div>
            <h1 className="text-[28px] font-bold text-[#14213D] leading-tight" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              Invoices & Payments
            </h1>
            <div className="text-[12px] font-medium text-[#1F1F1F]/50 mt-1 flex items-center gap-2">
              <span>Dashboard</span>
              <span className="h-1 w-1 rounded-full bg-[#1F1F1F]/20"></span>
              <span className="text-[#14213D]">Invoices</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white border border-[#14213D]/10 rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <div className="h-10 w-10 rounded-full bg-[#B8860B]/10 flex items-center justify-center shrink-0">
              <FileText className="h-4 w-4 text-[#B8860B]" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-[#1F1F1F]/50">Total Invoices</div>
              <div className="text-[18px] font-bold text-[#14213D] leading-tight mt-0.5">3</div>
              <div className="text-[10px] text-[#1F1F1F]/40 mt-0.5">All Time</div>
            </div>
          </div>

          <div className="bg-white border border-[#14213D]/10 rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <Banknote className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-[#1F1F1F]/50">Total Billed</div>
              <div className="text-[18px] font-bold text-[#14213D] leading-tight mt-0.5">PKR 475,000</div>
              <div className="text-[10px] text-[#1F1F1F]/40 mt-0.5">All Time</div>
            </div>
          </div>

          <div className="bg-white border border-[#14213D]/10 rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
              <CreditCard className="h-4 w-4 text-emerald-500" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-[#1F1F1F]/50">Paid Amount</div>
              <div className="text-[18px] font-bold text-[#14213D] leading-tight mt-0.5">PKR 250,000</div>
              <div className="text-[10px] text-[#1F1F1F]/40 mt-0.5">All Time</div>
            </div>
          </div>

          <div className="bg-white border border-[#14213D]/10 rounded-xl p-4 flex items-center gap-3 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 h-16 w-16 bg-red-50 rounded-full blur-2xl -mr-4 -mt-4"></div>
            <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center shrink-0 relative z-10">
              <AlertCircle className="h-4 w-4 text-red-500" />
            </div>
            <div className="relative z-10">
              <div className="text-[11px] font-bold text-[#1F1F1F]/50">Outstanding</div>
              <div className="text-[18px] font-bold text-[#14213D] leading-tight mt-0.5">PKR 225,000</div>
              <div className="text-[10px] text-[#1F1F1F]/40 mt-0.5">All Time</div>
            </div>
          </div>
        </div>

        {/* Toolbar & Table */}
        <div className="bg-white border border-[#14213D]/10 rounded-xl shadow-sm flex flex-col flex-1 min-h-[400px]">
          
          {/* Toolbar */}
          <div className="p-4 border-b border-[#14213D]/10 flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F1F1F]/40" />
              <input 
                type="text" 
                placeholder="Search by invoice no., case, amount..." 
                className="w-full pl-9 pr-4 h-9 bg-gray-50 border border-[#14213D]/10 rounded-lg text-[12px] font-medium text-[#14213D] placeholder:text-[#1F1F1F]/40 focus:outline-none focus:border-[#B8860B] focus:bg-white transition-colors"
              />
            </div>
            
            <select className="h-9 px-3 bg-white border border-[#14213D]/10 rounded-lg text-[12px] font-bold text-[#14213D] focus:outline-none focus:border-[#B8860B]">
              <option>All Status</option>
              <option>Paid</option>
              <option>Unpaid</option>
              <option>Partial</option>
            </select>
          </div>

          {/* Table Area */}
          <div className="flex-1 overflow-x-auto min-h-0 bg-white">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="bg-gray-50/50 border-b border-[#14213D]/10">
                   <th className="px-4 py-3 text-[10px] font-bold text-[#1F1F1F]/60 uppercase tracking-wider w-8">#</th>
                   <th className="px-4 py-3 text-[10px] font-bold text-[#1F1F1F]/60 uppercase tracking-wider whitespace-nowrap">Invoice No.</th>
                   <th className="px-4 py-3 text-[10px] font-bold text-[#1F1F1F]/60 uppercase tracking-wider">Case</th>
                   <th className="px-4 py-3 text-[10px] font-bold text-[#1F1F1F]/60 uppercase tracking-wider whitespace-nowrap">Issue Date</th>
                   <th className="px-4 py-3 text-[10px] font-bold text-[#1F1F1F]/60 uppercase tracking-wider whitespace-nowrap">Due Date</th>
                   <th className="px-4 py-3 text-[10px] font-bold text-[#1F1F1F]/60 uppercase tracking-wider">Amount</th>
                   <th className="px-4 py-3 text-[10px] font-bold text-[#1F1F1F]/60 uppercase tracking-wider">Paid</th>
                   <th className="px-4 py-3 text-[10px] font-bold text-[#1F1F1F]/60 uppercase tracking-wider">Status</th>
                   <th className="px-4 py-3 text-[10px] font-bold text-[#1F1F1F]/60 uppercase tracking-wider text-right">Actions</th>
                 </tr>
               </thead>
               <tbody>
                 {MOCK_INVOICES.map((inv, idx) => (
                   <tr 
                     key={inv.id} 
                     className="border-b border-[#14213D]/5 hover:bg-gray-50/80 transition-all duration-200 cursor-pointer group"
                     onClick={() => { setSelectedInvoice(inv); setIsViewModalOpen(true); }}
                   >
                     <td className="px-4 py-3 text-[11px] font-medium text-[#1F1F1F]/50">{idx + 1}</td>
                     <td className="px-4 py-3 text-[11px] font-bold text-[#14213D] whitespace-nowrap">{inv.id}</td>
                     <td className="px-4 py-3 max-w-[140px] truncate" title={inv.case1}>
                       <div className="text-[11px] font-bold text-[#14213D] leading-tight truncate">{inv.case1}</div>
                       <div className="text-[10px] text-[#1F1F1F]/50 mt-0.5 leading-tight truncate">{inv.case2}</div>
                     </td>
                     <td className="px-4 py-3 text-[11px] font-medium text-[#1F1F1F]/70 whitespace-nowrap">{inv.issueDate}</td>
                     <td className="px-4 py-3 text-[11px] font-medium text-[#1F1F1F]/70 whitespace-nowrap">{inv.dueDate}</td>
                     <td className="px-4 py-3 text-[11px] font-bold text-[#14213D] whitespace-nowrap">PKR {formatMoney(inv.amount)}</td>
                     <td className="px-4 py-3 text-[11px] font-bold text-[#14213D] whitespace-nowrap">PKR {formatMoney(inv.paid)}</td>
                     <td className="px-4 py-3">
                       <span className={`inline-flex items-center justify-center px-2 py-1 rounded text-[10px] font-bold tracking-wide whitespace-nowrap ${
                         inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                         inv.status === 'Partial' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                         'bg-rose-50 text-rose-600 border border-rose-100'
                       }`}>
                         {inv.status}
                       </span>
                     </td>
                     <td className="px-4 py-3">
                       <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button 
                          onClick={(e) => { e.stopPropagation(); setSelectedInvoice(inv); setIsViewModalOpen(true); }}
                          className="h-8 w-8 rounded-lg flex items-center justify-center bg-white border border-[#14213D]/10 text-[#1F1F1F]/40 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-all shadow-sm"
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

          <div className="p-3 border-t border-[#14213D]/10 flex items-center justify-between">
            <div className="text-[11px] font-medium text-[#1F1F1F]/50">Showing 1 to 3 of 3 invoices</div>
          </div>
        </div>
      </div>

      {/* View Invoice Modal */}
      {isViewModalOpen && selectedInvoice && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#14213D]/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[800px] flex flex-col overflow-hidden max-h-[90vh]">
            <div className="p-5 border-b border-[#14213D]/10 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#14213D] text-white flex items-center justify-center font-bold text-[16px] shrink-0" style={{ fontFamily: "'Libre Baskerville', serif" }}>Q</div>
                <div>
                  <h2 className="text-[16px] font-bold text-[#14213D] leading-tight">{selectedInvoice.id}</h2>
                  <div className="text-[11px] font-medium text-[#1F1F1F]/50 mt-0.5">Issued on {selectedInvoice.issueDate}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                 onClick={() => setIsViewModalOpen(false)}
                 className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#1F1F1F]/50 hover:text-[#14213D] transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="text-[11px] font-bold text-[#1F1F1F]/40 uppercase tracking-wider mb-2">Billed To</div>
                  <div className="text-[16px] font-bold text-[#14213D] mb-1">Rizwan</div>
                  <div className="text-[12px] font-medium text-[#1F1F1F]/60">rizwan@gmail.com</div>
                  <div className="text-[12px] font-medium text-[#1F1F1F]/60 mt-2">
                    <span className="font-bold text-[#14213D]">Case:</span> {selectedInvoice.case1} - {selectedInvoice.case2}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-bold text-[#1F1F1F]/40 uppercase tracking-wider mb-2">Invoice Details</div>
                  <div className="text-[12px] font-medium text-[#1F1F1F]/70 mb-1"><span className="font-bold text-[#14213D]">Invoice No:</span> {selectedInvoice.id}</div>
                  <div className="text-[12px] font-medium text-[#1F1F1F]/70 mb-1"><span className="font-bold text-[#14213D]">Date of Issue:</span> {selectedInvoice.issueDate}</div>
                  <div className="text-[12px] font-medium text-[#1F1F1F]/70 mb-3"><span className="font-bold text-[#14213D]">Due Date:</span> {selectedInvoice.dueDate}</div>
                  <span className={`inline-flex items-center justify-center px-2 py-1 rounded text-[11px] font-bold tracking-wide ${
                    selectedInvoice.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                    selectedInvoice.status === 'Partial' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                    'bg-rose-50 text-rose-600 border border-rose-100'
                  }`}>
                    {selectedInvoice.status}
                  </span>
                </div>
              </div>

              <table className="w-full text-left border-collapse mb-6">
                <thead>
                  <tr className="border-b border-[#14213D]/20">
                    <th className="py-3 text-[11px] font-bold text-[#1F1F1F]/50">Description</th>
                    <th className="py-3 text-[11px] font-bold text-[#1F1F1F]/50 text-center w-20">Qty</th>
                    <th className="py-3 text-[11px] font-bold text-[#1F1F1F]/50 text-right w-28">Rate (PKR)</th>
                    <th className="py-3 text-[11px] font-bold text-[#1F1F1F]/50 text-right w-32">Amount (PKR)</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_INVOICE_ITEMS.map((item) => (
                    <tr key={item.id} className="border-b border-[#14213D]/5">
                      <td className="py-4 text-[12px] font-medium text-[#14213D]">{item.description}</td>
                      <td className="py-4 text-[12px] font-medium text-[#1F1F1F]/70 text-center">{item.qty}</td>
                      <td className="py-4 text-[12px] font-medium text-[#1F1F1F]/70 text-right">{formatMoney(item.rate)}</td>
                      <td className="py-4 text-[12px] font-bold text-[#14213D] text-right">{formatMoney(item.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end mb-8">
                <div className="w-[300px]">
                  <div className="flex justify-between py-2 text-[12px] font-medium text-[#1F1F1F]/70 border-b border-[#14213D]/5">
                    <span>Subtotal</span>
                    <span>PKR 225,000</span>
                  </div>
                  <div className="flex justify-between py-2 text-[12px] font-medium text-[#1F1F1F]/70 border-b border-[#14213D]/5">
                    <span>Tax (0%)</span>
                    <span>PKR 0</span>
                  </div>
                  <div className="flex justify-between py-3 text-[16px] font-bold text-[#14213D] border-b-2 border-[#14213D]/20">
                    <span>Total</span>
                    <span>PKR {formatMoney(selectedInvoice.amount)}</span>
                  </div>
                  <div className="flex justify-between py-2 text-[12px] font-bold text-emerald-600 border-b border-[#14213D]/5">
                    <span>Amount Paid</span>
                    <span>PKR {formatMoney(selectedInvoice.paid)}</span>
                  </div>
                  <div className="flex justify-between py-3 text-[14px] font-bold text-rose-600 bg-rose-50 px-3 mt-2 rounded">
                    <span>Amount Due</span>
                    <span>PKR {formatMoney(selectedInvoice.amount - selectedInvoice.paid)}</span>
                  </div>
                </div>
              </div>

            </div>
            
            <div className="p-5 border-t border-[#14213D]/10 bg-gray-50 flex gap-3 justify-end items-center">
              <button className="px-5 py-2 rounded-lg border border-[#14213D]/15 text-[12px] font-bold text-[#14213D] hover:bg-white transition-colors flex items-center gap-2">
                <Download className="h-4 w-4" /> Download PDF
              </button>
              {selectedInvoice.status !== "Paid" && (
                <button className="px-5 py-2 rounded-lg bg-[#B8860B] text-white text-[12px] font-bold hover:bg-[#14213D] transition-colors flex items-center gap-2 shadow-sm">
                  <CreditCard className="h-4 w-4" /> Pay Now (JazzCash/EasyPaisa)
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </ClientShell>
  );
}
