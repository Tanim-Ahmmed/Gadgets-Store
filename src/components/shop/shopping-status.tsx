"use client";

import type { ReactNode } from "react";

import { useShopping } from "@/context/shopping-context";
import { cn } from "@/lib/utils";
import { CartIcon, HeartIcon } from "@/components/shop/shopping-icons";

type ShoppingStatusProps = {
  className?: string;
};

function StatusPill({
  count,
  label,
  icon,
}: {
  count: number;
  label: string;
  icon: ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 shadow-md transition duration-200 hover:border-white/20 hover:bg-white/8">
      <span className="text-slate-300">{icon}</span>
      <span className="font-medium text-white">{count}</span>
      <span className="text-slate-400">{label}</span>
    </div>
  );
}

export function ShoppingStatus({ className }: ShoppingStatusProps) {
  const { cartCount, mounted, wishlistCount } = useShopping();

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <StatusPill
        count={mounted ? wishlistCount : 0}
        label="Wishlist"
        icon={<HeartIcon className="h-4 w-4" />}
      />
      <StatusPill
        count={mounted ? cartCount : 0}
        label="Cart"
        icon={<CartIcon className="h-4 w-4" />}
      />
    </div>
  );
}
