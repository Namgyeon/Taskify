import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Card, CardListRequest, CreateCardRequest } from "./types";
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
    mutationFn: (cardRequest: CreateCardRequest) => {
      return postCard(cardRequest);
    },
    onSuccess: (card: Card) => {
      queryClient.invalidateQueries({
        queryKey: ["cards", card.columnId],
      });
    },
  });
};
