"use client";

import { useState } from "react";
import AdminSidebar from "@/components/shared/AdminSidebar";
import AdminHeader from "@/components/shared/AdminHeader";
import { 
  Plus, 
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pencil,
  ChevronFirst,
  ChevronLast,
  ChevronRight as ChevronRightBread
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const mockVtms = [
  { id: "1", name: "Suliman", phone: "0555555559", email: "SulimanMokhtar1995@gmail.com" },
  { id: "2", name: "Admin", phone: "0512345670", email: "super_admin@gmail.com" },
  { id: "3", name: "User demo", phone: "0512345671", email: "user@gmail.com" },
  { id: "4", name: "User demo 2", phone: "0512345672", email: "vtm@gmail.com" },
  { id: "5", name: "test", phone: "589876543", email: "yzman@hi2.in" },
  { id: "6", name: "Amro", phone: "561358981", email: "eng.amero86@gmail.com" },
  { id: "7", name: "test 2", phone: "0563852699", email: "SulimanMokhtar123@gmail.com" },
];

export default function SuperAdminVtmManagement() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <AdminSidebar role="SuperAdmin" />
      <div className="flex-1 flex flex-col min-w-0 font-sans">
        <AdminHeader role="SuperAdmin" />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-[1400px] mx-auto space-y-6">

<div className="flex items-center gap-2 text-[13px] font-medium text-[#999]">
              <Link href="/super-admin" className="hover:text-[#333]">Dashboard</Link>
              <ChevronRightBread size={14} />
              <span className="text-[#333]">VTM</span>
            </div>

<div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-[#333]">VTMs</h1>
              <button
                onClick={() => router.push("/super-admin/vtm/create")}
                className="bg-[#121111] text-white px-5 py-2.5 rounded-lg text-[13px] font-bold flex items-center gap-2 hover:bg-black transition-all shadow-sm"
              >
                <Plus size={16} />
                CREATE NEW ACCOUNT
              </button>
            </div>

<div className="bg-white rounded-[20px] shadow-sm border border-[#F2F4F7] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#F2F4F7]">
                      <th className="px-8 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider w-16">#</th>
                      <th className="px-8 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider">NAME</th>
                      <th className="px-8 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider">PHONE</th>
                      <th className="px-8 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider">EMAIL</th>
                      <th className="px-8 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2F4F7]">
                    {mockVtms.map((vtm, index) => (
                      <tr key={vtm.id} className="hover:bg-[#F9FAFB] transition-colors">
                        <td className="px-8 py-5 text-sm font-medium text-[#333]">{index + 1}</td>
                        <td className="px-8 py-5 text-sm font-medium text-[#333]">{vtm.name}</td>
                        <td className="px-8 py-5 text-sm font-medium text-[#333]">{vtm.phone}</td>
                        <td className="px-8 py-5 text-sm font-medium text-[#333]">{vtm.email}</td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex items-center justify-end gap-3 text-[#999]">
                            <Link
                              href={`/super-admin/vtm/active/${vtm.id}`}
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

<div className="px-8 py-4 flex items-center justify-between border-t border-[#F2F4F7]">
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-medium text-[#666]">items per page</span>
                  <div className="relative">
                    <select className="appearance-none bg-white border border-[#EAECF0] rounded-lg px-4 py-2 pr-8 text-[13px] font-medium text-[#1D1F24] outline-none cursor-pointer">
                      <option>10</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-[13px] font-medium text-[#999]">1-7 from 7</span>
                  <div className="flex items-center gap-1">
                    <button className="text-[#CCC] hover:text-[#999] transition-colors"><ChevronFirst size={18} /></button>
                    <button className="text-[#CCC] hover:text-[#999] transition-colors"><ChevronLeft size={18} /></button>
                    <button className="text-[#CCC] hover:text-[#999] transition-colors"><ChevronRight size={18} /></button>
                    <button className="text-[#CCC] hover:text-[#999] transition-colors"><ChevronLast size={18} /></button>
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
