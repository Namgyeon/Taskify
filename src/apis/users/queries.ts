import { useMutation, useQuery } from "@tanstack/react-query";
import { SignupFormData } from "./types";
import { getUser, signup } from ".";

export const useSignup = () => {
  return useMutation({
    mutationFn: (signupFormData: SignupFormData) => {
      return signup(signupFormData);
    },
  });
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });
};
