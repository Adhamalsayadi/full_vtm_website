import { axiosInstance } from "@/lib/api/axios";
import { User } from "@/types/users";

export interface LoginResponse {
  success: boolean;
  message: string;
  role?: "Client" | "Supplier" | "Admin" | "SuperAdmin" | "SubAdmin";
  user?: User;
  token?: string;
}

const USE_REAL_API = false;

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  
  if (USE_REAL_API) {
    try {
      const { data } = await axiosInstance.post<LoginResponse>(
        "/api/v1/auth/login",
        { email, password }
      );
      return data;
    } catch (error) {
      console.error("[loginUser] API error:", error);
      return { success: false, message: "Login failed. Please try again." };
    }
  }

await new Promise((resolve) => setTimeout(resolve, 1000));

  if (email === "super@vnt.com" && password === "super") {
    return {
      success: true,
      message: "Login successful",
      role: "SuperAdmin",
      token: "mock-token-super",
      user: { id: "super-1", name: "Super Admin", email, role: "SuperAdmin" },
    };
  }

  if (email === "vtm@vnt.com" && password === "vtm") {
    return {
      success: true,
      message: "Login successful",
      role: "SubAdmin",
      token: "mock-token-vtm",
      user: { id: "vtm-1", name: "VTM Controller", email, role: "SubAdmin" },
    };
  }

  if (email === "mock@m.com" && password === "mock") {
    return {
      success: true,
      message: "Login successful",
      role: "Client",
      token: "mock-token-client",
      user: { id: "1", name: "mock Client", email, role: "Client", phone: "" },
    };
  }

  if (email === "mocks@m.com" && password === "mock") {
    return {
      success: true,
      message: "Login successful",
      role: "Supplier",
      token: "mock-token-supplier",
      user: {
        id: "2",
        name: "mock Supplier",
        email,
        role: "Supplier",
        phone: "",
      },
    };
  }

  if (email === "mockm@m.com" && password === "mock") {
    return {
      success: true,
      message: "Login successful",
      role: "Admin",
      token: "mock-token-marketer",
      user: {
        id: "3",
        name: "mock Marketer",
        email,
        role: "Admin",
        phone: "",
      },
    };
  }

  return { success: false, message: "Invalid email or password" };
}
