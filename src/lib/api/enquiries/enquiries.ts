import { axiosInstance } from "@/lib/api/axios";
import { Enquiry, SellerRating } from "@/types/enquiries";

const USE_REAL_API = false;

const mockEnquiries: Enquiry[] = [
  {
    id: "1",
    title: "Mud Pump Maintenance Contract",
    category: "services",
    categoryLabel: "Services",
    subCategory: "Machines",
    subCategoryLabel: "Machines",
    sellerId: "s-001",
    sellerName: "Alpha Industrial Services",
    time: "today",
    clientRate: 5,
    vtRate: 4,
    image: "/enquiries.png",
    requiredDate: "2024-03-15",
    requestType: "Normal",
    enquiryStatus: "Active",
    quantity: 214,
    purpose: "Maintenance and operational support for mud pump systems",
    enquiryEta: "30 days",
    standard: "ISO 9001",
    offersReceived: true,
  },
  {
    id: "2",
    title: "Safety Gloves Bulk Supply",
    category: "products",
    categoryLabel: "Products",
    subCategory: "Safety Gear",
    subCategoryLabel: "Safety Gear",
    sellerId: "s-002",
    sellerName: "SafeLine Trading",
    time: "this month",
    clientRate: 3,
    vtRate: 5,
    image: "/enquiries.png",
    requiredDate: "2024-03-20",
    requestType: "Bulk Order",
    enquiryStatus: "Pending",
    quantity: 5000,
    purpose: "Personal protective equipment for field operations",
    enquiryEta: "14 days",
    standard: "EN 388",
    offersReceived: true,
  },
  {
    id: "3",
    title: "Crew Transportation to Site",
    category: "services",
    categoryLabel: "Services",
    subCategory: "transportation",
    subCategoryLabel: "Transportation",
    sellerId: "s-003",
    sellerName: "Rapid Move Logistics",
    time: "today",
    clientRate: 4,
    vtRate: 4,
    image: "/enquiries.png",
    requiredDate: "2024-03-10",
    requestType: "Recurring Service",
    enquiryStatus: "Active",
    quantity: 450,
    purpose: "Weekly crew transportation for offshore operations",
    enquiryEta: "7 days",
    standard: "STANDARD",
    offersReceived: true,
  },
  {
    id: "4",
    title: "Forklift Rental - 3 Months",
    category: "rental",
    categoryLabel: "Rental",
    subCategory: "Equipment Rental",
    subCategoryLabel: "Equipment Rental",
    sellerId: "s-004",
    sellerName: "LiftPro Rental",
    time: "this week",
    clientRate: 5,
    vtRate: 5,
    image: "/enquiries.png",
    requiredDate: "2024-03-18",
    requestType: "Long Term Rental",
    enquiryStatus: "Active",
    quantity: 5,
    purpose: "Material handling and warehouse operations",
    enquiryEta: "Immediate",
    standard: "STANDARD",
    offersReceived: true,
  },
  {
    id: "5",
    title: "Welding Fabrication Team",
    category: "services",
    categoryLabel: "Services",
    subCategory: "welding services",
    subCategoryLabel: "Welding Services",
    sellerId: "s-001",
    sellerName: "Alpha Industrial Services",
    time: "this week",
    clientRate: 4,
    vtRate: 4,
    image: "/enquiries.png",
    requiredDate: "2024-03-22",
    requestType: "Project Based",
    enquiryStatus: "Active",
    quantity: 120,
    purpose: "Structural welding and fabrication services",
    enquiryEta: "45 days",
    standard: "AWS D1.1",
    offersReceived: true,
  },
  {
    id: "6",
    title: "Heavy Truck Rental",
    category: "rental",
    categoryLabel: "Rental",
    subCategory: "Trucks",
    subCategoryLabel: "Trucks",
    sellerId: "s-005",
    sellerName: "RoadFleet Rentals",
    time: "this month",
    clientRate: 3,
    vtRate: 4,
    image: "/enquiries.png",
    requiredDate: "2024-03-25",
    requestType: "Short Term",
    enquiryStatus: "Pending",
    quantity: 12,
    purpose: "Heavy equipment transportation",
    enquiryEta: "3 days",
    standard: "STANDARD",
    offersReceived: false,
  },
  {
    id: "7",
    title: "Technician Manpower Request",
    category: "manpower",
    categoryLabel: "Man power",
    subCategory: "Technicians",
    subCategoryLabel: "Technicians",
    sellerId: "s-006",
    sellerName: "SkilledCrew Co.",
    time: "today",
    clientRate: 5,
    vtRate: 5,
    image: "/enquiries.png",
    requiredDate: "2024-03-12",
    requestType: "Contract Staffing",
    enquiryStatus: "Active",
    quantity: 15,
    purpose: "Skilled technicians for offshore platform maintenance",
    enquiryEta: "Immediate",
    standard: "STANDARD",
    offersReceived: true,
  },
  {
    id: "8",
    title: "Inspection and Testing Package",
    category: "services",
    categoryLabel: "Services",
    subCategory: "inspection & testing",
    subCategoryLabel: "Inspection & Testing",
    sellerId: "s-003",
    sellerName: "Rapid Move Logistics",
    time: "this month",
    clientRate: 4,
    vtRate: 3,
    image: "/enquiries.png",
    requiredDate: "2024-03-28",
    requestType: "One Time",
    enquiryStatus: "Pending",
    quantity: 1,
    purpose: "Comprehensive inspection and testing of equipment",
    enquiryEta: "21 days",
    standard: "ISO 17025",
    offersReceived: true,
  },
  {
    id: "9",
    title: "Office Supplies Framework",
    category: "products",
    categoryLabel: "Products",
    subCategory: "Office Supplies",
    subCategoryLabel: "Office Supplies",
    sellerId: "s-002",
    sellerName: "SafeLine Trading",
    time: "today",
    clientRate: 2,
    vtRate: 4,
    image: "/enquiries.png",
    requiredDate: "2024-04-01",
    requestType: "Framework Agreement",
    enquiryStatus: "Active",
    quantity: 200,
    purpose: "Office supplies and stationery on annual basis",
    enquiryEta: "Ongoing",
    standard: "STANDARD",
    offersReceived: true,
  },
  {
    id: "10",
    title: "Site Supervisor Staffing",
    category: "manpower",
    categoryLabel: "Man power",
    subCategory: "Supervisors",
    subCategoryLabel: "Supervisors",
    sellerId: "s-006",
    sellerName: "SkilledCrew Co.",
    time: "this month",
    clientRate: 4,
    vtRate: 5,
    image: "/enquiries.png",
    requiredDate: "2024-03-16",
    requestType: "Long Term Contract",
    enquiryStatus: "Active",
    quantity: 8,
    purpose: "Site supervisors for construction projects",
    enquiryEta: "5 days",
    standard: "STANDARD",
    offersReceived: true,
  },
  {
    id: "11",
    title: "Drilling Equipment Package",
    category: "rental",
    categoryLabel: "Rental",
    subCategory: "Heavy Machines",
    subCategoryLabel: "Heavy Machines",
    sellerId: "s-004",
    sellerName: "LiftPro Rental",
    time: "this month",
    clientRate: 3,
    vtRate: 5,
    image: "/enquiries.png",
    requiredDate: "2024-04-05",
    requestType: "Equipment Lease",
    enquiryStatus: "Pending",
    quantity: 3,
    purpose: "Complete drilling rig with accessories",
    enquiryEta: "60 days",
    standard: "STANDARD",
    offersReceived: false,
  },
  {
    id: "12",
    title: "Pipeline Valves Consignment",
    category: "products",
    categoryLabel: "Products",
    subCategory: "Valves",
    subCategoryLabel: "Valves",
    sellerId: "s-002",
    sellerName: "SafeLine Trading",
    time: "today",
    clientRate: 5,
    vtRate: 4,
    image: "/enquiries.png",
    requiredDate: "2024-03-30",
    requestType: "Emergency Supply",
    enquiryStatus: "Active",
    quantity: 85,
    purpose: "Industrial grade pipeline valves",
    enquiryEta: "10 days",
    standard: "API 600",
    offersReceived: true,
  },
].map((enquiry, index) => ({
  ...enquiry,
  createdByUserId: index % 2 === 0 ? "1" : "2",
  createdByUserName: index % 2 === 0 ? "m" : "Demo Client",
  isHidden: false,
  
  vtmStatus: index % 3 === 0 ? "pending" : "approved",
  adminStatus: index % 4 === 0 ? "pending" : "approved",
}));

let mockEnquiriesStore: Enquiry[] = [...mockEnquiries];

const mockSellerRatings: Record<string, SellerRating> = {
  "s-001": {
    sellerId: "s-001",
    overall: 4.4,
    criteria: [
      { code: "evaluation", label: "Evaluation category", score: 4 },
      { code: "premises", label: "Premises size", score: 4 },
      { code: "insurance", label: "Insurance", score: 4 },
      { code: "accreditations", label: "Accreditations", score: 4 },
      { code: "financial", label: "Financial capability", score: 4 },
      { code: "vendor", label: "Vender with major clients", score: 5 },
      { code: "personnel", label: "Personnel and qualification", score: 4.5 },
      { code: "manpower", label: "Manpower availability", score: 4.3 },
      { code: "development", label: "Personnel Development", score: 4.2 },
      { code: "localization", label: "Localization", score: 4.1 },
      { code: "quality", label: "Quality", score: 4.2 },
      { code: "safety", label: "Safety", score: 4.6 },
      { code: "environmental", label: "Environmental", score: 4.4 },
      { code: "manufacturing", label: "Manufacturing and process", score: 4.3 },
      { code: "supply", label: "Supply chain Management", score: 4.3 },
      { code: "material", label: "Material control", score: 4.2 },
      { code: "customer", label: "Customer satisfactory program", score: 4.4 },
    ],
  },
  "s-002": {
    sellerId: "s-002",
    overall: 4.1,
    criteria: [
      { code: "evaluation", label: "Evaluation category", score: 4 },
      { code: "premises", label: "Premises size", score: 4 },
      { code: "insurance", label: "Insurance", score: 4 },
      { code: "accreditations", label: "Accreditations", score: 3 },
      { code: "financial", label: "Financial capability", score: 4 },
      { code: "vendor", label: "Vender with major clients", score: 3 },
      { code: "personnel", label: "Personnel and qualification", score: 4.0 },
      { code: "manpower", label: "Manpower availability", score: 3.9 },
      { code: "development", label: "Personnel Development", score: 3.8 },
      { code: "localization", label: "Localization", score: 4.2 },
      { code: "quality", label: "Quality", score: 4.2 },
      { code: "safety", label: "Safety", score: 4.0 },
      { code: "environmental", label: "Environmental", score: 4.1 },
      { code: "manufacturing", label: "Manufacturing and process", score: 4.0 },
      { code: "supply", label: "Supply chain Management", score: 3.9 },
      { code: "material", label: "Material control", score: 4.0 },
      { code: "customer", label: "Customer satisfactory program", score: 4.1 },
    ],
  },
  "s-003": {
    sellerId: "s-003",
    overall: 3.8,
    criteria: [
      { code: "evaluation", label: "Evaluation category", score: 3 },
      { code: "premises", label: "Premises size", score: 3 },
      { code: "insurance", label: "Insurance", score: 3 },
      { code: "accreditations", label: "Accreditations", score: 3 },
      { code: "financial", label: "Financial capability", score: 4 },
      { code: "vendor", label: "Vender with major clients", score: 4 },
      { code: "personnel", label: "Personnel and qualification", score: 3.9 },
      { code: "manpower", label: "Manpower availability", score: 3.6 },
      { code: "development", label: "Personnel Development", score: 3.8 },
      { code: "localization", label: "Localization", score: 3.8 },
      { code: "quality", label: "Quality", score: 3.7 },
      { code: "safety", label: "Safety", score: 3.9 },
      { code: "environmental", label: "Environmental", score: 3.9 },
      { code: "manufacturing", label: "Manufacturing and process", score: 3.8 },
      { code: "supply", label: "Supply chain Management", score: 3.7 },
      { code: "material", label: "Material control", score: 3.8 },
      { code: "customer", label: "Customer satisfactory program", score: 3.7 },
    ],
  },
  "s-004": {
    sellerId: "s-004",
    overall: 4.7,
    criteria: [
      { code: "evaluation", label: "Evaluation category", score: 5 },
      { code: "premises", label: "Premises size", score: 5 },
      { code: "insurance", label: "Insurance", score: 5 },
      { code: "accreditations", label: "Accreditations", score: 5 },
      { code: "financial", label: "Financial capability", score: 5 },
      { code: "vendor", label: "Vender with major clients", score: 5 },
      { code: "personnel", label: "Personnel and qualification", score: 4.8 },
      { code: "manpower", label: "Manpower availability", score: 4.7 },
      { code: "development", label: "Personnel Development", score: 4.6 },
      { code: "localization", label: "Localization", score: 4.7 },
      { code: "quality", label: "Quality", score: 4.8 },
      { code: "safety", label: "Safety", score: 4.9 },
      { code: "environmental", label: "Environmental", score: 4.8 },
      { code: "manufacturing", label: "Manufacturing and process", score: 4.5 },
      { code: "supply", label: "Supply chain Management", score: 4.7 },
      { code: "material", label: "Material control", score: 4.6 },
      { code: "customer", label: "Customer satisfactory program", score: 4.8 },
    ],
  },
  "s-005": {
    sellerId: "s-005",
    overall: 3.9,
    criteria: [
      { code: "evaluation", label: "Evaluation category", score: 4 },
      { code: "premises", label: "Premises size", score: 4 },
      { code: "insurance", label: "Insurance", score: 4 },
      { code: "accreditations", label: "Accreditations", score: 3 },
      { code: "financial", label: "Financial capability", score: 4 },
      { code: "vendor", label: "Vender with major clients", score: 4 },
      { code: "personnel", label: "Personnel and qualification", score: 4.0 },
      { code: "manpower", label: "Manpower availability", score: 3.9 },
      { code: "development", label: "Personnel Development", score: 3.8 },
      { code: "localization", label: "Localization", score: 3.9 },
      { code: "quality", label: "Quality", score: 3.8 },
      { code: "safety", label: "Safety", score: 3.9 },
      { code: "environmental", label: "Environmental", score: 3.9 },
      { code: "manufacturing", label: "Manufacturing and process", score: 3.9 },
      { code: "supply", label: "Supply chain Management", score: 4.0 },
      { code: "material", label: "Material control", score: 3.9 },
      { code: "customer", label: "Customer satisfactory program", score: 3.8 },
    ],
  },
  "s-006": {
    sellerId: "s-006",
    overall: 4.3,
    criteria: [
      { code: "evaluation", label: "Evaluation category", score: 4 },
      { code: "premises", label: "Premises size", score: 4 },
      { code: "insurance", label: "Insurance", score: 4 },
      { code: "accreditations", label: "Accreditations", score: 4 },
      { code: "financial", label: "Financial capability", score: 4 },
      { code: "vendor", label: "Vender with major clients", score: 4 },
      { code: "personnel", label: "Personnel and qualification", score: 4.4 },
      { code: "manpower", label: "Manpower availability", score: 4.3 },
      { code: "development", label: "Personnel Development", score: 4.2 },
      { code: "localization", label: "Localization", score: 4.3 },
      { code: "quality", label: "Quality", score: 4.3 },
      { code: "safety", label: "Safety", score: 4.4 },
      { code: "environmental", label: "Environmental", score: 4.2 },
      { code: "manufacturing", label: "Manufacturing and process", score: 4.2 },
      { code: "supply", label: "Supply chain Management", score: 4.3 },
      { code: "material", label: "Material control", score: 4.2 },
      { code: "customer", label: "Customer satisfactory program", score: 4.3 },
    ],
  },
};

export interface FetchEnquiriesParams {
  search?: string;
  category?: string;
  subCategory?: string;
  source?: string;
  time?: string;
  clientRate?: string;
  vtRate?: string;
  page?: number;
  pageSize?: number;
  userId?: string;
  onlyMyEnquiries?: boolean;
  includeHidden?: boolean;
}

export interface UpdateEnquiryPayload {
  title?: string;
  quantity?: number;
  enquiryStatus?: string;
  category?: string;
  categoryLabel?: string;
  subCategory?: string;
  subCategoryLabel?: string;
  requiredDate?: string;
  requestType?: string;
  purpose?: string;
  enquiryEta?: string;
  standard?: string;
  image?: string;
  vtmStatus?: string;
  adminStatus?: string;
}

export async function createEnquiry(payload: Partial<Enquiry>): Promise<Enquiry> {
  if (USE_REAL_API) {
    try {
      const { data } = await axiosInstance.post("/api/v1/enquiries", payload);
      return data?.item || data?.data || data;
    } catch (error) {
      console.error("[createEnquiry] API error:", error);
      throw error;
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 600));
  const newEnquiry: Enquiry = {
    id: `enq-${Date.now()}`,
    title: payload.title || "Untitled Enquiry",
    category: payload.category || "",
    categoryLabel: payload.categoryLabel || payload.category || "",
    subCategory: payload.subCategory || "",
    subCategoryLabel: payload.subCategoryLabel || payload.subCategory || "",
    sellerId: "",
    sellerName: "",
    time: "just now",
    clientRate: 0,
    vtRate: 0,
    image: payload.image || "/enquiries.png",
    requiredDate: payload.requiredDate || new Date().toISOString().split("T")[0],
    requestType: payload.requestType || "Normal",
    enquiryStatus: "Pending", 
    vtmStatus: "pending",
    adminStatus: "pending",
    quantity: payload.quantity || 1,
    purpose: payload.purpose || "",
    enquiryEta: payload.enquiryEta || "TBD",
    standard: payload.standard || "STANDARD",
    offersReceived: false,
    isHidden: false,
    createdByUserId: payload.createdByUserId || "1",
    createdByUserName: payload.createdByUserName || "Current User",
  };

  mockEnquiriesStore = [newEnquiry, ...mockEnquiriesStore];
  return newEnquiry;
}

export async function fetchEnquiries(
  params: FetchEnquiriesParams
): Promise<{ data: Enquiry[]; total: number }> {
  if (USE_REAL_API) {
    try {
      const { data } = await axiosInstance.get("/api/v1/enquiries", { params });
      return {
        data: data.items || data.data,
        total: data.total,
      };
    } catch (error) {
      console.error("[fetchEnquiries] API error:", error);
      return { data: [], total: 0 };
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 800));

  const filtered = mockEnquiriesStore.filter((item) => {
    const query = params.search?.toLowerCase();
    const searchMatch = query
      ? item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.subCategory.toLowerCase().includes(query) ||
        item.sellerName.toLowerCase().includes(query)
      : true;

    const categoryMatch = params.category
      ? item.category.toLowerCase() === params.category.toLowerCase()
      : true;

    const subCategoryMatch = params.subCategory
      ? item.subCategory.toLowerCase() === params.subCategory.toLowerCase()
      : true;

    const timeMatch = params.time
      ? item.time.toLowerCase() === params.time.toLowerCase()
      : true;
    const clientRateMatch = params.clientRate
      ? item.clientRate >= Number(params.clientRate)
      : true;
    const vtRateMatch = params.vtRate
      ? item.vtRate >= Number(params.vtRate)
      : true;

    const ownerMatch =
      params.onlyMyEnquiries && params.userId
        ? item.createdByUserId === params.userId
        : true;

    const hiddenMatch = params.includeHidden ? true : !item.isHidden;

    return (
      searchMatch &&
      categoryMatch &&
      subCategoryMatch &&
      timeMatch &&
      clientRateMatch &&
      vtRateMatch &&
      ownerMatch &&
      hiddenMatch
    );
  });

  const page = params.page || 1;
  const pageSize = params.pageSize || 10;
  const start = (page - 1) * pageSize;

  return {
    data: filtered.slice(start, start + pageSize),
    total: filtered.length,
  };
}

export async function updateEnquiryById(
  enquiryId: string,
  payload: UpdateEnquiryPayload
): Promise<Enquiry | null> {
  if (USE_REAL_API) {
    try {
      const { data } = await axiosInstance.patch(
        `/api/v1/enquiries/${enquiryId}`,
        payload
      );
      return data?.item || data?.data || data;
    } catch (error) {
      console.error("[updateEnquiryById] API error:", error);
      return null;
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 250));
  const index = mockEnquiriesStore.findIndex((item) => item.id === enquiryId);
  if (index === -1) return null;

  const current = mockEnquiriesStore[index];
  const updated: Enquiry = {
    ...current,
    ...payload,
    vtmStatus: payload.vtmStatus ?? current.vtmStatus,
    adminStatus: payload.adminStatus ?? current.adminStatus,
    enquiryStatus: payload.enquiryStatus ?? current.enquiryStatus,
    quantity: payload.quantity ?? current.quantity,
    title: payload.title ?? current.title,
  };

if (updated.vtmStatus === "approved" && updated.adminStatus === "approved") {
    updated.enquiryStatus = "Accepted"; 
  } else if (updated.vtmStatus === "rejected" || updated.adminStatus === "rejected") {
    updated.enquiryStatus = "Rejected";
  } else {
    updated.enquiryStatus = "Pending";
  }

  mockEnquiriesStore[index] = updated;
  return updated;
}

export async function deleteEnquiryById(enquiryId: string): Promise<boolean> {
  if (USE_REAL_API) {
    try {
      await axiosInstance.delete(`/api/v1/enquiries/${enquiryId}`);
      return true;
    } catch (error) {
      console.error("[deleteEnquiryById] API error:", error);
      return false;
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 250));
  const currentLength = mockEnquiriesStore.length;
  mockEnquiriesStore = mockEnquiriesStore.filter(
    (item) => item.id !== enquiryId
  );
  return mockEnquiriesStore.length < currentLength;
}

export async function toggleEnquiryVisibility(
  enquiryId: string
): Promise<Enquiry | null> {
  if (USE_REAL_API) {
    try {
      const { data } = await axiosInstance.patch(
        `/api/v1/enquiries/${enquiryId}/visibility`
      );
      return data?.item || data?.data || data;
    } catch (error) {
      console.error("[toggleEnquiryVisibility] API error:", error);
      return null;
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 250));
  const index = mockEnquiriesStore.findIndex((item) => item.id === enquiryId);
  if (index === -1) return null;

  const updated: Enquiry = {
    ...mockEnquiriesStore[index],
    isHidden: !mockEnquiriesStore[index].isHidden,
  };

  mockEnquiriesStore[index] = updated;
  return updated;
}

export async function fetchSellerRatingBySellerId(
  sellerId: string
): Promise<SellerRating | null> {
  if (USE_REAL_API) {
    try {
      const { data } = await axiosInstance.get(`/api/v1/sellers/${sellerId}/rating`);
      return data;
    } catch (error) {
      console.error("[fetchSellerRatingBySellerId] API error:", error);
      return null;
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockSellerRatings[sellerId] || null;
}
