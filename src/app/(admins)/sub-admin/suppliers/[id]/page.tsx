"use client";

import { useState } from "react";
import AdminSidebar from "@/components/shared/AdminSidebar";
import AdminHeader from "@/components/shared/AdminHeader";
import { 
  ChevronRight,
  ChevronLeft,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function SupplierDetailView() {
  const [activeTab, setActiveTab] = useState("user");

  const tabs = [
    { id: "user", label: "USER INFORMATION" },
    { id: "company", label: "COMPANY INFORMATION" },
    { id: "director", label: "CONTACT US WITH (DIRECTOR)" },
    { id: "financial", label: "CONTACT US WITH (FINANCIAL)" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <AdminSidebar role="SubAdmin" />
      <div className="flex-1 flex flex-col min-w-0 font-sans">
        <AdminHeader role="SubAdmin" />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-[1400px] mx-auto space-y-6">

<div className="flex items-center gap-2 text-[13px] font-medium text-[#999] mb-8">
              <Link href="/sub-admin" className="hover:text-[#333]">Dashboard</Link>
              <ChevronRight size={14} />
              <Link href="/sub-admin/suppliers" className="hover:text-[#333]">Supplier</Link>
              <ChevronRight size={14} />
              <span className="text-[#333]">Company name test</span>
            </div>

<div className="bg-white rounded-[20px] shadow-sm border border-[#F2F4F7] flex overflow-hidden min-h-[500px]">
               
               <aside className="w-80 border-r border-[#F2F4F7] py-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "w-full text-left px-8 py-4 text-[13px] font-bold tracking-tight transition-all relative",
                        activeTab === tab.id 
                          ? "text-[#1D1F24] before:absolute before:left-0 before:top-4 before:bottom-4 before:w-1 before:bg-[#1D1F24]" 
                          : "text-[#999] hover:text-[#333]"
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
               </aside>

<div className="flex-1 p-12">
                  <div className="grid grid-cols-2 gap-y-12 gap-x-16">
                     <div className="space-y-1">
                        <p className="text-[13px] font-medium text-[#999]">Name</p>
                        <p className="text-sm font-bold text-[#333]">Suliman</p>
                     </div>
                     <div className="space-y-1 text-right md:text-left">
                        <p className="text-[13px] font-medium text-[#999]">Email</p>
                        <p className="text-sm font-bold text-[#333]">SulimanMokhtar1995@gmail.com</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[13px] font-medium text-[#999]">Phone</p>
                        <p className="text-sm font-bold text-[#333]">0555555559</p>
                     </div>
                     <div className="space-y-1 text-right md:text-left">
                        <p className="text-[13px] font-medium text-[#999]">Image</p>
                        <div className="w-12 h-12 bg-[#F2F4F7] rounded-lg"></div>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
