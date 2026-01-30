import z from "zod";

const profile_creation_schema = z.object({
  // Allows empty string OR a string with min 6 chars
  nickname: z.string().min(6).or(z.literal("")).optional(),
  bio: z.string().max(500).optional(),
  birthday: z.string().optional(),
});

export default profile_creation_schema;
