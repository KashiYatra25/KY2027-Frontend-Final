/**
 * Data payload for updating a user's college
 */
export interface UpdateCollegeData {
  college: string;
}

/**
 * Minimal authenticated user info (session-derived)
 */
export interface ProfileUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}
