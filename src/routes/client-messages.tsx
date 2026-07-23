import { createFileRoute } from "@tanstack/react-router";
import ClientShell from "../components/dashboard/ClientShell";
import { Send, Phone, Video } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/client-messages")({
  component: ClientMessages,
});

function ClientMessages() {
  const [message, setMessage] = useState("");

  const MOCK_MESSAGES = [
    { id: 1, sender: "Aqsa Malik", time: "Yesterday, 10:30 AM", text: "Assalam o Alaikum Rizwan, I have uploaded the draft for the written arguments. Please review.", isMe: false },
    { id: 2, sender: "Me", time: "Yesterday, 11:15 AM", text: "Walaikum Assalam. Yes, I saw it. It looks good. When is our next hearing?", isMe: true },
    { id: 3, sender: "Aqsa Malik", time: "Yesterday, 11:45 AM", text: "The next hearing is on 22nd July. I'll let you know if you need to be present.", isMe: false },
  ];

  return (
    <ClientShell active="messages">
      <div className="flex flex-col h-full max-w-[1000px] mx-auto pb-10">
        
        <div className="flex justify-between items-center shrink-0 mt-2 mb-4">
          <div>
            <h1 className="text-[28px] font-bold text-[#14213D] leading-tight" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              Messages
            </h1>
          </div>
        </div>

        <div className="flex-1 bg-white border border-[#14213D]/10 rounded-xl shadow-sm overflow-hidden flex flex-col">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-[#14213D]/10 bg-gray-50/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                AM
              </div>
              <div>
                <div className="text-[14px] font-bold text-[#14213D]">Aqsa Malik</div>
                <div className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Online
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-[#14213D]/10 text-[#1F1F1F]/60 hover:bg-gray-50 transition-colors">
                <Phone className="h-4 w-4" />
              </button>
              <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-[#14213D]/10 text-[#1F1F1F]/60 hover:bg-gray-50 transition-colors">
                <Video className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FAFAFA]">
            {MOCK_MESSAGES.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-bold text-[#14213D]">{msg.sender}</span>
                  <span className="text-[10px] font-medium text-[#1F1F1F]/40">{msg.time}</span>
                </div>
                <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-[13px] leading-relaxed shadow-sm ${
                  msg.isMe 
                    ? 'bg-[#B8860B] text-white rounded-tr-sm' 
                    : 'bg-white border border-[#14213D]/10 text-[#14213D] rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-white border-t border-[#14213D]/10">
            <div className="flex items-end gap-2 bg-gray-50 border border-[#14213D]/10 rounded-xl p-2 focus-within:border-[#B8860B] transition-colors">
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..." 
                className="flex-1 bg-transparent border-none resize-none max-h-[120px] min-h-[40px] text-[13px] p-2 focus:outline-none"
                rows={1}
              />
              <button className={`h-10 w-10 shrink-0 flex items-center justify-center rounded-lg transition-colors ${
                message.trim().length > 0 ? 'bg-[#B8860B] text-white hover:bg-[#14213D]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}>
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </ClientShell>
  );
}
