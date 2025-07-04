import { useMutation, useQuery } from "@tanstack/react-query";
import { getComments, postComment } from ".";
import { CommentListRequest, CreateCommentForm } from "./types";

export const useGetComments = (params: CommentListRequest) => {
  return useQuery({
    queryKey: ["comments", params.cardId],
    queryFn: () => getComments(params),
  });
};

// export const useCreateComment = () => {
//   return useMutation({
//     mutationFn: (formData : CreateCommentForm) => {
//       return postComment(formData);
//     }
//   })
// }
