// ═══════════════════════════════════════════════════════════════════
// ERROR HELPERS
// Generic helpers for extracting human-readable messages from errors.
// ═══════════════════════════════════════════════════════════════════

/**
 * Patterns that indicate an internal/technical error message that should
 * NOT be shown to users. We return the fallback instead.
 */
const INTERNAL_ERROR_PATTERNS = [
  /prisma\./i,
  /mongodb/i,
  /postgres/i,
  /mysql/i,
  /sqlite/i,
  /redis/i,
  /ECONNREFUSED/i,
  /ETIMEDOUT/i,
  /does not exist in the current database/i,
  /invocation:/i,
  /stack trace/i,
  /at .+\.(js|ts):\d+/i, // stack trace lines
  /node_modules/i,
  /internal server error/i,
  /unexpected token/i,
  /syntax error/i,
  /cannot read propert/i,
  /undefined is not/i,
  /null is not/i,
];

/**
 * Returns true if the message looks like an internal/technical error
 * that shouldn't be shown to end users.
 */
function isInternalError(message: string): boolean {
  return INTERNAL_ERROR_PATTERNS.some((pattern) => pattern.test(message));
}

/**
 * Extracts a human-readable error message from an unknown error value.
 *
 * Prefers, in order:
 * 1. `error.response.data.info`
 * 2. `error.response.data.message`
 * 3. `error.message`
 * 4. the provided `fallback`
 *
 * If the extracted message looks like an internal/technical error
 * (database errors, stack traces, etc.), returns the fallback instead
 * to avoid leaking implementation details to users.
 */
export function extractErrorMessage(error: unknown, fallback: string): string {
  if (!error) return fallback;

  const axiosError = error as {
    response?: { data?: { info?: string; message?: string } };
    message?: string;
  };

  // Try to get a message from the error
  let message: string | undefined;

  if (axiosError.response?.data?.info) {
    message = axiosError.response.data.info;
  } else if (axiosError.response?.data?.message) {
    message = axiosError.response.data.message;
  } else if (axiosError.message) {
    message = axiosError.message;
  }

  // If no message or it looks like an internal error, use fallback
  if (!message || isInternalError(message)) {
    return fallback;
  }

  return message;
}
