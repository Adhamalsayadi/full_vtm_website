"use client";

import { useState, useEffect } from "react";
import { X, AlertTriangle } from "lucide-react";
import Button from "@/components/ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl border border-[#EAECF0] overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-5 border-b border-[#F2F4F7] flex justify-between items-center bg-[#F9FAFB]/50">
          <h3 className="font-bold text-[#101828]">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-colors text-[#667085]">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message,
  confirmText = "Hide",
  variant = "primary"
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  variant?: "danger" | "primary" | "warning";
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col items-center text-center">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${variant === 'danger' ? 'bg-red-50 text-red-600' : 'bg-yellow-50 text-primary'}`}>
          <AlertTriangle size={30} />
        </div>
        <p className="text-[#475467] mb-8 leading-relaxed">
          {message}
        </p>
        <div className="flex gap-3 w-full">
          <Button variant="ghost" className="flex-1" onClick={onClose}>Cancel</Button>
          <Button 
            className={`flex-1 ${variant === 'danger' ? 'bg-red-600 hover:bg-red-700 text-white border-none' : ''}`}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export const EditEnquiryModal = ({
  isOpen,
  onClose,
  enquiry,
  onSave
}: {
  isOpen: boolean;
  onClose: () => void;
  enquiry: any;
  onSave: (data: any) => void;
}) => {
  if (!enquiry) return null;

  const [previewImage, setPreviewImage] = useState<string | null>(enquiry.image || null);

  useEffect(() => {
    setPreviewImage(enquiry.image || null);
  }, [enquiry.image, isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Enquiry">
        <form className="space-y-4 max-h-[70vh] overflow-y-auto px-1 pb-2" onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());

onSave(data);
            onClose();
        }}>
           <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#344054] uppercase tracking-wider">Enquiry Title</label>
              <input 
                name="title"
                defaultValue={enquiry.title}
                className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              />
           </div>

           <div className="space-y-1.5 col-span-2">
              <label className="text-xs font-bold text-[#344054] uppercase tracking-wider">Enquiry Image</label>
              {previewImage && (
                 <div className="mb-2 relative w-32 h-32 rounded-xl border border-[#EAECF0] group overflow-hidden bg-gray-50 flex items-center justify-center">
                    
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => setPreviewImage(null)} 
                      className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow hover:bg-red-50 text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                    >
                       <X size={14} />
                    </button>
                 </div>
              )}
              <div className="relative">
                 <input 
                   type="file" 
                   name="newImage" 
                   accept="image/*"
                   onChange={handleImageChange}
                   className="block w-full text-sm text-[#667085] file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all cursor-pointer border border-[#EAECF0] rounded-xl bg-[#F9FAFB]"
                 />
                 
                 <input type="hidden" name="image" value={typeof previewImage === 'string' ? previewImage : ""} />
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#344054] uppercase tracking-wider">Category</label>
                  <select 
                    name="category"
                    defaultValue={enquiry.category}
                    className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm appearance-none"
                  >
                     <option value="products">Products</option>
                     <option value="services">Services</option>
                     <option value="rental">Rental</option>
                     <option value="manpower">Man power</option>
                  </select>
               </div>
               <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#344054] uppercase tracking-wider">Sub Category</label>
                  <input 
                    name="subCategory"
                    defaultValue={enquiry.subCategory}
                    className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                  />
               </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#344054] uppercase tracking-wider">Quantity</label>
                  <input 
                    name="quantity"
                    type="number"
                    defaultValue={enquiry.quantity}
                    className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                  />
               </div>
               <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#344054] uppercase tracking-wider">Required Date</label>
                  <input 
                    name="requiredDate"
                    type="date"
                    defaultValue={enquiry.requiredDate}
                    className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                  />
               </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#344054] uppercase tracking-wider">Request Type</label>
                  <input 
                    name="requestType"
                    defaultValue={enquiry.requestType}
                    className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                  />
               </div>
               <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#344054] uppercase tracking-wider">Status</label>
                  <select 
                    name="enquiryStatus"
                    defaultValue={enquiry.enquiryStatus}
                    className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm appearance-none text-capitalize"
                  >
                     <option value="Active">Active</option>
                     <option value="Pending">Pending</option>
                     <option value="Closed">Closed</option>
                  </select>
               </div>
           </div>

           <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#344054] uppercase tracking-wider">Purpose</label>
              <textarea 
                name="purpose"
                defaultValue={enquiry.purpose}
                rows={3}
                className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm resize-none"
              />
           </div>

           <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#344054] uppercase tracking-wider">Enquiry ETA</label>
                  <input 
                    name="enquiryEta"
                    defaultValue={enquiry.enquiryEta}
                    className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                  />
               </div>
               <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#344054] uppercase tracking-wider">Standard</label>
                  <input 
                    name="standard"
                    defaultValue={enquiry.standard}
                    className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                  />
               </div>
           </div>

           <div className="pt-2 flex gap-3 sticky bottom-0 bg-white">
              <Button type="button" variant="ghost" className="flex-1" onClick={onClose}>Discard</Button>
              <Button type="submit" className="flex-1">Save Changes</Button>
           </div>
        </form>

    </Modal>
  );
};
