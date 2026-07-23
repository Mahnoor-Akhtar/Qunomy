import { createFileRoute } from "@tanstack/react-router";
import ClientShell from "../components/dashboard/ClientShell";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/client-hearings")({
  component: ClientHearings,
});

function ClientHearings() {
  return (
    <ClientShell active="hearings">
      <div className="flex flex-col gap-5 max-w-[1400px] mx-auto h-full pb-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
          <div>
            <h1 className="text-[28px] font-bold text-[#14213D] leading-tight" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              Hearings Calendar
            </h1>
            <div className="text-[13px] text-[#1F1F1F]/60 mt-1 font-medium">
              View your upcoming case hearing dates.
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center p-1 bg-gray-100/80 rounded-lg border border-black/5">
              <button className="px-5 py-1.5 text-[11px] font-bold rounded-md whitespace-nowrap transition-all bg-white text-[#14213D] shadow-sm border border-black/5">
                Week
              </button>
          </div>
          
          <div className="flex items-center bg-white border border-[#14213D]/10 rounded-lg shadow-sm p-1">
             <button className="h-7 px-2 rounded hover:bg-gray-50 text-[#1F1F1F]/60 transition"><ChevronLeft className="h-4 w-4" /></button>
             <button className="h-7 px-2 rounded hover:bg-gray-50 text-[#1F1F1F]/60 transition"><ChevronRight className="h-4 w-4" /></button>
             <div className="px-4 text-[12px] font-bold text-[#14213D] border-x border-[#14213D]/10 mx-1">May 2025</div>
             <button className="h-7 px-4 text-[11px] font-bold text-[#1F1F1F]/70 hover:bg-gray-50 rounded transition">Today</button>
          </div>
        </div>

        <div className="flex gap-5">
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

               {/* Absolute Positioned Case Blocks (Client's Own Cases) */}
               <div className="absolute left-[calc(60px+(100%-60px)/7*4)] top-[128px] w-[calc((100%-60px)/7-8px)] mx-1 h-14 bg-blue-50 border-l-2 border-blue-500 rounded p-1.5 shadow-sm z-20 overflow-hidden cursor-default transition">
                 <div className="text-[9px] font-bold text-blue-700 mb-0.5">10:00 AM</div>
                 <div className="text-[9px] font-bold text-[#14213D] leading-tight truncate">Muhammad Ahmad vs State</div>
                 <div className="text-[8px] text-[#1F1F1F]/60 mt-0.5 truncate">Sessions Court</div>
               </div>

               <div className="absolute left-[calc(60px+(100%-60px)/7*5)] top-[224px] w-[calc((100%-60px)/7-8px)] mx-1 h-14 bg-blue-50 border-l-2 border-blue-500 rounded p-1.5 shadow-sm z-20 overflow-hidden cursor-default transition">
                 <div className="text-[9px] font-bold text-blue-700 mb-0.5">11:30 AM</div>
                 <div className="text-[9px] font-bold text-[#14213D] leading-tight truncate">ABC Corp vs XYZ Bank</div>
                 <div className="text-[8px] text-[#1F1F1F]/60 mt-0.5 truncate">Banking Court</div>
               </div>
             </div>
          </div>
        </div>

      </div>
    </ClientShell>
  );
}
