import { axiosInstance } from "@/lib/api/axios";
import { SignUpFormData } from "@/types/users";

const USE_REAL_API = false;

export async function registerUser(
  formData: SignUpFormData
): Promise<{ success: boolean; message: string }> {

const payload = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    if (value instanceof File) {
      payload.append(key, value);
    } else if (typeof value === "boolean") {
      payload.append(key, String(value));
    } else if (value) {
      payload.append(key, value as string);
    }
  });

if (!USE_REAL_API) {
    console.log("--- [MOCK] Registration Data ---");

for (let [key, value] of payload.entries()) {
      if (value instanceof File) {
        console.log(`${key}: [File] ${value.name}`);
      } else {
        console.log(`${key}:`, value);
      }
    }

await new Promise((resolve) => setTimeout(resolve, 1500));

return { success: true, message: "User registered successfully (Mock)" };
  }

try {
    const response = await axiosInstance.post("/api/v1/auth/register", payload, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });

    return { success: true, message: response.data.message };
  } catch (error) {
    console.error("[registerUser] API error:", error);
    return { success: false, message: "Registration failed" };
  }
}
