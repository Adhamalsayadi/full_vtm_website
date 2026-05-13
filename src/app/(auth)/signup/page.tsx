"use client";

import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import Button from "@/components/ui/button";
import { useSignUpForm } from "@/hooks/useSignUpForm";
import { renderStepContent } from "@/components/signup/StepsContent";

export default function SignupPage() {
  const {
    step,
    steps,
    nextStep,
    prevStep,
    submitForm,
    isLoading,
    errors,
    handleChange,
    setFormData,
    formData,
  } = useSignUpForm();

  const handleNext = async () => {
    if (step === 5) {
      await submitForm();
    } else {
      nextStep();
    }
  };

  const activeNavIndex = Math.min(step, steps.length) - 1;

  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-x-hidden">
      
      <header className="flex justify-between items-center py-4 px-6 md:py-5 md:px-10 absolute top-0 w-full z-20">
        <Link href="/">
          <Image src="/VT.png" alt="V&T Logo" width={50} height={35} />
        </Link>
        <Link href="/login">
          <Button variant="primary" size="sm">
            Log in
          </Button>
        </Link>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 relative pt-[80px] md:pt-[100px]">
        
        <div className="w-full lg:w-[250px] bg-[#2d2d2d] lg:rounded-r-[15px] flex p-6 md:p-10 lg:p-[60px_30px] lg:min-h-[calc(100vh-100px)]">
          <div className="flex flex-row lg:flex-col gap-6 md:gap-10 relative overflow-x-auto lg:overflow-visible no-scrollbar w-full">
            <div className="hidden lg:block absolute left-2.5 top-2.5 bottom-2.5 w-px bg-[#555] z-0"></div>

            {steps.map((s, i) => {
              const isActive = i === activeNavIndex;
              const isCompleted = step > i + 1;

              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 md:gap-[15px] text-xs md:text-sm font-medium z-[1] transition-colors duration-200 shrink-0 ${
                    isActive ? "text-white" : "text-[#aaaaaa]"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center bg-[#2d2d2d] transition-colors shrink-0 ${
                      isActive ? "border-white" : "border-[#555]"
                    }`}
                  >
                    {isCompleted ? (
                      <Check size={12} className="text-white" />
                    ) : (
                      <div
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          isActive ? "bg-white" : "bg-transparent"
                        }`}
                      ></div>
                    )}
                  </div>
                  <span className="whitespace-nowrap">{s}</span>
                </div>
              );
            })}
          </div>
        </div>

<div className="bg-white p-6 md:p-10 lg:p-[40px_50px] rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] relative lg:absolute lg:left-[200px] lg:top-[50px] w-[95%] lg:w-[850px] mx-auto lg:mx-0 mt-[-20px] lg:mt-0 z-10 min-h-[500px] md:min-h-[600px] mb-10">
          {renderStepContent({
            step,
            formData,
            errors,
            handleChange,
            setFormData,
          })}

          {step < 6 && (
            <div
              className={`flex mt-8 ${
                step === 1 ? "justify-center md:justify-end" : "justify-between"
              }`}
            >
              {step > 1 && (
                <Button
                  variant="ghost"
                  onClick={prevStep}
                  className="bg-[#ebeef5] text-gray-800 hover:bg-gray-200 hover:-translate-y-0.5"
                >
                  Previous
                </Button>
              )}

              <Button
                variant="primary"
                size="lg"
                onClick={handleNext}
                disabled={isLoading}
                className={isLoading ? "opacity-50 cursor-not-allowed" : ""}
              >
                {isLoading
                  ? "Processing..."
                  : step === 5
                  ? "Submit"
                  : "Continue"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
