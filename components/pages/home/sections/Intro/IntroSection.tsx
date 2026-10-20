"use client";

import { useIntro } from "./context/IntroContext";
import { CursorTrail, BlastEffect, CountdownPoster, FirePot, NeonStage } from "./sections";
import "./styles/cursor.css";

export function IntroSection() {
  const { phase, isIntroComplete } = useIntro();

  if (isIntroComplete) return null;

  const cursorClass = phase === "loading" ? "intro-cursor-loading" : "intro-cursor";

  return (
    <section className={`relative h-screen w-full overflow-hidden bg-black ${cursorClass}`}>
      {/* Cursor trail effect - z-index 100 but pointer-events-none */}
      <CursorTrail />

      {/* Neon stage with hold-to-enter ring + skip - z-10 (idle, loading, blasting) */}
      <NeonStage />

      {/* Countdown concert poster - shows after blast (replaces the old video) - z-0 */}
      <CountdownPoster />

      {/* Audio-reactive fire pot - shows during video phase */}
      <FirePot />

      {/* Blast effect overlay - z-100 but pointer-events-none */}
      <BlastEffect />
    </section>
  );
}
