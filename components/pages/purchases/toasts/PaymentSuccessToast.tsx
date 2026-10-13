"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, PartyPopper, X } from "lucide-react";

interface PaymentSuccessToastProps {
  onClose?: () => void;
}

export function PaymentSuccessToast({ onClose }: PaymentSuccessToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className="relative w-full max-w-md overflow-hidden rounded-2xl border border-emerald-500/30 shadow-2xl"
      style={{
        background:
          "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 78, 59, 0.9) 50%, rgba(10, 6, 18, 0.95) 100%)",
        boxShadow: "0 0 40px rgba(16, 185, 129, 0.2), 0 0 80px rgba(16, 185, 129, 0.1)",
      }}
    >
      {/* Animated sparkles background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <Sparkles className="h-3 w-3 text-emerald-400/50" />
          </motion.div>
        ))}
      </div>

      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 rounded-full p-1 text-emerald-300/50 transition-colors hover:bg-emerald-500/10 hover:text-emerald-300"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      <div className="relative p-6">
        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="relative"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
            <motion.div
              className="absolute -top-1 -right-1"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <PartyPopper className="h-6 w-6 text-amber-400" />
            </motion.div>
          </motion.div>
        </div>

        {/* Text */}
        <div className="text-center">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-1 text-xl font-bold text-emerald-100"
          >
            Payment Successful!
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-emerald-200/70"
          >
            Your passes have been confirmed. Get ready for an unforgettable experience at Kashiyatra
            2027!
          </motion.p>
        </div>

        {/* Decorative bottom line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-4 h-1 rounded-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
        />
      </div>
    </motion.div>
  );
}
