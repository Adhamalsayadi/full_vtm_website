import { useState, ChangeEvent, useMemo } from "react";
import { SignUpFormData, FormErrors } from "@/types/users";
import { registerUser } from "@/lib/api/auth/register/signup";

const CLIENT_STEPS = [
  "User info",
  "Basic info",
  "Services question",
  "Contact Details",
  "Final Step",
];
const SUPPLIER_STEPS = [
  "User info",
  "Basic info",
  "Services question",
  "Contact Details",
  "Final Step",
];

interface UseSignUpFormReturn {
  step: number;
  steps: string[];
  formData: SignUpFormData;
  isLoading: boolean;
  errors: FormErrors;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<SignUpFormData>>;
  nextStep: () => void;
  prevStep: () => void;
  submitForm: () => Promise<{ success: boolean; error?: string }>;
}

export const useSignUpForm = (): UseSignUpFormReturn => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<SignUpFormData>({
    userType: "Client",
    email: "",
    password: "",
    ownerName: "",
    profilePhoto: null,

    // Basic info — Client
    companyName: "",
    crNumber: "",
    experienceYears: "",
    location: "",

    // Basic info — Supplier extras
    companyAddress: "",
    countryOfCompany: "",
    countryOfRegression: "",
    dateOfRegistration: "",
    numberOfRegistration: "",

    // Services step
    serviceScope: "",
    activityClassification: [],
    subCategories: [],
    customActivity: "",
    customSubCategory: "",

    // Contact step
    companyEmail: "",
    phoneNumber: "",
    websiteLink: "",

    ownerSection: { name: "", tel: "", email: "" },
    directorsSection: { name: "", tel: "", email: "" },
    financialSection: { name: "", tel: "", email: "" },
    commercialSection: { name: "", tel: "", email: "" },
    afterHoursSection: { name: "", tel: "", email: "" },
    qhseSection: { name: "", tel: "", email: "" },

    // Final step
    profileNumber: "",
    companyBranch: "",
    companyBackgroundWhen: "",
    companyBackgroundWhere: "",
    premisesArea: [],
    howYouKnowUs: "",
    referralCode: "",

    // Legacy / API compat
    companyProfileDoc: null,
    referralSource: "",
    agreedToTerms: false,
  });

  const steps = useMemo(() => {
    return formData.userType === "Client" ? CLIENT_STEPS : SUPPLIER_STEPS;
  }, [formData.userType]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const val = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: FormErrors = {};
    const isSupplier = formData.userType === "Supplier";

    if (currentStep === 1) {
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.password) newErrors.password = "Password is required";
      if (!formData.ownerName) newErrors.ownerName = "Owner name is required";
    }

    if (currentStep === 2) {
      if (!formData.companyName)
        newErrors.companyName = "Company name is required";

      if (isSupplier) {
        if (!formData.companyAddress)
          newErrors.companyAddress = "Company address is required";
        if (!formData.countryOfCompany)
          newErrors.countryOfCompany = "Country is required";
        if (!formData.countryOfRegression)
          newErrors.countryOfRegression = "Country of regression is required";
        if (!formData.dateOfRegistration)
          newErrors.dateOfRegistration = "Date of registration is required";
        if (!formData.numberOfRegistration)
          newErrors.numberOfRegistration = "Registration number is required";
      } else {
        if (!formData.crNumber) newErrors.crNumber = "CR number is required";
        if (!formData.experienceYears)
          newErrors.experienceYears = "Experience is required";
        if (!formData.location) newErrors.location = "Location is required";
      }
    }

    if (currentStep === 3) {
      if (!formData.serviceScope)
        newErrors.serviceScope = "Please select a service category";

      if (formData.activityClassification.length === 0) {
        newErrors.activityClassification = "Classification is required";
      }

      const hasOtherActivity = formData.activityClassification.includes("other");
      if (hasOtherActivity && !formData.customActivity) {
        newErrors.customActivity = "Please specify the activity";
      }
    }

    if (currentStep === 4) {
      if (!formData.companyEmail)
        newErrors.companyEmail = "Company email is required";
    }

    if (currentStep === 5) {
      if (!formData.profileNumber)
        newErrors.profileNumber = "Profile number is required";
      if (!formData.companyBranch)
        newErrors.companyBranch = "Company branch is required";
      if (!formData.howYouKnowUs)
        newErrors.howYouKnowUs = "Please select how you know us";
      if (!formData.agreedToTerms)
        newErrors.agreedToTerms = "You must agree to terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const submitForm = async (): Promise<{
    success: boolean;
    error?: string;
  }> => {
    if (!validateStep(step))
      return { success: false, error: "Validation failed" };

    setIsLoading(true);

    try {
      const result = await registerUser(formData);

      if (result.success) {
        setStep(6);
        return { success: true };
      } else {
        setErrors({ api: result.message });
        return { success: false, error: result.message };
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      setErrors({ api: message });
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    step,
    steps,
    formData,
    isLoading,
    errors,
    handleChange,
    setFormData,
    nextStep,
    prevStep,
    submitForm,
  };
};
