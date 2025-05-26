import { useMutation } from "@tanstack/react-query";
import { SignInFormData, SignInResponse } from "./types";
import { login } from "./index";

export const useSignIn = () => {
  return useMutation({
    mutationFn: (signInData: SignInFormData) => login(signInData),
    onSuccess: (signInResponse: SignInResponse) => {
      console.log("로그인 성공:", signInResponse);
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error(error.message);
      }
    },
  });
};
