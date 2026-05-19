"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { Check, FileText, X, Save, UploadCloud, Folder, Paperclip } from "lucide-react";
import Button from "@/components/ui/button";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const steps = [
  "Company info",
  "User info",
  "Contact details",
  "Extra Doc",
  "Documentation",
  "Final step"
];

const referralOptions = ["Social media", "Google search", "Friend", "Marketer"];

export default function ClientProfilePage() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  
  const [step, setStep] = useState(1);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Form State Pre-populated with High-Fidelity Mock/User Data
  const [formData, setFormData] = useState({
    email: user?.email || "Gmail@gmail.com",
    password: "••••••••",
    confirmPassword: "••••••••",
    companyName: "VnT Services Ltd.",
    location: "Riyadh, Saudi Arabia",
    branch: "Main Branch",
    crNumber: "1010123456",
    
    // Step 2
    serviceScope: "Services",
    categoryClassification: "Pipe line classification",
    establishedWhen: "2018",
    establishedWhere: "Riyadh",
    assessmentName: "Ahmad Al-Subaie",
    assessmentPosition: "QHSE Manager",
    website: "https://vnt-services.com",
    premisesArea: "4500",
    premisesOffice: "200",
    premisesInsideStorage: "1200",
    premisesOutsideStorage: "2500",

    // Step 3 (Nested Contacts)
    directorsSection: { name: "Saleh Al-Omran", tel: "+966501234567", email: "saleh@vnt.com" },
    financialSection: { name: "Omar Bakr", tel: "+966502345678", email: "financial@vnt.com" },
    technicalSection: { name: "Khalid Mansour", tel: "+966503456789", email: "technical@vnt.com" },
    afterHoursSection: { name: "Duty Support", tel: "+966504567890", email: "support@vnt.com" },
    qhseSection: { name: "Yousef Qahtani", tel: "+966505678901", email: "qhse@vnt.com" },
    commercialSection: { name: "Fahad Harbi", tel: "+966506789012", email: "commercial@vnt.com" },

    // Step 4 (Extra Doc textareas)
    insuranceText: "We hold a comprehensive third-party liability insurance policy with Al Rajhi Takaful covering up to 5,000,000 SAR.",
    accreditationText: "ISO 9001:2015 Quality Management System, ISO 14001:2015 Environmental Management System, and ISO 45001:2018 Health & Safety.",
    financialCapabilityText: "Supported by a paid-up capital of 2,000,000 SAR and active credit lines with SABB and SNB.",
    majorClientsText: "Saudi Aramco, SABIC, SEC (Saudi Electricity Company), and Ma'aden.",

    referralSource: "Marketer",
    agreedToTerms: true,
  });

  // Document files mock state
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(user?.avatar || "/profile-image.png");
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({
    crFile: new File([""], "cr_certificate.pdf", { type: "application/pdf" }),
    zakat: new File([""], "zakat_certificate.pdf", { type: "application/pdf" }),
    gosi: new File([""], "gosi_registration.pdf", { type: "application/pdf" }),
    saudization: new File([""], "saudization_compliance.pdf", { type: "application/pdf" }),
    vat: new File([""], "vat_certificate.pdf", { type: "application/pdf" }),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleNestedInputChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        [field]: value
      }
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const file = e.target.files?.[0];
    if (file) {
      if (name === "profilePhoto") {
        setProfilePhoto(file);
        setProfilePhotoPreview(URL.createObjectURL(file));
      } else {
        setUploadedFiles(prev => ({ ...prev, [name]: file }));
      }
    }
  };

  const removeUploadedFile = (name: string) => {
    if (name === "profilePhoto") {
      setProfilePhoto(null);
      setProfilePhotoPreview(null);
    } else {
      setUploadedFiles(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.companyName) newErrors.companyName = "Company name is required";
      if (!formData.crNumber) newErrors.crNumber = "CR number is required";
      if (!formData.location) newErrors.location = "Location is required";
    }

    if (currentStep === 2) {
      if (!formData.categoryClassification) newErrors.categoryClassification = "Classification is required";
      if (!formData.establishedWhen) newErrors.establishedWhen = "Established year is required";
    }

    if (currentStep === 6) {
      if (!formData.referralSource) newErrors.referralSource = "Please select a referral source";
      if (!formData.agreedToTerms) newErrors.agreedToTerms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(6)) return;

    if (user) {
      setUser({
        ...user,
        name: formData.assessmentName,
        avatar: profilePhotoPreview || undefined,
      });
    }

    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setStep(1);
    }, 4500);
  };

  const activeNavIndex = step - 1;

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {/* Global Navigation Header */}
      <Navbar />

      {/* Main Profile Wizard Layout */}
      <div className="flex flex-col lg:flex-row max-w-[1200px] w-full mx-auto px-4 md:px-6 py-10 gap-8 relative min-h-[calc(100vh-80px)]">
        
        {/* Left Column: Progress Stepper */}
        <div className="w-full lg:w-[280px] bg-[#2d2d2d] rounded-2xl flex flex-col p-6 md:p-8 shrink-0 shadow-lg select-none h-fit">
          <h3 className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-6">Edit Profile Stages</h3>
          <div className="flex flex-col gap-6 relative">
            {steps.map((s, i) => {
              const isActive = i === activeNavIndex;
              const isCompleted = step > i + 1;

              return (
                <div
                  key={i}
                  onClick={() => {
                    if (i + 1 < step || validateStep(step)) {
                      setStep(i + 1);
                    }
                  }}
                  className={`flex items-center gap-4 text-xs md:text-sm font-medium z-[1] cursor-pointer transition-all duration-200 ${
                    isActive ? "text-white scale-105 origin-left" : "text-[#aaaaaa] hover:text-white"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center bg-[#2d2d2d] transition-all duration-300 ${
                      isActive 
                        ? "border-primary" 
                        : isCompleted 
                        ? "border-primary bg-primary text-black" 
                        : "border-[#555]"
                    }`}
                  >
                    {isCompleted ? (
                      <Check size={12} strokeWidth={3} className="text-black" />
                    ) : isActive ? (
                      <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-transparent"></div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/30 uppercase tracking-widest">Step {i + 1}</span>
                    <span className="font-bold -mt-0.5">{s}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Floating Form Card */}
        <div className="flex-1 bg-white p-6 md:p-10 rounded-2xl shadow-[0_10px_45px_rgba(0,0,0,0.06)] border border-[#EAECF0] min-h-[600px] flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="space-y-8 flex flex-col justify-between h-full">
            
            {/* STEP 1: Company info */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <p className="text-primary font-bold mb-1.5 text-xs uppercase tracking-widest">Basic Corporate Info</p>
                  <h2 className="text-xl md:text-2xl font-black text-[#101828]">1. What is the company info?</h2>
                  <p className="text-xs text-gray-500 mt-1">Please provide accurate corporate registration details.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col">
                    <label className="text-sm font-bold text-[#344054] mb-2">Valid Email *</label>
                    <input
                      type="email"
                      name="email"
                      readOnly
                      value={formData.email}
                      className="w-full p-4 bg-[#eef2f6] text-gray-500 border border-transparent rounded-xl outline-none cursor-not-allowed text-sm font-semibold"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-bold text-[#344054] mb-2">Password *</label>
                    <input
                      type="password"
                      name="password"
                      readOnly
                      value={formData.password}
                      className="w-full p-4 bg-[#eef2f6] text-gray-500 border border-transparent rounded-xl outline-none cursor-not-allowed text-sm font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col">
                    <label className="text-sm font-bold text-[#344054] mb-2">Re-write Password *</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      readOnly
                      value={formData.confirmPassword}
                      className="w-full p-4 bg-[#eef2f6] text-gray-500 border border-transparent rounded-xl outline-none cursor-not-allowed text-sm font-semibold"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-bold text-[#344054] mb-2">Company Name *</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className={`w-full p-4 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-semibold transition-all ${
                        errors.companyName ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="flex flex-col">
                    <label className="text-sm font-bold text-[#344054] mb-2">Location of the company *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-semibold transition-all"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-bold text-[#344054] mb-2">Branch</label>
                    <input
                      type="text"
                      name="branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-semibold transition-all"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-bold text-[#344054] mb-2">Registration Number (CR) *</label>
                    <input
                      type="text"
                      name="crNumber"
                      value={formData.crNumber}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-semibold transition-all"
                    />
                  </div>
                </div>

                {/* Company registration file upload */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-bold text-[#344054] mb-2">Company Registration Certificate *</label>
                    {uploadedFiles.crFile ? (
                      <div className="flex items-center justify-between p-4 bg-[#eef2f6] rounded-xl border border-gray-200">
                        <div className="flex items-center gap-3">
                          <FileText className="text-primary" size={24} />
                          <span className="text-sm font-bold text-[#101828]">{uploadedFiles.crFile.name}</span>
                        </div>
                        <button type="button" onClick={() => removeUploadedFile("crFile")} className="text-gray-400 hover:text-red-500 p-1">
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-[#eef2f6] relative hover:border-primary transition-all">
                        <UploadCloud size={40} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-xs font-bold text-[#101828]">Drag & drop or <span className="text-primary underline cursor-pointer">upload</span></p>
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, "crFile")} />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-bold text-[#344054] mb-2">Upload a company photo?</label>
                    {profilePhotoPreview ? (
                      <div className="flex items-center justify-between p-4 bg-[#eef2f6] rounded-xl border border-gray-200">
                        <div className="flex items-center gap-3">
                          <img src={profilePhotoPreview} alt="Preview" className="w-12 h-12 rounded-full object-cover border border-white" />
                          <span className="text-sm font-bold text-[#101828]">{profilePhoto?.name || "company-photo.png"}</span>
                        </div>
                        <button type="button" onClick={() => removeUploadedFile("profilePhoto")} className="text-gray-400 hover:text-red-500 p-1">
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-[#eef2f6] relative hover:border-primary transition-all">
                        <Folder className="mx-auto text-primary mb-2" size={40} />
                        <p className="text-xs font-bold text-[#101828]">Drag & drop or <span className="text-primary underline cursor-pointer">upload</span></p>
                        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, "profilePhoto")} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: User info */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <p className="text-primary font-bold mb-1.5 text-xs uppercase tracking-widest">Scope & Operational details</p>
                  <h2 className="text-xl md:text-2xl font-black text-[#101828]">2. What is the scope & category info?</h2>
                </div>

                {/* Scope selector */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-[#344054]">Company scope of services *</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { id: "Services", label: "Services", img: "/Services.png" },
                      { id: "Rental", label: "Rental", img: "/for-rent.png" },
                      { id: "Manpower", label: "Man Power", img: "/power.png" },
                      { id: "Products", label: "Products", img: "/product.png" }
                    ].map((scope) => (
                      <button
                        key={scope.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, serviceScope: scope.id }))}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                          formData.serviceScope === scope.id
                            ? "border-primary bg-primary text-black font-black"
                            : "border-transparent bg-[#eef2f6] text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <img src={scope.img} alt={scope.label} className="w-8 h-8 object-contain mb-2" />
                        <span className="text-xs font-bold">{scope.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col">
                    <label className="text-sm font-bold text-[#344054] mb-2">Company category classification *</label>
                    <select
                      name="categoryClassification"
                      value={formData.categoryClassification}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:border-primary text-sm font-semibold"
                    >
                      <option value="Pipe line classification">Pipe line classification</option>
                      <option value="Industrial classification">Industrial classification</option>
                      <option value="Electrical classification">Electrical classification</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-sm font-bold text-[#344054] mb-2">Background: When?</label>
                      <input
                        type="text"
                        name="establishedWhen"
                        placeholder="Year"
                        value={formData.establishedWhen}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:border-primary text-sm font-semibold"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-bold text-[#344054] mb-2">Where?</label>
                      <input
                        type="text"
                        name="establishedWhere"
                        placeholder="City"
                        value={formData.establishedWhere}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:border-primary text-sm font-semibold"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col">
                    <label className="text-sm font-bold text-[#344054] mb-2">Initial Assessment Submitter Name</label>
                    <input
                      type="text"
                      name="assessmentName"
                      value={formData.assessmentName}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:border-primary text-sm font-semibold"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-bold text-[#344054] mb-2">Submitter Position</label>
                    <input
                      type="text"
                      name="assessmentPosition"
                      value={formData.assessmentPosition}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:border-primary text-sm font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col">
                    <label className="text-sm font-bold text-[#344054] mb-2">Company Website *</label>
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:border-primary text-sm font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <div className="flex flex-col col-span-1">
                      <label className="text-[10px] font-bold text-[#344054] mb-2 truncate">Premises Area m²</label>
                      <input
                        type="text"
                        name="premisesArea"
                        value={formData.premisesArea}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:border-primary text-sm font-semibold"
                      />
                    </div>
                    <div className="flex flex-col col-span-1">
                      <label className="text-[10px] font-bold text-[#344054] mb-2 truncate">Office m²</label>
                      <input
                        type="text"
                        name="premisesOffice"
                        value={formData.premisesOffice}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:border-primary text-sm font-semibold"
                      />
                    </div>
                    <div className="flex flex-col col-span-1">
                      <label className="text-[10px] font-bold text-[#344054] mb-2 truncate">Inside Storage</label>
                      <input
                        type="text"
                        name="premisesInsideStorage"
                        value={formData.premisesInsideStorage}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:border-primary text-sm font-semibold"
                      />
                    </div>
                    <div className="flex flex-col col-span-1">
                      <label className="text-[10px] font-bold text-[#344054] mb-2 truncate">Outside Storage</label>
                      <input
                        type="text"
                        name="premisesOutsideStorage"
                        value={formData.premisesOutsideStorage}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:border-primary text-sm font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Contact details */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <p className="text-primary font-bold mb-1.5 text-xs uppercase tracking-widest">Authority Channels</p>
                  <h2 className="text-xl md:text-2xl font-black text-[#101828]">3. Who are the responsible contacts?</h2>
                </div>

                <div className="space-y-6 max-h-[420px] overflow-y-auto pr-2 no-scrollbar">
                  {[
                    { id: "directorsSection", label: "Company Directors" },
                    { id: "financialSection", label: "Financial Contact" },
                    { id: "technicalSection", label: "Technical Contact" },
                    { id: "afterHoursSection", label: "After Office Hours Contact" },
                    { id: "qhseSection", label: "QHSE Contact" },
                    { id: "commercialSection", label: "Commercial Contact" }
                  ].map((sec) => (
                    <div key={sec.id} className="border-b border-[#EAECF0] pb-5 last:border-0 last:pb-0">
                      <div className="bg-[#f0d05c] px-4 py-2 rounded-lg mb-4">
                        <h4 className="text-black font-extrabold text-sm uppercase tracking-wider">{sec.label}</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col">
                          <label className="text-xs font-bold text-[#344054] mb-1">Name</label>
                          <input
                            type="text"
                            value={(formData as any)[sec.id].name}
                            onChange={(e) => handleNestedInputChange(sec.id, "name", e.target.value)}
                            className="w-full p-3 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:border-primary text-xs font-semibold"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs font-bold text-[#344054] mb-1">Tele</label>
                          <input
                            type="text"
                            value={(formData as any)[sec.id].tel}
                            onChange={(e) => handleNestedInputChange(sec.id, "tel", e.target.value)}
                            className="w-full p-3 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:border-primary text-xs font-semibold"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs font-bold text-[#344054] mb-1">Email</label>
                          <input
                            type="email"
                            value={(formData as any)[sec.id].email}
                            onChange={(e) => handleNestedInputChange(sec.id, "email", e.target.value)}
                            className="w-full p-3 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:border-primary text-xs font-semibold"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Extra Doc */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <p className="text-primary font-bold mb-1.5 text-xs uppercase tracking-widest">Supplemental Records</p>
                  <h2 className="text-xl md:text-2xl font-black text-[#101828]">4. Extra accreditations & qualifications</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-[180px] bg-[#eef2f6] p-4 rounded-xl border border-[#EAECF0] shrink-0 text-xs text-[#344054]">
                      <span className="font-extrabold block mb-1 text-black">Insurance Details</span>
                      What type of insurance do you have? write the insurances details below.
                    </div>
                    <textarea
                      name="insuranceText"
                      value={formData.insuranceText}
                      onChange={handleInputChange}
                      className="flex-1 p-4 h-32 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:border-primary text-xs font-semibold resize-none"
                    />
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-[180px] bg-[#eef2f6] p-4 rounded-xl border border-[#EAECF0] shrink-0 text-xs text-[#344054]">
                      <span className="font-extrabold block mb-1 text-black">Accreditation</span>
                      Does the company have any accreditation? write the details below.
                    </div>
                    <textarea
                      name="accreditationText"
                      value={formData.accreditationText}
                      onChange={handleInputChange}
                      className="flex-1 p-4 h-32 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:border-primary text-xs font-semibold resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-[180px] bg-[#eef2f6] p-4 rounded-xl border border-[#EAECF0] shrink-0 text-xs text-[#344054]">
                      <span className="font-extrabold block mb-1 text-black">Financial Capability</span>
                      What is the financial capability of the company? write the details below.
                    </div>
                    <textarea
                      name="financialCapabilityText"
                      value={formData.financialCapabilityText}
                      onChange={handleInputChange}
                      className="flex-1 p-4 h-32 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:border-primary text-xs font-semibold resize-none"
                    />
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-[180px] bg-[#eef2f6] p-4 rounded-xl border border-[#EAECF0] shrink-0 text-xs text-[#344054]">
                      <span className="font-extrabold block mb-1 text-black">List of Major Clients</span>
                      Write the list of major clients below.
                    </div>
                    <textarea
                      name="majorClientsText"
                      value={formData.majorClientsText}
                      onChange={handleInputChange}
                      className="flex-1 p-4 h-32 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:border-primary text-xs font-semibold resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Documentation */}
            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <p className="text-primary font-bold mb-1.5 text-xs uppercase tracking-widest">Verify Certificates</p>
                  <h2 className="text-xl md:text-2xl font-black text-[#101828]">5. Upload necessary verification certificates</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[380px] overflow-y-auto pr-2 no-scrollbar">
                  {[
                    { id: "zakat", label: "Zakat & Income Tax Certificate" },
                    { id: "gosi", label: "GOSI Compliance Certificate" },
                    { id: "saudization", label: "Saudization National Certificate" },
                    { id: "industrial", label: "Industrial License" },
                    { id: "vat", label: "VAT Registration Certificate" },
                    { id: "materialsList", label: "List of Materials / Products" },
                    { id: "authorizedPersons", label: "List of Authorized Signatories" },
                    { id: "auditedStatement", label: "Latest Audited Financial Statement" },
                    { id: "previousPOs", label: "Previous Purchase Orders (POs)" }
                  ].map((doc) => (
                    <div key={doc.id} className="flex flex-col bg-[#eef2f6] p-4 rounded-xl border border-[#EAECF0] justify-between gap-3">
                      <span className="text-xs font-extrabold text-[#101828]">{doc.label}</span>
                      
                      {uploadedFiles[doc.id] ? (
                        <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-gray-200">
                          <div className="flex items-center gap-2 min-w-0">
                            <Paperclip size={14} className="text-primary shrink-0" />
                            <span className="text-xs text-gray-700 truncate font-semibold">{uploadedFiles[doc.id].name}</span>
                          </div>
                          <button type="button" onClick={() => removeUploadedFile(doc.id)} className="text-gray-400 hover:text-red-500">
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <div className="relative border border-dashed border-gray-300 rounded-lg py-4 text-center bg-white hover:border-primary transition-all">
                          <UploadCloud size={20} className="mx-auto text-gray-400 mb-1" />
                          <span className="text-[10px] text-gray-600 block">Drag & drop or <span className="text-primary underline cursor-pointer font-bold">Upload</span></span>
                          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, doc.id)} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 6: Final step */}
            {step === 6 && (
              <div className="space-y-6">
                <div>
                  <p className="text-primary font-bold mb-1.5 text-xs uppercase tracking-widest">Confirmation</p>
                  <h2 className="text-xl md:text-2xl font-black text-[#101828]">6. Submit and save profile changes</h2>
                </div>

                <div className="bg-[#eef2f6] p-6 rounded-2xl border border-[#EAECF0] space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-[#344054] block">How did you know us? *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {referralOptions.map((refOpt) => (
                        <button
                          key={refOpt}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, referralSource: refOpt }))}
                          className={`py-3 px-4 rounded-xl border-2 transition-all font-bold text-xs ${
                            formData.referralSource === refOpt
                              ? "border-primary bg-primary text-black"
                              : "border-transparent bg-white text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {refOpt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200">
                    <input
                      type="checkbox"
                      id="termsCheckbox"
                      name="agreedToTerms"
                      checked={formData.agreedToTerms}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 accent-primary cursor-pointer"
                    />
                    <label htmlFor="termsCheckbox" className="text-xs text-[#344054] font-semibold leading-relaxed cursor-pointer select-none">
                      I hereby verify that all provided data is true, valid, and authentic. I agree to terms and privacy guidelines.
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Footer Action Buttons */}
            <div className="flex items-center justify-between border-t border-[#EAECF0] pt-6 mt-6">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="h-12 px-6 bg-[#eef2f6] text-[#344054] font-black rounded-xl hover:bg-gray-200 transition-all text-xs"
                >
                  Previous Step
                </button>
              ) : (
                <Link
                  href="/client"
                  className="h-12 px-6 bg-[#eef2f6] text-gray-500 font-black rounded-xl hover:bg-gray-200 transition-all text-xs flex items-center justify-center"
                >
                  Exit Profile
                </Link>
              )}

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSaved(true);
                    setTimeout(() => setSaved(false), 2000);
                  }}
                  className="h-12 px-6 bg-[#eef2f6] text-primary font-black rounded-xl hover:bg-gray-200 transition-all text-xs border border-primary/20"
                >
                  Save Draft
                </button>

                {step < steps.length ? (
                  <Button
                    variant="primary"
                    size="md"
                    type="button"
                    onClick={handleNext}
                    className="h-12 px-6 font-black text-xs"
                  >
                    Save and Continue
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="md"
                    type="submit"
                    className="h-12 px-8 font-black text-xs flex items-center gap-2"
                  >
                    <Save size={14} />
                    Submit Final Changes
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Global Footer */}
      <Footer />

      {/* Save Success Alert Modal */}
      {saved && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center animate-in zoom-in-95 duration-200 border border-[#EAECF0]">
            <div className="w-16 h-16 bg-green-50 border-4 border-green-100 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
              <Check className="text-green-600" size={28} strokeWidth={3} />
            </div>
            <h3 className="text-xl font-bold text-[#101828] mb-2">Profile Saved Successfully!</h3>
            <p className="text-sm text-[#667085] leading-relaxed mb-6">
              Your company records and documents have been updated successfully.
            </p>
            <div className="bg-primary/10 text-primary-dark p-3 rounded-lg border border-primary/20 text-xs font-bold">
              Returning to Dashboard Overview...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
