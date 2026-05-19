"use client";
import Image from "next/image";
import Link from "next/link";

export interface ServiceItem {
  id?: string;
  label: string;
  icon: string;
}

interface Props {
  items: ServiceItem[];
  variant: "hero" | "home" | "enquiries";
  activeId?: string;
  onItemClick?: (item: ServiceItem) => void;
  disableNavigation?: boolean;
}

export default function ServiceGrid({
  items,
  variant,
  activeId,
  onItemClick,
  disableNavigation = false,
}: Props) {
  const baseClass =
    "flex items-center justify-center gap-[15px] transition-all duration-300";

  const variantClasses = {
    hero: "w-full sm:w-[239px] h-[107px] rounded-[10px]",
    home: "w-full sm:w-[239px] h-[107px] rounded-[16px] p-4",
    enquiries: "w-[251px] h-[90px] bg-[#EFEFEF] p-3 rounded-lg",
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-5  pr-[10px]">
      {items.map((item) => {
        const isActive = activeId === item.id;

        const content = (
          <>
            <Image src={item.icon} alt={item.label} width={37} height={37} />
            <div className="text-dark font-medium">{item.label}</div>
          </>
        );

        const href =
          variant === "enquiries"
            ? `/enquiries?category=${item.id}`
            : `/services?category=${item.id}`;

        if (
          (variant === "hero" || variant === "enquiries") &&
          !disableNavigation
        ) {
          const finalHref =
            variant === "enquiries"
              ? `/enquiries?category=${item.id}&source=icon`
              : href;

          return (
            <Link
              key={item.id}
              href={finalHref}
              className={`${baseClass} ${variantClasses[variant]} ${
                isActive
                  ? "bg-primary shadow-sm"
                  : "bg-[#EFEFEF] hover:shadow-md hover:-translate-y-0.5"
              }`}
            >
              {content}
            </Link>
          );
        }

        return (
          <button
            key={item.id}
            className={`${baseClass} ${
              variantClasses[variant]
            } cursor-pointer ${
              isActive
                ? "bg-primary shadow-sm"
                : "bg-[#EFEFEF] hover:shadow-md hover:-translate-y-0.5"
            }`}
            onClick={() => onItemClick?.(item)}
            type="button"
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}
