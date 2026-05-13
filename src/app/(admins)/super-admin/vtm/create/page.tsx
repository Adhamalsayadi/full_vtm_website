"use client";

import { useState } from "react";
import AdminSidebar from "@/components/shared/AdminSidebar";
import AdminHeader from "@/components/shared/AdminHeader";
import { ChevronRight, Image as ImageIcon, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateVtmPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <AdminSidebar role="SuperAdmin" />
      <div className="flex-1 flex flex-col min-w-0 font-sans">
        <AdminHeader role="SuperAdmin" />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-[1500px] mx-auto space-y-8">

<div className="flex items-center gap-2 text-[13px] font-bold lowercase">
              <Link href="/super-admin" className="text-[#333] capitalize">Dashboard</Link>
              <ChevronRight size={14} className="text-[#999]" />
              <Link href="/super-admin/vtm" className="text-[#333]">VTMs</Link>
              <ChevronRight size={14} className="text-[#999]" />
              <span className="text-[#999]">create admin account</span>
            </div>

<div className="bg-white rounded-[32px] border border-[#F2F4F7] shadow-sm p-14 mt-10">
               <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                    
                    <div className="relative group">
                       <label className="absolute -top-2.5 left-5 px-1.5 bg-white text-[11px] font-medium text-[#999] transition-all z-10">
                          Name
                       </label>
                       <input 
                         type="text" 
                         placeholder="Name"
                         className="w-full px-5 h-14 bg-white border border-[#EAECF0] rounded-xl text-[14px] font-medium text-[#1D1F24] outline-none"
                       />
                    </div>

<div className="relative group">
                       <input 
                         type="email" 
                         placeholder="Email"
                         className="w-full px-5 h-14 bg-white border border-[#EAECF0] rounded-xl text-[14px] font-medium text-[#1D1F24] outline-none"
                       />
                    </div>

<div className="grid grid-cols-[130px_1fr] gap-6">
                       <div className="relative">
                          <label className="absolute -top-2.5 left-5 px-1.5 bg-white text-[11px] font-medium text-[#999] transition-all z-10">
                             Mobile Code
                          </label>
                          <div className="relative">
                            <select className="w-full px-5 h-14 bg-white border border-[#EAECF0] rounded-xl text-[14px] font-medium text-[#1D1F24] outline-none appearance-none cursor-pointer">
                               <option>966</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
                          </div>
                       </div>
                       <div className="relative">
                          <input 
                            type="text" 
                            placeholder="Phone"
                            className="w-full px-5 h-14 bg-white border border-[#EAECF0] rounded-xl text-[14px] font-medium text-[#1D1F24] outline-none"
                          />
                       </div>
                    </div>

<div className="relative">
                       <div className="relative">
                         <select className="w-full px-5 h-14 bg-white border border-[#EAECF0] rounded-xl text-[14px] font-medium text-[#1D1F24] outline-none appearance-none cursor-pointer">
                            <option>Country</option>
                         </select>
                         <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
                       </div>
                    </div>
                  </div>

<div className="space-y-4">
                     <p className="text-[14px] font-bold text-[#1D1F24] lowercase">Image</p>
                     <div className="flex items-center gap-4 max-w-2xl">
                        <div className="text-[#999]">
                           <ImageIcon size={22} />
                        </div>
                        <div className="flex-1 flex items-center bg-white border border-[#EAECF0] rounded-xl h-14 overflow-hidden">
                           <div className="flex-1 px-4"></div>
                           <button type="button" className="h-full px-8 border-l border-[#EAECF0] text-[13px] font-medium text-[#333] hover:bg-[#F9FAFB] transition-all">
                              browse
                           </button>
                        </div>
                     </div>
                  </div>

<div className="flex gap-4 pt-10">
                     <button 
                       type="button"
                       onClick={() => router.back()}
                       className="px-10 py-3.5 bg-[#E0E2E7] text-[#1D1F24] rounded-xl text-[13px] font-black uppercase tracking-[0.1em] hover:bg-[#D4D6DC] transition-all"
                     >
                       CANCEL
                     </button>
                     <button 
                       type="submit"
                       className="px-10 py-3.5 bg-[#121111] text-white rounded-xl text-[13px] font-black uppercase tracking-[0.1em] hover:bg-black transition-all shadow-md"
                     >
                       CREATE
                     </button>
                  </div>

               </form>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
