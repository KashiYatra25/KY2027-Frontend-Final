// ═══════════════════════════════════════════════════════════════════
// PROFILE WELCOME FLAG HELPERS
// Tracks whether the post-profile-completion welcome screen has been shown,
// persisted in localStorage so it only appears once per browser.
// ═══════════════════════════════════════════════════════════════════

const WELCOME_SHOWN_KEY = "ky_profile_welcome_shown";

export function hasWelcomeBeenShown(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(WELCOME_SHOWN_KEY) === "true";
}

export function markWelcomeAsShown(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(WELCOME_SHOWN_KEY, "true");
}
