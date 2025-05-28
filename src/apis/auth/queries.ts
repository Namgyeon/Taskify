import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignInFormData, SignInResponse } from "@/apis/auth/types";
import { login, logout } from "@/apis/auth";

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

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return logout();
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
