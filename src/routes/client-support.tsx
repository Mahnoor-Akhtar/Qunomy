import { createFileRoute } from "@tanstack/react-router";
import ClientShell from "../components/dashboard/ClientShell";
import { LifeBuoy, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/client-support")({
  component: ClientSupport,
});

function ClientSupport() {
  return (
    <ClientShell active="support">
      <div className="flex flex-col h-full max-w-[1000px] mx-auto pb-10">
        
        <div className="flex justify-between items-center shrink-0 mt-2 mb-6">
          <div>
            <h1 className="text-[28px] font-bold text-[#14213D] leading-tight" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              Help & Support
            </h1>
            <div className="text-[13px] text-[#1F1F1F]/60 mt-1 font-medium">
              Get in touch with Qunomy Support or your Legal Firm.
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white border border-[#14213D]/10 rounded-2xl p-8 shadow-sm flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6">
              <LifeBuoy className="h-8 w-8" />
            </div>
            <h2 className="text-[20px] font-bold text-[#14213D] mb-2">Need Technical Help?</h2>
            <p className="text-[13px] text-[#1F1F1F]/60 mb-8 max-w-[300px]">
              Having trouble using the portal? Contact the Qunomy technical support team.
            </p>
            <button className="w-full max-w-[240px] h-12 flex items-center justify-center gap-2 bg-[#14213D] text-white rounded-xl text-[14px] font-bold hover:bg-black transition-colors shadow-sm">
              <Mail className="h-4 w-4" /> Contact Support
            </button>
          </div>

          <div className="bg-[#B8860B]/5 border border-[#B8860B]/20 rounded-2xl p-8 shadow-sm flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <LifeBuoy className="h-32 w-32 text-[#B8860B]" />
            </div>
            
            <h2 className="text-[20px] font-bold text-[#14213D] mb-6 relative z-10">Your Law Firm</h2>
            
            <div className="space-y-5 relative z-10">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-[#B8860B] shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#1F1F1F]/50 uppercase tracking-wider mb-0.5">Address</div>
                  <div className="text-[13px] font-bold text-[#14213D]">123 Legal Avenue, Block B</div>
                  <div className="text-[12px] text-[#1F1F1F]/60">Lahore, Pakistan</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-[#B8860B] shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#1F1F1F]/50 uppercase tracking-wider mb-0.5">Phone</div>
                  <div className="text-[13px] font-bold text-[#14213D]">+92 42 111 222 333</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-[#B8860B] shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#1F1F1F]/50 uppercase tracking-wider mb-0.5">Email</div>
                  <div className="text-[13px] font-bold text-[#14213D]">contact@legal-firm.com</div>
                </div>
              </div>
            </div>

            <div className="mt-8 relative z-10">
              <button className="flex items-center gap-2 text-[13px] font-bold text-[#B8860B] hover:text-[#14213D] transition-colors">
                Visit Firm Website <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </ClientShell>
  );
}
