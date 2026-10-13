import { ImageCard } from "./ImageCard";
import type { SliderImage } from "./data";

// ═══════════════════════════════════════════════════════════════════
// CSS MARQUEE - Performant CSS-based infinite marquee for mobile
// ═══════════════════════════════════════════════════════════════════

export const CSSMarquee = ({
  images,
  direction = "left",
}: {
  images: SliderImage[];
  direction?: "left" | "right";
}) => {
  const animationClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="relative overflow-hidden py-3">
      {/* Gradient masks */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-16 bg-gradient-to-r from-[#08080c] to-transparent" />
      <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-16 bg-gradient-to-l from-[#08080c] to-transparent" />

      <div className={`flex gap-4 ${animationClass}`} style={{ width: "max-content" }}>
        {/* Double the images for seamless loop */}
        {[...images, ...images].map((image, i) => (
          <ImageCard key={i} src={image.src} alt={image.alt} />
        ))}
      </div>
    </div>
  );
};
