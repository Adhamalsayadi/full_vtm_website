"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "../../client/Sidebar/Sidebar";
import Header from "../../client/header";

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

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar role="Supplier" />
      <div className="flex-1 flex flex-col">
        <Header role="Supplier" />

        <main className="flex-1 p-6 md:p-10 overflow-auto">
          <div className="flex flex-col gap-8">
            <div className="text-[#667085] text-sm font-medium">
              <Link href="/supplier" className="hover:text-black transition-colors">
                Dashboard
              </Link>{" "}
              &gt; <span className="text-[#98A2B3]">offers</span>
            </div>

            <h1 className="text-[28px] font-bold text-[#101828]">offers</h1>

            <div className="bg-white rounded-2xl border border-[#EAECF0] overflow-hidden shadow-sm overflow-x-auto">
              <table className="w-full border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                    <th className="text-left px-6 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">#</th>
                    <th className="text-left px-6 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">Enquiry Title</th>
                    <th className="text-left px-6 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">Price</th>
                    <th className="text-center px-6 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">VTM Status</th>
                    <th className="text-center px-6 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">Admin Status</th>
                    <th className="text-center px-6 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">Is Accepted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAECF0]">
                  {offers.map((offer, index) => (
                    <tr key={offer.id} className="hover:bg-[#F9FAFB] transition-all duration-300">
                      <td className="px-6 py-5 text-sm font-semibold text-[#101828]">
                        {index + 1}
                      </td>
                      <td className="px-6 py-5 text-sm font-semibold text-[#101828]">
                        {offer.enquiryTitle}
                      </td>
                      <td className="px-6 py-5 text-sm text-[#667085]">{offer.price}</td>
                      <td className="px-6 py-5 text-center">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize ${
                            offer.vtmStatus === "approved" ? "bg-[#e2fced] text-[#1dd066]" : "bg-[#F2F4F7] text-[#667085]"
                        }`}>
                          {offer.vtmStatus}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize ${
                            offer.adminStatus === "approved" ? "bg-[#e2fced] text-[#1dd066]" : "bg-[#F2F4F7] text-[#667085]"
                        }`}>
                          {offer.adminStatus}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize ${
                            offer.acceptanceStatus === "accepted" ? "bg-[#e2fced] text-[#1dd066]" : "bg-[#F2F4F7] text-[#667085]"
                        }`}>
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
                  <div className="flex items-center border border-[#EAECF0] rounded px-3 py-1.5 cursor-pointer">
                    <span>10</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
                <div>1-1 from 1</div>
                <div className="flex items-center gap-3 ml-2">
                  <button className="text-[#D0D5DD] cursor-not-allowed">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/></svg>
                  </button>
                  <button className="text-[#D0D5DD] cursor-not-allowed">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                  </button>
                  <button className="text-[#D0D5DD] cursor-not-allowed">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                  <button className="text-[#D0D5DD] cursor-not-allowed">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 17l5-5-5-5M6 17l5-5-5-5"/></svg>
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
