"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { useIsMobile } from "@/hooks";

/**
 * Intro phases:
 * - idle: Show stage background with Enter button
 * - loading: User is holding the Enter button (audio loading)
 * - blasting: Explosion effect playing
 * - video: Video playing with Continue button visible
 * - complete: Intro done, show Hero and rest of site
 */
type IntroPhase = "idle" | "loading" | "blasting" | "video" | "complete";

interface IntroContextType {
  phase: IntroPhase;
  loadProgress: number; // 0-100 for the hold-to-enter loading
  isIntroComplete: boolean;
  hasSeenIntro: boolean; // Tracks if user has completed intro this session
  isMuted: boolean;
  beatDrop: boolean; // Triggers fire blast effect at beat drop (17 seconds)
  audioRef: React.RefObject<HTMLAudioElement | null>; // Exposed for audio analysis (FirePot)
  startLoading: () => void;
  cancelLoading: () => void;
  startBlast: () => void;
  startVideo: () => void;
  completeIntro: () => void;
  skipIntro: () => void;
  setLoadProgress: (progress: number) => void;
  toggleMute: () => void;
}

const IntroContext = createContext<IntroContextType | null>(null);

// Global flag - persists across client-side navigations but resets on full page refresh
let globalHasSeenIntro = false;

// Beat drop timestamp in the music (in seconds)
const BEAT_DROP_TIME = 17;

export function IntroProvider({ children }: { children: ReactNode }) {
  // Use the global useIsMobile hook - intro is skipped on mobile devices
  const isMobile = useIsMobile();

  // If user has already seen intro (client-side nav), start at complete
  const [phase, setPhase] = useState<IntroPhase>(globalHasSeenIntro ? "complete" : "idle");
  const [loadProgress, setLoadProgress] = useState(0);
  const [hasSeenIntro, setHasSeenIntro] = useState(globalHasSeenIntro);
  const [isMuted, setIsMuted] = useState(false);
  const [beatDrop, setBeatDrop] = useState(false);
  const beatDropTriggeredRef = useRef(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Skip intro on mobile
  useEffect(() => {
    if (isMobile && phase !== "complete") {
      globalHasSeenIntro = true;
      setHasSeenIntro(true);
      setPhase("complete");
    }
  }, [isMobile, phase]);

  // Initialize audio (only on desktop)
  useEffect(() => {
    if (typeof window !== "undefined" && !isMobile) {
      audioRef.current = new Audio("/home/mainMusic.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isMobile]);

  // Monitor audio time for beat drop
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const checkBeatDrop = () => {
      if (
        !beatDropTriggeredRef.current &&
        audio.currentTime >= BEAT_DROP_TIME &&
        audio.currentTime < BEAT_DROP_TIME + 0.5 &&
        phase === "video"
      ) {
        beatDropTriggeredRef.current = true;
        setBeatDrop(true);
        // Reset after animation completes
        setTimeout(() => setBeatDrop(false), 1500);
      }
    };

    audio.addEventListener("timeupdate", checkBeatDrop);
    return () => audio.removeEventListener("timeupdate", checkBeatDrop);
  }, [phase]);

  // Handle mute state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const startLoading = useCallback(() => {
    // Don't start loading on mobile
    if (isMobile) return;

    setPhase("loading");
    setLoadProgress(0);
    beatDropTriggeredRef.current = false; // Reset beat drop trigger

    // Start playing audio from 3 seconds
    if (audioRef.current) {
      audioRef.current.currentTime = 3.8;
      audioRef.current.play().catch(() => {});
    }
  }, [isMobile]);

  const cancelLoading = useCallback(() => {
    setPhase("idle");
    setLoadProgress(0);
    beatDropTriggeredRef.current = false;

    // Stop and reset audio to 3 seconds
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 3;
    }
  }, []);

  const startBlast = useCallback(() => {
    setPhase("blasting");
    setLoadProgress(0);
    // Keep audio playing through blast
  }, []);

  const startVideo = useCallback(() => {
    setPhase("video");
    // Keep audio playing during video
  }, []);

  const completeIntro = useCallback(() => {
    setPhase("complete");
    beatDropTriggeredRef.current = false;

    // Mark intro as seen globally (persists across client-side navigations)
    globalHasSeenIntro = true;
    setHasSeenIntro(true);

    // Stop audio when intro completes
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 3;
    }
  }, []);

  const skipIntro = useCallback(() => {
    setPhase("complete");
    beatDropTriggeredRef.current = false;

    // Mark intro as seen globally
    globalHasSeenIntro = true;
    setHasSeenIntro(true);

    // Stop audio when skipping
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 3;
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const isIntroComplete = phase === "complete";

  return (
    <IntroContext.Provider
      value={{
        phase,
        loadProgress,
        isIntroComplete,
        hasSeenIntro,
        isMuted,
        beatDrop,
        audioRef,
        startLoading,
        cancelLoading,
        startBlast,
        startVideo,
        completeIntro,
        skipIntro,
        setLoadProgress,
        toggleMute,
      }}
    >
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  const context = useContext(IntroContext);
  if (!context) {
    throw new Error("useIntro must be used within an IntroProvider");
  }
  return context;
}
