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

const mockSuppliers = [
  { id: 1, name: "Company name test", code: "SA-SP-23BRX20S", vtmStatus: "pending", adminStatus: "pending" },
  { id: 2, name: "Company name 4", code: "SA-SP-23BRX20A", vtmStatus: "approved", adminStatus: "pending" },
  { id: 3, name: "Company name 5", code: "SA-SP-23BRX20B", vtmStatus: "pending", adminStatus: "pending" },
  { id: 4, name: "My Company", code: "KSA-SP-241R95JZP", vtmStatus: "approved", adminStatus: "approved" },
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

export default function VtmSuppliers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = mockSuppliers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedSuppliers = mockSuppliers.slice(startIndex, endIndex);

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
              <span className="text-[#333]">suppliers</span>
            </div>

            <h1 className="text-2xl font-bold text-[#333] mb-6">suppliers</h1>

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
                      {paginatedSuppliers.map((sup, index) => (
                        <tr key={sup.id} className="hover:bg-[#F9FAFB] transition-colors group">
                          <td className="px-8 py-5 text-sm font-medium text-[#333]">{startIndex + index + 1}</td>
                          <td className="px-8 py-5">
                            <span className="text-sm font-bold text-[#333] hover:underline transition-all cursor-pointer">
                              {sup.name}
                            </span>
                          </td>
                          <td className="px-8 py-5">
                            <span className="text-sm font-medium text-[#666]">{sup.code}</span>
                          </td>
                          <td className="px-8 py-5">
                            <StatusPill status={sup.vtmStatus} />
                          </td>
                          <td className="px-8 py-5">
                            <StatusPill status={sup.adminStatus} />
                          </td>
                          <td className="px-8 py-5 text-right">
                             <div className="flex items-center justify-end gap-3 text-[#999]">
                               <button className="hover:text-[#333] transition-colors"><Eye size={18} /></button>
                               <button className="hover:text-[#333] transition-colors"><RefreshCcw size={16} /></button>
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
                      <select 
                        value={itemsPerPage}
                        onChange={(e) => {
                          setItemsPerPage(Number(e.target.value));
                          setCurrentPage(1);
                        }}
                        className="appearance-none bg-[#F9FAFB] border border-[#EAECF0] rounded-lg px-4 py-2 pr-10 text-[13px] font-bold text-[#1D1F24] outline-none cursor-pointer"
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[13px] font-medium text-[#666]">
                      {totalItems === 0 ? "0 from 0" : `${startIndex + 1}-${endIndex} from ${totalItems}`}
                    </span>
                    <div className="flex items-center gap-2">
                       <button 
                         onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                         disabled={currentPage === 1}
                         className="w-8 h-8 rounded-lg flex items-center justify-center text-[#999] hover:bg-[#F2F4F7] disabled:text-[#CCC] disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
                       >
                         <ChevronLeft size={18} />
                       </button>
                       <button 
                         onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                         disabled={currentPage === totalPages}
                         className="w-8 h-8 rounded-lg flex items-center justify-center text-[#999] hover:bg-[#F2F4F7] disabled:text-[#CCC] disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
                       >
                         <ChevronRight size={18} />
                       </button>
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
