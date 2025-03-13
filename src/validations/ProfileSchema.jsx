import { z } from "zod";

export const UpdateProfileSchema = z.object({
  fullName: z
    .string()
    .max(50)
    .refine((val) => val.trim().length > 0, "Nama tidak boleh kosong"),
  email: z
    .string()
    .nonempty("Email tidak boleh kosong")
    .email({ message: "Email tidak valid" }),
});

const isPasswordFormat = (str) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return passwordRegex.test(str);
};

export const UpdatePasswordSchema = z
  .object({
    currentPassword: z.string().nonempty("Password tidak boleh kosong"),
    newPassword: z
      .string()
      .min(6)
      .max(255)
      .refine(
        isPasswordFormat,
        "Password baru tidak sesuai format (minimal 6 karakter, harus mengandung huruf besar, huruf kecil, angka, dan karakter spesial)"
      ),
    confirmPassword: z
      .string()
      .min(6)
      .max(255)
      .refine(
        isPasswordFormat,
        "Konfirmasi password tidak sesuai format (minimal 6 karakter, harus mengandung huruf besar, huruf kecil, angka, dan karakter spesial)"
      ),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Konfirmasi password harus sama dengan password baru",
    path: ["confirmPassword"],
  });
