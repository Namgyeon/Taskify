"use client";

import { useForm } from "react-hook-form";
import Input from "@/components/Input";
import { SignInData } from "@/lib/auth-types";
import PasswordInput from "@/components/PasswordInput";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    mode: "onChange",
  });

  const onSubmit = (data: SignInData) => {
    console.log("제출한 폼 데이터 : ", data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
    </form>
  );
};

export default SignInForm;
