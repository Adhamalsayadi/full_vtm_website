"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Sidebar from "../../Sidebar/Sidebar";
import Header from "../../header";
import { UploadCloud, Plus, Minus, CheckCircle, X } from "lucide-react";
import { useCreateEnquiry } from "@/hooks/useEnquiries";
import { useAuthStore } from "@/store/authStore";

const categories = ["Services", "Products", "Rental", "Manpower"];
const subCategories = ["Slickline", "Drilling", "Pipeline", "Maintenance", "Equipment", "Consultancy"];
const standards = ["ISO 9001", "ISO 14001", "API", "ASME", "Other"];
const qualifications = ["No specific", "Engineering degree", "Certified technician", "Safety officer"];
const purposes = ["Construction", "Maintenance", "Operations", "Research", "Other"];

export default function UploadEnquiryPage() {
  const [quantity, setQuantity] = useState(1);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) setUploadedFile(file);
  };

  const user = useAuthStore((state) => state.user);
  const createEnquiry = useCreateEnquiry();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    createEnquiry.mutate({
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      subCategory: formData.get("subCategory") as string,
      requiredDate: formData.get("requiredDate") as string,
      purpose: formData.get("purpose") as string,
      standard: formData.get("standard") as string,
      quantity,
      createdByUserId: user?.id,
      createdByUserName: user?.name,
    }, {
      onSuccess: () => {
        setSubmitted(true);
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar role="Client" />
      <div className="flex-1 flex flex-col">
        <Header role="Client" />

        <main className="flex-1 p-6 md:p-10 overflow-auto relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-[#667085] text-sm font-medium mb-6">
              <Link href="/client" className="hover:text-black transition-colors">Dashboard</Link>{" "}
              &gt; <span className="text-[#98A2B3]">Post Enquiry</span>
            </div>

<div className="mb-8">
              <h1 className="text-3xl font-black text-[#101828] mb-1">
                Upload enquiry
                <span className="block h-1 w-24 bg-primary rounded-full mt-2" />
              </h1>
              <p className="text-[#667085] text-sm mt-3">Fill in the required data and submit your enquiry. Our team will review it and get back to you.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

<div className="space-y-6">

<div>
                      <label className="block text-sm font-semibold text-[#344054] mb-1.5">
                        Enquiry title <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        name="title"
                        placeholder="Enter enquiry title"
                        className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm transition-all"
                      />
                    </div>

<div>
                      <label className="block text-sm font-semibold text-[#344054] mb-1.5">
                        Enquiry description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        name="description"
                        rows={3}
                        placeholder="Describe your enquiry in detail..."
                        className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm transition-all resize-none"
                      />
                    </div>

<div>
                      <label className="block text-sm font-semibold text-[#344054] mb-1.5">Purpose</label>
                      <select name="purpose" className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm">
                        <option value="">Select purpose...</option>
                        {purposes.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>

<div>
                      <label className="block text-sm font-semibold text-[#344054] mb-1.5">Upload image / document</label>
                      <div
                        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                        onDragLeave={() => setDragActive(false)}
                        onDrop={handleDrop}
                        onClick={() => fileRef.current?.click()}
                        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                          dragActive ? "border-primary bg-primary/5" : "border-[#D0D5DD] hover:border-primary/50 hover:bg-[#F9FAFB]"
                        }`}
                      >
                        <input
                          ref={fileRef}
                          type="file"
                          accept="image/*,application/pdf,video/mp4"
                          className="hidden"
                          onChange={(e) => e.target.files?.[0] && setUploadedFile(e.target.files[0])}
                        />
                        {uploadedFile ? (
                          <div className="flex items-center justify-center gap-2 text-sm text-[#344054]">
                            <CheckCircle size={18} className="text-primary shrink-0" />
                            <span className="truncate max-w-[200px] font-medium">{uploadedFile.name}</span>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setUploadedFile(null); }}
                              className="text-[#98A2B3] hover:text-[#B42318]"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <UploadCloud className="mx-auto text-[#98A2B3] mb-2" size={36} />
                            <p className="text-sm font-semibold text-[#344054]">Drag & drop or click to upload</p>
                            <p className="text-xs text-[#98A2B3] mt-1">JPG, PNG, GIF, MP4, PDF (max 10 MB)</p>
                          </>
                        )}
                      </div>
                    </div>

<div>
                      <label className="block text-sm font-semibold text-[#344054] mb-1.5">
                        Required date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="requiredDate"
                        required
                        className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                      />
                    </div>

<div>
                      <label className="block text-sm font-semibold text-[#344054] mb-1.5">Required qualification</label>
                      <select name="qualification" className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm">
                        <option value="">Select qualification...</option>
                        {qualifications.map((q) => <option key={q} value={q}>{q}</option>)}
                      </select>
                    </div>
                  </div>

<div className="space-y-6">

<div>
                      <label className="block text-sm font-semibold text-[#344054] mb-1.5">
                        Enquiry category <span className="text-red-500">*</span>
                      </label>
                      <select required name="category" className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm">
                        <option value="">Select category...</option>
                        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

<div>
                      <label className="block text-sm font-semibold text-[#344054] mb-1.5">Enquiry subcategory</label>
                      <select name="subCategory" className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm">
                        <option value="">Select subcategory...</option>
                        {subCategories.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

<div>
                      <label className="block text-sm font-semibold text-[#344054] mb-1.5">Required standard</label>
                      <select name="standard" className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm">
                        <option value="">Select standard...</option>
                        {standards.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

<div>
                      <label className="block text-sm font-semibold text-[#344054] mb-1.5">
                        Quantity <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-0">
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="w-11 h-11 bg-primary text-black flex items-center justify-center rounded-l-xl hover:bg-primary/90 transition-colors font-bold"
                        >
                          <Minus size={18} />
                        </button>
                        <div className="flex-1 h-11 bg-[#F9FAFB] border-t border-b border-[#EAECF0] flex items-center justify-center text-base font-bold text-[#101828]">
                          {quantity}
                        </div>
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => q + 1)}
                          className="w-11 h-11 bg-primary text-black flex items-center justify-center rounded-r-xl hover:bg-primary/90 transition-colors font-bold"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

<div className="flex gap-3 mt-10 pt-6 border-t border-[#F2F4F7]">
                  <button
                    type="button"
                    className="flex-1 py-3 border border-[#EAECF0] text-sm font-semibold text-[#344054] rounded-xl hover:bg-[#F9FAFB] transition-all"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl transition-all hover:-translate-y-0.5 shadow-sm text-sm"
                  >
                    Submit Enquiry
                  </button>
                </div>
              </div>
            </form>
          </div>

{submitted && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full mx-4 text-center animate-in zoom-in duration-200">
                
                <div className="w-24 h-24 mx-auto mb-6 relative">
                  <div className="w-full h-full bg-[#F9FAFB] rounded-2xl border-4 border-[#EAECF0] flex items-center justify-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" stroke="#027A48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-3 bg-[#EAECF0] rounded" />
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-14 h-1.5 bg-[#EAECF0] rounded-full" />
                </div>
                <h2 className="text-xl font-black text-[#101828] mb-3 mt-2">
                  Your enquiry has been sent successfully!
                </h2>
                <p className="text-[#667085] text-sm leading-relaxed mb-8">
                  Our team will review it, and we will keep you updated with any developments.
                </p>
                <div className="flex gap-3">
                  <Link
                    href="/client/enquiries"
                    className="flex-1 py-3 border border-[#EAECF0] text-sm font-semibold text-[#344054] rounded-xl hover:bg-[#F9FAFB] transition-all"
                    onClick={() => setSubmitted(false)}
                  >
                    View Enquiries
                  </Link>
                  <button
                    onClick={() => { setSubmitted(false); setQuantity(1); setUploadedFile(null); }}
                    className="flex-1 py-3 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl transition-all text-sm"
                  >
                    Post Another
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
