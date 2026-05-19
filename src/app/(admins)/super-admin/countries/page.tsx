"use client";
import { useState } from "react";
import AdminSidebar from "@/components/shared/AdminSidebar";
import AdminHeader from "@/components/shared/AdminHeader";
import { 
  Plus, 
  ChevronRight, 
  ChevronLeft, 
  ChevronDown, 
  Pencil,
  ChevronFirst,
  ChevronLast
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const mockCountries = [
  { id: 1, name: "Kingdom Of Saudi Arabia", code: "KSA", flag: "/Saudi_flag.png", active: true },
  { id: 2, name: "Bahrain", code: "BH", flag: "/bahrain_flag.png", active: true },
];

export default function SuperAdminCountries() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = mockCountries.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedCountries = mockCountries.slice(startIndex, endIndex);

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <AdminSidebar role="SuperAdmin" />
      <div className="flex-1 flex flex-col min-w-0 font-sans">
        <AdminHeader role="SuperAdmin" />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-[1400px] mx-auto space-y-6">
            
            <div className="flex items-center gap-2 text-[13px] font-bold text-[#999] mb-8">
              <Link href="/super-admin" className="hover:text-[#333]">Dashboard</Link>
              <ChevronRight size={14} />
              <span className="text-[#333]">countries</span>
            </div>

            <div className="flex items-center justify-between mb-8">
               <h1 className="text-2xl font-bold text-[#333] lowercase">countries</h1>
               <Link 
                 href="/super-admin/countries/create"
                 className="bg-[#121111] text-white px-8 py-4 rounded-xl text-sm font-black uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-all shadow-md"
               >
                  <Plus size={18} />
                  CREATE NEW COUNTRY
               </Link>
            </div>

            <div className="bg-white rounded-[32px] shadow-sm border border-[#F2F4F7] overflow-hidden">
               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#F2F4F7]">
                        <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider w-24">#</th>
                        <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider">NAME</th>
                        <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider">CODE</th>
                        <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider">FLAG</th>
                        <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider">IS_ACTIVE</th>
                        <th className="px-8 py-6 text-[11px] font-bold text-[#999] uppercase tracking-wider text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2F4F7]">
                      {paginatedCountries.map((c, index) => (
                        <tr key={c.id} className="hover:bg-[#F9FAFB] transition-colors group">
                          <td className="px-8 py-6 text-sm font-medium text-[#333]">{startIndex + index + 1}</td>
                          <td className="px-8 py-6 font-bold text-sm text-[#1D1F24]">{c.name}</td>
                          <td className="px-8 py-6 text-sm font-bold text-[#666]">{c.code}</td>
                          <td className="px-8 py-6">
                             {c.flag ? (
                               <div className="w-12 h-8 relative rounded overflow-hidden shadow-sm border border-[#EAECF0]">
                                 <Image src={c.flag} alt="flag" fill className="object-cover" />
                               </div>
                             ) : (
                               <div className="w-12 h-8 bg-[#F9FAFB] border border-[#EAECF0] rounded"></div>
                             )}
                          </td>
                          <td className="px-8 py-6">
                             <span className="bg-[#E9F8F1] text-[#27B973] px-3 py-1 rounded-full text-[10px] font-black tracking-wider">
                               active
                             </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                             <div className="flex items-center justify-end gap-3 text-[#999]">
                               <Link 
                                 href={`/super-admin/countries/${c.id}/edit`}
                                 className="hover:text-[#333] transition-colors"
                               >
                                 <Pencil size={18} />
                               </Link>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>

               <div className="p-10 flex items-center justify-between border-t border-[#F2F4F7]">
                  <div className="flex items-center gap-4">
                    <span className="text-[13px] font-bold text-[#666]">items per page</span>
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
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
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
                         onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                         disabled={currentPage === 1}
                         className="text-[#999] disabled:text-[#CCC] hover:text-[#333] disabled:cursor-not-allowed transition-colors"
                       >
                         <ChevronLeft size={20} />
                       </button>
                       <button 
                         onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
      </div>
    </div>
  );
}
