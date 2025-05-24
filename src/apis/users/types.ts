import { z } from "zod";

export const signUpFormSchema = z
  .object({
    email: z.string().email(),
    nickname: z.string().min(1, "닉네임을 입력해주세요"),
    password: z.string().min(6, "비밀번호는 6자 이상입니다."),
    passwordConfirmation: z.string().min(1, "비밀번호 확인을 입력해주세요"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirmation"],
  });
export type SignUpFormData = z.infer<typeof signUpFormSchema>;

export const signUpResponseSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  profileImageUrl: z.string().url(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type SignUpResponse = z.infer<typeof signUpResponseSchema>;
