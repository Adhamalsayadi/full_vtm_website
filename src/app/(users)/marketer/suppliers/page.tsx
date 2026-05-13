"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "../../client/Sidebar/Sidebar";
import Header from "../../client/header";
import { Eye, Settings, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const mockSuppliers = [
  { id: "1", companyName: "Company name test", code: "SA-SP-23BRX20S", vtmStatus: "pending", adminStatus: "pending" },
  { id: "2", companyName: "Company name 4", code: "SA-SP-23BRX20A", vtmStatus: "approved", adminStatus: "pending" },
  { id: "3", companyName: "Company name 5", code: "SA-SP-23BRX20B", vtmStatus: "pending", adminStatus: "pending" },
  { id: "4", companyName: "My Company", code: "KSA-SP-241R95JZP", vtmStatus: "approved", adminStatus: "approved" },
  { id: "5", companyName: "dddd", code: "KSA-SP-24BJI4Y89", vtmStatus: "pending", adminStatus: "pending" },
  { id: "6", companyName: "dsfsd", code: "KSA-SP-24Z715GBO", vtmStatus: "pending", adminStatus: "pending" },
];

function statusBadge(status: string) {
  const lower = status.toLowerCase();
  if (lower === "approved")
    return "bg-[#ECFDF3] text-[#027A48]";
  if (lower === "rejected")
    return "bg-[#FEF2F2] text-[#B42318]";
  return "bg-[#F2F4F7] text-[#344054]"; 
}

export default function MarketerSuppliersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = mockSuppliers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginated = mockSuppliers.slice(startIndex, endIndex);

  const goToPage = (p: number) => setCurrentPage(Math.min(Math.max(1, p), totalPages));

  const handleAction = (id: string, action: string) => {
    alert(`${action} action on supplier ${id}`);
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
              <span className="text-[#98A2B3]">suppliers</span>
            </div>

            <h1 className="text-[28px] font-bold text-[#101828]">suppliers</h1>

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
                        <td className="px-4 py-8 text-sm text-[#667085]" colSpan={6}>No suppliers found.</td>
                      </tr>
                    ) : (
                      paginated.map((s, i) => (
                        <tr key={s.id} className="hover:bg-[#F9FAFB] transition-colors">
                          <td className="px-4 py-5 text-sm text-[#667085]">{startIndex + i + 1}</td>
                          <td className="px-4 py-5 text-sm font-semibold text-[#101828] underline truncate">
                            <Link href={`/marketer/suppliers/${s.id}`}>{s.companyName}</Link>
                          </td>
                          <td className="px-4 py-5 text-sm text-[#667085] truncate">{s.code}</td>
                          <td className="px-4 py-5">
                            <span className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize ${statusBadge(s.vtmStatus)}`}>
                              {s.vtmStatus}
                            </span>
                          </td>
                          <td className="px-4 py-5">
                            <span className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize ${statusBadge(s.adminStatus)}`}>
                              {s.adminStatus}
                            </span>
                          </td>
                          <td className="px-4 py-5">
                            <div className="flex items-center justify-center gap-3 text-[#667085]">
                              <button onClick={() => handleAction(s.id, "View")} className="p-1 hover:text-primary transition-colors" title="View">
                                <Eye size={16} />
                              </button>
                              <button onClick={() => handleAction(s.id, "Manage")} className="p-1 hover:text-primary transition-colors" title="Manage">
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
