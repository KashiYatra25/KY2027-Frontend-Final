// ═══════════════════════════════════════════════════════════════════
// CAMPUS AMBASSADOR PAGE CONFIG
// Page-level configuration values and tunable 3D/animation settings
// ═══════════════════════════════════════════════════════════════════

/** External application form opened from the CTA section. */
export const CA_FORM_URL = "https://forms.google.com/your-ca-form";

/** Auth callback route used when an unauthenticated user clicks apply. */
export const CA_LOGIN_CALLBACK = "/login?callbackUrl=/campus-ambassador";

/** Path to the GLTF astronaut model rendered in the decor layer. */
export const ASTRONAUT_MODEL_PATH = "/ca/AstronautModel.glb";

// ============================================
// ASTRONAUT 3D CONFIG - Adjust these values
// ============================================
export const ASTRONAUT_CONFIG = {
  // Model scale
  scale: 1.2,

  // Model Y position offset
  positionY: -2.5,

  // Horizontal movement: starts on right, moves to left (3D world units)
  startX: 3, // Start position (right side)
  endX: -3, // End position (left side)

  // Camera settings
  cameraZ: 6,
  cameraY: 0.5,
  fov: 50,

  // Initial rotation (radians)
  initialRotationY: Math.PI * 0.2,
  initialRotationX: 0.1,

  // Scroll-based rotation range (radians)
  rotationMultiplierY: Math.PI * 2, // Full 360° rotation on Y
  rotationMultiplierX: 0.3,

  // Floating animation
  floatAmplitude: 0.1,
  floatSpeed: 0.8,

  // Lighting
  ambientIntensity: 0.6,
  mainLightIntensity: 1.5,
  rimLightIntensity: 0.8,
} as const;
