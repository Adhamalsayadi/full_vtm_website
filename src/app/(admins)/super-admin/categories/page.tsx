"use client";

import { useState } from "react";
import AdminSidebar from "@/components/shared/AdminSidebar";
import AdminHeader from "@/components/shared/AdminHeader";
import {
  Plus,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Image as ImageIcon,
  Pencil,
  LayoutGrid,
  ChevronFirst,
  ChevronLast,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  name: string;
}

const mockCategories: Category[] = [
  { id: 1, name: "Category 1" },
  { id: 2, name: "Category 2" },
];

export default function SuperAdminCategories() {
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleOpenSubModal = (cat: Category) => {
    setSelectedCategory(cat);
    setIsSubModalOpen(true);
  };

  const totalItems = mockCategories.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedCategories = mockCategories.slice(startIndex, endIndex);

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <AdminSidebar role="SuperAdmin" />
      <div className="flex-1 flex flex-col min-w-0 font-sans relative">
        <AdminHeader role="SuperAdmin" />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-[1400px] mx-auto space-y-6">
            
            <div className="flex items-center gap-2 text-[13px] font-bold text-[#999] mb-8">
              <Link href="/super-admin" className="hover:text-[#333]">
                Dashboard
              </Link>
              <ChevronRight size={14} />
              <span className="text-[#333]">categories</span>
            </div>

            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-[#333] lowercase">
                categories
              </h1>
              <Link
                href="/super-admin/categories/create"
                className="bg-[#121111] text-white px-8 py-4 rounded-xl text-sm font-black uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-all shadow-md"
              >
                <Plus size={18} />
                CREATE NEW CATEGORY
              </Link>
            </div>

<div className="bg-white rounded-[32px] shadow-sm border border-[#F2F4F7] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#F2F4F7]">
                      <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider w-24">
                        #
                      </th>
                      <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider">
                        NAME
                      </th>
                      <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider">
                        ICON
                      </th>
                      <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider text-right">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2F4F7]">
                    {paginatedCategories.map((cat, index) => (
                      <tr
                        key={cat.id}
                        className="hover:bg-[#F9FAFB] transition-colors group"
                      >
                        <td className="px-8 py-6 text-sm font-medium text-[#333]">
                          {startIndex + index + 1}
                        </td>
                        <td className="px-8 py-6 font-bold text-sm text-[#1D1F24]">
                          {cat.name}
                        </td>
                        <td className="px-8 py-6">
                          <div className="w-12 h-12 bg-[#F9FAFB] border border-[#EAECF0] rounded-2xl flex items-center justify-center text-[#999]">
                            <ImageIcon size={20} />
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-3 text-[#999]">
                            <Link
                              href={`/super-admin/categories/${cat.id}/edit`}
                              className="hover:text-[#333] transition-colors"
                            >
                              <Pencil size={18} />
                            </Link>
                            <button
                              onClick={() => handleOpenSubModal(cat)}
                              className="hover:text-[#333] transition-colors"
                            >
                              <LayoutGrid size={18} />
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
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="appearance-none bg-[#F9FAFB] border border-[#EAECF0] rounded-xl px-4 py-2.5 pr-10 text-[13px] font-black text-[#1D1F24] outline-none cursor-pointer"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <span className="text-[13px] font-black text-[#1D1F24]">
                    {totalItems === 0 ? "0 from 0" : `${startIndex + 1}-${endIndex} from ${totalItems}`}
                  </span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="text-[#999] disabled:text-[#CCC] hover:text-[#333] disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronFirst size={20} />
                    </button>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="text-[#999] disabled:text-[#CCC] hover:text-[#333] disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="text-[#999] disabled:text-[#CCC] hover:text-[#333] disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="text-[#999] disabled:text-[#CCC] hover:text-[#333] disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLast size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

{isSubModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] p-6 backdrop-blur-sm">
            <div className="bg-white rounded-[32px] shadow-2xl border border-[#EAECF0] w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="p-10 border-b border-[#EAECF0] flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#1D1F24] lowercase">
                  Sub Categories Of ({selectedCategory?.name})
                </h3>
                <button
                  onClick={() => setIsSubModalOpen(false)}
                  className="w-10 h-10 rounded-full border border-[#EAECF0] flex items-center justify-center text-[#999] hover:text-[#333] transition-colors"
                >
                  <span className="text-2xl leading-none">×</span>
                </button>
              </div>

              <div className="p-10">
                <div className="flex justify-end mb-8">
                  <Link
                    href={`/super-admin/categories/${selectedCategory?.id}/sub/create`}
                    className="bg-[#121111] text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-all shadow-md"
                  >
                    <Plus size={16} />
                    CREATE NEW SUB CATEGORY
                  </Link>
                </div>

                <div className="border border-[#EAECF0] rounded-[24px] overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                        <th className="px-8 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider w-20">
                          #
                        </th>
                        <th className="px-8 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider">
                          NAME
                        </th>
                        <th className="px-8 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider">
                          ICON
                        </th>
                        <th className="px-8 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider text-right">
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAECF0]">
                      <tr>
                        <td colSpan={4} className="px-8 py-24 text-center">
                          <div className="flex flex-col items-center gap-3 text-[#999]">
                            <ImageIcon size={48} className="opacity-20" />
                            <span className="text-sm font-bold lowercase">
                              No sub categories found
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between mt-8">
                  <div className="flex items-center gap-4">
                    <span className="text-[12px] font-bold text-[#666]">
                      items per page
                    </span>
                    <select className="bg-[#F9FAFB] border border-[#EAECF0] rounded-xl px-4 py-2 text-[12px] font-black text-[#1D1F24] outline-none">
                      <option>10</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-[12px] font-black text-[#1D1F24]">
                      0-0 from 0
                    </span>
                    <div className="flex items-center gap-4">
                      <button className="text-[#CCC]">
                        <ChevronLeft size={18} />
                      </button>
                      <button className="text-[#CCC]">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
