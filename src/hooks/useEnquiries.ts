import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteEnquiryById,
  fetchEnquiries,
  FetchEnquiriesParams,
  toggleEnquiryVisibility,
  updateEnquiryById,
  UpdateEnquiryPayload,
  createEnquiry,
} from "@/lib/api/enquiries/enquiries";

export function useEnquiries(params: FetchEnquiriesParams) {
  return useQuery({
    queryKey: ["enquiries", params],
    queryFn: () => fetchEnquiries(params),
    
    enabled: params.onlyMyEnquiries ? !!params.userId : true,
    select: (result) => result.data,
  });
}

export function useUpdateEnquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateEnquiryPayload;
    }) => updateEnquiryById(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["enquiries"] }),
  });
}

export function useDeleteEnquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteEnquiryById(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["enquiries"] }),
  });
}

export function useToggleEnquiryVisibility() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => toggleEnquiryVisibility(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["enquiries"] }),
  });
}

export function useCreateEnquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => createEnquiry(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["enquiries"] }),
  });
}
