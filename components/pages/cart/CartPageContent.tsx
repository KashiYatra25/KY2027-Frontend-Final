"use client";

import { useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, Sparkles, Crown } from "lucide-react";
import { ThemedNavbar } from "@/components/navbar";
import {
  useMyAccount,
  useGetMyCart,
  useRemoveFromMyCart,
  useClearMyCart,
  useUpdateCartQuantity,
  usePasses,
  useAccountStatus,
} from "@/lib/api/hooks";
import { useCheckout } from "@/lib/api/hooks/cart";
import { ProfileIncompleteCard } from "./components/ProfileIncompleteCard";
import { EmptyCart } from "./sections/EmptyCart";
import { CartSection } from "./sections/CartSection";
import { CartSummary } from "./sections/CartSummary";
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
import { ItemRemovedToast } from "./toasts/success/ItemRemovedToast";
import { CartClearedToast } from "./toasts/success/CartClearedToast";
import { COLORS } from "./constants/palette";
import type { CartItemWithDetails } from "@/lib/api/helper/types";

export function CartPageContent() {
  const router = useRouter();
  const { status } = useSession();
  const [showLoginToast, setShowLoginToast] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [updatingQuantityId, setUpdatingQuantityId] = useState<string | null>(null);

  // Auth & profile state
  const {
    isProfileComplete,
    completionPercentage,
    displayName,
    steps,
    isLoading: isAccountLoading,
  } = useMyAccount("progress");

  // Account status (suspension check)
  const { isSuspended, canPerformAction } = useAccountStatus();

  // Cart data
  const { items, totalQuantity, isEmpty, isLoading: isCartLoading, refetch } = useGetMyCart();

  // Passes data (to enrich cart items)
  const { passes } = usePasses();

  // Mutations with toasts
  const { removeFromCart, isPending: isRemoving } = useRemoveFromMyCart({
    successToast: <ItemRemovedToast />,
  });

  const { clearCart, isPending: isClearing } = useClearMyCart({
    successToast: <CartClearedToast />,
  });

  const { mutate: updateQuantity, isPending: isUpdatingQuantity } = useUpdateCartQuantity();

  // Checkout
  const { checkout, isLoading: isCheckingOut } = useCheckout();

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

  // Enrich cart items with pass details
  const enrichedItems: CartItemWithDetails[] = useMemo(() => {
    return items.map((item) => {
      const pass = passes.find((p) => p._id === item.passId);
      return {
        ...item,
        name: pass?.name ?? "Unknown Pass",
        price: pass?.price ?? 0,
        image: pass?.image ?? "/passes/YatriPass.png",
        tagline: pass?.tagline ?? "",
        accentColor: pass?.accentColor ?? COLORS.GOLD,
      };
    });
  }, [items, passes]);

  // Calculate totals
  const totalAmount = useMemo(() => {
    return enrichedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [enrichedItems]);

  // Handlers
  const handleRemove = (passId: string) => {
    setRemovingId(passId);
    removeFromCart({ passId });
  };

  const handleUpdateQuantity = (passId: string, quantity: number) => {
    setUpdatingQuantityId(passId);
    updateQuantity(
      { passId, quantity },
      {
        onSettled: () => setUpdatingQuantityId(null),
      }
    );
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = (couponCode?: string) => {
    checkout({ couponCode });
  };

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

  // Loading account or cart
  const isLoading = isAccountLoading || isCartLoading;

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

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 2xl:max-w-7xl">
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
                <ShoppingBag className="h-7 w-7" style={{ color: COLORS.GOLD }} />
              </motion.div>
              <h1
                className="text-3xl font-bold sm:text-4xl lg:text-5xl"
                style={{
                  color: COLORS.GOLD,
                  fontFamily: "var(--font-ethereal), serif",
                  textShadow: `0 0 40px ${COLORS.GOLD}50, 0 2px 10px rgba(0,0,0,0.5)`,
                }}
              >
                Your Cart
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
            {!isLoading && !isEmpty && isProfileComplete && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-gray-400"
              >
                You have{" "}
                <span className="font-semibold" style={{ color: COLORS.GOLD }}>
                  {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
                </span>{" "}
                in your cart
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
          ) : isEmpty ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <EmptyCart />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid items-start gap-8 lg:grid-cols-3"
            >
              <div className="lg:col-span-2">
                <CartSection
                  items={enrichedItems}
                  onRemove={handleRemove}
                  onUpdateQuantity={handleUpdateQuantity}
                  removingId={isRemoving ? removingId : null}
                  updatingQuantityId={isUpdatingQuantity ? updatingQuantityId : null}
                />
              </div>
              <div className="lg:sticky lg:top-36 lg:self-start">
                <CartSummary
                  totalItems={totalQuantity}
                  totalAmount={totalAmount}
                  onClearCart={handleClearCart}
                  onCheckout={handleCheckout}
                  isClearing={isClearing}
                  isCheckingOut={isCheckingOut}
                />
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
}
