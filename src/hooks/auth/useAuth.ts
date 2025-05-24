"use client";

import { useMutation } from "@tanstack/react-query";
import { SignInData, SignInResponse, SignUpData } from "@/lib/types/auth-types";
import { signInUser, signUpUser } from "@/lib/api/auth-api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useSignIn = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (signInData: SignInData) => signInUser(signInData),
    onSuccess: (signInResponse: SignInResponse) => {
      localStorage.setItem("accessToken", signInResponse.accessToken);
      toast.success("로그인 성공!");
      router.push("/");
      console.log("로그인 성공:", signInResponse);
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("알 수 없는 에러가 발생했습니다.");
      }
    },
  });
};

export const useSignUp = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (signUpData: SignUpData) => signUpUser(signUpData),
    onSuccess: () => {
      toast.success("회원가입 성공! \n로그인페이지로 이동합니다.");
      router.push("/signin");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("알 수 없는 에러가 발생했습니다.");
      }
    },
  });
};
