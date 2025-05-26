import { z } from "zod";

export const signInFormSchema = z.object({
  email: z
    .string()
    .nonempty("이메일을 입력해주세요")
    .email("올바른 이메일 주소 형식이 아닙니다"),
  password: z
    .string()
    .nonempty("비밀번호를 입력해주세요")
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다"),
});
export type SignInFormData = z.infer<typeof signInFormSchema>;

export const signInResponseSchema = z.object({
  user: z.object({
    id: z.number(),
    email: z.string(),
    nickname: z.string(),
    profileImageUrl: z.union([z.string(), z.instanceof(URL), z.null()]),
    createdAt: z.union([z.string(), z.date()]),
    updatedAt: z.union([z.string(), z.date()]),
  }),
});
export type SignInResponse = z.infer<typeof signInResponseSchema>;

export const signInFailSchema = z.object({
  message: z.string(),
});
export type SignInFailSchema = z.infer<typeof signInFailSchema>;
