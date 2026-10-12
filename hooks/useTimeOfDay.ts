"use client";

import { useState, useEffect, useCallback } from "react";
import {
  type TimeOfDay,
  TIME_GRADIENTS,
  SHOW_MOON,
  SHOW_STARS,
  STARS_OPACITY,
  getTimeOfDay,
} from "@/components/pages/home/constants/palette";

interface TimeOfDayState {
  timeOfDay: TimeOfDay;
  gradient: string;
  showMoon: boolean;
  showStars: boolean;
  starsOpacity: number;
  hour: number;
  /** Whether the user has manually overridden the theme */
  isManualMode: boolean;
  /** Whether the theme picker is open */
  isPickerOpen: boolean;
  /** Set a specific theme */
  setTheme: (theme: TimeOfDay) => void;
  /** Toggle the theme picker visibility */
  togglePicker: () => void;
  /** Close the picker */
  closePicker: () => void;
  /** Reset to automatic time-based mode */
  resetToAuto: () => void;
}

// ⚠️ DEV OVERRIDE: Set to a specific time period for testing, or null for real time
// Options: 'dawn' | 'morning' | 'afternoon' | 'evening' | 'dusk' | 'night' | null
const DEV_TIME_OVERRIDE: TimeOfDay | null = null; // Change to null for production

/**
 * Hook that returns current time of day and associated sky configuration.
 * Updates every minute to check for time period changes.
 *
 * Supports manual theme selection with a visual picker.
 * Available themes: night, dawn, morning, afternoon, evening, dusk
 *
 * Time periods (auto mode):
 * - Dawn:      5:00 - 7:00
 * - Morning:   7:00 - 11:00
 * - Afternoon: 11:00 - 16:00
 * - Evening:   16:00 - 19:00
 * - Dusk:      19:00 - 21:00
 * - Night:     21:00 - 5:00
 */
export function useTimeOfDay(): TimeOfDayState {
  const [manualTheme, setManualTheme] = useState<TimeOfDay | null>(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [autoTime, setAutoTime] = useState<TimeOfDay>(() => {
    return DEV_TIME_OVERRIDE ?? "night";
  });
  const [hour, setHour] = useState(12);

  // Determine the active theme (manual override takes precedence)
  const activeTheme: TimeOfDay = manualTheme ?? autoTime;

  // Set a specific theme
  const setTheme = useCallback((theme: TimeOfDay) => {
    setManualTheme(theme);
    setIsPickerOpen(false);
  }, []);

  // Toggle picker visibility
  const togglePicker = useCallback(() => {
    setIsPickerOpen((prev) => !prev);
  }, []);

  // Close picker
  const closePicker = useCallback(() => {
    setIsPickerOpen(false);
  }, []);

  // Reset to automatic time-based mode
  const resetToAuto = useCallback(() => {
    setManualTheme(null);
    setIsPickerOpen(false);
  }, []);

  useEffect(() => {
    // If DEV override is set, don't update based on real time
    if (DEV_TIME_OVERRIDE) return;

    const updateTime = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const timeOfDay = getTimeOfDay(currentHour);

      setAutoTime(timeOfDay);
      setHour(currentHour);
    };

    // Set initial value
    updateTime();

    // Update every minute to check for time period changes
    const interval = setInterval(updateTime, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    timeOfDay: activeTheme,
    gradient: TIME_GRADIENTS[activeTheme],
    showMoon: SHOW_MOON[activeTheme],
    showStars: SHOW_STARS[activeTheme],
    starsOpacity: STARS_OPACITY[activeTheme],
    hour,
    isManualMode: manualTheme !== null,
    isPickerOpen,
    setTheme,
    togglePicker,
    closePicker,
    resetToAuto,
  };
}

// Re-export TimeOfDay for components that need it
export type { TimeOfDay };
