"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "../../client/Sidebar/Sidebar";
import Header from "../../client/header";
import { Eye, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

const allOffers = Array.from({ length: 38 }, (_, i) => ({
  id: `${i + 1}`,
  enquiryTitle: `Enquiry #${i + 100} — ${["Oil Rig Maintenance", "Drilling Supply", "PPE Procurement", "Slickline Ops", "Pipe Inspection"][i % 5]}`,
  client: ["Saudi Aramco", "ADNOC", "BP", "Shell", "TotalEnergies"][i % 5],
  supplier: ["TechServ LLC", "Global Drill", "SafetyFirst", "OilTech", "PipeXpert"][i % 5],
  price: `$${(Math.floor(Math.random() * 400 + 50) * 1000).toLocaleString()}`,
  vtmStatus: i % 3 === 0 ? "pending" : "approved",
  adminStatus: i % 4 === 0 ? "pending" : "approved",
  acceptanceStatus: i % 5 === 0 ? "pending" : i % 2 === 0 ? "accepted" : "rejected",
}));

const statusColor: Record<string, string> = {
  approved: "bg-[#ECFDF3] text-[#027A48]",
  pending: "bg-[#F2F4F7] text-[#667085]",
  accepted: "bg-[#EFF8FF] text-[#175CD3]",
  rejected: "bg-[#FEF3F2] text-[#B42318]",
};

export default function MarketerOffersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = allOffers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedOffers = allOffers.slice(startIndex, endIndex);

  const goToPage = (p: number) => setCurrentPage(Math.min(Math.max(1, p), totalPages));

const pageNumbers: number[] = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + 4);
  for (let i = start; i <= end; i++) pageNumbers.push(i);

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar role="Marketer" />
      <div className="flex-1 flex flex-col">
        <Header role="Marketer" />

        <main className="flex-1 p-6 md:p-10 overflow-auto">
          <div className="flex flex-col gap-8">
            <div className="text-[#667085] text-sm font-medium">
              <Link href="/marketer" className="hover:text-black transition-colors">Dashboard</Link>{" "}
              &gt; <span className="text-[#98A2B3]">Offers</span>
            </div>

            <div className="flex justify-between items-center">
              <h1 className="text-[28px] font-bold text-[#101828]">All Offers</h1>
              <span className="text-sm text-[#667085] font-medium">{totalItems} offers total</span>
            </div>

            <div className="bg-white rounded-2xl border border-[#EAECF0] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[900px]">
                  <thead>
                    <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                      {["#", "Enquiry Title", "Client", "Supplier", "Price", "VTM Status", "Admin Status", "Acceptance", ""].map((h) => (
                        <th key={h} className="text-left px-5 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAECF0]">
                    {paginatedOffers.map((offer, idx) => (
                      <tr key={offer.id} className="hover:bg-[#F9FAFB] transition-colors">
                        <td className="px-5 py-4 text-sm text-[#667085]">{startIndex + idx + 1}</td>
                        <td className="px-5 py-4 text-sm font-semibold text-[#101828] max-w-[200px] truncate">{offer.enquiryTitle}</td>
                        <td className="px-5 py-4 text-sm text-[#475467]">{offer.client}</td>
                        <td className="px-5 py-4 text-sm text-[#475467]">{offer.supplier}</td>
                        <td className="px-5 py-4 text-sm font-bold text-[#027A48]">{offer.price}</td>
                        <td className="px-5 py-4">
                          <span className={cn("px-2.5 py-1 rounded-full text-xs font-bold capitalize", statusColor[offer.vtmStatus])}>
                            {offer.vtmStatus}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={cn("px-2.5 py-1 rounded-full text-xs font-bold capitalize", statusColor[offer.adminStatus])}>
                            {offer.adminStatus}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={cn("px-2.5 py-1 rounded-full text-xs font-bold capitalize", statusColor[offer.acceptanceStatus])}>
                            {offer.acceptanceStatus}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <button className="p-1.5 text-[#667085] hover:text-primary transition-colors" title="View">
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

<div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#EAECF0] px-5 py-4 text-sm text-[#667085]">
                <div className="flex items-center gap-2">
                  <span>Rows per page</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                    className="rounded-lg border border-[#D0D5DD] bg-white px-3 py-1.5 text-sm text-[#344054] outline-none focus:border-primary"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </div>

                <span className="text-sm">{startIndex + 1}–{endIndex} of {totalItems}</span>

                <div className="flex items-center gap-1">
                  <button onClick={() => goToPage(1)} disabled={currentPage === 1} className="p-1.5 rounded-lg hover:bg-[#F2F4F7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="First">
                    <ChevronsLeft size={18} />
                  </button>
                  <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="p-1.5 rounded-lg hover:bg-[#F2F4F7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="Previous">
                    <ChevronLeft size={18} />
                  </button>

                  {pageNumbers.map((n) => (
                    <button
                      key={n}
                      onClick={() => goToPage(n)}
                      className={cn(
                        "w-8 h-8 rounded-lg text-sm font-semibold transition-colors",
                        n === currentPage
                          ? "bg-primary text-black"
                          : "hover:bg-[#F2F4F7] text-[#344054]"
                      )}
                    >
                      {n}
                    </button>
                  ))}

                  <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="p-1.5 rounded-lg hover:bg-[#F2F4F7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="Next">
                    <ChevronRight size={18} />
                  </button>
                  <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages} className="p-1.5 rounded-lg hover:bg-[#F2F4F7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="Last">
                    <ChevronsRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
