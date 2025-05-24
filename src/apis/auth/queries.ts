"use client";

import { useMutation } from "@tanstack/react-query";
import { SignInFormData, SignInResponse } from "./types";
import { signInUser } from "@/lib/api/auth-api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useSignIn = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (signInData: SignInFormData) => signInUser(signInData),
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
