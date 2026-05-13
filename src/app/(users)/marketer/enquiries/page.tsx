"use client";

import Link from "next/link";
import Sidebar from "../../client/Sidebar/Sidebar";
import Header from "../../client/header";
import { Eye, Edit3, EyeOff } from "lucide-react";
import {
  ConfirmationModal,
  EditEnquiryModal,
} from "@/components/shared/Modals";
import { cn } from "@/lib/utils";
import { useEnquiryModalStore } from "@/store/enquiryModalStore";
import {
  useEnquiries,
  useUpdateEnquiry,
  useToggleEnquiryVisibility,
} from "@/hooks/useEnquiries";
import { Enquiry } from "@/types/enquiries";
import { useModalFlow } from "@/hooks/useModalFlow";

export default function MarketerEnquiriesPage() {
  const { openEnquiry, renderModals } = useModalFlow();
  const { activeEnquiry, modalType, openModal, closeModal } =
    useEnquiryModalStore();

const {
    data: enquiries = [],
    isLoading,
    isError,
  } = useEnquiries({
    includeHidden: true,
    page: 1,
    pageSize: 200,
  });

  const updateEnquiry = useUpdateEnquiry();
  const toggleVisibility = useToggleEnquiryVisibility();

  const handleAction = (id: string, action: string) => {
    const enquiry = enquiries.find((e: Enquiry) => e.id === id);
    if (!enquiry) return;
    switch (action) {
      case "Edit":
        openModal("edit", enquiry);
        break;
      case "View":
        openEnquiry(enquiry);
        break;
      case "Hide":
        toggleVisibility.mutate(id);
        break;
      default:
        break;
    }
  };

  const confirmHide = (id: string) => {
     toggleVisibility.mutate(id, { onSuccess: closeModal });
  };

  const saveEdit = (data: {
    title?: string;
    quantity?: string;
    status?: string;
  }) => {
    if (activeEnquiry)
      updateEnquiry.mutate(
        {
          id: activeEnquiry.id,
          payload: {
            title: data.title,
            quantity: data.quantity ? Number(data.quantity) : undefined,
            enquiryStatus: data.status,
          },
        },
        { onSuccess: closeModal }
      );
  };

  const loading = isLoading;
  const error = isError ? "Unable to load enquiries right now." : null;
  const isHideModalOpen = modalType === "hide";
  const isEditModalOpen = modalType === "edit";

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar role="Marketer" />
      <div className="flex-1 flex flex-col">
        <Header role="Marketer" />

        <main className="flex-1 p-6 md:p-10 overflow-auto">
          <div className="flex flex-col gap-8">
            <div className="text-[#667085] text-sm font-medium">
              <Link
                href="/users/marketer"
                className="hover:text-black transition-colors"
              >
                Dashboard
              </Link>{" "}
              &gt; <span className="text-[#98A2B3]">Enquiries</span>
            </div>

            <div className="flex justify-between items-center">
              <h1 className="text-[28px] font-bold text-[#101828]">
                All Enquiries
              </h1>
            </div>

            {error && (
              <div className="rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm text-[#B42318]">
                {error}
              </div>
            )}

            <div className="bg-white rounded-2xl border border-[#EAECF0] overflow-hidden shadow-sm overflow-x-auto">
              <table className="w-full border-collapse min-w-200">
                <thead>
                  <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                    <th className="text-left px-6 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">
                      #
                    </th>
                    <th className="text-left px-6 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">
                      Title
                    </th>
                    <th className="text-left px-6 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">
                      Client
                    </th>
                    <th className="text-left px-6 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">
                      Category
                    </th>
                    <th className="text-left px-6 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-right px-6 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAECF0]">
                  {loading ? (
                    <tr>
                      <td
                        className="px-6 py-8 text-sm text-[#667085]"
                        colSpan={6}
                      >
                        Loading enquiries...
                      </td>
                    </tr>
                  ) : enquiries.length === 0 ? (
                    <tr>
                      <td
                        className="px-6 py-8 text-sm text-[#667085]"
                        colSpan={6}
                      >
                        No enquiries found.
                      </td>
                    </tr>
                  ) : (
                    enquiries.map((enq, index) => (
                      <tr
                        key={enq.id}
                        className={cn(
                          "hover:bg-[#F9FAFB] transition-colors",
                          enq.isHidden &&
                            "bg-[#F2F4F7]/60 opacity-60 grayscale-[0.5]"
                        )}
                      >
                        <td className="px-6 py-5 text-sm text-[#667085]">
                          {index + 1}
                        </td>
                        <td className="px-6 py-5 text-sm font-semibold text-[#101828]">
                          <button 
                            onClick={() => openEnquiry(enq)}
                            className="hover:text-primary transition-colors text-left"
                          >
                            {enq.title}
                          </button>
                        </td>
                        <td className="px-6 py-5 text-sm text-[#667085]">
                          {enq.createdByUserName || "N/A"}
                        </td>
                        <td className="px-6 py-5 text-sm text-[#667085]">
                          {enq.categoryLabel || enq.category}
                        </td>
                        <td className="px-6 py-5">
                          <span
                            className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize ${
                              enq.enquiryStatus.toLowerCase() === "pending"
                                ? "bg-[#FEF3F2] text-[#B42318]"
                                : "bg-[#ECFDF3] text-[#027A48]"
                            }`}
                          >
                            {enq.enquiryStatus}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex justify-end gap-3 text-[#667085]">
                            <button
                              onClick={() => handleAction(enq.id, "View")}
                              className="p-1 hover:text-primary transition-colors"
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              onClick={() => handleAction(enq.id, "Edit")}
                              className="p-1 hover:text-primary transition-colors"
                            >
                              <Edit3 size={18} />
                            </button>
                            <button
                              onClick={() => handleAction(enq.id, "Hide")}
                              className={cn(
                                "p-1 transition-colors",
                                enq.isHidden
                                  ? "text-primary"
                                  : "hover:text-primary"
                              )}
                              title={enq.isHidden ? "Unhide" : "Hide"}
                            >
                              <EyeOff size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      <ConfirmationModal
        isOpen={isHideModalOpen}
        onClose={closeModal}
        onConfirm={() => activeEnquiry && confirmHide(activeEnquiry.id)}
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
