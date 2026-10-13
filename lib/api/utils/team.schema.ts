import { z } from "zod";

export const CreateTeamSchema = z.object({
  name: z.string().min(3, "Team name must be at least 3 characters").max(50, "Team name too long"),
  members: z.array(z.string()).min(1, "Add at least one team member"),
});

export type CreateTeamType = z.infer<typeof CreateTeamSchema>;
