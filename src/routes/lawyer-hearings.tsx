import { createFileRoute, Link } from "@tanstack/react-router";
import LawyerShell from "@/components/dashboard/LawyerShell";
import {
  Calendar,
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
  Settings,
  FileText,
  Upload,
  Bell,
  Clock,
  ArrowRight,
  X,
  Building,
  Gavel,
  User,
  CheckCircle,
  Download,
  Printer,
  Check
} from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/lawyer-hearings")({
  component: LawyerHearings,
});

function LawyerHearings() {
  const [activeTab, setActiveTab] = useState("week");
  const [openModal, setOpenModal] = useState<"none" | "hearing" | "causelist" | "reminders">("none");
  const [currentTimePos, setCurrentTimePos] = useState(64);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      let pos = 64; // Default to 9 AM line
      if (hours >= 9 && hours <= 16) {
        // Between 9 AM and 4:59 PM
        const hoursPassed = hours - 9;
        pos = 64 + (hoursPassed * 64) + ((minutes / 60) * 64);
      } else if (hours > 16) {
        pos = 64 + (8 * 64); // Cap at 5 PM line
      } else {
        pos = 64; // Cap at 9 AM line
      }
      setCurrentTimePos(pos);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);
  
  const tabs = [
    { id: "calendar", label: "Calendar" },
    { id: "day", label: "Day" },
    { id: "week", label: "Week" },
    { id: "month", label: "Month" },
    { id: "cause-list", label: "Cause List" },
  ];

  return (
    <LawyerShell active="hearings">
      <div className="flex flex-col gap-5 max-w-[1400px] mx-auto h-full pb-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
          <div>
            <h1 className="text-[28px] font-bold text-[#14213D] leading-tight" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              Hearings & Calendar
            </h1>
            <div className="text-[13px] text-[#1F1F1F]/60 mt-1 font-medium">
              Manage hearings, cause lists and reminders efficiently.
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button className="h-9 w-9 flex items-center justify-center bg-white border border-[#14213D]/10 rounded-lg text-[#1F1F1F]/60 hover:text-[#14213D] hover:bg-gray-50 shadow-sm transition">
                <Bell className="h-4.5 w-4.5" />
              </button>
              <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500 border border-white"></div>
            </div>
            
            {/* Import Button */}
            <button className="h-9 px-3 flex items-center gap-2 bg-white border border-[#14213D]/10 rounded-lg text-xs font-bold text-[#14213D] hover:bg-gray-50 shadow-sm transition">
              <Upload className="h-4 w-4 text-[#1F1F1F]/50" />
              <span className="hidden md:inline">Import</span>
            </button>

            {/* Cause List Button */}
            <button onClick={() => setOpenModal("causelist")} className="h-9 px-3 flex items-center gap-2 bg-white border border-[#14213D]/10 rounded-lg text-xs font-bold text-[#14213D] hover:bg-gray-50 shadow-sm transition">
              <FileText className="h-4 w-4 text-[#1F1F1F]/50" />
              <span className="hidden md:inline">Cause List</span>
            </button>
            
            {/* Primary Action: Add Hearing */}
            <button className="h-9 px-4 flex items-center gap-2 bg-[#14213D] hover:bg-[#B8860B] text-white rounded-lg text-xs font-bold shadow-sm transition-colors">
              <Plus className="h-4 w-4" />
              New Hearing
            </button>
          </div>
        </div>

        {/* Toolbar Row 1: Tabs & Date */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          
          {/* Segmented Tabs */}
          <div className="flex items-center p-1 bg-gray-100/80 rounded-lg border border-black/5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-1.5 text-[11px] font-bold rounded-md whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-[#14213D] shadow-sm border border-black/5"
                    : "text-[#1F1F1F]/60 hover:text-[#14213D] hover:bg-black/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Date Navigator */}
          <div className="flex items-center bg-white border border-[#14213D]/10 rounded-lg shadow-sm p-1">
             <button className="h-7 px-2 rounded hover:bg-gray-50 text-[#1F1F1F]/60 transition"><ChevronLeft className="h-4 w-4" /></button>
             <button className="h-7 px-2 rounded hover:bg-gray-50 text-[#1F1F1F]/60 transition"><ChevronRight className="h-4 w-4" /></button>
             <div className="px-4 text-[12px] font-bold text-[#14213D] border-x border-[#14213D]/10 mx-1">May 2025</div>
             <button className="h-7 px-4 text-[11px] font-bold text-[#1F1F1F]/70 hover:bg-gray-50 rounded transition">Today</button>
          </div>
        </div>

        {/* Toolbar Row 2: Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#14213D]/10 rounded-xl px-4 py-3 shadow-sm mb-5">
          <div className="flex items-center flex-wrap gap-3">
             <span className="text-[10px] font-bold text-[#1F1F1F]/40 uppercase tracking-widest hidden sm:block">Filters</span>
             <div className="h-5 w-px bg-[#14213D]/10 hidden sm:block"></div>
             
             {/* Dropdowns */}
             <div className="relative">
               <select className="h-8 pl-3 pr-8 appearance-none bg-gray-50 border border-[#14213D]/10 rounded-lg text-[11px] font-bold text-[#14213D] hover:bg-white cursor-pointer focus:outline-none focus:border-[#B8860B] transition-colors">
                 <option>All Courts</option>
               </select>
               <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#1F1F1F]/50">
                 <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
               </div>
             </div>
             
             <div className="relative">
               <select className="h-8 pl-3 pr-8 appearance-none bg-gray-50 border border-[#14213D]/10 rounded-lg text-[11px] font-bold text-[#14213D] hover:bg-white cursor-pointer focus:outline-none focus:border-[#B8860B] transition-colors">
                 <option>All Lawyers</option>
               </select>
               <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#1F1F1F]/50">
                 <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
               </div>
             </div>

             <button className="h-8 px-3 flex items-center gap-1.5 border border-[#14213D]/10 rounded-lg text-[11px] font-bold text-[#14213D] bg-gray-50 hover:bg-white transition-colors shadow-sm">
               <Filter className="h-3.5 w-3.5" /> Filter
             </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="h-8 px-3 flex items-center gap-1.5 border border-emerald-600/20 rounded-lg text-[11px] font-bold text-emerald-700 bg-emerald-50/50 hover:bg-emerald-100 transition-colors shadow-sm" title="WhatsApp Reminders">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
            <div className="h-5 w-px bg-[#14213D]/10 mx-1 hidden sm:block"></div>
            <button onClick={() => setOpenModal("reminders")} className="h-8 w-8 flex items-center justify-center border border-[#14213D]/10 rounded-lg text-[#1F1F1F]/60 bg-gray-50 hover:bg-white hover:text-[#14213D] transition-colors shadow-sm" title="Reminder Settings">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Main Grid Content */}
        <div className="flex gap-5">
          
          {/* Left Sidebar */}
          <div className="w-[240px] shrink-0 flex flex-col gap-5">
            {/* Small Calendar */}
            <div className="bg-white border border-[#14213D]/10 rounded-xl p-4 shadow-sm">
               <div className="flex justify-between items-center mb-4">
                 <div className="text-xs font-bold text-[#14213D]">May 2025</div>
                 <div className="flex gap-1">
                   <ChevronLeft className="h-3.5 w-3.5 text-[#1F1F1F]/50 cursor-pointer hover:text-[#14213D]" />
                   <ChevronRight className="h-3.5 w-3.5 text-[#1F1F1F]/50 cursor-pointer hover:text-[#14213D]" />
                 </div>
               </div>
               <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-[#1F1F1F]/50 font-medium mb-2">
                 <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
               </div>
               <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-[#14213D]">
                 <div className="text-[#1F1F1F]/30 p-1">27</div><div className="text-[#1F1F1F]/30 p-1">28</div><div className="text-[#1F1F1F]/30 p-1">29</div><div className="text-[#1F1F1F]/30 p-1">30</div><div className="p-1">1</div><div className="p-1">2</div><div className="p-1">3</div>
                 <div className="p-1">4</div><div className="p-1">5</div><div className="p-1">6</div><div className="p-1">7</div><div className="p-1">8</div><div className="p-1">9</div><div className="p-1">10</div>
                 <div className="p-1">11</div><div className="p-1">12</div><div className="p-1">13</div><div className="p-1">14</div><div className="p-1">15</div><div className="p-1">16</div><div className="p-1">17</div>
                 <div className="p-1">18</div><div className="p-1">19</div><div className="p-1">20</div><div className="p-1">21</div><div className="bg-[#14213D] text-white rounded p-1">22</div><div className="p-1">23</div><div className="p-1">24</div>
                 <div className="p-1">25</div><div className="p-1">26</div><div className="p-1">27</div><div className="p-1">28</div><div className="p-1">29</div><div className="p-1">30</div><div className="p-1">31</div>
               </div>
            </div>

            {/* Hearing Summary */}
            <div className="bg-white border border-[#14213D]/10 rounded-xl p-4 shadow-sm flex-1 flex flex-col">
              <h3 className="text-[11px] font-bold text-[#14213D] mb-4">Hearing Summary <span className="text-[#1F1F1F]/50 font-medium ml-1">(This Week)</span></h3>
              
              <div className="space-y-4 text-[11px] font-semibold">
                <div className="flex justify-between items-center">
                  <span className="text-[#1F1F1F]/70">Total Hearings</span>
                  <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#1F1F1F]/70">Today</span>
                  <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#1F1F1F]/70">Tomorrow</span>
                  <span className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#1F1F1F]/70">This Week</span>
                  <span className="bg-purple-50 text-purple-600 px-2 py-0.5 rounded">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#1F1F1F]/70">Overdue / Missed</span>
                  <span className="bg-rose-50 text-rose-600 px-2 py-0.5 rounded">2</span>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-auto pt-6">
                <div className="grid grid-cols-2 gap-y-3 text-[9px] font-semibold text-[#1F1F1F]/70">
                  <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-emerald-400"></div>Sessions Court</div>
                  <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-blue-400"></div>Banking Court</div>
                  <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-purple-400"></div>Family Court</div>
                  <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-amber-400"></div>Anti Terrorism</div>
                  <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-rose-400"></div>District Court</div>
                  <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-slate-400"></div>Rent Tribunal</div>
                </div>
              </div>
            </div>

            {/* Overdue / Missed Hearings */}
            <div className="bg-white border border-[#14213D]/10 rounded-xl p-4 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[12px] font-bold text-[#14213D]">Overdue / Missed</h3>
                <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">2</span>
              </div>
              
              <div className="space-y-3">
                <div onClick={() => setOpenModal("hearing")} className="border-l-2 border-rose-500 pl-3 py-1 relative group cursor-pointer">
                  <div className="text-[11px] font-bold text-[#14213D] leading-tight">Civil Appeal No. 78/2024</div>
                  <div className="text-[10px] text-[#1F1F1F]/60 mt-0.5">District Court, Lahore</div>
                  <div className="text-[9px] font-medium text-rose-500 mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Was due on 20 May 2025
                  </div>
                  <button className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-white border border-[#14213D]/10 px-2 py-1 rounded text-[9px] font-bold text-[#14213D] shadow-sm transition">
                    View
                  </button>
                </div>
                
                <div onClick={() => setOpenModal("hearing")} className="border-l-2 border-rose-500 pl-3 py-1 relative group cursor-pointer">
                  <div className="text-[11px] font-bold text-[#14213D] leading-tight">Client: Ahmed Raza</div>
                  <div className="text-[10px] text-[#1F1F1F]/60 mt-0.5">Lawyer: Saad Iqbal</div>
                  <div className="text-[9px] font-medium text-rose-500 mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Was due on 21 May 2025
                  </div>
                  <button className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-white border border-[#14213D]/10 px-2 py-1 rounded text-[9px] font-bold text-[#14213D] shadow-sm transition">
                    View
                  </button>
                </div>
              </div>
              
              <button className="mt-4 pt-4 border-t border-[#14213D]/10 text-[10px] font-bold text-[#1F1F1F]/60 hover:text-[#14213D] flex items-center justify-center gap-1 transition">
                View All Overdue <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Center Calendar View (Week Layout) */}
          <div className="flex-1 bg-white border border-[#14213D]/10 rounded-xl shadow-sm overflow-hidden flex flex-col relative isolate z-0">
             
             {/* Days Header */}
             <div className="flex border-b border-[#14213D]/10 bg-gray-50/50 z-10 relative">
               <div className="w-[60px] shrink-0 border-r border-[#14213D]/10"></div>
               {['Sun 18 May', 'Mon 19 May', 'Tue 20 May', 'Wed 21 May', 'Thu 22 May', 'Fri 23 May', 'Sat 24 May'].map((day, i) => (
                 <div key={day} className={`flex-1 text-center py-2 text-[11px] font-bold ${i === 4 ? 'bg-[#14213D] text-white' : 'text-[#14213D]'} border-r border-[#14213D]/10 last:border-0`}>
                   {day}
                 </div>
               ))}
             </div>

             {/* Time Grid Wrapper */}
             <div className="flex-1 relative z-0">
               
               {/* Background Grid Lines & Times */}
               <div className="min-w-full">
                 {['All day', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM'].map((time) => (
                   <div key={time} className="flex border-b border-[#14213D]/5 h-16 w-full">
                     <div className="w-[60px] shrink-0 border-r border-[#14213D]/10 text-[9px] font-semibold text-[#1F1F1F]/50 flex items-center justify-center bg-gray-50/50">
                       {time}
                     </div>
                     <div className="flex-1 border-r border-[#14213D]/5"></div>
                     <div className="flex-1 border-r border-[#14213D]/5"></div>
                     <div className="flex-1 border-r border-[#14213D]/5"></div>
                     <div className="flex-1 border-r border-[#14213D]/5"></div>
                     <div className="flex-1 border-r border-[#14213D]/5"></div>
                     <div className="flex-1 border-r border-[#14213D]/5"></div>
                     <div className="flex-1"></div>
                   </div>
                 ))}
               </div>

               {/* Current Time Indicator */}
               <div className="absolute left-[60px] right-0 h-px bg-rose-500 z-30" style={{ top: `${currentTimePos}px` }}>
                 <div className="absolute -left-1 -top-[3px] h-1.5 w-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]"></div>
               </div>

               {/* Absolute Positioned Case Blocks */}
               <div onClick={() => setOpenModal("hearing")} className="absolute left-[calc(60px+(100%-60px)/7*1)] top-[128px] w-[calc((100%-60px)/7-8px)] mx-1 h-14 bg-blue-50 border-l-2 border-blue-500 rounded p-1.5 shadow-sm z-20 overflow-hidden cursor-pointer hover:bg-blue-100 transition">
                 <div className="text-[9px] font-bold text-blue-700 mb-0.5">10:00 AM</div>
                 <div className="text-[9px] font-bold text-[#14213D] leading-tight truncate">ABC Corp vs XYZ Bank</div>
                 <div className="text-[8px] text-[#1F1F1F]/60 mt-0.5 truncate">Banking Court</div>
               </div>

               <div onClick={() => setOpenModal("hearing")} className="absolute left-[calc(60px+(100%-60px)/7*2)] top-[224px] w-[calc((100%-60px)/7-8px)] mx-1 h-[70px] bg-purple-50 border-l-2 border-purple-500 rounded p-1.5 shadow-sm z-20 overflow-hidden cursor-pointer hover:bg-purple-100 transition">
                 <div className="text-[9px] font-bold text-purple-700 mb-0.5">11:30 AM</div>
                 <div className="text-[9px] font-bold text-[#14213D] leading-tight truncate">Fatima Bibi vs Asif Khan</div>
                 <div className="text-[8px] text-[#1F1F1F]/60 mt-0.5 truncate">Family Court</div>
               </div>

               <div onClick={() => setOpenModal("hearing")} className="absolute left-[calc(60px+(100%-60px)/7*3)] top-[160px] w-[calc((100%-60px)/7-8px)] mx-1 h-[60px] bg-amber-50 border-l-2 border-amber-500 rounded p-1.5 shadow-sm z-20 overflow-hidden cursor-pointer hover:bg-amber-100 transition">
                 <div className="text-[9px] font-bold text-amber-700 mb-0.5">10:30 AM</div>
                 <div className="text-[9px] font-bold text-[#14213D] leading-tight truncate">Zainab Khan vs Waseem Khan</div>
                 <div className="text-[8px] text-[#1F1F1F]/60 mt-0.5 truncate">Family Court</div>
               </div>
               
               <div onClick={() => setOpenModal("hearing")} className="absolute left-[calc(60px+(100%-60px)/7*2)] top-[448px] w-[calc((100%-60px)/7-8px)] mx-1 h-14 bg-amber-50 border-l-2 border-amber-500 rounded p-1.5 shadow-sm z-20 overflow-hidden cursor-pointer hover:bg-amber-100 transition">
                 <div className="text-[9px] font-bold text-amber-700 mb-0.5">3:00 PM</div>
                 <div className="text-[9px] font-bold text-[#14213D] leading-tight truncate">The State vs Imran Ali</div>
                 <div className="text-[8px] text-[#1F1F1F]/60 mt-0.5 truncate">Anti Terrorism</div>
               </div>

               <div onClick={() => setOpenModal("hearing")} className="absolute left-[calc(60px+(100%-60px)/7*4)] top-[128px] w-[calc((100%-60px)/7-8px)] mx-1 h-14 bg-emerald-50 border-l-2 border-emerald-500 rounded p-1.5 shadow-sm z-20 overflow-hidden cursor-pointer hover:bg-emerald-100 transition">
                 <div className="text-[9px] font-bold text-emerald-700 mb-0.5">10:00 AM</div>
                 <div className="text-[9px] font-bold text-[#14213D] leading-tight truncate">Muhammad Ahmad vs State</div>
                 <div className="text-[8px] text-[#1F1F1F]/60 mt-0.5 truncate">Sessions Court</div>
               </div>

               <div onClick={() => setOpenModal("hearing")} className="absolute left-[calc(60px+(100%-60px)/7*4)] top-[224px] w-[calc((100%-60px)/7-8px)] mx-1 h-14 bg-blue-50 border-l-2 border-blue-500 rounded p-1.5 shadow-sm z-20 overflow-hidden cursor-pointer hover:bg-blue-100 transition">
                 <div className="text-[9px] font-bold text-blue-700 mb-0.5">11:30 AM</div>
                 <div className="text-[9px] font-bold text-[#14213D] leading-tight truncate">ABC Corp vs XYZ Bank</div>
                 <div className="text-[8px] text-[#1F1F1F]/60 mt-0.5 truncate">Banking Court</div>
               </div>

               <div onClick={() => setOpenModal("hearing")} className="absolute left-[calc(60px+(100%-60px)/7*4)] top-[320px] w-[calc((100%-60px)/7-8px)] mx-1 h-14 bg-rose-50 border-l-2 border-rose-500 rounded p-1.5 shadow-sm z-20 overflow-hidden cursor-pointer hover:bg-rose-100 transition">
                 <div className="text-[9px] font-bold text-rose-700 mb-0.5">1:00 PM</div>
                 <div className="text-[9px] font-bold text-[#14213D] leading-tight truncate">FIA vs Usman Khalid</div>
                 <div className="text-[8px] text-[#1F1F1F]/60 mt-0.5 truncate">FIA Court</div>
               </div>

               <div onClick={() => setOpenModal("hearing")} className="absolute left-[calc(60px+(100%-60px)/7*5)] top-[192px] w-[calc((100%-60px)/7-8px)] mx-1 h-[70px] bg-rose-50 border-l-2 border-rose-500 rounded p-1.5 shadow-sm z-20 overflow-hidden cursor-pointer hover:bg-rose-100 transition">
                 <div className="text-[9px] font-bold text-rose-700 mb-0.5">11:00 AM</div>
                 <div className="text-[9px] font-bold text-[#14213D] leading-tight truncate">Civil Suit No. 456/2023</div>
                 <div className="text-[8px] text-[#1F1F1F]/60 mt-0.5 truncate">District Court</div>
               </div>

               <div onClick={() => setOpenModal("hearing")} className="absolute left-[calc(60px+(100%-60px)/7*6)] top-[160px] w-[calc((100%-60px)/7-8px)] mx-1 h-[60px] bg-slate-100 border-l-2 border-slate-500 rounded p-1.5 shadow-sm z-20 overflow-hidden cursor-pointer hover:bg-slate-200 transition">
                 <div className="text-[9px] font-bold text-slate-700 mb-0.5">10:30 AM</div>
                 <div className="text-[9px] font-bold text-[#14213D] leading-tight truncate">Rashid vs Khalid</div>
                 <div className="text-[8px] text-[#1F1F1F]/60 mt-0.5 truncate">Rent Tribunal</div>
               </div>

             </div>
          </div>

        </div>
      </div>

      {/* --- MODALS --- */}
      
      {/* 1. Hearing Details Modal */}
      {openModal === "hearing" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden max-h-[90vh]">
            
            {/* Left side: Hearing Details */}
            <div className="flex-1 border-r border-[#14213D]/10 p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#14213D]" style={{ fontFamily: "'Libre Baskerville', serif" }}>Hearing Details</h2>
                <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1 rounded font-semibold text-[11px]">Scheduled</span>
              </div>
              
              <div className="mb-6">
                <h3 className="text-[15px] font-bold text-[#14213D] mb-1">Muhammad Ahmad vs State</h3>
                <div className="text-xs text-[#1F1F1F]/60">Criminal Case No. 123/2024</div>
              </div>

              <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#1F1F1F]/60 font-medium mb-1"><Calendar className="h-3.5 w-3.5" /> Date & Time</div>
                  <div className="text-xs font-semibold text-[#14213D]">22 May 2025, 10:00 AM</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#1F1F1F]/60 font-medium mb-1"><Building className="h-3.5 w-3.5" /> Court Room</div>
                  <div className="text-xs font-semibold text-[#14213D]">Court Room 3</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#1F1F1F]/60 font-medium mb-1"><Building className="h-3.5 w-3.5" /> Court</div>
                  <div className="text-xs font-semibold text-[#14213D]">Sessions Court, Lahore</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#1F1F1F]/60 font-medium mb-1"><User className="h-3.5 w-3.5" /> Assigned Lawyer</div>
                  <div className="text-xs font-semibold text-[#14213D]">Aqsa Malik</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#1F1F1F]/60 font-medium mb-1"><Gavel className="h-3.5 w-3.5" /> Judge / Bench</div>
                  <div className="text-xs font-semibold text-[#14213D]">Aslam Khan</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#1F1F1F]/60 font-medium mb-1"><User className="h-3.5 w-3.5" /> Client</div>
                  <div className="text-xs font-semibold text-[#14213D]">Muhammad Ahmad</div>
                </div>
              </div>

              {/* Internal Tabs */}
              <div className="flex items-center border-b border-[#14213D]/10 mb-5">
                <button className="px-4 py-2 border-b-2 border-emerald-600 text-emerald-700 text-xs font-bold">Hearing Details</button>
                <button className="px-4 py-2 text-[#1F1F1F]/60 hover:text-[#14213D] text-xs font-semibold">Case Info</button>
                <button className="px-4 py-2 text-[#1F1F1F]/60 hover:text-[#14213D] text-xs font-semibold">Documents (2)</button>
                <button className="px-4 py-2 text-[#1F1F1F]/60 hover:text-[#14213D] text-xs font-semibold">Notes (1)</button>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="text-[11px] text-[#1F1F1F]/60 font-medium mb-1">Purpose of Hearing</div>
                  <div className="text-xs font-semibold text-[#14213D]">Arguments</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#1F1F1F]/60 font-medium mb-1">Remarks / Last Order</div>
                  <div className="text-xs font-semibold text-[#14213D]">Written arguments directed. Next date fixed.</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#1F1F1F]/60 font-medium mb-1">Next Hearing Date</div>
                  <div className="flex items-center gap-2 border border-[#14213D]/15 rounded-lg px-3 py-2 w-full max-w-[200px]">
                    <span className="text-xs font-semibold text-[#14213D]">29 May 2025</span>
                    <Calendar className="h-3.5 w-3.5 text-[#1F1F1F]/40 ml-auto" />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3 pt-5 border-t border-[#14213D]/10">
                <button onClick={() => setOpenModal("none")} className="px-4 py-2 border border-rose-200 text-rose-600 rounded-lg text-xs font-bold hover:bg-rose-50 transition">Delete</button>
                <div className="flex-1"></div>
                <button className="px-4 py-2 border border-[#14213D]/15 text-[#14213D] rounded-lg text-xs font-bold hover:bg-gray-50 transition">Reschedule</button>
                <button className="px-4 py-2 bg-[#B8860B] text-white rounded-lg text-xs font-bold hover:bg-[#14213D] transition">Mark Hearing Done</button>
              </div>
            </div>

            {/* Right side: Mark Hearing Done form */}
            <div className="flex-1 bg-gray-50/50 p-6 flex flex-col overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#14213D]">Mark Hearing Done</h2>
                <button onClick={() => setOpenModal("none")} className="text-[#1F1F1F]/40 hover:text-[#14213D]"><X className="h-5 w-5" /></button>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-center justify-center gap-2 text-emerald-700 font-bold text-[13px] mb-6">
                <CheckCircle className="h-4 w-4" /> Hearing Completed
              </div>

              <div className="space-y-4 flex-1">
                <div>
                  <label className="block text-[11px] font-bold text-[#14213D] mb-1.5">Attendance</label>
                  <select className="w-full px-3 py-2 bg-white border border-[#14213D]/15 rounded-lg text-xs font-medium focus:outline-none focus:border-[#B8860B]">
                    <option>Self</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-[11px] font-bold text-[#14213D] mb-1.5">Order Passed / Remarks <span className="text-rose-500">*</span></label>
                  <textarea rows={3} className="w-full px-3 py-2 bg-white border border-[#14213D]/15 rounded-lg text-xs font-medium focus:outline-none focus:border-[#B8860B] resize-none">Arguments concluded. Reserved for order.</textarea>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#14213D] mb-1.5">Upload Order Copy (Optional)</label>
                  <div className="flex items-center justify-between border border-[#14213D]/15 bg-white rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-gray-100 rounded flex items-center justify-center"><FileText className="h-4 w-4 text-[#1F1F1F]/50" /></div>
                      <div>
                        <div className="text-xs font-bold text-[#14213D]">Order_22-05-2025.pdf</div>
                        <div className="text-[10px] text-[#1F1F1F]/50 mt-0.5">245 KB</div>
                      </div>
                    </div>
                    <button className="text-[#1F1F1F]/40 hover:text-rose-500"><X className="h-4 w-4" /></button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#14213D] mb-1.5">Next Hearing Date <span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <input type="text" value="29 May 2025" readOnly className="w-full pl-3 pr-9 py-2 bg-white border border-[#14213D]/15 rounded-lg text-xs font-medium focus:outline-none focus:border-[#B8860B]" />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F1F1F]/40" />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3 pt-5 border-t border-[#14213D]/10">
                <button onClick={() => setOpenModal("none")} className="px-5 py-2 border border-[#14213D]/15 bg-white text-[#14213D] rounded-lg text-xs font-bold hover:bg-gray-50 transition">Cancel</button>
                <button className="flex-1 px-5 py-2 bg-[#B8860B] text-white rounded-lg text-xs font-bold hover:bg-[#14213D] transition text-center justify-center flex">Save & Add Next Date</button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 2. Cause List Modal */}
      {openModal === "causelist" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full flex flex-col overflow-hidden max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-[#14213D]/10">
              <h2 className="text-lg font-bold text-[#14213D]">Cause List</h2>
              <button onClick={() => setOpenModal("none")} className="text-[#1F1F1F]/40 hover:text-[#14213D]"><X className="h-5 w-5" /></button>
            </div>
            
            <div className="p-5 overflow-y-auto">
              <div className="flex items-center gap-4 mb-6">
                <div>
                  <label className="block text-[10px] font-bold text-[#14213D] mb-1">Date</label>
                  <div className="relative">
                    <input type="text" value="22 May 2025" readOnly className="w-[140px] pl-3 pr-8 py-2 border border-[#14213D]/15 rounded-lg text-xs font-medium focus:outline-none" />
                    <Calendar className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#1F1F1F]/40" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#14213D] mb-1">Court</label>
                  <select className="w-[140px] px-3 py-2 border border-[#14213D]/15 rounded-lg text-xs font-medium focus:outline-none">
                    <option>All Courts</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#14213D] mb-1">Lawyer</label>
                  <select className="w-[140px] px-3 py-2 border border-[#14213D]/15 rounded-lg text-xs font-medium focus:outline-none">
                    <option>All Lawyers</option>
                  </select>
                </div>
                <div className="mt-4">
                  <button className="px-5 py-2 bg-[#14213D] text-white rounded-lg text-xs font-bold hover:bg-[#B8860B] transition">Generate</button>
                </div>
              </div>

              <div className="border border-[#14213D]/10 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 border-b border-[#14213D]/10 flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-bold text-[#14213D]">Cause List - 22 May 2025</h3>
                    <div className="text-[10px] text-[#1F1F1F]/60 mt-0.5">Court: All Courts</div>
                  </div>
                  <div className="text-xs font-semibold text-[#1F1F1F]/60 flex items-center gap-1">Total Hearings: 3</div>
                </div>
                
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[#14213D]/10 text-[10px] text-[#1F1F1F]/60 font-bold uppercase tracking-wider">
                      <th className="py-3 px-4 w-12">#</th>
                      <th className="py-3 px-4">Time</th>
                      <th className="py-3 px-4">Case Title / Case No.</th>
                      <th className="py-3 px-4">Court</th>
                      <th className="py-3 px-4">Lawyer</th>
                      <th className="py-3 px-4">Court Room</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#14213D]/5">
                      <td className="py-3 px-4 text-xs font-medium text-[#1F1F1F]/60">1</td>
                      <td className="py-3 px-4 text-xs font-bold text-[#14213D]">10:00 AM</td>
                      <td className="py-3 px-4">
                        <div className="text-xs font-bold text-[#14213D]">Muhammad Ahmad vs State</div>
                        <div className="text-[10px] text-[#1F1F1F]/50 mt-0.5">CC No. 123/2024</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-xs font-bold text-[#14213D]">Sessions Court,</div>
                        <div className="text-[10px] text-[#1F1F1F]/50 mt-0.5">Lahore</div>
                      </td>
                      <td className="py-3 px-4 text-xs font-bold text-[#14213D]">Aqsa Malik</td>
                      <td className="py-3 px-4 text-xs font-medium text-[#1F1F1F]/60">Court Room 3</td>
                    </tr>
                    <tr className="border-b border-[#14213D]/5">
                      <td className="py-3 px-4 text-xs font-medium text-[#1F1F1F]/60">2</td>
                      <td className="py-3 px-4 text-xs font-bold text-[#14213D]">11:30 AM</td>
                      <td className="py-3 px-4">
                        <div className="text-xs font-bold text-[#14213D]">ABC Corp vs XYZ Bank</div>
                        <div className="text-[10px] text-[#1F1F1F]/50 mt-0.5">CS No. 456/2023</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-xs font-bold text-[#14213D]">Banking Court,</div>
                        <div className="text-[10px] text-[#1F1F1F]/50 mt-0.5">Lahore</div>
                      </td>
                      <td className="py-3 px-4 text-xs font-bold text-[#14213D]">Saad Iqbal</td>
                      <td className="py-3 px-4 text-xs font-medium text-[#1F1F1F]/60">Court Room 1</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-xs font-medium text-[#1F1F1F]/60">3</td>
                      <td className="py-3 px-4 text-xs font-bold text-[#14213D]">1:00 PM</td>
                      <td className="py-3 px-4">
                        <div className="text-xs font-bold text-[#14213D]">FIA vs Usman Khalid</div>
                        <div className="text-[10px] text-[#1F1F1F]/50 mt-0.5">FIR No. 98/2024</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-xs font-bold text-[#14213D]">FIA Court,</div>
                        <div className="text-[10px] text-[#1F1F1F]/50 mt-0.5">Lahore</div>
                      </td>
                      <td className="py-3 px-4 text-xs font-bold text-[#14213D]">M. Tariq Mehmood</td>
                      <td className="py-3 px-4 text-xs font-medium text-[#1F1F1F]/60">Court Room 2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-5 border-t border-[#14213D]/10 bg-gray-50 flex items-center gap-4">
              <span className="text-[11px] font-bold text-[#14213D]">Export Options</span>
              <button className="flex items-center gap-1.5 px-4 py-2 border border-[#14213D]/15 bg-white rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 transition"><FileText className="h-3.5 w-3.5" /> PDF</button>
              <button className="flex items-center gap-1.5 px-4 py-2 border border-[#14213D]/15 bg-white rounded-lg text-xs font-bold text-emerald-600 hover:bg-emerald-50 transition"><FileText className="h-3.5 w-3.5" /> Excel</button>
              <button className="flex items-center gap-1.5 px-4 py-2 border border-[#14213D]/15 bg-white rounded-lg text-xs font-bold text-emerald-600 hover:bg-emerald-50 transition">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                WhatsApp
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2 border border-[#14213D]/15 bg-white rounded-lg text-xs font-bold text-[#14213D] hover:bg-gray-50 transition ml-auto"><Printer className="h-3.5 w-3.5" /> Print</button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Reminder Settings Modal */}
      {openModal === "reminders" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full flex flex-col overflow-hidden max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-[#14213D]/10">
              <h2 className="text-lg font-bold text-[#14213D]">Reminder Settings</h2>
              <button onClick={() => setOpenModal("none")} className="text-[#1F1F1F]/40 hover:text-[#14213D]"><X className="h-5 w-5" /></button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              
              <div className="mb-6">
                <h3 className="text-xs font-bold text-[#14213D] mb-3">Reminder Channels</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="h-4 w-4 bg-[#14213D] rounded border border-[#14213D] flex items-center justify-center"><Check className="h-3 w-3 text-white" /></div>
                    <span className="text-[13px] font-medium text-[#1F1F1F]/80 group-hover:text-[#14213D] transition">WhatsApp</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="h-4 w-4 bg-[#14213D] rounded border border-[#14213D] flex items-center justify-center"><Check className="h-3 w-3 text-white" /></div>
                    <span className="text-[13px] font-medium text-[#1F1F1F]/80 group-hover:text-[#14213D] transition">SMS</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="h-4 w-4 bg-[#14213D] rounded border border-[#14213D] flex items-center justify-center"><Check className="h-3 w-3 text-white" /></div>
                    <span className="text-[13px] font-medium text-[#1F1F1F]/80 group-hover:text-[#14213D] transition">Email</span>
                  </label>
                </div>
              </div>

              <div className="w-full h-px bg-[#14213D]/10 mb-6"></div>

              <div>
                <h3 className="text-xs font-bold text-[#14213D] mb-3">Send Reminders</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div className="h-4 w-4 bg-[#14213D] rounded border border-[#14213D] flex items-center justify-center"><Check className="h-3 w-3 text-white" /></div>
                      <span className="text-[13px] font-medium text-[#1F1F1F]/80">7 days before hearing</span>
                    </label>
                    <select className="px-3 py-1.5 border border-[#14213D]/15 rounded-lg text-[11px] font-bold text-[#14213D] outline-none">
                      <option>09:00 AM</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div className="h-4 w-4 bg-[#14213D] rounded border border-[#14213D] flex items-center justify-center"><Check className="h-3 w-3 text-white" /></div>
                      <span className="text-[13px] font-medium text-[#1F1F1F]/80">2 days before hearing</span>
                    </label>
                    <select className="px-3 py-1.5 border border-[#14213D]/15 rounded-lg text-[11px] font-bold text-[#14213D] outline-none">
                      <option>09:00 AM</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div className="h-4 w-4 bg-[#14213D] rounded border border-[#14213D] flex items-center justify-center"><Check className="h-3 w-3 text-white" /></div>
                      <span className="text-[13px] font-medium text-[#1F1F1F]/80">1 day before hearing</span>
                    </label>
                    <select className="px-3 py-1.5 border border-[#14213D]/15 rounded-lg text-[11px] font-bold text-[#14213D] outline-none">
                      <option>09:00 AM</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between opacity-60">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div className="h-4 w-4 bg-white rounded border border-[#14213D]/30 flex items-center justify-center"></div>
                      <span className="text-[13px] font-medium text-[#1F1F1F]/80">Same day (Morning)</span>
                    </label>
                    <select className="px-3 py-1.5 border border-[#14213D]/15 rounded-lg text-[11px] font-bold text-[#1F1F1F]/60 outline-none" disabled>
                      <option>08:00 AM</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between opacity-60">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div className="h-4 w-4 bg-white rounded border border-[#14213D]/30 flex items-center justify-center"></div>
                      <span className="text-[13px] font-medium text-[#1F1F1F]/80">Same day (2 hours before)</span>
                    </label>
                    <select className="px-3 py-1.5 border border-[#14213D]/15 rounded-lg text-[11px] font-bold text-[#1F1F1F]/60 outline-none" disabled>
                      <option>--:--</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-[#B8860B]/10 border border-[#B8860B]/30 rounded-lg p-3">
                <p className="text-[11px] text-[#14213D] font-medium"><span className="font-bold">Note:</span> Reminders will be sent based on the Next Hearing Date.</p>
              </div>

            </div>

            <div className="p-5 border-t border-[#14213D]/10 flex justify-end">
              <button onClick={() => setOpenModal("none")} className="px-6 py-2 bg-[#14213D] text-white rounded-lg text-xs font-bold hover:bg-[#B8860B] transition">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

    </LawyerShell>
  );
}
