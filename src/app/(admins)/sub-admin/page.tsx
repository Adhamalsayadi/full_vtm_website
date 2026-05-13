"use client";

import AdminSidebar from "@/components/shared/AdminSidebar";
import AdminHeader from "@/components/shared/AdminHeader";
import { 
  Users, 
  Handshake, 
  FileText, 
  Megaphone,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const quickLinks = [
  { label: "Clients", href: "/sub-admin/clients" },
  { label: "Suppliers", href: "/sub-admin/suppliers" },
  { label: "Enquiries", href: "/sub-admin/enquiries" },
  { label: "Ads", href: "/sub-admin/ads" },
];

export default function VtmDashboard() {
  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <AdminSidebar role="SubAdmin" />
      <div className="flex-1 flex flex-col min-w-0 font-sans">
        <AdminHeader role="SubAdmin" />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-[1400px] mx-auto space-y-12">
            
            <h2 className="text-3xl font-bold text-[#333] tracking-tight">Quick links</h2>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link) => (
                <Link 
                  key={link.label} 
                  href={link.href}
                  className="bg-white p-12 rounded-[20px] shadow-sm border border-[#F2F4F7] flex items-center justify-center text-center group hover:shadow-md transition-all active:scale-[0.98]"
                >
                  <span className="text-2xl font-bold text-[#333] group-hover:text-[#1D1F24] transition-colors">{link.label}</span>
                </Link>
              ))}
            </div>

<div className="min-h-[400px]"></div>

          </div>
        </main>
      </div>
    </div>
  );
}
