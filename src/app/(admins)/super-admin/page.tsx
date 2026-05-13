"use client";

import AdminSidebar from "@/components/shared/AdminSidebar";
import AdminHeader from "@/components/shared/AdminHeader";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronFirst,
  ChevronLast,
} from "lucide-react";
import { cn } from "@/lib/utils";

const statCards = [
  
  { label: "accounts", value: 0, iconColor: "border-[#7B61FF]", bgColor: "bg-[#F0EEFF]", dotColor: "bg-[#7B61FF]" },
  { label: "deals", value: 0, iconColor: "border-[#27B973]", bgColor: "bg-[#E9F8F1]", dotColor: "bg-[#27B973]" },
  { label: "enquiries", value: 0, iconColor: "border-[#00B4D8]", bgColor: "bg-[#E0F7FC]", dotColor: "bg-[#00B4D8]" },
  { label: "offers", value: 0, iconColor: "border-[#F84F4F]", bgColor: "bg-[#FEEBEB]", dotColor: "bg-[#F84F4F]" },
  
  { label: "clients", value: 4, iconColor: "border-[#7B61FF]", bgColor: "bg-[#F0EEFF]", dotColor: "bg-[#7B61FF]" },
  { label: "supplier", value: 6, iconColor: "border-[#27B973]", bgColor: "bg-[#E9F8F1]", dotColor: "bg-[#27B973]" },
  { label: "marketer", value: 3, iconColor: "border-[#00B4D8]", bgColor: "bg-[#E0F7FC]", dotColor: "bg-[#00B4D8]" },
  
  { label: "Paid ads", value: 0, iconColor: "border-[#27B973]", bgColor: "bg-[#E9F8F1]", dotColor: "bg-[#27B973]" },
  { label: "Free ads", value: 0, iconColor: "border-[#F84F4F]", bgColor: "bg-[#FEEBEB]", dotColor: "bg-[#F84F4F]" },
];

function StatIcon({ iconColor, bgColor, dotColor }: { iconColor: string; bgColor: string; dotColor: string }) {
  return (
    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3", bgColor)}>
      <div className={cn("w-7 h-7 rounded-full border-2 flex items-center justify-center", iconColor)}>
        <div className={cn("w-2 h-2 rounded-full", dotColor)} />
      </div>
    </div>
  );
}

export default function SuperAdminDashboard() {
  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <AdminSidebar role="SuperAdmin" />
      <div className="flex-1 flex flex-col min-w-0 font-sans">
        <AdminHeader role="SuperAdmin" />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-[1400px] mx-auto space-y-6 pb-10">

<div className="grid grid-cols-4 gap-5">
              {statCards.slice(0, 4).map((stat, i) => (
                <div key={i} className="bg-white rounded-[20px] border border-[#F2F4F7] shadow-sm p-6 flex flex-col items-center justify-center text-center">
                  <StatIcon iconColor={stat.iconColor} bgColor={stat.bgColor} dotColor={stat.dotColor} />
                  <p className="text-[26px] font-black text-[#1D1F24] leading-none">{stat.value}</p>
                  <p className="text-[13px] font-medium text-[#999] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

<div className="grid grid-cols-3 gap-5">
              {statCards.slice(4, 7).map((stat, i) => (
                <div key={i} className="bg-white rounded-[20px] border border-[#F2F4F7] shadow-sm p-6 flex flex-col items-center justify-center text-center">
                  <StatIcon iconColor={stat.iconColor} bgColor={stat.bgColor} dotColor={stat.dotColor} />
                  <p className="text-[26px] font-black text-[#1D1F24] leading-none">{stat.value}</p>
                  <p className="text-[13px] font-medium text-[#999] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

<div className="grid grid-cols-3 gap-5">
              {statCards.slice(7, 9).map((stat, i) => (
                <div key={i} className="bg-white rounded-[20px] border border-[#F2F4F7] shadow-sm p-6 flex flex-col items-center justify-center text-center">
                  <StatIcon iconColor={stat.iconColor} bgColor={stat.bgColor} dotColor={stat.dotColor} />
                  <p className="text-[26px] font-black text-[#1D1F24] leading-none">{stat.value}</p>
                  <p className="text-[13px] font-medium text-[#999] mt-1">{stat.label}</p>
                </div>
              ))}
              
              <div />
            </div>

<div className="bg-white rounded-[20px] shadow-sm border border-[#F2F4F7] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1200px]">
                  <thead>
                    <tr className="border-b border-[#F2F4F7]">
                      <th className="px-6 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider">TITLE</th>
                      <th className="px-6 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider">CLIENT</th>
                      <th className="px-6 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider">CATEGORY</th>
                      <th className="px-6 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider whitespace-nowrap">SUB CATEGORY</th>
                      <th className="px-6 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider whitespace-nowrap">REQUEST TYPE</th>
                      <th className="px-6 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider whitespace-nowrap">REQUIRED DATE</th>
                      <th className="px-6 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider">UNIT</th>
                      <th className="px-6 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider">QUANTITY</th>
                      <th className="px-6 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider whitespace-nowrap">VTM STATUS</th>
                      <th className="px-6 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider whitespace-nowrap">ADMIN STATUS</th>
                      <th className="px-6 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider whitespace-nowrap">OFFERS RECEIVED</th>
                      <th className="px-6 py-5 text-[11px] font-bold text-[#999] uppercase tracking-wider whitespace-nowrap">ENQUIRY STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2F4F7]">
                    <tr>
                      <td colSpan={12} className="px-6 py-12 text-center text-[13px] font-medium text-[#999]">No data</td>
                    </tr>
                  </tbody>
                </table>
              </div>

<div className="px-6 py-4 flex items-center justify-between border-t border-[#F2F4F7]">
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-medium text-[#666]">items per page</span>
                  <div className="relative">
                    <select className="appearance-none bg-white border border-[#EAECF0] rounded-lg px-4 py-2 pr-8 text-[13px] font-medium text-[#1D1F24] outline-none cursor-pointer">
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                      <option>100</option>
                      <option>All</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-[13px] font-medium text-[#999]">0-0 from 0</span>
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
