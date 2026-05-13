"use client";

import { useState } from "react";
import AdminSidebar from "@/components/shared/AdminSidebar";
import AdminHeader from "@/components/shared/AdminHeader";
import { 
  Eye, 
  Image as ImageIcon 
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function AdminProfile() {
  const [activeTab, setActiveTab] = useState("user-info");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <AdminSidebar role="SuperAdmin" />
      <div className="flex-1 flex flex-col min-w-0 font-sans">
        <AdminHeader role="SuperAdmin" />

        <main className="flex-1 p-8">
          <div className="max-w-[1400px] mx-auto bg-white rounded-[32px] border border-[#F2F4F7] shadow-sm min-h-[800px] flex flex-col">

<div className="px-10 flex border-b border-[#F2F4F7]">
               <button 
                 onClick={() => setActiveTab("user-info")}
                 className={cn(
                   "py-8 text-[13px] font-black uppercase tracking-widest transition-all mr-10 border-b-4",
                   activeTab === "user-info" 
                     ? "text-[#121111] border-[#121111]" 
                     : "text-[#999] border-transparent hover:text-[#333]"
                 )}
               >
                 USER INFORMATION
               </button>
               <button 
                 onClick={() => setActiveTab("change-password")}
                 className={cn(
                   "py-8 text-[13px] font-black uppercase tracking-widest transition-all border-b-4",
                   activeTab === "change-password" 
                     ? "text-[#121111] border-[#121111]" 
                     : "text-[#999] border-transparent hover:text-[#333]"
                 )}
               >
                 CHANGE PASSWORD
               </button>
            </div>

            <div className="flex-1 p-10 pt-16">
               {activeTab === "user-info" ? (
                 <div className="max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <form className="space-y-10">
                       <div className="space-y-8">
                          
                          <div className="relative group">
                            <label className="absolute -top-3 left-4 bg-white px-2 text-[11px] font-medium text-[#999] group-focus-within:text-[#121111] transition-all tracking-tight">unique code</label>
                            <input 
                              type="text" 
                              defaultValue="KSA-ADM-24BRD20WQ" 
                              readOnly
                              className="w-full h-16 border border-[#EAECF0] rounded-xl px-6 text-[14px] font-medium text-[#333] bg-white outline-none cursor-default" 
                            />
                          </div>

<div className="relative group">
                            <label className="absolute -top-3 left-4 bg-white px-2 text-[11px] font-medium text-[#999] group-focus-within:text-[#121111] transition-all tracking-tight">Name</label>
                            <input 
                              type="text" 
                              defaultValue="Admin" 
                              className="w-full h-16 border border-[#EAECF0] rounded-xl px-6 text-[14px] font-medium text-[#333] outline-none focus:border-[#121111] transition-all" 
                            />
                          </div>

<div className="relative group w-full md:w-2/3">
                            <label className="absolute -top-3 left-4 bg-white px-2 text-[11px] font-medium text-[#999] group-focus-within:text-[#121111] transition-all tracking-tight">Email</label>
                            <input 
                              type="email" 
                              defaultValue="super_admin@gmail.com" 
                              className="w-full h-16 border border-[#EAECF0] rounded-xl px-6 text-[14px] font-medium text-[#333] outline-none focus:border-[#121111] transition-all" 
                            />
                          </div>

<div className="space-y-4">
                             <label className="text-[14px] font-bold text-[#333] lowercase">Image</label>
                             <div className="flex items-center gap-4">
                                <div className="text-[#999] w-10 flex justify-center">
                                   <ImageIcon size={22} />
                                </div>
                                <div className="flex-1 flex items-center border border-[#EAECF0] rounded-xl overflow-hidden h-16 bg-white">
                                   <div className="flex-1 px-4"></div>
                                   <button type="button" className="h-full px-6 border-l border-[#EAECF0] text-[13px] font-medium text-[#333] hover:bg-[#F9FAFB] transition-all">
                                      browse
                                   </button>
                                </div>
                             </div>
                          </div>
                       </div>

<div className="flex flex-col items-center py-10">
                          <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl ring-4 ring-[#F9FAFB]">
                              <Image 
                                src="/super_admin/Drop list.png" 
                                alt="Admin Avatar"
                                width={128}
                                height={128}
                                className="object-cover w-full h-full"
                              />
                          </div>
                       </div>

                       <div className="flex justify-end pt-10">
                          <button type="submit" className="bg-[#121111] text-white px-10 py-4.5 rounded-xl font-black text-[14px] uppercase tracking-[0.1em] hover:bg-black transition-all shadow-xl hover:shadow-black/20">
                             SAVE
                          </button>
                       </div>
                    </form>
                 </div>
               ) : (
                 <div className="max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <form className="space-y-10">
                       <div className="space-y-8">
                          
                          <div className="relative group">
                            <label className="absolute -top-3 left-4 bg-white px-2 text-[11px] font-medium text-[#999] group-focus-within:text-[#121111] transition-all tracking-tight">Old Password</label>
                            <div className="relative">
                               <input 
                                 type={showPassword ? "text" : "password"}
                                 placeholder="Old Password"
                                 className="w-full h-16 border border-[#EAECF0] rounded-xl px-6 pr-14 text-[14px] font-medium text-[#333] outline-none focus:border-[#121111] transition-all placeholder:text-[#CCC]" 
                               />
                               <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#333]">
                                 <Eye size={20} />
                               </button>
                            </div>
                          </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div className="relative group">
                                <label className="absolute -top-3 left-4 bg-white px-2 text-[11px] font-medium text-[#999] group-focus-within:text-[#121111] transition-all tracking-tight">New Password</label>
                                <div className="relative">
                                   <input 
                                     type={showPassword ? "text" : "password"}
                                     placeholder="New Password"
                                     className="w-full h-16 border border-[#EAECF0] rounded-xl px-6 pr-14 text-[14px] font-medium text-[#333] outline-none focus:border-[#121111] transition-all placeholder:text-[#CCC]" 
                                   />
                                   <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#333]">
                                     <Eye size={20} />
                                   </button>
                                </div>
                             </div>
                             <div className="relative group">
                                <label className="absolute -top-3 left-4 bg-white px-2 text-[11px] font-medium text-[#999] group-focus-within:text-[#121111] transition-all tracking-tight">Confirm Password</label>
                                <div className="relative">
                                   <input 
                                     type={showPassword ? "text" : "password"}
                                     placeholder="Confirm Password"
                                     className="w-full h-16 border border-[#EAECF0] rounded-xl px-6 pr-14 text-[14px] font-medium text-[#333] outline-none focus:border-[#121111] transition-all placeholder:text-[#CCC]" 
                                   />
                                   <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#333]">
                                     <Eye size={20} />
                                   </button>
                                </div>
                             </div>
                          </div>
                       </div>

                       <div className="flex justify-end pt-10">
                          <button type="submit" className="bg-[#121111] text-white px-10 py-4.5 rounded-xl font-black text-[14px] uppercase tracking-[0.1em] hover:bg-black transition-all shadow-xl hover:shadow-black/20">
                             UPDATE PASSWORD
                          </button>
                       </div>
                    </form>
                 </div>
               )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
