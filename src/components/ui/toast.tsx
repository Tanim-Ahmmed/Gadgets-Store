import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ToastProps = {
  children: ReactNode;
  visible: boolean;
};

export function Toast({ children, visible }: ToastProps) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed right-4 top-4 z-50 max-w-sm rounded-2xl border border-white/10 bg-card/95 px-4 py-3 text-sm text-slate-200 shadow-2xl shadow-black/30 backdrop-blur transition duration-200 sm:right-6 sm:top-6",
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-2 opacity-0",
      )}
      role="status"
      aria-live="polite"
      aria-hidden={!visible}
    >
      {children}
    </div>
  );
}
