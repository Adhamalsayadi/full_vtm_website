"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { loginUser } from "@/lib/api/auth/login";
import { useAuthStore } from "@/store/authStore";

export default function AdminLoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await loginUser(email, password);

      if (result.success && result.role && result.user) {
        setUser(result.user);
        if (result.role === "SuperAdmin") {
          router.push("/super-admin");
        } else if (result.role === "SubAdmin") {
          router.push("/sub-admin");
        } else if (result.role === "Admin") {
           
          router.push("/marketer");
        } else {
          setError("Access denied. Admin credentials required.");
        }
      } else {
        setError(result.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans overflow-hidden">
      
      <div className="hidden lg:flex w-[480px] bg-[#121111] p-16 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <Link href="/">
             <Image src="/VT.png" alt="Logo" width={80} height={56} className="mb-12 brightness-0 invert" />
          </Link>
          <div className="space-y-6">
             <h1 className="text-4xl font-black text-white leading-tight lowercase">
               Sign in as an administrator to manage the platform
             </h1>
             <p className="text-[#999] text-lg font-medium lowercase">
               Secure access for authorized personnel only.
             </p>
          </div>
        </div>
        
        <div className="relative z-10">
           <div className="flex items-center gap-4 text-white/40 text-sm font-bold uppercase tracking-widest">
              <ShieldCheck size={20} />
              <span>System Secured</span>
           </div>
        </div>

<div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
      </div>

<div className="flex-1 flex flex-col justify-center items-center px-10 md:px-20 bg-[#F9FAFB]">
        <div className="w-full max-w-[480px] space-y-12">
           <div className="text-center lg:text-left">
              <h2 className="text-[32px] font-black text-[#1D1F24] lowercase mb-3 italic">Log in</h2>
              <div className="w-16 h-1 bg-[#F3D45A] rounded-full mx-auto lg:mx-0" />
           </div>

           <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                 <label className="text-[14px] font-black text-[#1D1F24] lowercase tracking-tight ml-1">Email</label>
                 <input 
                   type="email" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="admin@vnt.com"
                   className="w-full h-16 bg-white border border-[#EAECF0] rounded-2xl px-6 text-sm font-bold text-[#1D1F24] outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
                   required
                 />
              </div>

              <div className="space-y-2">
                 <div className="flex justify-between items-center px-1">
                    <label className="text-[14px] font-black text-[#1D1F24] lowercase tracking-tight">Password</label>
                    <Link href="/forgot-password" title="reset password" className="text-[12px] font-bold text-primary hover:underline lowercase italic">
                       forgot?
                    </Link>
                 </div>
                 <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-16 bg-white border border-[#EAECF0] rounded-2xl px-6 text-sm font-bold text-[#1D1F24] outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#1D1F24] transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                 </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[13px] font-black lowercase text-center">
                   {error}
                </div>
              )}

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full h-16 bg-[#121111] text-white rounded-2xl text-[15px] font-black uppercase tracking-[3px] shadow-xl shadow-black/10 hover:bg-black hover:-translate-y-1 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Validating..." : "CONTINUE"}
              </button>
           </form>

           <div className="text-center pt-8">
              <p className="text-[13px] font-bold text-[#999] lowercase">
                 Not an admin? <Link href="/login" className="text-primary hover:underline">go to member portal</Link>
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
