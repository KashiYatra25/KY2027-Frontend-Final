"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { COLORS, COLORS_RGBA } from "@/components/pages/ca/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// CUSTOM ANIMATED ROCKET
// Ethereal rocket with flame animation and glow effects
// ═══════════════════════════════════════════════════════════════════

interface RocketProps {
  className?: string;
  size?: number;
}

export function AnimatedRocket({ className = "", size = 120 }: RocketProps) {
  const rocketRef = useRef<SVGSVGElement>(null);
  const flameRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!rocketRef.current || !flameRef.current) return;

    const ctx = gsap.context(() => {
      // Rocket hover/float animation
      gsap.to(rocketRef.current, {
        y: -8,
        x: 3,
        rotation: 2,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "power1.inOut",
      });

      // Flame flicker
      gsap.to(".rocket-flame-inner", {
        scaleY: 1.3,
        opacity: 0.9,
        repeat: -1,
        yoyo: true,
        duration: 0.15,
        ease: "power1.inOut",
        stagger: 0.05,
      });

      // Flame glow pulse
      gsap.to(".rocket-flame-glow", {
        opacity: 0.8,
        scale: 1.2,
        repeat: -1,
        yoyo: true,
        duration: 0.3,
        ease: "power1.inOut",
      });

      // Sparkle particles
      gsap.to(".rocket-sparkle", {
        y: 20,
        opacity: 0,
        repeat: -1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power1.out",
      });
    }, rocketRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={rocketRef}
      viewBox="0 0 100 140"
      width={size}
      height={size * 1.4}
      className={`${className}`}
      style={{ filter: `drop-shadow(0 0 20px ${COLORS_RGBA.PINK_50})` }}
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="50%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>

        <linearGradient id="rocketAccent" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={COLORS.PINK} />
          <stop offset="50%" stopColor={COLORS.PURPLE} />
          <stop offset="100%" stopColor={COLORS.CYAN} />
        </linearGradient>

        <linearGradient id="rocketWindow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={COLORS.CYAN} />
          <stop offset="50%" stopColor={COLORS.PURPLE} />
          <stop offset="100%" stopColor="#1e1b4b" />
        </linearGradient>

        <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="30%" stopColor="#f97316" />
          <stop offset="60%" stopColor="#ef4444" />
          <stop offset="100%" stopColor={COLORS.PINK} />
        </linearGradient>

        <linearGradient id="flameInner" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="rocketGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Flame group */}
      <g ref={flameRef} transform="translate(50, 95)">
        {/* Outer flame glow */}
        <ellipse
          className="rocket-flame-glow"
          cx="0"
          cy="25"
          rx="18"
          ry="25"
          fill="url(#flameGradient)"
          opacity="0.5"
          filter="url(#rocketGlow)"
        />

        {/* Main flame */}
        <path
          className="rocket-flame-inner"
          d="M-12,5 Q-15,20 -8,35 Q0,50 8,35 Q15,20 12,5 Q6,15 0,10 Q-6,15 -12,5"
          fill="url(#flameGradient)"
          style={{ transformOrigin: "center top" }}
        />

        {/* Inner bright flame */}
        <path
          className="rocket-flame-inner"
          d="M-6,5 Q-8,15 -4,25 Q0,35 4,25 Q8,15 6,5 Q3,12 0,8 Q-3,12 -6,5"
          fill="url(#flameInner)"
          style={{ transformOrigin: "center top" }}
        />

        {/* Sparkles */}
        {[-8, 0, 8].map((x, i) => (
          <circle
            key={i}
            className="rocket-sparkle"
            cx={x}
            cy={10 + i * 5}
            r="2"
            fill="#fef3c7"
            opacity="0.8"
          />
        ))}
      </g>

      {/* Rocket body */}
      <g transform="translate(50, 50)">
        {/* Fins */}
        <path d="M-25,35 L-35,55 L-20,45 Z" fill="url(#rocketAccent)" />
        <path d="M25,35 L35,55 L20,45 Z" fill="url(#rocketAccent)" />

        {/* Main body */}
        <path
          d="M-18,45 L-18,10 Q-18,-20 0,-35 Q18,-20 18,10 L18,45 Q10,50 0,50 Q-10,50 -18,45"
          fill="url(#rocketBody)"
          stroke="url(#rocketAccent)"
          strokeWidth="1.5"
        />

        {/* Body accent stripes */}
        <path
          d="M-15,30 L15,30"
          stroke="url(#rocketAccent)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M-12,38 L12,38"
          stroke="url(#rocketAccent)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* Window */}
        <circle cx="0" cy="5" r="10" fill="url(#rocketWindow)" stroke="#e2e8f0" strokeWidth="2" />

        {/* Window shine */}
        <ellipse cx="-3" cy="2" rx="3" ry="4" fill="rgba(255,255,255,0.4)" />

        {/* Nose cone highlight */}
        <path
          d="M-8,-15 Q-5,-25 0,-35"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* Stars around rocket */}
      {[
        { x: 15, y: 20, size: 2, delay: 0 },
        { x: 85, y: 35, size: 3, delay: 0.5 },
        { x: 10, y: 70, size: 2.5, delay: 1 },
        { x: 90, y: 80, size: 2, delay: 1.5 },
      ].map((star, i) => (
        <circle
          key={i}
          cx={star.x}
          cy={star.y}
          r={star.size}
          fill="white"
          opacity="0.6"
          style={{
            animation: `twinkle 2s ease-in-out infinite ${star.delay}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.3); }
        }
      `}</style>
    </svg>
  );
}
