"use client";

import { memo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useContact } from "@/lib/api/hooks";
import { PALETTE, GRADIENTS, SHADOWS } from "@/components/pages/sponsors/constants/palette";
import { Starburst, FloatingCircles } from "./decor/VectorDecorations";

// ═══════════════════════════════════════════════════════════════════
// COLLABORATION CTA - CONTACT FORM WITH VECTOR ART
// ═══════════════════════════════════════════════════════════════════

export const CollaborationCTASection = memo(function CollaborationCTASection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const { submitContact, isPending, isSuccess, isError, errorMessage } = useContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    submitContact(formData);
  };

  if (isSuccess && !showSuccess) {
    setShowSuccess(true);
  }

  return (
    <section
      ref={ref}
      id="collaboration-cta"
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ background: PALETTE.DEEP_INK }}
    >
      {/* Vector decorations */}
      <div className="pointer-events-none absolute top-[15%] left-[5%] opacity-15">
        <Starburst size={100} color={PALETTE.HOT_PINK} />
      </div>
      <div className="pointer-events-none absolute top-[20%] right-[8%] opacity-10">
        <FloatingCircles color={PALETTE.NEON_CYAN} />
      </div>
      <div className="pointer-events-none absolute bottom-[20%] left-[10%] opacity-10">
        <FloatingCircles color={PALETTE.ACID_LIME} />
      </div>
      <div className="pointer-events-none absolute right-[5%] bottom-[15%] opacity-15">
        <Starburst size={70} color={PALETTE.ELECTRIC_VIOLET} />
      </div>

      {/* Subtle gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 100%, ${PALETTE.ELECTRIC_VIOLET}10 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2
            className="mb-4 text-3xl font-black tracking-tight uppercase sm:text-4xl md:text-5xl"
            style={{
              background: GRADIENTS.TITLE,
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Let's Talk
          </h2>
          <p className="text-lg" style={{ color: PALETTE.TEXT_SECONDARY }}>
            Interested in partnering? We'd love to hear from you.
          </p>
        </motion.div>

        {/* Success state */}
        {showSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border p-10 text-center"
            style={{
              background: `${PALETTE.ACID_LIME}10`,
              borderColor: `${PALETTE.ACID_LIME}30`,
            }}
          >
            <div className="mb-4 text-5xl">✓</div>
            <h3 className="mb-2 text-2xl font-bold" style={{ color: PALETTE.ACID_LIME }}>
              Message Sent!
            </h3>
            <p style={{ color: PALETTE.TEXT_SECONDARY }}>
              We'll get back to you within 24-48 hours.
            </p>
            <button
              onClick={() => {
                setShowSuccess(false);
                setFormData({ name: "", email: "" });
              }}
              className="mt-6 text-sm underline"
              style={{ color: PALETTE.TEXT_MUTED }}
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Name */}
            <div>
              <label
                className="mb-2 block text-sm font-medium"
                style={{ color: PALETTE.TEXT_SECONDARY }}
              >
                Your Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
                className="focus:border-opacity-100 w-full rounded-xl border bg-transparent px-4 py-3 transition-colors outline-none"
                style={{
                  borderColor: `${PALETTE.ELECTRIC_VIOLET}30`,
                  color: PALETTE.TEXT_PRIMARY,
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label
                className="mb-2 block text-sm font-medium"
                style={{ color: PALETTE.TEXT_SECONDARY }}
              >
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@company.com"
                required
                className="focus:border-opacity-100 w-full rounded-xl border bg-transparent px-4 py-3 transition-colors outline-none"
                style={{
                  borderColor: `${PALETTE.ELECTRIC_VIOLET}30`,
                  color: PALETTE.TEXT_PRIMARY,
                }}
              />
            </div>

            {/* Error */}
            {isError && (
              <div
                className="rounded-xl border p-4 text-center text-sm"
                style={{
                  borderColor: `${PALETTE.HOT_PINK}30`,
                  background: `${PALETTE.HOT_PINK}10`,
                  color: PALETTE.HOT_PINK,
                }}
              >
                {errorMessage || "Something went wrong. Please try again."}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-full py-4 font-bold tracking-wider uppercase transition-all hover:scale-[1.02] disabled:opacity-50"
              style={{
                background: GRADIENTS.CTA_PRIMARY,
                color: PALETTE.TEXT_PRIMARY,
                boxShadow: SHADOWS.PINK_GLOW,
              }}
            >
              {isPending ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        )}

        {/* Alternative contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-sm" style={{ color: PALETTE.TEXT_MUTED }}>
            Or reach us directly at
          </p>
          <a
            href="mailto:sponsors@kashiyatra.org"
            className="mt-2 inline-block text-lg font-medium transition-colors hover:opacity-80"
            style={{ color: PALETTE.NEON_CYAN }}
          >
            sponsors@kashiyatra.org
          </a>
        </motion.div>
      </div>
    </section>
  );
});
