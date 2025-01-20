"use client";

import { useSession } from "next-auth/react";

export function useAuthStatus() {
  const { data: session, status } = useSession();
  return {
    user: session?.user,
    isAuthenticated: status == "authenticated",
    isLoading: status === "loading",
  };
}
