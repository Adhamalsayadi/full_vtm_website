"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Paperclip, Check } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const steps = [
  "Application info",
  "General info",
  "Equipment Verification",
  "Personnel and Manpower",
  "QHSE",
  "Documentation",
  "Manufacturing Evaluation",
];

// Reusable YES / NO / NOT APPLICABLE radio row
function YesNoRow({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, val: string) => void;
}) {
  return (
    <div className="mb-4">
      <p className="text-[13px] font-semibold text-primary mb-2">{label}</p>
      <div className="flex items-center gap-6">
        {["YES", "NO", "NOT APPLICABLE"].map((opt) => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(name, opt)}
              className="w-4 h-4 accent-primary"
            />
            <span className="text-[13px] font-medium text-[#333]">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

// Reusable file upload row
function FileUploadRow({ label, fileKey, uploadedFiles, onFileChange }: {
  label: string;
  fileKey: string;
  uploadedFiles: Record<string, File | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>, key: string) => void;
}) {
  return (
    <div className="mb-4">
      <p className="text-[13px] font-semibold text-primary mb-1.5">{label}</p>
      <label className="flex items-center gap-3 bg-[#F0F2F5] rounded-xl px-4 py-3 cursor-pointer hover:bg-[#E8EAF0] transition-all border border-transparent hover:border-primary/20">
        <Paperclip size={16} className="text-[#888] shrink-0" />
        <span className="text-[13px] text-[#777] flex-1">
          {uploadedFiles[fileKey]
            ? <span className="text-primary font-semibold">{uploadedFiles[fileKey]!.name}</span>
            : <>Drag & drop files or <span className="text-primary underline font-semibold">upload file</span>{"  "}<span className="text-[11px] text-[#AAA]">Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT</span></>
          }
        </span>
        <input type="file" className="hidden" onChange={(e) => onFileChange(e, fileKey)} />
      </label>
    </div>
  );
}

export default function SupplierProfilePage() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [step, setStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | null>>({});

  // All form data
  const [form, setForm] = useState({
    // Step 1 - Application info
    email: user?.email || "Gmail@gmail.com",
    password: "",
    confirmPassword: "",
    companyName: "",
    location: "",
    branch: "",
    registrationNumber: "",
    companyRegistration: "",
    profileNo: "",
    country: "",
    serviceScope: "Services",
    categoryClassification: "Pipe line calssification",
    website: "",
    assessmentName: "",
    assessmentPosition: "",

    // Step 2 - General info
    establishedWhen: "",
    establishedWhere: "",
    premisesArea: "",
    premisesOffice: "",
    premisesInsideStorage: "",
    premisesOutsideStorage: "",
    directorsName: "", directorsTel: "", directorsEmail: "",
    financialName: "", financialTel: "", financialEmail: "",
    technicalName: "", technicalTel: "", technicalEmail: "",
    afterHoursName: "", afterHoursTel: "", afterHoursEmail: "",
    qhseName: "", qhseTel: "", qhseEmail: "",
    commercialName: "", commercialTel: "", commercialEmail: "",
    insuranceText: "",
    accreditationText: "",
    financialCapabilityText: "",
    majorClientsText: "",

    // Step 3 - Equipment Verification
    eq1: "YES", eq2: "YES", eq3: "YES", eq4: "YES", eq5: "YES",

    // Step 4 - Personnel and Manpower
    pm1: "YES", pm2: "YES", pm3: "YES", pm4: "YES", pm5: "YES", pm6: "YES",
    pm7: "YES", pm8: "YES", pm10: "YES",
    trainingType: "In-house Training",
    pm11: "YES", pm13: "YES", pm15: "YES",

    // Step 5 - QHSE (26 questions + Health & Safety 11 questions)
    q1: "YES", q2: "YES", q3: "YES", q4: "YES", q5: "YES", q6: "YES",
    q7: "YES", q8: "YES", q9: "YES", q10: "YES", q11: "YES", q12: "YES",
    q13: "YES", q14: "YES", q15: "YES", q16: "YES", q17: "YES", q18: "YES",
    q19: "YES", q20: "YES", q21: "YES", q22: "YES", q23: "YES", q24: "YES",
    q25: "YES", q26: "YES",
    q1Detail: "", q1No: "",
    q2Detail: "",
    q3Detail: "",
    hs27: "YES", hs28: "YES", hs29: "YES", hs30: "YES", hs31: "YES",
    hs32: "YES", hs33: "YES", hs34: "YES", hs35: "YES", hs36: "YES",
    fireCheckFreq: "Once a month",

    // Step 7 - Manufacturing / Process Facility
    mf1: "YES", mf2: "YES", mf4: "YES", mf6: "YES", mf7: "YES", mf8: "YES",
    mf9: "YES", mf11: "YES", mf12: "YES", mf13: "YES",
    mf2aText: "", mf3aText: "", mf4Text: "", mf5Text: "", mf6Text: "", mf7Text: "",
    mf8Text: "", mf9Text: "", mf10Text: "", mf11Text: "", mf12Text: "",
    mf13Text: "", mf14Text: "", mf15Text: "", mf16Text: "", mf17Text: "",
    mf18Text: "", mf19Text: "", mf20Text: "", mf21Text: "",
    mf19HasAdv: "YES",
    mf21HasMajor: "YES",
    mf22Text: "", mf23Text: "", mf24Text: "", mf25Text: "", mf26HasSys: "YES",
    mf27HasERP: "YES",
  });

  const setRadio = (name: string, val: string) => {
    setForm((p) => ({ ...p, [name]: val }));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0] || null;
    setUploadedFiles((p) => ({ ...p, [key]: file }));
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, steps.length));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  // Shared styles
  const inp = "w-full px-4 py-3.5 bg-[#F0F2F5] rounded-xl text-[14px] text-[#333] placeholder:text-[#9CA3AF] outline-none focus:ring-2 focus:ring-primary/30 transition-all border border-transparent";
  const sectionTitle = "text-[13px] font-bold text-primary mb-2";

  // FooterBtns is inlined per step to avoid stale closure issues

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F6FA]">
      <Navbar />

      <div className="flex-1 flex max-w-[1150px] w-full mx-auto px-4 py-10 gap-0 items-start">

        {/* ── Left Sidebar ── */}
        <div className="w-[230px] shrink-0 bg-[#2B2B2B] rounded-2xl rounded-r-none pt-8 pb-10 px-6 self-stretch flex flex-col">
          <h2 className="text-white font-black text-2xl mb-8">Profile</h2>
          <div className="flex flex-col gap-0 relative">
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
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    isCompleted ? "border-primary bg-primary" : isActive ? "border-primary bg-primary" : "border-[#555] bg-[#2B2B2B]"
                  }`}>
                    {isCompleted
                      ? <Check size={12} strokeWidth={3} className="text-[#2B2B2B]" />
                      : isActive
                      ? <div className="w-2 h-2 rounded-full bg-[#2B2B2B]" />
                      : null
                    }
                  </div>
                  <span className={`text-[12px] font-semibold transition-colors leading-snug ${isActive ? "text-white" : "text-[#888] group-hover:text-white"}`}>
                    {s}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Right Form Card ── */}
        <div className="flex-1 bg-white rounded-2xl rounded-l-none shadow-lg flex flex-col">
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-8 md:p-10">

            {/* ─── STEP 1: Application Info ─── */}
            {step === 1 && (
              <div className="flex-1 flex flex-col gap-5">
                <h2 className="text-primary font-bold text-xl">Application info</h2>

                <p className={sectionTitle}>1 – Company information</p>
                <div className="grid grid-cols-2 gap-4">
                  <input name="email" value={form.email} onChange={handleInput} placeholder="Gamil@gmail.com" className={inp} />
                  <input name="password" type="password" value={form.password} onChange={handleInput} placeholder="Password" className={inp} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleInput} placeholder="re_write password" className={inp} />
                  <input name="companyName" value={form.companyName} onChange={handleInput} placeholder="Company name" className={inp} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input name="location" value={form.location} onChange={handleInput} placeholder="Location of the company" className={inp} />
                  <input name="branch" value={form.branch} onChange={handleInput} placeholder="Branch" className={inp} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input name="registrationNumber" value={form.registrationNumber} onChange={handleInput} placeholder="Registration number" className={inp} />
                  <input name="companyRegistration" value={form.companyRegistration} onChange={handleInput} placeholder="Company registertion" className={inp} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input name="profileNo" value={form.profileNo} onChange={handleInput} placeholder="Profile No" className={inp} />
                  <input name="country" value={form.country} onChange={handleInput} placeholder="Country" className={inp} />
                </div>

                <p className={sectionTitle}>2 – Upload a company photo</p>
                <FileUploadRow label="" fileKey="companyPhoto" uploadedFiles={uploadedFiles} onFileChange={handleFileChange} />

                <p className={sectionTitle}>3 – company scope of services</p>
                <div className="flex gap-3 flex-wrap">
                  {[
                    { id: "Services", label: "Services", img: "/Services.png" },
                    { id: "Rental", label: "Rental", img: "/for-rent.png" },
                    { id: "Manpower", label: "Man power", img: "/power.png" },
                    { id: "Products", label: "Products", img: "/product.png" },
                  ].map((scope) => (
                    <button key={scope.id} type="button"
                      onClick={() => setForm((p) => ({ ...p, serviceScope: scope.id }))}
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 font-semibold text-[13px] transition-all ${
                        form.serviceScope === scope.id ? "border-primary bg-primary text-black" : "border-transparent bg-[#F0F2F5] text-[#555] hover:bg-[#E8EAF0]"
                      }`}
                    >
                      <img src={scope.img} alt={scope.label} className="w-5 h-5 object-contain" />
                      {scope.label}
                    </button>
                  ))}
                </div>

                <p className={sectionTitle}>4 – company category classification</p>
                <div className="relative">
                  <select name="categoryClassification" value={form.categoryClassification} onChange={handleInput} className={`${inp} appearance-none pr-10`}>
                    <option>Pipe line calssification</option>
                    <option>Industrial classification</option>
                    <option>Electrical classification</option>
                  </select>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9L12 15L18 9" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>

                <p className={sectionTitle}>5 – Company Registration Details</p>
                <input name="website" value={form.website} onChange={handleInput} placeholder="Website" className={inp} />

                <p className={sectionTitle}>6 – Person Completing the initial Assessment submission</p>
                <div className="grid grid-cols-2 gap-4">
                  <input name="assessmentName" value={form.assessmentName} onChange={handleInput} placeholder="Name" className={inp} />
                  <input name="assessmentPosition" value={form.assessmentPosition} onChange={handleInput} placeholder="Position" className={inp} />
                </div>

                <div className="mt-auto pt-6 border-t border-[#F0F2F5] flex items-center justify-between">
                  <button type="button" className="px-8 py-3.5 rounded-xl border-2 border-[#DDD] text-[#444] font-bold text-[15px] hover:bg-[#F5F5F5] transition-all">
                    Back
                  </button>
                  <div className="flex gap-3">
                    <button type="button" onClick={handleNext} className="bg-primary text-black font-bold px-8 py-3.5 rounded-xl text-[15px] hover:bg-primary/90 transition-all">
                      Save and continue
                    </button>
                    <button type="button" className="bg-primary/80 text-black font-bold px-8 py-3.5 rounded-xl text-[15px] hover:bg-primary transition-all">
                      Save as draft
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 2: General Info ─── */}
            {step === 2 && (
              <div className="flex-1 flex flex-col gap-5">
                <h2 className="text-primary font-bold text-xl">General info</h2>

                <p className={sectionTitle}>1 – Company Background</p>
                <div className="grid grid-cols-2 gap-4">
                  <input name="establishedWhen" value={form.establishedWhen} onChange={handleInput} placeholder="When" className={inp} />
                  <input name="establishedWhere" value={form.establishedWhere} onChange={handleInput} placeholder="Where" className={inp} />
                </div>

                <p className={sectionTitle}>2 – Premises area</p>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { name: "premisesArea", ph: "Area m/ft" },
                    { name: "premisesOffice", ph: "Office m" },
                    { name: "premisesInsideStorage", ph: "Inside Storage" },
                    { name: "premisesOutsideStorage", ph: "Outside Storage" },
                  ].map((f, i) => (
                    <input key={f.name} name={f.name} value={(form as any)[f.name]} onChange={handleInput} placeholder={f.ph}
                      className={`${inp} ${i === 0 ? "bg-primary placeholder:text-black text-black font-bold" : ""}`}
                    />
                  ))}
                </div>

                <p className="text-[15px] font-bold text-[#222] mt-2">Contacts</p>

                {[
                  { prefix: "directors", label: "3 – Company directors" },
                  { prefix: "financial", label: "4 – Financial contact" },
                  { prefix: "technical", label: "5 – Technical contact" },
                  { prefix: "afterHours", label: "6 – After office hours" },
                  { prefix: "qhse", label: "7 – QHSE Contact" },
                  { prefix: "commercial", label: "8 – Commercial Contact" },
                ].map(({ prefix, label }) => (
                  <div key={prefix}>
                    <p className={sectionTitle}>{label}</p>
                    <div className="grid grid-cols-3 gap-3">
                      <input placeholder="name" name={`${prefix}Name`} value={(form as any)[`${prefix}Name`]} onChange={handleInput} className={inp} />
                      <input placeholder="Tele" name={`${prefix}Tel`} value={(form as any)[`${prefix}Tel`]} onChange={handleInput} className={inp} />
                      <input placeholder="Email" name={`${prefix}Email`} value={(form as any)[`${prefix}Email`]} onChange={handleInput} className={inp} />
                    </div>
                  </div>
                ))}

                <div className="border-t border-[#EEE] pt-4 mt-2" />

                {[
                  { name: "insuranceText", title: "Insurance", sub: "9 – What type of insurance do you have? write the insurances details below." },
                  { name: "accreditationText", title: "Company accreditation", sub: "10 – What kind of quality standard do you manage your company and QA facilities to? (i.e. ISO, API, LEEA, GMP, Food, Dietary Supplement, etc...):" },
                  { name: "financialCapabilityText", title: "Financial Capapility", sub: "11 – Do you have a financial audit report or bank guarantee?" },
                  { name: "majorClientsText", title: "List of majors client", sub: "12 – List of major clients & vender registration number:" },
                ].map((item) => (
                  <div key={item.name}>
                    <p className="text-[14px] font-bold text-primary">{item.title}</p>
                    <p className="text-[12px] text-primary/80 mb-2">{item.sub}</p>
                    <textarea name={item.name} value={(form as any)[item.name]} onChange={handleInput} rows={4} className={`${inp} resize-none`} />
                  </div>
                ))}

                <div className="mt-auto pt-6 border-t border-[#F0F2F5] flex items-center justify-between">
                  <button type="button" onClick={handleBack} className="px-8 py-3.5 rounded-xl border-2 border-[#DDD] text-[#444] font-bold text-[15px] hover:bg-[#F5F5F5] transition-all">Back</button>
                  <div className="flex gap-3">
                    <button type="button" onClick={handleNext} className="bg-primary text-black font-bold px-8 py-3.5 rounded-xl text-[15px] hover:bg-primary/90 transition-all">Save and continue</button>
                    <button type="button" className="bg-primary/80 text-black font-bold px-8 py-3.5 rounded-xl text-[15px] hover:bg-primary transition-all">Save as draft</button>
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 3: Equipment Verification ─── */}
            {step === 3 && (
              <div className="flex-1 flex flex-col gap-2">
                <h2 className="text-primary font-bold text-xl mb-4">Verification and Test Equipment</h2>
                <YesNoRow label="1 – Calibrate testing equipment to a regular schedule using a documented procedure?" name="eq1" value={form.eq1} onChange={setRadio} />
                <YesNoRow label="2 – Statutory inspections are made and recorded ?" name="eq2" value={form.eq2} onChange={setRadio} />
                <YesNoRow label="3 – Statutory examinations are made and recorded ?" name="eq3" value={form.eq3} onChange={setRadio} />
                <YesNoRow label="4 – Records enable equipment due examination to be identified and recalle ?" name="eq4" value={form.eq4} onChange={setRadio} />
                <YesNoRow label="5 – Pre-use inspecction is recorded and maintained ?" name="eq5" value={form.eq5} onChange={setRadio} />

                <p className={`${sectionTitle} mt-2`}>6 – Calibration Certificates</p>
                <FileUploadRow label="" fileKey="calibrationCert" uploadedFiles={uploadedFiles} onFileChange={handleFileChange} />

                <div className="mt-auto pt-6 border-t border-[#F0F2F5] flex items-center justify-between">
                  <button type="button" onClick={handleBack} className="px-8 py-3.5 rounded-xl border-2 border-[#DDD] text-[#444] font-bold text-[15px] hover:bg-[#F5F5F5] transition-all">Back</button>
                  <div className="flex gap-3">
                    <button type="button" onClick={handleNext} className="bg-primary text-black font-bold px-8 py-3.5 rounded-xl text-[15px] hover:bg-primary/90 transition-all">Save and continue</button>
                    <button type="button" className="bg-primary/80 text-black font-bold px-8 py-3.5 rounded-xl text-[15px] hover:bg-primary transition-all">Save as draft</button>
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 4: Personnel and Manpower ─── */}
            {step === 4 && (
              <div className="flex-1 flex flex-col gap-2">
                <h2 className="text-primary font-bold text-xl mb-2">Personnel and Manpower</h2>

                <p className={sectionTitle}>1 – What is your employee onboarding and continuing training policy? Please attach policy and/or supporting SOP(s).</p>
                <FileUploadRow label="" fileKey="trainingPolicy" uploadedFiles={uploadedFiles} onFileChange={handleFileChange} />

                <YesNoRow label="2 – Does the company have training matrix ?" name="pm2" value={form.pm2} onChange={setRadio} />
                <YesNoRow label="3 – Does the company implement the training matrix?" name="pm3" value={form.pm3} onChange={setRadio} />
                <YesNoRow label="4 – Record available for training certificates?" name="pm4" value={form.pm4} onChange={setRadio} />
                <YesNoRow label="5 – Does the company has notification system for certificates due to expiry?" name="pm5" value={form.pm5} onChange={setRadio} />
                <YesNoRow label="6 – Does the company maintain HR system?" name="pm6" value={form.pm6} onChange={setRadio} />

                <div className="border-t border-[#EEE] my-3" />
                <p className="text-[14px] font-bold text-primary mb-2">Workmanship, Training, etc.</p>

                <YesNoRow label="7 – Are employees recruited on the basis of a defined job description?" name="pm7" value={form.pm7} onChange={setRadio} />
                <YesNoRow label="8 – Are employees provided with any training to perform a specified job?" name="pm8" value={form.pm8} onChange={setRadio} />

                <div className="mb-4">
                  <p className="text-[13px] font-semibold text-primary mb-2">9 – If the answer is yes, what type of training?</p>
                  <div className="flex gap-3 flex-wrap">
                    {["Outside Training", "In-house Training", "On jop Training", "Apprenticeship"].map((t) => (
                      <button key={t} type="button"
                        onClick={() => setForm((p) => ({ ...p, trainingType: t }))}
                        className={`px-5 py-2.5 rounded-xl border-2 text-[13px] font-semibold transition-all ${form.trainingType === t ? "border-primary bg-primary text-black" : "border-[#DDD] bg-white text-[#444]"}`}
                      >{t}</button>
                    ))}
                  </div>
                </div>

                <YesNoRow label="10 – Are employees properly briefed about the manufacturing processes to be carried out by them?" name="pm10" value={form.pm10} onChange={setRadio} />

                <div className="border-t border-[#EEE] my-3" />
                <p className="text-[14px] font-bold text-primary mb-2">Localization</p>

                <YesNoRow label="11 – Does the company has program for localization?" name="pm11" value={form.pm11} onChange={setRadio} />
                <p className={sectionTitle}>12 – If yes, Please attach policy and/or supporting SOP(s)</p>
                <FileUploadRow label="" fileKey="localizationPolicy" uploadedFiles={uploadedFiles} onFileChange={handleFileChange} />

                <YesNoRow label="13 – Does the company has plan for training and development for local?" name="pm13" value={form.pm13} onChange={setRadio} />
                <p className={sectionTitle}>14 – If yes, Please attach policy and/or supporting SOP(s)</p>
                <FileUploadRow label="" fileKey="devPlanPolicy" uploadedFiles={uploadedFiles} onFileChange={handleFileChange} />

                <p className={sectionTitle}>15 – What is your employee onboarding and continuing training policy? Please attach policy and/or supporting SOP(s).</p>
                <FileUploadRow label="" fileKey="onboardingPolicy" uploadedFiles={uploadedFiles} onFileChange={handleFileChange} />

                <div className="mt-auto pt-6 border-t border-[#F0F2F5] flex items-center justify-between">
                  <button type="button" onClick={handleBack} className="px-8 py-3.5 rounded-xl border-2 border-[#DDD] text-[#444] font-bold text-[15px] hover:bg-[#F5F5F5] transition-all">Back</button>
                  <div className="flex gap-3">
                    <button type="button" onClick={handleNext} className="bg-primary text-black font-bold px-8 py-3.5 rounded-xl text-[15px] hover:bg-primary/90 transition-all">Save and continue</button>
                    <button type="button" className="bg-primary/80 text-black font-bold px-8 py-3.5 rounded-xl text-[15px] hover:bg-primary transition-all">Save as draft</button>
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 5: QHSE ─── */}
            {step === 5 && (
              <div className="flex-1 flex flex-col gap-2">
                <h2 className="text-primary font-bold text-xl mb-2">QHSE</h2>

                <div className="mb-3">
                  <p className="text-[13px] font-semibold text-primary mb-2">1 – Is the company registered to any ISO 9000, 14001, OHSAS 18001 or any other QHSE standard?</p>
                  <div className="flex items-center gap-6 mb-2">
                    {["YES", "NO", "NOT APPLICABLE"].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="q1" value={opt} checked={form.q1 === opt} onChange={() => setRadio("q1", opt)} className="w-4 h-4 accent-primary" />
                        <span className="text-[13px] font-medium text-[#333]">{opt}</span>
                      </label>
                    ))}
                  </div>
                  {form.q1 === "YES" && <input name="q1Detail" value={form.q1Detail} onChange={handleInput} placeholder="If Yes, give details including scope registration, Certificate Number" className={`${inp} mb-2`} />}
                  {form.q1 === "NO" && <input name="q1No" value={form.q1No} onChange={handleInput} placeholder="If No, is the company in the process of registration and what is the expected date of completion?" className={inp} />}
                </div>

                <p className="text-[14px] font-bold text-[#222] mt-1 mb-2">Does the company :</p>

                <div className="mb-3">
                  <YesNoRow label="2 – Have a document QHSE Management system?" name="q2" value={form.q2} onChange={setRadio} />
                  {form.q2 === "YES" && (
                    <>
                      <p className="text-[12px] text-primary mb-1.5 ml-6">If Yes, enclose an uncontrolled copy of your quality manual</p>
                      <div className="ml-6"><FileUploadRow label="" fileKey="qhseManual" uploadedFiles={uploadedFiles} onFileChange={handleFileChange} /></div>
                    </>
                  )}
                </div>

                <div className="mb-3">
                  <YesNoRow label="3 – Is QA/QC a separate division? To whom do they report?" name="q3" value={form.q3} onChange={setRadio} />
                  {form.q3 === "YES" && (
                    <>
                      <p className="text-[12px] text-primary mb-1.5 ml-6">If yes, please attach QA / QC Organizational Chart</p>
                      <div className="ml-6"><FileUploadRow label="" fileKey="qhseChart" uploadedFiles={uploadedFiles} onFileChange={handleFileChange} /></div>
                    </>
                  )}
                </div>

                {[
                  { n: "q4", l: "4 – Audit and review the QHSE Management system with documented records to show actions taken?" },
                  { n: "q5", l: "5 – Operate in process inspection and control to documented procedures and control limits?" },
                  { n: "q6", l: "6 – Calibrate testing equipment to a regular schedule using a documented procedure?" },
                  { n: "q7", l: "7 – Identify batches / lots of product with a batch number ensuring traceability, including deliveries in bulk?" },
                  { n: "q8", l: "8 – Operate product inspection / testing independent of production?" },
                  { n: "q9", l: "9 – Test finish product before dispatch conformity with documented specification, using documented procedures?" },
                  { n: "q10", l: "10 – Keep readily retrievable records of product quality for at least 2 Years?" },
                  { n: "q11", l: "11 – Have procedures which ensure untested material in not dispatched?" },
                  { n: "q12", l: "12 – Segregate or identify non-conforming product to prevent inadvertent dispatch?" },
                  { n: "q13", l: "13 – Operate a documented system for the supply of non-conforming product only by agreed concession prior to dispatch?" },
                  { n: "q14", l: "14 – Supply the Purchaser with an written and agreed product specification?" },
                  { n: "q15", l: "15 – Supply on request a certificate of conformity to the agreed specification to arrive with each delivery?" },
                  { n: "q16", l: "16 – Operate a purchasing system to ensure that materials and services supplied meet contract requirements?" },
                  { n: "q17", l: "17 – Use suppliers selected on the basis of their quality capability?" },
                  { n: "q18", l: "18 – Operate a vendor rating system?" },
                  { n: "q19", l: "19 – Clearly state technical and quality requirements on purchasing documents?" },
                  { n: "q20", l: "20 – Inspect incoming materials to the extent necessary to ensure they meet the order specification?" },
                  { n: "q21", l: "21 – Provide adequate storage for finished product?" },
                  { n: "q22", l: "22 – Ensure deliveries are adequately protected during transit?" },
                  { n: "q23", l: "23 – Ensure all deliveries are adequately identified on each container including product description, shelf life, together with any necessary hazards marking as appropriate?" },
                  { n: "q24", l: "24 – Maintain training records for all personnel whose activities may affect the quality of the product, delivery or service we receive?" },
                  { n: "q25", l: "25 – Allow the purchaser representative to audit its QHSE Management system on request?" },
                  { n: "q26", l: "26 – Use statistical techniques to determine acceptable quality levels for compliance to specifications?" },
                ].map((q) => <YesNoRow key={q.n} label={q.l} name={q.n} value={(form as any)[q.n]} onChange={setRadio} />)}

                <div className="border-t border-[#EEE] my-4" />
                <p className="text-[15px] font-bold text-[#222] mb-2">Health and Safety</p>
                <p className="text-[13px] font-semibold text-primary mb-3">Does the company :</p>

                {[
                  { n: "hs27", l: "27 – Have a policy on health and safety?" },
                  { n: "hs28", l: "28 – Carry out health and safety risk assessments?" },
                  { n: "hs29", l: "29 – Developed plans for continual improvement based on risk assessments and accident logs?" },
                  { n: "hs30", l: "30 – Have a fire alarm that can be heard in all areas of the production site?" },
                  { n: "hs31", l: "31 – If yes, is the alarm regularly tested?" },
                  { n: "hs32", l: "32 – Has ERP system in place?" },
                  { n: "hs33", l: "33 – Performed periodical drills?" },
                  { n: "hs34", l: "34 – Is the workplace provided with emergency exits?" },
                  { n: "hs35", l: "35 – May workers access first-aid equipment in the workplace during all shifts?" },
                  { n: "hs36", l: "36 – Are medically competent personnel within reach if an accident occurs?" },
                ].map((q) => <YesNoRow key={q.n} label={q.l} name={q.n} value={(form as any)[q.n]} onChange={setRadio} />)}

                <div className="mb-4">
                  <p className="text-[13px] font-semibold text-primary mb-2">37 – How often do the company check its fire fighting equipment?</p>
                  <div className="flex gap-3 flex-wrap">
                    {["More than once a month", "Once a month", "A few times", "Never"].map((t) => (
                      <button key={t} type="button"
                        onClick={() => setForm((p) => ({ ...p, fireCheckFreq: t }))}
                        className={`px-5 py-2.5 rounded-xl border-2 text-[13px] font-semibold transition-all ${form.fireCheckFreq === t ? "border-primary bg-primary text-black" : "border-[#DDD] bg-white text-[#444]"}`}
                      >{t}</button>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-[#F0F2F5] flex items-center justify-between">
                  <button type="button" onClick={handleBack} className="px-8 py-3.5 rounded-xl border-2 border-[#DDD] text-[#444] font-bold text-[15px] hover:bg-[#F5F5F5] transition-all">Back</button>
                  <div className="flex gap-3">
                    <button type="button" onClick={handleNext} className="bg-primary text-black font-bold px-8 py-3.5 rounded-xl text-[15px] hover:bg-primary/90 transition-all">Save and continue</button>
                    <button type="button" className="bg-primary/80 text-black font-bold px-8 py-3.5 rounded-xl text-[15px] hover:bg-primary transition-all">Save as draft</button>
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 6: Documentation ─── */}
            {step === 6 && (
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
                  <FileUploadRow key={doc.id} label={doc.label} fileKey={doc.id} uploadedFiles={uploadedFiles} onFileChange={handleFileChange} />
                ))}
                <div className="mt-auto pt-6 border-t border-[#F0F2F5] flex items-center justify-between">
                  <button type="button" onClick={handleBack} className="px-8 py-3.5 rounded-xl border-2 border-[#DDD] text-[#444] font-bold text-[15px] hover:bg-[#F5F5F5] transition-all">Back</button>
                  <div className="flex gap-3">
                    <button type="button" onClick={handleNext} className="bg-primary text-black font-bold px-8 py-3.5 rounded-xl text-[15px] hover:bg-primary/90 transition-all">Save and continue</button>
                    <button type="button" className="bg-primary/80 text-black font-bold px-8 py-3.5 rounded-xl text-[15px] hover:bg-primary transition-all">Save as draft</button>
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 7: Manufacturing / Process Facility ─── */}
            {step === 7 && (
              <div className="flex-1 flex flex-col gap-3">
                <h2 className="text-primary font-bold text-xl mb-2">Manufacturing Facility/ Process Facility</h2>

                <p className="text-[13px] font-semibold text-primary">1 – Describe the long-term strategies of your company in terms of technology development, plant capacity, product mix, capital investment, manpower, etc…</p>
                <textarea name="mf2aText" value={form.mf2aText} onChange={handleInput} placeholder="Describe here" rows={3} className={`${inp} resize-none`} />

                <YesNoRow label="2 – Does the manufacturer has adequate machinery and equipment to manufacture the products?" name="mf2" value={form.mf2} onChange={setRadio} />

                <p className="text-[13px] font-semibold text-primary">Describe available machinery / equipment:</p>
                <p className="text-[12px] text-primary/70">3 – Please list your major process equipment (Include: Category, Type, Brand, Quantity & Capacity of each if available)</p>

                <div className="overflow-x-auto border border-[#EEE] rounded-xl">
                  <table className="w-full text-[12px]">
                    <thead>
                      <tr className="bg-[#F5F5F5] border-b border-[#EEE]">
                        <th className="px-3 py-2 text-left font-bold text-[#555]">Sr.#</th>
                        <th className="px-3 py-2 text-left font-bold text-[#555]">Description</th>
                        <th className="px-3 py-2 text-left font-bold text-[#555]">NO.</th>
                        <th className="px-3 py-2 text-left font-bold text-[#555]">State of maintenance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {["A", "B", "C"].map((row) => (
                        <tr key={row} className="border-b border-[#F0F0F0]">
                          <td className="px-3 py-2 text-[#666]">{row}</td>
                          <td className="px-3 py-2"><input className={`${inp} py-1.5 text-xs`} placeholder="" /></td>
                          <td className="px-3 py-2"><input className={`${inp} py-1.5 text-xs w-16`} placeholder="" /></td>
                          <td className="px-3 py-2"><input className={`${inp} py-1.5 text-xs`} placeholder="" /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <YesNoRow label="4 – Does the manufacturer has adequate machinery and equipment to manufacture the products?" name="mf4" value={form.mf4} onChange={setRadio} />

                <p className="text-[13px] font-semibold text-primary">5 – Attach the maintenance plan record</p>
                <FileUploadRow label="" fileKey="maintenancePlan" uploadedFiles={uploadedFiles} onFileChange={handleFileChange} />

                <YesNoRow label="6 – Does the manufacturer has adequate process/flow chart or procedures of the manufacturing processes carried out by them?" name="mf6" value={form.mf6} onChange={setRadio} />
                <YesNoRow label="7 – Does the manufacturer maintain technical files on the manufacturing processes carried out by them?" name="mf7" value={form.mf7} onChange={setRadio} />
                <YesNoRow label="8 – Does the manufacturer maintain technical files archive system for the products carried out by them that have been purchased from them?" name="mf8" value={form.mf8} onChange={setRadio} />

                <p className="text-[13px] font-semibold text-primary">9 – How many years back your archive saves?</p>
                <input name="mf9Text" value={form.mf9Text} onChange={handleInput} placeholder="Answer" className={`${inp} max-w-xs`} />

                <div className="border-t border-[#EEE] my-2" />
                <p className="text-[14px] font-bold text-primary">Raw Material & Process Consumables Procurement</p>
                <YesNoRow label="10 – Are raw materials and processes consumables materials are tested / certified at the time of procurement as per required specifications?" name="mf9" value={form.mf9} onChange={setRadio} />
                <YesNoRow label="11 – Is record of raw materials and process consumables maintained?" name="mf11" value={form.mf11} onChange={setRadio} />

                <div className="border-t border-[#EEE] my-2" />
                <p className="text-[14px] font-bold text-primary">Shop Floor Management</p>
                <YesNoRow label="12 – Is the working designed according to process flow?" name="mf12" value={form.mf12} onChange={setRadio} />
                <YesNoRow label="13 – Are work stations designed to facilitate the process flow and manufacturing requirements?" name="mf13" value={form.mf13} onChange={setRadio} />

                <p className="text-[13px] font-semibold text-primary mb-2">Please indicate the sufficiency of the following:</p>
                <div className="overflow-x-auto border border-[#EEE] rounded-xl mb-3">
                  <table className="w-full text-[12px]">
                    <thead>
                      <tr className="bg-[#F5F5F5] border-b border-[#EEE]">
                        <th className="px-3 py-2 text-left font-bold text-[#555]">Item</th>
                        <th className="px-3 py-2 text-center font-bold text-[#555]">Yes</th>
                        <th className="px-3 py-2 text-center font-bold text-[#555]">No</th>
                      </tr>
                    </thead>
                    <tbody>
                      {["Space for each work station", "Lighting arrangements", "Air ventilation", "Dust collection", "Receiving area", "Dispatch area", "Chemical area", "Hazardous material area"].map((item) => (
                        <tr key={item} className="border-b border-[#F0F0F0]">
                          <td className="px-3 py-2 text-[#555]">{item}</td>
                          <td className="px-3 py-2 text-center"><input type="radio" name={`sfm_${item}`} className="accent-primary" /></td>
                          <td className="px-3 py-2 text-center"><input type="radio" name={`sfm_${item}`} className="accent-primary" /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-auto pt-6 border-t border-[#F0F2F5] flex items-center justify-between">
                  <button type="button" onClick={handleBack} className="px-8 py-3.5 rounded-xl border-2 border-[#DDD] text-[#444] font-bold text-[15px] hover:bg-[#F5F5F5] transition-all">Back</button>
                  <div className="flex gap-3">
                    <button type="submit" className="bg-primary text-black font-bold px-8 py-3.5 rounded-xl text-[15px] hover:bg-primary/90 transition-all">Submit</button>
                    <button type="button" className="bg-primary/80 text-black font-bold px-8 py-3.5 rounded-xl text-[15px] hover:bg-primary transition-all">Save as draft</button>
                  </div>
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
