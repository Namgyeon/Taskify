"use client";

import { useMutation } from "@tanstack/react-query";
import { SignInData, SignInResponse } from "@/lib/types/auth-types";
import { signInUser } from "@/lib/api/auth-api";
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
    onError: (error) => {
      console.error("로그인 실패:", error.message);
    },
  });
};
