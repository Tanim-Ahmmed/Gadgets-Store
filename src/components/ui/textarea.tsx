import type { TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-white shadow-md transition-all duration-200 ease-in-out placeholder:text-slate-500 hover:border-primary/80 hover:shadow-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/70 focus:ring-offset-2 focus:ring-offset-background",
        className,
      )}
      {...props}
    />
  );
}
