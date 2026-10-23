"use client";

import { useState, useCallback } from "react";
import { signIn } from "next-auth/react";

type Provider = "google";

interface UseSignInOptions {
  provider?: Provider;
  callbackUrl?: string;
}

/**
 * Hook for handling OAuth sign in with loading state.
 *
 * For OAuth providers (Google, etc.), the browser MUST redirect to the
 * provider's auth page. The loader shows briefly before the redirect happens,
 * giving visual feedback that the sign-in process has started.
 *
 * On success: NextAuth redirects to callbackUrl (/?auth=success)
 * On error: NextAuth redirects to /?error=<code>
 */
export function useSignIn(options: UseSignInOptions = {}) {
  const { provider = "google", callbackUrl = "/?auth=success" } = options;
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = useCallback(async () => {
    if (isSigningIn) return; // Prevent multiple clicks

    setIsSigningIn(true);

    try {
      // next-auth v4: this redirects the browser to Google's auth page.
      // redirect:true is the default, but we set it explicitly so the hard
      // navigation always happens regardless of render timing.
      await signIn(provider, { callbackUrl, redirect: true });
    } catch (err) {
      // Only reached if signIn throws without redirecting.
      console.error("Google sign-in failed to start", err);
      setIsSigningIn(false);
    }
  }, [isSigningIn, provider, callbackUrl]);

  return {
    isSigningIn,
    handleSignIn,
  };
}
