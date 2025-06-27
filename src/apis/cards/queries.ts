import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCardRequest } from "./types";
import { postCard } from ".";

export const useCreateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cardForm: CreateCardRequest) => {
      return postCard(cardForm);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [""],
      });
    },
  });
};
