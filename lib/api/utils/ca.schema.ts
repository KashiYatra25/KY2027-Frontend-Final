import { z } from "zod";

// ═══════════════════════════════════════════════════════════════════
// CAMPUS AMBASSADOR SCHEMA
// Validation schema for CA application
// ═══════════════════════════════════════════════════════════════════

/**
 * Schema for CA application submission
 * Empty object since userId is derived from auth header
 */
const CaApplicationSchema = z.object({});

type CaApplicationSchemaType = z.infer<typeof CaApplicationSchema>;

export { CaApplicationSchema, type CaApplicationSchemaType };
