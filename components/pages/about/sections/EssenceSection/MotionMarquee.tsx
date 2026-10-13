import { motion } from "framer-motion";
import Image from "next/image";
import type { SliderImage } from "./data";

// ═══════════════════════════════════════════════════════════════════
// MOTION MARQUEE - Framer Motion marquee with hover effects for desktop
// ═══════════════════════════════════════════════════════════════════

export const MotionMarquee = ({
  images,
  direction = "left",
  speed = 30,
}: {
  images: SliderImage[];
  direction?: "left" | "right";
  speed?: number;
}) => {
  // Double images for seamless loop
  const doubledImages = [...images, ...images];

  return (
    <div className="relative overflow-hidden py-4">
      {/* Gradient masks */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-32 bg-gradient-to-r from-[#08080c] to-transparent" />
      <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-32 bg-gradient-to-l from-[#08080c] to-transparent" />

      <motion.div
        className="flex gap-6"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {doubledImages.map((image, i) => (
          <div
            key={i}
            className="group relative h-56 w-80 flex-shrink-0 overflow-hidden rounded-2xl"
            style={{
              background: "linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)",
              border: "2px solid rgba(99, 102, 241, 0.2)",
            }}
          >
            {/* Hover glow - desktop only */}
            <div
              className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(99, 102, 241, 0.2) 0%, transparent 70%)",
              }}
            />
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
