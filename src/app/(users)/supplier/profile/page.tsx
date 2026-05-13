"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "../../client/Sidebar/Sidebar";
import Header from "../../client/header";
import { useAuthStore } from "@/store/authStore";
import { Camera, Save } from "lucide-react";

const scopeOptions = ["Services", "Rental", "Man power", "Products"];
const premisesOptions = ["Area m/ft", "Office m", "Inside Storage", "Outside Storage"];

export default function SupplierProfilePage() {
  const user = useAuthStore((state) => state.user);
  
  const [selectedScope, setSelectedScope] = useState<string[]>(["Services"]);
  const [selectedPremises, setSelectedPremises] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  const toggle = (val: string, list: string[], setter: (v: string[]) => void) => {
    setter(list.includes(val) ? list.filter((v) => v !== val) : [...list, val]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar role="Supplier" />
      <div className="flex-1 flex flex-col">
        <Header role="Supplier" />

        <main className="flex-1 p-6 md:p-10 overflow-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-[#667085] text-sm font-medium mb-8">
              <Link href="/supplier" className="hover:text-black transition-colors">
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
                    <span>{(user?.name ?? "U").charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <button className="absolute -bottom-1 -right-1 bg-primary text-black p-1.5 rounded-full shadow hover:scale-105 transition-transform">
                  <Camera size={13} />
                </button>
              </div>
              <div>
                <p className="font-bold text-[#101828] text-lg">{user?.name ?? "—"}</p>
                <p className="text-sm text-[#667085]">{user?.email ?? "—"}</p>
                <span className="inline-block mt-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary capitalize">
                  Supplier
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm p-8 space-y-7">
              <h2 className="text-base font-bold text-[#101828] uppercase tracking-widest border-b border-[#F2F4F7] pb-4">
                Supplier Information
              </h2>

<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { label: "Company Name", name: "name", defaultValue: user?.name },
                  { label: "Position", name: "position" },
                  { label: "Website", name: "website" },
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

<div>
                <p className="text-xs font-bold text-[#344054] uppercase tracking-wider mb-3">Company Background</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#667085] mb-1.5">When established</label>
                    <input name="when" type="text" placeholder="e.g. 2005" className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-[#667085] mb-1.5">Where (Location)</label>
                    <input name="where" type="text" placeholder="e.g. Riyadh, Saudi Arabia" className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
                  </div>
                </div>
              </div>

<div>
                <p className="text-xs font-bold text-[#344054] uppercase tracking-wider mb-3">Company scope of services</p>
                <div className="flex flex-wrap gap-2">
                  {scopeOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggle(opt, selectedScope, setSelectedScope)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
                        selectedScope.includes(opt)
                          ? "bg-primary border-primary text-black"
                          : "bg-white border-[#EAECF0] text-[#667085] hover:border-primary/40"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#344054] uppercase tracking-wider mb-1.5">Company category classification</label>
                <select name="category" className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm">
                  <option value="">Select classification...</option>
                  <option value="pipeline">Pipeline classification</option>
                  <option value="drilling">Drilling services</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="equipment">Equipment supply</option>
                </select>
              </div>

              <div>
                <p className="text-xs font-bold text-[#344054] uppercase tracking-wider mb-3">Premises area</p>
                <div className="flex flex-wrap gap-2">
                  {premisesOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggle(opt, selectedPremises, setSelectedPremises)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
                        selectedPremises.includes(opt)
                          ? "bg-primary border-primary text-black"
                          : "bg-white border-[#EAECF0] text-[#667085] hover:border-primary/40"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

<div className="flex gap-3 pt-2 border-t border-[#F2F4F7]">
                <Link
                  href="/supplier"
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
