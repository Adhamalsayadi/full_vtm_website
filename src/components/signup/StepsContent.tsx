import React from "react";
import { Users, Handshake, ClipboardCheck } from "lucide-react";
import {
  SignUpFormData,
  FormErrors,
  SelectOption,
  ServiceItem,
} from "@/types/users";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { FileUpload } from "../ui/fileUpload";
import Button from "../ui/button";
import ServiceGrid from "../shared/service";
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

const MOCK_SERVICES: ServiceItem[] = [

{ id: "services", label: "Services", icon: "/icons/services.png" },
  { id: "rental", label: "Rental", icon: "/icons/rental.png" },
  { id: "materials", label: "Materials", icon: "/icons/materials.png" },
  { id: "manpower", label: "Man Power", icon: "/icons/manpower.png" },
];

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
};

const SUBCATEGORY_MAP: Record<string, SelectOption[]> = {
  "up-stream": [
    { value: "slickline", label: "Slickline" },
    { value: "pressure-control", label: "Pressure Control" },
    { value: "other", label: "Other (Add New)" },
  ],
  "well-testing": [
    { value: "ssv", label: "SSV" },
    { value: "deisander", label: "Deisander" },
    { value: "other", label: "Other (Add New)" },
  ],
  default: [
    { value: "general", label: "General" },
    { value: "other", label: "Other (Add New)" },
  ],
};

export const renderStepContent = ({
  step,
  formData,
  errors,
  handleChange,
  setFormData,
}: StepsContentProps): React.ReactNode => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

if (formData.userType === "Supplier") {
    const handleServiceSelect = (item: ServiceItem) => {
      setFormData((prev) => ({
        ...prev,
        serviceScope: item.id || "",
        activityClassification: "",
        subCategories: "",
        customActivity: "",
        customSubCategory: "",
      }));
    };

    const handleActivityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const val = e.target.value;
      setFormData((prev) => ({
        ...prev,
        activityClassification: val,
        subCategories: "",
        customActivity: val === "other" ? prev.customActivity : "",
      }));
    };

    const availableActivities = ACTIVITY_MAP[formData.serviceScope] || [];
    const availableSubCategories =
      SUBCATEGORY_MAP[formData.activityClassification] ||
      SUBCATEGORY_MAP["default"];

    switch (step) {
      case 1:
        return (
          <div className="step-content">
            <p className="text-primary font-bold mb-3 text-xs md:text-sm uppercase tracking-widest">
              Select user type
            </p>
            <h2 className="text-lg md:text-xl font-bold mb-8 text-[#101828]">
              1. Select who you are? *
            </h2>

            <div className="flex flex-col sm:flex-row gap-5 mb-10">
              {(["Client", "Supplier"] as const).map((type) => (
                <Button
                  key={type}
                  variant={formData.userType === type ? "primary" : "ghost"}
                  size="md"
                  className={cn(
                    "flex-1 flex items-center justify-center gap-3 border-2 py-4 rounded-xl",
                    formData.userType === type 
                      ? "border-primary bg-primary text-black shadow-lg" 
                      : "bg-[#F2F4F7] border-transparent text-[#667085] hover:bg-[#E4E7EC]"
                  )}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, userType: type }))
                  }
                >
                  {type === "Client" ? (
                    <Users size={22} />
                  ) : (
                    <Handshake size={22} />
                  )}
                  <span className="font-bold text-base">{type}</span>
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Input
                label="2. Valid Email"
                name="email"
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
                error={errors.email}
              />
              <Input
                label="3. Password"
                name="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                error={errors.password}
              />
            </div>
            <div className="mb-8">
              <Input
                label="4. Owner name"
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
                label="5. Profile photo"
                name="profilePhoto"
                onChange={handleFileChange}
                required
                error={errors.profilePhoto}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <p className="text-primary font-bold mb-3 text-xs md:text-sm uppercase tracking-widest">
              Basic info
            </p>
            <div className="flex flex-col gap-6 mb-0">
              <Input
                label="1. What is the company name?"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                required
                error={errors.companyName}
              />
              <Input
                label="2. What is the company CR number?"
                name="crNumber"
                placeholder="10 digits"
                value={formData.crNumber}
                onChange={handleChange}
                required
                error={errors.crNumber}
              />
              <Input
                label="3. How many years of experience?"
                name="experienceYears"
                type="number"
                placeholder="Years"
                value={formData.experienceYears}
                onChange={handleChange}
                required
                error={errors.experienceYears}
              />
              <Input
                label="4. Where is the company located?"
                name="location"
                placeholder="City, Country"
                value={formData.location}
                onChange={handleChange}
                required
                error={errors.location}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <p className="text-primary font-bold mb-3 text-xs md:text-sm uppercase tracking-widest">
              Services questions
            </p>

            <div className="mb-8">
              <label className="block text-base md:text-lg font-bold mb-4 text-[#101828]">
                1. What is the company's scope of services?{" "}
                <span className="text-[#ff4d4f]">*</span>
              </label>
              <ServiceGrid
                items={MOCK_SERVICES}
                variant="home"
                activeId={formData.serviceScope}
                onItemClick={handleServiceSelect}
              />
              {errors.serviceScope && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.serviceScope}
                </span>
              )}
            </div>

            {formData.serviceScope && (
              <div className="mb-8">
                <Select
                  label="2. What is the Company's Activities Classification?"
                  name="activityClassification"
                  value={formData.activityClassification}
                  onChange={handleActivityChange}
                  options={availableActivities}
                  required
                  error={errors.activityClassification}
                />

                {formData.activityClassification === "other" && (
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
            )}

            {formData.activityClassification &&
              formData.activityClassification !== "other" && (
                <div className="mb-0">
                  <Select
                    label="3. What is the company's subcategories?"
                    name="subCategories"
                    value={formData.subCategories}
                    onChange={handleChange}
                    options={availableSubCategories}
                    required
                    error={errors.subCategories}
                  />

                  {formData.subCategories === "other" && (
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

      case 4:
        return (
          <div className="step-content">
            <p className="text-primary font-bold mb-3 text-xs md:text-sm uppercase tracking-widest">
              Contact Details
            </p>
            
            <div className="mb-10">
              <Input
                label="1. What is the company's email? *"
                name="companyEmail"
                type="email"
                placeholder="email@company.com"
                value={formData.companyEmail}
                onChange={handleChange}
                required
                error={errors.companyEmail}
              />
            </div>

{[
              { id: 'ownerSection', label: 'Company owner' },
              { id: 'directorsSection', label: 'Company directors' },
              { id: 'financialSection', label: 'Financial directors' },
              { id: 'commercialSection', label: 'Commercial contact' },
              { id: 'afterHoursSection', label: 'After office hours' },
              { id: 'qhseSection', label: 'QHSE content' },
            ].map((section, idx) => (
              <div key={section.id} className="mb-10">
                <div className="bg-[#f3d45a] px-5 py-2.5 rounded-lg mb-6 shadow-sm">
                  <h3 className="text-black font-bold text-base md:text-lg">
                    {idx + 2}. {section.label}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="flex flex-col">
                    <label className="text-sm font-bold text-[#344054] mb-2 px-1">Name</label>
                    <input
                      type="text"
                      placeholder="Full name"
                      className="w-full p-3 bg-[#F2F4F7] border-none rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                      value={(formData as any)[section.id]?.name || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          [section.id]: { ...(prev as any)[section.id], name: val }
                        }))
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-bold text-[#344054] mb-2 px-1">Tel</label>
                    <input
                      type="text"
                      placeholder="+123..."
                      className="w-full p-3 bg-[#F2F4F7] border-none rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                      value={(formData as any)[section.id]?.tel || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          [section.id]: { ...(prev as any)[section.id], tel: val }
                        }))
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-bold text-[#344054] mb-2 px-1">Email</label>
                    <input
                      type="email"
                      placeholder="email@..."
                      className="w-full p-3 bg-[#F2F4F7] border-none rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                      value={(formData as any)[section.id]?.email || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          [section.id]: { ...(prev as any)[section.id], email: val }
                        }))
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 5:
        return (
          <div className="step-content">
            <p className="text-primary font-bold mb-3 text-xs md:text-sm uppercase tracking-widest">
              Final Step
            </p>

            <div className="mb-10">
              <FileUpload
                label="1. Company Profile Document"
                name="companyProfileDoc"
                onChange={handleFileChange}
                required
                error={errors.companyProfileDoc}
              />
            </div>

            <div className="mb-10">
              <label className="block text-base md:text-lg font-bold mb-5 text-[#101828]">
                2. How did you know us? *
              </label>
              <div className="grid grid-cols-2 gap-5">
                {["Social media", "Google search", "Friend", "Other"].map(
                  (src) => (
                    <Button
                      key={src}
                      type="button"
                      variant={
                        formData.referralSource === src ? "primary" : "ghost"
                      }
                      className={cn(
                        "py-4 px-6 border-2 font-bold rounded-xl",
                        formData.referralSource === src 
                        ? "border-primary bg-primary text-black"
                        : "bg-[#F2F4F7] text-[#667085] border-transparent hover:bg-[#E4E7EC]"
                      )}
                      onClick={() =>
                        setFormData((p) => ({ ...p, referralSource: src }))
                      }
                    >
                      {src}
                    </Button>
                  )
                )}
              </div>
              {errors.referralSource && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.referralSource}
                </span>
              )}
            </div>

            <div className="flex items-start gap-4 mt-10 p-4 bg-[#F9FAFB] rounded-xl border border-[#EAECF0]">
              <input
                type="checkbox"
                id="terms"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleChange}
                className="mt-1 h-5 w-5 rounded accent-primary cursor-pointer"
              />
              <label
                htmlFor="terms"
                className="text-sm md:text-base text-[#475467] cursor-pointer"
              >
                I agree to the{" "}
                <span className="text-black font-bold hover:underline">
                  Terms
                </span>{" "}
                and{" "}
                <span className="text-black font-bold hover:underline">
                  Privacy Policy
                </span>
                .
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
  }

  // --- CLIENT FLOW (DEFAULT) ---
  switch (step) {
    case 1:
      return (
        <div className="step-content">
          <p className="text-primary font-semibold mb-3 text-xs md:text-sm uppercase">
            Select user
          </p>
          <h2 className="text-lg md:text-xl font-semibold mb-6 text-[#333]">
            1. Select who you are? *
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {(["Client", "Supplier"] as const).map((type) => (
              <Button
                key={type}
                variant={formData.userType === type ? "primary" : "ghost"}
                size="md"
                className={cn(
                  "flex-1 flex items-center justify-center gap-2.5 border-2",
                  formData.userType !== type &&
                    "bg-[#ebeef5] border-transparent text-gray-600 hover:text-gray-800"
                )}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, userType: type }))
                }
              >
                {type === "Client" ? (
                  <Users size={20} />
                ) : (
                  <Handshake size={20} />
                )}
                {type}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <Input
              label="2. Valid Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              error={errors.email}
            />
            <Input
              label="3. Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              error={errors.password}
            />
          </div>
          <div className="mb-6">
            <Input
              label="4. Owner name"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <FileUpload
              label="5. Profile photo"
              name="profilePhoto"
              onChange={handleFileChange}
            />
          </div>
        </div>
      );

    case 2:
      return (
        <div className="step-content">
          <p className="text-primary font-semibold mb-3 text-xs md:text-sm uppercase">
            Basic info
          </p>
          <div className="flex flex-col gap-5 mb-6">
            <Input
              label="1. What is the company name?"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              error={errors.companyName}
            />
            <Input
              label="2. What is the company CR number?"
              name="crNumber"
              placeholder="10 digits"
              value={formData.crNumber}
              onChange={handleChange}
              required
            />
            <Input
              label="3. How many years of experience?"
              name="experienceYears"
              type="number"
              value={formData.experienceYears}
              onChange={handleChange}
              required
            />
            <Input
              label="4. Where is the company located?"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      );

    case 3:
      return (
        <div className="step-content">
          <p className="text-primary font-semibold mb-3 text-xs md:text-sm uppercase">
            Services questions
          </p>

          <div className="mb-6">
            <label className="block text-base md:text-lg font-semibold mb-2 text-[#333]">
              1. Company scope of services *
            </label>
            <div className="flex gap-2 bg-[#ebeef5] p-1 rounded-lg w-fit">
              {(["Services", "Rental", "Materials"] as const).map((scope) => (
                <button
                  key={scope}
                  onClick={() =>
                    setFormData((p) => ({ ...p, serviceScope: scope }))
                  }
                  className={cn(
                    "py-2 px-4 rounded-md font-semibold text-sm transition-all",
                    formData.serviceScope === scope
                      ? "bg-white shadow-sm text-primary"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {scope}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <Select
              label="2. Activities Classification"
              name="activityClassification"
              value={formData.activityClassification}
              onChange={handleChange}
              options={[
                { value: "up", label: "Up stream" },
                { value: "down", label: "Down stream" },
              ]}
              required
            />
            <Select
              label="3. Subcategories"
              name="subCategories"
              value={formData.subCategories}
              onChange={handleChange}
              options={[{ value: "slickline", label: "Slickline" }]}
              required
            />
          </div>
        </div>
      );

    case 4:
      return (
        <div className="step-content">
          <p className="text-primary font-semibold mb-3 text-xs md:text-sm uppercase">
            Contact Details
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <Input
              label="1. Company Email"
              name="companyEmail"
              type="email"
              value={formData.companyEmail}
              onChange={handleChange}
              required
              error={errors.companyEmail}
            />
            <Input
              label="2. Company Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              error={errors.phoneNumber}
            />
          </div>
          <div className="mb-6">
            <Input
              label="3. Website Link"
              name="websiteLink"
              value={formData.websiteLink}
              onChange={handleChange}
            />
          </div>
        </div>
      );

    case 5:
      return (
        <div className="step-content">
          <p className="text-primary font-semibold mb-3 text-xs md:text-sm uppercase">
            Final Step
          </p>

          <div className="mb-6">
            <FileUpload
              label="1. Company Profile Document"
              name="companyProfileDoc"
              onChange={handleFileChange}
              required
              error={errors.companyProfileDoc}
            />
          </div>

          <div className="mb-6 mt-6">
            <label className="block text-base md:text-lg font-semibold mb-3 text-[#333]">
              2. How did you know us? *
            </label>
            <div className="grid grid-cols-2 gap-4">
              {["Social media", "Google search", "Friend", "Other"].map(
                (src) => (
                  <Button
                    key={src}
                    type="button"
                    variant={
                      formData.referralSource === src ? "primary" : "ghost"
                    }
                    className={cn(
                      "py-3 px-4 border-2",
                      formData.referralSource !== src &&
                        "bg-[#ebeef5] text-gray-600 border-transparent"
                    )}
                    onClick={() =>
                      setFormData((p) => ({ ...p, referralSource: src }))
                    }
                  >
                    {src}
                  </Button>
                )
              )}
            </div>
          </div>

          <div className="flex items-start gap-3 mt-6">
            <input
              type="checkbox"
              id="terms"
              name="agreedToTerms"
              checked={formData.agreedToTerms}
              onChange={handleChange}
              className="mt-1 h-4 w-4 accent-primary cursor-pointer"
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-600 cursor-pointer"
            >
              I agree to the{" "}
              <span className="text-primary font-semibold hover:underline">
                Terms
              </span>{" "}
              and{" "}
              <span className="text-primary font-semibold hover:underline">
                Privacy Policy
              </span>
              .
            </label>
          </div>
        </div>
      );

    case 6:
      return (
        <div className="step-content flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <ClipboardCheck size={40} className="text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-dark">
            Review Request
          </h2>
          <p className="text-gray-500 max-w-sm mb-8">
            We will send you an update about your request soon.
          </p>
        </div>
      );

    default:
      return null;
  }
};
