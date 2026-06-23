import React from "react";
import Image from "next/image";
import Button from "./button";

interface FileUploadProps {
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  name,
  onChange,
  required,
  error,
}) => (
  <div className="flex flex-col">
    <label className="block text-base md:text-lg font-semibold mb-2 text-[#333]">
      {label} {required && <span className="text-[#ff4d4f]">*</span>}
    </label>
    <div className="border border-dashed border-[#d9d9d9] rounded-lg p-5 md:p-6 bg-[#ebeef5] relative hover:border-primary transition-colors">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Yellow folder icon from public */}
          <div className="w-12 h-12 flex items-center justify-center shrink-0">
            <Image src="/received.png" alt="upload" width={40} height={40} />
          </div>
          <div>
            <p className="text-sm text-[#333] font-semibold">
              Drag &amp; drop files or{" "}
              <span className="text-primary underline cursor-pointer">upload file</span>
            </p>
            <p className="text-[10px] md:text-[11px] text-[#999] mt-1">
              Supported formates: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
            </p>
          </div>
        </div>
        <div className="pointer-events-none shrink-0">
          <Button variant="primary" size="sm">
            Upload
          </Button>
        </div>
      </div>
      <input
        type="file"
        name={name}
        onChange={onChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </div>
    {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
  </div>
);
