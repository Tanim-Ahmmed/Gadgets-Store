"use client";

import type { ReactNode } from "react";

import { useAuthProtection } from "@/hooks/use-auth-protection";

type ProtectedRouteProps = {
  children: ReactNode;
  redirectTo?: string;
};

export function ProtectedRoute({
  children,
  redirectTo,
}: ProtectedRouteProps) {
  const { isAuthenticated, isCheckingAuth } = useAuthProtection({ redirectTo });

  if (isCheckingAuth || !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
