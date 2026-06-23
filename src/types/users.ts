export interface SignUpFormData {
  userType: "Client" | "Supplier";
  email: string;
  password: string;
  ownerName: string;
  profilePhoto: File | null;

  // Basic info — Client
  companyName: string;
  crNumber: string;
  experienceYears: string;
  location: string;

  // Basic info — Supplier (extra fields)
  companyAddress: string;
  countryOfCompany: string;
  countryOfRegression: string;
  dateOfRegistration: string;
  numberOfRegistration: string;

  // Services step
  serviceScope: string;
  activityClassification: string[];
  subCategories: string[];
  customActivity: string;
  customSubCategory: string;

  // Contact step
  companyEmail: string;
  phoneNumber: string;
  websiteLink: string;

  ownerSection: { name: string; tel: string; email: string };
  directorsSection: { name: string; tel: string; email: string };
  financialSection: { name: string; tel: string; email: string };
  commercialSection: { name: string; tel: string; email: string };
  afterHoursSection: { name: string; tel: string; email: string };
  qhseSection: { name: string; tel: string; email: string };

  // Final step (both)
  profileNumber: string;
  companyBranch: string;
  companyBackgroundWhen: string;
  companyBackgroundWhere: string;
  premisesArea: string[];
  howYouKnowUs: string;
  referralCode: string;

  // Old fields kept for API compat
  companyProfileDoc: File | null;
  referralSource: string;
  agreedToTerms: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

export interface ServiceItem {
  id?: string;
  label: string;
  icon: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "Client" | "Supplier" | "Admin" | "SuperAdmin" | "SubAdmin" | "Marketer";
  phone?: string;
  avatar?: string;
  status?: "active" | "pending" | "inactive";
}

export interface Marketer extends User {
  role: "Admin"; 
  clientsManaged?: string[];
}
