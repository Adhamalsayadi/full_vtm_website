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
  ChevronFirst,
  ChevronLast,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import EditStatusModal from "@/components/shared/EditStatusModal";
import { useRouter } from "next/navigation";

interface Supplier {
  id: number;
  name: string;
  code: string;
  vtmStatus: "approved" | "rejected" | "pending";
  adminStatus: "approved" | "rejected" | "pending";
}

const mockSuppliers: Supplier[] = [
  {
    id: 1,
    name: "Company name test",
    code: "SA-SP-23BRX20S",
    vtmStatus: "pending",
    adminStatus: "pending",
  },
  {
    id: 2,
    name: "Company name 4",
    code: "SA-SP-23BRX20A",
    vtmStatus: "approved",
    adminStatus: "pending",
  },
  {
    id: 3,
    name: "Company name 5",
    code: "SA-SP-23BRX20B",
    vtmStatus: "pending",
    adminStatus: "pending",
  },
  {
    id: 4,
    name: "My Company",
    code: "KSA-SP-241R95JZP",
    vtmStatus: "approved",
    adminStatus: "approved",
  },
  {
    id: 5,
    name: "dddd",
    code: "KSA-SP-24BJl4Y89",
    vtmStatus: "pending",
    adminStatus: "pending",
  },
  {
    id: 6,
    name: "dsfsd",
    code: "KSA-SP-24Z7l5GBO",
    vtmStatus: "pending",
    adminStatus: "pending",
  },
];

function StatusPill({ status }: { status: string }) {
  const s = status.toLowerCase();
  const styles =
    {
      approved: "bg-[#E9F8F1] text-[#27B973]",
      rejected: "bg-[#FEEBEB] text-[#F84F4F]",
      pending: "bg-[#F2F4F7] text-[#666]",
    }[s] || "bg-[#F2F4F7] text-[#666]";

  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-[10px] font-black tracking-wider",
        styles,
      )}
    >
      {s}
    </span>
  );
}

export default function SuperAdminSuppliers() {
  const router = useRouter();
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleEditStatus = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsStatusModalOpen(true);
  };

  const totalItems = mockSuppliers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedSuppliers = mockSuppliers.slice(startIndex, endIndex);

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <AdminSidebar role="SuperAdmin" />
      <div className="flex-1 flex flex-col min-w-0 font-sans">
        <AdminHeader role="SuperAdmin" />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-[1400px] mx-auto space-y-6">
            
            <div className="flex items-center gap-2 text-[13px] font-medium text-[#999] mb-8">
              <Link href="/super-admin" className="hover:text-[#333]">
                Dashboard
              </Link>
              <ChevronRight size={14} />
              <span className="text-[#333]">suppliers</span>
            </div>

            <h1 className="text-2xl font-bold text-[#333] mb-8 lowercase">
              suppliers
            </h1>

            <div className="bg-white rounded-[32px] shadow-sm border border-[#F2F4F7] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#F2F4F7]">
                      <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider w-16">
                        #
                      </th>
                      <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider">
                        COMPANY NAME
                      </th>
                      <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider">
                        CODE
                      </th>
                      <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider">
                        VTM STATUS
                      </th>
                      <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider">
                        ADMIN STATUS
                      </th>
                      <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider text-right">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2F4F7]">
                    {paginatedSuppliers.map((sup, index) => (
                      <tr
                        key={sup.id}
                        className="hover:bg-[#F9FAFB] transition-colors group"
                      >
                        <td className="px-8 py-5 text-sm font-medium text-[#333]">
                          {startIndex + index + 1}
                        </td>
                        <td className="px-8 py-5">
                          <Link
                            href={`/super-admin/suppliers/${sup.id}`}
                            className="text-sm font-medium text-[#1D1F24] underline hover:no-underline transition-all"
                          >
                            {sup.name}
                          </Link>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-sm font-medium text-[#666]">
                            {sup.code}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <StatusPill status={sup.vtmStatus} />
                        </td>
                        <td className="px-8 py-5">
                          <StatusPill status={sup.adminStatus} />
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex items-center justify-end gap-3 text-[#999]">
                            <Link
                              href={`/super-admin/suppliers/${sup.id}`}
                              className="hover:text-[#333] transition-colors"
                            >
                              <Eye size={18} />
                            </Link>
                            <button
                              onClick={() => handleEditStatus(sup)}
                              className="hover:text-[#333] transition-colors"
                            >
                              <RefreshCcw size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-10 flex items-center justify-between border-t border-[#F2F4F7]">
                <div className="flex items-center gap-4">
                  <span className="text-[13px] font-bold text-[#666]">
                    items per page
                  </span>
                  <div className="relative group">
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="appearance-none bg-[#F9FAFB] border border-[#EAECF0] rounded-xl px-4 py-2.5 pr-10 text-[13px] font-black text-[#1D1F24] outline-none cursor-pointer"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <span className="text-[13px] font-black text-[#1D1F24]">
                    {totalItems === 0 ? "0 from 0" : `${startIndex + 1}-${endIndex} from ${totalItems}`}
                  </span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="text-[#999] disabled:text-[#CCC] hover:text-[#333] disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronFirst size={20} />
                    </button>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="text-[#999] disabled:text-[#CCC] hover:text-[#333] disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="text-[#999] disabled:text-[#CCC] hover:text-[#333] disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="text-[#999] disabled:text-[#CCC] hover:text-[#333] disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLast size={20} />
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
          currentStatus={selectedSupplier?.adminStatus || ""}
          options={["approved", "pending", "rejected"]}
          onUpdate={(newStatus) => {
            console.log(
              "Updating supplier admin status:",
              selectedSupplier?.id,
              newStatus,
            );
          }}
          title="Edit Status"
          label="Status"
        />
      </div>
    </div>
  );
}
