"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Mail, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-x-hidden">
      <header className="flex justify-between items-center py-4 px-6 md:py-5 md:px-10 absolute top-0 w-full z-20">
        <Link href="/" className="logo">
          <Image src="/VT.png" alt="V&T Logo" width={50} height={35} />
        </Link>
        <Link
          href="/login"
          className="bg-primary py-2 px-6 md:py-2.5 md:px-[30px] rounded-lg font-semibold text-sm md:text-[15px] hover:-translate-y-0.5 transition-all"
        >
          Back to login
        </Link>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 relative pt-[80px] md:pt-[100px]">
        
        <div className="w-full lg:w-[300px] bg-[#2d2d2d] lg:rounded-r-[15px] flex p-10 md:p-[60px_40px] lg:min-h-[calc(100vh-100px)]">
          <div className="sidebar-text">
            <h1 className="text-white text-2xl md:text-[32px] font-bold mb-1.25">
              Recovery
            </h1>
            <svg
              className="mb-4 lg:mb-8"
              width="72"
              height="16"
              viewBox="0 0 72 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M46.8762 0.272285C25.1525 2.23232 17.639 2.88558 12.4531 3.25308C3.42874 3.90643 1.83622 4.2331 2.32623 5.49895C3.22457 7.82665 11.5956 7.78582 41.7719 5.29478C49.9387 4.6006 57.493 4.06976 58.5138 4.06976C63.4956 4.02893 63.5364 -1.23857 46.8762 0.272285ZM45.6511 8.15332C43.1603 8.35749 8.94141 11.5834 6.49137 11.8284C-0.368735 12.4409 -1.308 12.9309 1.42788 14.6868C5.22544 17.096 39.1177 12.4817 60.8006 11.8692C70.8865 11.5834 71.9482 11.3792 71.3765 9.95002C70.6007 7.74498 60.0247 7.00981 45.6511 8.15332Z"
                fill="#F3D45A"
              />
            </svg>
          </div>
        </div>

<div
          className="bg-white p-6 md:p-10 lg:p-[40px_60px] rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] 
                        relative lg:absolute lg:left-[220px] lg:top-[140px] 
                        w-[90%] mx-auto lg:mx-0 lg:w-[1012px] max-w-[1200px] 
                        mt-[-40px] lg:mt-0 z-10"
        >
          <div className="max-w-md">
            <Link 
              href="/login" 
              className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-8 hover:-translate-x-1 transition-transform"
            >
              <ChevronLeft size={16} />
              forget password
            </Link>

            {submitted ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="w-16 h-16 bg-[#ECFDF3] rounded-2xl flex items-center justify-center text-[#027A48] border border-[#D1FADF]">
                  <CheckCircle size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-[#101828] mb-2">Check your email</h2>
                  <p className="text-[#667085] leading-relaxed">
                    We've sent a password reset link to <span className="font-semibold text-[#344054]">{email}</span>. 
                    Please check your inbox (and spam folder) to proceed.
                  </p>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="bg-primary py-3 px-8 rounded-xl font-bold text-sm shadow-sm hover:opacity-90 transition-all"
                  >
                    Resend email
                  </button>
                  <Link 
                    href="/login"
                    className="py-3 px-8 rounded-xl border border-[#D0D5DD] font-bold text-sm text-[#344054] text-center hover:bg-[#F9FAFB] transition-all"
                  >
                    Back to login
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h1 className="text-3xl font-black text-[#101828] mb-3">Reset your password</h1>
                  <p className="text-[#667085]">Enter the email address associated with your account and we'll send you a link to reset your password.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-[#344054] mb-2 uppercase tracking-wide">
                      Email address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]" size={20} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="e.g. name@company.com"
                        className="w-full pl-12 pr-4 py-4 bg-[#F2F4F7] border border-transparent rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full sm:w-auto bg-primary py-4 px-10 rounded-xl font-bold text-base shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Sending..." : "Recover password"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
