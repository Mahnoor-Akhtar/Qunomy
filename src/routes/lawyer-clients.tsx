import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import LawyerShell from "../components/dashboard/LawyerShell";
import { 
  Search, 
  Filter, 
  RotateCcw, 
  LayoutGrid, 
  List, 
  Download, 
  Plus, 
  Upload, 
  Eye, 
  Edit, 
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export const Route = createFileRoute("/lawyer-clients")({
  component: LawyerClients,
});

const MOCK_CLIENTS = [
  {
    id: 1,
    name: "Muhammad Ahmad",
    type: "Individual",
    cnic: "35202-1234567-1",
    phone: "0300-1234567",
    email: "ahmad@gmail.com",
    city: "Lahore",
    cases: 5,
    outstanding: "PKR 85,000",
    portal: true,
    status: "Active"
  },
  {
    id: 2,
    name: "ABC Corporation (Pvt) Ltd.",
    type: "Company",
    cnic: "N/A",
    phone: "042-1112345",
    email: "abc.corp@gmail.com",
    city: "Lahore",
    cases: 8,
    outstanding: "PKR 250,000",
    portal: true,
    status: "Active"
  },
  {
    id: 3,
    name: "Zainab Khan",
    type: "Individual",
    cnic: "33100-7654321-0",
    phone: "0321-7654321",
    email: "zainab.khan@gmail.com",
    city: "Karachi",
    cases: 2,
    outstanding: "PKR 0",
    portal: false,
    status: "Active"
  },
  {
    id: 4,
    name: "Ali Raza",
    type: "Individual",
    cnic: "35201-9876543-5",
    phone: "0301-9876543",
    email: "ali.raza@gmail.com",
    city: "Islamabad",
    cases: 3,
    outstanding: "PKR 35,000",
    portal: true,
    status: "Active"
  },
  {
    id: 5,
    name: "Pakistan Builders",
    type: "Company",
    cnic: "N/A",
    phone: "021-3456789",
    email: "info@pakbuilders.com",
    city: "Karachi",
    cases: 6,
    outstanding: "PKR 120,000",
    portal: false,
    status: "Inactive"
  }
];

function LawyerClients() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("qanomy_user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);
  const isMember = user?.email === "ijaz@gmail.com";
  // Simulate permissions for members
  const canAddClients = !isMember; // change to true to simulate permission granted

  const displayClients = isMember ? MOCK_CLIENTS.slice(0, 2) : MOCK_CLIENTS;

  return (
    <LawyerShell active="clients">
      <div className="flex flex-col gap-4 max-w-[1400px] mx-auto h-full">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
          <div>
            <h1 className="text-[28px] font-bold text-[#14213D] leading-tight" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              Clients
            </h1>
            <div className="text-[12px] text-[#1F1F1F]/60 mt-1 font-medium flex items-center gap-1.5">
              <span className="hover:text-[#14213D] cursor-pointer transition">Dashboard</span>
              <span>›</span>
              <span className="text-[#14213D]">Clients</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {!isMember && (
              <button className="h-9 px-4 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-sm transition-colors">
                <Upload className="h-4 w-4" />
                Import Clients (Excel)
              </button>
            )}
            {(!isMember || canAddClients) && (
              <Link to="/lawyer-clients-new" className="h-9 px-4 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-sm transition-colors">
                <Plus className="h-4 w-4" />
                Add New Client
              </Link>
            )}
          </div>
        </div>

        {/* Toolbar & Filters */}
        <div className="flex flex-wrap items-center gap-3 bg-white border border-[#14213D]/10 rounded-xl p-3 shadow-sm">
          
             <div className="relative flex-1 min-w-[200px] max-w-md">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <Search className="h-4 w-4 text-[#1F1F1F]/40" />
               </div>
               <input 
                 type="text" 
                 placeholder="Search by client name, CNIC, phone, email..." 
                 className="block w-full pl-9 pr-3 h-9 bg-gray-50 border border-[#14213D]/10 rounded-lg text-[12px] font-medium text-[#14213D] placeholder-[#1F1F1F]/40 focus:outline-none focus:border-emerald-500 transition-colors"
               />
             </div>

             <div className="relative w-[130px]">
               <select className="h-9 w-full pl-3 pr-8 appearance-none bg-gray-50 border border-[#14213D]/10 rounded-lg text-[12px] font-bold text-[#14213D] hover:bg-white cursor-pointer focus:outline-none focus:border-emerald-500 transition-colors">
                 <option>All Status</option>
                 <option>Active</option>
                 <option>Inactive</option>
               </select>
               <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#1F1F1F]/50">
                 <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
               </div>
             </div>
             
             <div className="relative w-[150px]">
               <select className="h-9 w-full pl-3 pr-8 appearance-none bg-gray-50 border border-[#14213D]/10 rounded-lg text-[12px] font-bold text-[#14213D] hover:bg-white cursor-pointer focus:outline-none focus:border-emerald-500 transition-colors">
                 <option>All Client Types</option>
                 <option>Individual</option>
                 <option>Company</option>
               </select>
               <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#1F1F1F]/50">
                 <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
               </div>
             </div>

             <div className="relative w-[140px]">
               <select className="h-9 w-full pl-3 pr-8 appearance-none bg-gray-50 border border-[#14213D]/10 rounded-lg text-[12px] font-bold text-[#14213D] hover:bg-white cursor-pointer focus:outline-none focus:border-emerald-500 transition-colors">
                 <option>All Cities</option>
                 <option>Lahore</option>
                 <option>Karachi</option>
                 <option>Islamabad</option>
               </select>
               <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#1F1F1F]/50">
                 <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
               </div>
             </div>

             <button className="h-9 px-3 flex items-center gap-1.5 border border-[#14213D]/10 rounded-lg text-[12px] font-bold text-[#1F1F1F]/70 bg-white hover:bg-gray-50 transition-colors shadow-sm">
               <Filter className="h-3.5 w-3.5" /> More Filters
             </button>

             <button className="h-9 px-3 flex items-center gap-1.5 rounded-lg text-[12px] font-bold text-[#1F1F1F]/60 hover:text-[#14213D] hover:bg-gray-100 transition-colors">
               <RotateCcw className="h-3.5 w-3.5" /> Reset
             </button>

            <div className="flex items-center bg-gray-50 border border-[#14213D]/10 rounded-lg p-0.5 shadow-sm ml-auto">
              <button 
                onClick={() => setViewMode("grid")}
                className={`h-8 w-8 flex items-center justify-center rounded-md transition-colors ${viewMode === "grid" ? "bg-white shadow-sm text-[#14213D]" : "text-[#1F1F1F]/40 hover:text-[#1F1F1F]/70"}`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`h-8 w-8 flex items-center justify-center rounded-md transition-colors ${viewMode === "list" ? "bg-white shadow-sm text-[#14213D]" : "text-[#1F1F1F]/40 hover:text-[#1F1F1F]/70"}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
            {!isMember && (
              <button className="h-9 w-9 flex items-center justify-center border border-[#14213D]/10 rounded-lg text-[#1F1F1F]/60 bg-white hover:bg-gray-50 hover:text-[#14213D] transition-colors shadow-sm" title="Export">
                <Download className="h-4 w-4" />
              </button>
            )}
        </div>

        {/* Data Table */}
        <div className="bg-white border border-[#14213D]/10 rounded-xl shadow-sm overflow-hidden flex flex-col flex-1">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#14213D]/10 bg-gray-50/50">
                  <th className="px-2 py-2 text-[9px] font-bold text-[#14213D] uppercase w-12">#</th>
                  <th className="px-2 py-2 text-[9px] font-bold text-[#14213D] uppercase">Client Name</th>
                  <th className="px-2 py-2 text-[9px] font-bold text-[#14213D] uppercase">CNIC</th>
                  <th className="px-2 py-2 text-[9px] font-bold text-[#14213D] uppercase">Phone / WhatsApp</th>
                  <th className="px-2 py-2 text-[9px] font-bold text-[#14213D] uppercase">Email</th>
                  <th className="px-2 py-2 text-[9px] font-bold text-[#14213D] uppercase">City</th>
                  <th className="px-2 py-2 text-[9px] font-bold text-[#14213D] uppercase text-center">Client Type</th>
                  <th className="px-2 py-2 text-[9px] font-bold text-[#14213D] uppercase text-center">Total Cases</th>
                  <th className="px-2 py-2 text-[9px] font-bold text-[#14213D] uppercase text-right">Outstanding</th>
                  <th className="px-2 py-2 text-[9px] font-bold text-[#14213D] uppercase text-center">Portal Access</th>
                  <th className="px-2 py-2 text-[9px] font-bold text-[#14213D] uppercase text-center">Status</th>
                  <th className="px-2 py-2 text-[9px] font-bold text-[#14213D] uppercase text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayClients.map((client) => (
                  <tr key={client.id} className="border-b border-[#14213D]/5 hover:bg-gray-50/50 transition-colors group">
                    <td className="px-2 py-2 text-[10px] font-medium text-[#1F1F1F]/60">
                      {client.id}
                    </td>
                    <td className="px-2 py-2">
                      <Link to={`/lawyer-client-detail/${client.id}` as any} className="text-[10px] font-bold text-[#14213D] hover:text-[#B8860B] transition-colors block leading-tight">
                        {client.name}
                      </Link>
                      <span className="text-[9px] text-[#1F1F1F]/50 font-medium">{client.type}</span>
                    </td>
                    <td className="px-2 py-2 text-[10px] font-medium text-[#1F1F1F]/80">
                      {client.cnic}
                    </td>
                    <td className="px-2 py-2">
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#1F1F1F]/80">
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-emerald-600 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                        {client.phone}
                      </div>
                    </td>
                    <td className="px-2 py-2 text-[10px] font-medium text-[#1F1F1F]/80">
                      {client.email}
                    </td>
                    <td className="px-2 py-2 text-[10px] font-medium text-[#1F1F1F]/80">
                      {client.city}
                    </td>
                    <td className="px-2 py-2 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold ${
                        client.type === 'Individual' 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                          : 'bg-blue-50 text-blue-600 border border-blue-100'
                      }`}>
                        {client.type}
                      </span>
                    </td>
                    <td className="px-2 py-2 text-[10px] font-bold text-[#14213D] text-center">
                      {client.cases}
                    </td>
                    <td className={`px-2 py-2 text-[10px] font-bold text-right ${client.outstanding === "PKR 0" ? "text-emerald-600" : "text-rose-600"}`}>
                      {client.outstanding}
                    </td>
                    <td className="px-2 py-2 text-center">
                      <div className="flex justify-center">
                        <button className={`w-9 h-5 rounded-full relative transition-colors ${client.portal ? "bg-emerald-500" : "bg-gray-200"}`}>
                          <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${client.portal ? "left-[18px]" : "left-0.5"}`}></div>
                        </button>
                      </div>
                    </td>
                    <td className="px-2 py-2 text-center">
                      {client.status === "Active" ? (
                        <span className="text-[10px] font-bold text-emerald-600">Active</span>
                      ) : (
                        <span className="text-[10px] font-bold text-[#1F1F1F]/40 bg-gray-100 px-2 py-0.5 rounded">Inactive</span>
                      )}
                    </td>
                    <td className="px-2 py-2 text-center">
                      <div className="flex justify-center items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link to={`/lawyer-client-detail/${client.id}` as any} className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#1F1F1F]/50 hover:text-[#14213D] transition-colors">
                          <Eye className="h-3.5 w-3.5" />
                        </Link>
                        <button className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#1F1F1F]/50 hover:text-[#14213D] transition-colors">
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#1F1F1F]/50 hover:text-[#14213D] transition-colors">
                          <MoreVertical className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="mt-auto px-6 py-4 border-t border-[#14213D]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] font-medium text-[#1F1F1F]/60">
            <div>
              Showing 1 to 5 of 58 clients
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <button className="h-7 w-7 flex items-center justify-center rounded hover:bg-gray-100 transition"><ChevronLeft className="h-4 w-4" /></button>
                <button className="h-7 w-7 flex items-center justify-center rounded bg-emerald-600 text-white font-bold shadow-sm">1</button>
                <button className="h-7 w-7 flex items-center justify-center rounded hover:bg-gray-100 transition hover:text-[#14213D]">2</button>
                <button className="h-7 w-7 flex items-center justify-center rounded hover:bg-gray-100 transition hover:text-[#14213D]">3</button>
                <button className="h-7 w-7 flex items-center justify-center rounded hover:bg-gray-100 transition hover:text-[#14213D]">4</button>
                <button className="h-7 w-7 flex items-center justify-center rounded hover:bg-gray-100 transition hover:text-[#14213D]">5</button>
                <span className="px-1 text-[#1F1F1F]/40">...</span>
                <button className="h-7 w-7 flex items-center justify-center rounded hover:bg-gray-100 transition hover:text-[#14213D]">12</button>
                <button className="h-7 w-7 flex items-center justify-center rounded hover:bg-gray-100 transition"><ChevronRight className="h-4 w-4" /></button>
              </div>

              <div className="flex items-center gap-2 border-l border-[#14213D]/10 pl-6">
                <span>Rows per page:</span>
                <div className="relative w-16">
                  <select className="h-8 w-full pl-2 pr-6 appearance-none bg-white border border-[#14213D]/10 rounded-lg text-[12px] font-bold text-[#14213D] focus:outline-none focus:border-emerald-500 transition-colors">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#1F1F1F]/50">
                    <svg width="8" height="5" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </LawyerShell>
  );
}
