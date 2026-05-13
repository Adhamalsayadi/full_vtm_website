"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (status: string) => void;
  currentStatus: string;
  options: string[];
  title?: string;
  label?: string;
}

export default function EditStatusModal({
  isOpen,
  onClose,
  onUpdate,
  currentStatus,
  options,
  title = "Edit Status",
  label = "Status"
}: EditStatusModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      <div 
        className="absolute inset-0 bg-black/5 backdrop-blur-[2px]" 
        onClick={onClose} 
      />

<div className="relative bg-white w-full max-w-[480px] rounded-[24px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-[#F2F4F7] overflow-hidden animate-in fade-in zoom-in duration-300">

<div className="p-8 pb-4 flex justify-center items-center relative">
          <h3 className="text-[20px] font-bold text-[#1D1F24]">{title}</h3>
          <button 
            onClick={onClose} 
            className="absolute right-6 top-6 p-2 hover:bg-[#F9FAFB] rounded-full transition-colors text-[#999]"
          >
            <X size={24} />
          </button>
        </div>

<div className="px-10 py-6">
          <div className="relative mt-4">
            
            <div className="absolute -top-3 left-6 px-3 bg-white">
               <span className="text-[11px] font-bold text-[#999] uppercase tracking-wider">{label}</span>
            </div>
            
            <div className="border border-[#EAECF0] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                <select 
                  defaultValue={currentStatus}
                  className="w-full px-6 py-5 bg-white text-sm font-bold text-[#1D1F24] outline-none appearance-none cursor-pointer"
                  onChange={(e) => {
                    
                  }}
                  id="status-select"
                >
                  {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                
            </div>
          </div>
        </div>

<div className="p-10 pt-4 flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-4 border border-[#EAECF0] rounded-xl text-sm font-black text-[#999] uppercase tracking-widest hover:bg-[#F9FAFB] transition-all"
          >
            CANCEL
          </button>
          <button 
            onClick={() => {
              const select = document.getElementById('status-select') as HTMLSelectElement;
              onUpdate(select.value);
              onClose();
            }}
            className="flex-1 py-4 bg-[#0A1145] text-white rounded-xl text-sm font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg"
          >
            UPDATE
          </button>
        </div>
      </div>
    </div>
  );
}
