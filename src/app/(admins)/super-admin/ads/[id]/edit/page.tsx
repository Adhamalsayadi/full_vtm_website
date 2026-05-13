"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ChevronRight, ArrowLeft, Upload, Circle, Image as ImageIcon } from "lucide-react";
import AdminSidebar from "@/components/shared/AdminSidebar";
import AdminHeader from "@/components/shared/AdminHeader";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function EditAdPage() {
  const router = useRouter();
  const params = useParams();
  const [formData, setFormData] = useState({
    title: "Summer Sale",
    link: "https://example.com/summer-sale",
    image: "/ads/ad1.png",
    status: "active",
  });

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <AdminSidebar role="SuperAdmin" />
      <div className="flex-1 flex flex-col min-w-0 font-sans">
        <AdminHeader role="SuperAdmin" />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-[800px] mx-auto space-y-8">

<div className="flex items-center gap-2 text-[13px] font-medium text-[#999]">
              <Link href="/super-admin" className="hover:text-[#333]">Dashboard</Link>
              <ChevronRight size={14} />
              <Link href="/super-admin/ads" className="hover:text-[#333]">ads</Link>
              <ChevronRight size={14} />
              <span className="text-[#333]">edit ad</span>
            </div>

            <div className="bg-white rounded-[32px] shadow-sm border border-[#F2F4F7] overflow-hidden">
               <div className="p-10 border-b border-[#F2F4F7] flex items-center gap-4">
                  <button 
                    onClick={() => router.back()}
                    className="w-10 h-10 rounded-full border border-[#EAECF0] flex items-center justify-center text-[#999] hover:text-[#333] hover:bg-[#F9FAFB] transition-all"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <h1 className="text-[24px] font-bold text-[#1D1F24] lowercase leading-none translate-y-[-2px]">
                    edit ad
                  </h1>
               </div>

               <div className="p-10 space-y-8">
                  
                  <div className="space-y-3">
                    <label className="text-[14px] font-black text-[#1D1F24] lowercase tracking-tight">Ad Title</label>
                    <input 
                      type="text" 
                      placeholder="Ad title"
                      className="w-full h-14 bg-[#F9FAFB] border border-[#EAECF0] rounded-2xl px-6 text-sm font-bold text-[#1D1F24] outline-none focus:ring-2 focus:ring-[#1D1F24]/5 transition-all placeholder:text-[#999] lowercase"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </div>

<div className="space-y-3">
                    <label className="text-[14px] font-black text-[#1D1F24] lowercase tracking-tight">Redirect Link (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="https://..."
                      className="w-full h-14 bg-[#F9FAFB] border border-[#EAECF0] rounded-2xl px-6 text-sm font-bold text-[#1D1F24] outline-none focus:ring-2 focus:ring-[#1D1F24]/5 transition-all placeholder:text-[#999]"
                      value={formData.link}
                      onChange={(e) => setFormData({...formData, link: e.target.value})}
                    />
                  </div>

<div className="space-y-3">
                    <label className="text-[14px] font-black text-[#1D1F24] lowercase tracking-tight">AD IMAGE</label>
                    <div className="flex flex-col gap-6">
                      <div className="w-full h-48 bg-[#F9FAFB] border border-[#EAECF0] rounded-2xl flex items-center justify-center text-[#999] relative overflow-hidden shadow-sm">
                        {formData.image ? (
                          <>
                            <Image src={formData.image} alt="ad image" fill className="object-cover opacity-20" />
                            <div className="relative z-10 flex flex-col items-center gap-2">
                               <ImageIcon size={48} className="text-[#999]" />
                               <span className="text-xs font-bold">Image loaded: {formData.image}</span>
                            </div>
                          </>
                        ) : (
                          <ImageIcon size={48} />
                        )}
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="w-full h-20 bg-[#F9FAFB] border-2 border-dashed border-[#EAECF0] rounded-2xl flex flex-col items-center justify-center text-[#999] hover:bg-[#F2F4F7] transition-all cursor-pointer group">
                           <Upload size={16} className="text-[#1D1F24] mb-1" />
                           <span className="text-[12px] font-bold">change ad image</span>
                        </div>
                        <button className="text-[12px] font-black text-red-600 hover:text-red-700 uppercase tracking-widest pl-4">remove image</button>
                      </div>
                    </div>
                  </div>

<div className="flex items-center gap-3 py-2">
                     <button 
                       onClick={() => setFormData({...formData, status: formData.status === 'active' ? 'inactive' : 'active'})}
                       className={cn(
                         "w-12 h-6 rounded-full transition-all relative flex items-center px-1",
                         formData.status === 'active' ? "bg-[#1D1F24]" : "bg-[#EAECF0]"
                       )}
                     >
                        <div className={cn(
                          "w-4 h-4 bg-white rounded-full shadow-sm transition-all",
                          formData.status === 'active' ? "translate-x-6" : "translate-x-0"
                        )} />
                     </button>
                     <span className="text-sm font-bold text-[#1D1F24] lowercase" >Ad is active</span>
                  </div>

<div className="flex items-center justify-end gap-4 pt-6">
                    <button 
                      onClick={() => router.back()}
                      className="px-8 py-4 rounded-xl text-sm font-black text-[#999] hover:text-[#333] transition-colors uppercase tracking-widest"
                    >
                      Cancel
                    </button>
                    <button className="bg-[#121111] text-white px-10 py-4 rounded-xl text-sm font-black uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-all shadow-md">
                       Update 
                    </button>
                  </div>
               </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
