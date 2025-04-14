import { z } from "zod";

export const CommentSchema = z.object({
  content: z
    .string()
    .max(50)
    .refine((val) => val.trim().length > 0, "Comment tidak boleh kosong"),
});
