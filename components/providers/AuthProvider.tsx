"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { SuspendedAccountBanner } from "@/lib/api/hooks";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider>
      <SuspendedAccountBanner />
      {children}
    </SessionProvider>
  );
}
