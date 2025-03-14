import { z } from "zod";

export const NewsCreateSchemaAdmin = z.object({
  title: z
    .string()
    .min(1, "Title berita tidak boleh kosong")
    .max(255, "Title berita maksimal 255 karakter")
    .refine((val) => val.trim().length > 0, "Title berita tidak boleh kosong"),
  summary: z
    .string()
    .min(1, "Ringkasan artikel tidak boleh kosong")
    .max(1000, "Ringkasan artikel maksimal 1000 karakter")
    .refine(
      (val) => val.trim().length > 0,
      "Ringkasan artikel tidak boleh kosong"
    ),
  content: z
    .string()
    .min(1, "Konten berita tidak boleh kosong")
    .refine(
      (value) => {
        const encoder = new TextEncoder();
        const sizeInMB = encoder.encode(value).length / (1024 * 1024);
        return sizeInMB <= 50;
      },
      {
        message:
          "Konten berita tidak boleh lebih dari 50MB hapus beberapa gambar baru",
      }
    ),
  authorId: z
    .string()
    .nullable()
    .refine((val) => val !== null && val.trim() !== "", {
      message: "Author tidak boleh kosong atau null",
    }),
  categoryId: z
    .number()
    .int()
    .positive()
    .refine((val) => val > 0, "Kategori tidak boleh kosong"),
});

export const NewsCreateSchema = z.object({
  title: z
    .string()
    .min(1, "Title berita tidak boleh kosong")
    .max(255, "Title berita maksimal 255 karakter")
    .refine((val) => val.trim().length > 0, "Title berita tidak boleh kosong"),
  summary: z
    .string()
    .min(1, "Ringkasan artikel tidak boleh kosong")
    .max(1000, "Ringkasan artikel maksimal 1000 karakter")
    .refine(
      (val) => val.trim().length > 0,
      "Ringkasan artikel tidak boleh kosong"
    ),
  content: z
    .string()
    .min(1, "Konten berita tidak boleh kosong")
    .refine(
      (value) => {
        const encoder = new TextEncoder();
        const sizeInMB = encoder.encode(value).length / (1024 * 1024);
        return sizeInMB <= 50;
      },
      {
        message:
          "Konten berita tidak boleh lebih dari 50MB hapus beberapa gambar baru",
      }
    ),
  categoryId: z
    .number()
    .int()
    .positive()
    .refine((val) => val > 0, "Kategori tidak boleh kosong"),
});
