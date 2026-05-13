"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ChevronRight, ArrowLeft, EyeOff, Building2, User, Mail, Phone, MapPin, Globe, FileText, Calendar, Box, Layers, Hash } from "lucide-react";
import AdminSidebar from "@/components/shared/AdminSidebar";
import AdminHeader from "@/components/shared/AdminHeader";
import { cn } from "@/lib/utils";
import { ConfirmationModal } from "@/components/shared/Modals";

export default function DealDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("client");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

const dealInfo = {
    client: {
      companyName: "Company Name 2",
      userName: "Adham Alsayadi",
      email: "adham@example.com",
      phone: "+966 50 123 4567",
      country: "Saudi Arabia",
      website: "www.company.com",
    },
    supplier: {
      companyName: "Company Name 5",
      userName: "Ahmed Suleman",
      email: "ahmed@example.com",
      phone: "+966 50 987 6543",
      country: "Saudi Arabia",
      website: "www.supplier.com",
    },
    enquiry: {
      title: "Second Enquiry",
      category: "Products",
      subCategory: "Electronics",
      unit: "ea",
      quantity: 400,
      requiredDate: "2024-04-05",
      description: "Industrial cooling fans for server rooms.",
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <AdminSidebar role="SuperAdmin" />
      <div className="flex-1 flex flex-col min-w-0 font-sans">
        <AdminHeader role="SuperAdmin" />

        <main className="flex-1 p-8 overflow-auto pb-20">
          <div className="max-w-[1000px] mx-auto space-y-8">

<div className="flex items-center gap-2 text-[13px] font-medium text-[#999]">
              <Link href="/super-admin" className="hover:text-[#333]">Dashboard</Link>
              <ChevronRight size={14} />
              <Link href="/super-admin/deals" className="hover:text-[#333]">deals</Link>
              <ChevronRight size={14} />
              <span className="text-[#333]">view details</span>
            </div>

            <div className="bg-white rounded-[40px] shadow-sm border border-[#F2F4F7] overflow-hidden">
               <div className="p-10 md:p-12 border-b border-[#F2F4F7] flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => router.back()}
                      className="w-12 h-12 rounded-full border border-[#EAECF0] flex items-center justify-center text-[#999] hover:text-[#333] hover:bg-[#F9FAFB] transition-all"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-[28px] font-black text-[#1D1F24] lowercase leading-none translate-y-[-2px]">
                       deal details
                    </h1>
                  </div>
                  <button 
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="w-12 h-12 rounded-full border border-[#EAECF0] flex items-center justify-center text-[#999] hover:text-[#333] hover:bg-[#F9FAFB] transition-all font-black shadow-sm"
                    title="Hide"
                  >
                    <EyeOff size={20} />
                  </button>
               </div>

<div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#F2F4F7] p-8 space-y-4">
                     {[
                       { id: "client", label: "client details", icon: <Building2 size={18} /> },
                       { id: "supplier", label: "supplier details", icon: <User size={18} /> },
                       { id: "enquiry", label: "enquirie details", icon: <FileText size={18} /> }
                     ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={cn(
                            "w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-[13px] font-black transition-all lowercase italic",
                            activeTab === tab.id 
                              ? "bg-[#1D1F24] text-white shadow-lg shadow-black/10 scale-[1.02]" 
                              : "text-[#999] hover:text-[#1D1F24] hover:bg-[#F9FAFB]"
                          )}
                        >
                           {tab.icon}
                           {tab.label}
                        </button>
                     ))}
                  </div>

                  <div className="flex-1 p-10 md:p-14 animate-in fade-in duration-500">
                     {activeTab === "client" && (
                        <div className="space-y-12">
                           <div className="flex items-center gap-6">
                              <div className="w-24 h-24 bg-[#F9FAFB] border border-[#EAECF0] rounded-[24px] flex items-center justify-center text-[#CCC]">
                                 <Building2 size={32} />
                              </div>
                              <div>
                                 <h3 className="text-xl font-bold text-[#1D1F24]">{dealInfo.client.companyName}</h3>
                                 <p className="text-[13px] font-bold text-[#999] lowercase italic">{dealInfo.client.userName}</p>
                              </div>
                           </div>
                           
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                              <div className="space-y-1.5">
                                 <p className="text-[11px] font-black text-[#BBB] uppercase tracking-[2px]">Email</p>
                                 <Link href={`mailto:${dealInfo.client.email}`} className="text-sm font-bold text-[#101828] hover:text-primary transition-colors flex items-center gap-2">
                                    <Mail size={16} /> {dealInfo.client.email}
                                 </Link>
                              </div>
                              <div className="space-y-1.5">
                                 <p className="text-[11px] font-black text-[#BBB] uppercase tracking-[2px]">Phone</p>
                                 <p className="text-sm font-bold text-[#101828] flex items-center gap-2">
                                    <Phone size={16} /> {dealInfo.client.phone}
                                 </p>
                              </div>
                              <div className="space-y-1.5">
                                 <p className="text-[11px] font-black text-[#BBB] uppercase tracking-[2px]">Location</p>
                                 <p className="text-sm font-bold text-[#101828] flex items-center gap-2">
                                    <MapPin size={16} /> {dealInfo.client.country}
                                 </p>
                              </div>
                              <div className="space-y-1.5">
                                 <p className="text-[11px] font-black text-[#BBB] uppercase tracking-[2px]">Website</p>
                                 <Link href={`https://${dealInfo.client.website}`} target="_blank" className="text-sm font-bold text-primary hover:underline flex items-center gap-2">
                                    <Globe size={16} /> {dealInfo.client.website}
                                 </Link>
                              </div>
                           </div>
                        </div>
                     )}

                     {activeTab === "supplier" && (
                        <div className="space-y-12">
                           <div className="flex items-center gap-6">
                              <div className="w-24 h-24 bg-[#F9FAFB] border border-[#EAECF0] rounded-[24px] flex items-center justify-center text-[#CCC]">
                                 <Building2 size={32} />
                              </div>
                              <div>
                                 <h3 className="text-xl font-bold text-[#1D1F24]">{dealInfo.supplier.companyName}</h3>
                                 <p className="text-[13px] font-bold text-[#999] lowercase italic">{dealInfo.supplier.userName}</p>
                              </div>
                           </div>
                           
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                              <div className="space-y-1.5">
                                 <p className="text-[11px] font-black text-[#BBB] uppercase tracking-[2px]">Email</p>
                                 <Link href={`mailto:${dealInfo.supplier.email}`} className="text-sm font-bold text-[#101828] hover:text-primary transition-colors flex items-center gap-2">
                                    <Mail size={16} /> {dealInfo.supplier.email}
                                 </Link>
                              </div>
                              <div className="space-y-1.5">
                                 <p className="text-sm md:text-[11px] font-black text-[#BBB] uppercase tracking-[2px]">Phone</p>
                                 <p className="text-sm font-bold text-[#101828] flex items-center gap-2">
                                    <Phone size={16} /> {dealInfo.supplier.phone}
                                 </p>
                              </div>
                           </div>
                        </div>
                     )}

                     {activeTab === "enquiry" && (
                        <div className="space-y-10">
                           <div className="space-y-2">
                              <p className="text-[11px] font-black text-[#BBB] uppercase tracking-[2px]">Title</p>
                              <h3 className="text-xl font-bold text-[#1D1F24]">{dealInfo.enquiry.title}</h3>
                           </div>
                           
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                              <div className="flex items-center gap-4 p-4 bg-[#F9FAFB] rounded-2xl border border-[#EAECF0]">
                                 <Layers size={18} className="text-[#999]" />
                                 <div className="space-y-0.5">
                                    <p className="text-[10px] font-black text-[#999] uppercase tracking-widest">Category</p>
                                    <p className="text-sm font-bold text-[#1D1F24]">{dealInfo.enquiry.category}</p>
                                 </div>
                              </div>
                              <div className="flex items-center gap-4 p-4 bg-[#F9FAFB] rounded-2xl border border-[#EAECF0]">
                                 <Hash size={18} className="text-[#999]" />
                                 <div className="space-y-0.5">
                                    <p className="text-[10px] font-black text-[#999] uppercase tracking-widest">Quantity</p>
                                    <p className="text-sm font-bold text-[#1D1F24]">{dealInfo.enquiry.quantity} {dealInfo.enquiry.unit}</p>
                                 </div>
                              </div>
                              <div className="flex items-center gap-4 p-4 bg-[#F9FAFB] rounded-2xl border border-[#EAECF0]">
                                 <Calendar size={18} className="text-[#999]" />
                                 <div className="space-y-0.5">
                                    <p className="text-[10px] font-black text-[#999] uppercase tracking-widest">Date</p>
                                    <p className="text-sm font-bold text-[#1D1F24]">{dealInfo.enquiry.requiredDate}</p>
                                 </div>
                              </div>
                           </div>

                           <div className="space-y-2">
                              <p className="text-[11px] font-black text-[#BBB] uppercase tracking-[2px]">Description</p>
                              <p className="text-[15px] font-medium text-[#666] leading-relaxed italic border-l-4 border-[#F2F4F7] pl-4">
                                 "{dealInfo.enquiry.description}"
                              </p>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </div>
          </div>
        </main>

        <ConfirmationModal 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            console.log("Hiding deal:", id);
            router.push("/super-admin/deals");
          }}
          title="Hide Deal"
          message={`Are you sure you want to hide this deal?`}
          confirmText="Hide"
        />
      </div>
    </div>
  );
}
