import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PatchUser, PostProfileImageFormData, SignupFormData } from "./types";
import { getUser, patchUser, postProfileImage, signup } from ".";

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

export const usePatchUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PatchUser) => {
      return patchUser(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const usePostProfileImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PostProfileImageFormData) => {
      return postProfileImage(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
