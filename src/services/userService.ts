import { axiosInstance } from "@/lib/api/axios";
import { User, Marketer } from "@/types/users";

const USE_REAL_API = false;

const mockClients: User[] = [
  {
    id: "c-1",
    name: "Client One",
    email: "client1@example.com",
    role: "Client",
    status: "active",
  },
  {
    id: "c-2",
    name: "Client Two",
    email: "client2@example.com",
    role: "Client",
    status: "pending",
  },
  {
    id: "c-3",
    name: "Client Three",
    email: "client3@example.com",
    role: "Client",
    status: "inactive",
  },
];

const mockSuppliers: User[] = [
  {
    id: "s-1",
    name: "Supplier One",
    email: "supplier1@example.com",
    role: "Supplier",
    status: "active",
  },
  {
    id: "s-2",
    name: "Supplier Two",
    email: "supplier2@example.com",
    role: "Supplier",
    status: "pending",
  },
  {
    id: "s-3",
    name: "Supplier Three",
    email: "supplier3@example.com",
    role: "Supplier",
    status: "active",
  },
];

const mockMarketers: Marketer[] = [
  {
    id: "m-1",
    name: "Marketer One",
    email: "marketer1@example.com",
    role: "Admin",
    status: "active",
    clientsManaged: ["c-1", "c-2"],
  },
  {
    id: "m-2",
    name: "Marketer Two",
    email: "marketer2@example.com",
    role: "Admin",
    status: "active",
    clientsManaged: ["c-3"],
  },
];

let mockClientsStore: User[] = [...mockClients];
let mockSuppliersStore: User[] = [...mockSuppliers];
let mockMarketersStore: Marketer[] = [...mockMarketers];

export const userService = {
  getClients: async (): Promise<User[]> => {
    if (USE_REAL_API) {
      try {
        const { data } = await axiosInstance.get<{ items: User[] }>(
          "/api/v1/users",
          { params: { role: "Client" } }
        );
        return data.items;
      } catch (error) {
        console.error("[userService.getClients] API error:", error);
        return [];
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 400));
    return [...mockClientsStore];
  },

  getSuppliers: async (): Promise<User[]> => {
    if (USE_REAL_API) {
      try {
        const { data } = await axiosInstance.get<{ items: User[] }>(
          "/api/v1/users",
          { params: { role: "Supplier" } }
        );
        return data.items;
      } catch (error) {
        console.error("[userService.getSuppliers] API error:", error);
        return [];
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 400));
    return [...mockSuppliersStore];
  },

  getMarketers: async (): Promise<Marketer[]> => {
    if (USE_REAL_API) {
      try {
        const { data } = await axiosInstance.get<{ items: Marketer[] }>(
          "/api/v1/users",
          { params: { role: "Admin" } }
        );
        return data.items;
      } catch (error) {
        console.error("[userService.getMarketers] API error:", error);
        return [];
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 400));
    return [...mockMarketersStore];
  },

  updateStatus: async (id: string, status: string): Promise<void> => {
    if (USE_REAL_API) {
      try {
        await axiosInstance.patch(`/api/v1/users/${id}/status`, { status });
      } catch (error) {
        console.error("[userService.updateStatus] API error:", error);
        throw error;
      }
      return;
    }
    
    await new Promise((resolve) => setTimeout(resolve, 250));
    const applyStatus = (store: User[]) =>
      store.map((u) =>
        u.id === id
          ? { ...u, status: status as User["status"] }
          : u
      );
    mockClientsStore = applyStatus(mockClientsStore) as User[];
    mockSuppliersStore = applyStatus(mockSuppliersStore) as User[];
    mockMarketersStore = applyStatus(mockMarketersStore) as Marketer[];
  },
};
