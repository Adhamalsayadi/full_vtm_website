"use client";

import { useState } from "react";
import Link from "next/link";
import { useModalFlow } from "@/hooks/useModalFlow";
import { Enquiry } from "@/types/enquiries";
import Sidebar from "../../client/Sidebar/Sidebar";
import Header from "../../client/header";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
} from "lucide-react";

const initialOffers = [
  {
    id: 1,
    enquiryTitle: "Second Enquiry",
    price: "170.00",
    vtmStatus: "approved",
    adminStatus: "pending",
    acceptanceStatus: "accepted",
  },
];

export default function SupplierOffersPage() {
  const [offers, setOffers] = useState(initialOffers);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { openEnquiry, renderModals } = useModalFlow();

  const totalItems = offers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedOffers = offers.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar role="Supplier" />
      <div className="flex-1 flex flex-col">
        <Header role="Supplier" />

        <main className="flex-1 p-6 md:p-10 overflow-auto">
          <div className="flex flex-col gap-8">
            <div className="text-[#667085] text-sm font-medium">
              <Link
                href="/supplier"
                className="hover:text-black transition-colors"
              >
                Dashboard
              </Link>{" "}
              &gt; <span className="text-[#98A2B3]">offers</span>
            </div>

            <h1 className="text-[28px] font-bold text-[#101828]">offers</h1>

            <div className="bg-white rounded-2xl border border-[#EAECF0] overflow-hidden shadow-sm overflow-x-auto">
              <table className="w-full border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                    <th className="text-left px-6 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">
                      #
                    </th>
                    <th className="text-left px-6 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">
                      Enquiry Title
                    </th>
                    <th className="text-left px-6 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">
                      Price
                    </th>
                    <th className="text-center px-6 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">
                      VTM Status
                    </th>
                    <th className="text-center px-6 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">
                      Admin Status
                    </th>
                    <th className="text-center px-6 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">
                      Is Accepted
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAECF0]">
                  {paginatedOffers.map((offer, index) => (
                    <tr
                      key={offer.id}
                      className="hover:bg-[#F9FAFB] transition-all duration-300"
                    >
                      <td className="px-6 py-5 text-sm font-semibold text-[#101828]">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-6 py-5 text-sm font-semibold text-[#101828]">
                        <button 
                          onClick={() => openEnquiry({
                            id: offer.id.toString(),
                            title: offer.enquiryTitle,
                            vtmStatus: offer.vtmStatus,
                            adminStatus: offer.adminStatus,
                            // Dummy data to satisfy the type
                            category: "", subCategory: "", sellerId: "", sellerName: "",
                            time: "", clientRate: 0, vtRate: 0, image: "", requiredDate: "",
                            requestType: "", enquiryStatus: "", quantity: 0, purpose: "",
                            enquiryEta: "", standard: "", offersReceived: false
                          } as Enquiry)}
                          className="text-[#101828] hover:text-primary hover:underline transition-colors text-left"
                        >
                          {offer.enquiryTitle}
                        </button>
                      </td>
                      <td className="px-6 py-5 text-sm text-[#667085]">
                        {offer.price}
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize ${
                            offer.vtmStatus === "approved"
                              ? "bg-[#e2fced] text-[#1dd066]"
                              : "bg-[#F2F4F7] text-[#667085]"
                          }`}
                        >
                          {offer.vtmStatus}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize ${
                            offer.adminStatus === "approved"
                              ? "bg-[#e2fced] text-[#1dd066]"
                              : "bg-[#F2F4F7] text-[#667085]"
                          }`}
                        >
                          {offer.adminStatus}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize ${
                            offer.acceptanceStatus === "accepted"
                              ? "bg-[#e2fced] text-[#1dd066]"
                              : "bg-[#F2F4F7] text-[#667085]"
                          }`}
                        >
                          {offer.acceptanceStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex items-center justify-end px-6 py-4 border-t border-[#EAECF0] gap-4 text-sm text-[#667085]">
                <div className="flex items-center gap-2">
                  <span>items per page</span>
                  <div className="relative group">
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 py-1.5 pr-8 text-sm text-[#344054] outline-none focus:border-primary cursor-pointer font-medium"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none"
                    />
                  </div>
                </div>
                <div>
                  {totalItems === 0
                    ? "0 offers"
                    : `${startIndex + 1}-${endIndex} of ${totalItems} offers`}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => goToPage(1)}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-lg hover:bg-[#F2F4F7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="First page"
                  >
                    <ChevronsLeft size={16} />
                  </button>
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-lg hover:bg-[#F2F4F7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Previous page"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-lg hover:bg-[#F2F4F7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Next page"
                  >
                    <ChevronRight size={16} />
                  </button>
                  <button
                    onClick={() => goToPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-lg hover:bg-[#F2F4F7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Last page"
                  >
                    <ChevronsRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {renderModals()}
    </div>
  );
}
