import { createFileRoute } from "@tanstack/react-router";
import LawyerShell from "../components/dashboard/LawyerShell";
import { 
  Bell, 
  MessageCircle, 
  Mail, 
  Plus, 
  Edit2, 
  Trash2, 
  Info,
  Calendar,
  AlertCircle,
  Clock,
  RefreshCcw,
  CheckCircle2,
  Phone,
  Send,
  Lightbulb,
  Settings
} from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/lawyer-notifications")({
  component: LawyerNotifications,
});

const TIMINGS = [
  { id: 1, name: "7 Days Before", before: "7 days", time: "09:00 AM", channels: ["whatsapp", "sms", "email"], status: "Active" },
  { id: 2, name: "2 Days Before", before: "2 days", time: "09:00 AM", channels: ["whatsapp", "sms", "email"], status: "Active" },
  { id: 3, name: "1 Day Before", before: "1 day", time: "09:00 AM", channels: ["whatsapp", "sms", "email"], status: "Active" },
  { id: 4, name: "Same Day (Morning)", before: "Same day", time: "08:00 AM", channels: ["whatsapp", "sms"], status: "Active" },
  { id: 5, name: "Same Day (2 Hours Before)", before: "2 hours", time: "--", channels: ["whatsapp"], status: "Inactive" },
];

const VARIABLES = [
  { tag: "{client_name}", desc: "Client Name" },
  { tag: "{case_number}", desc: "Case Number" },
  { tag: "{case_title}", desc: "Case Title" },
  { tag: "{court_name}", desc: "Court Name" },
  { tag: "{hearing_date}", desc: "Next Hearing Date" },
  { tag: "{hearing_time}", desc: "Hearing Time" },
  { tag: "{firm_name}", desc: "Firm Name" },
];

function LawyerNotifications() {
  const [activeTab, setActiveTab] = useState("channels");
  const [activeChannel, setActiveChannel] = useState("whatsapp");
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("qanomy_user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);
  const isMember = user?.email === "ijaz@gmail.com";

  return (
    <LawyerShell active="notifications">
      <div className="flex flex-col h-full space-y-6 max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <div className="flex justify-between items-center shrink-0">
          <div>
            <h1 className="text-[24px] font-bold text-[#14213D] tracking-tight">Notifications & Reminders</h1>
            <div className="text-[12px] font-medium text-[#1F1F1F]/50 mt-1">
              Manage notification channels, reminder timings and message templates.
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-[#14213D]/10 shrink-0">
          {["channels", "timings", "templates", "log"].filter(t => !isMember || (t !== "templates" && t !== "timings" && t !== "log")).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-[13px] font-bold capitalize transition-colors relative ${
                activeTab === tab ? "text-emerald-600" : "text-[#1F1F1F]/40 hover:text-[#1F1F1F]/80"
              }`}
            >
              {tab === "channels" ? "Notification Channels" : 
               tab === "timings" ? "Reminder Timings" : 
               tab === "templates" ? "Message Templates" : "Activity Log"}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto min-h-0 pb-10">
          
          {/* TAB: Channels */}
          {activeTab === "channels" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* WhatsApp Card */}
                <div className="bg-white border border-[#14213D]/10 rounded-xl p-5 shadow-sm flex flex-col relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                        <Phone className="h-5 w-5 text-emerald-500 fill-current" />
                      </div>
                      <div>
                        <div className="text-[14px] font-bold text-[#14213D]">WhatsApp</div>
                        <div className="text-[11px] text-[#1F1F1F]/50 leading-snug mt-0.5">Send reminders and updates via WhatsApp.</div>
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md">
                          <CheckCircle2 className="h-3 w-3" /> Connected
                        </div>
                      </div>
                    </div>
                    {/* Toggle */}
                    <div className="w-10 h-5.5 bg-emerald-500 rounded-full relative cursor-pointer flex-shrink-0">
                      <div className="absolute right-0.5 top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                  
                  <div className="mt-4 mb-5">
                    <div className="text-[10px] font-medium text-[#1F1F1F]/50">Business Number</div>
                    <div className="text-[13px] font-bold text-[#14213D] mt-0.5">+92 300 1234567</div>
                  </div>
                  
                  <button className="mt-auto w-full h-9 flex items-center justify-center gap-2 border border-[#14213D]/10 rounded-lg text-[12px] font-bold text-[#14213D] hover:bg-gray-50 transition-colors">
                    <Settings className="h-4 w-4 text-[#1F1F1F]/50" /> Configure WhatsApp
                  </button>
                </div>

                {/* SMS Card */}
                <div className="bg-white border border-[#14213D]/10 rounded-xl p-5 shadow-sm flex flex-col relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                        <MessageCircle className="h-5 w-5 text-blue-500 fill-current" />
                      </div>
                      <div>
                        <div className="text-[14px] font-bold text-[#14213D]">SMS</div>
                        <div className="text-[11px] text-[#1F1F1F]/50 leading-snug mt-0.5">Send reminders via SMS.</div>
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md">
                          <CheckCircle2 className="h-3 w-3" /> Connected
                        </div>
                      </div>
                    </div>
                    {/* Toggle */}
                    <div className="w-10 h-5.5 bg-emerald-500 rounded-full relative cursor-pointer flex-shrink-0">
                      <div className="absolute right-0.5 top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                  
                  <div className="mt-4 mb-5">
                    <div className="text-[10px] font-medium text-[#1F1F1F]/50">Sender ID</div>
                    <div className="text-[13px] font-bold text-[#14213D] mt-0.5">NOORLAW</div>
                  </div>
                  
                  <button className="mt-auto w-full h-9 flex items-center justify-center gap-2 border border-[#14213D]/10 rounded-lg text-[12px] font-bold text-[#14213D] hover:bg-gray-50 transition-colors">
                    <Settings className="h-4 w-4 text-[#1F1F1F]/50" /> Configure SMS
                  </button>
                </div>

                {/* Email Card */}
                <div className="bg-white border border-[#14213D]/10 rounded-xl p-5 shadow-sm flex flex-col relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                        <Mail className="h-5 w-5 text-purple-500 fill-current" />
                      </div>
                      <div>
                        <div className="text-[14px] font-bold text-[#14213D]">Email</div>
                        <div className="text-[11px] text-[#1F1F1F]/50 leading-snug mt-0.5">Send reminders and updates via Email.</div>
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md">
                          <CheckCircle2 className="h-3 w-3" /> Connected
                        </div>
                      </div>
                    </div>
                    {/* Toggle */}
                    <div className="w-10 h-5.5 bg-emerald-500 rounded-full relative cursor-pointer flex-shrink-0">
                      <div className="absolute right-0.5 top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                  
                  <div className="mt-4 mb-5">
                    <div className="text-[10px] font-medium text-[#1F1F1F]/50">From Email</div>
                    <div className="text-[13px] font-bold text-[#14213D] mt-0.5 truncate">noorlawassociates@gmail.com</div>
                  </div>
                  
                  <button className="mt-auto w-full h-9 flex items-center justify-center gap-2 border border-[#14213D]/10 rounded-lg text-[12px] font-bold text-[#14213D] hover:bg-gray-50 transition-colors">
                    <Settings className="h-4 w-4 text-[#1F1F1F]/50" /> Configure Email
                  </button>
                </div>
              </div>

              {/* Global Settings */}
              <div className="mt-8">
                <h2 className="text-[16px] font-bold text-[#14213D] mb-4">Global Reminder Settings</h2>
                <div className="bg-white border border-[#14213D]/10 rounded-xl shadow-sm divide-y divide-[#14213D]/5">
                  <div className="p-5 flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                        <Calendar className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <div className="text-[14px] font-bold text-[#14213D]">Daily Update Reminder</div>
                        <div className="text-[12px] text-[#1F1F1F]/60 mt-0.5">Get a daily reminder to update today's hearings.</div>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer flex-shrink-0">
                      <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                        <Bell className="h-5 w-5 text-amber-500 fill-current" />
                      </div>
                      <div>
                        <div className="text-[14px] font-bold text-[#14213D]">Overdue Alert</div>
                        <div className="text-[12px] text-[#1F1F1F]/60 mt-0.5">Get notified about overdue hearings and pending updates.</div>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer flex-shrink-0">
                      <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                        <Clock className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <div className="text-[14px] font-bold text-[#14213D]">Quiet Hours</div>
                        <div className="text-[12px] text-[#1F1F1F]/60 mt-0.5">Do not send notifications between these hours.</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <select className="h-9 px-3 bg-white border border-[#14213D]/10 rounded-lg text-[12px] font-medium text-[#14213D] focus:outline-none focus:border-emerald-500">
                        <option>10:00 PM</option>
                      </select>
                      <span className="text-[12px] font-medium text-[#1F1F1F]/40">to</span>
                      <select className="h-9 px-3 bg-white border border-[#14213D]/10 rounded-lg text-[12px] font-medium text-[#14213D] focus:outline-none focus:border-emerald-500">
                        <option>07:00 AM</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Timings */}
          {activeTab === "timings" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-[13px] font-medium text-[#1F1F1F]/60">
                  Set when reminders should be sent before the hearing date.
                </div>
                <button className="h-9 px-4 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[12px] font-bold transition-colors shadow-sm">
                  <Plus className="h-4 w-4" /> Add Timing
                </button>
              </div>

              <div className="bg-white border border-[#14213D]/10 rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white border-b border-[#14213D]/10">
                      <th className="px-5 py-3 text-[11px] font-bold text-[#1F1F1F]/60 w-12">#</th>
                      <th className="px-5 py-3 text-[11px] font-bold text-[#1F1F1F]/60">Timing Name</th>
                      <th className="px-5 py-3 text-[11px] font-bold text-[#1F1F1F]/60">Send Before</th>
                      <th className="px-5 py-3 text-[11px] font-bold text-[#1F1F1F]/60">Time</th>
                      <th className="px-5 py-3 text-[11px] font-bold text-[#1F1F1F]/60">Channels</th>
                      <th className="px-5 py-3 text-[11px] font-bold text-[#1F1F1F]/60">Status</th>
                      <th className="px-5 py-3 text-[11px] font-bold text-[#1F1F1F]/60 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TIMINGS.map((row) => (
                      <tr key={row.id} className="border-b border-[#14213D]/5 hover:bg-gray-50/80 transition-all">
                        <td className="px-5 py-4 text-[12px] font-bold text-[#1F1F1F]/50">{row.id}</td>
                        <td className="px-5 py-4 text-[13px] font-bold text-[#14213D]">{row.name}</td>
                        <td className="px-5 py-4 text-[13px] font-medium text-[#1F1F1F]/70">{row.before}</td>
                        <td className="px-5 py-4 text-[13px] font-medium text-[#1F1F1F]/70">{row.time}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            {row.channels.includes("whatsapp") && <Phone className="h-4 w-4 text-emerald-500 fill-current" />}
                            {row.channels.includes("sms") && <MessageCircle className="h-4 w-4 text-blue-500 fill-current" />}
                            {row.channels.includes("email") && <Mail className="h-4 w-4 text-purple-500 fill-current" />}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          {row.status === "Active" ? (
                            <span className="inline-flex px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[11px] font-bold">
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex px-2 py-0.5 bg-gray-100 text-[#1F1F1F]/50 rounded text-[11px] font-bold">
                              Inactive
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="h-7 w-7 flex items-center justify-center rounded border border-[#14213D]/10 text-[#1F1F1F]/40 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-colors">
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button className="h-7 w-7 flex items-center justify-center rounded border border-[#14213D]/10 text-[#1F1F1F]/40 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-colors">
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex gap-3 text-[13px] text-blue-800">
                <Info className="h-5 w-5 shrink-0 text-blue-500" />
                <p className="font-medium">Reminders will be sent based on the <strong>Next Hearing Date</strong> saved in each case.</p>
              </div>
            </div>
          )}

          {/* TAB: Templates */}
          {activeTab === "templates" && (
            <div className="space-y-6">
              
              {/* Controls */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-bold text-[#14213D]">Select Channel:</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setActiveChannel("whatsapp")}
                      className={`h-9 px-4 flex items-center gap-2 rounded-lg text-[12px] font-bold transition-colors border ${
                        activeChannel === "whatsapp" 
                          ? "bg-emerald-50 border-emerald-200 text-emerald-600" 
                          : "bg-white border-[#14213D]/10 text-[#1F1F1F]/60 hover:bg-gray-50"
                      }`}
                    >
                      <Phone className="h-4 w-4" /> WhatsApp
                    </button>
                    <button 
                      onClick={() => setActiveChannel("sms")}
                      className={`h-9 px-4 flex items-center gap-2 rounded-lg text-[12px] font-bold transition-colors border ${
                        activeChannel === "sms" 
                          ? "bg-blue-50 border-blue-200 text-blue-600" 
                          : "bg-white border-[#14213D]/10 text-[#1F1F1F]/60 hover:bg-gray-50"
                      }`}
                    >
                      <MessageCircle className="h-4 w-4" /> SMS
                    </button>
                    <button 
                      onClick={() => setActiveChannel("email")}
                      className={`h-9 px-4 flex items-center gap-2 rounded-lg text-[12px] font-bold transition-colors border ${
                        activeChannel === "email" 
                          ? "bg-purple-50 border-purple-200 text-purple-600" 
                          : "bg-white border-[#14213D]/10 text-[#1F1F1F]/60 hover:bg-gray-50"
                      }`}
                    >
                      <Mail className="h-4 w-4" /> Email
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 flex items-center gap-3 justify-end">
                  <span className="text-[13px] font-bold text-[#14213D]">Select Template:</span>
                  <select className="h-9 px-3 w-64 bg-white border border-[#14213D]/10 rounded-lg text-[12px] font-medium text-[#14213D] focus:outline-none focus:border-emerald-500">
                    <option>Hearing Reminder (1 Day Before)</option>
                  </select>
                  <button className="h-9 px-4 flex items-center gap-2 bg-white border border-[#14213D]/10 hover:bg-gray-50 rounded-lg text-[12px] font-bold text-[#14213D] transition-colors shadow-sm">
                    <Plus className="h-4 w-4" /> Add Template
                  </button>
                </div>
              </div>

              {/* Template Editor Area */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Preview Panel */}
                <div className="lg:col-span-5 flex flex-col">
                  <h3 className="text-[14px] font-bold text-[#14213D] mb-3">Template Preview</h3>
                  <div className="flex-1 bg-[#efeae2] rounded-xl p-4 flex flex-col justify-end min-h-[320px]">
                    <div className="bg-[#e2f7cb] rounded-lg rounded-tl-none p-3 shadow-sm text-[13px] text-[#14213D] leading-relaxed max-w-[90%] whitespace-pre-wrap">
{`Assalamualaikum {client_name},

This is a reminder for the upcoming hearing in your case.

Case No: {case_number}
Case Title: {case_title}
Court: {court_name}
Next Hearing Date: {hearing_date}
Time: {hearing_time}

Please stay prepared.

Regards,
{firm_name}`}
                      <div className="text-[10px] text-right mt-1 opacity-60">10:30 AM ✓✓</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-4">
                    <button className="h-10 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[13px] font-bold transition-colors shadow-sm">
                      Save Template
                    </button>
                    <button className="h-10 px-6 flex items-center gap-2 text-emerald-600 hover:bg-emerald-50 rounded-lg text-[13px] font-bold transition-colors">
                      <RefreshCcw className="h-4 w-4" /> Reset to Default
                    </button>
                  </div>
                </div>

                {/* Variables List */}
                <div className="lg:col-span-3">
                  <h3 className="text-[14px] font-bold text-[#14213D] mb-3">Template Variables</h3>
                  <p className="text-[12px] text-[#1F1F1F]/60 mb-4">Use these variables in your template.</p>
                  <div className="space-y-3">
                    {VARIABLES.map((v) => (
                      <div key={v.tag} className="flex items-center gap-3 text-[12px]">
                        <div className="px-2 py-1 bg-emerald-50 text-emerald-700 font-mono rounded border border-emerald-100">
                          {v.tag}
                        </div>
                        <span className="font-medium text-[#1F1F1F]/70">{v.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Test Panel */}
                <div className="lg:col-span-4">
                  <div className="bg-white border border-[#14213D]/10 rounded-xl p-5 shadow-sm">
                    <h3 className="text-[15px] font-bold text-[#14213D] mb-2">Test Message</h3>
                    <p className="text-[12px] text-[#1F1F1F]/60 mb-6">Send test message to verify your template.</p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-bold text-[#1F1F1F]/50 mb-1.5 uppercase tracking-wide">
                          Send To (WhatsApp Number)
                        </label>
                        <div className="flex gap-2">
                          <select className="h-10 px-3 bg-gray-50 border border-[#14213D]/10 rounded-lg text-[13px] font-medium text-[#14213D] focus:outline-none focus:border-emerald-500 w-24">
                            <option>🇵🇰 +92</option>
                          </select>
                          <input 
                            type="text" 
                            defaultValue="300 1234567"
                            className="flex-1 h-10 px-3 bg-gray-50 border border-[#14213D]/10 rounded-lg text-[13px] font-medium text-[#14213D] focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>
                      
                      <button className="w-full h-10 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[13px] font-bold transition-colors shadow-sm">
                        <Send className="h-4 w-4" /> Send Test
                      </button>
                      
                      <div className="bg-amber-50/50 border border-amber-100 rounded-lg p-3 flex gap-2.5 text-[12px] text-amber-800">
                        <Lightbulb className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
                        <p><strong>Note:</strong> Test message will be sent instantly using the selected channel template.</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB: Log (Empty for now) */}
          {activeTab === "log" && (
             <div className="py-12 flex flex-col items-center justify-center text-center opacity-50">
               <Bell className="h-12 w-12 text-[#14213D] mb-4" />
               <p className="text-[14px] font-bold text-[#14213D]">No activity logged yet.</p>
             </div>
          )}

        </div>
      </div>
    </LawyerShell>
  );
}
