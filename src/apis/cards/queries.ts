import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { CardListRequest, CreateCardRequest } from "./types";
import { getCards, postCard } from ".";

export const useGetCardsQuery = (params: CardListRequest) => {
  return useInfiniteQuery({
    queryKey: ["cards", params.columnId],
    queryFn: ({ pageParam }) => {
      return getCards({
        ...params,
        cursorId: pageParam,
      });
    },
    getNextPageParam: (lastPage) => lastPage.cursorId || undefined,
    initialPageParam: 0,
  });
};

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
