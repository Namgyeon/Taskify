import { z } from "zod";

export const signupFormSchema = z
  .object({
    email: z.string().email(),
    nickname: z.string().trim().min(1, "닉네임을 입력해주세요"),
    password: z.string().trim().min(6, "비밀번호는 6자 이상입니다."),
    passwordConfirmation: z
      .string()
      .trim()
      .min(1, "비밀번호 확인을 입력해주세요"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirmation"],
  });
export type SignupFormData = z.infer<typeof signupFormSchema>;

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  nickname: z.string(),
  profileImageUrl: z.union([z.string().url(), z.null()]),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
});
export type SignupResponse = z.infer<typeof userSchema>;

export type User = z.infer<typeof userSchema>;

export const patchUserSchema = z.object({
  nickname: z.string().trim().min(1, "닉네임을 입력해주세요"),
  profileImageUrl: z.union([z.string().url(), z.null()]),
});
export type PatchUser = z.infer<typeof patchUserSchema>;

export const patchUserFormSchema = patchUserSchema.extend({
  email: z.string().email(),
});
export type PatchUserFormData = z.infer<typeof patchUserFormSchema>;

export const postProfileImageFormSchema = z.object({
  image: z.instanceof(File),
});
export type PostProfileImageFormData = z.infer<
  typeof postProfileImageFormSchema
>;

export const postProfileImageResponseSchema = z.object({
  profileImageUrl: z.string(),
});
export type PostProfileImageResponse = z.infer<
  typeof postProfileImageResponseSchema
>;
