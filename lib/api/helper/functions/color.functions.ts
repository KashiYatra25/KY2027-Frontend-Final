// ═══════════════════════════════════════════════════════════════════
// COLOR HELPERS
// ═══════════════════════════════════════════════════════════════════

/**
 * Convert a hex color (e.g. "#D4A853") to an "r, g, b" string suitable for
 * embedding inside `rgba(...)` CSS values. Falls back to "0, 0, 0".
 */
export function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "0, 0, 0";
}
