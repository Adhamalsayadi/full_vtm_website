"use client";

import { useState } from "react";
import AdminSidebar from "@/components/shared/AdminSidebar";
import AdminHeader from "@/components/shared/AdminHeader";
import { 
  Eye, 
  RefreshCcw,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Package
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

import EditStatusModal from "@/components/shared/EditStatusModal";
import { useEnquiries, useUpdateEnquiry } from "@/hooks/useEnquiries";
import { Enquiry } from "@/types/enquiries";

function StatusPill({ status }: { status: string }) {
  const s = status.toLowerCase();
  const styles = {
    approved: "bg-[#E9F8F1] text-[#27B973]",
    active: "bg-[#E9F8F1] text-[#27B973]",
    true: "bg-[#E9F8F1] text-[#27B973]",
    rejected: "bg-[#FEEBEB] text-[#F84F4F]",
    failed: "bg-[#FEEBEB] text-[#F84F4F]",
    false: "bg-[#FEEBEB] text-[#F84F4F]",
    pending: "bg-[#FEEBEB] text-[#F84F4F]", 
    moderate: "bg-[#F2F4F7] text-[#666]",
    normal: "bg-[#E9F8F1] text-[#27B973]",
  }[s] || "bg-[#F2F4F7] text-[#666]";

  return (
    <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", styles)}>
      {s}
    </span>
  );
}

export default function VtmEnquiries() {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const { data: enquiries = [], isLoading } = useEnquiries({
    page: 1,
    pageSize: 100,
    includeHidden: true,
  });

  const updateEnquiry = useUpdateEnquiry();

  const handleEditStatus = (enq: Enquiry) => {
    setSelectedEnquiry(enq);
    setIsStatusModalOpen(true);
  };

  const totalItems = enquiries.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedEnquiries = enquiries.slice(startIndex, endIndex);
  
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
              <span className="text-[#333]">enquiries</span>
            </div>

            <h1 className="text-2xl font-bold text-[#333] mb-6">enquiries</h1>

            <div className="bg-white rounded-[20px] shadow-sm border border-[#F2F4F7] overflow-hidden">
               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[1200px]">
                    <thead>
                      <tr className="border-b border-[#F2F4F7]">
                        <th className="px-6 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider w-16 text-center">#</th>
                        <th className="px-6 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider">CATEGORY</th>
                        <th className="px-6 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider">SUB CATEGORY</th>
                        <th className="px-6 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider whitespace-nowrap">REQUEST TYPE</th>
                        <th className="px-6 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider whitespace-nowrap">REQUIRED DATE</th>
                        <th className="px-6 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider">UNIT</th>
                        <th className="px-6 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider">QUANTITY</th>
                        <th className="px-6 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider whitespace-nowrap">VTM STATUS</th>
                        <th className="px-6 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider whitespace-nowrap">ADMIN STATUS</th>
                        <th className="px-6 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider whitespace-nowrap">OFFERS RECEIVED</th>
                        <th className="px-6 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider whitespace-nowrap">ENQUIRY STATUS</th>
                        <th className="px-6 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2F4F7]">
                      {isLoading ? (
                        <tr>
                           <td colSpan={12} className="px-6 py-8 text-center text-sm text-[#999]">Loading enquiries...</td>
                        </tr>
                      ) : (
                        paginatedEnquiries.map((enq, index) => (
                          <tr key={enq.id} className="hover:bg-[#F9FAFB] transition-colors group">
                            <td className="px-6 py-6 text-sm text-[#333] font-medium text-center">{startIndex + index + 1}</td>
                            <td className="px-6 py-6 text-sm text-[#333] font-medium">{enq.categoryLabel || enq.category}</td>
                            <td className="px-6 py-6 text-sm text-[#333] font-medium">{enq.subCategoryLabel || enq.subCategory}</td>
                            <td className="px-6 py-6 whitespace-nowrap"><StatusPill status={enq.requestType} /></td>
                            <td className="px-6 py-6 text-sm text-[#333] font-medium whitespace-nowrap">{enq.requiredDate}</td>
                            <td className="px-6 py-6 text-sm text-[#333] font-medium uppercase">-</td>
                            <td className="px-6 py-6 text-sm text-[#333] font-medium">{enq.quantity}</td>
                            <td className="px-6 py-6"><StatusPill status={enq.vtmStatus} /></td>
                            <td className="px-6 py-6"><StatusPill status={enq.adminStatus} /></td>
                            <td className="px-6 py-6"><StatusPill status={enq.offersReceived ? "true" : "false"} /></td>
                            <td className="px-6 py-6"><StatusPill status={enq.enquiryStatus} /></td>
                            <td className="px-6 py-6 text-right">
                               <div className="flex items-center justify-end gap-3 text-[#999]">
                                 <button className="hover:text-[#333] transition-colors"><Eye size={18} /></button>
                                 <button className="hover:text-[#333] transition-colors"><Package size={18} /></button>
                                 <button onClick={() => handleEditStatus(enq)} className="hover:text-primary transition-colors"><RefreshCcw size={16} /></button>
                               </div>
                            </td>
                          </tr>
                        ))
                      )}
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
        
        <EditStatusModal 
          isOpen={isStatusModalOpen}
          onClose={() => setIsStatusModalOpen(false)}
          currentStatus={selectedEnquiry?.vtmStatus || "pending"}
          options={["approved", "pending", "rejected"]}
          onUpdate={(newStatus) => {
            if (selectedEnquiry) {
              updateEnquiry.mutate({
                id: selectedEnquiry.id,
                payload: { vtmStatus: newStatus },
              });
            }
          }}
          title="Update VTM Status"
          label="VTM Status"
        />
      </div>
    </div>
  );
}
