import { useMutation } from "@tanstack/react-query";
import { SignupFormData } from "./types";
import { singup } from ".";

export const useSignup = () => {
  return useMutation({
    mutationFn: (signupFormData: SignupFormData) => {
      return singup(signupFormData);
    },
  });
};
