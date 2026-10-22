"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Ticket, Sparkles, Crown, Info } from "lucide-react";
import { ThemedNavbar } from "@/components/navbar/ThemedNavbar";
import { useMyAccount } from "@/lib/api/hooks";
import { ProfileIncompleteCard } from "./components/ProfileIncompleteCard";
import { KonfHubIntegration } from "../passes/KonfHubIntegration";
import { CartLoader } from "./sections/loader/CartLoader";
import {
  FloatingMandalas,
  GradientOrbs,
  CornerOrnaments,
  FloatingDiyas,
  GoldenParticles,
  LaserBeams,
  StageSpotlights,
  GridOverlay,
} from "./sections/decor";
import { LoginRequiredToast } from "./toasts/info/LoginRequiredToast";
import { COLORS } from "./constants/palette";

// ═══════════════════════════════════════════════════════════════════
// BUY PASSES PAGE (formerly Cart Page)
// Now redirects to KonfHub for actual purchase
// ═══════════════════════════════════════════════════════════════════

export function CartPageContent() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showLoginToast, setShowLoginToast] = useState(false);

  // Auth & profile state - use "full" to get kyId from profile
  const { profile, progress, isLoading: isAccountLoading } = useMyAccount("full");

  const isProfileComplete = progress?.isProfileComplete ?? false;
  const completionPercentage = progress?.completionPercentage ?? 0;
  const displayName = profile?.firstName ?? session?.user?.name ?? null;
  const steps = progress?.steps;
  const kyId = profile?.kyId; // The short KY-2027-XXXXXXXX ID

  const isAuthenticated = status === "authenticated";
  const isAuthLoading = status === "loading";

  // Redirect unauthenticated users
  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      setShowLoginToast(true);
      const timer = setTimeout(() => {
        router.push("/login?callbackUrl=/cart");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAuthLoading, isAuthenticated, router]);

  // Show loading while checking auth
  if (isAuthLoading) {
    return (
      <>
        <div className="fixed inset-x-0 top-0 z-[200]">
          <ThemedNavbar position="relative" topOffset={18} theme="main" />
        </div>
        <main className="min-h-screen pt-32" style={{ background: COLORS.BG_DEEP }}>
          <CartLoader />
        </main>
      </>
    );
  }

  // Show login toast for unauthenticated users
  if (!isAuthenticated) {
    return (
      <>
        <main
          className="flex min-h-screen items-center justify-center"
          style={{ background: COLORS.BG_DEEP }}
        >
          <AnimatePresence>{showLoginToast && <LoginRequiredToast />}</AnimatePresence>
        </main>
      </>
    );
  }

  const isLoading = isAccountLoading;

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[200]">
        <ThemedNavbar position="relative" topOffset={18} theme="main" />
      </div>

      <main
        className="relative min-h-screen pt-32 pb-12 sm:pt-36"
        style={{ background: COLORS.BG_DEEP }}
      >
        {/* Background decorative elements */}
        <GridOverlay />
        <StageSpotlights />
        <LaserBeams />
        <GradientOrbs />
        <FloatingMandalas />
        <CornerOrnaments />
        <FloatingDiyas />
        <GoldenParticles />

        {/* Banarasi pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='none' stroke='%23D4A853' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 text-center"
          >
            {/* Royal banner background */}
            <div
              className="absolute top-0 left-1/2 -z-10 h-32 w-full max-w-2xl -translate-x-1/2 opacity-20"
              style={{
                background: `radial-gradient(ellipse at center, ${COLORS.GOLD}30 0%, transparent 70%)`,
              }}
            />

            {/* Crown icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-2 flex justify-center"
            >
              <Crown className="h-8 w-8" style={{ color: `${COLORS.GOLD}60` }} />
            </motion.div>

            {/* Icon and Title */}
            <div className="mb-4 flex items-center justify-center gap-3">
              <motion.div
                whileHover={{ rotate: 10 }}
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.GOLD}25, ${COLORS.DARK_GOLD}35)`,
                  border: `2px solid ${COLORS.GOLD}50`,
                  boxShadow: `0 0 30px ${COLORS.GOLD}20, inset 0 0 20px ${COLORS.GOLD}10`,
                }}
              >
                <Ticket className="h-7 w-7" style={{ color: COLORS.GOLD }} />
              </motion.div>
              <h1
                className="text-3xl font-bold sm:text-4xl lg:text-5xl"
                style={{
                  color: COLORS.GOLD,
                  fontFamily: "var(--font-ethereal), serif",
                  textShadow: `0 0 40px ${COLORS.GOLD}50, 0 2px 10px rgba(0,0,0,0.5)`,
                }}
              >
                Buy Passes
              </h1>
            </div>

            {/* Decorative divider with lotus */}
            <div className="flex items-center justify-center gap-3">
              <div
                className="h-px w-20 sm:w-32"
                style={{ background: `linear-gradient(90deg, transparent, ${COLORS.GOLD})` }}
              />
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Sparkles className="h-5 w-5" style={{ color: COLORS.GOLD }} />
              </motion.div>
              <div
                className="h-px w-20 sm:w-32"
                style={{ background: `linear-gradient(90deg, ${COLORS.GOLD}, transparent)` }}
              />
            </div>

            {/* Subtitle */}
            {!isLoading && isProfileComplete && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-gray-400"
              >
                Purchase your festival pass through our official ticketing partner
              </motion.p>
            )}
          </motion.div>

          {isLoading ? (
            <CartLoader />
          ) : !isProfileComplete ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <ProfileIncompleteCard
                completionPercentage={completionPercentage}
                displayName={displayName}
                steps={steps ?? undefined}
              />
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <KonfHubIntegration
                kyId={kyId ?? ""}
                userEmail={profile?.email ?? session?.user?.email ?? ""}
                userName={displayName ?? "User"}
              />

              {/* Pass Info Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <div className="mb-3 flex items-center gap-2">
                  <Info className="h-4 w-4 text-blue-400" />
                  <h3 className="font-medium text-white">Need to see pass options?</h3>
                </div>
                <p className="mb-4 text-sm text-gray-400">
                  Visit our passes page to compare different pass tiers and their benefits before
                  making a purchase.
                </p>
                <a
                  href="/passes"
                  className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
                >
                  <Ticket className="h-4 w-4" />
                  View Pass Options
                </a>
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
}
