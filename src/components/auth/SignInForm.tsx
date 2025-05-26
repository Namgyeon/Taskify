"use client";

import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import { SignInFormData, signInFormSchema } from "@/apis/auth/types";
import PasswordInput from "@/components/ui/PasswordInput";
import Button from "@/components/ui/Button";
import { useSignIn } from "@/apis/auth/queries";
import { zodResolver } from "@hookform/resolvers/zod";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
    mode: "onChange",
  });

  const signInMutation = useSignIn();

  const onSubmit = (data: SignInFormData) => {
    signInMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4"
    >
      <Input
        {...register("email")}
        label="이메일"
        placeholder="이메일을 입력하세요."
        error={!!errors.email}
        errorMessage={errors.email?.message}
      />
      <PasswordInput
        label="비밀번호"
        {...register("password")}
        error={!!errors.password}
        errorMessage={errors.password?.message}
      />
      <Button type="submit" text="로그인" disabled={!isValid || isSubmitting} />
    </form>
  );
};

export default SignInForm;
