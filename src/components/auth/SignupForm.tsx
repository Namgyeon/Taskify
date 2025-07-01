"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Field/Input";
import PasswordInput from "@/components/ui/Field/PasswordInput";
import { useSignup } from "@/apis/users/queries";
import { SignupFormData } from "@/apis/users/types";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/utils/network/errorMessage";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupFormData>({
    mode: "onChange",
  });

  const password = watch("password");
  const signUpMutation = useSignup();
  const router = useRouter();

  const onSubmit = (data: SignupFormData) => {
    signUpMutation.mutate(data, {
      onSuccess: () => {
        toast.success(`회원가입 성공했습니다.\n 로그인페이지로 이동합니다.`);
        router.push("/signin");
      },
      onError: (error) => {
        const message = getErrorMessage(error);
        toast.error(message);
      },
    });
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

export default SignupForm;
