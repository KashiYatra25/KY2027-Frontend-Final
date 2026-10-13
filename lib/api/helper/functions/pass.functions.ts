import type { Pass, PassConfig } from "@/lib/api/helper/types";

/**
 * Converts backend Pass (from MongoDB) to frontend PassConfig
 */
export function toPassConfig(pass: Pass): PassConfig {
  return {
    id: pass.slug,
    _id: pass._id, // MongoDB ObjectId for API calls
    name: pass.name,
    price: pass.price,
    image: pass.image,
    tagline: pass.tagline,
    accentColor: pass.accentColor,
    glowColor: pass.glowColor,
    popular: pass.popular,
    benefits: pass.benefits,
    details: pass.details,
  };
}
