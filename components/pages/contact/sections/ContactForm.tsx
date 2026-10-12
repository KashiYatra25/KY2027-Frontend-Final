"use client";

import Image from "next/image";
import { memo, type FormEvent, useRef } from "react";
import { IMAGES } from "@/lib/images";
import { COLORS, JAZZ_COLORS } from "@/components/pages/contact/constants/palette";
import { CornerOrnaments } from "./decor";
import { useContact } from "@/lib/api/hooks";
import { ContactSuccessToast } from "@/components/pages/contact/toasts/success/ContactSuccessToast";
import { ContactErrorToast } from "@/components/pages/contact/toasts/error/ContactErrorToast";
import { DiyaLoader } from "./loader/DiyaLoader";

const fieldStyle = {
  background: "rgba(12,8,16,0.6)",
  border: `1px solid ${COLORS.BRIGHT_GOLD}30`,
  color: COLORS.CREAM,
} as const;

// ═══════════════════════════════════════════════════════════════════
// CONTACT FORM SECTION
// ═══════════════════════════════════════════════════════════════════
export const ContactForm = memo(function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { submitContact, isPending, isSuccess } = useContact({
    successToast: <ContactSuccessToast />,
    errorToast: <ContactErrorToast />,
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isPending) return;

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    submitContact({ name, email });
  }

  // Reset form on success
  if (isSuccess && formRef.current) {
    formRef.current.reset();
  }

  return (
    <section className="relative px-4 py-14 sm:px-6 sm:py-20">
      {/* Lotus mandala backdrop - Desktop only */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 hidden h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 opacity-[0.06] lg:block">
        <Image
          src={IMAGES.contact.lotusMandala}
          alt=""
          fill
          className="animate-spin object-contain"
          style={{ animationDuration: "180s" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl 2xl:max-w-3xl">
        <div
          className="relative rounded-2xl p-6 sm:p-10"
          style={{
            background: `linear-gradient(160deg, ${JAZZ_COLORS.BG_ROYAL} 0%, ${JAZZ_COLORS.BG_WINE}cc 100%)`,
            border: `2px solid ${COLORS.BRIGHT_GOLD}25`,
            boxShadow: "0 10px 40px rgba(0,0,0,0.4), 0 0 60px rgba(255,215,0,0.06)",
          }}
        >
          <CornerOrnaments />

          <h2
            className="mb-2 text-center text-2xl font-bold sm:text-3xl"
            style={{
              fontFamily: "Georgia, serif",
              color: COLORS.BRIGHT_GOLD,
              textShadow: "0 2px 20px rgba(255,215,0,0.3)",
            }}
          >
            Get In Touch
          </h2>
          <p className="mb-8 text-center text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
            Leave your details and our team will reach out to you.
          </p>

          <form ref={formRef} className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs tracking-wider uppercase" style={{ color: COLORS.GOLD }}>
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className="mt-2 w-full rounded-lg px-4 py-3 text-sm transition-colors outline-none focus:border-yellow-400/70"
                  style={fieldStyle}
                />
              </label>
              <label className="block">
                <span className="text-xs tracking-wider uppercase" style={{ color: COLORS.GOLD }}>
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-lg px-4 py-3 text-sm transition-colors outline-none focus:border-yellow-400/70"
                  style={fieldStyle}
                />
              </label>
            </div>

            {/* Submit - refined ornate royal button */}
            <div className="flex justify-center pt-3">
              <button
                type="submit"
                disabled={isPending}
                className="group relative w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {/* Soft outer aura on hover */}
                <div
                  className="absolute -inset-1.5 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse at center, ${COLORS.BRIGHT_GOLD}55, ${COLORS.SAFFRON}25, transparent 70%)`,
                    filter: "blur(12px)",
                  }}
                />

                {/* Gold frame */}
                <div
                  className="relative rounded-xl p-[2px] transition-transform duration-300 group-hover:scale-[1.03] group-active:scale-[0.98]"
                  style={{
                    background: `linear-gradient(180deg, #FFE9A8 0%, #E8B820 40%, #B8860B 70%, #8B6914 100%)`,
                    boxShadow: `0 10px 30px rgba(255,215,0,0.3), 0 4px 12px rgba(0,0,0,0.35)`,
                  }}
                >
                  <div
                    className="relative overflow-hidden rounded-[10px] px-10 py-3.5 sm:px-14"
                    style={{
                      background: `linear-gradient(180deg, #FFD84D 0%, #F0C020 45%, #D4A017 100%)`,
                      boxShadow: `inset 0 2px 3px rgba(255,255,255,0.6), inset 0 -2px 4px rgba(0,0,0,0.25)`,
                    }}
                  >
                    {/* Shimmer sweep - desktop only */}
                    {!isPending && (
                      <div
                        className="absolute inset-0 hidden opacity-40 lg:block"
                        style={{
                          background:
                            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.85) 50%, transparent 60%)",
                          animation: "shimmerSlide 3.5s infinite",
                        }}
                      />
                    )}
                    <span
                      className="relative z-10 flex items-center justify-center gap-3 text-sm font-black tracking-[0.22em] uppercase sm:text-base"
                      style={{
                        color: "#3d0a18",
                        textShadow: "0 1px 0 rgba(255,255,255,0.35)",
                      }}
                    >
                      {isPending ? (
                        <DiyaLoader text="Sending…" size="md" color="dark" />
                      ) : (
                        <>
                          {/* Gold-dark envelope glyph */}
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#3d0a18"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
                            <path d="M3 6l9 6 9-6" />
                          </svg>
                          <span>Reach Out</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
});
