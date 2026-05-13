"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User, Marketer } from "@/types/users";
import { userService } from "@/services/userService";

type UserRole = "Client" | "Supplier" | "Marketer";

export function useUsers(role: UserRole) {
  return useQuery<User[] | Marketer[]>({
    queryKey: ["users", role],
    queryFn: async () => {
      if (role === "Client") return userService.getClients();
      if (role === "Supplier") return userService.getSuppliers();
      return userService.getMarketers();
    },
    staleTime: 1000 * 30, 
  });
}

export function useUpdateUserStatus(role: UserRole) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      userService.updateStatus(id, status),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["users", role] }),
  });
}
