import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Download,
  Calendar,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import AdminShell from "@/components/dashboard/AdminShell";
import { toast } from "sonner";
import { exportToCSV } from "@/utils/export";

export const Route = createFileRoute("/firms")({
  head: () => ({
    meta: [
      { title: "Firms Management — Qanomy" },
      { name: "description", content: "View and manage all registered law firms on the Qanomy platform." },
      { property: "og:title", content: "Firms Management — Qanomy" },
      { property: "og:description", content: "Manage law firms, their subscriptions, users and audit logs on Qanomy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FirmsPage,
});

type Plan   = "Professional" | "Business" | "Enterprise" | "Basic";
type Status = "Active" | "Trial" | "Inactive" | "Suspended";

export type Firm = {
  id: string;
  name: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  plan: Plan;
  users: number;
  cases: number;
  status: Status;
  joined: string;
  city: string;
  address: string;
  billing: "Monthly" | "Yearly";
  amount: number;
  nextBilling: string;
  paymentMethod: string;
  autoRenew: boolean;
  storageGb: number;
  storageCap: number;
  usersCap: number;
  documents: number;
};

export const FIRMS: Firm[] = [
  { id: "1",  name: "Khan & Associates",        ownerName: "Adv. Imran Khan",       ownerEmail: "imran@khanassociates.pk",   ownerPhone: "0300-1234567", plan: "Professional", users: 12, cases: 248, status: "Active",    joined: "20 May 2025", city: "Islamabad",  address: "House 12, F-8/2, Islamabad, Pakistan",          billing: "Monthly", amount: 5999,   nextBilling: "20 June 2025", paymentMethod: "JazzCash",      autoRenew: true,  storageGb: 4.2,  storageCap: 50,  usersCap: 20,  documents: 892  },
  { id: "2",  name: "Malik Law Chambers",        ownerName: "Adv. Saqib Malik",      ownerEmail: "saqib@maliklaw.pk",         ownerPhone: "0300-1234567", plan: "Business",     users: 18, cases: 512, status: "Active",    joined: "19 May 2025", city: "Lahore",     address: "123-A, Model Town, Lahore, Punjab, Pakistan",   billing: "Monthly", amount: 8999,   nextBilling: "19 June 2025", paymentMethod: "JazzCash",      autoRenew: true,  storageGb: 8.4,  storageCap: 50,  usersCap: 25,  documents: 1248 },
  { id: "3",  name: "Legal Vision Advocates",    ownerName: "Adv. Ayesha Noor",      ownerEmail: "ayesha@legalvision.pk",     ownerPhone: "0300-2345678", plan: "Enterprise",   users: 28, cases: 806, status: "Active",    joined: "18 May 2025", city: "Karachi",    address: "Suite 4, Clifton Block 8, Karachi",              billing: "Yearly",  amount: 149000, nextBilling: "18 May 2026",  paymentMethod: "Bank Transfer", autoRenew: true,  storageGb: 26.1, storageCap: 200, usersCap: 100, documents: 4230 },
  { id: "4",  name: "Justice Partners",          ownerName: "Adv. Usman Tariq",      ownerEmail: "usman@justicepartners.pk",  ownerPhone: "0300-3456789", plan: "Professional", users: 9,  cases: 176, status: "Trial",     joined: "17 May 2025", city: "Rawalpindi", address: "Saddar, Rawalpindi",                             billing: "Monthly", amount: 0,      nextBilling: "31 May 2025",  paymentMethod: "—",             autoRenew: false, storageGb: 1.1,  storageCap: 5,   usersCap: 10,  documents: 210  },
  { id: "5",  name: "Siddiqui Law Associates",   ownerName: "Adv. Farhan Siddiqui",  ownerEmail: "farhan@siddiqui.law.pk",   ownerPhone: "0300-4567890", plan: "Basic",        users: 5,  cases: 86,  status: "Active",    joined: "16 May 2025", city: "Multan",     address: "Bosan Road, Multan",                             billing: "Monthly", amount: 2999,   nextBilling: "16 June 2025", paymentMethod: "Easypaisa",     autoRenew: true,  storageGb: 0.9,  storageCap: 10,  usersCap: 8,   documents: 145  },
  { id: "6",  name: "Ahmad Legal Consultants",   ownerName: "Adv. Bilal Ahmad",      ownerEmail: "bilal@ahmadlegal.pk",       ownerPhone: "0300-5678901", plan: "Business",     users: 15, cases: 362, status: "Trial",     joined: "15 May 2025", city: "Faisalabad", address: "Jaranwala Road, Faisalabad",                     billing: "Monthly", amount: 0,      nextBilling: "30 May 2025",  paymentMethod: "—",             autoRenew: false, storageGb: 3.6,  storageCap: 50,  usersCap: 25,  documents: 512  },
  { id: "7",  name: "Zafar & Co. Advocates",     ownerName: "Adv. Zafar Iqbal",      ownerEmail: "zafar@zafarco.pk",          ownerPhone: "0300-6789012", plan: "Professional", users: 8,  cases: 121, status: "Active",    joined: "14 May 2025", city: "Peshawar",   address: "University Town, Peshawar",                      billing: "Monthly", amount: 5999,   nextBilling: "14 June 2025", paymentMethod: "JazzCash",      autoRenew: true,  storageGb: 2.3,  storageCap: 50,  usersCap: 20,  documents: 320  },
  { id: "8",  name: "Rizvi Law Firm",            ownerName: "Adv. Ali Rizvi",        ownerEmail: "ali@rizvilaw.pk",           ownerPhone: "0300-7890123", plan: "Business",     users: 11, cases: 297, status: "Suspended", joined: "13 May 2025", city: "Hyderabad",  address: "Latifabad, Hyderabad",                           billing: "Monthly", amount: 8999,   nextBilling: "—",            paymentMethod: "JazzCash",      autoRenew: false, storageGb: 5.0,  storageCap: 50,  usersCap: 25,  documents: 611  },
  { id: "9",  name: "Al-Haq Legal",              ownerName: "Adv. Muneeb Ahmed",     ownerEmail: "muneeb@alhaqlegal.pk",      ownerPhone: "0300-8901234", plan: "Basic",        users: 4,  cases: 53,  status: "Active",    joined: "12 May 2025", city: "Sialkot",    address: "Cantt, Sialkot",                                 billing: "Monthly", amount: 2999,   nextBilling: "12 June 2025", paymentMethod: "Easypaisa",     autoRenew: true,  storageGb: 0.6,  storageCap: 10,  usersCap: 8,   documents: 78   },
  { id: "10", name: "Mehmood & Co.",             ownerName: "Adv. Waseem Mehmood",   ownerEmail: "waseem@mehmoodco.pk",       ownerPhone: "0300-9012345", plan: "Professional", users: 7,  cases: 142, status: "Trial",     joined: "11 May 2025", city: "Quetta",     address: "Jinnah Town, Quetta",                            billing: "Monthly", amount: 0,      nextBilling: "25 May 2025",  paymentMethod: "—",             autoRenew: false, storageGb: 1.8,  storageCap: 50,  usersCap: 20,  documents: 205  },
];

export const PLAN_BADGE: Record<Plan, string> = {
  Professional: "bg-blue-100 text-blue-700",
  Business:     "bg-emerald-100 text-emerald-700",
  Enterprise:   "bg-violet-100 text-violet-700",
  Basic:        "bg-amber-100 text-amber-700",
};
export const STATUS_BADGE: Record<Status, string> = {
  Active:    "bg-emerald-100 text-emerald-700",
  Trial:     "bg-amber-100 text-amber-700",
  Inactive:  "bg-rose-100 text-rose-700",
  Suspended: "bg-rose-100 text-rose-700",
};

function FirmsPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      FIRMS.filter(
        (f) =>
          !query ||
          f.name.toLowerCase().includes(query.toLowerCase()) ||
          f.ownerName.toLowerCase().includes(query.toLowerCase()) ||
          f.ownerEmail.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <AdminShell
      active="firms"
      title="Firms Management"
      subtitle="View and manage all registered law firms on the platform."
      headerRight={
        <div className="hidden items-center gap-2 rounded-full border border-[#14213D]/15 bg-white px-3 py-2 text-xs font-medium text-[#14213D] md:inline-flex">
          <Calendar className="h-3.5 w-3.5" /> 21 May 2025
        </div>
      }
    >
      <section className="rounded-2xl border border-[#14213D]/10 bg-white p-5">
        {/* Header */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-[#14213D]" style={{ fontFamily: "'Libre Baskerville', serif" }}>
            All Firms <span className="text-[#1F1F1F]/50">({FIRMS.length.toLocaleString()})</span>
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[220px] flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1F1F1F]/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search firm name, owner, email…"
                className="w-full rounded-full border border-[#14213D]/15 bg-[#F5F0E6]/40 py-2.5 pl-9 pr-4 text-sm outline-none placeholder:text-[#1F1F1F]/40 focus:border-[#B8860B]"
              />
            </div>
            <button className="inline-flex items-center gap-2 rounded-md border border-[#14213D]/15 bg-white px-3 py-2 text-xs font-semibold text-[#14213D] transition-colors hover:border-[#B8860B] hover:text-[#B8860B]">
              <Filter className="h-3.5 w-3.5" /> Filter
            </button>
            <button onClick={() => {
              exportToCSV(filtered, "firms", [
                { key: "name", label: "Firm Name" },
                { key: "ownerName", label: "Owner" },
                { key: "ownerEmail", label: "Email" },
                { key: "ownerPhone", label: "Phone" },
                { key: "users", label: "Users" },
                { key: "cases", label: "Cases" },
                { key: "storageGb", label: "Storage" },
                { key: "plan", label: "Plan" },
                { key: "status", label: "Status" },
              ]);
              toast.success("Exported firms to CSV");
            }} className="inline-flex items-center gap-2 rounded-md border border-[#14213D]/15 bg-white px-3 py-2 text-xs font-semibold text-[#14213D] transition-colors hover:border-[#B8860B] hover:text-[#B8860B]">
              <Download className="h-3.5 w-3.5" /> Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] font-medium text-[#1F1F1F]/50">
                <th className="pb-3">Firm Name</th>
                <th className="pb-3">Owner</th>
                <th className="pb-3">Plan</th>
                <th className="pb-3">Users</th>
                <th className="pb-3">Cases</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">City</th>
                <th className="pb-3">Joined Date</th>
                <th className="pb-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((f) => (
                <tr
                  key={f.id}
                  onClick={() => navigate({ to: "/firm-detail/$firmId", params: { firmId: f.id } })}
                  className="cursor-pointer border-t border-[#14213D]/5 transition-colors hover:bg-[#F5F0E6]/50"
                >
                  <td className="py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F5F0E6] text-xs font-semibold text-[#14213D]">
                        {f.name[0]}
                      </div>
                      <span className="font-medium text-[#14213D]">{f.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5">
                    <div className="leading-tight">
                      <div className="text-[13px] font-medium text-[#14213D]">{f.ownerName}</div>
                      <div className="text-[11px] text-[#1F1F1F]/50">{f.ownerEmail}</div>
                    </div>
                  </td>
                  <td className="py-3.5">
                    <span className={`rounded-md px-2.5 py-1 text-[11px] font-semibold ${PLAN_BADGE[f.plan]}`}>{f.plan}</span>
                  </td>
                  <td className="py-3.5 text-[13px] text-[#1F1F1F]/80">{f.users}</td>
                  <td className="py-3.5 text-[13px] text-[#1F1F1F]/80">{f.cases}</td>
                  <td className="py-3.5">
                    <span className={`rounded-md px-2.5 py-1 text-[11px] font-semibold ${STATUS_BADGE[f.status]}`}>{f.status}</span>
                  </td>
                  <td className="py-3.5 text-[13px] text-[#1F1F1F]/70">{f.city}</td>
                  <td className="py-3.5 text-[13px] text-[#1F1F1F]/70">{f.joined}</td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate({ to: "/firm-detail/$firmId", params: { firmId: f.id } });
                      }}
                      className="inline-flex items-center gap-1.5 rounded-md border border-[#14213D]/15 bg-white px-2.5 py-1 text-[11px] font-semibold text-[#14213D] transition-colors hover:border-[#B8860B] hover:text-[#B8860B]"
                    >
                      <Eye className="h-3.5 w-3.5" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#1F1F1F]/60">
          <span>Showing 1 to {filtered.length} of 1,248 firms</span>
          <div className="flex items-center gap-1">
            <PagerBtn><ChevronLeft className="h-3 w-3" /></PagerBtn>
            <PagerBtn active>1</PagerBtn>
            <PagerBtn>2</PagerBtn>
            <PagerBtn>3</PagerBtn>
            <span className="px-1">…</span>
            <PagerBtn>125</PagerBtn>
            <PagerBtn><ChevronRight className="h-3 w-3" /></PagerBtn>
            <select className="ml-2 rounded-md border border-[#14213D]/15 bg-white px-2 py-1 text-xs">
              <option>10 / page</option>
              <option>25 / page</option>
              <option>50 / page</option>
            </select>
          </div>
        </div>
      </section>
    </AdminShell>
  );
}

function PagerBtn({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <button className={`inline-flex h-7 min-w-7 items-center justify-center rounded-md px-2 text-xs font-medium transition-colors ${active ? "bg-[#14213D] text-[#F5F0E6]" : "border border-[#14213D]/15 bg-white text-[#14213D] hover:border-[#B8860B]"}`}>
      {children}
    </button>
  );
}