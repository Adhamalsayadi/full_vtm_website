"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ChevronRight, ArrowLeft, Eye, EyeOff, Trash2 } from "lucide-react";
import AdminSidebar from "@/components/shared/AdminSidebar";
import AdminHeader from "@/components/shared/AdminHeader";
import { cn } from "@/lib/utils";
import { ConfirmationModal } from "@/components/shared/Modals";

export default function EditVtmPage() {
  const router = useRouter();
  const { id } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "Suleman Mohamed",
    email: "suleman@vnt.com",
    role: "vtm controller",
    phone: "+966 50 123 4567",
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
              <Link href="/super-admin/vtm" className="hover:text-[#333]">vtm</Link>
              <ChevronRight size={14} />
              <span className="text-[#333]">edit account</span>
            </div>

            <div className="bg-white rounded-[32px] shadow-sm border border-[#F2F4F7] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="p-10 border-b border-[#F2F4F7] flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => router.back()}
                      className="w-10 h-10 rounded-full border border-[#EAECF0] flex items-center justify-center text-[#999] hover:text-[#333] hover:bg-[#F9FAFB] transition-all"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <h1 className="text-[24px] font-bold text-[#1D1F24] lowercase leading-none translate-y-[-2px]">
                      edit account
                    </h1>
                  </div>
                  <button 
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="w-10 h-10 rounded-full border border-red-100 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
               </div>

               <div className="p-10 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                     
                     <div className="space-y-3">
                       <label className="text-[14px] font-black text-[#1D1F24] lowercase tracking-tight ml-1">Full Name</label>
                       <input 
                         type="text" 
                         className="w-full h-14 bg-[#F9FAFB] border border-[#EAECF0] rounded-2xl px-6 text-sm font-bold text-[#1D1F24] outline-none focus:ring-2 focus:ring-[#1D1F24]/5 transition-all"
                         value={formData.name}
                         onChange={(e) => setFormData({...formData, name: e.target.value})}
                       />
                     </div>

<div className="space-y-3">
                       <label className="text-[14px] font-black text-[#1D1F24] lowercase tracking-tight ml-1">Email</label>
                       <input 
                         type="email" 
                         className="w-full h-14 bg-[#F9FAFB] border border-[#EAECF0] rounded-2xl px-6 text-sm font-bold text-[#1D1F24] outline-none focus:ring-2 focus:ring-[#1D1F24]/5 transition-all"
                         value={formData.email}
                         onChange={(e) => setFormData({...formData, email: e.target.value})}
                       />
                     </div>

<div className="space-y-3">
                       <label className="text-[14px] font-black text-[#1D1F24] lowercase tracking-tight ml-1">Change Password</label>
                       <div className="relative">
                          <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Leave blank to keep current"
                            className="w-full h-14 bg-[#F9FAFB] border border-[#EAECF0] rounded-2xl px-6 text-sm font-bold text-[#1D1F24] outline-none focus:ring-2 focus:ring-[#1D1F24]/5 transition-all placeholder:text-[#BBB]"
                          />
                          <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#333] transition-colors"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                       </div>
                     </div>

<div className="space-y-3">
                       <label className="text-[14px] font-black text-[#1D1F24] lowercase tracking-tight ml-1">Role / Segment</label>
                       <select 
                         className="w-full h-14 bg-[#F9FAFB] border border-[#EAECF0] rounded-2xl px-6 text-sm font-bold text-[#1D1F24] outline-none appearance-none lowercase"
                         value={formData.role}
                         onChange={(e) => setFormData({...formData, role: e.target.value})}
                       >
                          <option value="vtm controller">VTM Controller</option>
                          <option value="support">Support</option>
                       </select>
                     </div>

<div className="space-y-3 md:col-span-2">
                       <label className="text-[14px] font-black text-[#1D1F24] lowercase tracking-tight ml-1">Phone Number</label>
                       <input 
                         type="text" 
                         className="w-full h-14 bg-[#F9FAFB] border border-[#EAECF0] rounded-2xl px-6 text-sm font-bold text-[#1D1F24] outline-none focus:ring-2 focus:ring-[#1D1F24]/5 transition-all"
                         value={formData.phone}
                         onChange={(e) => setFormData({...formData, phone: e.target.value})}
                       />
                     </div>
                  </div>

<div className="flex items-center justify-end gap-4 pt-10 border-t border-[#F2F4F7]">
                    <button 
                      onClick={() => router.back()}
                      className="px-8 py-4 rounded-xl text-sm font-black text-[#999] hover:text-[#333] transition-colors uppercase tracking-widest"
                    >
                      Cancel
                    </button>
                    <button className="bg-[#121111] text-white px-12 py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all shadow-xl hover:shadow-black/10 active:scale-[0.98]">
                       Save Updates
                    </button>
                  </div>
               </div>
            </div>
          </div>
        </main>

        <ConfirmationModal 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            console.log("Deleting VTM:", id);
            router.push("/super-admin/vtm");
          }}
          title="Delete Account"
          message={`Are you sure you want to delete this account? This action cannot be undone.`}
        />
      </div>
    </div>
  );
}
