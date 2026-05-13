"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ChevronRight, ArrowLeft, EyeOff, Package } from "lucide-react";
import AdminSidebar from "@/components/shared/AdminSidebar";
import AdminHeader from "@/components/shared/AdminHeader";
import { cn } from "@/lib/utils";
import { ConfirmationModal } from "@/components/shared/Modals";
import EditStatusModal from "@/components/shared/EditStatusModal";

function StatusPill({ status }: { status: string }) {
  const s = status.toLowerCase();
  const styles =
    {
      approved: "bg-[#E9F8F1] text-[#27B973]",
      active: "bg-[#E9F8F1] text-[#27B973]",
      rejected: "bg-[#FEEBEB] text-[#F84F4F]",
      pending: "bg-[#F2F4F7] text-[#666]",
      normal: "bg-[#E9F8F1] text-[#27B973]",
      moderate: "bg-[#F2F4F7] text-[#666]",
      true: "bg-[#E9F8F1] text-[#27B973]",
      false: "bg-[#FEEBEB] text-[#F84F4F]",
    }[s] || "bg-[#F2F4F7] text-[#666]";

  return (
    <span
      className={cn(
        "px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-tight whitespace-nowrap",
        styles,
      )}
    >
      {s}
    </span>
  );
}

export default function EnquiryDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [enquiryData] = useState({
    title: "First Enquiry",
    client: "Company name test",
    category: "Services",
    subCategory: "Electronics",
    description: "This Enquiry Description",
    requiredDate: "2024-03-01",
    unit: "ea",
    quantity: 214,
    adminStatus: "approved",
    enquiry_status: "active",
    requestType: "normal",
    offers_received: "true",
    standard: "STANDARD",
    qualification: "QUALIFICATION",
    purpose: "The Purpose of The Enquiry",
  });

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <AdminSidebar role="SuperAdmin" />
      <div className="flex-1 flex flex-col min-w-0 font-sans">
        <AdminHeader role="SuperAdmin" />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-[1300px] mx-auto space-y-12">
            
            <div className="flex items-center gap-2 text-[13px] font-bold lowercase">
              <Link href="/super-admin" className="text-[#333] capitalize">
                Dashboard
              </Link>
              <ChevronRight size={14} className="text-[#999]" />
              <Link
                href="/super-admin/enquiries"
                className="text-[#333] capitalize"
              >
                enquiries
              </Link>
              <ChevronRight size={14} className="text-[#999]" />
              <span className="text-[#999] font-medium">
                {enquiryData.title}
              </span>
            </div>

<div className="bg-white rounded-[32px] border border-[#F2F4F7] shadow-sm overflow-hidden pb-10">
              <div className="p-10 border-b border-[#F2F4F7] flex items-center justify-between">
                <h1 className="text-[20px] font-black text-[#333]">
                  Enquire Details
                </h1>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsStatusModalOpen(true)}
                    className="text-[13px] font-bold text-[#666] hover:text-black transition-colors underline"
                  >
                    Edit Status
                  </button>
                  <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="text-[#999] hover:text-black transition-colors"
                    title="Hide"
                  >
                    <EyeOff size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 divide-x divide-[#F2F4F7]">
                
                <div className="grid grid-cols-2 border-b border-[#F2F4F7]">
                  <div className="p-8 text-[14px] text-[#999] font-medium">
                    title
                  </div>
                  <div className="p-8 text-[14px] font-bold text-[#333]">
                    {enquiryData.title}
                  </div>
                </div>
                <div className="grid grid-cols-2 border-b border-[#F2F4F7]">
                  <div className="p-8 text-[14px] text-[#999] font-medium">
                    request type
                  </div>
                  <div className="p-8">
                    <StatusPill status={enquiryData.requestType} />
                  </div>
                </div>

<div className="grid grid-cols-2 border-b border-[#F2F4F7]">
                  <div className="p-8 text-[14px] text-[#999] font-medium">
                    required_date
                  </div>
                  <div className="p-8 text-[14px] font-bold text-[#333]">
                    {enquiryData.requiredDate}
                  </div>
                </div>
                <div className="grid grid-cols-2 border-b border-[#F2F4F7]">
                  <div className="p-8 text-[14px] text-[#999] font-medium">
                    company name
                  </div>
                  <div className="p-8 text-[14px] font-bold text-[#333] tracking-tight">
                    {enquiryData.client}
                  </div>
                </div>

<div className="grid grid-cols-2 border-b border-[#F2F4F7]">
                  <div className="p-8 text-[14px] text-[#999] font-medium">
                    category
                  </div>
                  <div className="p-8 text-[14px] text-[#333] font-medium tracking-tight">
                    {enquiryData.category}
                  </div>
                </div>
                <div className="grid grid-cols-2 border-b border-[#F2F4F7]">
                  <div className="p-8 text-[14px] text-[#999] font-medium">
                    enquiry_status
                  </div>
                  <div className="p-8 text-[14px] font-bold text-[#333]">
                    {enquiryData.enquiry_status}
                  </div>
                </div>

<div className="grid grid-cols-2 border-b border-[#F2F4F7]">
                  <div className="p-8 text-[14px] text-[#999] font-medium">
                    quantity
                  </div>
                  <div className="p-8 text-[14px] font-bold text-[#333]">
                    {enquiryData.quantity}
                  </div>
                </div>
                <div className="grid grid-cols-2 border-b border-[#F2F4F7]">
                  <div className="p-8 text-[14px] text-[#999] font-medium">
                    accepted price
                  </div>
                  <div className="p-8 text-[14px] font-bold text-[#333]">-</div>
                </div>

<div className="grid grid-cols-2 border-b border-[#F2F4F7]">
                  <div className="p-8 text-[14px] text-[#999] font-medium">
                    enquiry eta
                  </div>
                  <div className="p-8 text-[14px] font-bold text-[#333]">-</div>
                </div>
                <div className="grid grid-cols-2 border-b border-[#F2F4F7]">
                  <div className="p-8 text-[14px] text-[#999] font-medium">
                    description
                  </div>
                  <div className="p-8 text-[14px] font-bold text-[#333] tracking-tight">
                    {enquiryData.description}
                  </div>
                </div>

<div className="grid grid-cols-2 border-b border-[#F2F4F7]">
                  <div className="p-8 text-[14px] text-[#999] font-medium">
                    offers_received
                  </div>
                  <div className="p-8 text-[14px] font-bold text-[#333]">
                    {enquiryData.offers_received}
                  </div>
                </div>
                <div className="grid grid-cols-2 border-b border-[#F2F4F7]">
                  <div className="p-8 text-[14px] text-[#999] font-medium">
                    purpose
                  </div>
                  <div className="p-8 text-[14px] font-bold text-[#333] tracking-tight">
                    {enquiryData.purpose}
                  </div>
                </div>

<div className="grid grid-cols-2 border-b border-[#F2F4F7]">
                  <div className="p-8 text-[14px] text-[#999] font-medium">
                    standard
                  </div>
                  <div className="p-8 text-[14px] font-bold text-[#333]">
                    {enquiryData.standard}
                  </div>
                </div>
                <div className="grid grid-cols-2 border-b border-[#F2F4F7]">
                  <div className="p-8 text-[14px] text-[#999] font-medium">
                    qualification
                  </div>
                  <div className="p-8 text-[14px] font-bold text-[#333]">
                    {enquiryData.qualification}
                  </div>
                </div>

<div className="col-span-2 grid grid-cols-[25%_75%]">
                  <div className="p-8 text-[14px] text-[#999] font-medium">
                    Image
                  </div>
                  <div className="p-8">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden border border-[#EAECF0]">
                      <Package size={20} className="text-[#999]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <EditStatusModal
          isOpen={isStatusModalOpen}
          onClose={() => setIsStatusModalOpen(false)}
          currentStatus={enquiryData.adminStatus}
          options={["approved", "pending", "rejected"]}
          onUpdate={(newStatus) => {
            
          }}
          title="Update Enquiry Status"
        />

        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            router.push("/super-admin/enquiries");
          }}
          title="Hide Enquiry"
          message="Are you sure you want to hide this enquiry? It will no longer be visible to others."
          confirmText="Hide"
        />
      </div>
    </div>
  );
}
