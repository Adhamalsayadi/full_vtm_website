"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ChevronRight, ArrowLeft, Trash2, Pencil, Globe, Mail, Phone, User, Building2, MapPin } from "lucide-react";
import AdminSidebar from "@/components/shared/AdminSidebar";
import AdminHeader from "@/components/shared/AdminHeader";
import { cn } from "@/lib/utils";
import { ConfirmationModal } from "@/components/shared/Modals";
import EditStatusModal from "@/components/shared/EditStatusModal";

export default function ClientDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  
  const TABS = [
    "USER INFORMATION",
    "COMPANY INFORMATION",
    "CONTACT US WITH (DIRECTOR)",
    "CONTACT US WITH (FINANCIAL)",
  ];
  
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <AdminSidebar role="SuperAdmin" />
      <div className="flex-1 flex flex-col min-w-0 font-sans">
        <AdminHeader role="SuperAdmin" />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-[1400px] mx-auto space-y-8">

<div className="flex items-center gap-2 text-[13px] font-medium text-[#999] mb-8">
              <Link href="/super-admin" className="hover:text-[#333]">Dashboard</Link>
              <ChevronRight size={14} />
              <Link href="/super-admin/clients" className="hover:text-[#333]">clients</Link>
              <ChevronRight size={14} />
              <span className="text-[#333]">Company name test</span>
            </div>

            <div className="bg-white rounded-[16px] shadow-sm border border-[#F2F4F7] overflow-hidden flex min-h-[500px]">
               
               <div className="w-[300px] border-r border-[#F2F4F7] py-6 flex flex-col">
                 {TABS.map((tab) => (
                   <button
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={cn(
                       "text-left px-8 py-4 text-[12px] font-black uppercase tracking-wider transition-colors relative",
                       activeTab === tab ? "text-[#1D1F24]" : "text-[#999] hover:text-[#666]"
                     )}
                   >
                     {activeTab === tab && (
                       <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1D1F24]" />
                     )}
                     {tab}
                   </button>
                 ))}
               </div>

<div className="flex-1 p-10">
                 {activeTab === "USER INFORMATION" && (
                   <div className="space-y-12">
                      <div className="grid grid-cols-2 gap-10">
                        <div className="flex border-b border-[#F2F4F7] pb-4">
                           <span className="w-40 text-[13px] font-bold text-[#999]">Name</span>
                           <span className="text-[14px] font-black text-[#1D1F24]">Suliman</span>
                        </div>
                        <div className="flex border-b border-[#F2F4F7] pb-4">
                           <span className="w-40 text-[13px] font-bold text-[#999]">Email</span>
                           <span className="text-[14px] font-black text-[#1D1F24]">SulimanMokhtar1995@gmail.com</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-10">
                        <div className="flex border-b border-[#F2F4F7] pb-4">
                           <span className="w-40 text-[13px] font-bold text-[#999]">Phone</span>
                           <span className="text-[14px] font-black text-[#1D1F24]">0555555559</span>
                        </div>
                        <div className="flex border-b border-[#F2F4F7] pb-4">
                           <span className="w-40 text-[13px] font-bold text-[#999]">Image</span>
                           <span className="text-[14px] font-black text-[#1D1F24]"></span>
                        </div>
                      </div>
                   </div>
                 )}
                 {activeTab !== "USER INFORMATION" && (
                   <div className="flex items-center justify-center h-full">
                      <p className="text-[#999] text-sm font-bold uppercase tracking-widest">{activeTab} Details</p>
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
