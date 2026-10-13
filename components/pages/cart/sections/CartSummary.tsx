"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Trash2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Crown,
  Tag,
  X,
  Check,
  Loader2,
  Gift,
  Percent,
} from "lucide-react";
import { COLORS } from "@/components/pages/cart/constants/palette";

interface CartSummaryProps {
  totalItems: number;
  totalAmount: number;
  onClearCart: () => void;
  onCheckout: () => void;
  isClearing?: boolean;
}

export function CartSummary({
  totalItems,
  totalAmount,
  onClearCart,
  onCheckout,
  isClearing,
}: CartSummaryProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
    type: "percentage" | "fixed";
  } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // 3D Tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  // Calculate discount
  const discountAmount = appliedCoupon
    ? appliedCoupon.type === "percentage"
      ? Math.round((totalAmount * appliedCoupon.discount) / 100)
      : appliedCoupon.discount
    : 0;

  const finalAmount = totalAmount - discountAmount;

  // Handle coupon
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Enter a code");
      return;
    }

    setIsApplyingCoupon(true);
    setCouponError(null);

    // Mock API call
    setTimeout(() => {
      if (couponCode.toUpperCase() === "KASHIYATRA10") {
        setAppliedCoupon({ code: couponCode.toUpperCase(), discount: 10, type: "percentage" });
        setCouponCode("");
      } else if (couponCode.toUpperCase() === "YATRA500") {
        setAppliedCoupon({ code: couponCode.toUpperCase(), discount: 500, type: "fixed" });
        setCouponCode("");
      } else {
        setCouponError("Invalid code");
      }
      setIsApplyingCoupon(false);
    }, 800);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: 20 }}
      animate={{
        opacity: 1,
        x: 0,
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden rounded-2xl"
      style={{
        background:
          "linear-gradient(145deg, rgba(28, 18, 38, 0.98) 0%, rgba(38, 22, 48, 0.98) 100%)",
        border: `1.5px solid ${COLORS.GOLD}35`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${COLORS.GOLD}15`,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Corner ornaments */}
      {[
        "top-1 left-1",
        "top-1 right-1 rotate-90",
        "bottom-1 left-1 -rotate-90",
        "bottom-1 right-1 rotate-180",
      ].map((pos, i) => (
        <div key={i} className={`absolute h-5 w-5 opacity-40 ${pos}`}>
          <svg viewBox="0 0 20 20" fill="none">
            <path d="M0 0 L8 0 L8 1.5 L1.5 1.5 L1.5 8 L0 8 Z" fill={COLORS.GOLD} />
          </svg>
        </div>
      ))}

      {/* Header */}
      <div
        className="relative px-6 py-5"
        style={{
          background: `linear-gradient(135deg, ${COLORS.GOLD}12, transparent)`,
          borderBottom: `1px solid ${COLORS.GOLD}20`,
        }}
      >
        {/* Crown - inside the card */}
        <div className="mb-3 flex justify-center">
          <div
            className="rounded-full p-2"
            style={{
              background: `linear-gradient(135deg, ${COLORS.GOLD}20, ${COLORS.DARK_GOLD}10)`,
              border: `1px solid ${COLORS.GOLD}30`,
            }}
          >
            <Crown className="h-5 w-5" style={{ color: COLORS.GOLD }} />
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <CreditCard className="h-5 w-5" style={{ color: COLORS.GOLD }} />
          <h3
            className="text-lg font-bold tracking-wide"
            style={{ color: COLORS.GOLD, textShadow: `0 0 20px ${COLORS.GOLD}30` }}
          >
            Order Summary
          </h3>
        </div>
      </div>

      <div className="p-6">
        {/* Price breakdown */}
        <div className="mb-6 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Subtotal ({totalItems} items)</span>
            <span className="font-medium text-white">₹{totalAmount.toLocaleString()}</span>
          </div>

          <AnimatePresence>
            {appliedCoupon && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex justify-between text-sm"
              >
                <span className="flex items-center gap-1 text-green-400">
                  <Tag className="h-3.5 w-3.5" />
                  {appliedCoupon.code}
                </span>
                <span className="font-medium text-green-400">
                  -₹{discountAmount.toLocaleString()}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Platform Fee</span>
            <span className="font-medium text-green-400">FREE</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">GST</span>
            <span className="text-gray-500">Included</span>
          </div>
        </div>

        {/* Coupon Section */}
        <div
          className="mb-6 rounded-xl p-4"
          style={{
            background: `${COLORS.GOLD}05`,
            border: `1px solid ${COLORS.GOLD}15`,
          }}
        >
          <div className="mb-3 flex items-center gap-2">
            <Gift className="h-4 w-4" style={{ color: COLORS.GOLD }} />
            <span className="text-sm font-medium" style={{ color: COLORS.GOLD }}>
              Have a coupon?
            </span>
          </div>

          {appliedCoupon ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-between rounded-lg p-3"
              style={{
                background: "rgba(74, 222, 128, 0.1)",
                border: "1px solid rgba(74, 222, 128, 0.25)",
              }}
            >
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-sm font-semibold text-green-400">{appliedCoupon.code}</p>
                  <p className="text-xs text-green-400/70">
                    {appliedCoupon.type === "percentage"
                      ? `${appliedCoupon.discount}% off`
                      : `₹${appliedCoupon.discount} off`}
                  </p>
                </div>
              </div>
              <button
                onClick={handleRemoveCoupon}
                className="rounded-full p-1.5 text-green-400/70 hover:bg-green-500/20 hover:text-green-400"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ) : (
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value.toUpperCase());
                    setCouponError(null);
                  }}
                  placeholder="Enter code"
                  className="min-w-0 flex-1 rounded-lg bg-black/30 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none"
                  style={{
                    border: `1px solid ${couponError ? "rgba(239, 68, 68, 0.4)" : `${COLORS.GOLD}20`}`,
                  }}
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={isApplyingCoupon || !couponCode.trim()}
                  className="flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.GOLD}90, ${COLORS.DARK_GOLD})`,
                  }}
                >
                  {isApplyingCoupon ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Percent className="h-4 w-4" />
                      Apply
                    </>
                  )}
                </button>
              </div>
              {couponError && <p className="text-xs text-red-400">{couponError}</p>}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div
            className="h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${COLORS.GOLD}30, transparent)`,
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#261630] px-2">
            <Sparkles className="h-4 w-4" style={{ color: `${COLORS.GOLD}50` }} />
          </div>
        </div>

        {/* Total */}
        <div className="mb-6 flex items-center justify-between">
          <span className="font-semibold text-white">Total Amount</span>
          <div className="text-right">
            {appliedCoupon && (
              <span className="mr-2 text-sm text-gray-500 line-through">
                ₹{totalAmount.toLocaleString()}
              </span>
            )}
            <motion.span
              animate={{
                textShadow: [
                  `0 0 15px ${COLORS.GOLD}30`,
                  `0 0 25px ${COLORS.GOLD}50`,
                  `0 0 15px ${COLORS.GOLD}30`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl font-bold"
              style={{ color: COLORS.GOLD }}
            >
              ₹{finalAmount.toLocaleString()}
            </motion.span>
          </div>
        </div>

        {/* Savings badge */}
        <AnimatePresence>
          {appliedCoupon && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="mb-4 flex items-center justify-center gap-2 rounded-lg py-2.5"
              style={{
                background: "rgba(74, 222, 128, 0.08)",
                border: "1px solid rgba(74, 222, 128, 0.15)",
              }}
            >
              <Gift className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">
                You save ₹{discountAmount.toLocaleString()}!
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Checkout button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={onCheckout}
          className="group relative mb-4 w-full overflow-hidden rounded-xl py-4 font-semibold text-white"
          style={{
            background: `linear-gradient(135deg, ${COLORS.GOLD}, ${COLORS.DARK_GOLD})`,
            boxShadow: `0 4px 20px ${COLORS.GOLD}30`,
          }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              width: "50%",
            }}
          />
          <span className="relative flex items-center justify-center gap-2">
            Proceed to Checkout
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </motion.button>

        {/* Clear cart */}
        <button
          onClick={onClearCart}
          disabled={isClearing}
          className="flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm transition-all hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
          style={{ borderColor: "rgba(100, 100, 100, 0.25)", color: "rgba(150, 150, 150, 1)" }}
        >
          {isClearing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
          {isClearing ? "Clearing..." : "Clear Cart"}
        </button>

        {/* Security */}
        <div
          className="mt-6 flex items-center justify-center gap-2 text-xs"
          style={{ color: `${COLORS.GOLD}70` }}
        >
          <ShieldCheck className="h-4 w-4" />
          <span>Secure checkout with encrypted payment</span>
        </div>
      </div>
    </motion.div>
  );
}
