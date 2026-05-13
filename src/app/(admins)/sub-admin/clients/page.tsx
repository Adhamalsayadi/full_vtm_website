"use client";

import { useState } from "react";
import AdminSidebar from "@/components/shared/AdminSidebar";
import AdminHeader from "@/components/shared/AdminHeader";
import { 
  Eye, 
  RefreshCcw,
  ChevronRight,
  ChevronLeft,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const mockClients = [
  { id: 1, name: "Company name test", code: "SA-CL-23BRX20DE", vtmStatus: "rejected", adminStatus: "pending" },
  { id: 2, name: "Company name 2", code: "SA-CL-23BRX20DS", vtmStatus: "approved", adminStatus: "approved" },
  { id: 3, name: "Company name 3", code: "SA-CL-23BRX20DC", vtmStatus: "pending", adminStatus: "pending" },
  { id: 4, name: "company 2", code: "KSA-CL-24Q4OCL9F", vtmStatus: "approved", adminStatus: "approved" },
];

function StatusPill({ status }: { status: string }) {
  const s = status.toLowerCase();
  const styles = {
    approved: "bg-[#E9F8F1] text-[#27B973]",
    rejected: "bg-[#FEEBEB] text-[#F84F4F]",
    pending: "bg-[#F2F4F7] text-[#666]",
  }[s] || "bg-[#F2F4F7] text-[#666]";

  return (
    <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", styles)}>
      {s}
    </span>
  );
}

export default function VtmClients() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <AdminSidebar role="SubAdmin" />
      <div className="flex-1 flex flex-col min-w-0 font-sans relative">
        <AdminHeader role="SubAdmin" />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-[1400px] mx-auto space-y-6">
            
            <div className="flex items-center gap-2 text-[13px] font-medium text-[#999] mb-8">
              <Link href="/sub-admin" className="hover:text-[#333]">Dashboard</Link>
              <ChevronRight size={14} />
              <span className="text-[#333]">clients</span>
            </div>

            <h1 className="text-2xl font-bold text-[#333] mb-6">clients</h1>

            <div className="bg-white rounded-[20px] shadow-sm border border-[#F2F4F7] overflow-hidden">
               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#F2F4F7]">
                        <th className="px-8 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider w-16">#</th>
                        <th className="px-8 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider">COMPANY NAME</th>
                        <th className="px-8 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider">CODE</th>
                        <th className="px-8 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider">VTM STATUS</th>
                        <th className="px-8 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider">ADMIN STATUS</th>
                        <th className="px-8 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2F4F7]">
                      {mockClients.map((client) => (
                        <tr key={client.id} className="hover:bg-[#F9FAFB] transition-colors group">
                          <td className="px-8 py-5 text-sm font-medium text-[#333]">{client.id}</td>
                          <td className="px-8 py-5">
                            <Link href={`/sub-admin/clients/${client.id}`} className="text-sm font-bold text-[#333] hover:underline transition-all cursor-pointer">
                              {client.name}
                            </Link>
                          </td>
                          <td className="px-8 py-5">
                            <span className="text-sm font-medium text-[#666]">{client.code}</span>
                          </td>
                          <td className="px-8 py-5">
                            <StatusPill status={client.vtmStatus} />
                          </td>
                          <td className="px-8 py-5">
                            <StatusPill status={client.adminStatus} />
                          </td>
                          <td className="px-8 py-5 text-right">
                             <div className="flex items-center justify-end gap-3 text-[#999]">
                               <button className="hover:text-[#333] transition-colors"><Eye size={18} /></button>
                               <button onClick={() => setIsEditModalOpen(true)} className="hover:text-[#333] transition-colors"><RefreshCcw size={16} /></button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>

               <div className="p-6 flex items-center justify-between border-t border-[#F2F4F7]">
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-medium text-[#666]">items per page</span>
                    <div className="relative group">
                      <select className="appearance-none bg-[#F9FAFB] border border-[#EAECF0] rounded-lg px-4 py-2 pr-10 text-[13px] font-bold text-[#1D1F24] outline-none cursor-pointer">
                        <option>10</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[13px] font-medium text-[#666]">1-4 from 4</span>
                    <div className="flex items-center gap-2">
                       <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[#CCC]"><ChevronLeft size={18} /></button>
                       <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[#CCC]"><ChevronRight size={18} /></button>
                    </div>
                  </div>
               </div>
            </div>

          </div>
        </main>

{isEditModalOpen && (
          <div className="fixed inset-0 bg-black/5 flex items-center justify-center z-[100] p-6">
            <div className="bg-white rounded-2xl shadow-2xl border border-[#F2F4F7] w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
               <div className="p-8 pb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#333]">Edit Status</h3>
                  <button onClick={() => setIsEditModalOpen(false)} className="text-[#999] hover:text-[#333] border border-[#E5E5E5] p-1 rounded-md transition-colors">
                     <span className="text-xl leading-none">×</span>
                  </button>
               </div>

               <div className="p-8 pt-0 space-y-6">
                  <div className="relative">
                    <label className="absolute -top-2.5 left-4 bg-white px-1.5 text-[11px] font-bold text-[#98A2B3] uppercase tracking-widest z-10">Stauts</label>
                    <input type="text" defaultValue="Pending" className="w-full border border-[#EAECF0] rounded-xl px-5 py-4 text-sm font-bold text-[#1A1C1E] outline-none focus:border-black transition-colors" />
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <button onClick={() => setIsEditModalOpen(false)} className="flex-1 py-4 text-sm font-bold text-[#666] uppercase tracking-widest border border-[#E5E5E5] rounded-xl hover:bg-gray-50 transition-all">
                      CANCEL
                    </button>
                    <button onClick={() => setIsEditModalOpen(false)} className="flex-1 py-4 text-sm font-bold text-white uppercase tracking-widest bg-[#202E5C] rounded-xl hover:opacity-90 transition-all">
                      UPDATE
                    </button>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
