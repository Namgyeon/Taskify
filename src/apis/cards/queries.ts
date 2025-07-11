import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  Card,
  CardListRequest,
  CreateCardRequest,
  UpdateCardRequest,
} from "./types";
import { getCardDetail, getCards, postCard, putCard } from ".";

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

export const useGetCardDetailQuery = (cardId: number) => {
  return useQuery({
    queryKey: ["card", cardId],
    queryFn: () => getCardDetail(cardId),
  });
};

export const useUpdateCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      cardId,
      ...cardRequest
    }: UpdateCardRequest & { cardId: number }) => {
      return putCard(cardId, cardRequest);
    },
    onSuccess: (card: Card) => {
      queryClient.invalidateQueries({
        queryKey: ["cards", card.columnId],
      });
      queryClient.invalidateQueries({
        queryKey: ["card", card.id],
      });
    },
  });
};
