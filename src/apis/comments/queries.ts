import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getComments, postComment } from ".";
import { CommentListRequest, CreateCommentForm } from "./types";

export const useGetComments = (params: CommentListRequest) => {
  return useQuery({
    queryKey: ["comments", params.cardId],
    queryFn: () => getComments(params),
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: CreateCommentForm) => {
      return postComment(formData);
    },
    onSuccess: (formData) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", formData.cardId],
      });
    },
  });
};
