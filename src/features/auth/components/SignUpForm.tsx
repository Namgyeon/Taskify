"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import PasswordInput from "@/components/PasswordInput";
import { signUpUser } from "@/lib/api/auth-api";
import { SignUpData } from "@/lib/types/auth-types";
import { useForm } from "react-hook-form";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignUpData>({
    mode: "onChange",
  });

  const password = watch("password");

  const onSubmit = async (data: SignUpData) => {
    console.log("제출한 폼 데이터:", data);
    await signUpUser(data);
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
      <Input
        {...register("nickname", {
          required: "닉네임은 필수입니다.",
        })}
        label="닉네임"
        placeholder="닉네임을 입력하세요."
        error={!!errors.nickname}
        errorMessage={errors.nickname?.message}
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
      <PasswordInput
        label="비밀번호 확인"
        {...register("passwordConfirmation", {
          required: "비밀번호 확인은 필수입니다.",
          minLength: {
            value: 8,
            message: "8자 이상 입력해주세요.",
          },
          validate: (value) =>
            value === password || "비밀번호가 일치하지 않습니다.",
        })}
        error={!!errors.passwordConfirmation}
        errorMessage={errors.passwordConfirmation?.message}
      />
      <Button
        type="submit"
        text="회원가입"
        disabled={!isValid || isSubmitting}
      />
    </form>
  );
};

export default SignUpForm;
