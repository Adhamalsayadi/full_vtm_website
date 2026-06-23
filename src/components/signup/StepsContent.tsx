import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { MapPin, ChevronDown, Check } from "lucide-react";
import {
  SignUpFormData,
  FormErrors,
  SelectOption,
  ServiceItem,
} from "@/types/users";
import { Input } from "../ui/input";
import { FileUpload } from "../ui/fileUpload";
import Button from "../ui/button";
import { cn } from "@/lib/utils";

interface StepsContentProps {
  step: number;
  formData: SignUpFormData;
  errors: FormErrors;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<SignUpFormData>>;
}

// ─── Service Items ─────────────────────────────────────────────────────────────
const MOCK_SERVICES: ServiceItem[] = [
  { id: "services", label: "Services", icon: "/Services.png" },
  { id: "rental", label: "Rental", icon: "/for-rent.png" },
  { id: "manpower", label: "Man power", icon: "/power.png" },
  { id: "products", label: "Products", icon: "/Highlight.png" },
];

// ─── Activity & Subcategory Maps ───────────────────────────────────────────────
const ACTIVITY_MAP: Record<string, SelectOption[]> = {
  services: [
    { value: "up-stream", label: "Up Stream" },
    { value: "down-stream", label: "Down Stream" },
    { value: "other", label: "Other (Add New)" },
  ],
  rental: [
    { value: "well-testing", label: "Well Testing Equipment" },
    { value: "fracking", label: "Fracking" },
    { value: "pipes", label: "Pipes 1502 & 602" },
    { value: "other", label: "Other (Add New)" },
  ],
  materials: [
    { value: "tools", label: "Tools" },
    { value: "chemicals", label: "Chemicals" },
    { value: "other", label: "Other (Add New)" },
  ],
  manpower: [
    { value: "engineers", label: "Engineers" },
    { value: "consultants", label: "Consultants" },
    { value: "other", label: "Other (Add New)" },
  ],
  products: [
    { value: "up", label: "Up stream" },
    { value: "down", label: "Down stream" },
    { value: "engineering", label: "Engineering" },
    { value: "other", label: "Other (Add New)" },
  ],
};

const CLIENT_ACTIVITIES: SelectOption[] = [
  { value: "up", label: "Up stream" },
  { value: "down", label: "Down stream" },
  { value: "engineering", label: "Engineering" },
  { value: "logistics", label: "Logistics" },
  { value: "procurement", label: "Procurement" },
  { value: "other", label: "Other (Add New)" },
];

const SUBCATEGORY_MAP: Record<string, SelectOption[]> = {
  "up-stream": [
    { value: "slickline", label: "Slickline" },
    { value: "pressure-control", label: "Pressure Control" },
    { value: "directional-drilling", label: "Directional drilling" },
    { value: "completions", label: "Completions" },
    { value: "water-injection", label: "Water injection" },
    { value: "mwd-lwd", label: "MWD/LWD" },
    { value: "other", label: "Other (Add New)" },
  ],
  "well-testing": [
    { value: "ssv", label: "SSV" },
    { value: "desander", label: "Desander" },
    { value: "other", label: "Other (Add New)" },
  ],
  default: [
    { value: "general", label: "General" },
    { value: "vapor-blasting", label: "Vapor blasting" },
    { value: "inspection-testing", label: "Inspection & Testing" },
    { value: "laser-engraving", label: "Laser engraving" },
    { value: "transportation", label: "Transportation" },
    { value: "laboratory", label: "Laboratory" },
    { value: "other", label: "Other (Add New)" },
  ],
};

// ─── Premises Options ──────────────────────────────────────────────────────────
const PREMISES_OPTIONS = [
  "Area m²/ft²",
  "Office m²",
  "Inside Storage",
  "Outside Storage",
  "Workshop m²",
  "Warehouse",
];

// ─── Checkbox Dropdown ─────────────────────────────────────────────────────────
interface CheckboxDropdownProps {
  label: string;
  options: SelectOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
}

const CheckboxDropdown: React.FC<CheckboxDropdownProps> = ({
  label,
  options,
  selected,
  onChange,
  required,
  error,
  placeholder = "Select the category you need",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const displayLabel =
    selected.length === 0
      ? placeholder
      : options
          .filter((o) => selected.includes(o.value))
          .map((o) => o.label)
          .join(", ");

  return (
    <div className="flex flex-col" ref={ref}>
      <label className="block text-base md:text-lg font-semibold mb-2 text-[#333]">
        {label} {required && <span className="text-[#ff4d4f]">*</span>}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "w-full p-4 bg-[#ebeef5] border rounded-lg outline-none text-left flex items-center justify-between transition-all",
            open ? "border-primary" : "border-transparent",
            error && "border-red-500"
          )}
        >
          <span
            className={cn(
              "text-sm truncate pr-2",
              selected.length === 0 ? "text-gray-400" : "text-[#101828] font-medium"
            )}
          >
            {displayLabel}
          </span>
          <ChevronDown
            size={18}
            className={cn(
              "shrink-0 text-gray-500 transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </button>

        {open && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#EAECF0] rounded-xl shadow-xl z-[200] overflow-hidden">
            <div className="max-h-56 overflow-y-auto py-1">
              {options.map((opt) => {
                const isChecked = selected.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggle(opt.value)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors",
                      isChecked
                        ? "bg-primary/10 text-[#101828] font-semibold"
                        : "hover:bg-[#F9FAFB] text-[#344054]"
                    )}
                  >
                    <span
                      className={cn(
                        "w-4 h-4 rounded flex items-center justify-center border shrink-0 transition-all",
                        isChecked
                          ? "bg-primary border-primary"
                          : "bg-white border-[#D0D5DD]"
                      )}
                    >
                      {isChecked && <Check size={10} className="text-black" strokeWidth={3} />}
                    </span>
                    {opt.label}
                  </button>
                );
              })}
            </div>
            {selected.length > 0 && (
              <div className="border-t border-[#EAECF0] px-4 py-2 flex justify-between items-center bg-[#F9FAFB]">
                <span className="text-xs text-[#667085]">
                  {selected.length} selected
                </span>
                <button
                  type="button"
                  onClick={() => onChange([])}
                  className="text-xs text-red-500 hover:underline font-medium"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
};

// ─── Location Input ────────────────────────────────────────────────────────────
interface LocationInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
}

const LocationInput: React.FC<LocationInputProps> = ({
  label,
  name,
  value,
  onChange,
  required,
  error,
  placeholder,
}) => (
  <div className="flex flex-col">
    <label className="block text-base md:text-lg font-semibold mb-2 text-[#333]">
      {label} {required && <span className="text-[#ff4d4f]">*</span>}
    </label>
    <div className="relative flex items-center">
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "w-full p-4 bg-[#ebeef5] border-none rounded-lg outline-none transition-all focus:ring-2 focus:ring-primary/50 pr-16",
          error && "ring-2 ring-red-500"
        )}
      />
      <button
        type="button"
        className="absolute right-0 h-full px-4 bg-primary rounded-r-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
      >
        <MapPin size={20} className="text-black" />
      </button>
    </div>
    {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
  </div>
);

// ─── Contact Section ───────────────────────────────────────────────────────────
interface ContactSectionProps {
  index: number;
  title: string;
  sectionKey: string;
  value: { name: string; tel: string; email: string };
  onChange: (key: string, field: string, val: string) => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  index,
  title,
  sectionKey,
  value,
  onChange,
}) => (
  <div className="mb-8">
    <p className="text-primary font-bold text-base md:text-lg mb-4">
      {index}. {title}
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-[#344054] mb-2">1. Name</label>
        <input
          type="text"
          placeholder="Full name"
          className="w-full p-3 bg-[#ebeef5] border-none rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
          value={value.name}
          onChange={(e) => onChange(sectionKey, "name", e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-[#344054] mb-2">2. Tel</label>
        <input
          type="text"
          placeholder="+123..."
          className="w-full p-3 bg-[#ebeef5] border-none rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
          value={value.tel}
          onChange={(e) => onChange(sectionKey, "tel", e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-[#344054] mb-2">3. Email</label>
        <input
          type="email"
          placeholder="email@..."
          className="w-full p-3 bg-[#ebeef5] border-none rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
          value={value.email}
          onChange={(e) => onChange(sectionKey, "email", e.target.value)}
        />
      </div>
    </div>
  </div>
);

// ─── Main render function ──────────────────────────────────────────────────────
export const renderStepContent = ({
  step,
  formData,
  errors,
  handleChange,
  setFormData,
}: StepsContentProps): React.ReactNode => {

  // Generic section updater for contact sections
  const updateSection = (key: string, field: string, val: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: { ...(prev as any)[key], [field]: val },
    }));
  };

  const handleServiceSelect = (item: ServiceItem) => {
    setFormData((prev) => ({
      ...prev,
      serviceScope: item.id || "",
      activityClassification: [],
      subCategories: [],
      customActivity: "",
      customSubCategory: "",
    }));
  };

  const isSupplier = formData.userType === "Supplier";
  const availableActivities = isSupplier
    ? ACTIVITY_MAP[formData.serviceScope] || []
    : CLIENT_ACTIVITIES;

  const hasOtherActivity = formData.activityClassification.includes("other");

  const firstActivity = formData.activityClassification.find((v) => v !== "other");
  const availableSubCategories =
    SUBCATEGORY_MAP[firstActivity || ""] || SUBCATEGORY_MAP["default"];

  // ── STEP 1: User Info ────────────────────────────────────────────────────────
  if (step === 1) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, files } = e.target;
      if (files && files[0]) {
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
      }
    };

    return (
      <div className="step-content">
        <p className="text-primary font-semibold mb-3 text-xs md:text-sm uppercase tracking-widest">
          Seclect user
        </p>
        <h2 className="text-lg md:text-xl font-semibold mb-6 text-[#333]">
          1.According to the services you want, select who you are?
          <span className="text-[#ff4d4f]">*</span>
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {(["Client", "Supplier"] as const).map((type) => (
            <Button
              key={type}
              variant={formData.userType === type ? "primary" : "ghost"}
              size="md"
              className={cn(
                "flex-1 flex items-center justify-center gap-3 border-2 py-4 rounded-xl",
                formData.userType === type
                  ? "border-primary bg-primary text-black"
                  : "bg-[#ebeef5] border-transparent text-gray-600 hover:bg-[#e2e5ec]"
              )}
              onClick={() =>
                setFormData((prev) => ({ ...prev, userType: type }))
              }
            >
              <Image
                src={type === "Client" ? "/Group.png" : "/Services.png"}
                alt={type}
                width={28}
                height={28}
              />
              <span className="font-semibold text-base">{type}</span>
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <Input
            label="2.Enter a valid Email"
            name="email"
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
            error={errors.email}
          />
          <Input
            label="3.what is the password?"
            name="password"
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
            error={errors.password}
          />
        </div>
        <div className="mb-6">
          <Input
            label="4.what is the company's owner name?"
            name="ownerName"
            placeholder="Full name"
            value={formData.ownerName}
            onChange={handleChange}
            required
            error={errors.ownerName}
          />
        </div>
        <div className="mb-0">
          <FileUpload
            label="5. Upload a profile photo?"
            name="profilePhoto"
            onChange={handleFileChange}
            required
            error={errors.profilePhoto}
          />
        </div>
      </div>
    );
  }

  // ── STEP 2: Basic Info ───────────────────────────────────────────────────────
  if (step === 2) {
    if (isSupplier) {
      return (
        <div className="step-content">
          <p className="text-primary font-semibold mb-3 text-xs md:text-sm uppercase tracking-widest">
            Basic info
          </p>
          <div className="flex flex-col gap-6">
            <Input
              label="1. what is the company name?(Trade marking mark name)"
              name="companyName"
              placeholder="Company name"
              value={formData.companyName}
              onChange={handleChange}
              required
              error={errors.companyName}
            />
            <LocationInput
              label="2. What is the the company's address?"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              required
              error={errors.companyAddress}
              placeholder="Enter address"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="3.Country of the company"
                name="countryOfCompany"
                placeholder="Country"
                value={formData.countryOfCompany}
                onChange={handleChange}
                required
                error={errors.countryOfCompany}
              />
              <Input
                label="4.Country of regression"
                name="countryOfRegression"
                placeholder="Country"
                value={formData.countryOfRegression}
                onChange={handleChange}
                required
                error={errors.countryOfRegression}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="5.Date of regestration"
                name="dateOfRegistration"
                type="date"
                value={formData.dateOfRegistration}
                onChange={handleChange}
                required
                error={errors.dateOfRegistration}
              />
              <Input
                label="6.Number of regestration"
                name="numberOfRegistration"
                placeholder="Registration number"
                value={formData.numberOfRegistration}
                onChange={handleChange}
                required
                error={errors.numberOfRegistration}
              />
            </div>
          </div>
        </div>
      );
    }

    // Client Basic Info
    return (
      <div className="step-content">
        <p className="text-primary font-semibold mb-3 text-xs md:text-sm uppercase tracking-widest">
          Basic info
        </p>
        <div className="flex flex-col gap-6">
          <Input
            label="1. what is the company name?(Trade marking mark name)"
            name="companyName"
            placeholder="Company name"
            value={formData.companyName}
            onChange={handleChange}
            required
            error={errors.companyName}
          />
          <Input
            label="2. What is CR.No of the company?(10 digits)"
            name="crNumber"
            placeholder="10 digits"
            value={formData.crNumber}
            onChange={handleChange}
            required
            error={errors.crNumber}
          />
          <Input
            label="3. What is the years of experience of the company?"
            name="experienceYears"
            type="number"
            placeholder="Years"
            value={formData.experienceYears}
            onChange={handleChange}
            required
            error={errors.experienceYears}
          />
          <LocationInput
            label="4.What is the location of the company?"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            error={errors.location}
            placeholder="City, Country"
          />
        </div>
      </div>
    );
  }

  // ── STEP 3: Services Questions ───────────────────────────────────────────────
  if (step === 3) {
    return (
      <div className="step-content">
        <p className="text-primary font-semibold mb-3 text-xs md:text-sm uppercase tracking-widest">
          Services questions
        </p>

        <div className="mb-8">
          <label className="block text-base md:text-lg font-semibold mb-4 text-[#333]">
            1. What is the compny&apos;s scope of services?
            <span className="text-[#ff4d4f]">*</span>
          </label>
          {/* Single horizontal row matching the design */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {MOCK_SERVICES.map((item) => {
              const isActive = formData.serviceScope === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleServiceSelect(item)}
                  className={cn(
                    "flex items-center justify-center gap-3 px-5 py-4 rounded-2xl transition-all shrink-0 font-medium text-sm border-2",
                    isActive
                      ? "bg-primary border-primary text-black shadow-md"
                      : "bg-[#ebeef5] border-transparent text-[#333] hover:bg-[#e2e5ec]"
                  )}
                >
                  <Image src={item.icon} alt={item.label} width={28} height={28} />
                  {item.label}
                </button>
              );
            })}
          </div>
          {errors.serviceScope && (
            <span className="text-red-500 text-xs mt-2 block">
              {errors.serviceScope}
            </span>
          )}
        </div>

        <div className="mb-8">
          <CheckboxDropdown
            label="2. What is the Company's Activities Classification?"
            options={availableActivities}
            selected={formData.activityClassification}
            onChange={(vals) =>
              setFormData((prev) => ({
                ...prev,
                activityClassification: vals,
                subCategories: [],
                customActivity: vals.includes("other") ? prev.customActivity : "",
              }))
            }
            required
            error={errors.activityClassification}
            placeholder="Select the category you need"
          />
          {hasOtherActivity && (
            <div className="mt-4">
              <Input
                label="Please specify the Activity"
                name="customActivity"
                value={formData.customActivity}
                onChange={handleChange}
                required
                error={errors.customActivity}
                placeholder="Enter your activity classification"
              />
            </div>
          )}
        </div>

        {formData.activityClassification.length > 0 &&
          !formData.activityClassification.every((v) => v === "other") && (
            <div className="mb-0">
              <CheckboxDropdown
                label="3. What is the combany's subcategories ?"
                options={availableSubCategories}
                selected={formData.subCategories}
                onChange={(vals) =>
                  setFormData((prev) => ({
                    ...prev,
                    subCategories: vals,
                    customSubCategory: vals.includes("other") ? prev.customSubCategory : "",
                  }))
                }
                required
                error={errors.subCategories}
                placeholder="Select the subcategory you need"
              />
              {formData.subCategories.includes("other") && (
                <div className="mt-4">
                  <Input
                    label="Please specify the Subcategory"
                    name="customSubCategory"
                    value={formData.customSubCategory}
                    onChange={handleChange}
                    required
                    error={errors.customSubCategory}
                    placeholder="Enter your subcategory"
                  />
                </div>
              )}
            </div>
          )}
      </div>
    );
  }

  // ── STEP 4: Contact Details ──────────────────────────────────────────────────
  if (step === 4) {
    const sections = [
      { id: "ownerSection", label: "Company owner" },
      { id: "directorsSection", label: "Company directors" },
      { id: "financialSection", label: "Financial directors" },
      { id: "commercialSection", label: "Commercial contact" },
      { id: "afterHoursSection", label: "After office hours" },
      { id: "qhseSection", label: "QHSE content" },
    ];

    return (
      <div className="step-content">
        <p className="text-primary font-semibold mb-3 text-xs md:text-sm uppercase tracking-widest">
          Contact Details
        </p>

        <div className="mb-8">
          <Input
            label="1. What is the company's email?"
            name="companyEmail"
            type="email"
            placeholder="email@company.com"
            value={formData.companyEmail}
            onChange={handleChange}
            required
            error={errors.companyEmail}
          />
        </div>

        {sections.map((section, idx) => (
          <ContactSection
            key={section.id}
            index={idx + 2}
            title={section.label}
            sectionKey={section.id}
            value={(formData as any)[section.id]}
            onChange={updateSection}
          />
        ))}
      </div>
    );
  }

  // ── STEP 5: Final Step ───────────────────────────────────────────────────────
  if (step === 5) {
    const HOW_YOU_KNOW_OPTIONS = [
      "Social media",
      "google search",
      "Clients",
      "Marketers",
    ];

    return (
      <div className="step-content">
        <p className="text-primary font-semibold mb-3 text-xs md:text-sm uppercase tracking-widest">
          Final step
        </p>

        {/* Profile number + Company branch */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <Input
            label="1. What is the profile number?"
            name="profileNumber"
            placeholder="Profile number"
            value={formData.profileNumber}
            onChange={handleChange}
            required
            error={errors.profileNumber}
          />
          <Input
            label="2. Company's branch"
            name="companyBranch"
            placeholder="Branch"
            value={formData.companyBranch}
            onChange={handleChange}
            required
            error={errors.companyBranch}
          />
        </div>

        {/* Company Background */}
        <div className="mb-8">
          <p className="text-primary font-bold text-base md:text-lg mb-4">
            Company Background
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="1. When"
              name="companyBackgroundWhen"
              placeholder="When was it established?"
              value={formData.companyBackgroundWhen}
              onChange={handleChange}
              required
              error={errors.companyBackgroundWhen}
            />
            <Input
              label="2. Where"
              name="companyBackgroundWhere"
              placeholder="Where is it based?"
              value={formData.companyBackgroundWhere}
              onChange={handleChange}
              required
              error={errors.companyBackgroundWhere}
            />
          </div>
        </div>

        {/* Premises Area */}
        <div className="mb-8">
          <p className="text-primary font-bold text-base md:text-lg mb-4">
            Premises area
          </p>
          <div className="flex flex-wrap gap-3">
            {PREMISES_OPTIONS.map((option) => {
              const isSelected = formData.premisesArea.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      premisesArea: isSelected
                        ? prev.premisesArea.filter((o) => o !== option)
                        : [...prev.premisesArea, option],
                    }))
                  }
                  className={cn(
                    "px-5 py-3 rounded-xl text-sm font-medium border-2 transition-all",
                    isSelected
                      ? "bg-primary border-primary text-black"
                      : "bg-[#ebeef5] border-transparent text-gray-600 hover:bg-[#e2e5ec]"
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* How you know us */}
        <div className="mb-6">
          <label className="block text-base md:text-lg font-semibold mb-4 text-[#333]">
            How you know us?<span className="text-[#ff4d4f]">*</span>
          </label>
          <div className="flex flex-wrap gap-3 mb-4">
            {HOW_YOU_KNOW_OPTIONS.map((option) => {
              const isSelected = formData.howYouKnowUs === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      howYouKnowUs: isSelected ? "" : option,
                      // clear code when leaving Marketers
                      referralCode:
                        prev.howYouKnowUs === "Marketers" && option !== "Marketers"
                          ? ""
                          : prev.referralCode,
                    }))
                  }
                  className={cn(
                    "px-6 py-3 rounded-xl text-sm font-medium border-2 transition-all",
                    isSelected
                      ? "bg-primary border-primary text-black shadow-md"
                      : "bg-[#ebeef5] border-transparent text-gray-600 hover:bg-[#e2e5ec]"
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {errors.howYouKnowUs && (
            <span className="text-red-500 text-xs">{errors.howYouKnowUs}</span>
          )}

          {/* Referral code — appears only when Marketers is selected */}
          {formData.howYouKnowUs === "Marketers" && (
            <div className="mt-4">
              <Input
                label="Enter referral code"
                name="referralCode"
                placeholder="Enter code (optional)"
                value={formData.referralCode}
                onChange={handleChange}
                error={errors.referralCode}
              />
            </div>
          )}
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="agreedToTerms"
            name="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={handleChange}
            className="mt-1 w-4 h-4 accent-primary cursor-pointer shrink-0"
          />
          <label
            htmlFor="agreedToTerms"
            className="text-sm text-[#333] cursor-pointer underline"
          >
            Accepet terms, conditions and code of conduction?
            <span className="text-[#ff4d4f]">*</span>
          </label>
        </div>
        {errors.agreedToTerms && (
          <span className="text-red-500 text-xs mt-1 block">
            {errors.agreedToTerms}
          </span>
        )}
      </div>
    );
  }

  // ── STEP 6: Review Request ───────────────────────────────────────────────────
  if (step === 6) {
    return (
      <div className="step-content flex flex-col items-center justify-center min-h-[450px] text-center">
        <p className="text-primary font-semibold mb-6 text-xs md:text-sm uppercase tracking-widest self-start">
          review request
        </p>
        <div className="flex flex-col items-center">
          <Image
            src="/enquiries.png"
            alt="Review request illustration"
            width={320}
            height={260}
            className="mb-6 object-contain"
          />
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[#333]">
            Review request
          </h2>
          <p className="text-gray-500 max-w-sm">
            we will send you an update about your request soon
          </p>
        </div>
      </div>
    );
  }

  return null;
};
