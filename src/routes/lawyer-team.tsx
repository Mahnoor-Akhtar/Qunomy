import { createFileRoute } from "@tanstack/react-router";
import LawyerShell from "../components/dashboard/LawyerShell";
import { 
  Search, Filter, Download, LayoutList, Grid, Eye, Edit2, 
  MoreVertical, X, Upload, Check, Bell, User, Briefcase, 
  FileText, Settings, CreditCard, BarChart2, Plus, 
  UserCheck, UserX, Users, Scale
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/lawyer-team")({
  component: TeamPage,
});

const MOCK_TEAM_MEMBERS = [
  { id: 1, name: "Muhammad Aslam", initials: "MA", role: "Lawyer", roleColor: "emerald", subtitle: "Senior Lawyer", email: "aslam@noorlaw.pk", phone: "0300-1234567", status: "Active", assignedCases: 24, joinedOn: "12 Jan 2024" },
  { id: 2, name: "Saad Iqbal", initials: "SJ", role: "Lawyer", roleColor: "emerald", subtitle: "Associate Lawyer", email: "saad.iqbal@noorlaw.pk", phone: "0321-7654321", status: "Active", assignedCases: 16, joinedOn: "25 Mar 2024" },
  { id: 3, name: "Farah Naz", initials: "FN", role: "Lawyer", roleColor: "emerald", subtitle: "Lawyer", email: "farah.naz@noorlaw.pk", phone: "0308-9876543", status: "Active", assignedCases: 14, joinedOn: "10 Feb 2024" },
  { id: 4, name: "Aqsa Malik", initials: "AK", role: "Clerk", roleColor: "blue", subtitle: "Clerk", email: "aqsa.malik@noorlaw.pk", phone: "0310-1112233", status: "Active", assignedCases: null, joinedOn: "05 May 2024" },
  { id: 5, name: "Imran Raza", initials: "IR", role: "Clerk", roleColor: "blue", subtitle: "Case Clerk", email: "imran.raza@noorlaw.pk", phone: "0309-3344556", status: "Active", assignedCases: null, joinedOn: "20 Apr 2024" },
  { id: 6, name: "Taha Mehmood", initials: "TM", role: "Admin", roleColor: "purple", subtitle: "Admin Manager", email: "taha.mehmood@noorlaw.pk", phone: "0333-5566778", status: "Active", assignedCases: null, joinedOn: "01 Jan 2024" }
];

const MOCK_ASSIGN_CASES = [
  { id: 1, title: "ABC Corp vs XYZ Bank", no: "CS 456/2023", court: "Banking Court, Lahore", nextHearing: "28 May 2025", status: "Pending", selected: true },
  { id: 2, title: "Muhammad Ahmad vs State", no: "CC 123/2024", court: "Sessions Court, Lahore", nextHearing: "22 May 2025", status: "Pending", selected: true },
  { id: 3, title: "Fatima Bibi vs Asif Khan", no: "FC 789/2024", court: "Family Court, Lahore", nextHearing: "24 May 2025", status: "Adjourned", selected: false },
  { id: 4, title: "The State vs Imran Ali", no: "FIR 987/2024", court: "Anti Terrorism Court", nextHearing: "29 May 2025", status: "Pending", selected: false },
  { id: 5, title: "Zainab Khan vs Waseem Khan", no: "Family 101/2024", court: "Family Court, Lahore", nextHearing: "30 May 2025", status: "Pending", selected: false },
];

function TeamPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<typeof MOCK_TEAM_MEMBERS[0] | null>(null);

  const openEditRole = (member: typeof MOCK_TEAM_MEMBERS[0]) => {
    setSelectedMember(member);
    setIsEditRoleModalOpen(true);
  };

  const openAssignCases = (member: typeof MOCK_TEAM_MEMBERS[0]) => {
    setSelectedMember(member);
    setIsAssignModalOpen(true);
  };

  return (
    <LawyerShell active="team" title="Team Members" subtitle="Dashboard > Team">
      
      {/* Top Header Actions (Simulated inside the page area since shell controls the actual top bar) */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-[#14213D]">Team Members</h1>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500 text-emerald-600 font-bold text-[12px] hover:bg-emerald-50 transition-colors shadow-sm bg-white">
             <span className="h-5 w-5 bg-emerald-100 rounded-full flex items-center justify-center">
               <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 21.054c-1.854 0-3.668-.501-5.265-1.448l-5.85 1.536 1.564-5.702c-1.037-1.636-1.583-3.523-1.583-5.466 0-5.498 4.475-9.972 9.973-9.972 5.499 0 9.973 4.474 9.973 9.972 0 5.498-4.474 9.972-9.973 9.972m5.753-7.531c-.316-.158-1.868-.921-2.158-1.026-.289-.105-.5-.158-.711.158-.21.316-.816 1.026-.999 1.237-.184.21-.368.237-.684.079-.316-.158-1.332-.491-2.538-1.566-.938-.838-1.571-1.874-1.755-2.19-.184-.316-.02-.487.138-.645.143-.143.316-.368.474-.552.158-.184.21-.316.316-.526.105-.21.053-.395-.026-.552-.079-.158-.711-1.711-.974-2.343-.255-.615-.515-.532-.711-.542-.184-.01-.395-.01-.605-.01s-.552.079-.842.395c-.289.316-1.105 1.079-1.105 2.632 0 1.553 1.131 3.053 1.289 3.264.158.21 2.228 3.4 5.394 4.757 3.167 1.358 3.167.905 3.746.853.579-.053 1.868-.763 2.131-1.5.263-.737.263-1.368.184-1.5-.079-.131-.289-.21-.605-.368z"/></svg>
             </span> 
             WhatsApp Reminders
           </button>
           <button className="relative h-9 w-9 flex items-center justify-center rounded-full bg-white border border-[#14213D]/10 text-[#14213D] hover:bg-gray-50 transition-colors shadow-sm">
             <Bell className="h-4 w-4" />
             <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[8px] text-white font-bold">5</span>
           </button>
           
           <div className="h-9 px-3 flex items-center gap-2 rounded-full bg-white border border-[#14213D]/10 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
              <Scale className="h-4 w-4 text-[#B8860B]" />
              <span className="text-[12px] font-bold text-[#14213D]" style={{ fontFamily: "'Libre Baskerville', serif" }}>Qanomy</span>
              <div className="h-3 w-[1px] bg-[#14213D]/10 mx-1"></div>
              <svg className="w-3 h-3 text-[#1F1F1F]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
           </div>
           
           <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold rounded-lg transition-colors shadow-sm ml-2"
           >
             <Plus className="h-4 w-4" /> Add New Member
           </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl border border-[#14213D]/10 shadow-sm flex items-center gap-4 hover:border-emerald-200 transition-colors">
          <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <User className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#1F1F1F]/60">Total Members</div>
            <div className="text-[20px] font-bold text-[#14213D] leading-none mt-1">18</div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#14213D]/10 shadow-sm flex items-center gap-4 hover:border-blue-200 transition-colors">
          <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Briefcase className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#1F1F1F]/60">Lawyers</div>
            <div className="text-[20px] font-bold text-[#14213D] leading-none mt-1">7</div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#14213D]/10 shadow-sm flex items-center gap-4 hover:border-purple-200 transition-colors">
          <div className="h-10 w-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#1F1F1F]/60">Clerks</div>
            <div className="text-[20px] font-bold text-[#14213D] leading-none mt-1">8</div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#14213D]/10 shadow-sm flex items-center gap-4 hover:border-orange-200 transition-colors">
          <div className="h-10 w-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <User className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#1F1F1F]/60">Read-only Users</div>
            <div className="text-[20px] font-bold text-[#14213D] leading-none mt-1">3</div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#14213D]/10 shadow-sm flex items-center gap-4 hover:border-emerald-200 transition-colors">
          <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <UserCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#1F1F1F]/60">Active</div>
            <div className="text-[20px] font-bold text-[#14213D] leading-none mt-1">16</div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#14213D]/10 shadow-sm flex items-center gap-4 hover:border-red-200 transition-colors">
          <div className="h-10 w-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <UserX className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#1F1F1F]/60">Inactive</div>
            <div className="text-[20px] font-bold text-[#14213D] leading-none mt-1">2</div>
          </div>
        </div>
      </div>

      {/* Toolbar & Table Area */}
      <div className="bg-white rounded-xl border border-[#14213D]/10 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        <div className="p-4 border-b border-[#14213D]/10 flex flex-wrap gap-4 items-center justify-between bg-white">
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto flex-1">
             <div className="relative w-full sm:w-auto flex-1 max-w-[320px] min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F1F1F]/40" />
                <input 
                  type="text" 
                  placeholder="Search by name, email, phone..."
                  className="w-full h-10 pl-9 pr-3 text-[12px] bg-white border border-[#14213D]/15 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors font-medium"
                />
             </div>
             
             <div className="flex items-center gap-3">
               <div className="relative">
                 <select className="appearance-none h-10 pl-4 pr-9 bg-white border border-[#14213D]/15 rounded-lg text-[12px] font-bold text-[#14213D] focus:outline-none focus:border-emerald-500 w-[140px] shadow-sm">
                   <option>All Roles</option>
                   <option>Lawyer</option>
                   <option>Clerk</option>
                   <option>Admin</option>
                 </select>
                 <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1F1F1F]/40 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
               </div>
               
               <div className="relative">
                 <select className="appearance-none h-10 pl-4 pr-9 bg-white border border-[#14213D]/15 rounded-lg text-[12px] font-bold text-[#14213D] focus:outline-none focus:border-emerald-500 w-[140px] shadow-sm">
                   <option>All Status</option>
                   <option>Active</option>
                   <option>Inactive</option>
                 </select>
                 <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1F1F1F]/40 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
               </div>
               
               <button className="h-10 px-4 flex items-center gap-2 bg-white border border-[#14213D]/15 rounded-lg text-[12px] font-bold text-[#14213D] hover:bg-gray-50 transition-colors shadow-sm">
                 <Filter className="h-4 w-4 text-[#1F1F1F]/50" /> More Filters
               </button>
             </div>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
             <button className="h-10 px-4 flex items-center gap-2 bg-white border border-[#14213D]/15 rounded-lg text-[12px] font-bold text-[#14213D] hover:bg-gray-50 transition-colors shadow-sm whitespace-nowrap">
               <Download className="h-4 w-4 text-[#1F1F1F]/50" /> Export
             </button>
             <div className="flex items-center bg-gray-100 rounded-lg p-1 border border-[#14213D]/10 shrink-0">
               <button className="p-1.5 bg-white rounded shadow-sm text-[#14213D]">
                 <LayoutList className="h-4 w-4" />
               </button>
               <button className="p-1.5 text-[#1F1F1F]/40 hover:text-[#14213D] transition-colors">
                 <Grid className="h-4 w-4" />
               </button>
             </div>
          </div>
        </div>

        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#14213D]/10 bg-white">
                <th className="px-2 py-3 text-[10px] font-bold text-[#14213D] w-8 text-center uppercase tracking-wide">#</th>
                <th className="px-2 py-3 text-[10px] font-bold text-[#14213D] uppercase tracking-wide">Name</th>
                <th className="px-2 py-3 text-[10px] font-bold text-[#14213D] uppercase tracking-wide">Role</th>
                <th className="px-2 py-3 text-[10px] font-bold text-[#14213D] uppercase tracking-wide">Email</th>
                <th className="px-2 py-3 text-[10px] font-bold text-[#14213D] uppercase tracking-wide">Phone</th>
                <th className="px-2 py-3 text-[10px] font-bold text-[#14213D] uppercase tracking-wide">Status</th>
                <th className="px-2 py-3 text-[10px] font-bold text-[#14213D] text-center uppercase tracking-wide">Assigned Cases</th>
                <th className="px-2 py-3 text-[10px] font-bold text-[#14213D] uppercase tracking-wide">Joined On</th>
                <th className="px-2 py-3 text-[10px] font-bold text-[#14213D] text-center uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_TEAM_MEMBERS.map((member, idx) => (
                <tr key={member.id} className="border-b border-[#14213D]/5 hover:bg-gray-50/50 transition-colors group">
                  <td className="px-2 py-3 text-[11px] text-[#1F1F1F]/50 text-center font-bold">{idx + 1}</td>
                  <td className="px-2 py-3 min-w-[140px]">
                    <div className="flex items-center gap-2">
                       <div className={`h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                         member.roleColor === 'emerald' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                         member.roleColor === 'blue' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                         'bg-purple-50 text-purple-600 border border-purple-100'
                       }`}>
                         {member.initials}
                       </div>
                       <div className="min-w-0 flex-1">
                         <div className="text-[12px] font-bold text-[#14213D] truncate">{member.name}</div>
                         <div className="text-[10px] text-[#1F1F1F]/50 font-medium mt-0.5 truncate">{member.subtitle}</div>
                       </div>
                    </div>
                  </td>
                  <td className="px-2 py-3">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded whitespace-nowrap ${
                       member.roleColor === 'emerald' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                       member.roleColor === 'blue' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                       'bg-purple-50 text-purple-600 border border-purple-100'
                     }`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="px-2 py-3 text-[11px] font-medium text-[#1F1F1F]/70 break-all min-w-[120px]">{member.email}</td>
                  <td className="px-2 py-3 text-[11px] font-medium text-[#1F1F1F]/70 w-20 break-words">{member.phone}</td>
                  <td className="px-2 py-3">
                    <span className={`text-[10px] font-bold ${member.status === 'Active' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-2 py-3 text-center text-[12px] font-bold text-[#14213D]">
                    {member.assignedCases !== null ? member.assignedCases : "-"}
                  </td>
                  <td className="px-2 py-3 text-[11px] font-medium text-[#1F1F1F]/70 whitespace-nowrap">{member.joinedOn}</td>
                  <td className="px-2 py-3">
                    <div className="flex items-center justify-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button className="h-7 w-7 flex items-center justify-center rounded hover:bg-white border border-transparent hover:border-[#14213D]/10 text-[#1F1F1F]/50 hover:text-[#14213D] transition-all shadow-sm shrink-0" title="View Profile">
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button 
                        onClick={() => openEditRole(member)}
                        className="h-7 w-7 flex items-center justify-center rounded hover:bg-white border border-transparent hover:border-[#14213D]/10 text-[#1F1F1F]/50 hover:text-[#14213D] transition-all shadow-sm shrink-0" title="Edit Role & Permissions"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button 
                        onClick={() => member.role === 'Lawyer' ? openAssignCases(member) : undefined}
                        className={`h-7 w-7 flex items-center justify-center rounded border border-transparent transition-all shrink-0 ${member.role === 'Lawyer' ? 'hover:bg-white hover:border-[#14213D]/10 text-[#1F1F1F]/50 hover:text-[#14213D] shadow-sm' : 'opacity-30 cursor-not-allowed text-[#1F1F1F]/50'}`} title="Assign Cases"
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
      </div>

      {/* MODALS */}

      {/* Add New Team Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#14213D]/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[850px] flex flex-col overflow-hidden max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-[#14213D]/10">
              <h2 className="text-[20px] font-bold text-[#14213D]">Add New Team Member</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#1F1F1F]/50 hover:text-[#14213D] transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8">
              <h3 className="text-[15px] font-bold text-[#14213D] mb-6">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-[12px] font-bold text-[#14213D] mb-2">Full Name <span className="text-rose-500">*</span></label>
                    <input type="text" placeholder="Enter full name" className="w-full h-11 px-4 bg-white border border-[#14213D]/15 rounded-lg text-[13px] font-medium focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-[#1F1F1F]/40" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#14213D] mb-2">Email <span className="text-rose-500">*</span></label>
                    <input type="email" placeholder="Enter email address" className="w-full h-11 px-4 bg-white border border-[#14213D]/15 rounded-lg text-[13px] font-medium focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-[#1F1F1F]/40" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#14213D] mb-2">Phone / WhatsApp <span className="text-rose-500">*</span></label>
                    <div className="flex">
                      <div className="relative">
                        <select className="appearance-none h-11 pl-4 pr-8 bg-gray-50 border border-[#14213D]/15 border-r-0 rounded-l-lg text-[13px] font-bold text-emerald-700 focus:outline-none focus:border-emerald-500 w-[110px] cursor-pointer">
                          <option>PK +92</option>
                        </select>
                        <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1F1F1F]/40 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                      <input type="text" placeholder="Enter phone number" className="flex-1 h-11 px-4 bg-white border border-[#14213D]/15 rounded-r-lg text-[13px] font-medium focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-[#1F1F1F]/40" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#14213D] mb-2">Designation</label>
                    <input type="text" placeholder="e.g. Senior Lawyer" className="w-full h-11 px-4 bg-white border border-[#14213D]/15 rounded-lg text-[13px] font-medium focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-[#1F1F1F]/40" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#14213D] mb-2">CNIC (Optional)</label>
                    <div className="border-2 border-dashed border-[#14213D]/15 rounded-xl p-8 flex flex-col items-center justify-center hover:bg-emerald-50/30 hover:border-emerald-300 transition-all cursor-pointer text-center group bg-gray-50/50">
                      <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#14213D]/5 mb-3 group-hover:scale-110 transition-transform">
                        <Upload className="h-5 w-5 text-[#14213D]" />
                      </div>
                      <div className="text-[13px] font-bold text-[#14213D]">Upload Photo</div>
                      <div className="text-[11px] font-medium text-[#1F1F1F]/50 mt-1.5">PNG, JPG (Max 2MB)</div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-[12px] font-bold text-[#14213D] mb-2">Role <span className="text-rose-500">*</span></label>
                    <div className="relative">
                      <select className="appearance-none w-full h-11 pl-4 pr-10 bg-white border border-[#14213D]/15 rounded-lg text-[13px] font-bold text-[#14213D] focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer" defaultValue="">
                        <option value="" disabled>Select Role</option>
                        <option value="Lawyer">Lawyer</option>
                        <option value="Clerk">Clerk</option>
                        <option value="Admin">Admin</option>
                      </select>
                      <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1F1F1F]/40 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#14213D] mb-2">Password <span className="text-rose-500">*</span></label>
                    <div className="relative">
                      <input type="password" placeholder="Enter password" className="w-full h-11 pl-4 pr-10 bg-white border border-[#14213D]/15 rounded-lg text-[13px] font-medium focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-[#1F1F1F]/40" />
                      <Eye className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F1F1F]/40 hover:text-[#14213D] cursor-pointer transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#14213D] mb-2">Confirm Password <span className="text-rose-500">*</span></label>
                    <div className="relative">
                      <input type="password" placeholder="Confirm password" className="w-full h-11 pl-4 pr-10 bg-white border border-[#14213D]/15 rounded-lg text-[13px] font-medium focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-[#1F1F1F]/40" />
                      <Eye className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F1F1F]/40 hover:text-[#14213D] cursor-pointer transition-colors" />
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-blue-50/50 border border-blue-100 rounded-xl p-5 flex gap-4">
                    <div className="h-5 w-5 rounded-full border-2 border-blue-600 flex items-center justify-center text-blue-600 font-bold text-[12px] shrink-0">i</div>
                    <p className="text-[13px] text-blue-800 font-medium leading-relaxed">
                      Login credentials will be sent to the member's email & WhatsApp.
                    </p>
                  </div>
                </div>
              </div>

              {/* Permissions Section */}
              <h3 className="text-[15px] font-bold text-[#14213D] mb-6 mt-8 pt-8 border-t border-[#14213D]/10">Portal Permissions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {/* Permissions Left Column */}
                <div className="space-y-6">
                  <div>
                    <div className="text-[13px] font-bold text-[#14213D] mb-3">Cases</div>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="h-5 w-5 rounded border flex items-center justify-center transition-colors bg-emerald-600 border-emerald-600 shadow-sm">
                          <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-[13px] font-bold text-[#14213D]">View Cases</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="h-5 w-5 rounded border flex items-center justify-center transition-colors bg-emerald-600 border-emerald-600 shadow-sm">
                          <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-[13px] font-bold text-[#14213D]">Add / Edit Cases</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="h-5 w-5 rounded border flex items-center justify-center transition-colors bg-emerald-600 border-emerald-600 shadow-sm">
                          <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-[13px] font-bold text-[#14213D]">Delete Cases</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <div className="text-[13px] font-bold text-[#14213D] mb-3 mt-6">Hearings</div>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="h-5 w-5 rounded border flex items-center justify-center transition-colors bg-emerald-600 border-emerald-600 shadow-sm">
                          <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-[13px] font-bold text-[#14213D]">View Hearings</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="h-5 w-5 rounded border flex items-center justify-center transition-colors bg-emerald-600 border-emerald-600 shadow-sm">
                          <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-[13px] font-bold text-[#14213D]">Add / Edit Hearings</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="h-5 w-5 rounded border flex items-center justify-center transition-colors bg-emerald-600 border-emerald-600 shadow-sm">
                          <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-[13px] font-bold text-[#14213D]">Mark Hearing Done</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Permissions Right Column */}
                <div className="space-y-6">
                  <div>
                    <div className="text-[13px] font-bold text-[#14213D] mb-3">Documents</div>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="h-5 w-5 rounded border flex items-center justify-center transition-colors bg-emerald-600 border-emerald-600 shadow-sm">
                          <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-[13px] font-bold text-[#14213D]">View Documents</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="h-5 w-5 rounded border flex items-center justify-center transition-colors bg-emerald-600 border-emerald-600 shadow-sm">
                          <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-[13px] font-bold text-[#14213D]">Upload Documents</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="h-5 w-5 rounded border flex items-center justify-center transition-colors bg-emerald-600 border-emerald-600 shadow-sm">
                          <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-[13px] font-bold text-[#14213D]">Delete Documents</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <div className="text-[13px] font-bold text-[#14213D] mb-3 mt-6">Billing & Clients</div>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="h-5 w-5 rounded border flex items-center justify-center transition-colors bg-emerald-600 border-emerald-600 shadow-sm">
                          <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-[13px] font-bold text-[#14213D]">View Invoices</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="h-5 w-5 rounded border border-[#14213D]/20 flex items-center justify-center transition-colors bg-white hover:border-[#14213D]/40"></div>
                        <span className="text-[13px] font-medium text-[#1F1F1F]/60">Create Invoices</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="h-5 w-5 rounded border flex items-center justify-center transition-colors bg-emerald-600 border-emerald-600 shadow-sm">
                          <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-[13px] font-bold text-[#14213D]">Add Clients</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="h-5 w-5 rounded border border-[#14213D]/20 flex items-center justify-center transition-colors bg-white hover:border-[#14213D]/40"></div>
                        <span className="text-[13px] font-medium text-[#1F1F1F]/60">Delete Clients</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="p-6 border-t border-[#14213D]/10 flex justify-end gap-3 bg-white">
              <button onClick={() => setIsAddModalOpen(false)} className="px-8 py-2.5 rounded-lg bg-white border border-[#14213D]/15 text-[13px] font-bold text-[#14213D] hover:bg-gray-50 transition-colors shadow-sm">
                Cancel
              </button>
              <button className="px-8 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-[13px] font-bold text-white transition-colors shadow-sm">
                Save Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Role & Permissions Modal */}
      {isEditRoleModalOpen && selectedMember && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#14213D]/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[850px] flex flex-col overflow-hidden max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-[#14213D]/10">
              <h2 className="text-[20px] font-bold text-[#14213D]">Edit Role & Permissions</h2>
              <button onClick={() => setIsEditRoleModalOpen(false)} className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#1F1F1F]/50 hover:text-[#14213D] transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                
                {/* Left Column */}
                <div className="space-y-8">
                  <div>
                    <label className="block text-[13px] font-bold text-[#14213D] mb-2">Role</label>
                    <div className="relative">
                      <select className="appearance-none w-full h-11 pl-4 pr-10 bg-emerald-50/50 border border-emerald-300 rounded-lg text-[14px] font-bold text-emerald-700 focus:outline-none focus:border-emerald-500 cursor-pointer">
                        <option selected>{selectedMember.role}</option>
                      </select>
                      <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-700 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#14213D] mb-2">Role Description</label>
                    <div className="text-[13px] font-medium text-[#1F1F1F]/70 bg-gray-50/80 rounded-xl p-4 border border-[#14213D]/5 leading-relaxed">
                      Lawyers can manage assigned cases, hearings, documents and view reports.
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-[15px] font-bold text-[#14213D] mb-5">Permissions</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="text-[13px] font-bold text-[#14213D] mb-3">Cases</div>
                        <div className="space-y-3">
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="h-5 w-5 rounded border flex items-center justify-center transition-colors bg-emerald-600 border-emerald-600 shadow-sm">
                              <Check className="h-3.5 w-3.5 text-white" />
                            </div>
                            <span className="text-[13px] font-bold text-[#14213D]">View Cases</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="h-5 w-5 rounded border flex items-center justify-center transition-colors bg-emerald-600 border-emerald-600 shadow-sm">
                              <Check className="h-3.5 w-3.5 text-white" />
                            </div>
                            <span className="text-[13px] font-bold text-[#14213D]">Add / Edit Cases</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="h-5 w-5 rounded border border-[#14213D]/20 flex items-center justify-center transition-colors bg-white hover:border-[#14213D]/40"></div>
                            <span className="text-[13px] font-medium text-[#1F1F1F]/60">Delete Cases</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="h-5 w-5 rounded border flex items-center justify-center transition-colors bg-emerald-600 border-emerald-600 shadow-sm">
                              <Check className="h-3.5 w-3.5 text-white" />
                            </div>
                            <span className="text-[13px] font-bold text-[#14213D]">Assign Cases</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <div className="text-[13px] font-bold text-[#14213D] mb-3 mt-6">Hearings</div>
                        <div className="space-y-3">
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="h-5 w-5 rounded border flex items-center justify-center transition-colors bg-emerald-600 border-emerald-600 shadow-sm">
                              <Check className="h-3.5 w-3.5 text-white" />
                            </div>
                            <span className="text-[13px] font-bold text-[#14213D]">View Hearings</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="h-5 w-5 rounded border flex items-center justify-center transition-colors bg-emerald-600 border-emerald-600 shadow-sm">
                              <Check className="h-3.5 w-3.5 text-white" />
                            </div>
                            <span className="text-[13px] font-bold text-[#14213D]">Add / Edit Hearings</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="h-5 w-5 rounded border flex items-center justify-center transition-colors bg-emerald-600 border-emerald-600 shadow-sm">
                              <Check className="h-3.5 w-3.5 text-white" />
                            </div>
                            <span className="text-[13px] font-bold text-[#14213D]">Mark Hearing Done</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6 pt-10">
                  <div>
                    <div className="text-[13px] font-bold text-[#14213D] mb-3">Documents</div>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="h-5 w-5 rounded border flex items-center justify-center transition-colors bg-emerald-600 border-emerald-600 shadow-sm">
                          <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-[13px] font-bold text-[#14213D]">View Documents</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="h-5 w-5 rounded border flex items-center justify-center transition-colors bg-emerald-600 border-emerald-600 shadow-sm">
                          <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-[13px] font-bold text-[#14213D]">Upload Documents</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="h-5 w-5 rounded border border-[#14213D]/20 flex items-center justify-center transition-colors bg-white hover:border-[#14213D]/40"></div>
                        <span className="text-[13px] font-medium text-[#1F1F1F]/60">Delete Documents</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="h-5 w-5 rounded border flex items-center justify-center transition-colors bg-emerald-600 border-emerald-600 shadow-sm">
                          <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-[13px] font-bold text-[#14213D]">Download Documents</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <div className="text-[13px] font-bold text-[#14213D] mb-3 mt-6">Billing & Invoices</div>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="h-5 w-5 rounded border flex items-center justify-center transition-colors bg-emerald-600 border-emerald-600 shadow-sm">
                          <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-[13px] font-bold text-[#14213D]">View Invoices</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="h-5 w-5 rounded border flex items-center justify-center transition-colors bg-emerald-600 border-emerald-600 shadow-sm">
                          <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-[13px] font-bold text-[#14213D]">Create Invoices</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="h-5 w-5 rounded border border-[#14213D]/20 flex items-center justify-center transition-colors bg-white hover:border-[#14213D]/40"></div>
                        <span className="text-[13px] font-medium text-[#1F1F1F]/60">Edit Invoices</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <div className="text-[13px] font-bold text-[#14213D] mb-3 mt-6">Reports</div>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="h-5 w-5 rounded border flex items-center justify-center transition-colors bg-emerald-600 border-emerald-600 shadow-sm">
                          <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-[13px] font-bold text-[#14213D]">View Reports</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="h-5 w-5 rounded border flex items-center justify-center transition-colors bg-emerald-600 border-emerald-600 shadow-sm">
                          <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-[13px] font-bold text-[#14213D]">Export Reports</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <div className="text-[13px] font-bold text-[#14213D] mb-3 mt-6">Settings</div>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="h-5 w-5 rounded border border-[#14213D]/20 flex items-center justify-center transition-colors bg-white hover:border-[#14213D]/40"></div>
                        <span className="text-[13px] font-medium text-[#1F1F1F]/60">Access Settings</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="h-5 w-5 rounded border border-[#14213D]/20 flex items-center justify-center transition-colors bg-white hover:border-[#14213D]/40"></div>
                        <span className="text-[13px] font-medium text-[#1F1F1F]/60">Manage Users</span>
                      </label>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="p-6 border-t border-[#14213D]/10 flex justify-end gap-3 bg-white">
              <button onClick={() => setIsEditRoleModalOpen(false)} className="px-8 py-2.5 rounded-lg bg-white border border-[#14213D]/15 text-[13px] font-bold text-[#14213D] hover:bg-gray-50 transition-colors shadow-sm">
                Cancel
              </button>
              <button className="px-8 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-[13px] font-bold text-white transition-colors shadow-sm">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Cases Modal */}
      {isAssignModalOpen && selectedMember && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#14213D]/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[850px] flex flex-col overflow-hidden max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-[#14213D]/10">
              <h2 className="text-[20px] font-bold text-[#14213D]">Assign Cases to Team Member</h2>
              <button onClick={() => setIsAssignModalOpen(false)} className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#1F1F1F]/50 hover:text-[#14213D] transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 border-b border-[#14213D]/10 bg-white">
               <div className="flex items-center gap-5">
                 <div className={`h-14 w-14 rounded-full flex items-center justify-center text-[18px] font-bold shrink-0 ${
                   selectedMember.roleColor === 'emerald' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                   selectedMember.roleColor === 'blue' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                   'bg-purple-50 text-purple-600 border border-purple-100'
                 }`}>
                   {selectedMember.initials}
                 </div>
                 <div>
                   <div className="flex items-center gap-3 mb-1.5">
                     <h3 className="text-[18px] font-bold text-[#14213D] leading-none">{selectedMember.name}</h3>
                     <span className={`text-[11px] font-bold px-2.5 py-1 rounded leading-none ${
                         selectedMember.roleColor === 'emerald' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                         selectedMember.roleColor === 'blue' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                         'bg-purple-50 text-purple-600 border border-purple-100'
                       }`}>
                        {selectedMember.role}
                      </span>
                   </div>
                   <div className="text-[13px] font-medium text-[#1F1F1F]/60 flex items-center gap-2">
                     <span>{selectedMember.email}</span>
                     <span className="w-1 h-1 rounded-full bg-[#1F1F1F]/30"></span>
                     <span>{selectedMember.phone}</span>
                   </div>
                 </div>
               </div>
            </div>

            <div className="flex border-b border-[#14213D]/10 px-6 bg-gray-50/50">
              <button className="px-5 py-4 text-[13px] font-bold text-emerald-600 border-b-[3px] border-emerald-600 mb-[-1px]">Assign Cases</button>
              <button className="px-5 py-4 text-[13px] font-bold text-[#1F1F1F]/50 hover:text-[#14213D] transition-colors">Current Assignments (16)</button>
            </div>
            
            <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between border-b border-[#14213D]/10 bg-white">
              <div className="flex flex-wrap items-center gap-3 w-full">
                 <div className="relative">
                   <select className="appearance-none h-10 pl-4 pr-10 bg-white border border-[#14213D]/15 rounded-lg text-[13px] font-bold text-[#14213D] focus:outline-none focus:border-emerald-500 w-[150px] shadow-sm cursor-pointer">
                     <option>All Courts</option>
                   </select>
                   <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1F1F1F]/40 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                 </div>
                 
                 <div className="relative">
                   <select className="appearance-none h-10 pl-4 pr-10 bg-white border border-[#14213D]/15 rounded-lg text-[13px] font-bold text-[#14213D] focus:outline-none focus:border-emerald-500 w-[150px] shadow-sm cursor-pointer">
                     <option>All Case Status</option>
                   </select>
                   <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1F1F1F]/40 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                 </div>
                 
                 <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F1F1F]/40" />
                    <input 
                      type="text" 
                      placeholder="Search cases..."
                      className="w-full h-10 pl-9 pr-4 text-[13px] bg-white border border-[#14213D]/15 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors font-medium shadow-sm"
                    />
                 </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto min-h-[350px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#14213D]/10 bg-white sticky top-0 z-10 shadow-sm">
                    <th className="px-6 py-4 w-12 text-center">
                      <div className="h-4 w-4 rounded border border-[#14213D]/20 mx-auto bg-white cursor-pointer hover:border-emerald-500 transition-colors"></div>
                    </th>
                    <th className="px-5 py-4 text-[12px] font-bold text-[#14213D] uppercase tracking-wide">Case Title / Case No.</th>
                    <th className="px-5 py-4 text-[12px] font-bold text-[#14213D] uppercase tracking-wide">Court</th>
                    <th className="px-5 py-4 text-[12px] font-bold text-[#14213D] uppercase tracking-wide">Next Hearing</th>
                    <th className="px-5 py-4 text-[12px] font-bold text-[#14213D] uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_ASSIGN_CASES.map((c) => (
                    <tr key={c.id} className={`border-b border-[#14213D]/5 transition-colors cursor-pointer hover:bg-emerald-50/30 ${c.selected ? 'bg-emerald-50/20' : ''}`}>
                      <td className="px-6 py-4 text-center">
                        <div className={`h-4 w-4 rounded mx-auto flex items-center justify-center transition-colors ${c.selected ? 'bg-emerald-600 border border-emerald-600 shadow-sm' : 'border border-[#14213D]/20 bg-white group-hover:border-emerald-400'}`}>
                          {c.selected && <Check className="h-3 w-3 text-white" />}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-[13px] font-bold text-[#14213D]">{c.title}</div>
                        <div className="text-[12px] text-[#1F1F1F]/50 font-medium mt-1">{c.no}</div>
                      </td>
                      <td className="px-5 py-4 text-[13px] font-medium text-[#1F1F1F]/70">{c.court}</td>
                      <td className="px-5 py-4 text-[13px] font-medium text-[#1F1F1F]/70">{c.nextHearing}</td>
                      <td className="px-5 py-4">
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded ${c.status === 'Pending' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 border-t border-[#14213D]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white">
              <div className="text-[12px] text-[#1F1F1F]/50 font-medium">Selected cases will be visible to this member based on their role permissions.</div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button onClick={() => setIsAssignModalOpen(false)} className="flex-1 sm:flex-none px-8 py-2.5 rounded-lg bg-white border border-[#14213D]/15 text-[13px] font-bold text-[#14213D] hover:bg-gray-50 transition-colors shadow-sm">
                  Cancel
                </button>
                <button className="flex-1 sm:flex-none px-8 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-[13px] font-bold text-white transition-colors shadow-sm whitespace-nowrap">
                  Assign Selected (2)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </LawyerShell>
  );
}
