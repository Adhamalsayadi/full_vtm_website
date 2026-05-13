"use client";

import { useState } from "react";
import AdminSidebar from "@/components/shared/AdminSidebar";
import AdminHeader from "@/components/shared/AdminHeader";
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  RefreshCcw,
  ChevronFirst,
  ChevronLast,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

import EditStatusModal from "@/components/shared/EditStatusModal";
import { useRouter } from "next/navigation";

interface Deal {
  id: number;
  enquiry: string;
  client: string;
  supplier: string;
  inv: string;
  pay: string;
}

const mockDeals: Deal[] = [
  {
    id: 1,
    enquiry: "Second Enquiry",
    client: "Company name 2",
    supplier: "Company name 5",
    inv: "invoice sent",
    pay: "payment not received",
  },
  {
    id: 2,
    enquiry: "enquiry title new",
    client: "company 2",
    supplier: "My Company",
    inv: "invoice not sent",
    pay: "payment not received",
  },
];

function StatusPill({ status }: { status: string }) {
  const s = status.toLowerCase();
  const styles =
    {
      "invoice sent": "bg-[#E9F8F1] text-[#27B973]",
      "invoice not sent": "bg-[#FEEBEB] text-[#F84F4F]",
      "payment received": "bg-[#E9F8F1] text-[#27B973]",
      "payment not received": "bg-[#FEEBEB] text-[#F84F4F]",
      pending: "bg-[#F2F4F7] text-[#666]",
    }[s] || "bg-[#F2F4F7] text-[#666]";

  return (
    <span
      className={cn(
        "px-4 py-1.5 rounded-full text-[10px] font-black tracking-wider whitespace-nowrap",
        styles,
      )}
    >
      {s}
    </span>
  );
}

export default function SuperAdminDeals() {
  const router = useRouter();
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [statusType, setStatusType] = useState<"invoice" | "payment">(
    "invoice",
  );

  const handleEditInvoiceStatus = (deal: Deal) => {
    setSelectedDeal(deal);
    setStatusType("invoice");
    setIsStatusModalOpen(true);
  };

  const handleEditPaymentStatus = (deal: Deal) => {
    setSelectedDeal(deal);
    setStatusType("payment");
    setIsStatusModalOpen(true);
  };

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
              <span className="text-[#333]">deals</span>
            </div>

            <h1 className="text-2xl font-bold text-[#333] mb-8 lowercase">
              deals
            </h1>

            <div className="bg-white rounded-[32px] shadow-sm border border-[#F2F4F7] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#F2F4F7]">
                      <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider w-16">
                        #
                      </th>
                      <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider whitespace-nowrap">
                        ENQUIRY
                      </th>
                      <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider">
                        CLIENT
                      </th>
                      <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider">
                        SUPPLIER
                      </th>
                      <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider whitespace-nowrap">
                        INVOICE SENT
                      </th>
                      <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider whitespace-nowrap">
                        PAYMENT RECEIVED
                      </th>
                      <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider text-right">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2F4F7]">
                    {mockDeals.map((deal) => (
                      <tr
                        key={deal.id}
                        className="hover:bg-[#F9FAFB] transition-colors group"
                      >
                        <td className="px-8 py-6 text-sm font-medium text-[#333]">
                          {deal.id}
                        </td>
                        <td className="px-8 py-6 font-bold text-sm text-[#1D1F24] hover:underline cursor-pointer">
                          {deal.enquiry}
                        </td>
                        <td className="px-8 py-6 font-bold text-sm text-[#1D1F24] hover:underline cursor-pointer">
                          {deal.client}
                        </td>
                        <td className="px-8 py-6 font-bold text-sm text-[#1D1F24] hover:underline cursor-pointer">
                          {deal.supplier}
                        </td>
                        <td className="px-8 py-6">
                          <button
                            onClick={() => handleEditInvoiceStatus(deal)}
                            className="hover:opacity-80 transition-opacity"
                          >
                            <StatusPill status={deal.inv} />
                          </button>
                        </td>
                        <td className="px-8 py-6">
                          <button
                            onClick={() => handleEditPaymentStatus(deal)}
                            className="hover:opacity-80 transition-opacity"
                          >
                            <StatusPill status={deal.pay} />
                          </button>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-3 text-[#999]">
                            <button
                              onClick={() => handleEditInvoiceStatus(deal)}
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
                    <select className="appearance-none bg-[#F9FAFB] border border-[#EAECF0] rounded-xl px-4 py-2.5 pr-10 text-[13px] font-black text-[#1D1F24] outline-none cursor-pointer">
                      <option>10</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <span className="text-[13px] font-black text-[#1D1F24]">
                    1-2 from 2
                  </span>
                  <div className="flex items-center gap-4">
                    <button className="text-[#CCC]">
                      <ChevronFirst size={20} />
                    </button>
                    <button className="text-[#CCC]">
                      <ChevronLeft size={20} />
                    </button>
                    <button className="text-[#CCC]">
                      <ChevronRight size={20} />
                    </button>
                    <button className="text-[#CCC]">
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
          currentStatus={
            (statusType === "invoice" ? selectedDeal?.inv : selectedDeal?.pay) ?? ""
          }
          options={
            statusType === "invoice"
              ? ["invoice sent", "invoice not sent"]
              : ["payment received", "payment not received"]
          }
          onUpdate={(newStatus) => {
            console.log(
              `Updating deal ${statusType} status:`,
              selectedDeal?.id,
              newStatus,
            );
          }}
          title={`Edit ${statusType === "invoice" ? "Invoice" : "Payment"} Status`}
          label="Status"
        />
      </div>
    </div>
  );
}
