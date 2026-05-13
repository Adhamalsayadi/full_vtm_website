"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Search, 
  Bell, 
  Settings,
  ChevronDown,
  User,
  Lock,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { removeAuthCookie } from "@/actions/auth";
import { ConfirmationModal } from "@/components/shared/Modals";

interface AdminHeaderProps {
  role: "SuperAdmin" | "SubAdmin";
}

export default function AdminHeader({ role }: AdminHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogout = async () => {
    setUser(null);
    await removeAuthCookie();
    router.push("/login-admin");
  };

  const profilePath = role === "SuperAdmin" ? "/super-admin/profile" : "/sub-admin/profile";

  return (
    <header className="h-[88px] bg-white border-b border-[#F2F4F7] flex items-center justify-end px-12 sticky top-0 z-[100] font-sans">

<div className="flex items-center gap-8">

<div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 p-1.5 rounded-2xl hover:bg-[#F9FAFB] transition-all group"
          >
            <div className="bg-[#EBEFFF] text-[#0A1145] text-[11px] font-black px-3 py-1.5 rounded-[12px] lowercase tracking-wide ring-1 ring-[#0A1145]/5">
              admin
            </div>
            
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#1D1F24] flex items-center justify-center text-white text-[15px] font-black ring-2 ring-white shadow-sm overflow-hidden text-center leading-none">
                A
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#44C13C] border-2 border-white rounded-full"></div>
            </div>
          </button>

          {isOpen && (
             <>
               <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
               <div className="absolute right-0 mt-3 w-56 bg-white rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-[#F2F4F7] py-2 z-20 animate-in fade-in slide-in-from-top-4 duration-300">
                  
                  <div className="px-5 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1D1F24] flex items-center justify-center text-white text-[15px] font-black overflow-hidden shadow-sm">
                      A
                    </div>
                    <span className="text-[15px] font-bold text-[#1D1F24]">Admin</span>
                  </div>

                  <div className="px-2 pb-2 space-y-1">
                     <Link 
                       href={profilePath}
                       onClick={() => setIsOpen(false)}
                       className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold bg-[#F0EEFF] text-[#4F46E5] transition-all"
                     >
                       <User size={18} />
                       Profile
                     </Link>
                     
                     <button 
                       onClick={() => {
                         setIsOpen(false);
                         setIsLogoutModalOpen(true);
                       }}
                       className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold text-[#666] hover:text-[#1D1F24] hover:bg-[#F9FAFB] transition-all text-left"
                     >
                       <LogOut size={18} />
                       Logout
                     </button>
                  </div>
               </div>
             </>
          )}
        </div>
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
    </header>
  );
}

