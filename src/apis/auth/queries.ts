import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PutPasswordRequestData, SignInFormData } from "@/apis/auth/types";
import { login, logout, putPassword } from "@/apis/auth";

export const useSignIn = () => {
  return useMutation({
    mutationFn: (signInData: SignInFormData) => login(signInData),
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

export const usePutPassword = () => {
  return useMutation({
    mutationFn: (putPasswordRequestData: PutPasswordRequestData) => {
      return putPassword(putPasswordRequestData);
    },
  });
};
