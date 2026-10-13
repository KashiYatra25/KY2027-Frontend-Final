import { z } from "zod";

// Individual registration
export const RegisterIndividualSchema = z.object({
  type: z.literal("individual"),
});

// Team registration
export const RegisterTeamSchema = z.object({
  type: z.literal("team"),
  teamId: z.string().min(1, "Team ID is required"),
});

// Combined schema (discriminated union)
export const RegisterForEventSchema = z.discriminatedUnion("type", [
  RegisterIndividualSchema,
  RegisterTeamSchema,
]);

export type RegisterIndividualType = z.infer<typeof RegisterIndividualSchema>;
export type RegisterTeamType = z.infer<typeof RegisterTeamSchema>;
export type RegisterForEventType = z.infer<typeof RegisterForEventSchema>;
