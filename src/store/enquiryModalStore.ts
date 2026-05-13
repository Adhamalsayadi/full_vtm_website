import { create } from "zustand";
import { Enquiry } from "@/types/enquiries";

type ModalType = "edit" | "hide" | null;

interface EnquiryModalState {
  activeEnquiry: Enquiry | null;
  modalType: ModalType;
  openModal: (type: "edit" | "hide", enquiry: Enquiry) => void;
  closeModal: () => void;
}

export const useEnquiryModalStore = create<EnquiryModalState>((set) => ({
  activeEnquiry: null,
  modalType: null,
  openModal: (type, enquiry) =>
    set({ activeEnquiry: enquiry, modalType: type }),
  closeModal: () => set({ activeEnquiry: null, modalType: null }),
}));

