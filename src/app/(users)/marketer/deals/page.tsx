"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "../../client/Sidebar/Sidebar";
import Header from "../../client/header";
import { Settings, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const mockDeals = [
  { id: "1", enquiry: "Second Enquiry", client: "Company name 2", supplier: "Company name 5", invoiceSent: "invoice sent", paymentReceived: "payment not received" },
  { id: "2", enquiry: "enquiry title new", client: "company 2", supplier: "My Company", invoiceSent: "invoice not sent", paymentReceived: "payment not received" },
];

function invoiceBadge(status: string) {
  const lower = status.toLowerCase();
  if (lower.includes("not sent"))
    return "bg-[#FEF2F2] text-[#B42318]";
  return "bg-[#ECFDF3] text-[#027A48]"; 
}

function paymentBadge(status: string) {
  const lower = status.toLowerCase();
  if (lower.includes("not received"))
    return "bg-[#FEF2F2] text-[#B42318]";
  return "bg-[#ECFDF3] text-[#027A48]"; 
}

export default function MarketerDealsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = mockDeals.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginated = mockDeals.slice(startIndex, endIndex);

  const goToPage = (p: number) => setCurrentPage(Math.min(Math.max(1, p), totalPages));

  const handleAction = (id: string, action: string) => {
    alert(`${action} action on deal ${id}`);
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar role="Marketer" />
      <div className="flex-1 flex flex-col">
        <Header role="Marketer" />

        <main className="flex-1 p-6 md:p-10 overflow-auto">
          <div className="flex flex-col gap-6">
            <div className="text-[#667085] text-sm font-medium flex items-center gap-2">
              <Link href="/marketer" className="hover:text-black transition-colors">Dashboard</Link>
              <span className="text-[#98A2B3]">&gt;</span>
              <span className="text-[#98A2B3]">deals</span>
            </div>

            <h1 className="text-[28px] font-bold text-[#101828]">deals</h1>

            <div className="bg-white rounded-2xl border border-[#EAECF0] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse" style={{ tableLayout: "fixed", minWidth: 800 }}>
                  <colgroup>
                    <col style={{ width: "5%" }} />
                    <col style={{ width: "17%" }} />
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "17%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "11%" }} />
                  </colgroup>
                  <thead>
                    <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                      <th className="text-left px-4 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">#</th>
                      <th className="text-left px-4 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">ENQUIRY</th>
                      <th className="text-left px-4 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">CLIENT</th>
                      <th className="text-left px-4 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">SUPPLIER</th>
                      <th className="text-left px-4 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">INVOICE SENT</th>
                      <th className="text-left px-4 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">PAYMENT RECEIVED</th>
                      <th className="text-center px-4 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAECF0]">
                    {paginated.length === 0 ? (
                      <tr>
                        <td className="px-4 py-8 text-sm text-[#667085]" colSpan={7}>No deals found.</td>
                      </tr>
                    ) : (
                      paginated.map((d, i) => (
                        <tr key={d.id} className="hover:bg-[#F9FAFB] transition-colors">
                          <td className="px-4 py-5 text-sm text-[#667085]">{startIndex + i + 1}</td>
                          <td className="px-4 py-5 text-sm font-semibold text-[#101828] underline truncate">
                            <Link href={`/marketer/deals/${d.id}`}>{d.enquiry}</Link>
                          </td>
                          <td className="px-4 py-5 text-sm text-[#101828] underline truncate">
                            <Link href="#">{d.client}</Link>
                          </td>
                          <td className="px-4 py-5 text-sm text-[#101828] underline truncate">
                            <Link href="#">{d.supplier}</Link>
                          </td>
                          <td className="px-4 py-5">
                            <span className={`px-2.5 py-1.5 rounded-full text-xs font-bold ${invoiceBadge(d.invoiceSent)}`}>
                              {d.invoiceSent}
                            </span>
                          </td>
                          <td className="px-4 py-5">
                            <span className={`px-2.5 py-1.5 rounded-full text-xs font-bold ${paymentBadge(d.paymentReceived)}`}>
                              {d.paymentReceived}
                            </span>
                          </td>
                          <td className="px-4 py-5">
                            <div className="flex items-center justify-center text-[#667085]">
                              <button onClick={() => handleAction(d.id, "Manage")} className="p-1 hover:text-primary transition-colors" title="Manage">
                                <Settings size={16} />
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
                  <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="rounded-lg border border-[#D0D5DD] bg-white px-3 py-1.5 text-sm text-[#344054] outline-none focus:border-primary">
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                <span>{totalItems === 0 ? "0 from 0" : `${startIndex + 1}-${endIndex} from ${totalItems}`}</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => goToPage(1)} disabled={currentPage === 1} className="p-1.5 rounded-lg hover:bg-[#F2F4F7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"><ChevronsLeft size={18} /></button>
                  <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="p-1.5 rounded-lg hover:bg-[#F2F4F7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"><ChevronLeft size={18} /></button>
                  <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="p-1.5 rounded-lg hover:bg-[#F2F4F7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"><ChevronRight size={18} /></button>
                  <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages} className="p-1.5 rounded-lg hover:bg-[#F2F4F7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"><ChevronsRight size={18} /></button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
