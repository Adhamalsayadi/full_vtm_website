"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "../../client/Sidebar/Sidebar";
import Header from "../../client/header";
import { useAuthStore } from "@/store/authStore";
import { Camera, Save } from "lucide-react";

export default function MarketerProfilePage() {
  const user = useAuthStore((state) => state.user);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar role="Marketer" />
      <div className="flex-1 flex flex-col">
        <Header role="Marketer" />

        <main className="flex-1 p-6 md:p-10 overflow-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-[#667085] text-sm font-medium mb-8">
              <Link href="/marketer" className="hover:text-black transition-colors">
                Dashboard
              </Link>{" "}
              &gt; <span className="text-[#98A2B3]">Edit Profile</span>
            </div>

<div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm p-6 mb-6 flex items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-black overflow-hidden">
                  {user?.avatar ? (
                    <Image src={user.avatar} alt="avatar" width={80} height={80} className="object-cover" />
                  ) : (
                    <span>{(user?.name ?? "A").charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <button className="absolute -bottom-1 -right-1 bg-primary text-black p-1.5 rounded-full shadow hover:scale-105 transition-transform">
                  <Camera size={13} />
                </button>
              </div>
              <div>
                <p className="font-bold text-[#101828] text-lg">{user?.name ?? "Admin User"}</p>
                <p className="text-sm text-[#667085]">{user?.email ?? "admin@test.com"}</p>
                <span className="inline-block mt-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary capitalize">
                  Marketer
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm p-8 space-y-7">
              <h2 className="text-base font-bold text-[#101828] uppercase tracking-widest border-b border-[#F2F4F7] pb-4">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { label: "Name", name: "name", defaultValue: user?.name },
                  { label: "Email", name: "email", defaultValue: user?.email },
                  { label: "Position", name: "position" },
                  { label: "Phone", name: "phone", defaultValue: user?.phone },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-xs font-bold text-[#344054] uppercase tracking-wider mb-1.5">
                      {field.label}
                    </label>
                    <input
                      name={field.name}
                      defaultValue={field.defaultValue ?? ""}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm transition-all"
                    />
                  </div>
                ))}
              </div>

<div className="flex gap-3 pt-2 border-t border-[#F2F4F7]">
                <Link
                  href="/marketer"
                  className="flex-1 text-center py-3 rounded-xl border border-[#EAECF0] text-sm font-semibold text-[#344054] hover:bg-[#F9FAFB] transition-all"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl transition-all hover:-translate-y-0.5 shadow-sm text-sm"
                >
                  <Save size={16} />
                  {saved ? "Saved!" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
