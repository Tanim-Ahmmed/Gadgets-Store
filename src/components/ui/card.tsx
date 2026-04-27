import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-[#0f0c2a] p-6 text-white shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
