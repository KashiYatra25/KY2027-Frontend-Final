"use client";

import { MotionZone } from "@/lib/motion/MotionZone";
import { FestHighlightsContent } from "./FestHighlightsContent";

export function FestHighlightsSection() {
  return (
    <MotionZone threshold={0.05} rootMargin="100px">
      <FestHighlightsContent />
    </MotionZone>
  );
}
