"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/context/auth-context";

type UseAuthProtectionOptions = {
  redirectTo?: string;
};

export function useAuthProtection(options: UseAuthProtectionOptions = {}) {
  const { redirectTo = "/login" } = options;
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(redirectTo);
    }
  }, [loading, redirectTo, router, user]);

  return {
    isAuthenticated: Boolean(user),
    isCheckingAuth: loading,
  };
}
