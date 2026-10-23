"use client";

import { MotionZone } from "@/lib/motion/MotionZone";
import { BanarasiVibesContent } from "./BanarasiVibesContent";

// Exported component wraps content with MotionZone
export function BanarasiVibesSection() {
  return (
    <MotionZone threshold={0.05} rootMargin="100px">
      <BanarasiVibesContent />
    </MotionZone>
  );
}
