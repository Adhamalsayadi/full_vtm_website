"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { ChevronRight, ArrowLeft, Upload, EyeOff } from "lucide-react";
import AdminSidebar from "@/components/shared/AdminSidebar";
import AdminHeader from "@/components/shared/AdminHeader";
import { cn } from "@/lib/utils";
import { ConfirmationModal } from "@/components/shared/Modals";

export default function EditCountryPage() {
  const router = useRouter();
  const { id } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "Kingdom Of Saudi Arabia",
    code: "KSA",
    isActive: true,
  });

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <AdminSidebar role="SuperAdmin" />
      <div className="flex-1 flex flex-col min-w-0 font-sans">
        <AdminHeader role="SuperAdmin" />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-[800px] mx-auto space-y-8">
            
            <div className="flex items-center gap-2 text-[13px] font-medium text-[#999]">
              <Link href="/super-admin" className="hover:text-[#333]">
                Dashboard
              </Link>
              <ChevronRight size={14} />
              <Link href="/super-admin/countries" className="hover:text-[#333]">
                countries
              </Link>
              <ChevronRight size={14} />
              <span className="text-[#333]">edit country</span>
            </div>

            <div className="bg-white rounded-[32px] shadow-sm border border-[#F2F4F7] overflow-hidden">
              <div className="p-10 border-b border-[#F2F4F7] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => router.back()}
                    className="w-10 h-10 rounded-full border border-[#EAECF0] flex items-center justify-center text-[#999] hover:text-[#333] hover:bg-[#F9FAFB] transition-all"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <h1 className="text-[24px] font-bold text-[#1D1F24] lowercase leading-none translate-y-[-2px]">
                    edit country
                  </h1>
                </div>
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="w-10 h-10 rounded-full border border-[#EAECF0] flex items-center justify-center text-[#999] hover:text-black transition-all"
                  title="Hide"
                >
                  <EyeOff size={18} />
                </button>
              </div>

              <div className="p-10 space-y-8">
                
                <div className="space-y-3">
                  <label className="text-[14px] font-black text-[#1D1F24] lowercase tracking-tight">
                    Country Name
                  </label>
                  <input
                    type="text"
                    placeholder="Country name"
                    className="w-full h-14 bg-[#F9FAFB] border border-[#EAECF0] rounded-2xl px-6 text-sm font-bold text-[#1D1F24] outline-none focus:ring-2 focus:ring-[#1D1F24]/5 transition-all placeholder:text-[#999] lowercase"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

<div className="space-y-3">
                  <label className="text-[14px] font-black text-[#1D1F24] lowercase tracking-tight">
                    Country Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. KSA, BH, etc."
                    className="w-full h-14 bg-[#F9FAFB] border border-[#EAECF0] rounded-2xl px-6 text-sm font-bold text-[#1D1F24] outline-none focus:ring-2 focus:ring-[#1D1F24]/5 transition-all placeholder:text-[#999] uppercase"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                  />
                </div>

<div className="space-y-3">
                  <label className="text-[14px] font-black text-[#1D1F24] lowercase tracking-tight">
                    FLAG IMAGE
                  </label>
                  <div className="w-full h-40 bg-[#F9FAFB] border-2 border-dashed border-[#EAECF0] rounded-2xl flex flex-col items-center justify-center gap-3 text-[#999] hover:bg-[#F2F4F7] transition-all cursor-pointer group relative overflow-hidden">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform z-10">
                      <Upload size={20} className="text-[#1D1F24]" />
                    </div>
                    <span className="text-[13px] font-bold z-10">
                      change flag image
                    </span>
                    
                    <div className="absolute inset-0 bg-[#F2F4F7] flex items-center justify-center">
                      <div className="w-32 h-20 relative rounded shadow-lg border border-white">
                        <Image
                          src="/Saudi_flag.png"
                          alt="Current Flag"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>

<div className="flex items-center gap-3 py-2">
                  <button
                    onClick={() =>
                      setFormData({ ...formData, isActive: !formData.isActive })
                    }
                    className={cn(
                      "w-12 h-6 rounded-full transition-all relative flex items-center px-1",
                      formData.isActive ? "bg-[#1D1F24]" : "bg-[#EAECF0]",
                    )}
                  >
                    <div
                      className={cn(
                        "w-4 h-4 bg-white rounded-full shadow-sm transition-all",
                        formData.isActive ? "translate-x-6" : "translate-x-0",
                      )}
                    />
                  </button>
                  <span className="text-sm font-bold text-[#1D1F24] lowercase">
                    country is active
                  </span>
                </div>

<div className="flex items-center justify-end gap-4 pt-6">
                  <button
                    onClick={() => router.back()}
                    className="px-8 py-4 rounded-xl text-sm font-black text-[#999] hover:text-[#333] transition-colors uppercase tracking-widest"
                  >
                    Cancel
                  </button>
                  <button className="bg-[#121111] text-white px-10 py-4 rounded-xl text-sm font-black uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-all shadow-md">
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
            console.log("Hiding country:", id);
            router.push("/super-admin/countries");
          }}
          title="Hide Country"
          message="Are you sure you want to hide this country? It will no longer be visible in selection lists."
          confirmText="Hide"
        />
      </div>
    </div>
  );
}
