import { create } from "zustand";
import { persist } from "zustand/middleware";
export interface User {
  id: string;
  name: string;
  email: string;
  role: "Client" | "Supplier" | "Admin" | "SuperAdmin" | "SubAdmin" | "Marketer";
  phone?: string;
  avatar?: string;
  status?: "active" | "pending" | "inactive";
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "vt-auth-storage",
    }
  )
);
