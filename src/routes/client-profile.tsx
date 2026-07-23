import { createFileRoute } from "@tanstack/react-router";
import ClientShell from "../components/dashboard/ClientShell";
import { User, Mail, Phone, Bell, Shield, Smartphone, MessageSquare } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/client-profile")({
  component: ClientProfile,
});

function ClientProfile() {
  const [activeTab, setActiveTab] = useState("personal");
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    whatsapp: true
  });

  return (
    <ClientShell active="profile">
      <div className="flex flex-col h-full max-w-[1000px] mx-auto pb-10">
        
        <div className="flex justify-between items-center shrink-0 mt-2 mb-6">
          <div>
            <h1 className="text-[28px] font-bold text-[#14213D] leading-tight" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              My Profile
            </h1>
            <div className="text-[13px] text-[#1F1F1F]/60 mt-1 font-medium">
              Manage your personal information and notification preferences.
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Sidebar Navigation */}
          <div className="w-full md:w-[240px] shrink-0 space-y-1">
            <button 
              onClick={() => setActiveTab("personal")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold transition-all ${
                activeTab === "personal" ? "bg-[#B8860B]/10 text-[#B8860B]" : "text-[#1F1F1F]/60 hover:bg-gray-50"
              }`}
            >
              <User className="h-4 w-4" /> Personal Info
            </button>
            <button 
              onClick={() => setActiveTab("notifications")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold transition-all ${
                activeTab === "notifications" ? "bg-[#B8860B]/10 text-[#B8860B]" : "text-[#1F1F1F]/60 hover:bg-gray-50"
              }`}
            >
              <Bell className="h-4 w-4" /> Notifications
            </button>
            <button 
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold transition-all ${
                activeTab === "security" ? "bg-[#B8860B]/10 text-[#B8860B]" : "text-[#1F1F1F]/60 hover:bg-gray-50"
              }`}
            >
              <Shield className="h-4 w-4" /> Security
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            
            {activeTab === "personal" && (
              <div className="bg-white border border-[#14213D]/10 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-[#14213D]/10">
                  <h2 className="text-[18px] font-bold text-[#14213D]">Personal Information</h2>
                  <p className="text-[12px] text-[#1F1F1F]/50 mt-1">Update your basic profile details.</p>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-6 pb-6 border-b border-[#14213D]/10">
                    <div className="h-20 w-20 rounded-full bg-[#14213D] text-white flex items-center justify-center text-[24px] font-bold shadow-inner">
                      R
                    </div>
                    <div>
                      <button className="px-4 py-2 border border-[#14213D]/10 rounded-lg text-[12px] font-bold text-[#14213D] hover:bg-gray-50 transition-colors shadow-sm">
                        Change Avatar
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] font-bold text-[#14213D] mb-1.5">Full Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-4 w-4 text-[#1F1F1F]/40" />
                        </div>
                        <input type="text" defaultValue="Rizwan" className="w-full pl-9 pr-3 h-10 bg-white border border-[#14213D]/15 rounded-lg text-[13px] font-medium text-[#14213D] focus:outline-none focus:border-[#B8860B] transition-colors" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#14213D] mb-1.5">Email Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-4 w-4 text-[#1F1F1F]/40" />
                        </div>
                        <input type="email" defaultValue="Rizwan@gmail.com" className="w-full pl-9 pr-3 h-10 bg-gray-50 border border-[#14213D]/15 rounded-lg text-[13px] font-medium text-[#14213D] focus:outline-none focus:border-[#B8860B] transition-colors cursor-not-allowed" disabled />
                      </div>
                      <div className="text-[10px] text-[#1F1F1F]/50 mt-1">Contact support to change your email.</div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#14213D] mb-1.5">Phone Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-4 w-4 text-[#1F1F1F]/40" />
                        </div>
                        <input type="tel" defaultValue="+92 300 1234567" className="w-full pl-9 pr-3 h-10 bg-white border border-[#14213D]/15 rounded-lg text-[13px] font-medium text-[#14213D] focus:outline-none focus:border-[#B8860B] transition-colors" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button className="px-6 py-2.5 bg-[#B8860B] hover:bg-[#14213D] text-white rounded-xl text-[13px] font-bold shadow-sm transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="bg-white border border-[#14213D]/10 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-[#14213D]/10">
                  <h2 className="text-[18px] font-bold text-[#14213D]">Notification Preferences</h2>
                  <p className="text-[12px] text-[#1F1F1F]/50 mt-1">Choose how you want to receive updates about your cases.</p>
                </div>
                
                <div className="p-6 space-y-6">
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-[14px] font-bold text-[#14213D]">Email Notifications</div>
                        <div className="text-[12px] text-[#1F1F1F]/50 mt-0.5">Receive hearing dates and document alerts via email.</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setNotifications({...notifications, email: !notifications.email})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.email ? 'bg-emerald-500' : 'bg-gray-200'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.email ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-[14px] font-bold text-[#14213D]">WhatsApp Notifications</div>
                        <div className="text-[12px] text-[#1F1F1F]/50 mt-0.5">Get instant alerts on your WhatsApp number.</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setNotifications({...notifications, whatsapp: !notifications.whatsapp})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.whatsapp ? 'bg-emerald-500' : 'bg-gray-200'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.whatsapp ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        <Smartphone className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-[14px] font-bold text-[#14213D]">SMS Alerts</div>
                        <div className="text-[12px] text-[#1F1F1F]/50 mt-0.5">Standard text messages for important reminders.</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setNotifications({...notifications, sms: !notifications.sms})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.sms ? 'bg-emerald-500' : 'bg-gray-200'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.sms ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="bg-white border border-[#14213D]/10 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-[#14213D]/10">
                  <h2 className="text-[18px] font-bold text-[#14213D]">Security</h2>
                  <p className="text-[12px] text-[#1F1F1F]/50 mt-1">Manage your password.</p>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 gap-6 max-w-sm">
                    <div>
                      <label className="block text-[11px] font-bold text-[#14213D] mb-1.5">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-3 h-10 bg-white border border-[#14213D]/15 rounded-lg text-[13px] font-medium text-[#14213D] focus:outline-none focus:border-[#B8860B] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#14213D] mb-1.5">New Password</label>
                      <input type="password" placeholder="Create new password" className="w-full px-3 h-10 bg-white border border-[#14213D]/15 rounded-lg text-[13px] font-medium text-[#14213D] focus:outline-none focus:border-[#B8860B] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#14213D] mb-1.5">Confirm New Password</label>
                      <input type="password" placeholder="Confirm new password" className="w-full px-3 h-10 bg-white border border-[#14213D]/15 rounded-lg text-[13px] font-medium text-[#14213D] focus:outline-none focus:border-[#B8860B] transition-colors" />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button className="px-6 py-2.5 bg-[#14213D] hover:bg-black text-white rounded-xl text-[13px] font-bold shadow-sm transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </ClientShell>
  );
}
