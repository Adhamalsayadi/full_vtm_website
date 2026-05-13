"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPasswordPage() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      
      <header className="p-8 flex justify-between items-center">
        <div className="relative w-20 h-10">
           <Image src="/logo.png" alt="VT Logo" fill className="object-contain" />
        </div>
        <Link href="/register" className="bg-[#FBC435] text-[#1D1F24] px-8 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-sm">
           Sign up
        </Link>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        <div className="w-[30%] bg-[#2B2B2B] flex flex-col p-20 relative">
           <div className="mt-20">
              <h1 className="text-[64px] font-bold text-white leading-tight">
                Forget <br /> password
              </h1>
              <div className="w-32 h-2 bg-[#FBC435] mt-4 rounded-full"></div>
           </div>
        </div>

<div className="flex-1 flex items-center justify-center p-20">
           <div className="w-full max-w-xl bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#F2F4F7] p-16 -ml-40 z-10">
              <p className="text-[#FBC435] text-sm font-bold mb-10">Change password</p>
              
              <form className="space-y-10">
                 <div className="space-y-4">
                    <label className="text-xl font-bold text-[#333]">New password</label>
                    <div className="relative">
                       <input 
                         type={showPass ? "text" : "password"} 
                         className="w-full bg-[#E9EDF5] border-none rounded-xl px-6 py-5 text-lg font-bold text-[#333] outline-none focus:ring-2 focus:ring-[#FBC435] transition-all"
                       />
                       <button 
                         type="button" 
                         onClick={() => setShowPass(!showPass)}
                         className="absolute right-6 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#333]"
                       >
                         {showPass ? <EyeOff size={24} /> : <Eye size={24} />}
                       </button>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="text-xl font-bold text-[#333]">Confirm new password</label>
                    <div className="relative">
                       <input 
                         type={showConfirm ? "text" : "password"} 
                         className="w-full bg-[#E9EDF5] border-none rounded-xl px-6 py-5 text-lg font-bold text-[#333] outline-none focus:ring-2 focus:ring-[#FBC435] transition-all"
                       />
                       <button 
                         type="button" 
                         onClick={() => setShowConfirm(!showConfirm)}
                         className="absolute right-6 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#333]"
                       >
                         {showConfirm ? <EyeOff size={24} /> : <Eye size={24} />}
                       </button>
                    </div>
                 </div>

                 <div className="flex justify-end pt-6">
                    <button type="submit" className="bg-[#FBC435] text-[#1D1F24] px-12 py-5 rounded-[20px] font-black text-sm uppercase tracking-wider hover:opacity-90 transition-all shadow-lg">
                       Change password
                    </button>
                 </div>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
}
