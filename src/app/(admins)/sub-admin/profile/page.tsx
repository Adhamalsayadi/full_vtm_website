"use client";

import { useState } from "react";
import AdminSidebar from "@/components/shared/AdminSidebar";
import AdminHeader from "@/components/shared/AdminHeader";
import { 
  User, 
  Mail, 
  Phone, 
  Camera, 
  Save, 
  ShieldCheck,
  ChevronRight,
  MapPin,
  Lock,
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SubAdminProfile() {
  const [activeTab, setActiveTab] = useState("basic");
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <AdminSidebar role="SubAdmin" />
      <div className="flex-1 flex flex-col min-w-0 font-sans">
        <AdminHeader role="SubAdmin" />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-[1200px] mx-auto">
            
            <div className="flex items-center gap-2 text-[13px] font-bold text-[#999] mb-8">
              <Link href="/sub-admin" className="hover:text-[#333]">Dashboard</Link>
              <ChevronRight size={14} />
              <span className="text-[#333]">Account management</span>
            </div>

            <h1 className="text-[28px] font-black text-[#1D1F24] mb-10 tracking-tight lowercase">Account management</h1>

            <div className="flex flex-col lg:flex-row gap-12">
               
               <aside className="w-full lg:w-72 shrink-0 space-y-3">
                  <button 
                    onClick={() => setActiveTab("basic")}
                    className={cn(
                      "w-full flex items-center gap-4 px-6 py-5 rounded-2xl text-[14px] font-black transition-all border-2 lowercase tracking-tight",
                      activeTab === "basic" 
                        ? "bg-white text-[#1D1F24] shadow-md border-transparent ring-1 ring-black/5" 
                        : "text-[#999] hover:text-[#333] border-transparent"
                    )}
                  >
                    <User size={20} className={activeTab === "basic" ? "text-[#1D1F24]" : "text-[#999]"} />
                    <span>Basic info</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("security")}
                    className={cn(
                      "w-full flex items-center gap-4 px-6 py-5 rounded-2xl text-[14px] font-black transition-all border-2 lowercase tracking-tight",
                      activeTab === "security" 
                        ? "bg-white text-[#1D1F24] shadow-md border-transparent ring-1 ring-black/5" 
                        : "text-[#999] hover:text-[#333] border-transparent"
                    )}
                  >
                    <Lock size={20} className={activeTab === "security" ? "text-[#1D1F24]" : "text-[#999]"} />
                    <span>change password</span>
                  </button>
               </aside>

<div className="flex-1">
                  {activeTab === "basic" ? (
                    <div className="bg-white rounded-[40px] shadow-sm border border-[#EAECF0] p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                       <div className="flex flex-col items-center mb-16">
                          <div className="relative group">
                             <div className="w-40 h-40 rounded-full bg-[#1D1F24] flex items-center justify-center text-white text-[56px] font-black border-[6px] border-[#F9FAFB] overflow-hidden shadow-inner ring-1 ring-black/5">
                                V
                             </div>
                             <button className="absolute bottom-2 right-2 bg-white p-3 rounded-full shadow-xl border border-[#EAECF0] text-[#1D1F24] hover:bg-[#F9FAFB] hover:scale-110 transition-all z-10">
                                <Camera size={20} />
                             </button>
                             <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/10 transition-all cursor-pointer ring-inset ring-1 ring-black/5" />
                          </div>
                          <h2 className="mt-6 text-[18px] font-black text-[#1D1F24] lowercase">Compliance Controller</h2>
                          <p className="text-[13px] font-medium text-[#999] lowercase">Regional Operations (Middle East)</p>
                       </div>

                       <form className="space-y-10 max-w-4xl mx-auto">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                             
                             <div className="space-y-2.5">
                                <label className="text-[14px] font-black text-[#1D1F24] lowercase tracking-tight ml-1">FULL NAME</label>
                                <input type="text" defaultValue="Abdullah Controller" className="w-full h-14 bg-[#F9FAFB] border border-[#EAECF0] rounded-2xl px-6 text-sm font-bold text-[#1D1F24] outline-none focus:ring-2 focus:ring-[#1D1F24]/5 focus:border-[#1D1F24] transition-all" />
                             </div>
                             
                             <div className="space-y-2.5">
                                <label className="text-[14px] font-black text-[#1D1F24] lowercase tracking-tight ml-1">WORK EMAIL</label>
                                <input type="email" defaultValue="vtm.support@vnt.com" className="w-full h-14 bg-[#F9FAFB] border border-[#EAECF0] rounded-2xl px-6 text-sm font-bold text-[#1D1F24] outline-none focus:ring-2 focus:ring-[#1D1F24]/5 focus:border-[#1D1F24] transition-all" />
                             </div>
                             
                             <div className="space-y-2.5">
                                <label className="text-[14px] font-black text-[#1D1F24] lowercase tracking-tight ml-1">REGION ASSIGNMENT</label>
                                <input type="text" defaultValue="Middle East (KSA/UAE)" disabled className="w-full h-14 bg-[#F9FAFB] border border-[#EAECF0] rounded-2xl px-6 text-sm font-bold text-[#1D1F24] opacity-60" />
                             </div>
                             
                             <div className="space-y-2.5">
                                <label className="text-[14px] font-black text-[#1D1F24] lowercase tracking-tight ml-1">STAFF ID</label>
                                <div className="w-full h-14 bg-[#F9FAFB] border border-[#EAECF0] rounded-2xl px-6 flex items-center text-sm font-black text-[#1D1F24] uppercase tracking-widest">
                                   VTM-2026-X842
                                </div>
                             </div>
                          </div>

                          <div className="flex justify-end pt-10 border-t border-[#F2F4F7]">
                             <button type="submit" className="bg-[#121111] text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl hover:shadow-black/10 active:scale-[0.98]">
                               Save changes
                             </button>
                          </div>
                       </form>
                    </div>
                  ) : (
                    <div className="bg-white rounded-[40px] shadow-sm border border-[#EAECF0] p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                       <div className="mb-12">
                          <h2 className="text-[20px] font-black text-[#1D1F24] lowercase tracking-tight">change password</h2>
                          <p className="text-[13px] font-medium text-[#999] lowercase mt-1">Update your account security credentials</p>
                       </div>

                       <form className="space-y-10 max-w-2xl">
                          <div className="space-y-2.5">
                             <label className="text-[14px] font-black text-[#1D1F24] lowercase tracking-tight ml-1">Old Password</label>
                             <input type="password" placeholder="••••••••" className="w-full h-14 bg-[#F9FAFB] border border-[#EAECF0] rounded-2xl px-6 text-sm font-bold text-[#1D1F24] outline-none focus:ring-2 focus:ring-[#1D1F24]/5 focus:border-[#1D1F24] transition-all placeholder:text-[#CCC]" />
                          </div>
                          <div className="space-y-2.5">
                             <label className="text-[14px] font-black text-[#1D1F24] lowercase tracking-tight ml-1">New Password</label>
                             <input type="password" placeholder="••••••••" className="w-full h-14 bg-[#F9FAFB] border border-[#EAECF0] rounded-2xl px-6 text-sm font-bold text-[#1D1F24] outline-none focus:ring-2 focus:ring-[#1D1F24]/5 focus:border-[#1D1F24] transition-all placeholder:text-[#CCC]" />
                          </div>
                          <div className="space-y-2.5">
                             <label className="text-[14px] font-black text-[#1D1F24] lowercase tracking-tight ml-1">Repeat Password</label>
                             <input type="password" placeholder="••••••••" className="w-full h-14 bg-[#F9FAFB] border border-[#EAECF0] rounded-2xl px-6 text-sm font-bold text-[#1D1F24] outline-none focus:ring-2 focus:ring-[#1D1F24]/5 focus:border-[#1D1F24] transition-all placeholder:text-[#CCC]" />
                          </div>

                          <div className="flex justify-end pt-10 border-t border-[#F2F4F7]">
                             <button type="submit" className="bg-[#121111] text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl hover:shadow-black/10 active:scale-[0.98]">
                               Save changes
                             </button>
                          </div>
                       </form>
                    </div>
                  )}
               </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
