"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "../../client/Sidebar/Sidebar";
import Header from "../../client/header";
import { Eye, Edit3, RotateCw, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X } from "lucide-react";
import {
  ConfirmationModal,
  EditEnquiryModal,
} from "@/components/shared/Modals";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useEnquiryModalStore } from "@/store/enquiryModalStore";
import {
  useEnquiries,
  useUpdateEnquiry,
  useDeleteEnquiry,
  useToggleEnquiryVisibility,
} from "@/hooks/useEnquiries";
import { Enquiry } from "@/types/enquiries";
import { useModalFlow } from "@/hooks/useModalFlow";

export default function SupplierEnquiriesPage() {
  const user = useAuthStore((state) => state.user);
  const { activeEnquiry, modalType, openModal, closeModal } =
    useEnquiryModalStore();
  const { openEnquiry, renderModals } = useModalFlow();

const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const {
    data: enquiries = [],
    isLoading,
    isError,
  } = useEnquiries({
    userId: user?.id,
    onlyMyEnquiries: true,
    includeHidden: true,
    page: 1,
    pageSize: 100,
  });

  const updateEnquiry = useUpdateEnquiry();
  const deleteEnquiry = useDeleteEnquiry();
  const toggleVisibility = useToggleEnquiryVisibility();

const totalItems = enquiries.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedEnquiries = enquiries.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  const handleAction = (id: string, action: string) => {
    const enquiry = enquiries.find((e: Enquiry) => e.id === id);
    if (!enquiry) return;
    switch (action) {
      case "View":
        openEnquiry(enquiry);
        break;
      case "Edit":
        openModal("edit", enquiry);
        break;
      case "Hide":
        
        openModal("hide", enquiry);
        break;
      default:
        break;
    }
  };

  const confirmHide = () => {
    if (activeEnquiry)
      toggleVisibility.mutate(activeEnquiry.id, { onSuccess: closeModal });
  };

  const loading = isLoading;
  const error = isError ? "Unable to load your enquiries right now." : null;
  const isHideModalOpen = modalType === "hide";
  const isEditModalOpen = modalType === "edit";

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar role="Supplier" />
      <div className="flex-1 flex flex-col">
        <Header role="Supplier" />

        <main className="flex-1 p-6 md:p-10 overflow-auto">
          <div className="flex flex-col gap-6">
            <div className="text-[#667085] text-sm font-medium flex items-center gap-2">
              <Link
                href="/supplier"
                className="hover:text-black transition-colors"
              >
                Dashboard
              </Link>
              <span className="text-[#98A2B3]">&gt;</span>
              <span className="text-[#98A2B3]">enquiries</span>
            </div>

            <h1 className="text-[28px] font-bold text-[#101828]">enquiries</h1>

            {error && (
              <div className="rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm text-[#B42318]">
                {error}
              </div>
            )}

            <div className="bg-white rounded-2xl border border-[#EAECF0] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse" style={{ tableLayout: "fixed", minWidth: 700 }}>
                  <colgroup>
                    <col style={{ width: "5%" }} />
                    <col style={{ width: "16%" }} />
                    <col style={{ width: "17%" }} />
                    <col style={{ width: "17%" }} />
                    <col style={{ width: "14%" }} />
                    <col style={{ width: "17%" }} />
                    <col style={{ width: "14%" }} />
                  </colgroup>
                  <thead>
                    <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                      <th className="text-left px-4 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">#</th>
                      <th className="text-left px-4 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">TITLE</th>
                      <th className="text-left px-4 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">CATEGORY</th>
                      <th className="text-left px-4 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">SUB CATEGORY</th>
                      <th className="text-left px-4 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">QUANTITY</th>
                      <th className="text-left px-4 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">ENQUIRY STATUS</th>
                      <th className="text-center px-4 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAECF0]">
                    {loading ? (
                      <tr>
                        <td className="px-4 py-8 text-sm text-[#667085]" colSpan={7}>
                          Loading enquiries...
                        </td>
                      </tr>
                    ) : paginatedEnquiries.length === 0 ? (
                      <tr>
                        <td className="px-4 py-8 text-sm text-[#667085]" colSpan={7}>
                          No enquiries available yet.
                        </td>
                      </tr>
                    ) : (
                      paginatedEnquiries.map((enq, index) => (
                        <tr
                          key={enq.id}
                          className={cn(
                            "hover:bg-[#F9FAFB] transition-all duration-300",
                            enq.isHidden &&
                              "bg-[#F2F4F7]/60 opacity-60 grayscale-[0.5]"
                          )}
                        >
                          
                          <td className="px-4 py-5 text-sm text-[#667085]">
                            {startIndex + index + 1}
                          </td>

<td className="px-4 py-5 text-sm font-semibold text-[#101828]">
                            <button 
                              onClick={() => openEnquiry(enq)}
                              className="flex items-center gap-1 truncate hover:text-primary transition-colors text-left w-full"
                            >
                              <span className="truncate">{enq.title}</span>
                              {enq.isHidden && (
                                <span className="shrink-0 px-1 py-0.5 rounded bg-gray-200 text-[9px] font-bold text-gray-600 uppercase">
                                  Hidden
                                </span>
                              )}
                            </button>
                          </td>

<td className="px-4 py-5 text-sm text-[#667085] truncate">
                            {enq.categoryLabel || enq.category}
                          </td>

<td className="px-4 py-5 text-sm text-[#667085] truncate">
                            {enq.subCategoryLabel || enq.subCategory || "—"}
                          </td>

<td className="px-4 py-5 text-sm text-[#667085]">
                            {enq.quantity}
                          </td>

<td className="px-4 py-5">
                            <span
                              className={cn(
                                "px-3 py-1.5 rounded-full text-xs font-bold capitalize",
                                enq.enquiryStatus.toLowerCase() === "pending"
                                  ? "text-[#F59E0B]"
                                  : "bg-[#ECFDF3] text-[#027A48]"
                              )}
                            >
                              {enq.enquiryStatus}
                            </span>
                          </td>

<td className="px-4 py-3">
                            <div className="flex flex-col items-center gap-1.5 text-[#667085]">
                              <button
                                onClick={() => handleAction(enq.id, "View")}
                                className="p-1 hover:text-primary transition-colors"
                                title="View"
                              >
                                <Eye size={16} />
                              </button>
                              <button
                                onClick={() => handleAction(enq.id, "Hide")}
                                className="p-1 hover:text-primary transition-colors"
                                title="Hide"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

<div className="flex items-center justify-end gap-6 border-t border-[#EAECF0] px-5 py-4 text-sm text-[#667085]">
                
                <div className="flex items-center gap-2">
                  <span>items per page</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="rounded-lg border border-[#D0D5DD] bg-white px-3 py-1.5 text-sm text-[#344054] outline-none focus:border-primary"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </div>

<span>
                  {totalItems === 0
                    ? "0 from 0"
                    : `${startIndex + 1}-${endIndex} from ${totalItems}`}
                </span>

<div className="flex items-center gap-1">
                  <button
                    onClick={() => goToPage(1)}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-lg hover:bg-[#F2F4F7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="First page"
                  >
                    <ChevronsLeft size={18} />
                  </button>
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-lg hover:bg-[#F2F4F7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Previous page"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-lg hover:bg-[#F2F4F7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Next page"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <button
                    onClick={() => goToPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-lg hover:bg-[#F2F4F7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Last page"
                  >
                    <ChevronsRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <ConfirmationModal
        isOpen={isHideModalOpen}
        onClose={closeModal}
        onConfirm={confirmHide}
        title="Hide Enquiry"
        message={`Are you sure you want to hide "${activeEnquiry?.title}"?`}
        confirmText="Hide"
      />

      <EditEnquiryModal
        isOpen={isEditModalOpen}
        onClose={closeModal}
        enquiry={activeEnquiry}
        onSave={(data) => {
          if (activeEnquiry) {
            updateEnquiry.mutate(
              {
                id: activeEnquiry.id,
                payload: {
                  ...data,
                  quantity: data.quantity ? Number(data.quantity) : undefined,
                },
              },
              { onSuccess: closeModal }
            );
          }
        }}
      />

      {renderModals()}
    </div>
  );
}
