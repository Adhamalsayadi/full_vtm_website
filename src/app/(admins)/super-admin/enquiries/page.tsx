"use client";

import { useState } from "react";
import AdminSidebar from "@/components/shared/AdminSidebar";
import AdminHeader from "@/components/shared/AdminHeader";
import { 
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Eye, 
  Package, 
  RefreshCcw, 
  ChevronFirst, 
  ChevronLast 
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEnquiries, useUpdateEnquiry } from "@/hooks/useEnquiries";
import { Enquiry } from "@/types/enquiries";
import EditStatusModal from "@/components/shared/EditStatusModal";

function StatusPill({ status }: { status: string }) {
  const s = status.toLowerCase();
  const styles = {
    approved: "bg-[#E9F8F1] text-[#27B973]",
    rejected: "bg-[#FEEBEB] text-[#F84F4F]",
    pending: "bg-[#F2F4F7] text-[#666]",
    normal: "bg-[#E9F8F1] text-[#27B973]",
    moderate: "bg-[#F2F4F7] text-[#666]",
    true: "bg-[#E9F8F1] text-[#27B973]",
    false: "bg-[#FEEBEB] text-[#F84F4F]",
  }[s] || "bg-[#F2F4F7] text-[#666]";

  const label = s === "true" ? "true" : s === "false" ? "false" : s;

  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-tight whitespace-nowrap", styles)}>
      {label}
    </span>
  );
}

export default function SuperAdminEnquiries() {
  const router = useRouter();
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const { data: enquiries = [], isLoading } = useEnquiries({
    page: 1,
    pageSize: 100,
    includeHidden: true,
  });

  const updateEnquiry = useUpdateEnquiry();

  const handleEditStatus = (enq: any) => {
    setSelectedEnquiry(enq);
    setIsStatusModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <AdminSidebar role="SuperAdmin" />
      <div className="flex-1 flex flex-col min-w-0 font-sans">
        <AdminHeader role="SuperAdmin" />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-[1600px] mx-auto space-y-6">

<div className="flex items-center gap-2 text-[13px] font-bold text-[#999] mb-8 lowercase">
              <Link href="/super-admin" className="hover:text-[#333] capitalize">Dashboard</Link>
              <ChevronRight size={14} className="text-[#999]" />
              <span className="text-[#CCC]">enquiries</span>
            </div>

            <h1 className="text-2xl font-black text-[#1D1F24] mb-8 lowercase">enquiries</h1>

            <div className="bg-white rounded-[32px] shadow-sm border border-[#F2F4F7] overflow-hidden">
               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[1500px]">
                    <thead>
                      <tr className="border-b border-[#F2F4F7]">
                        <th className="px-6 py-8 text-[11px] font-bold text-[#999] uppercase tracking-wider w-12 text-center">#</th>
                        <th className="px-6 py-8 text-[11px] font-bold text-[#999] uppercase tracking-wider">TITLE</th>
                        <th className="px-6 py-8 text-[11px] font-bold text-[#999] uppercase tracking-wider">CLIENT</th>
                        <th className="px-6 py-8 text-[11px] font-bold text-[#999] uppercase tracking-wider">CATEGORY</th>
                        <th className="px-6 py-8 text-[11px] font-bold text-[#999] uppercase tracking-wider whitespace-nowrap">SUB CATEGORY</th>
                        <th className="px-6 py-8 text-[11px] font-bold text-[#999] uppercase tracking-wider whitespace-nowrap">REQUEST TYPE</th>
                        <th className="px-6 py-8 text-[11px] font-bold text-[#999] uppercase tracking-wider whitespace-nowrap">REQUIRED DATE</th>
                        <th className="px-6 py-8 text-[11px] font-bold text-[#999] uppercase tracking-wider">UNIT</th>
                        <th className="px-6 py-8 text-[11px] font-bold text-[#999] uppercase tracking-wider">QUANTITY</th>
                        <th className="px-6 py-8 text-[11px] font-bold text-[#999] uppercase tracking-wider whitespace-nowrap">VTM STATUS</th>
                        <th className="px-6 py-8 text-[11px] font-bold text-[#999] uppercase tracking-wider whitespace-nowrap">ADMIN STATUS</th>
                        <th className="px-6 py-8 text-[11px] font-bold text-[#999] uppercase tracking-wider whitespace-nowrap">OFFERS RECEIVE</th>
                        <th className="px-6 py-8 text-[11px] font-bold text-[#999] uppercase tracking-wider w-0"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2F4F7]">
                      {isLoading ? (
                         <tr>
                            <td colSpan={13} className="px-8 py-12 text-center text-sm text-[#999]">Loading enquiries...</td>
                         </tr>
                      ) : (
                        enquiries.map((enq, index) => (
                          <tr key={enq.id} className="hover:bg-[#F9FAFB] transition-colors group">
                            <td className="px-6 py-8 text-sm font-medium text-[#333] text-center">{index + 1}</td>
                            <td className="px-6 py-8">
                               <Link href={`/super-admin/enquiries/${enq.id}`} className="font-bold text-sm text-[#1D1F24] tracking-tight underline cursor-pointer hover:text-black">
                                 {enq.title}
                               </Link>
                            </td>
                            <td className="px-6 py-8">
                               <span className="font-bold text-sm text-[#1D1F24] underline cursor-pointer hover:text-black">
                                 {enq.createdByUserName}
                               </span>
                            </td>
                            <td className="px-6 py-8 text-sm text-[#1D1F24] font-medium">{enq.categoryLabel || enq.category || "-"}</td>
                            <td className="px-6 py-8 text-sm text-[#1D1F24] font-medium">{enq.subCategoryLabel || enq.subCategory || "-"}</td>
                            <td className="px-6 py-8"><StatusPill status={enq.requestType} /></td>
                            <td className="px-6 py-8 text-sm text-[#333] font-medium whitespace-nowrap tracking-tight">{enq.requiredDate}</td>
                            <td className="px-6 py-8 text-sm text-[#333] font-medium uppercase">{enq.unit || "ea"}</td>
                            <td className="px-6 py-8 text-sm text-[#1D1F24] font-bold">{enq.quantity}</td>
                            <td className="px-6 py-8"><StatusPill status={enq.vtmStatus} /></td>
                            <td className="px-6 py-8"><StatusPill status={enq.adminStatus} /></td>
                            <td className="px-6 py-8"><StatusPill status={enq.offersReceived ? "true" : "false"} /></td>
                            <td className="px-6 py-8 text-right min-w-[100px]">
                               <div className="flex items-center justify-end gap-3 text-[#999] opacity-0 group-hover:opacity-100 transition-opacity">
                                 <Link
                                   href={`/super-admin/enquiries/${enq.id}/offers`}
                                   className="hover:text-[#333] transition-colors"
                                   title="View Offers"
                                 >
                                   <Package size={18} />
                                 </Link>
                                 <button 
                                   onClick={() => handleEditStatus(enq)}
                                   className="hover:text-[#333] transition-colors"
                                   title="Edit Status"
                                 >
                                   <RefreshCcw size={18} />
                                 </button>
                               </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
               </div>

               <div className="p-10 flex items-center justify-between border-t border-[#F2F4F7]">
                  <div className="flex items-center gap-4">
                    <span className="text-[13px] font-bold text-[#666]">items per page</span>
                    <div className="relative group">
                      <select className="appearance-none bg-[#F9FAFB] border border-[#EAECF0] rounded-xl px-4 py-2.5 pr-10 text-[13px] font-black text-[#1D1F24] outline-none cursor-pointer">
                        <option>10</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <span className="text-[13px] font-black text-[#1D1F24] tracking-tight">1-4 from 4</span>
                    <div className="flex items-center gap-4">
                       <button className="text-[#98A2B3] hover:text-[#101828] transition-colors"><ChevronFirst size={20} strokeWidth={2.5} /></button>
                       <button className="text-[#98A2B3] hover:text-[#101828] transition-colors"><ChevronLeft size={20} strokeWidth={2.5} /></button>
                       <button className="text-[#98A2B3] hover:text-[#101828] transition-colors"><ChevronRight size={20} strokeWidth={2.5} /></button>
                       <button className="text-[#98A2B3] hover:text-[#101828] transition-colors"><ChevronLast size={20} strokeWidth={2.5} /></button>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </main>

        <EditStatusModal 
          isOpen={isStatusModalOpen}
          onClose={() => setIsStatusModalOpen(false)}
          currentStatus={selectedEnquiry?.adminStatus || "pending"}
          options={["approved", "pending", "rejected"]}
          onUpdate={(newStatus) => {
            if (selectedEnquiry) {
              updateEnquiry.mutate({
                id: selectedEnquiry.id,
                payload: { adminStatus: newStatus },
              });
            }
          }}
          title="Edit Status"
          label="Status"
        />
      </div>
    </div>
  );
}
