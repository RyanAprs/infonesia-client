import { z } from "zod";

export const CategorySchema = z.object({
  name: z
    .string()
    .max(50)
    .refine((val) => val.trim().length > 0, "Nama kategori tidak boleh kosong"),
});
