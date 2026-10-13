"use client";

import { memo } from "react";
import { InteractiveSpeaker } from "./InteractiveSpeaker";

// ═══════════════════════════════════════════════════════════════════
// SPEAKER STACK - Dual stacked interactive speakers
// ═══════════════════════════════════════════════════════════════════

// Dual speaker stack component
export const SpeakerStack = memo(function SpeakerStack({
  side = "left",
  className = "",
}: {
  side?: "left" | "right";
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <InteractiveSpeaker size={100} side={side} />
      <InteractiveSpeaker size={80} side={side} />
    </div>
  );
});
