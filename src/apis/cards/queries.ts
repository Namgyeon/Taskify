import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCardRequest } from "./types";
import { postCard } from ".";

export const useCardMutation = (dashboardId: number) => {
  const queryClient = useQueryClient();

  const post = useMutation({
    mutationFn: (cardForm: CreateCardRequest) => {
      return postCard(cardForm);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["columns", dashboardId],
      });
    },
  });

  return {
    create: post.mutateAsync,
  };
};
