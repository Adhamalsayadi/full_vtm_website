"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ChevronRight, ArrowLeft, Upload } from "lucide-react";
import AdminSidebar from "@/components/shared/AdminSidebar";
import AdminHeader from "@/components/shared/AdminHeader";
import { cn } from "@/lib/utils";

export default function CreateSubCategoryPage() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
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
              <Link href="/super-admin/categories" className="hover:text-[#333]">categories</Link>
              <ChevronRight size={14} />
              <span className="text-[13px] hover:text-[#333] cursor-pointer" onClick={() => router.back()}>sub category</span>
              <ChevronRight size={14} />
              <span className="text-[#333]">create sub category</span>
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
                    create sub category
                  </h1>
               </div>

               <div className="p-10 space-y-10">
                  
                  <div className="space-y-3">
                    <label className="text-[14px] font-black text-[#1D1F24] lowercase tracking-tight">Sub Category Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter sub category name"
                      className="w-full h-14 bg-[#F9FAFB] border border-[#EAECF0] rounded-2xl px-6 text-sm font-bold text-[#1D1F24] outline-none focus:ring-2 focus:ring-[#1D1F24]/5 transition-all placeholder:text-[#999] lowercase"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

<div className="space-y-3">
                    <label className="text-[14px] font-black text-[#1D1F24] lowercase tracking-tight">ICON</label>
                    <div className="w-full h-40 bg-[#F9FAFB] border-2 border-dashed border-[#EAECF0] rounded-2xl flex flex-col items-center justify-center gap-3 text-[#999] hover:bg-[#F2F4F7] transition-all cursor-pointer group">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        <Upload size={20} className="text-[#1D1F24]" />
                      </div>
                      <span className="text-[13px] font-bold">click or drag to upload icon</span>
                    </div>
                  </div>

<div className="flex items-center justify-end gap-4 pt-6">
                    <button 
                      onClick={() => router.back()}
                      className="px-8 py-4 rounded-xl text-sm font-black text-[#999] hover:text-[#333] transition-colors uppercase tracking-widest"
                    >
                      Cancel
                    </button>
                    <button className="bg-[#121111] text-white px-10 py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all shadow-md hover:bg-black">
                       CREATE SUB CATEGORY
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
