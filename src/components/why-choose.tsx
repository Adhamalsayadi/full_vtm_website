import Image from "next/image";

export default function WhyChooseSection() {
  
  const cardBaseClasses =
    "w-full lg:w-[318px] min-h-[100px] bg-[#F8F9FA] flex items-center justify-start p-4 gap-4 text-sm rounded-2xl shadow-sm lg:absolute leading-[1.5] border border-gray-100";

  return (
    <div className="mt-10 md:mt-20 p-5 flex flex-col lg:flex-row justify-center items-center gap-8 min-h-[500px] relative max-w-[1200px] mx-auto">
      
      <div className="flex flex-col w-full lg:flex-1 gap-4 lg:relative lg:h-[400px]">
        <div className={`${cardBaseClasses} lg:right-0 lg:top-0`}>
          <Image src="/Server.png" alt="server" width={24} height={24} />
          <span>
            Understand the market need and the available sources to cover it.
          </span>
        </div>
        <div className={`${cardBaseClasses} lg:left-0 lg:top-[150px]`}>
          <Image src="/Checked.png" alt="checked" width={24} height={24} />
          <span>
            Experience in executing typical and technical complex projects.
          </span>
        </div>
      </div>

<div className="flex justify-center flex-1 py-10 lg:py-0">
        <Image
          src="/choose.png"
          alt="choose"
          width={400}
          height={380}
          className="object-contain w-[280px] md:w-[400px] transition-opacity duration-500"
        />
      </div>

<div className="flex flex-col w-full lg:flex-1 gap-4 lg:relative lg:h-[400px]">
        <div className={`${cardBaseClasses} lg:left-0 lg:top-0`}>
          <Image src="/Lightning.png" alt="lightning" width={24} height={24} />
          <span>Strong and Long-term cooperation with the clients.</span>
        </div>
        <div className={`${cardBaseClasses} lg:right-0 lg:top-[150px]`}>
          <Image src="/Group.png" alt="management" width={24} height={24} />
          <span>Efficient and effective system in management.</span>
        </div>
        <div className={`${cardBaseClasses} lg:left-0 lg:bottom-0`}>
          <Image src="/Award.png" alt="award" width={24} height={24} />
          <span>Highly experienced and professional personnel.</span>
        </div>
      </div>
    </div>
  );
}
