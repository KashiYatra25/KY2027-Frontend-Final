"use client";

import { Suspense, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ThemedNavbar } from "@/components/navbar";
import { PageLoader } from "@/components/loader";
import { AuthErrorToastHandler } from "@/components/auth";
import { useSignIn } from "@/lib/api/hooks";
import { ROYAL_COLORS } from "./constants/palette";
import { MysticGateSection, LoginCard, BackgroundEffects } from "./sections";

export function LoginContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isSigningIn, handleSignIn } = useSignIn({
    callbackUrl: "/profile?auth=success",
  });

  // Redirect to profile if already logged in
  useEffect(() => {
    if (status === "authenticated" && session) {
      router.replace("/profile?info=already-logged-in");
      router.refresh();
    }
  }, [status, session, router]);

  // Show loader while checking session or if already authenticated (redirecting)
  if (status === "loading" || (status === "authenticated" && session)) {
    return <PageLoader />;
  }

  return (
    <>
      {/* Auth error toast handler - handles error toasts on login page */}
      <Suspense fallback={null}>
        <AuthErrorToastHandler />
      </Suspense>

      {/* Full page loader when signing in */}
      {isSigningIn && <PageLoader />}

      {/* Fixed navbar */}
      <div className="fixed inset-x-0 top-0 z-[200]">
        <ThemedNavbar position="relative" topOffset={18} theme="main" />
      </div>

      <main
        className="flex min-h-screen items-center justify-center px-4 pt-28 pb-12 sm:pt-32"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, ${ROYAL_COLORS.ROYAL_PURPLE}15 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, ${ROYAL_COLORS.DEEP_MAGENTA}12 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, ${ROYAL_COLORS.HOT_PINK}08 0%, transparent 60%),
            linear-gradient(180deg, ${ROYAL_COLORS.BG_DEEP} 0%, ${ROYAL_COLORS.BG_ROYAL} 30%, ${ROYAL_COLORS.BG_WINE} 70%, ${ROYAL_COLORS.BG_DEEP} 100%)
          `,
        }}
      >
        <BackgroundEffects />

        {/* Main Content Container */}
        <div className="relative mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12 2xl:max-w-6xl">
          <MysticGateSection />
          <LoginCard onGoogleLogin={handleSignIn} />
        </div>
      </main>
    </>
  );
}
