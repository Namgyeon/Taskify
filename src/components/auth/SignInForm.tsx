"use client";

import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import { SignInData } from "@/lib/types/auth-types";
import PasswordInput from "@/components/ui/PasswordInput";
import Button from "@/components/ui/Button";
import { useSignIn } from "@/hooks/useAuth";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignInData>({
    mode: "onChange",
  });

  const signInMutation = useSignIn();

  const onSubmit = (data: SignInData) => {
    signInMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4"
    >
      <Input
        {...register("email", {
          required: "이메일은 필수입니다.",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "유효한 이메일 주소를 입력해주세요.",
          },
        })}
        label="이메일"
        placeholder="이메일을 입력하세요."
        error={!!errors.email}
        errorMessage={errors.email?.message}
      />
      <PasswordInput
        label="비밀번호"
        {...register("password", {
          required: "비밀번호는 필수입니다.",
          minLength: {
            value: 8,
            message: "8자 이상 입력해주세요.",
          },
        })}
        error={!!errors.password}
        errorMessage={errors.password?.message}
      />
      <Button type="submit" text="로그인" disabled={!isValid || isSubmitting} />
    </form>
  );
};

export default SignInForm;
