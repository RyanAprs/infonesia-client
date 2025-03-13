import { z } from "zod";

const isPasswordFormat = (str) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return passwordRegex.test(str);
};

export const RegisterSchema = z.object({
  fullName: z
    .string()
    .max(50)
    .refine((val) => val.trim().length > 0, "Nama tidak boleh kosong"),
  email: z
    .string()
    .nonempty("Email tidak boleh kosong")
    .email({ message: "Email tidak valid" }),
  password: z
    .string()
    .min(6)
    .max(255)
    .refine(
      isPasswordFormat,
      "Password tidak sesuai format (minimal 6 karakter, harus mengandung huruf besar, huruf kecil, angka, dan karakter spesial)"
    ),
});

export const LoginSchema = z.object({
  fullName: z
    .string()
    .max(50)
    .refine((val) => val.trim().length > 0, "Nama tidak boleh kosong"),
  email: z
    .string()
    .nonempty("Email tidak boleh kosong")
    .email({ message: "Email tidak valid" }),
  password: z
    .string()
    .optional()
    .refine(
      (val) => !val || isPasswordFormat(val),
      "Password tidak sesuai format (minimal 6 karakter, harus mengandung huruf besar, huruf kecil, angka, dan karakter spesial)"
    ),
});
