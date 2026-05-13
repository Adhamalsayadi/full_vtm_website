"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { 
  LayoutDashboard, 
  Users, 
  Handshake, 
  FileText, 
  Tag, 
  Layers, 
  Globe, 
  Settings, 
  LogOut,
  ShieldCheck,
  TrendingUp,
  Megaphone,
  Menu,
  ChevronRight,
  Circle,
  User,
  ShoppingBag,
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { removeAuthCookie } from "@/actions/auth";
import { ConfirmationModal } from "@/components/shared/Modals";

interface AdminSidebarProps {
  role: "SuperAdmin" | "SubAdmin";
}

export default function AdminSidebar({ role }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = async () => {
    setUser(null);
    await removeAuthCookie();
    router.push('/login-admin');
  };

  const platformItems = role === "SuperAdmin" ? [
    { name: "VTM", icon: <Users size={18} />, href: "/super-admin/vtm" },
    { name: "Clients", icon: <Users size={18} />, href: "/super-admin/clients" },
    { name: "Suppliers", icon: <Handshake size={18} />, href: "/super-admin/suppliers" },
    { name: "Marketers", icon: <User size={18} />, href: "/super-admin/marketers" },
    { name: "enquiries", icon: <FileText size={18} />, href: "/super-admin/enquiries" },
    { name: "deals", icon: <Handshake size={18} />, href: "/super-admin/deals" },
    { name: "categories", icon: <Layers size={18} />, href: "/super-admin/categories" },
    { name: "countries", icon: <MapPin size={18} />, href: "/super-admin/countries" },
    { name: "ads", icon: <Megaphone size={18} />, href: "/super-admin/ads" },
  ] : [
    { name: "VTM", icon: <Users size={18} />, href: "/sub-admin/vtm" },
    { name: "Clients", icon: <Users size={18} />, href: "/sub-admin/clients" },
    { name: "Suppliers", icon: <Handshake size={18} />, href: "/sub-admin/suppliers" },
    { name: "enquiries", icon: <FileText size={18} />, href: "/sub-admin/enquiries" },
    { name: "deals", icon: <Handshake size={18} />, href: "/sub-admin/deals" },
  ];

  return (
    <aside className="w-68 min-h-screen bg-white border-r border-[#F2F4F7] flex flex-col transition-all duration-300 overflow-y-auto shrink-0 z-50">
      
      <div className="p-8 pb-10 flex items-center justify-between">
        <Link href={role === "SuperAdmin" ? "/super-admin" : "/sub-admin"} className="flex items-center gap-3">
          <div className="relative">
            <Image src="/VT.png" alt="Logo" width={40} height={32} className="object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-black text-[#1D1F24] leading-none mb-0.5">Vendor & Tender</span>
            <div className="flex items-center gap-1">
              <span className="w-3.5 h-3.5 rounded-full border border-[#999] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#999]" />
              </span>
            </div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-10">
        
        <div className="px-4">
          <Link 
            href={role === "SuperAdmin" ? "/super-admin" : "/sub-admin"}
            className={cn(
              "flex items-center gap-3 px-6 py-4 rounded-xl text-sm font-bold transition-all relative group",
              pathname === (role === "SuperAdmin" ? "/super-admin" : "/sub-admin")
                ? "bg-[#F2F4F7] text-[#1D1F24]" 
                : "text-[#999] hover:bg-[#F9FAFB] hover:text-[#333]"
            )}
          >
            <LayoutDashboard size={20} className={cn(pathname === (role === "SuperAdmin" ? "/super-admin" : "/sub-admin") ? "text-[#1D1F24]" : "text-[#999]")} />
            <span>Data panel</span>
          </Link>
        </div>

<div className="space-y-4">
          <p className="px-10 text-[11px] font-black text-[#999] uppercase tracking-widest mb-6">PLATFORM</p>
          <div className="space-y-1 px-4">
            {platformItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-6 py-3.5 rounded-l-xl text-[13px] font-bold transition-all relative group",
                    isActive 
                      ? "bg-[#F9FAFB] text-[#1D1F24]" 
                      : "text-[#999] hover:bg-[#F9FAFB] hover:text-[#333]"
                  )}
                >
                  {isActive && <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#1D1F24]" />}
                  <span className={cn("transition-colors", isActive ? "text-[#1D1F24]" : "text-[#999] group-hover:text-[#333]")}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

<div className="p-8 mt-auto border-t border-[#F2F4F7]">
        <button onClick={() => setIsLogoutModalOpen(true)} className="flex items-center gap-3 px-4 py-3 rounded-2xl w-full text-red-600 hover:bg-red-50 hover:font-bold transition-all mt-auto group">
          <LogOut size={20} />
          <span>Log out</span>
        </button>
      </div>

      <ConfirmationModal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Confirm logout"
        message="Are you sure you want to log out?"
        confirmText="Logout"
        variant="primary"
      />
    </aside>
  );
}
