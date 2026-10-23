/**
 * Pass page configuration for Kashiyatra
 * Static pass data lives here (passes don't change), plus animation/sizing config.
 */

import type { PassConfig } from "@/lib/api/helper/types";
import { IMAGES } from "@/lib/images";

// ═══════════════════════════════════════════════════════════════════
// PASSES DATA (static — single source of truth, no backend fetch)
//
// All passes include: Welcome Kit (T-shirt + toiletries), Campus Tour,
// all Events entry, and Pro-Nite entries.
//   • Darbar  = all of the above + Accommodation
//   • Swarnim = all of the above + Accommodation + Food
// ═══════════════════════════════════════════════════════════════════
export const PASSES: PassConfig[] = [
  {
    id: "yatri",
    name: "Yatri Pass",
    price: 2399,
    image: IMAGES.passes.yatri,
    tagline: "Begin Your Journey",
    accentColor: "#1A5F7A", // Ganga blue
    glowColor: "rgba(26, 95, 122, 0.5)",
    popular: false,
    benefits: [
      { text: "Welcome Kit (T-shirt + Toiletries)" },
      { text: "Campus Tour" },
      { text: "All Events Entry" },
      { text: "Pro-Nite Entries" },
    ],
    details: [
      {
        icon: "🎁",
        title: "Welcome Kit",
        description: "A festival welcome kit including a T-shirt and toiletries.",
      },
      {
        icon: "🏛️",
        title: "Campus Tour",
        description: "A guided tour of the historic IIT (BHU) campus.",
      },
      { icon: "🎭", title: "Events Entry", description: "Entry to all festival events." },
      {
        icon: "🎤",
        title: "Pro-Nite Entries",
        description: "Access to all the Pro-Nite performances.",
      },
    ],
  },
  {
    id: "darbar",
    name: "Darbar Pass",
    price: 2699,
    image: IMAGES.passes.darbar,
    tagline: "The Royal Experience",
    accentColor: "#D4A853", // Gold
    glowColor: "rgba(212, 168, 83, 0.5)",
    popular: true,
    benefits: [
      { text: "Accommodation", highlight: true },
      { text: "Welcome Kit (T-shirt + Toiletries)" },
      { text: "Campus Tour" },
      { text: "All Events Entry" },
      { text: "Pro-Nite Entries" },
    ],
    details: [
      {
        icon: "🏨",
        title: "Accommodation",
        description: "Stay arranged for the festival duration.",
      },
      {
        icon: "🎁",
        title: "Welcome Kit",
        description: "A festival welcome kit including a T-shirt and toiletries.",
      },
      {
        icon: "🏛️",
        title: "Campus Tour",
        description: "A guided tour of the historic IIT (BHU) campus.",
      },
      { icon: "🎭", title: "Events Entry", description: "Entry to all festival events." },
      {
        icon: "🎤",
        title: "Pro-Nite Entries",
        description: "Access to all the Pro-Nite performances.",
      },
    ],
  },
  {
    id: "swarnim",
    name: "Swarnim Pass",
    price: 2999,
    image: IMAGES.passes.swarnim,
    tagline: "The Divine Experience",
    accentColor: "#FFD700", // Bright gold
    glowColor: "rgba(255, 215, 0, 0.5)",
    popular: false,
    benefits: [
      { text: "Accommodation", highlight: true },
      { text: "Food", highlight: true },
      { text: "Welcome Kit (T-shirt + Toiletries)" },
      { text: "Campus Tour" },
      { text: "All Events Entry" },
      { text: "Pro-Nite Entries" },
    ],
    details: [
      {
        icon: "🏨",
        title: "Accommodation",
        description: "Stay arranged for the festival duration.",
      },
      { icon: "🍽️", title: "Food", description: "Meals included for the festival duration." },
      {
        icon: "🎁",
        title: "Welcome Kit",
        description: "A festival welcome kit including a T-shirt and toiletries.",
      },
      {
        icon: "🏛️",
        title: "Campus Tour",
        description: "A guided tour of the historic IIT (BHU) campus.",
      },
      { icon: "🎭", title: "Events Entry", description: "Entry to all festival events." },
      {
        icon: "🎤",
        title: "Pro-Nite Entries",
        description: "Access to all the Pro-Nite performances.",
      },
    ],
  },
];

/**
 * Animation configuration - tune these values to adjust feel
 */
export const ANIMATION = {
  // Card entry animation
  stagger: {
    delayChildren: 0.2,
    staggerChildren: 0.15,
  },

  // Container variants for section animations
  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.2, staggerChildren: 0.15, when: "beforeChildren" },
    },
  },

  // Card variants
  card: {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }, // easeOut
    },
  },

  // Pass image floating
  float: {
    duration: 3,
    ease: [0.45, 0.05, 0.55, 0.95] as const, // easeInOut
    repeat: Infinity,
    repeatType: "reverse" as const,
  },

  // Hover effects
  hover: {
    scale: 1.03,
    y: -12,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }, // easeOut
  },

  // Image hover
  imageHover: {
    scale: 1.08,
    transition: { duration: 0.3 },
  },

  // Button shimmer
  shimmer: {
    duration: 2,
    repeat: Infinity,
    ease: "linear" as const,
  },
} as const;

/**
 * Responsive breakpoints for pass card sizing
 */
export const CARD_SIZES = {
  mobile: {
    width: "100%",
    imageHeight: 280,
  },
  tablet: {
    width: "300px",
    imageHeight: 320,
  },
  desktop: {
    width: "340px",
    imageHeight: 380,
  },
} as const;
