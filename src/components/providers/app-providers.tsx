"use client";

import type { ReactNode } from "react";

import { AuthProvider } from "@/context/auth-context";
import { ShoppingProvider } from "@/context/shopping-context";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <AuthProvider>
        <ShoppingProvider>{children}</ShoppingProvider>
      </AuthProvider>
    </SmoothScrollProvider>
  );
}
