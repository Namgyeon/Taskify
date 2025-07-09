import {
  QueryClient,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getComments, postComment, putComment } from ".";
import {
  CommentListRequest,
  CreateCommentForm,
  UpdateCommentRequest,
} from "./types";

// 댓글 무한스크롤 처리
export const useGetCommentsInfinite = (params: CommentListRequest) => {
  return useInfiniteQuery({
    queryKey: ["comments", params.cardId],
    queryFn: ({ pageParam }) => {
      return getComments({ ...params, cursorId: pageParam });
    },
    getNextPageParam: (lastPage) => lastPage.cursorId,
    initialPageParam: undefined as number | undefined,
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
      // 무한스크롤 쿼리도 무효화
      queryClient.invalidateQueries({
        queryKey: ["comments", "infinite", formData.cardId],
      });
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId, content }: UpdateCommentRequest) => {
      return putComment({ commentId, content });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", data.cardId],
      });
      queryClient.invalidateQueries({
        queryKey: ["comments", "infinite", data.cardId],
      });
    },
  });
};
