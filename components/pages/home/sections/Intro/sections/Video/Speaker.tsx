"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

// Speaker component with vibrant design
export function Speaker({
  size,
  intensity,
  isMuted,
  onToggleMute,
  className,
}: {
  size: "small" | "medium" | "large";
  intensity: number;
  isMuted: boolean;
  onToggleMute: () => void;
  className?: string;
}) {
  const dimensions = {
    small: { width: 55, height: 85 },
    medium: { width: 75, height: 115 },
    large: { width: 100, height: 150 },
  };

  const { width, height } = dimensions[size];
  const wooferSize = size === "large" ? 35 : size === "medium" ? 28 : 20;
  const tweeterSize = size === "large" ? 12 : size === "medium" ? 10 : 7;

  const visualIntensity = isMuted ? 0.1 : intensity;
  const speakerScale = isMuted ? 1 : 1 + intensity * 0.15; // Increased from 0.08

  // Beat shake - more aggressive movements on beats
  const shakeX = isMuted ? 0 : (Math.random() - 0.5) * intensity * 10; // Increased from 4
  const shakeY = isMuted ? 0 : intensity * 8; // Increased from 2

  // Unique ID for this speaker instance - stable across renders
  const uniqueId = useMemo(
    () => `speaker-${size}-${Math.random().toString(36).substr(2, 9)}`,
    [size]
  );

  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      onClick={onToggleMute}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      animate={{
        scale: speakerScale,
        y: isMuted ? 0 : [0, -shakeY, 0],
        x: isMuted ? 0 : [0, shakeX, 0],
        rotate: isMuted ? 0 : [0, intensity * 4, 0, -intensity * 4, 0], // Increased from 1.5
      }}
      transition={{
        scale: { duration: 0.08, ease: "easeOut" }, // Faster
        y: { duration: 0.1, ease: "easeOut" }, // Faster
        x: { duration: 0.1, ease: "easeOut" }, // Faster
        rotate: { duration: 0.15, ease: "easeInOut" }, // Faster
      }}
    >
      {/* Speaker SVG */}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="relative z-10"
        style={{
          filter: isMuted
            ? `drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6)) grayscale(0.5) brightness(0.6)`
            : `drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))`,
        }}
      >
        <defs>
          {/* Speaker cabinet gradient - dark charcoal with purple tint */}
          <linearGradient id={`cabinet-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2d2835" />
            <stop offset="20%" stopColor="#1f1a28" />
            <stop offset="50%" stopColor="#15121a" />
            <stop offset="80%" stopColor="#1f1a28" />
            <stop offset="100%" stopColor="#2a2535" />
          </linearGradient>

          {/* Cabinet edge - metallic purple */}
          <linearGradient id={`cabinet-edge-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6B4C8A" />
            <stop offset="50%" stopColor="#4a3660" />
            <stop offset="100%" stopColor="#3a2850" />
          </linearGradient>

          {/* Woofer cone - metallic dark */}
          <radialGradient id={`woofer-${uniqueId}`} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#4a4555" />
            <stop offset="40%" stopColor="#2d2838" />
            <stop offset="70%" stopColor="#1f1a28" />
            <stop offset="100%" stopColor="#15121a" />
          </radialGradient>

          {/* Woofer surround - rubber look */}
          <radialGradient id={`woofer-surround-${uniqueId}`} cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="#252030" />
            <stop offset="80%" stopColor="#3a3545" />
            <stop offset="90%" stopColor="#4a4555" />
            <stop offset="100%" stopColor="#252030" />
          </radialGradient>

          {/* Tweeter - golden metallic */}
          <radialGradient id={`tweeter-${uniqueId}`} cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="40%" stopColor="#DAA520" />
            <stop offset="100%" stopColor="#B8860B" />
          </radialGradient>

          {/* Rotating rainbow gradient for woofer ring */}
          <linearGradient id={`rainbow-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="20%" stopColor="#FFE66D" />
            <stop offset="40%" stopColor="#4ECDC4" />
            <stop offset="60%" stopColor="#6B5BFF" />
            <stop offset="80%" stopColor="#FF6BB5" />
            <stop offset="100%" stopColor="#FF6B6B" />
          </linearGradient>

          {/* Conic gradient for spinning effect */}
          <linearGradient id={`spin-gradient-${uniqueId}`}>
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="16%" stopColor="#FFE66D" />
            <stop offset="33%" stopColor="#4ECDC4" />
            <stop offset="50%" stopColor="#45B7D1" />
            <stop offset="66%" stopColor="#6B5BFF" />
            <stop offset="83%" stopColor="#FF6BB5" />
            <stop offset="100%" stopColor="#FF6B6B" />
          </linearGradient>
        </defs>

        {/* Cabinet body */}
        <rect
          x="2"
          y="2"
          width={width - 4}
          height={height - 4}
          rx="6"
          ry="6"
          fill={`url(#cabinet-${uniqueId})`}
          stroke={`url(#cabinet-edge-${uniqueId})`}
          strokeWidth="2"
        />

        {/* Inner panel border */}
        <rect
          x="6"
          y="6"
          width={width - 12}
          height={height - 12}
          rx="4"
          ry="4"
          fill="none"
          stroke="#4a4060"
          strokeWidth="1"
        />

        {/* Woofer (main driver) */}
        <g transform={`translate(${width / 2}, ${height * 0.58})`}>
          {/* Rotating multicolor ring around woofer */}
          <motion.g
            animate={{ rotate: isMuted ? 0 : 360 }}
            transition={{
              duration: 3 - visualIntensity * 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Rainbow segments */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const colors = ["#FF6B6B", "#FFE66D", "#4ECDC4", "#45B7D1", "#6B5BFF", "#FF6BB5"];
              return (
                <motion.path
                  key={i}
                  d={`M ${(wooferSize + 8) * Math.cos((angle * Math.PI) / 180)} ${(wooferSize + 8) * Math.sin((angle * Math.PI) / 180)} 
                      A ${wooferSize + 8} ${wooferSize + 8} 0 0 1 
                      ${(wooferSize + 8) * Math.cos(((angle + 60) * Math.PI) / 180)} ${(wooferSize + 8) * Math.sin(((angle + 60) * Math.PI) / 180)}`}
                  fill="none"
                  stroke={colors[i]}
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity={isMuted ? 0.2 : 0.8 + visualIntensity * 0.2}
                  style={{
                    filter: isMuted
                      ? "none"
                      : `drop-shadow(0 0 ${2 + visualIntensity * 3}px ${colors[i]})`,
                  }}
                />
              );
            })}
          </motion.g>

          {/* Woofer outer frame */}
          <circle r={wooferSize + 5} fill="#15121a" stroke="#4a4060" strokeWidth="1" />

          {/* Woofer surround */}
          <motion.circle
            r={wooferSize + 2}
            fill={`url(#woofer-surround-${uniqueId})`}
            animate={{
              scale: isMuted ? 1 : [1, 1 + visualIntensity * 0.12, 1], // Increased from 0.05
            }}
            transition={{
              duration: 0.08, // Faster
              repeat: isMuted ? 0 : Infinity,
              ease: "easeOut",
            }}
          />

          {/* Woofer cone */}
          <motion.circle
            r={wooferSize}
            fill={`url(#woofer-${uniqueId})`}
            animate={{
              scale: isMuted ? 1 : [1, 1 + visualIntensity * 0.15, 1], // Increased from 0.07
            }}
            transition={{
              duration: 0.06, // Faster
              repeat: isMuted ? 0 : Infinity,
              ease: "easeOut",
            }}
          />

          {/* Cone ridges */}
          {[0.75, 0.5].map((ratio, i) => (
            <circle
              key={i}
              r={wooferSize * ratio}
              fill="none"
              stroke="#3a3545"
              strokeWidth="0.5"
              opacity="0.6"
            />
          ))}

          {/* Dust cap with color accent */}
          <motion.circle
            r={wooferSize * 0.3}
            fill="#1f1a28"
            stroke="#6B5BFF"
            strokeWidth="1.5"
            animate={{
              scale: isMuted ? 1 : [1, 1 + visualIntensity * 0.2, 1], // Increased from 0.1
            }}
            transition={{
              duration: 0.05, // Faster
              repeat: isMuted ? 0 : Infinity,
              ease: "easeOut",
            }}
          />
        </g>

        {/* Tweeter - NO rotating ring, just clean golden dome */}
        <g transform={`translate(${width / 2}, ${height * 0.2})`}>
          {/* Tweeter housing */}
          <circle r={tweeterSize + 4} fill="#15121a" stroke="#4a4060" strokeWidth="1" />
          {/* Tweeter waveguide */}
          <circle r={tweeterSize + 1} fill="#252030" />
          {/* Tweeter dome - golden */}
          <circle r={tweeterSize} fill={`url(#tweeter-${uniqueId})`} />
          {/* Dome highlight */}
          <circle r={tweeterSize * 0.35} fill="#FFF8DC" opacity="0.5" />
        </g>

        {/* LED power indicator */}
        <motion.g transform={`translate(${width - 12}, ${height - 14})`}>
          <circle r="4" fill="#15121a" stroke="#4a4060" strokeWidth="0.5" />
          <motion.circle
            r="2.5"
            fill={isMuted ? "#555" : "#00FF88"}
            animate={{
              opacity: isMuted ? 0.3 : [0.7, 1, 0.7],
            }}
            transition={{
              duration: 0.6,
              repeat: isMuted ? 0 : Infinity,
            }}
            style={{
              filter: isMuted ? "none" : `drop-shadow(0 0 4px #00FF88)`,
            }}
          />
        </motion.g>

        {/* Brand plate */}
        <rect
          x={width / 2 - 15}
          y={height - 22}
          width="30"
          height="10"
          rx="2"
          fill="#1f1a28"
          stroke="#4a4060"
          strokeWidth="0.5"
        />

        {/* Mute indicator */}
        {isMuted && (
          <g>
            <rect
              x="2"
              y="2"
              width={width - 4}
              height={height - 4}
              rx="6"
              fill="rgba(0, 0, 0, 0.4)"
            />
            <g transform={`translate(${width / 2}, ${height / 2})`}>
              <circle
                r={Math.min(width, height) * 0.22}
                fill="rgba(20, 15, 25, 0.8)"
                stroke="#FF4455"
                strokeWidth="2.5"
              />
              <line
                x1={-Math.min(width, height) * 0.1}
                y1={-Math.min(width, height) * 0.1}
                x2={Math.min(width, height) * 0.1}
                y2={Math.min(width, height) * 0.1}
                stroke="#FF4455"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line
                x1={Math.min(width, height) * 0.1}
                y1={-Math.min(width, height) * 0.1}
                x2={-Math.min(width, height) * 0.1}
                y2={Math.min(width, height) * 0.1}
                stroke="#FF4455"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
          </g>
        )}
      </svg>
    </motion.div>
  );
}
