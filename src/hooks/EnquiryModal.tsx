"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Enquiry } from "@/types/enquiries";
import { submitAction } from "@/actions/actionbutton";
import { useAuthStore } from "@/store/authStore";
interface EnquiryModalProps {
  enquiry: Enquiry;
  onClose: () => void;
  onOpenRating: () => void;
  onSubmitRfq: () => void;
}

export default function EnquiryModal({
  enquiry,
  onClose,
  onOpenRating,
  onSubmitRfq,
}: EnquiryModalProps) {
  const user = useAuthStore((state) => state.user);
  const tableRows = [
    {
      leftL: "title",
      leftV: enquiry.title,
      rightL: "request type",
      rightV: enquiry.requestType,
      isTag: true,
    },
    {
      leftL: "required_date",
      leftV: enquiry.requiredDate,
      rightL: "enquiry_status",
      rightV: enquiry.enquiryStatus,
    },
    {
      leftL: "category",
      leftV: enquiry.categoryLabel || enquiry.category || "-",
      rightL: "sub category",
      rightV: enquiry.subCategoryLabel || enquiry.subCategory || "-",
    },
    {
      leftL: "quantity",
      leftV: enquiry.quantity.toString(),
      rightL: "purpose",
      rightV: enquiry.purpose,
    },
    {
      leftL: "enquiry eta",
      leftV: enquiry.enquiryEta,
      rightL: "standard",
      rightV: enquiry.standard,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-[9999] p-4 font-outfit">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#E9EDF7] w-full max-w-[700px] max-h-[95vh] rounded-[24px] p-5 md:p-8 relative shadow-2xl overflow-y-auto md:overflow-visible"
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 md:-top-3 md:-left-3 bg-black text-white w-9 h-9 rounded-[10px] flex items-center justify-center z-50 shadow-lg active:scale-90 transition-transform"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex flex-col">
          <h2 className="text-[26px] md:text-[36px] font-medium text-[#1A1A1A] mt-8 md:mt-0 mb-5 md:mb-6 leading-tight tracking-tight text-center md:text-left">
            {enquiry.title}
          </h2>

          <div className="flex flex-col md:grid md:grid-cols-[1fr_240px] gap-6 md:gap-8 items-center mb-6">
            <div className="flex flex-col items-center w-full">
              <div className="flex items-center gap-3 md:gap-4">
                <button className="text-black/60 hover:text-black">
                  <svg
                    className="w-6 h-6 md:w-7 md:h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <div className="w-[140px] h-[140px] xs:w-[160px] xs:h-[160px] md:w-[190px] md:h-[190px] rounded-full overflow-hidden shadow-lg relative border-none">
                  <Image
                    src={enquiry.image || "/placeholder.jpg"}
                    alt={enquiry.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <button className="text-black/60 hover:text-black">
                  <svg
                    className="w-6 h-6 md:w-7 md:h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex gap-1.5 mt-3">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                <div className="w-1.5 h-1.5 rounded-full bg-black" />
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full max-w-[300px] md:max-w-none mx-auto">
              <div className="w-full h-auto min-h-10 bg-[#F4D361] rounded-[8px] flex flex-col justify-center px-4 py-2 text-[12px] shadow-sm">
                <span className="font-medium text-black/50 text-[10px] uppercase tracking-wider">Required date</span>
                <span className="font-bold text-black/80 mt-0.5">
                  {enquiry.requiredDate
                    ? new Date(enquiry.requiredDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </span>
              </div>

              {user?.role !== "Marketer" && (
                <button
                  onClick={onOpenRating}
                  className="w-full h-10 bg-[#F4D361] rounded-[8px] flex items-center justify-between px-4 text-[12px] font-semibold text-black/70 shadow-sm hover:brightness-95 transition-all"
                >
                  <span>Seller rating</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </button>
              )}
              {(user?.role === "Supplier" || !user) && (
                <form action={submitAction}>
                  <button className="w-full h-[52px] md:h-[58px] bg-[#F4D361] rounded-[10px] font-bold text-[18px] md:text-[20px] text-black shadow-md hover:scale-[0.98] transition-all mt-1">
                    Submit your price
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="bg-[#D9D9D9]/25 rounded-[15px] overflow-hidden border border-gray-300/30">
            {tableRows.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-2 md:grid-cols-[120px_1fr_120px_1fr] border-b border-gray-300/30 last:border-none min-h-[40px]"
              >
                <div className="p-3 text-[11px] text-gray-500 font-medium border-r border-gray-300/30 flex items-center bg-white/10">
                  {row.leftL}
                </div>
                <div className="p-3 text-[11px] text-black font-bold border-r md:border-r border-gray-300/30 flex items-center truncate">
                  {row.leftV}
                </div>
                <div className="p-3 text-[11px] text-gray-500 font-medium border-r border-gray-300/30 flex items-center bg-white/10">
                  {row.rightL}
                </div>
                <div className="p-3 text-[11px] text-black font-bold flex items-center truncate gap-2">
                  {row.isTag ? (
                    <span className="bg-[#B7EFC5] text-[#1B4332] px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-tight">
                      {row.rightV}
                    </span>
                  ) : (
                    row.rightV
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
