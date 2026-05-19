"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "../../client/Sidebar/Sidebar";
import Header from "../../client/header";
import { useAuthStore } from "@/store/authStore";
import {
  Camera,
  Save,
  Check,
  FileText,
  X,
  UploadCloud,
  Folder,
  Paperclip,
  Plus,
  Trash2,
  Building,
  Users as UsersIcon,
  Wrench,
  Activity,
  HardHat,
  ShieldCheck,
  PlusCircle,
  HelpCircle,
  Briefcase
} from "lucide-react";
import Button from "@/components/ui/button";

const steps = [
  "Welcome & Intro",
  "General Info",
  "Personnel & Manpower",
  "Verification & Equipment",
  "Process Facility",
  "QHSE Information",
  "Documentation & Submit"
];

const scopeOptions = [
  { id: "Services", label: "Services", img: "/Services.png" },
  { id: "Rental", label: "Rental", img: "/for-rent.png" },
  { id: "Man power", label: "Man Power", img: "/power.png" },
  { id: "Products", label: "Products", img: "/product.png" }
];

const categoryOptions = [
  "Pipeline classification",
  "Drilling services",
  "Maintenance",
  "Equipment supply",
  "General Contracting"
];

const referralOptions = ["Social media", "Google search", "Friend", "Marketer"];

interface KeyPersonnel {
  name: string;
  position: string;
  qualification: string;
  yearsWithCompany: string;
}

interface EquipmentItem {
  name: string;
  manufacturer: string;
  serialNumber: string;
  calibrationExpiry: string;
  ownership: string;
}

export default function SupplierProfilePage() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  
  const [step, setStep] = useState(1);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // High-Fidelity Form State prepopulated for premium presentation
  const [formData, setFormData] = useState({
    // Step 2: General Info
    companyName: user?.name || "Suliman & Partners Tech Co.",
    crNumber: "1010987654",
    email: user?.email || "supplier@suliman-tech.com",
    phone: user?.phone || "+966555123456",
    website: "https://supplier.suliman-tech.com",
    establishedWhen: "2015",
    establishedWhere: "Dammam, Saudi Arabia",
    experienceYears: "11",
    serviceScope: "Services", 
    categoryClassification: "Pipeline classification",
    
    // Step 3: Personnel & Manpower
    totalManpower: "150",
    technicalStaffCount: "45",
    adminStaffCount: "15",
    qhseInspectorsCount: "8",
    keyPersonnel: [
      { name: "Sami Al-Harbi", position: "Lead Pipeline Engineer", qualification: "B.Sc. Mechanical Engineering", yearsWithCompany: "6" },
      { name: "Fatimah Al-Zahrani", position: "QHSE Lead Auditor", qualification: "M.Sc. Safety Engineering", yearsWithCompany: "4" },
      { name: "John Doe", position: "Senior Operations Director", qualification: "MBA & B.Sc. Civil Eng", yearsWithCompany: "8" }
    ] as KeyPersonnel[],
    
    // Step 4: Verification & Test Equipment
    hasCalibrationProgram: "yes",
    calibrationStandards: "ISO 17025, ASME Section VIII, ASTM Standards",
    equipmentList: [
      { name: "Ultrasonic Thickness Gauge", manufacturer: "Olympus (38DL PLUS)", serialNumber: "UT-998822-OL", calibrationExpiry: "2027-04-15", ownership: "Owned" },
      { name: "Hydrostatic Test Pump", manufacturer: "Ridgid (1450)", serialNumber: "HT-110055-RI", calibrationExpiry: "2026-11-20", ownership: "Owned" },
      { name: "Magnetic Particle Yoke", manufacturer: "Magnaflux (Y-2)", serialNumber: "MP-887711-MA", calibrationExpiry: "2027-01-10", ownership: "Leased" }
    ] as EquipmentItem[],
    
    // Step 5: Process Facility
    premisesArea: "8500",
    premisesOffice: "450",
    premisesWorkshop: "2500",
    premisesInsideStorage: "1800",
    premisesOutsideStorage: "3500",
    branchesCount: "2",
    workshopAddress: "Industrial Area Phase 2, Dammam",
    facilityOwnership: "Owned",
    
    // Step 6: QHSE
    hasQhseManual: "yes",
    hasLtiRecord: "no",
    ltiDetails: "Zero LTIs recorded for the past 3 consecutive years. ISO 45001 certification active.",
    iso9001Certified: true,
    iso9001Expiry: "2028-06-30",
    iso14001Certified: true,
    iso14001Expiry: "2027-12-15",
    iso45001Certified: true,
    iso45001Expiry: "2028-03-22",
    apiCertified: false,
    apiExpiry: "",
    qhseManagerName: "Faisal Al-Otaibi",
    qhseManagerTel: "+966555987654",
    qhseManagerEmail: "f.otaibi@suliman-tech.com",
    
    // Step 7: Final
    referralSource: "Social media",
    agreedToTerms: true
  });

  // Document files mock state
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(user?.avatar || null);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({
    crFile: new File([""], "cr_certificate_2026.pdf", { type: "application/pdf" }),
    zakat: new File([""], "zakat_income_tax_cert.pdf", { type: "application/pdf" }),
    gosi: new File([""], "gosi_compliance_letter.pdf", { type: "application/pdf" }),
    saudization: new File([""], "saudization_nitaqat_cert.pdf", { type: "application/pdf" }),
    vat: new File([""], "vat_registration_cert.pdf", { type: "application/pdf" }),
    qhsePolicy: new File([""], "qhse_system_manual.pdf", { type: "application/pdf" }),
    materialsList: new File([""], "products_and_materials_catalogue.pdf", { type: "application/pdf" })
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const file = e.target.files?.[0];
    if (file) {
      if (name === "profilePhoto") {
        setProfilePhoto(file);
        setProfilePhotoPreview(URL.createObjectURL(file));
      } else {
        setUploadedFiles((prev) => ({ ...prev, [name]: file }));
      }
    }
  };

  const removeUploadedFile = (name: string) => {
    if (name === "profilePhoto") {
      setProfilePhoto(null);
      setProfilePhotoPreview(null);
    } else {
      setUploadedFiles((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  // Dynamic Personnel Actions
  const addPersonnelRow = () => {
    setFormData((prev) => ({
      ...prev,
      keyPersonnel: [
        ...prev.keyPersonnel,
        { name: "", position: "", qualification: "", yearsWithCompany: "" }
      ]
    }));
  };

  const removePersonnelRow = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      keyPersonnel: prev.keyPersonnel.filter((_, i) => i !== index)
    }));
  };

  const handlePersonnelChange = (index: number, field: keyof KeyPersonnel, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.keyPersonnel];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, keyPersonnel: updated };
    });
  };

  // Dynamic Equipment Actions
  const addEquipmentRow = () => {
    setFormData((prev) => ({
      ...prev,
      equipmentList: [
        ...prev.equipmentList,
        { name: "", manufacturer: "", serialNumber: "", calibrationExpiry: "", ownership: "Owned" }
      ]
    }));
  };

  const removeEquipmentRow = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      equipmentList: prev.equipmentList.filter((_, i) => i !== index)
    }));
  };

  const handleEquipmentChange = (index: number, field: keyof EquipmentItem, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.equipmentList];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, equipmentList: updated };
    });
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 2) {
      if (!formData.companyName) newErrors.companyName = "Company name is required";
      if (!formData.crNumber) newErrors.crNumber = "CR number is required";
      if (!formData.establishedWhen) newErrors.establishedWhen = "Established year is required";
      if (!formData.establishedWhere) newErrors.establishedWhere = "Established city/country is required";
      if (!formData.phone) newErrors.phone = "Phone number is required";
    }

    if (currentStep === 7) {
      if (!formData.referralSource) newErrors.referralSource = "Please select how you heard about us";
      if (!formData.agreedToTerms) newErrors.agreedToTerms = "You must agree to the verification statement";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(7)) return;

    if (user) {
      setUser({
        ...user,
        name: formData.companyName,
        avatar: profilePhotoPreview || undefined,
      });
    }

    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setStep(1);
    }, 4000);
  };

  const activeNavIndex = step - 1;

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      {/* Sidebar navigation */}
      <Sidebar role="Supplier" />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header toolbar */}
        <Header role="Supplier" />

        <main className="flex-1 p-6 md:p-10 overflow-auto">
          {/* Breadcrumb */}
          <div className="text-[#667085] text-xs font-medium mb-8 max-w-6xl mx-auto">
            <Link href="/supplier" className="hover:text-black transition-colors">
              Dashboard
            </Link>{" "}
            &gt; <span className="text-[#98A2B3]">Edit Profile Wizard</span>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-220px)]">
            
            {/* Left Column: Progress Stepper */}
            <div className="w-full lg:w-[280px] bg-[#2d2d2d] rounded-2xl flex flex-col p-6 md:p-8 shrink-0 shadow-lg select-none h-fit">
              <h3 className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-6">
                Verification Progress
              </h3>
              
              {/* Overall Progress ring/bar info */}
              <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-white/70 font-semibold">Profile Completion</span>
                  <span className="text-sm text-primary font-black">
                    {Math.round((step / steps.length) * 100)}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${(step / steps.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-col gap-5 relative">
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
                        isActive ? "text-white scale-102 origin-left" : "text-[#aaaaaa] hover:text-white"
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
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-transparent"></div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] text-white/30 uppercase tracking-widest">Stage {i + 1}</span>
                        <span className="font-bold -mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px]">
                          {s}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Slide Card */}
            <div className="flex-1 bg-white p-6 md:p-10 rounded-2xl shadow-[0_10px_45px_rgba(0,0,0,0.06)] border border-[#EAECF0] min-h-[600px] flex flex-col justify-between">
              
              <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full flex-1">
                
                {/* ──────────────────────────────────────────────────────── */}
                {/* SLIDE 1: Welcome & Info Panel */}
                {/* ──────────────────────────────────────────────────────── */}
                {step === 1 && (
                  <div className="space-y-8 animate-in fade-in duration-300">
                    <div className="text-center max-w-xl mx-auto py-4">
                      <div className="inline-flex p-3 bg-primary/10 rounded-2xl text-primary mb-4 animate-bounce">
                        <ShieldCheck size={40} />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black text-[#101828]">
                        Complete Your Supplier Profile
                      </h2>
                      <p className="text-sm text-gray-500 mt-2">
                        Welcome to Vendor & Tender's Supplier qualification wizard. Complete all 7 slides to obtain the premium certified badge and gain full visibility to elite buyers.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {[
                        {
                          icon: <Building size={20} className="text-primary" />,
                          title: "1. Global Visibility",
                          desc: "Expose your industrial capability and products to corporate procurement managers."
                        },
                        {
                          icon: <UsersIcon size={20} className="text-primary" />,
                          title: "2. Verified Status",
                          desc: "Undergo standardized evaluation to win immediate customer confidence and trust."
                        },
                        {
                          icon: <Briefcase size={20} className="text-primary" />,
                          title: "3. Direct Bidding",
                          desc: "Unlock access to premium private contracts, direct RFQs, and commercial bids."
                        }
                      ].map((item, idx) => (
                        <div key={idx} className="p-5 rounded-2xl bg-[#F9FAFB] border border-[#EAECF0] hover:shadow-md transition-shadow">
                          <div className="p-3 bg-white w-fit rounded-xl shadow-sm mb-3">
                            {item.icon}
                          </div>
                          <h4 className="font-bold text-sm text-[#101828] mb-1">{item.title}</h4>
                          <p className="text-xs text-[#667085] leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="p-5 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-between gap-4">
                      <div className="text-xs text-[#344054]">
                        <span className="font-bold block text-black mb-0.5">Quick Note:</span>
                        You can save your progress as draft at any time and return later to finish the documentation.
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-5 py-2.5 bg-primary text-black font-extrabold text-xs rounded-xl shadow hover:scale-105 transition-transform"
                      >
                        Start Application
                      </button>
                    </div>
                  </div>
                )}

                {/* ──────────────────────────────────────────────────────── */}
                {/* SLIDE 2: General Info Form */}
                {/* ──────────────────────────────────────────────────────── */}
                {step === 2 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div>
                      <p className="text-primary font-bold mb-1.5 text-xs uppercase tracking-widest">
                        Basic Corporate Info
                      </p>
                      <h2 className="text-xl md:text-2xl font-black text-[#101828]">
                        2. General Information
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">
                        Please update your base corporate identities and registration records.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-[#344054] mb-2 uppercase tracking-wider">Company Name *</label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className={`w-full p-3.5 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold transition-all ${
                            errors.companyName ? "border-red-500 ring-2 ring-red-100" : ""
                          }`}
                        />
                        {errors.companyName && <span className="text-red-500 text-xs mt-1">{errors.companyName}</span>}
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-[#344054] mb-2 uppercase tracking-wider">CR Number *</label>
                        <input
                          type="text"
                          name="crNumber"
                          value={formData.crNumber}
                          onChange={handleInputChange}
                          className={`w-full p-3.5 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold transition-all ${
                            errors.crNumber ? "border-red-500 ring-2 ring-red-100" : ""
                          }`}
                        />
                        {errors.crNumber && <span className="text-red-500 text-xs mt-1">{errors.crNumber}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-[#344054] mb-2 uppercase tracking-wider">Official Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full p-3.5 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold transition-all"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-[#344054] mb-2 uppercase tracking-wider">Phone Number *</label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full p-3.5 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold transition-all ${
                            errors.phone ? "border-red-500 ring-2 ring-red-100" : ""
                          }`}
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-[#344054] mb-2 uppercase tracking-wider">Website URL</label>
                        <input
                          type="text"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          className="w-full p-3.5 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-[#344054] mb-2 uppercase tracking-wider">When Established *</label>
                        <input
                          type="text"
                          name="establishedWhen"
                          value={formData.establishedWhen}
                          onChange={handleInputChange}
                          className="w-full p-3.5 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold transition-all"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-[#344054] mb-2 uppercase tracking-wider">Where (City & Country) *</label>
                        <input
                          type="text"
                          name="establishedWhere"
                          value={formData.establishedWhere}
                          onChange={handleInputChange}
                          className="w-full p-3.5 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold transition-all"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-[#344054] mb-2 uppercase tracking-wider">Experience (Years) *</label>
                        <input
                          type="number"
                          name="experienceYears"
                          value={formData.experienceYears}
                          onChange={handleInputChange}
                          className="w-full p-3.5 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold transition-all"
                        />
                      </div>
                    </div>

                    {/* Service Scope (ServiceGrid replica) */}
                    <div className="space-y-3 pt-2">
                      <label className="text-xs font-bold text-[#344054] uppercase tracking-wider">
                        Company Scope of Services *
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {scopeOptions.map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, serviceScope: opt.id }))}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                              formData.serviceScope === opt.id
                                ? "border-primary bg-primary/10 text-black font-extrabold shadow-sm scale-[1.02]"
                                : "border-transparent bg-[#eef2f6] text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            <img src={opt.img} alt={opt.label} className="w-8 h-8 object-contain mb-2 shrink-0" />
                            <span className="text-[11px] font-bold tracking-wide uppercase">{opt.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label className="text-xs font-bold text-[#344054] mb-2 uppercase tracking-wider">Company Category Classification</label>
                      <select
                        name="categoryClassification"
                        value={formData.categoryClassification}
                        onChange={handleInputChange}
                        className="w-full p-3.5 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold transition-all"
                      >
                        {categoryOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* ──────────────────────────────────────────────────────── */}
                {/* SLIDE 3: Personnel & Manpower Form */}
                {/* ──────────────────────────────────────────────────────── */}
                {step === 3 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div>
                      <p className="text-primary font-bold mb-1.5 text-xs uppercase tracking-widest">
                        Human Resource Composition
                      </p>
                      <h2 className="text-xl md:text-2xl font-black text-[#101828]">
                        3. Personnel & Manpower
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">
                        Please state the structural sizes of your company staff and add key management/technical personnel.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: "Total Manpower", name: "totalManpower" },
                        { label: "Technical/Engineering", name: "technicalStaffCount" },
                        { label: "Admin & Operations", name: "adminStaffCount" },
                        { label: "QHSE Quality Inspectors", name: "qhseInspectorsCount" }
                      ].map((item) => (
                        <div key={item.name} className="flex flex-col bg-[#F9FAFB] p-4 rounded-xl border border-[#EAECF0]">
                          <label className="text-[10px] font-bold text-[#667085] uppercase tracking-wider mb-2">
                            {item.label}
                          </label>
                          <input
                            type="number"
                            name={item.name}
                            value={(formData as any)[item.name]}
                            onChange={handleInputChange}
                            placeholder="0"
                            className="bg-[#eef2f6] w-full p-2.5 rounded-lg border border-transparent outline-none focus:ring-2 focus:ring-primary/25 font-black text-center text-sm"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Dynamic Key Personnel Table */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-[#344054] uppercase tracking-wider">
                          Key Technical & Management Staff
                        </label>
                        <button
                          type="button"
                          onClick={addPersonnelRow}
                          className="flex items-center gap-1 text-[11px] font-extrabold text-black bg-primary px-3 py-1.5 rounded-lg hover:scale-103 transition-transform"
                        >
                          <PlusCircle size={14} /> Add Personnel
                        </button>
                      </div>

                      <div className="overflow-x-auto border border-[#EAECF0] rounded-xl">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-[#2d2d2d] text-white uppercase tracking-wider text-[9px] font-bold">
                              <th className="p-3">Staff Name</th>
                              <th className="p-3">Position / Role</th>
                              <th className="p-3">Education / Qualification</th>
                              <th className="p-3 text-center">Years in Co.</th>
                              <th className="p-3 text-center w-12">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.keyPersonnel.map((person, index) => (
                              <tr key={index} className="border-b border-[#EAECF0] hover:bg-gray-50/50">
                                <td className="p-2">
                                  <input
                                    type="text"
                                    value={person.name}
                                    placeholder="Enter full name"
                                    onChange={(e) => handlePersonnelChange(index, "name", e.target.value)}
                                    className="w-full bg-[#eef2f6] p-2 rounded-lg border border-transparent text-xs font-medium outline-none focus:border-primary"
                                  />
                                </td>
                                <td className="p-2">
                                  <input
                                    type="text"
                                    value={person.position}
                                    placeholder="e.g. Lead Auditor"
                                    onChange={(e) => handlePersonnelChange(index, "position", e.target.value)}
                                    className="w-full bg-[#eef2f6] p-2 rounded-lg border border-transparent text-xs font-medium outline-none focus:border-primary"
                                  />
                                </td>
                                <td className="p-2">
                                  <input
                                    type="text"
                                    value={person.qualification}
                                    placeholder="e.g. B.Sc. Engineering"
                                    onChange={(e) => handlePersonnelChange(index, "qualification", e.target.value)}
                                    className="w-full bg-[#eef2f6] p-2 rounded-lg border border-transparent text-xs font-medium outline-none focus:border-primary"
                                  />
                                </td>
                                <td className="p-2 text-center w-20">
                                  <input
                                    type="number"
                                    value={person.yearsWithCompany}
                                    placeholder="Years"
                                    onChange={(e) => handlePersonnelChange(index, "yearsWithCompany", e.target.value)}
                                    className="w-full bg-[#eef2f6] p-2 rounded-lg border border-transparent text-xs font-black text-center outline-none focus:border-primary"
                                  />
                                </td>
                                <td className="p-2 text-center">
                                  <button
                                    type="button"
                                    onClick={() => removePersonnelRow(index)}
                                    className="text-gray-400 hover:text-red-600 transition-colors p-1"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {formData.keyPersonnel.length === 0 && (
                          <div className="p-5 text-center text-gray-400 bg-gray-50/50">
                            No personnel records added. Click 'Add Personnel' above to register members.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ──────────────────────────────────────────────────────── */}
                {/* SLIDE 4: Verification & Test Equipment */}
                {/* ──────────────────────────────────────────────────────── */}
                {step === 4 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div>
                      <p className="text-primary font-bold mb-1.5 text-xs uppercase tracking-widest">
                        Calibration & Verification Programs
                      </p>
                      <h2 className="text-xl md:text-2xl font-black text-[#101828]">
                        4. Verification & Test Equipment
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">
                        Please indicate calibration standards and detail key testing/calibration machinery you operate.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col bg-[#F9FAFB] p-5 rounded-xl border border-[#EAECF0] justify-center">
                        <label className="text-xs font-bold text-[#344054] mb-3 uppercase tracking-wider">
                          Active Calibration & Verification Program?
                        </label>
                        <div className="flex gap-4">
                          {["yes", "no"].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, hasCalibrationProgram: opt }))}
                              className={`flex-1 py-3 text-center rounded-xl border-2 font-bold uppercase text-xs transition-all ${
                                formData.hasCalibrationProgram === opt
                                  ? "bg-primary border-primary text-black font-extrabold"
                                  : "border-transparent bg-[#eef2f6] text-gray-500 hover:bg-gray-200"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-[#344054] mb-2 uppercase tracking-wider">
                          Applied Calibration Standards
                        </label>
                        <textarea
                          name="calibrationStandards"
                          value={formData.calibrationStandards}
                          onChange={handleInputChange}
                          placeholder="e.g. ISO 17025, NIST, ASME calibrating standard criteria"
                          className="w-full p-3.5 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-xs font-medium resize-none h-24"
                        />
                      </div>
                    </div>

                    {/* Dynamic Equipment List Table */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-[#344054] uppercase tracking-wider">
                          Evaluated Testing & Inspection Equipment
                        </label>
                        <button
                          type="button"
                          onClick={addEquipmentRow}
                          className="flex items-center gap-1 text-[11px] font-extrabold text-black bg-primary px-3 py-1.5 rounded-lg hover:scale-103 transition-transform"
                        >
                          <PlusCircle size={14} /> Add Equipment
                        </button>
                      </div>

                      <div className="overflow-x-auto border border-[#EAECF0] rounded-xl">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-[#2d2d2d] text-white uppercase tracking-wider text-[9px] font-bold">
                              <th className="p-3">Equipment Name</th>
                              <th className="p-3">Manufacturer / Model</th>
                              <th className="p-3">Serial/Asset ID</th>
                              <th className="p-3 text-center">Cal. Expiry</th>
                              <th className="p-3 text-center">Ownership</th>
                              <th className="p-3 text-center w-12">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.equipmentList.map((eq, index) => (
                              <tr key={index} className="border-b border-[#EAECF0] hover:bg-gray-50/50">
                                <td className="p-2">
                                  <input
                                    type="text"
                                    value={eq.name}
                                    placeholder="e.g. Hydro-pump"
                                    onChange={(e) => handleEquipmentChange(index, "name", e.target.value)}
                                    className="w-full bg-[#eef2f6] p-2 rounded-lg border border-transparent text-xs font-medium outline-none focus:border-primary"
                                  />
                                </td>
                                <td className="p-2">
                                  <input
                                    type="text"
                                    value={eq.manufacturer}
                                    placeholder="e.g. Olympus"
                                    onChange={(e) => handleEquipmentChange(index, "manufacturer", e.target.value)}
                                    className="w-full bg-[#eef2f6] p-2 rounded-lg border border-transparent text-xs font-medium outline-none focus:border-primary"
                                  />
                                </td>
                                <td className="p-2">
                                  <input
                                    type="text"
                                    value={eq.serialNumber}
                                    placeholder="e.g. SN-8822"
                                    onChange={(e) => handleEquipmentChange(index, "serialNumber", e.target.value)}
                                    className="w-full bg-[#eef2f6] p-2 rounded-lg border border-transparent text-xs font-medium outline-none focus:border-primary"
                                  />
                                </td>
                                <td className="p-2 text-center w-36">
                                  <input
                                    type="date"
                                    value={eq.calibrationExpiry}
                                    onChange={(e) => handleEquipmentChange(index, "calibrationExpiry", e.target.value)}
                                    className="w-full bg-[#eef2f6] p-2 rounded-lg border border-transparent text-xs font-semibold text-center outline-none focus:border-primary"
                                  />
                                </td>
                                <td className="p-2 text-center w-24">
                                  <select
                                    value={eq.ownership}
                                    onChange={(e) => handleEquipmentChange(index, "ownership", e.target.value)}
                                    className="w-full bg-[#eef2f6] p-2 rounded-lg border border-transparent text-xs font-bold text-center outline-none focus:border-primary"
                                  >
                                    <option value="Owned">Owned</option>
                                    <option value="Leased">Leased</option>
                                  </select>
                                </td>
                                <td className="p-2 text-center">
                                  <button
                                    type="button"
                                    onClick={() => removeEquipmentRow(index)}
                                    className="text-gray-400 hover:text-red-600 transition-colors p-1"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {formData.equipmentList.length === 0 && (
                          <div className="p-5 text-center text-gray-400 bg-gray-50/50">
                            No equipment records added. Click 'Add Equipment' above to register apparatus.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ──────────────────────────────────────────────────────── */}
                {/* SLIDE 5: Process Facility Form */}
                {/* ──────────────────────────────────────────────────────── */}
                {step === 5 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div>
                      <p className="text-primary font-bold mb-1.5 text-xs uppercase tracking-widest">
                        Facilities & Operational Premises
                      </p>
                      <h2 className="text-xl md:text-2xl font-black text-[#101828]">
                        5. Process Facility
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">
                        Please indicate the spatial layout area size (in m²) of your operational branches and workshops.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {[
                        { label: "Total Premises Area (m²)", name: "premisesArea" },
                        { label: "Office Area (m²)", name: "premisesOffice" },
                        { label: "Workshop/Fab (m²)", name: "premisesWorkshop" },
                        { label: "Inside Storage (m²)", name: "premisesInsideStorage" },
                        { label: "Outside Storage (m²)", name: "premisesOutsideStorage" }
                      ].map((item) => (
                        <div key={item.name} className="flex flex-col bg-[#F9FAFB] p-4 rounded-xl border border-[#EAECF0]">
                          <label className="text-[9px] font-black text-[#667085] uppercase tracking-wider mb-2 leading-relaxed">
                            {item.label}
                          </label>
                          <input
                            type="number"
                            name={item.name}
                            value={(formData as any)[item.name]}
                            onChange={handleInputChange}
                            placeholder="0"
                            className="bg-[#eef2f6] w-full p-2.5 rounded-lg border border-transparent outline-none focus:ring-2 focus:ring-primary/25 font-black text-center text-sm"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-[#344054] mb-2 uppercase tracking-wider">Number of Active Branches</label>
                        <input
                          type="number"
                          name="branchesCount"
                          value={formData.branchesCount}
                          onChange={handleInputChange}
                          className="w-full p-3.5 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold transition-all"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-[#344054] mb-2 uppercase tracking-wider">Facility Ownership Type</label>
                        <select
                          name="facilityOwnership"
                          value={formData.facilityOwnership}
                          onChange={handleInputChange}
                          className="w-full p-3.5 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm font-bold transition-all"
                        >
                          <option value="Owned">Owned (Fully Privately Owned)</option>
                          <option value="Leased">Leased / Rented Premises</option>
                        </select>
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-[#344054] mb-2 uppercase tracking-wider">Primary Workshop Location / Address</label>
                        <input
                          type="text"
                          name="workshopAddress"
                          value={formData.workshopAddress}
                          onChange={handleInputChange}
                          className="w-full p-3.5 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold transition-all"
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex gap-3 items-start text-xs text-gray-500 leading-relaxed">
                      <HelpCircle size={18} className="text-gray-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-gray-700 block mb-0.5">Evaluating Production Capabilities:</span>
                        Industrial buyers utilize spatial ratios (like storage vs. fabrication area sizes) to determine overall material batch processing capability and maximum logistical weight class.
                      </div>
                    </div>
                  </div>
                )}

                {/* ──────────────────────────────────────────────────────── */}
                {/* SLIDE 6: QHSE Information Form */}
                {/* ──────────────────────────────────────────────────────── */}
                {step === 6 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div>
                      <p className="text-primary font-bold mb-1.5 text-xs uppercase tracking-widest">
                        Quality & Incident Control
                      </p>
                      <h2 className="text-xl md:text-2xl font-black text-[#101828]">
                        6. QHSE Information
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">
                        Please update safety credentials, ISO standards compliance, and designate your QHSE contact manager.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col bg-[#F9FAFB] p-5 rounded-xl border border-[#EAECF0]">
                        <label className="text-xs font-bold text-[#344054] mb-2.5 uppercase tracking-wider">
                          Certified QHSE System / Manual active?
                        </label>
                        <div className="flex gap-4">
                          {["yes", "no"].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, hasQhseManual: opt }))}
                              className={`flex-1 py-3 text-center rounded-xl border-2 font-bold uppercase text-xs transition-all ${
                                formData.hasQhseManual === opt
                                  ? "bg-primary border-primary text-black font-extrabold"
                                  : "border-transparent bg-[#eef2f6] text-gray-500 hover:bg-gray-200"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col bg-[#F9FAFB] p-5 rounded-xl border border-[#EAECF0]">
                        <label className="text-xs font-bold text-[#344054] mb-2.5 uppercase tracking-wider">
                          Incident Recorded (LTI) in past 3 years?
                        </label>
                        <div className="flex gap-4">
                          {["yes", "no"].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, hasLtiRecord: opt }))}
                              className={`flex-1 py-3 text-center rounded-xl border-2 font-bold uppercase text-xs transition-all ${
                                formData.hasLtiRecord === opt
                                  ? "bg-primary border-primary text-black font-extrabold"
                                  : "border-transparent bg-[#eef2f6] text-gray-500 hover:bg-gray-200"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label className="text-xs font-bold text-[#344054] mb-2 uppercase tracking-wider">
                        Safety Incidents Description / LTI Performance Records
                      </label>
                      <textarea
                        name="ltiDetails"
                        value={formData.ltiDetails}
                        onChange={handleInputChange}
                        placeholder="State LTI incident rates and active mitigation procedures"
                        className="w-full p-3.5 bg-[#eef2f6] text-[#101828] border border-transparent rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-xs font-medium resize-none h-20"
                      />
                    </div>

                    {/* Standardized Certifications checklist */}
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-[#344054] uppercase tracking-wider block">
                        ISO / API Accreditations Checklist
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { key: "iso9001Certified", expiryKey: "iso9001Expiry", label: "ISO 9001 (Quality)" },
                          { key: "iso14001Certified", expiryKey: "iso14001Expiry", label: "ISO 14001 (Environment)" },
                          { key: "iso45001Certified", expiryKey: "iso45001Expiry", label: "ISO 45001 (Health & Safety)" }
                        ].map((cert) => (
                          <div key={cert.key} className="p-4 rounded-xl border border-[#EAECF0] bg-white flex flex-col justify-between gap-3 shadow-sm">
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                id={cert.key}
                                name={cert.key}
                                checked={(formData as any)[cert.key]}
                                onChange={handleInputChange}
                                className="h-4 w-4 rounded accent-primary cursor-pointer"
                              />
                              <label htmlFor={cert.key} className="text-xs font-bold text-[#344054] cursor-pointer">
                                {cert.label}
                              </label>
                            </div>
                            {(formData as any)[cert.key] && (
                              <div className="flex flex-col">
                                <span className="text-[9px] text-[#667085] uppercase mb-1">Expiry Date</span>
                                <input
                                  type="date"
                                  name={cert.expiryKey}
                                  value={(formData as any)[cert.expiryKey]}
                                  onChange={handleInputChange}
                                  className="p-2 bg-[#eef2f6] rounded-lg border-transparent text-[11px] font-semibold text-center outline-none"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Responsible QHSE manager details */}
                    <div className="border-t border-[#EAECF0] pt-4">
                      <p className="text-xs font-bold text-black uppercase tracking-wider mb-3">Designated Safety (QHSE) Contact</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col">
                          <label className="text-[10px] text-[#667085] mb-1.5 uppercase font-bold">Contact Name</label>
                          <input
                            type="text"
                            name="qhseManagerName"
                            value={formData.qhseManagerName}
                            onChange={handleInputChange}
                            placeholder="Full name"
                            className="p-3 bg-[#eef2f6] text-xs font-semibold rounded-xl outline-none"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[10px] text-[#667085] mb-1.5 uppercase font-bold">Tel Number</label>
                          <input
                            type="text"
                            name="qhseManagerTel"
                            value={formData.qhseManagerTel}
                            onChange={handleInputChange}
                            placeholder="+9665..."
                            className="p-3 bg-[#eef2f6] text-xs font-semibold rounded-xl outline-none"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[10px] text-[#667085] mb-1.5 uppercase font-bold">Contact Email</label>
                          <input
                            type="email"
                            name="qhseManagerEmail"
                            value={formData.qhseManagerEmail}
                            onChange={handleInputChange}
                            placeholder="qhse@..."
                            className="p-3 bg-[#eef2f6] text-xs font-semibold rounded-xl outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ──────────────────────────────────────────────────────── */}
                {/* SLIDE 7: Documentation Uploads & Final Submit */}
                {/* ──────────────────────────────────────────────────────── */}
                {step === 7 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div>
                      <p className="text-primary font-bold mb-1.5 text-xs uppercase tracking-widest">
                        Certificate Verification Drops
                      </p>
                      <h2 className="text-xl md:text-2xl font-black text-[#101828]">
                        7. Documentation & Final Submission
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">
                        Please upload valid PDF copies of certificates and confirm compliance declarations.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2 no-scrollbar border-b border-[#EAECF0] pb-6">
                      {[
                        { id: "crFile", label: "Commercial Registration (CR) Certificate *" },
                        { id: "zakat", label: "Zakat & Income Tax Certificate *" },
                        { id: "gosi", label: "GOSI Compliance Certificate *" },
                        { id: "saudization", label: "Saudization National Certificate *" },
                        { id: "vat", label: "VAT Registration Certificate *" },
                        { id: "qhsePolicy", label: "QHSE Policy / Manual Certifications" },
                        { id: "materialsList", label: "Detailed Product/Material Catalogues" }
                      ].map((doc) => (
                        <div key={doc.id} className="flex flex-col bg-[#eef2f6] p-4 rounded-xl border border-[#EAECF0] justify-between gap-3">
                          <span className="text-[11px] font-black text-[#101828] leading-tight">{doc.label}</span>
                          
                          {uploadedFiles[doc.id] ? (
                            <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-200">
                              <div className="flex items-center gap-2 min-w-0">
                                <Paperclip size={13} className="text-primary shrink-0" />
                                <span className="text-xs text-gray-700 truncate font-semibold">{uploadedFiles[doc.id].name}</span>
                              </div>
                              <button 
                                type="button" 
                                onClick={() => removeUploadedFile(doc.id)} 
                                className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ) : (
                            <div className="relative border border-dashed border-gray-300 rounded-lg py-3 text-center bg-white hover:border-primary transition-all">
                              <UploadCloud size={18} className="mx-auto text-gray-400 mb-1" />
                              <span className="text-[10px] text-gray-600 block">
                                Drag & drop or <span className="text-primary underline cursor-pointer font-bold">Upload</span>
                              </span>
                              <input 
                                type="file" 
                                className="absolute inset-0 opacity-0 cursor-pointer" 
                                onChange={(e) => handleFileChange(e, doc.id)} 
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#F9FAFB] p-5 rounded-xl border border-[#EAECF0] space-y-5">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#344054] block">How did you hear about us? *</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {referralOptions.map((refOpt) => (
                            <button
                              key={refOpt}
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, referralSource: refOpt }))}
                              className={`py-2 px-3 rounded-lg border-2 transition-all font-bold text-xs uppercase ${
                                formData.referralSource === refOpt
                                  ? "border-primary bg-primary text-black font-extrabold"
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
                          className="mt-0.5 h-4 w-4 accent-primary cursor-pointer shrink-0"
                        />
                        <label htmlFor="termsCheckbox" className="text-[11px] text-[#344054] font-semibold leading-relaxed cursor-pointer select-none">
                          I hereby verify and declare under penalty of perjury that all provided corporate records, personnel lists, test equipment logs, and documentation certificates are true, valid, and authentic in their entirety.
                        </label>
                      </div>
                      {errors.agreedToTerms && <p className="text-red-500 text-xs font-semibold">{errors.agreedToTerms}</p>}
                    </div>
                  </div>
                )}

                {/* ──────────────────────────────────────────────────────── */}
                {/* Stepper Footer Action Buttons */}
                {/* ──────────────────────────────────────────────────────── */}
                <div className="flex items-center justify-between border-t border-[#EAECF0] pt-6 mt-6 shrink-0">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="h-12 px-6 bg-[#eef2f6] text-[#344054] font-black rounded-xl hover:bg-gray-200 transition-all text-xs"
                    >
                      Previous Stage
                    </button>
                  ) : (
                    <Link
                      href="/supplier"
                      className="h-12 px-6 bg-[#eef2f6] text-gray-500 font-black rounded-xl hover:bg-gray-200 transition-all text-xs flex items-center justify-center"
                    >
                      Exit Wizard
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
                        Submit Qualification
                      </Button>
                    )}
                  </div>
                </div>

              </form>

            </div>
          </div>
        </main>
      </div>

      {/* Save Success Alert Modal popup */}
      {saved && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center animate-in zoom-in-95 duration-200 border border-[#EAECF0]">
            <div className="w-16 h-16 bg-green-50 border-4 border-green-100 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
              <Check className="text-green-600" size={28} strokeWidth={3} />
            </div>
            <h3 className="text-xl font-bold text-[#101828] mb-2">Application Records Updated!</h3>
            <p className="text-sm text-[#667085] leading-relaxed mb-6">
              Your supplier profile draft and dynamic calibration tables have been compiled successfully.
            </p>
            <div className="bg-primary/10 text-primary-dark p-3 rounded-lg border border-primary/20 text-xs font-bold">
              Redirecting back to dashboard panels...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
