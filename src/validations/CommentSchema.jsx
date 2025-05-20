import { z } from "zod";

export const CommentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty"),
});
