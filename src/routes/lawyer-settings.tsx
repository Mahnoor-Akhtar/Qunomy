import { createFileRoute } from "@tanstack/react-router";
import LawyerShell from "../components/dashboard/LawyerShell";
import { useState, useEffect } from "react";
import { 
  User, 
  Lock, 
  CreditCard, 
  Camera, 
  Shield, 
  Database,
  Briefcase,
  Users,
  HardDrive,
  Send,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/lawyer-settings")({
  component: LawyerSettings,
});

function LawyerSettings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("qanomy_user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);
  const isMember = user?.email === "ijaz@gmail.com" || user?.email === "rizwan@gmail.com";

  const handleUpgradeRequest = () => {
    toast.success("Upgrade request sent successfully!", {
      description: "A notification has been sent to the Super Admin.",
    });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password changed successfully!");
  };

  return (
    <LawyerShell active="settings">
      <div className="flex flex-col space-y-6 max-w-[1000px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-[24px] font-bold text-[#14213D] tracking-tight">Settings</h1>
            <div className="text-[13px] font-medium text-[#1F1F1F]/60 mt-1">
              Manage your profile, security preferences, and subscription details.
            </div>
          </div>
        </div>

        {/* Settings Layout */}
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0 space-y-2">
            <button 
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold transition-all ${
                activeTab === "profile" 
                  ? "bg-white text-emerald-600 shadow-sm border border-[#14213D]/10" 
                  : "text-[#1F1F1F]/60 hover:bg-white/50 hover:text-[#14213D]"
              }`}
            >
              <User className="h-4 w-4" /> Personal Profile
            </button>
            <button 
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold transition-all ${
                activeTab === "security" 
                  ? "bg-white text-emerald-600 shadow-sm border border-[#14213D]/10" 
                  : "text-[#1F1F1F]/60 hover:bg-white/50 hover:text-[#14213D]"
              }`}
            >
              <Lock className="h-4 w-4" /> Security & Password
            </button>
            {/* Hide Subscription tab for Member */}
            {!isMember && (
              <button 
                onClick={() => setActiveTab("subscription")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold transition-all ${
                  activeTab === "subscription" 
                    ? "bg-white text-emerald-600 shadow-sm border border-[#14213D]/10" 
                    : "text-[#1F1F1F]/60 hover:bg-white/50 hover:text-[#14213D]"
                }`}
              >
                <CreditCard className="h-4 w-4" /> Subscription Usage
              </button>
            )}
          </div>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            
            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="bg-white border border-[#14213D]/10 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-[#14213D]/10 bg-gray-50/50">
                  <h2 className="text-[15px] font-bold text-[#14213D]">Personal Profile</h2>
                  <p className="text-[12px] text-[#1F1F1F]/50 mt-1">Update your personal information and contact details.</p>
                </div>
                
                <form onSubmit={handleSaveProfile} className="p-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-6 mb-8">
                    <div className="relative group">
                      <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-[24px] font-bold border-4 border-white shadow-sm overflow-hidden">
                        MA
                      </div>
                      <button type="button" className="absolute bottom-0 right-0 h-7 w-7 bg-white border border-[#14213D]/10 rounded-full flex items-center justify-center text-[#14213D] shadow-sm hover:bg-gray-50 transition-colors">
                        <Camera className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-[14px] font-bold text-[#14213D]">Profile Picture</h3>
                      <p className="text-[11px] text-[#1F1F1F]/50 mt-1">JPG, GIF or PNG. Max size of 800K</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-[12px] font-bold text-[#14213D] mb-2">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue="Muhammad Aslam"
                        className="w-full h-10 px-3 bg-white border border-[#14213D]/20 rounded-lg text-[13px] text-[#14213D] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-[#14213D] mb-2">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue="m.aslam@noorlaw.com"
                        className="w-full h-10 px-3 bg-gray-50 border border-[#14213D]/10 rounded-lg text-[13px] text-[#1F1F1F]/60 outline-none cursor-not-allowed"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-[#14213D] mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        defaultValue="+92 300 1234567"
                        className="w-full h-10 px-3 bg-white border border-[#14213D]/20 rounded-lg text-[13px] text-[#14213D] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-[#14213D] mb-2">Law Firm Name</label>
                      <input 
                        type="text" 
                        defaultValue="Noor Law Associates"
                        className="w-full h-10 px-3 bg-white border border-[#14213D]/20 rounded-lg text-[13px] text-[#14213D] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-[#14213D]/10">
                    <button type="submit" className="h-10 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[13px] font-bold transition-colors shadow-sm">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* SECURITY TAB */}
            {activeTab === "security" && (
              <div className="bg-white border border-[#14213D]/10 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-[#14213D]/10 bg-gray-50/50">
                  <h2 className="text-[15px] font-bold text-[#14213D] flex items-center gap-2">
                    <Shield className="h-4 w-4 text-emerald-600" /> Change Password
                  </h2>
                  <p className="text-[12px] text-[#1F1F1F]/50 mt-1">Ensure your account is using a long, random password to stay secure.</p>
                </div>
                
                <form onSubmit={handlePasswordChange} className="p-6 space-y-5">
                  <div>
                    <label className="block text-[12px] font-bold text-[#14213D] mb-2">Current Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full h-10 px-3 bg-white border border-[#14213D]/20 rounded-lg text-[13px] text-[#14213D] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all max-w-md"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#14213D] mb-2">New Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full h-10 px-3 bg-white border border-[#14213D]/20 rounded-lg text-[13px] text-[#14213D] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all max-w-md"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#14213D] mb-2">Confirm New Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full h-10 px-3 bg-white border border-[#14213D]/20 rounded-lg text-[13px] text-[#14213D] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all max-w-md"
                    />
                  </div>

                  <div className="flex justify-start pt-4">
                    <button type="submit" className="h-10 px-6 bg-[#14213D] hover:bg-black text-white rounded-lg text-[13px] font-bold transition-colors shadow-sm">
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* SUBSCRIPTION TAB */}
            {activeTab === "subscription" && (
              <div className="space-y-6">
                
                {/* Current Plan Card */}
                <div className="bg-gradient-to-br from-[#14213D] to-black rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Database className="h-32 w-32" />
                  </div>
                  <div className="relative z-10">
                    <div className="inline-flex px-2 py-1 bg-white/10 text-emerald-400 rounded text-[10px] font-bold uppercase tracking-wider mb-4 border border-white/10">
                      Current Plan
                    </div>
                    <h2 className="text-[28px] font-bold mb-1">Professional Plan</h2>
                    <p className="text-[13px] text-white/60 mb-6">Your plan renews on Oct 15, 2026. You are currently on an annual billing cycle.</p>
                    
                    <button 
                      onClick={handleUpgradeRequest}
                      className="h-10 px-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-[13px] font-bold transition-colors shadow-sm flex items-center gap-2"
                    >
                      <Send className="h-4 w-4" /> Request Plan Upgrade
                    </button>
                  </div>
                </div>

                {/* Usage Stats */}
                <div className="bg-white border border-[#14213D]/10 rounded-2xl shadow-sm overflow-hidden">
                  <div className="px-6 py-5 border-b border-[#14213D]/10 bg-gray-50/50 flex items-center justify-between">
                    <div>
                      <h2 className="text-[15px] font-bold text-[#14213D]">Subscription Usage</h2>
                      <p className="text-[12px] text-[#1F1F1F]/50 mt-1">Here is a breakdown of your current limits and usage.</p>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-8">
                    
                    {/* Cases Limit */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2 text-[14px] font-bold text-[#14213D]">
                          <Briefcase className="h-4 w-4 text-emerald-600" /> Active Cases
                        </div>
                        <div className="text-[13px] font-bold text-[#14213D]">
                          350 <span className="text-[#1F1F1F]/40 font-medium">/ 500</span>
                        </div>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                      <p className="text-[11px] text-[#1F1F1F]/50 mt-2">You have used 70% of your allowed active cases limit.</p>
                    </div>

                    {/* Clients Limit */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2 text-[14px] font-bold text-[#14213D]">
                          <Users className="h-4 w-4 text-blue-600" /> Total Clients
                        </div>
                        <div className="text-[13px] font-bold text-[#14213D]">
                          248 <span className="text-[#1F1F1F]/40 font-medium">/ 500</span>
                        </div>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '49.6%' }}></div>
                      </div>
                      <p className="text-[11px] text-[#1F1F1F]/50 mt-2">You have used 49.6% of your allowed clients limit.</p>
                    </div>

                    {/* Storage Limit */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2 text-[14px] font-bold text-[#14213D]">
                          <HardDrive className="h-4 w-4 text-amber-600" /> Storage Used
                        </div>
                        <div className="text-[13px] font-bold text-[#14213D]">
                          2.4 GB <span className="text-[#1F1F1F]/40 font-medium">/ 10 GB</span>
                        </div>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '24%' }}></div>
                      </div>
                      <p className="text-[11px] text-[#1F1F1F]/50 mt-2">You have plenty of space left for documents and attachments.</p>
                    </div>

                  </div>
                  
                  <div className="p-4 bg-amber-50 border-t border-amber-100 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[12px] font-bold text-amber-900">Need more capacity?</h4>
                      <p className="text-[11px] text-amber-700 mt-0.5">If you are reaching your limits, you can request an upgrade to your subscription plan. The Super Admin will review and process your request.</p>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      </div>
    </LawyerShell>
  );
}
