import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft, Clock, MessageSquare, Paperclip, 
  User, Building2, Mail, Phone, Calendar, 
  Send, FileText, Activity, ShieldAlert,
  ChevronDown, MoreHorizontal, CheckCircle2,
  AlertCircle
} from "lucide-react";
import AdminShell from "@/components/dashboard/AdminShell";
import { toast } from "sonner";

export const Route = createFileRoute("/ticket-detail/$ticketId")({
  head: () => ({
    meta: [
      { title: "Ticket Details — Qanomy" },
      { name: "description", content: "View and reply to support ticket." },
    ],
  }),
  component: TicketDetailPage,
});

const TABS = ["Conversation", "Ticket Details", "Attachments", "Internal Notes", "Audit Log"] as const;
type Tab = (typeof TABS)[number];

function TicketDetailPage() {
  const { ticketId } = Route.useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("Conversation");
  const [replyText, setReplyText] = useState("");
  const [isInternal, setIsInternal] = useState(false);

  // Decode the ticket ID in case it was URL encoded (e.g., %23TK-...)
  const displayId = decodeURIComponent(ticketId).startsWith('#') 
    ? decodeURIComponent(ticketId) 
    : `#${decodeURIComponent(ticketId)}`;

  // Mock data for the specific ticket
  const ticket = {
    id: displayId,
    status: "Open",
    priority: "Low Priority",
    subject: "Invoice not generating",
    createdOn: "20 May 2025, 02:35 PM",
    source: "Web",
    firmName: "Siddiqui Law Associates",
    contactPerson: "Adv. Ayesha Siddiqui",
    email: "ayesha@siddiquilaw.pk",
    phone: "0300-8889900",
    assignedTo: "Unassigned",
    dueDate: "23 May 2025, 06:00 PM"
  };

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    
    toast.success(isInternal ? "Internal note added" : "Reply sent to client");
    setReplyText("");
  };

  return (
    <AdminShell
      active="tickets"
      title="Support Tickets"
      subtitle="Manage support requests from firms."
    >
      <div className="mx-auto max-w-[1200px] animate-fade-in space-y-6 pb-20">
        
        {/* ── Top Navigation & Header ───────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-4">
            <button 
              onClick={() => navigate({ to: "/tickets" })}
              className="group inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Tickets
            </button>

            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  {ticket.id}
                </h1>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-200 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  {ticket.status}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600 border border-gray-200 shadow-sm">
                  <Clock className="h-3 w-3" />
                  {ticket.priority}
                </span>
              </div>
              <h2 className="mt-2 text-xl font-semibold text-gray-700">{ticket.subject}</h2>
              <div className="mt-1.5 flex items-center gap-2 text-xs font-medium text-gray-500">
                <span>Created on {ticket.createdOn} via {ticket.source}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-900 transition-all focus:ring-2 focus:ring-gray-200 focus:outline-none">
              <MoreHorizontal className="h-4 w-4" /> Actions
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-md hover:bg-blue-700 transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none">
              <CheckCircle2 className="h-4 w-4" /> Resolve Ticket
            </button>
          </div>
        </div>

        {/* ── Main 2-Column Layout ──────────────────────────────── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Left Column (Main Content - 8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Elegant Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto hide-scrollbar gap-6">
                {TABS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`relative whitespace-nowrap pb-4 text-sm font-semibold transition-all ${
                      tab === t
                        ? "text-blue-600"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {t}
                    {t === "Attachments" && (
                      <span className={`ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${tab === t ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>2</span>
                    )}
                    {tab === t && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Conversation Tab Content */}
            {tab === "Conversation" && (
              <div className="space-y-8">
                
                {/* Message Feed */}
                <div className="space-y-6">
                  {/* Client Message */}
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-white font-bold shadow-sm">
                      AS
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-bold text-gray-900">{ticket.contactPerson}</span>
                        <span className="rounded bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 uppercase tracking-wider border border-indigo-100">Client</span>
                        <span className="text-xs text-gray-400">{ticket.createdOn}</span>
                      </div>
                      <div className="rounded-2xl rounded-tl-sm bg-white p-4.5 shadow-sm border border-gray-100 text-sm text-gray-800 leading-relaxed">
                        PDF export for invoice #INV-2025-089 is showing blank white page.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reply Box (Rich Editor Style) */}
                <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50 transition-all duration-200">
                  {/* Internal/Client Toggle Header */}
                  <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/80 px-4 py-3">
                    <button 
                      type="button"
                      onClick={() => setIsInternal(false)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                        !isInternal 
                          ? 'text-gray-900 bg-white shadow-sm ring-1 ring-gray-200' 
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                      }`}
                    >
                      Reply to Client
                    </button>
                    <button 
                      type="button"
                      onClick={() => setIsInternal(true)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                        isInternal 
                          ? 'text-amber-800 bg-amber-100 shadow-sm ring-1 ring-amber-200' 
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                      }`}
                    >
                      <ShieldAlert className="h-3.5 w-3.5" /> Internal Note
                    </button>
                  </div>
                  
                  {/* Textarea */}
                  <form onSubmit={handleReply}>
                    <textarea 
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={isInternal ? "Add an internal note (clients won't see this)..." : "Type your reply here..."}
                      className={`w-full min-h-[140px] resize-none p-5 text-sm outline-none placeholder:text-gray-400 ${
                        isInternal ? 'bg-amber-50/30 text-amber-900' : 'bg-transparent text-gray-900'
                      }`}
                    />
                    
                    {/* Action Footer */}
                    <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button type="button" className="rounded-full p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-colors" title="Attach file">
                          <Paperclip className="h-4.5 w-4.5" />
                        </button>
                      </div>
                      <button 
                        type="submit" 
                        disabled={!replyText.trim()}
                        className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold shadow-sm transition-all ${
                          !replyText.trim()
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : isInternal 
                              ? "bg-amber-600 text-white hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-1" 
                              : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                        }`}
                      >
                        <Send className="h-4 w-4" />
                        {isInternal ? "Save Note" : "Send Reply"}
                      </button>
                    </div>
                  </form>
                </div>
                
                <div className="text-center text-xs text-gray-400">
                  Created by system on {ticket.createdOn} via {ticket.source}
                </div>

              </div>
            )}

            {/* Other Tabs Placeholders */}
            {tab !== "Conversation" && (
              <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50">
                <FileText className="mb-3 h-8 w-8 text-gray-300" />
                <h3 className="text-sm font-bold text-gray-900">No {tab.toLowerCase()} yet</h3>
                <p className="mt-1 text-xs text-gray-500">Items added will appear here.</p>
              </div>
            )}
            
          </div>

          {/* Right Column (Sidebar - 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Ticket Information Card */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 bg-gray-50/80 px-6 py-4">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-gray-500">Ticket Information</h3>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Firm Name</div>
                  <div className="mt-1.5 flex items-center gap-2.5 text-sm font-bold text-gray-900">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-100 text-gray-600">
                      <Building2 className="h-4 w-4" />
                    </div>
                    {ticket.firmName}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Contact Person</div>
                  <div className="mt-1.5 flex items-center gap-2.5 text-sm font-semibold text-gray-700">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-100 text-gray-600">
                      <User className="h-4 w-4" />
                    </div>
                    {ticket.contactPerson}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Email</div>
                  <div className="mt-1.5 flex items-center gap-2.5 text-sm font-medium text-gray-700">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-100 text-gray-600">
                      <Mail className="h-4 w-4" />
                    </div>
                    <a href={`mailto:${ticket.email}`} className="text-blue-600 hover:underline">{ticket.email}</a>
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Phone</div>
                  <div className="mt-1.5 flex items-center gap-2.5 text-sm font-medium text-gray-700">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-100 text-gray-600">
                      <Phone className="h-4 w-4" />
                    </div>
                    {ticket.phone}
                  </div>
                </div>
              </div>
            </div>

            {/* Assignment Card */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 bg-gray-50/80 px-6 py-4">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-gray-500">Assignment</h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-gray-400">Assigned To</label>
                  <button className="group flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm transition-all hover:border-blue-400 hover:ring-1 hover:ring-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <span className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 border border-gray-200">
                        <User className="h-3 w-3 text-gray-500" />
                      </div>
                      <span className="font-semibold">{ticket.assignedTo}</span>
                    </span>
                    <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                  </button>
                </div>
                
                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-gray-400">Status</label>
                  <button className="group flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm transition-all hover:border-blue-400 hover:ring-1 hover:ring-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <span className="flex items-center gap-3">
                      <span className="flex items-center justify-center h-6 w-6 rounded-md bg-blue-50 border border-blue-100">
                        <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                      </span>
                      <span className="font-semibold">{ticket.status}</span>
                    </span>
                    <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                  </button>
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-gray-400">Due Date</label>
                  <div className="flex w-full items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-600 shadow-inner">
                    <Calendar className="h-4.5 w-4.5 text-gray-400" />
                    <span className="font-medium">{ticket.dueDate}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AdminShell>
  );
}
