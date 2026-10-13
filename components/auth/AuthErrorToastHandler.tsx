"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { AuthErrorToast } from "@/components/toast";

/**
 * Maps NextAuth error codes to user-friendly messages
 */
function getAuthErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case "OAuthSignin":
      return "Error starting authentication.";
    case "OAuthCallback":
      return "Error during authentication callback.";
    case "OAuthCreateAccount":
    case "EmailCreateAccount":
      return "Could not create account.";
    case "Callback":
      return "Authentication callback failed.";
    case "OAuthAccountNotLinked":
      return "Email already linked to another account.";
    case "AccessDenied":
      return "Access denied. You may not have permission.";
    case "NetworkError":
      return "Network error. Please check your connection.";
    case "unknown":
      return "An unexpected error occurred.";
    default:
      return "Something went wrong. Please try again.";
  }
}

const TOAST_ID = "auth-error";

/**
 * Handles auth error toasts only.
 * Use on /login page.
 *
 * Handles: ?auth=<error> or ?error=<code>
 *
 * Must be wrapped in Suspense.
 */
export function AuthErrorToastHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const shown = useRef(false);

  useEffect(() => {
    const auth = searchParams.get("auth");
    const error = searchParams.get("error");

    // Skip if success or no error params
    if (auth === "success" || (!auth && !error)) return;

    const errorCode = auth || error;
    if (!errorCode || shown.current) return;

    shown.current = true;

    toast.custom(() => <AuthErrorToast message={getAuthErrorMessage(errorCode)} />, {
      duration: 5000,
      position: "bottom-right",
      id: TOAST_ID,
    });

    router.replace(pathname, { scroll: false });
    router.refresh();
  }, [searchParams, router, pathname]);

  return null;
}
