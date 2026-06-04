import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  id?: string;
  variant?: "white" | "light-grey" | "near-black";
  className?: string;
  children: ReactNode;
}

const variantClasses = {
  white: "bg-background text-foreground",
  "light-grey": "bg-bac-light text-foreground",
  "near-black": "bg-bac-dark text-bac-light",
};

export const SectionContainer = ({
  id,
  variant = "white",
  className,
  children,
}: SectionContainerProps) => {
  return (
    <section
      id={id}
      className={cn(
        "min-h-screen flex items-center justify-center py-24 md:py-32",
        variantClasses[variant],
        className
      )}
    >
      <div className="max-w-content w-full mx-auto px-6 lg:px-12">
        {children}
      </div>
    </section>
  );
};
