import { IMAGES } from "@/lib/images";

// ═══════════════════════════════════════════════════════════════════
// ESSENCE SECTION DATA - Marquee slider image sets
// ═══════════════════════════════════════════════════════════════════

export interface SliderImage {
  src: string;
  alt: string;
}

// Slider 1 images (Left to Right)
export const slider1Images: SliderImage[] = [
  { src: IMAGES.about.slider.left1, alt: "Kashi Yatra moment 1" },
  { src: IMAGES.about.slider.left2, alt: "Kashi Yatra moment 2" },
  { src: IMAGES.about.slider.left3, alt: "Kashi Yatra moment 3" },
  { src: IMAGES.about.slider.left4, alt: "Kashi Yatra moment 4" },
  { src: IMAGES.about.slider.left5, alt: "Kashi Yatra moment 5" },
  { src: IMAGES.about.slider.left6, alt: "Kashi Yatra moment 6" },
];

// Slider 2 images (Right to Left)
export const slider2Images: SliderImage[] = [
  { src: IMAGES.about.slider.right1, alt: "Festival highlight 1" },
  { src: IMAGES.about.slider.right2, alt: "Festival highlight 2" },
  { src: IMAGES.about.slider.right3, alt: "Festival highlight 3" },
  { src: IMAGES.about.slider.right4, alt: "Festival highlight 4" },
  { src: IMAGES.about.slider.right5, alt: "Festival highlight 5" },
  { src: IMAGES.about.slider.right6, alt: "Festival highlight 6" },
];
