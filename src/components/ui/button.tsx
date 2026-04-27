import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const baseStyles =
  "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium shadow-md transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#1A1953] text-white hover:scale-105 hover:bg-[#24206c] hover:shadow-lg",
  outline:
    "border border-border bg-card text-white hover:scale-105 hover:border-primary hover:bg-[#17133a] hover:shadow-lg",
};

export function buttonVariants(
  variant: ButtonVariant = "primary",
  className?: string,
) {
  return cn(baseStyles, variantStyles[variant], className);
}

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonVariants(variant, className)}
      {...props}
    />
  );
}
