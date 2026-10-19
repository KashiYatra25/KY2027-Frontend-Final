"use client";

import { useEffect, useState, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Receipt, Package, CreditCard, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { ThemedNavbar } from "@/components/navbar";
import { usePurchases } from "@/lib/api/hooks";
import { PurchaseCard } from "./components/PurchaseCard";
import { EmptyPurchases } from "./components/EmptyPurchases";
import { PurchasesLoader } from "./components/PurchasesLoader";
import { PaymentSuccessToast } from "./toasts";

// ═══════════════════════════════════════════════════════════════════
// COLORS - Ethereal palette matching site vibe
// ═══════════════════════════════════════════════════════════════════

const COLORS = {
  BG_DEEP: "#0a0612",
  BG_ROYAL: "#1a0a20",
  GOLD: "#d4a853",
  GOLD_LIGHT: "#f0d890",
  SUCCESS: "#22c55e",
  WARNING: "#f59e0b",
  ERROR: "#ef4444",
} as const;

// ═══════════════════════════════════════════════════════════════════
// PAYMENT SUCCESS HANDLER
// Handles ?payment=success query param from Cashfree redirect
// ═══════════════════════════════════════════════════════════════════

function PaymentSuccessHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const paymentStatus = searchParams.get("payment");

    if (paymentStatus === "success" && !shown) {
      setShown(true);

      // Show success toast
      toast.custom((t) => <PaymentSuccessToast onClose={() => toast.dismiss(t)} />, {
        duration: 6000,
        position: "top-center",
      });

      // Clean up URL
      router.replace("/purchases", { scroll: false });
    }
  }, [searchParams, router, shown]);

  return null;
}

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

export function PurchasesPageContent() {
  const router = useRouter();
  const { status } = useSession();
  const { purchases, activePurchases, isLoading, isError } = usePurchases();
  const [showLoginRedirect, setShowLoginRedirect] = useState(false);

  const isAuthenticated = status === "authenticated";
  const isAuthLoading = status === "loading";

  // Redirect unauthenticated users
  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      setShowLoginRedirect(true);
      const timer = setTimeout(() => {
        router.push("/login?callbackUrl=/purchases");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAuthLoading, isAuthenticated, router]);

  // Calculate stats (each purchase = one pass)
  const totalSpent = activePurchases.reduce((sum, p) => sum + (p.amountPaid ?? 0), 0);
  const totalPasses = activePurchases.length;

  return (
    <>
      {/* Payment success toast handler */}
      <Suspense fallback={null}>
        <PaymentSuccessHandler />
      </Suspense>

      {/* Fixed navbar */}
      <div className="fixed inset-x-0 top-0 z-[200]">
        <ThemedNavbar position="relative" topOffset={18} theme="main" />
      </div>

      <main
        className="min-h-screen px-4 pt-36 pb-12 sm:pt-40"
        style={{
          background: `
            radial-gradient(ellipse at 20% 0%, rgba(212,168,83,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, rgba(139,21,56,0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(100,50,150,0.04) 0%, transparent 60%),
            linear-gradient(180deg, ${COLORS.BG_DEEP} 0%, ${COLORS.BG_ROYAL} 50%, ${COLORS.BG_DEEP} 100%)
          `,
        }}
      >
        {/* Floating particles decoration */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full"
              style={{
                background: `rgba(212, 168, 83, ${0.1 + Math.random() * 0.2})`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5">
              <Receipt className="h-4 w-4 text-amber-400" />
              <span className="text-xs font-medium tracking-wider text-amber-300 uppercase">
                Purchase History
              </span>
            </div>
            <h1
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{
                background: `linear-gradient(135deg, ${COLORS.GOLD_LIGHT} 0%, ${COLORS.GOLD} 50%, #c9a227 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "var(--font-ethereal), serif",
              }}
            >
              My Purchases
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Track your festival pass purchases and payment history
            </p>
          </motion.div>

          {/* Stats Cards */}
          {!isLoading && activePurchases.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3"
            >
              <StatCard
                icon={<Package className="h-5 w-5" />}
                label="Total Passes"
                value={totalPasses.toString()}
                color="amber"
              />
              <StatCard
                icon={<CreditCard className="h-5 w-5" />}
                label="Total Spent"
                value={`₹${totalSpent.toLocaleString()}`}
                color="emerald"
              />
              <StatCard
                icon={<CheckCircle2 className="h-5 w-5" />}
                label="Completed"
                value={activePurchases.length.toString()}
                color="blue"
                className="col-span-2 sm:col-span-1"
              />
            </motion.div>
          )}

          {/* Content */}
          {isAuthLoading || isLoading ? (
            <PurchasesLoader />
          ) : showLoginRedirect ? (
            <div className="rounded-2xl border border-amber-500/20 bg-black/20 p-8 text-center backdrop-blur-sm">
              <p className="text-amber-200">Redirecting to login...</p>
            </div>
          ) : isError ? (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center backdrop-blur-sm">
              <XCircle className="mx-auto mb-4 h-12 w-12 text-red-400" />
              <p className="text-red-200">Failed to load purchases. Please try again.</p>
            </div>
          ) : purchases.length === 0 ? (
            <EmptyPurchases />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <AnimatePresence>
                {purchases.map((purchase, index) => (
                  <PurchaseCard key={purchase.id} purchase={purchase} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════
// STAT CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: "amber" | "emerald" | "blue";
  className?: string;
}

function StatCard({ icon, label, value, color, className = "" }: StatCardProps) {
  const colorStyles = {
    amber: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      icon: "text-amber-400",
      value: "text-amber-200",
    },
    emerald: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      icon: "text-emerald-400",
      value: "text-emerald-200",
    },
    blue: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      icon: "text-blue-400",
      value: "text-blue-200",
    },
  };

  const styles = colorStyles[color];

  return (
    <div
      className={`rounded-xl border p-4 backdrop-blur-sm ${styles.bg} ${styles.border} ${className}`}
    >
      <div className={`mb-2 ${styles.icon}`}>{icon}</div>
      <p className={`text-xl font-bold ${styles.value}`}>{value}</p>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
  );
}
