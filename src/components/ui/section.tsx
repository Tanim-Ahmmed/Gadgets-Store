import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section className={cn("py-12 sm:py-14 lg:py-16", className)} {...props}>
      {children}
    </section>
  );
}
