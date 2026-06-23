"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { Paperclip } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const steps = [
  "Company Info",
  "User Info",
  "Contact Details",
  "Extra Doc",
  "Documentation",
  "Final Step",
];

const referralOptions = ["Social media", "google search", "Clients", "Marketer"];

export default function ClientProfilePage() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: user?.email || "Gmail@gmail.com",
    password: "",
    confirmPassword: "",
    companyName: "",
    location: "",
    branch: "",
    crNumber: "",
    companyRegistration: "",

    // Step 2
    serviceScope: ["Services"] as string[],
    categoryClassification: ["Pipe line calssification"] as string[],
    otherCategoryClassification: "",
    establishedWhen: "",
    establishedWhere: "",
    assessmentName: "",
    assessmentPosition: "",
    website: "",
    premisesArea: "",
    premisesOffice: "",
    premisesInsideStorage: "",
    premisesOutsideStorage: "",

    // Step 3
    directorsSection: { name: "", tel: "", email: "" },
    financialSection: { name: "", tel: "", email: "" },
    technicalSection: { name: "", tel: "", email: "" },
    afterHoursSection: { name: "", tel: "", email: "" },
    qhseSection: { name: "", tel: "", email: "" },
    commercialSection: { name: "", tel: "", email: "" },

    // Step 4
    insuranceText: "",
    accreditationText: "",
    financialCapabilityText: "",
    majorClientsText: "",

    // Step 6
    referralSource: "Marketer",
    marketerCode: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | null>>({});
  const [companyPhoto, setCompanyPhoto] = useState<File | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedInput = (section: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...(prev as any)[section], [field]: value },
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0] || null;
    if (key === "companyPhoto") {
      setCompanyPhoto(file);
    } else {
      setUploadedFiles((prev) => ({ ...prev, [key]: file }));
    }
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, steps.length));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      setUser({ ...user });
    }
    alert("Profile updated successfully!");
  };

  // Shared input style
  const inp = "w-full px-4 py-3.5 bg-[#F0F2F5] rounded-xl text-[14px] text-[#333] placeholder:text-[#9CA3AF] outline-none focus:ring-2 focus:ring-primary/30 transition-all border border-transparent focus:border-primary/20";

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F6FA]">
      <Navbar />

      <div className="flex-1 flex max-w-[1100px] w-full mx-auto px-4 py-10 gap-0 items-start">

        {/* Left Sidebar */}
        <div className="w-[230px] shrink-0 bg-[#2B2B2B] rounded-2xl rounded-r-none pt-8 pb-10 px-6 self-stretch flex flex-col">
          <h2 className="text-white font-black text-2xl mb-8">Profile</h2>
          <div className="flex flex-col gap-0 relative">
            {/* Vertical line */}
            <div className="absolute left-[11px] top-6 bottom-6 w-[2px] bg-[#444]" />

            {steps.map((s, i) => {
              const isActive = i + 1 === step;
              const isCompleted = step > i + 1;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStep(i + 1)}
                  className="flex items-center gap-3 py-3 text-left z-10 group"
                >
                  {/* Dot */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                      isActive || isCompleted
                        ? "border-primary bg-primary"
                        : "border-[#555] bg-[#2B2B2B]"
                    }`}
                  >
                    {(isActive || isCompleted) && (
                      <div className="w-2 h-2 rounded-full bg-[#2B2B2B]" />
                    )}
                  </div>
                  <span
                    className={`text-[13px] font-semibold transition-colors ${
                      isActive ? "text-white" : "text-[#888] group-hover:text-white"
                    }`}
                  >
                    {s}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Form Card */}
        <div className="flex-1 bg-white rounded-2xl rounded-l-none shadow-lg min-h-[600px] flex flex-col">
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-8 md:p-10">

            {/* ─── STEP 1: Company Info ─── */}
            {step === 1 && (
              <div className="flex-1 flex flex-col gap-6">
                <h2 className="text-primary font-bold text-xl">Company Info</h2>

                <div className="grid grid-cols-2 gap-4">
                  <input name="email" value={formData.email} onChange={handleInput} placeholder="Gamil@gmail.com" className={inp} />
                  <input name="password" type="password" value={formData.password} onChange={handleInput} placeholder="Password" className={inp} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInput} placeholder="re_write password" className={inp} />
                  <input name="companyName" value={formData.companyName} onChange={handleInput} placeholder="Company name" className={inp} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input name="location" value={formData.location} onChange={handleInput} placeholder="Location of the company" className={inp} />
                  <input name="branch" value={formData.branch} onChange={handleInput} placeholder="Branch" className={inp} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input name="crNumber" value={formData.crNumber} onChange={handleInput} placeholder="Registration number" className={inp} />
                  <input name="companyRegistration" value={formData.companyRegistration} onChange={handleInput} placeholder="Company registertion" className={inp} />
                </div>

                <div>
                  <p className="font-semibold text-[#333] text-[15px] mb-3">Upload a company photo?</p>
                  <label className="flex items-center gap-4 w-full bg-[#F0F2F5] rounded-xl border border-dashed border-[#CCC] px-6 py-5 cursor-pointer hover:border-primary transition-all">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 16V8M12 8L9 11M12 8L15 11" stroke="#B8860B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="3" y="3" width="18" height="18" rx="3" stroke="#B8860B" strokeWidth="1.5"/></svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-[14px] font-semibold text-[#333]">
                        Drag & drop files or{" "}
                        <span className="text-primary underline">upload file</span>
                      </p>
                      <p className="text-[11px] text-[#9CA3AF] mt-0.5">
                        Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
                      </p>
                      {companyPhoto && (
                        <p className="text-xs text-primary font-semibold mt-1">{companyPhoto.name}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      className="bg-primary text-black font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-all shrink-0"
                    >
                      Upload
                    </button>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, "companyPhoto")} />
                  </label>
                </div>

                <div className="mt-auto flex justify-end pt-4 border-t border-[#F0F2F5]">
                  <button type="button" onClick={handleNext} className="bg-primary text-black font-bold px-10 py-3.5 rounded-xl text-[15px] hover:bg-primary/90 transition-all">
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* ─── STEP 2: User Info ─── */}
            {step === 2 && (
              <div className="flex-1 flex flex-col gap-6">
                <h2 className="text-primary font-bold text-xl">User info</h2>

                <div>
                  <p className="text-[15px] font-semibold text-[#333] mb-3">company scope of services</p>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { id: "Services", label: "Services", img: "/Services.png" },
                      { id: "Rental", label: "Rental", img: "/for-rent.png" },
                      { id: "Manpower", label: "Man power", img: "/power.png" },
                      { id: "Products", label: "Products", img: "/product.png" },
                    ].map((scope) => {
                      const isSelected = (formData.serviceScope as string[]).includes(scope.id);
                      return (
                      <button
                        key={scope.id}
                        type="button"
                        onClick={() => setFormData((p) => {
                          const current = p.serviceScope as string[];
                          const updated = current.includes(scope.id)
                            ? current.filter((x) => x !== scope.id)
                            : [...current, scope.id];
                          return { ...p, serviceScope: updated };
                        })}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 font-semibold text-[13px] transition-all ${
                          isSelected
                            ? "border-primary bg-primary text-black"
                            : "border-transparent bg-[#F0F2F5] text-[#555] hover:bg-[#E8EAF0]"
                        }`}
                      >
                        <img src={scope.img} alt={scope.label} className="w-5 h-5 object-contain" />
                        {scope.label}
                      </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-[15px] font-semibold text-[#333] mb-3">company category classification</p>
                  <div className="flex flex-wrap gap-4 mb-3">
                    {[
                      "Pipe line calssification",
                      "Industrial classification",
                      "Electrical classification",
                      "Other",
                    ].map((opt) => {
                      const isSelected = formData.categoryClassification.includes(opt);
                      return (
                        <label
                          key={opt}
                          className="flex items-center gap-2 cursor-pointer bg-[#F0F2F5] px-4 py-2.5 rounded-xl hover:bg-[#E8EAF0] transition-all"
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {
                              setFormData((prev) => {
                                const list = prev.categoryClassification.includes(opt)
                                  ? prev.categoryClassification.filter((x) => x !== opt)
                                  : [...prev.categoryClassification, opt];
                                return {
                                  ...prev,
                                  categoryClassification: list,
                                };
                              });
                            }}
                            className="w-4 h-4 accent-primary"
                          />
                          <span className="text-[13px] font-medium text-[#333]">{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                  {formData.categoryClassification.includes("Other") && (
                    <input
                      name="otherCategoryClassification"
                      value={formData.otherCategoryClassification}
                      onChange={handleInput}
                      placeholder="Please specify other classification"
                      className={inp}
                    />
                  )}
                </div>

                <div>
                  <p className="text-[13px] font-bold text-primary mb-2">Company Background</p>
                  <div className="grid grid-cols-2 gap-4">
                    <input name="establishedWhen" value={formData.establishedWhen} onChange={handleInput} placeholder="When" className={inp} />
                    <input name="establishedWhere" value={formData.establishedWhere} onChange={handleInput} placeholder="Where" className={inp} />
                  </div>
                </div>

                <div>
                  <p className="text-[13px] font-bold text-primary mb-2">Person Completing the initial Assessment submission</p>
                  <div className="grid grid-cols-2 gap-4">
                    <input name="assessmentName" value={formData.assessmentName} onChange={handleInput} placeholder="Name" className={inp} />
                    <input name="assessmentPosition" value={formData.assessmentPosition} onChange={handleInput} placeholder="Position" className={inp} />
                  </div>
                </div>

                <div>
                  <p className="text-[13px] font-bold text-primary mb-2">Company Registration Details</p>
                  <input name="website" value={formData.website} onChange={handleInput} placeholder="Website" className={inp} />
                </div>

                <div>
                  <p className="text-[13px] font-bold text-primary mb-2">Premises area</p>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { name: "premisesArea", placeholder: "Area m/ft" },
                      { name: "premisesOffice", placeholder: "Office m" },
                      { name: "premisesInsideStorage", placeholder: "Inside Storage" },
                      { name: "premisesOutsideStorage", placeholder: "Outside Storage" },
                    ].map((f, idx) => (
                      <input
                        key={f.name}
                        name={f.name}
                        value={(formData as any)[f.name]}
                        onChange={handleInput}
                        placeholder={f.placeholder}
                        className={`${inp} ${idx === 0 ? "bg-primary placeholder:text-black text-black font-bold" : ""}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex justify-between items-center pt-4 border-t border-[#F0F2F5]">
                  <button type="button" onClick={handleBack} className="px-8 py-3.5 rounded-xl border-2 border-[#DDD] text-[#444] font-bold text-[15px] hover:bg-[#F5F5F5] transition-all">
                    Back
                  </button>
                  <button type="button" onClick={handleNext} className="bg-primary text-black font-bold px-10 py-3.5 rounded-xl text-[15px] hover:bg-primary/90 transition-all">
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* ─── STEP 3: Contact Details ─── */}
            {step === 3 && (
              <div className="flex-1 flex flex-col gap-5">
                <h2 className="text-primary font-bold text-xl">Contact Details</h2>

                {[
                  { id: "directorsSection", label: "Company directors" },
                  { id: "financialSection", label: "Financial contact" },
                  { id: "technicalSection", label: "Technical contact" },
                  { id: "afterHoursSection", label: "After office hours" },
                  { id: "qhseSection", label: "QHSE Contact" },
                  { id: "commercialSection", label: "Commercial Contact" },
                ].map((sec) => (
                  <div key={sec.id}>
                    <p className="text-[13px] font-bold text-primary mb-2">{sec.label}</p>
                    <div className="grid grid-cols-3 gap-4">
                      <input
                        placeholder="name"
                        value={(formData as any)[sec.id].name}
                        onChange={(e) => handleNestedInput(sec.id, "name", e.target.value)}
                        className={inp}
                      />
                      <input
                        placeholder="Tele"
                        value={(formData as any)[sec.id].tel}
                        onChange={(e) => handleNestedInput(sec.id, "tel", e.target.value)}
                        className={inp}
                      />
                      <input
                        placeholder="Email"
                        value={(formData as any)[sec.id].email}
                        onChange={(e) => handleNestedInput(sec.id, "email", e.target.value)}
                        className={inp}
                      />
                    </div>
                  </div>
                ))}

                <div className="mt-auto flex justify-between items-center pt-4 border-t border-[#F0F2F5]">
                  <button type="button" onClick={handleBack} className="px-8 py-3.5 rounded-xl border-2 border-[#DDD] text-[#444] font-bold text-[15px] hover:bg-[#F5F5F5] transition-all">
                    Back
                  </button>
                  <button type="button" onClick={handleNext} className="bg-primary text-black font-bold px-10 py-3.5 rounded-xl text-[15px] hover:bg-primary/90 transition-all">
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* ─── STEP 4: Extra Doc ─── */}
            {step === 4 && (
              <div className="flex-1 flex flex-col gap-6">
                <h2 className="text-primary font-bold text-xl">Extra Doc</h2>

                {[
                  {
                    name: "insuranceText",
                    title: "Insurance",
                    subtitle: "What type of insurance do you have? write the insurances details below.",
                    value: formData.insuranceText,
                  },
                  {
                    name: "accreditationText",
                    title: "Company accreditation",
                    subtitle: "What kind of quality standard do you manage your company and QA facilities to? (i.e. ISO, API, LEEA, GMP, Food, Dietary Supplement, etc...):",
                    value: formData.accreditationText,
                  },
                  {
                    name: "financialCapabilityText",
                    title: "Financial Capapility",
                    subtitle: "Do you have a financial audit report or bank guarantee?",
                    value: formData.financialCapabilityText,
                  },
                  {
                    name: "majorClientsText",
                    title: "List of majors client",
                    subtitle: "List of major clients & vender registration number:",
                    value: formData.majorClientsText,
                  },
                ].map((item) => (
                  <div key={item.name}>
                    <p className="text-[14px] font-bold text-primary">{item.title}</p>
                    <p className="text-[12px] text-primary/80 mb-2">{item.subtitle}</p>
                    <textarea
                      name={item.name}
                      value={item.value}
                      onChange={handleInput}
                      rows={4}
                      className={`${inp} resize-none`}
                    />
                  </div>
                ))}

                <div className="mt-auto flex justify-between items-center pt-4 border-t border-[#F0F2F5]">
                  <button type="button" onClick={handleBack} className="px-8 py-3.5 rounded-xl border-2 border-[#DDD] text-[#444] font-bold text-[15px] hover:bg-[#F5F5F5] transition-all">
                    Back
                  </button>
                  <button type="button" onClick={handleNext} className="bg-primary text-black font-bold px-10 py-3.5 rounded-xl text-[15px] hover:bg-primary/90 transition-all">
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* ─── STEP 5: Documentation ─── */}
            {step === 5 && (
              <div className="flex-1 flex flex-col gap-4">
                <div>
                  <h2 className="text-primary font-bold text-xl">Documentation & Attachments</h2>
                  <p className="text-primary font-semibold text-[13px] mt-1">Please prepare these documents and make them ready at the time of the visit:</p>
                  <div className="border-b border-[#DDD] mt-3 mb-2" />
                </div>

                {[
                  { id: "zakat", label: "1 - Zakat Certificate" },
                  { id: "gosi", label: "2 - Social Insurance (GOSI) Certificate" },
                  { id: "saudization", label: "3 - Ministry of Labor to adherence official saudization (Except new manufacturer)" },
                  { id: "industrial", label: "4 - Industrial License (for manufacturer only)" },
                  { id: "vat", label: "5 - VAT Certificate" },
                  { id: "materialsList", label: "6 - List of materials/products your company is handling" },
                  { id: "authorizedPersons", label: "7 - List of authorized persons, contacts (phones, e-mails), and owners contact details endorsed by Chamber of Commerce" },
                  { id: "auditedStatement", label: "8 - Latest Audited Financial Statement from authorized office (Except new establishment)" },
                  { id: "previousPOs", label: "9 - Previous P.Os from other companies or agency/representation letter (Except new manufacturer)" },
                ].map((doc) => (
                  <div key={doc.id}>
                    <p className="text-[13px] font-semibold text-[#333] mb-1.5">{doc.label}</p>
                    <label className="flex items-center gap-3 bg-[#F0F2F5] rounded-xl px-4 py-3 cursor-pointer hover:bg-[#E8EAF0] transition-all border border-transparent hover:border-primary/20">
                      <Paperclip size={16} className="text-[#888] shrink-0" />
                      <span className="text-[13px] text-[#777] flex-1">
                        {uploadedFiles[doc.id]
                          ? <span className="text-primary font-semibold">{uploadedFiles[doc.id]!.name}</span>
                          : <>
                              Drag & drop files or{" "}
                              <span className="text-primary underline font-semibold">upload file</span>
                              {"  "}
                              <span className="text-[11px] text-[#AAA]">Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT</span>
                            </>
                        }
                      </span>
                      <input type="file" className="hidden" onChange={(e) => handleFileChange(e, doc.id)} />
                    </label>
                  </div>
                ))}

                <div className="mt-auto flex justify-between items-center pt-4 border-t border-[#F0F2F5]">
                  <button type="button" onClick={handleBack} className="px-8 py-3.5 rounded-xl border-2 border-[#DDD] text-[#444] font-bold text-[15px] hover:bg-[#F5F5F5] transition-all">
                    Back
                  </button>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={handleNext} className="bg-primary text-black font-bold px-8 py-3.5 rounded-xl text-[15px] hover:bg-primary/90 transition-all">
                      Save and continue
                    </button>
                    <button type="button" className="bg-primary/80 text-black font-bold px-8 py-3.5 rounded-xl text-[15px] hover:bg-primary/90 transition-all">
                      Save as draft
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 6: Final Step ─── */}
            {step === 6 && (
              <div className="flex-1 flex flex-col gap-6">
                <h2 className="text-primary font-bold text-xl">Final step</h2>

                <div>
                  <p className="text-[14px] font-semibold text-primary mb-3">How you know us?</p>
                  <div className="flex flex-wrap gap-3">
                    {referralOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, referralSource: opt }))}
                        className={`px-6 py-3 rounded-xl border-2 font-semibold text-[14px] transition-all ${
                          formData.referralSource === opt
                            ? "border-primary bg-primary text-black"
                            : "border-[#DDD] bg-white text-[#444] hover:border-primary/30"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {formData.referralSource === "Marketer" && (
                  <input
                    name="marketerCode"
                    value={formData.marketerCode}
                    onChange={handleInput}
                    placeholder="Marketer code"
                    className={inp}
                  />
                )}

                <div className="mt-auto flex justify-between items-center pt-4 border-t border-[#F0F2F5]">
                  <button type="button" onClick={handleBack} className="px-8 py-3.5 rounded-xl border-2 border-[#DDD] text-[#444] font-bold text-[15px] hover:bg-[#F5F5F5] transition-all">
                    Back
                  </button>
                  <button type="submit" className="bg-primary text-black font-bold px-10 py-3.5 rounded-xl text-[15px] hover:bg-primary/90 transition-all">
                    Update
                  </button>
                </div>
              </div>
            )}

          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
