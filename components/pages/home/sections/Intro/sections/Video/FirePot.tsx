"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring } from "framer-motion";
import { useIntro } from "@/components/pages/home/sections/Intro/context/IntroContext";
import { Speaker } from "./Speaker";

export function FirePot() {
  const { phase, audioRef, isMuted, toggleMute } = useIntro();
  const [intensity, setIntensity] = useState(0.3);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isConnectedRef = useRef(false);

  const springIntensity = useSpring(0.3, {
    stiffness: 500,
    damping: 20,
    mass: 0.3,
  });

  useEffect(() => {
    springIntensity.set(intensity);
  }, [intensity, springIntensity]);

  // Use ref to store analyze function for stable recursive calls
  const analyzeAudioRef = useRef<() => void>(() => {});

  useEffect(() => {
    analyzeAudioRef.current = () => {
      if (!analyzerRef.current) {
        animationFrameRef.current = requestAnimationFrame(analyzeAudioRef.current);
        return;
      }

      const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
      analyzerRef.current.getByteFrequencyData(dataArray);

      const allFreqs = Array.from(dataArray);
      const avgVolume = allFreqs.reduce((a, b) => a + b, 0) / allFreqs.length;
      const bass = dataArray.slice(0, 6).reduce((a, b) => a + b, 0) / 6;
      const mids = dataArray.slice(6, 20).reduce((a, b) => a + b, 0) / 14;

      const combined = (bass * 0.5 + mids * 0.3 + avgVolume * 0.2) / 255;
      const curved = Math.pow(combined, 0.7);
      const finalIntensity = Math.max(0.15, Math.min(1, curved * 1.3));

      setIntensity(finalIntensity);
      animationFrameRef.current = requestAnimationFrame(analyzeAudioRef.current);
    };
  }, []);

  const analyzeAudio = useCallback(() => {
    analyzeAudioRef.current();
  }, []);

  useEffect(() => {
    if (phase !== "video") return;

    if (!audioRef?.current) {
      setIntensity(0.3);
      return;
    }

    if (isMuted) {
      setIntensity(0.1);
      return;
    }

    const setupAnalyzer = () => {
      if (isConnectedRef.current) return;

      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioCtx();

        analyzerRef.current = audioContextRef.current.createAnalyser();
        analyzerRef.current.fftSize = 64;
        analyzerRef.current.smoothingTimeConstant = 0.2;

        sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current!);
        sourceRef.current.connect(analyzerRef.current);
        analyzerRef.current.connect(audioContextRef.current.destination);

        isConnectedRef.current = true;
        analyzeAudio();
      } catch (error) {
        console.warn("Audio analyzer setup failed:", error);
        setIntensity(0.3);
      }
    };

    const audioEl = audioRef.current;

    if (audioEl.readyState >= 2) {
      setupAnalyzer();
    } else {
      audioEl.addEventListener("canplay", setupAnalyzer);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      audioEl?.removeEventListener("canplay", setupAnalyzer);
    };
  }, [audioRef, isMuted, phase, analyzeAudio]);

  useEffect(() => {
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close();
      }
    };
  }, []);

  if (phase !== "video") return null;

  return (
    <>
      {/* Left speaker group - Desktop only */}
      <motion.div
        className="absolute bottom-0 left-2 z-20 hidden sm:left-4 sm:block"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="flex items-end gap-2 sm:gap-3">
          <Speaker
            size="small"
            intensity={intensity}
            isMuted={isMuted}
            onToggleMute={toggleMute}
            className="mb-1"
          />
          <Speaker size="large" intensity={intensity} isMuted={isMuted} onToggleMute={toggleMute} />
          <Speaker
            size="medium"
            intensity={intensity}
            isMuted={isMuted}
            onToggleMute={toggleMute}
            className="mb-0.5"
          />
        </div>
      </motion.div>

      {/* Right speaker - Desktop only */}
      <motion.div
        className="absolute right-2 bottom-0 z-20 hidden sm:right-4 sm:block"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Speaker size="large" intensity={intensity} isMuted={isMuted} onToggleMute={toggleMute} />
      </motion.div>
    </>
  );
}
