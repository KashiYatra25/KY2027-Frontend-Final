"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { SuspendedRouteGuard } from "@/components/auth";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider>
      {children}
      <SuspendedRouteGuard />
    </SessionProvider>
  );
}
