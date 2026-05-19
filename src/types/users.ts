export interface SignUpFormData {
  userType: "Client" | "Supplier";
  email: string;
  password: string;
  ownerName: string;
  profilePhoto: File | null;

  companyName: string;
  crNumber: string;
  experienceYears: string;
  location: string;

serviceScope: string;
  activityClassification: string[];
  subCategories: string;

customActivity: string;
  customSubCategory: string;

  companyEmail: string;
  phoneNumber: string;
  websiteLink: string;

ownerSection: { name: string; tel: string; email: string };
  directorsSection: { name: string; tel: string; email: string };
  financialSection: { name: string; tel: string; email: string };
  commercialSection: { name: string; tel: string; email: string };
  afterHoursSection: { name: string; tel: string; email: string };
  qhseSection: { name: string; tel: string; email: string };

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
