import OpengraphImage, {
  alt as ogAlt,
  size as ogSize,
  contentType as ogContentType,
} from "./opengraph-image";

/**
 * Twitter/X card image — reuses the same branded card as the Open Graph image.
 * Next.js App Router auto-wires this as <meta name="twitter:image">.
 *
 * NOTE: config fields (runtime/alt/size/contentType) must be declared here,
 * not re-exported, per Next.js metadata-route rules.
 */
export const runtime = "edge";
export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default OpengraphImage;
