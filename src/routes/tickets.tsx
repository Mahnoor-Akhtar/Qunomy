import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  LifeBuoy,
  Search,
  Filter,
  Download,
  Plus,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  User,
  Building2,
  Mail,
  Phone,
  Calendar,
  FileText,
} from "lucide-react";
import AdminShell from "@/components/dashboard/AdminShell";
import { toast } from "sonner";
import { exportToCSV } from "@/utils/export";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/tickets")({
  head: () => ({
    meta: [
      { title: "Support Tickets — Qanomy Platform" },
      { name: "description", content: "Manage and resolve support requests from law firms." },
    ],
  }),
  component: TicketsPage,
});

type Priority = "High" | "Medium" | "Low";
type Status = "Open" | "In Progress" | "Waiting for Reply" | "Resolved" | "Closed";

type Ticket = {
  id: string;
  firm: string;
  contactPerson: string;
  email: string;
  phone: string;
  subject: string;
  priority: Priority;
  status: Status;
  assignedTo: string;
  dueDate: string;
  updated: string;
  created: string;
  messages: {
    sender: string;
    role: "Client" | "Support Agent";
    avatar: string;
    text: string;
    time: string;
    attachment?: { name: string; size: string };
  }[];
};

const INITIAL_TICKETS: Ticket[] = [
  {
    id: "#TK-2025-1248",
    firm: "Malik Law Chambers",
    contactPerson: "Adv. Saqib Malik",
    email: "saqib@maliklaw.pk",
    phone: "0300-1234567",
    subject: "Unable to upload documents",
    priority: "High",
    status: "Open",
    assignedTo: "Usman Ali",
    dueDate: "23 May 2025, 06:00 PM",
    updated: "21 May 2025 10:15 AM",
    created: "21 May 2025, 10:15 AM via Web",
    messages: [
      {
        sender: "Adv. Saqib Malik",
        role: "Client",
        avatar: "SM",
        text: "Assalamualaikum,\n\nI am unable to upload documents in case #C-2023-0456. It shows error 'File upload failed'. Please help.\n\nRegards,\nAdv. Saqib Malik",
        time: "21 May 2025, 10:15 AM",
      },
      {
        sender: "Usman Ali",
        role: "Support Agent",
        avatar: "UA",
        text: "Walaikum Assalam Adv. Saqib,\n\nThank you for reaching out. We are checking this issue. Kindly share screenshot of the error for quick resolution.",
        time: "21 May 2025, 11:02 AM",
      },
      {
        sender: "Adv. Saqib Malik",
        role: "Client",
        avatar: "SM",
        text: "Screenshot attached.",
        time: "21 May 2025, 11:18 AM",
        attachment: { name: "error-screenshot.png", size: "320 KB" },
      },
    ],
  },
  {
    id: "#TK-2025-1247",
    firm: "Khan & Associates",
    contactPerson: "Adv. Tariq Khan",
    email: "tariq@khanlaw.pk",
    phone: "0321-9876543",
    subject: "Payment failed but amount deducted",
    priority: "High",
    status: "In Progress",
    assignedTo: "Ayesha Noor",
    dueDate: "22 May 2025, 04:00 PM",
    updated: "21 May 2025 09:42 AM",
    created: "21 May 2025, 09:42 AM via Portal",
    messages: [
      {
        sender: "Adv. Tariq Khan",
        role: "Client",
        avatar: "TK",
        text: "We attempted JazzCash payment for Pro renewal. Amount PKR 67,199 was deducted but plan shows expired.",
        time: "21 May 2025, 09:42 AM",
      },
    ],
  },
  {
    id: "#TK-2025-1246",
    firm: "Legal Vision Advocates",
    contactPerson: "Adv. Hamza Siddique",
    email: "hamza@legalvision.pk",
    phone: "0333-5551234",
    subject: "WhatsApp reminders not sending",
    priority: "Medium",
    status: "Open",
    assignedTo: "Unassigned",
    dueDate: "24 May 2025, 12:00 PM",
    updated: "21 May 2025 09:10 AM",
    created: "21 May 2025, 09:10 AM via Web",
    messages: [
      {
        sender: "Adv. Hamza Siddique",
        role: "Client",
        avatar: "HS",
        text: "Automated WhatsApp notifications for tomorrow's hearing were not sent to clients. Please check API status.",
        time: "21 May 2025, 09:10 AM",
      },
    ],
  },
  {
    id: "#TK-2025-1245",
    firm: "Justice Partners",
    contactPerson: "Adv. Bilal Hassan",
    email: "bilal@justice.pk",
    phone: "0301-4447788",
    subject: "Case search not working properly",
    priority: "Medium",
    status: "Waiting for Reply",
    assignedTo: "Farhan Siddiqui",
    dueDate: "23 May 2025, 02:00 PM",
    updated: "20 May 2025 06:05 PM",
    created: "20 May 2025, 06:05 PM via Web",
    messages: [
      {
        sender: "Adv. Bilal Hassan",
        role: "Client",
        avatar: "BH",
        text: "Searching cases by FIR number is returning 0 results even when FIR exists.",
        time: "20 May 2025, 06:05 PM",
      },
    ],
  },
  {
    id: "#TK-2025-1244",
    firm: "Ahmad Legal Consultants",
    contactPerson: "Adv. Usman Ahmad",
    email: "usman@ahmadlegal.pk",
    phone: "0345-1122334",
    subject: "Need help in importing cases from Excel",
    priority: "Medium",
    status: "In Progress",
    assignedTo: "Usman Ali",
    dueDate: "22 May 2025, 05:00 PM",
    updated: "20 May 2025 04:11 PM",
    created: "20 May 2025, 04:11 PM via Web",
    messages: [
      {
        sender: "Adv. Usman Ahmad",
        role: "Client",
        avatar: "UA",
        text: "We have 450 active cases in an Excel file. Can support team guide on bulk import CSV template format?",
        time: "20 May 2025, 04:11 PM",
      },
    ],
  },
  {
    id: "#TK-2025-1243",
    firm: "Siddiqui Law Associates",
    contactPerson: "Adv. Ayesha Siddiqui",
    email: "ayesha@siddiquilaw.pk",
    phone: "0300-8889900",
    subject: "Invoice not generating",
    priority: "Low",
    status: "Open",
    assignedTo: "Unassigned",
    dueDate: "25 May 2025, 05:00 PM",
    updated: "20 May 2025 02:35 PM",
    created: "20 May 2025, 02:35 PM via Web",
    messages: [
      {
        sender: "Adv. Ayesha Siddiqui",
        role: "Client",
        avatar: "AS",
        text: "PDF export for invoice #INV-2025-089 is showing blank white page.",
        time: "20 May 2025, 02:35 PM",
      },
    ],
  },
  {
    id: "#TK-2025-1242",
    firm: "Rizvi Law Firm",
    contactPerson: "Adv. Syed Rizvi",
    email: "rizvi@rizvilaw.pk",
    phone: "0322-7776655",
    subject: "Feature request: Bulk download",
    priority: "Low",
    status: "Waiting for Reply",
    assignedTo: "Ayesha Noor",
    dueDate: "26 May 2025, 10:00 AM",
    updated: "19 May 2025 05:20 PM",
    created: "19 May 2025, 05:20 PM via Web",
    messages: [
      {
        sender: "Adv. Syed Rizvi",
        role: "Client",
        avatar: "SR",
        text: "It would be great to have a 'Download All Attachments' button inside a case file.",
        time: "19 May 2025, 05:20 PM",
      },
    ],
  },
  {
    id: "#TK-2025-1241",
    firm: "Mehmood & Co.",
    contactPerson: "Adv. Rashid Mehmood",
    email: "rashid@mehmoodco.pk",
    phone: "0302-3334455",
    subject: "Login issue for multiple users",
    priority: "High",
    status: "In Progress",
    assignedTo: "Usman Ali",
    dueDate: "21 May 2025, 06:00 PM",
    updated: "19 May 2025 03:18 PM",
    created: "19 May 2025, 03:18 PM via Web",
    messages: [
      {
        sender: "Adv. Rashid Mehmood",
        role: "Client",
        avatar: "RM",
        text: "Two junior associates are getting 'Session expired' immediately after entering credentials.",
        time: "19 May 2025, 03:18 PM",
      },
    ],
  },
  {
    id: "#TK-2025-1240",
    firm: "Al-Haq Legal",
    contactPerson: "Adv. Faisal Haq",
    email: "faisal@alhaqlegal.pk",
    phone: "0312-9998877",
    subject: "Change billing cycle request",
    priority: "Low",
    status: "Resolved",
    assignedTo: "Farhan Siddiqui",
    dueDate: "20 May 2025, 11:40 AM",
    updated: "19 May 2025 11:40 AM",
    created: "19 May 2025, 11:40 AM via Web",
    messages: [
      {
        sender: "Adv. Faisal Haq",
        role: "Client",
        avatar: "FH",
        text: "Please switch our firm subscription from Monthly to Annual billing.",
        time: "19 May 2025, 11:40 AM",
      },
    ],
  },
  {
    id: "#TK-2025-1239",
    firm: "Zafar & Co. Advocates",
    contactPerson: "Adv. Omer Zafar",
    email: "omer@zafarlaw.pk",
    phone: "0300-4443322",
    subject: "Clarification on data export",
    priority: "Low",
    status: "Closed",
    assignedTo: "Ayesha Noor",
    dueDate: "19 May 2025, 06:30 PM",
    updated: "18 May 2025 06:30 PM",
    created: "18 May 2025, 06:30 PM via Web",
    messages: [
      {
        sender: "Adv. Omer Zafar",
        role: "Client",
        avatar: "OZ",
        text: "Are client phone numbers included in the CSV audit export?",
        time: "18 May 2025, 06:30 PM",
      },
    ],
  },
];

export default function TicketsPage() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      const matchesStatus =
        statusFilter === "All" ||
        t.status.toLowerCase().replace(/\s+/g, "") === statusFilter.toLowerCase().replace(/\s+/g, "");
      const matchesSearch =
        !searchQuery ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.firm.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.subject.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [tickets, statusFilter, searchQuery]);

  return (
    <AdminShell
      active="tickets"
      title="Support Tickets"
      subtitle="Manage and resolve support requests from law firms."
    >
        <div className="space-y-4">
          {/* Status Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-gray-200 bg-white p-1.5 shadow-sm text-xs font-semibold">
            {[
              { label: "All Tickets", value: "All", count: 124 },
              { label: "Open", value: "Open", count: 28 },
              { label: "In Progress", value: "InProgress", count: 14 },
              { label: "Waiting for Reply", value: "WaitingforReply", count: 16 },
              { label: "Resolved", value: "Resolved", count: 58 },
              { label: "Closed", value: "Closed", count: 8 },
            ].map((tab) => {
              const active = statusFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setStatusFilter(tab.value)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 transition ${
                    active
                      ? "bg-blue-600 text-white shadow-sm font-bold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                      active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search, Filter, Export & New Ticket bar */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by ticket ID, firm name, subject..."
                  className="w-full rounded-lg border border-gray-200 bg-gray-50/50 pl-9 pr-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toast.info("Filter modal opened")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  <Filter className="h-3.5 w-3.5" /> Filter
                </button>
                <button
                  onClick={() => {
                    exportToCSV(INITIAL_TICKETS, "support_tickets", [
                      { key: "id", label: "Ticket ID" },
                      { key: "firm", label: "Firm Name" },
                      { key: "subject", label: "Subject" },
                      { key: "priority", label: "Priority" },
                      { key: "status", label: "Status" },
                      { key: "assignedTo", label: "Assigned To" },
                      { key: "updated", label: "Last Updated" },
                    ]);
                    toast.success("Exported tickets CSV");
                  }}
                  className="inline-flex h-8 items-center gap-1.5 rounded border border-gray-200 bg-white px-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Download className="h-3.5 w-3.5" /> Export
                </button>
                <button
                  onClick={() => toast.info("Creating new support ticket")}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-700"
                >
                  <Plus className="h-3.5 w-3.5" /> New Ticket
                </button>
              </div>
            </div>

            {/* Tickets Table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-[11px]">
                <thead className="border-b border-gray-200 bg-gray-50/50 font-semibold text-gray-500 uppercase">
                  <tr>
                    <th className="px-3 py-2.5 w-8">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </th>
                    <th className="px-3 py-2.5">Ticket ID</th>
                    <th className="px-3 py-2.5">Firm</th>
                    <th className="px-3 py-2.5">Subject</th>
                    <th className="px-3 py-2.5">Priority</th>
                    <th className="px-3 py-2.5">Status</th>
                    <th className="px-3 py-2.5">Assigned To</th>
                    <th className="px-3 py-2.5">Updated</th>
                    <th className="px-3 py-2.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredTickets.map((t) => (
                      <tr
                        key={t.id}
                        onClick={() => navigate({ to: "/ticket-detail/$ticketId", params: { ticketId: t.id } })}
                        className="cursor-pointer transition hover:bg-gray-50"
                      >
                        <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" className="rounded border-gray-300" />
                        </td>
                        <td className="px-3 py-3 font-bold text-blue-600">{t.id}</td>
                        <td className="px-3 py-3 font-semibold text-gray-900">{t.firm}</td>
                        <td className="px-3 py-3 max-w-[140px] truncate text-gray-700" title={t.subject}>
                          {t.subject}
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`inline-flex rounded px-2 py-0.5 text-[10px] font-bold ${
                              t.priority === "High"
                                ? "bg-rose-100 text-rose-700"
                                : t.priority === "Medium"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {t.priority}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              t.status === "Open"
                                ? "bg-rose-50 text-rose-600 border border-rose-200"
                                : t.status === "In Progress"
                                ? "bg-blue-50 text-blue-600 border border-blue-200"
                                : t.status === "Waiting for Reply"
                                ? "bg-purple-50 text-purple-600 border border-purple-200"
                                : t.status === "Resolved"
                                ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                                : "bg-gray-100 text-gray-600 border border-gray-200"
                            }`}
                          >
                            {t.status}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-gray-600">{t.assignedTo}</td>
                        <td className="px-3 py-3 text-gray-400 text-[11px]">{t.updated}</td>
                        <td className="px-3 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                          <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700">
                            <MoreVertical className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-gray-100 pt-3 text-xs text-gray-500">
              <div>Showing 1 to {filteredTickets.length} of 124 tickets</div>
              <div className="flex items-center gap-1">
                <button className="rounded border border-gray-200 px-2 py-1 hover:bg-gray-50">
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button className="rounded bg-blue-600 px-2.5 py-1 font-semibold text-white">1</button>
                <button className="rounded border border-gray-200 px-2.5 py-1 hover:bg-gray-50">2</button>
                <button className="rounded border border-gray-200 px-2.5 py-1 hover:bg-gray-50">3</button>
                <span className="px-1">...</span>
                <button className="rounded border border-gray-200 px-2.5 py-1 hover:bg-gray-50">13</button>
                <button className="rounded border border-gray-200 px-2 py-1 hover:bg-gray-50">
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
                <select className="ml-2 rounded border border-gray-200 bg-white px-2 py-1 text-xs">
                  <option>10 / page</option>
                  <option>25 / page</option>
                  <option>50 / page</option>
                </select>
              </div>
            </div>
          </div>
        </div>
    </AdminShell>
  );
}
