"use client";

import { useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/shared/AdminSidebar";
import AdminHeader from "@/components/shared/AdminHeader";
import { 
  Plus, 
  Search, 
  ChevronRight, 
  ShieldCheck, 
  Edit3, 
  Trash2,
  Lock,
  Eye,
  Activity,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockVTMs = [
  { id: "1", name: "VTM Regional Ops", handle: "@vtm.ops", region: "Middle East", lastActive: "10 mins ago", status: "Active" },
  { id: "2", name: "Global Compliance", handle: "@vtm.compliance", region: "International", lastActive: "2 hours ago", status: "Active" },
  { id: "3", name: "VTM Riyadh", handle: "@vtm.riyadh", region: "Saudi Arabia", lastActive: "1 day ago", status: "Inactive" },
];

export default function SuperAdminSubAdmins() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <AdminSidebar role="SuperAdmin" />
      <div className="flex-1 flex flex-col">
        <AdminHeader role="SuperAdmin" />

        <main className="flex-1 p-6 md:p-10 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-black text-[#98A2B3] uppercase tracking-[4px] mb-2">
                  <Link href="/super-admin" className="hover:text-primary transition-colors">Admin Panel</Link>
                  <ChevronRight size={12} />
                  <span className="text-[#101828]">System Controllers</span>
                </div>
                <h1 className="text-4xl font-black text-[#101828] tracking-tighter">VTM Admins (Sub-Admins)</h1>
                <p className="text-[#667085] font-medium leading-relaxed max-w-xl">
                  Manage subordinate administrative accounts with specialized permissions for regional and compliance operations.
                </p>
              </div>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="flex items-center justify-center gap-3 px-10 py-5 bg-[#101828] text-white font-black uppercase tracking-[2px] text-xs rounded-3xl hover:bg-black transition-all shadow-2xl hover:-translate-y-1"
              >
                <Plus size={20} className="text-primary" />
                New VTM Controller
              </button>
            </div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockVTMs.map((vtm) => (
                <div key={vtm.id} className="bg-white rounded-[40px] p-10 border border-[#EAECF0] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group relative">
                  <div className="absolute top-0 right-0 p-12 bg-[#F2F4F7] rounded-bl-[60px] translate-x-12 -translate-y-12 group-hover:bg-primary/20 transition-all duration-500"></div>

                  <div className="flex justify-between items-start mb-10 relative z-10">
                    <div className="w-16 h-16 rounded-[24px] bg-[#101828] text-primary flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform duration-500">
                      <ShieldCheck size={28} />
                    </div>
                    <div className="px-4 py-2 bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-wider rounded-xl border border-green-100 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      {vtm.status}
                    </div>
                  </div>

                  <div className="space-y-6 relative z-10">
                    <div>
                      <h3 className="text-2xl font-black text-[#101828] group-hover:text-primary transition-colors">{vtm.name}</h3>
                      <p className="text-sm font-bold text-[#98A2B3] tracking-widest uppercase">{vtm.handle}</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <div className="px-4 py-2 bg-[#F9FAFB] rounded-xl text-xs font-bold text-[#475467] flex items-center gap-2 shadow-sm border border-[#EAECF0]">
                        <Activity size={12} />
                        {vtm.region}
                      </div>
                      <div className="px-4 py-2 bg-[#F9FAFB] rounded-xl text-xs font-bold text-[#475467] flex items-center gap-2 shadow-sm border border-[#EAECF0]">
                        <Lock size={12} />
                        Admin Access
                      </div>
                    </div>

                    <p className="text-xs text-[#98A2B3] font-medium pt-4">Last activity monitored {vtm.lastActive}</p>

                    <div className="flex items-center gap-3 pt-6 border-t border-[#F2F4F7]">
                      <button className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#F2F4F7] hover:bg-black hover:text-white rounded-2xl transition-all text-[10px] font-black uppercase tracking-widest text-[#344054]">
                        <Eye size={14} />
                        Audit Log
                      </button>
                      <button className="p-4 bg-white border border-[#EAECF0] text-[#667085] hover:text-primary hover:border-primary/50 transition-all rounded-2xl shadow-sm">
                        <Edit3 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

{showCreateModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 lg:p-10">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xl" onClick={() => setShowCreateModal(false)}></div>
          <div className="relative bg-white w-full max-w-[720px] rounded-[48px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-500">
             <div className="grid grid-cols-1 md:grid-cols-5 h-full">
                <div className="hidden md:flex md:col-span-2 bg-[#101828] p-10 flex-col justify-between text-white relative overflow-hidden">
                   <div className="absolute top-0 left-0 p-20 bg-primary/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
                   <div className="relative z-10 flex flex-col gap-6">
                      <ShieldCheck size={48} className="text-primary mb-4" />
                      <h2 className="text-3xl font-black tracking-tight leading-none">Security Provisioning</h2>
                      <p className="text-[#98A2B3] text-sm leading-relaxed font-medium">Elevating system access requires strict validation of the controller profile.</p>
                   </div>
                   <div className="relative z-10">
                      <p className="text-[10px] uppercase font-black tracking-[4px] text-primary/50">VNT Control Panel</p>
                   </div>
                </div>
                <div className="md:col-span-3 p-10 lg:p-14 relative group">
                  <button onClick={() => setShowCreateModal(false)} className="absolute top-8 right-8 text-[#98A2B3] hover:text-[#101828] transition-colors"><X size={24} /></button>
                  <h3 className="text-2xl font-black text-[#101828] mb-8">VTM Account Config</h3>
                  
                  <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowCreateModal(false); }}>
                    <div className="space-y-4">
                      <label className="block text-[10px] font-black text-[#667085] uppercase tracking-widest ml-1">Controller Internal Name</label>
                      <input type="text" placeholder="e.g. Regional Support A" className="w-full px-6 py-4 bg-[#F9FAFB] border border-[#EAECF0] rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 text-sm font-bold transition-all" />
                    </div>
                    <div className="space-y-4">
                      <label className="block text-[10px] font-black text-[#667085] uppercase tracking-widest ml-1">Access Credentials (Email)</label>
                      <input type="email" placeholder="vtm.support@vnt.com" className="w-full px-6 py-4 bg-[#F9FAFB] border border-[#EAECF0] rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 text-sm font-bold transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-4">
                          <label className="block text-[10px] font-black text-[#667085] uppercase tracking-widest ml-1">Region</label>
                          <select className="w-full px-6 py-4 bg-[#F9FAFB] border border-[#EAECF0] rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 text-sm font-bold appearance-none transition-all cursor-pointer">
                            <option>Middle East</option>
                            <option>North America</option>
                            <option>Europe</option>
                          </select>
                       </div>
                       <div className="space-y-4">
                          <label className="block text-[10px] font-black text-[#667085] uppercase tracking-widest ml-1">Security Level</label>
                          <select className="w-full px-6 py-4 bg-[#F9FAFB] border border-[#EAECF0] rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 text-sm font-bold appearance-none transition-all cursor-pointer">
                            <option>Standard VTM</option>
                            <option>Compliance Lead</option>
                          </select>
                       </div>
                    </div>
                    
                    <button className="w-full py-5 bg-[#101828] text-white font-black uppercase tracking-[2px] text-xs rounded-2xl hover:bg-black transition-all shadow-2xl mt-8">
                       Deploy VTM Account
                    </button>
                  </form>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
