"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COLORS_RGBA, GRADIENTS } from "@/components/pages/ca/constants/palette";

gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════════════════════════════
// TIMELINE SECTION
// Dancing ambassador is ABSOLUTELY POSITIONED (bottom-right)
// Title/subtitle centered, timeline cards centered
// ═══════════════════════════════════════════════════════════════════

const STEPS = [
  {
    step: "01",
    title: "Register",
    description: "Complete your profile and fill out the CA application form",
    icon: "📝",
  },
  {
    step: "02",
    title: "Get Verified",
    description: "Our team reviews your application and assigns you as official CA",
    icon: "✅",
  },
  {
    step: "03",
    title: "Spread the Word",
    description: "Share your unique referral code and bring participants from your college",
    icon: "📣",
  },
  {
    step: "04",
    title: "Earn Rewards",
    description: "Unlock perks, cash prizes, and recognition based on your performance",
    icon: "🎉",
  },
];

export function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // NOTE: Title is NOT animated here. A GSAP `from({opacity: 0})` left the
      // header stuck at opacity 0 when the ScrollTrigger failed to fire, which
      // is why the title/badge were invisible. The header now renders statically.

      // Animated line growth
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // Steps stagger animation
      gsap.from(".timeline-step", {
        x: (i) => (i % 2 === 0 ? -50 : 50),
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-4 py-24">
      {/* Section header - CENTERED (static, always visible) */}
      <div className="relative z-20 mb-16 text-center">
        <span className="mb-4 inline-block rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-1 text-xs font-bold tracking-wider text-pink-400 uppercase">
          The Journey
        </span>
        <h2 className="mb-4 text-4xl font-black text-white sm:text-5xl">
          How It <span className="ca-gradient-text">Works</span>
        </h2>
      </div>

      {/* Timeline - centered */}
      <div className="timeline-container relative z-20 mx-auto max-w-3xl 2xl:max-w-4xl">
        {/* Vertical line */}
        <div
          ref={lineRef}
          className="absolute top-0 bottom-0 left-1/2 hidden w-[2px] -translate-x-1/2 sm:block"
          style={{
            background: `linear-gradient(180deg, ${COLORS_RGBA.PINK_50} 0%, ${COLORS_RGBA.PURPLE_50} 50%, ${COLORS_RGBA.CYAN_30} 100%)`,
          }}
        />

        {/* Steps */}
        <div className="space-y-12 sm:space-y-0">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className={`timeline-step relative items-center sm:flex ${
                i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
              }`}
            >
              {/* Content card */}
              <div
                className={`sm:w-[calc(50%-40px)] ${
                  i % 2 === 0 ? "sm:pr-8 sm:text-right" : "sm:pl-8 sm:text-left"
                }`}
              >
                <div
                  className="relative rounded-2xl p-6"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {/* Step number */}
                  <span
                    className="mb-2 inline-block text-sm font-bold tracking-wider"
                    style={{
                      background: GRADIENTS.PINK_PURPLE,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    STEP {step.step}
                  </span>

                  {/* Title */}
                  <h3
                    className={`mb-2 flex items-center gap-2 text-xl font-bold text-white ${
                      i % 2 === 0 ? "sm:flex-row-reverse sm:justify-start" : ""
                    }`}
                  >
                    <span className="text-2xl">{step.icon}</span>
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>
              </div>

              {/* Center dot */}
              <div className="absolute left-1/2 hidden h-10 w-10 -translate-x-1/2 items-center justify-center sm:flex">
                <div
                  className="h-4 w-4 rounded-full"
                  style={{
                    background: GRADIENTS.PINK_PURPLE,
                    boxShadow: `0 0 20px ${COLORS_RGBA.PINK_50}`,
                  }}
                />
              </div>

              {/* Spacer for other side */}
              <div className="hidden sm:block sm:w-[calc(50%-40px)]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
