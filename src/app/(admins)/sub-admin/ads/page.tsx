"use client";

import { useState } from "react";
import AdminSidebar from "@/components/shared/AdminSidebar";
import AdminHeader from "@/components/shared/AdminHeader";
import { 
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Image as ImageIcon,
  Eye,
  RefreshCcw
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const mockAds = [
  { id: 1, title: "Active Campaign", vtm: "approved", admin: "approved" },
];

export default function VtmAds() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = mockAds.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedAds = mockAds.slice(startIndex, endIndex);

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
              <span className="text-[#333]">ads</span>
            </div>

            <h1 className="text-2xl font-bold text-[#333] mb-8">ads</h1>

            <div className="bg-white rounded-[20px] shadow-sm border border-[#F2F4F7] overflow-hidden">
               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#F2F4F7]">
                        <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider w-24">#</th>
                        <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider">TITLE</th>
                        <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider">IMAGE</th>
                        <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider">VTM STATUS</th>
                        <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider">ADMIN STATUS</th>
                        <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2F4F7]">
                      {paginatedAds.map((ad, idx) => (
                        <tr key={ad.id} className="hover:bg-[#F9FAFB] transition-colors group">
                          <td className="px-8 py-6 text-sm font-medium text-[#333]">{startIndex + idx + 1}</td>
                          <td className="px-8 py-6 font-bold text-sm text-[#333]">{ad.title}</td>
                          <td className="px-8 py-6">
                             <div className="w-20 h-10 bg-[#F2F4F7] rounded flex items-center justify-center text-[#CCC]">
                                <ImageIcon size={18} />
                             </div>
                          </td>
                          <td className="px-8 py-6 text-sm font-bold text-[#333]">
                             <span className="bg-[#E9F8F1] text-[#27B973] px-3 py-1 rounded-full text-[10px] uppercase tracking-wider">{ad.vtm}</span>
                          </td>
                          <td className="px-8 py-6 text-sm font-bold text-[#333]">
                             <span className="bg-[#E9F8F1] text-[#27B973] px-3 py-1 rounded-full text-[10px] uppercase tracking-wider">{ad.admin}</span>
                          </td>
                          <td className="px-8 py-6 text-right">
                             <div className="flex items-center justify-end gap-3 text-[#999]">
                               <button className="hover:text-[#333] transition-all"><Eye size={18} /></button>
                               <button className="hover:text-[#333] transition-all"><RefreshCcw size={16} /></button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>

               <div className="p-6 border-t border-[#F2F4F7] flex items-center justify-between gap-4">
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
