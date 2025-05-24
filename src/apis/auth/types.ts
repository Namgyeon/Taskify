import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});
export type SignInFormData = z.infer<typeof signInFormSchema>;

export const signInResponseSchema = z.object({
  user: z.object({
    id: z.number(),
    email: z.string().email(),
    profileImageUrl: z.string().url(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  accessToken: z.string(),
});
export type SignInResponse = z.infer<typeof signInResponseSchema>;
