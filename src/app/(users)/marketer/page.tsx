"use client";

import Link from "next/link";
import Sidebar from "../client/Sidebar/Sidebar";
import Header from "../client/header";
import { Users, Handshake, FileText, Tag, ArrowRight } from "lucide-react";

const quickLinks = [
  {
    title: "Clients",
    count: 24,
    href: "/marketer/clients",
    icon: <Users className="text-blue-600" size={24} />,
    color: "bg-blue-50",
    description: "Manage and view all registered clients",
  },
  {
    title: "Suppliers",
    count: 156,
    href: "/marketer/suppliers",
    icon: <Handshake className="text-green-600" size={24} />,
    color: "bg-green-50",
    description: "Overview of your supplier network",
  },
  {
    title: "Enquiries",
    count: 842,
    href: "/marketer/enquiries",
    icon: <FileText className="text-primary" size={24} />,
    color: "bg-yellow-50",
    description: "Track all active and pending enquiries",
  },
  {
    title: "Deals",
    count: 42,
    href: "/marketer/deals",
    icon: <Tag className="text-purple-600" size={24} />,
    color: "bg-purple-50",
    description: "Monitor ongoing and closed deals",
  },
];

export default function MarketerDashboard() {
  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar role="Marketer" />
      <div className="flex-1 flex flex-col">
        <Header role="Marketer" />

        <main className="flex-1 p-6 md:p-10 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-black text-[#101828]">Data Panel</h1>
              <p className="text-[#667085] font-medium">Welcome back, here's what's happening today.</p>
            </div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link) => (
                <Link 
                  key={link.title} 
                  href={link.href}
                  className="group bg-white p-6 rounded-2xl border border-[#EAECF0] shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${link.color}`}>
                      {link.icon}
                    </div>
                    <ArrowRight className="text-[#98A2B3] group-hover:text-primary group-hover:translate-x-1 transition-all" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#667085] uppercase tracking-wider mb-1">{link.title}</p>
                    <h3 className="text-2xl font-black text-[#101828] mb-2">{link.count}</h3>
                    <p className="text-xs text-[#98A2B3] leading-relaxed line-clamp-1">{link.description}</p>
                  </div>
                </Link>
              ))}
            </div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 bg-white rounded-3xl border border-[#EAECF0] p-8 min-h-[400px]">
                  <h3 className="text-lg font-bold text-[#101828] mb-6">Activity Overview</h3>
                  <div className="flex items-center justify-center h-full text-[#98A2B3]">
                     <p>Stats visualization will be placed here</p>
                  </div>
               </div>
               <div className="bg-white rounded-3xl border border-[#EAECF0] p-8">
                  <h3 className="text-lg font-bold text-[#101828] mb-6">Recent Deals</h3>
                  <div className="space-y-6">
                     {[1,2,3,4].map(i => (
                       <div key={i} className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#F2F4F7] flex items-center justify-center font-bold text-xs">
                             D{i}
                          </div>
                          <div>
                             <p className="text-sm font-bold text-[#101828]">Project Alpha #{i}</p>
                             <p className="text-xs text-[#667085]">2 hours ago</p>
                          </div>
                          <div className="ml-auto text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                             +$2.4k
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
