"use client";

import { useState } from "react";
import AdminSidebar from "@/components/shared/AdminSidebar";
import AdminHeader from "@/components/shared/AdminHeader";
import { 
  RefreshCcw,
  ChevronRight,
  ChevronLeft,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

const mockOffers = [
  { id: 1, title: "First Enquiry", supplier: "Company name5", price: "170.00", vtm: "pending", admin: "pending" },
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

export default function EnquiryOffers() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = mockOffers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedOffers = mockOffers.slice(startIndex, endIndex);

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <AdminSidebar role="SuperAdmin" />
      <div className="flex-1 flex flex-col min-w-0 font-sans relative">
        <AdminHeader role="SuperAdmin" />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-[1400px] mx-auto space-y-6">

<div className="flex items-center gap-2 text-[13px] font-medium text-[#999] mb-8">
              <Link href="/super-admin" className="hover:text-[#333]">Dashboard</Link>
              <ChevronRight size={14} />
              <Link href="/super-admin/enquiries" className="hover:text-[#333]">enquires</Link>
              <ChevronRight size={14} />
              <span className="text-[#333]">First Enquiry (offers)</span>
            </div>

            <h1 className="text-2xl font-bold text-[#333] mb-6 tracking-tight">offers</h1>

            <div className="bg-white rounded-[20px] shadow-sm border border-[#F2F4F7] overflow-hidden">
               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#F2F4F7]">
                        <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider w-24">#</th>
                        <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider">ENQUIRY TITLE</th>
                        <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider">SUPPLIER</th>
                        <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider">PRICE</th>
                        <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider">VTM STATUS</th>
                        <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider">ADMIN STATUS</th>
                        <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2F4F7]">
                      {paginatedOffers.map((offer, index) => (
                        <tr key={offer.id} className="hover:bg-[#F9FAFB] transition-colors group">
                          <td className="px-8 py-6 text-sm font-medium text-[#333]">{startIndex + index + 1}</td>
                          <td className="px-8 py-6 text-sm font-bold text-[#333]">
                            <Link href={`/super-admin/enquiries/${id}`} className="hover:text-primary transition-colors underline underline-offset-2">
                               {offer.title}
                            </Link>
                          </td>
                          <td className="px-8 py-6 text-sm font-bold text-[#333]">{offer.supplier}</td>
                          <td className="px-8 py-6 text-sm font-bold text-[#333]">{offer.price}</td>
                          <td className="px-8 py-6"><StatusPill status={offer.vtm} /></td>
                          <td className="px-8 py-6"><StatusPill status={offer.admin} /></td>
                          <td className="px-8 py-6 text-right">
                             <button onClick={() => setIsEditModalOpen(true)} className="text-[#999] hover:text-[#333] transition-colors"><RefreshCcw size={16} /></button>
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

{isEditModalOpen && (
          <div className="fixed inset-0 bg-black/5 flex items-center justify-center z-[100] p-6">
            <div className="bg-white rounded-2xl shadow-2xl border border-[#F2F4F7] w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
               <div className="p-8 pb-4 flex items-center justify-between border-b border-[#F2F4F7]">
                  <h3 className="text-lg font-bold text-[#333]">Edit Status</h3>
                  <button onClick={() => setIsEditModalOpen(false)} className="text-[#999] hover:text-[#333] border border-[#E5E5E5] p-1 rounded-md transition-colors">
                     <span className="text-xl leading-none">×</span>
                  </button>
               </div>

               <div className="p-8 space-y-6">
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
