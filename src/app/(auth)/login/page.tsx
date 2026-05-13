"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { loginUser } from "@/lib/api/auth/login";
import { useAuthStore } from "@/store/authStore";
import { setAuthCookie } from "@/actions/auth";

export default function LoginPage() {
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

await setAuthCookie(result.role, "mock-jwt-token");

if (result.role === "Client") {
          router.push("/client");
        } else if (result.role === "Admin") {
          router.push("/marketer");
        } else if (result.role === "SuperAdmin") {
          router.push("/super-admin");
        } else if (result.role === "SubAdmin") {
          router.push("/sub-admin");
        } else {
          router.push("/supplier");
        }
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-x-hidden">
      <header className="flex justify-between items-center py-4 px-6 md:py-5 md:px-10 absolute top-0 w-full z-20">
        <Link href="/" className="logo">
          <Image src="/VT.png" alt="V&T Logo" width={50} height={35} />
        </Link>
        <Link
          href="/signup"
          className="bg-primary py-2 px-6 md:py-2.5 md:px-[30px] rounded-lg font-semibold text-sm md:text-[15px] hover:-translate-y-0.5 transition-all"
        >
          Sign up
        </Link>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 relative pt-[80px] md:pt-[100px]">
        <div className="w-full lg:w-[300px] bg-[#2d2d2d] lg:rounded-r-[15px] flex p-10 md:p-[60px_40px] lg:min-h-[calc(100vh-100px)]">
          <div className="sidebar-text">
            <h1 className="text-white text-2xl md:text-[32px] font-bold mb-1.25">
              Log in
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
          <p className="text-primary font-semibold mb-6 md:mb-[30px] text-sm uppercase">
            log in
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-5 md:mb-[25px]">
              <label className="block text-base md:text-[18px] font-semibold mb-2 text-[#333]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full lg:w-[50%] p-3 md:p-[15px_20px] bg-[#ebeef5] border-none rounded-lg text-base outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="client@test.com"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block text-base md:text-[18px] font-semibold mb-2 text-[#333]">
                Password
              </label>
              <div className="relative w-full lg:w-[50%]">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 md:p-[15px_20px] bg-[#ebeef5] border-none rounded-lg text-base outline-none focus:ring-2 focus:ring-primary/20 pr-12"
                  placeholder="password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#98A2B3] hover:text-[#344054] transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="mb-5 md:mb-[25px]">
              <Link href="/forgot-password" className="text-sm text-primary font-semibold hover:underline">
                Forget password?
              </Link>
            </div>

            {error && (
              <div className="text-red-500 text-sm mb-4 lg:w-[50%]">
                {error}
              </div>
            )}

            <div className="flex justify-center md:justify-end mt-8 md:mt-10">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto bg-primary py-3 px-10 rounded-lg font-semibold text-base border-none hover:-translate-y-0.5 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Logging in..." : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
