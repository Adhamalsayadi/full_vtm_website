"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Star,
  Megaphone,
  Users,
  Handshake,
  Tag,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { removeAuthCookie } from "@/actions/auth";
import { ConfirmationModal } from "@/components/shared/Modals";

interface SidebarProps {
  role: "Client" | "Supplier" | "Marketer";
}

const Sidebar = ({ role }: SidebarProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogout = async () => {
    setUser(null);
    await removeAuthCookie();
    window.location.href = "/";
  };

  const clientLinks = [
    {
      name: "enquiries",
      href: "/client/enquiries",
      icon: <FileText size={18} />,
    },
  ];

  const supplierLinks = [
    {
      name: "enquiries",
      href: "/supplier/enquiries",
      icon: <FileText size={18} />,
    },
    { name: "offers", href: "/supplier/offers", icon: <Star size={18} /> },
    { name: "ads", href: "/supplier/ads", icon: <Megaphone size={18} /> },
  ];

  const marketerLinks = [
    {
      name: "clients",
      href: "/marketer/clients",
      icon: <Users size={18} />,
    },
    {
      name: "suppliers",
      href: "/marketer/suppliers",
      icon: <Handshake size={18} />,
    },
    {
      name: "enquiries",
      href: "/marketer/enquiries",
      icon: <FileText size={18} />,
    },
    { name: "offers", href: "/marketer/offers", icon: <Star size={18} /> },
    { name: "deals", href: "/marketer/deals", icon: <Tag size={18} /> },
  ];

  const links =
    role === "Client"
      ? clientLinks
      : role === "Supplier"
      ? supplierLinks
      : marketerLinks;
  const dashboardHref = `/${role.toLowerCase()}`;

  const isActive = (href: string) => pathname === href;

  return (
    <>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-[60] bg-primary text-black p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

{isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[51] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "w-[260px] bg-white h-screen border-r border-[#EBEEF5] p-[30px_20px] flex flex-col shrink-0 fixed lg:sticky top-0 z-[52] transition-transform duration-300 ease-in-out",
          !isOpen && "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center gap-3 mb-[50px]">
          <div className=" text-black w-10 h-10 flex items-center justify-center rounded-lg font-extrabold text-[18px]">
            <Image src={"/VT.png"} alt="vt" width={50} height={50} />
          </div>
          <div className="font-bold text-base text-[#333]">Vendor & Tender</div>
        </div>

        <nav className="flex-1 flex flex-col overflow-y-auto custom-scrollbar">
          <div className="mb-px">
            <Link
              href={dashboardHref}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 p-3 rounded-lg text-[#666] font-medium transition-all hover:bg-[#F7F7F7] ${
                isActive(dashboardHref)
                  ? "bg-[#EBEEF5] !text-black !font-bold border-r-[3px] border-black"
                  : ""
              }`}
            >
              <LayoutDashboard size={18} />
              <span>Data panel</span>
            </Link>
          </div>

          <div className="text-[12px] font-bold text-[#999] m-[25px_0_15px_12px] tracking-[1px] uppercase">
            PLATFORM
          </div>

          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <div key={link.href} className="mb-px">
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-lg text-[#666] font-medium transition-all hover:bg-[#F7F7F7] capitalize ${
                    isActive(link.href)
                      ? "bg-[#EBEEF5] !text-black !font-bold border-r-[3px] border-black"
                      : ""
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </nav>

<div className="lg:hidden mt-auto pt-6 border-t border-[#F2F4F7]">
          <button
            className="w-full flex items-center gap-3 p-3 text-red-600 font-bold"
            onClick={() => setIsLogoutModalOpen(true)}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Confirm logout"
        message="Are you sure you want to log out?"
        confirmText="Logout"
        variant="primary"
      />
    </>
  );
};

export default Sidebar;
