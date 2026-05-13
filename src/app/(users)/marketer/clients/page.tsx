"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "../../client/Sidebar/Sidebar";
import Header from "../../client/header";
import { Eye, Settings, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const mockClients = [
  { id: "1", companyName: "Company name test", code: "SA-CL-23BRX20DE", vtmStatus: "rejected", adminStatus: "pending" },
  { id: "2", companyName: "Company name 2", code: "SA-CL-23BRX20DS", vtmStatus: "approved", adminStatus: "approved" },
  { id: "3", companyName: "Company name 3", code: "SA-CL-23BRX20DC", vtmStatus: "pending", adminStatus: "pending" },
  { id: "4", companyName: "company 2", code: "KSA-CL-24Q4OCL9F", vtmStatus: "approved", adminStatus: "approved" },
];

function statusBadge(status: string) {
  const lower = status.toLowerCase();
  if (lower === "approved")
    return "bg-[#ECFDF3] text-[#027A48]";
  if (lower === "rejected")
    return "bg-[#FEF2F2] text-[#B42318]";
  return "bg-[#F2F4F7] text-[#344054]"; 
}

export default function MarketerClientsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = mockClients.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginated = mockClients.slice(startIndex, endIndex);

  const goToPage = (p: number) => setCurrentPage(Math.min(Math.max(1, p), totalPages));

  const handleAction = (id: string, action: string) => {
    alert(`${action} action on client ${id}`);
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
              <span className="text-[#98A2B3]">clients</span>
            </div>

            <h1 className="text-[28px] font-bold text-[#101828]">clients</h1>

            <div className="bg-white rounded-2xl border border-[#EAECF0] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse" style={{ tableLayout: "fixed", minWidth: 750 }}>
                  <colgroup>
                    <col style={{ width: "5%" }} />
                    <col style={{ width: "22%" }} />
                    <col style={{ width: "22%" }} />
                    <col style={{ width: "17%" }} />
                    <col style={{ width: "17%" }} />
                    <col style={{ width: "17%" }} />
                  </colgroup>
                  <thead>
                    <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                      <th className="text-left px-4 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">#</th>
                      <th className="text-left px-4 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">COMPANY NAME</th>
                      <th className="text-left px-4 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">CODE</th>
                      <th className="text-left px-4 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">VTM STATUS</th>
                      <th className="text-left px-4 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">ADMIN STATUS</th>
                      <th className="text-center px-4 py-4 text-[#667085] text-xs font-bold uppercase tracking-wider">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAECF0]">
                    {paginated.length === 0 ? (
                      <tr>
                        <td className="px-4 py-8 text-sm text-[#667085]" colSpan={6}>No clients found.</td>
                      </tr>
                    ) : (
                      paginated.map((c, i) => (
                        <tr key={c.id} className="hover:bg-[#F9FAFB] transition-colors">
                          <td className="px-4 py-5 text-sm text-[#667085]">{startIndex + i + 1}</td>
                          <td className="px-4 py-5 text-sm font-semibold text-[#101828] underline truncate">
                            <Link href={`/marketer/clients/${c.id}`}>{c.companyName}</Link>
                          </td>
                          <td className="px-4 py-5 text-sm text-[#667085] truncate">{c.code}</td>
                          <td className="px-4 py-5">
                            <span className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize ${statusBadge(c.vtmStatus)}`}>
                              {c.vtmStatus}
                            </span>
                          </td>
                          <td className="px-4 py-5">
                            <span className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize ${statusBadge(c.adminStatus)}`}>
                              {c.adminStatus}
                            </span>
                          </td>
                          <td className="px-4 py-5">
                            <div className="flex items-center justify-center gap-3 text-[#667085]">
                              <button onClick={() => handleAction(c.id, "View")} className="p-1 hover:text-primary transition-colors" title="View">
                                <Eye size={16} />
                              </button>
                              <button onClick={() => handleAction(c.id, "Manage")} className="p-1 hover:text-primary transition-colors" title="Manage">
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
