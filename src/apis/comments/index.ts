import axiosClientHelper from "@/utils/network/axiosClientHelper";
import {
  CommentListRequest,
  commentListResponseSchema,
  commentSchema,
  CreateCommentForm,
  UpdateCommentRequest,
} from "./types";
import { safeResponse } from "@/utils/network/safeResponse";

/**
 * 댓글 목록 조회
 * https://sp-taskify-api.vercel.app/docs/#/comments
 */
export const getComments = async (params: CommentListRequest) => {
  const { cursorId, size = 5, cardId } = params;
  const response = await axiosClientHelper.get("/comments", { params });
  return safeResponse(response.data, commentListResponseSchema);
};

/**
 * 댓글 생성
 * https://sp-taskify-api.vercel.app/docs/#/comments
 */
export const postComment = async (formData: CreateCommentForm) => {
  const response = await axiosClientHelper.post("/comments", formData);
  return safeResponse(response.data, commentSchema);
};

/**
 * 댓글 수정
 * https://sp-taskify-api.vercel.app/docs/#/comments/{commentId}
 */
export const putComment = async ({
  commentId,
  content,
}: UpdateCommentRequest) => {
  const response = await axiosClientHelper.put(`/comments/${commentId}`, {
    content,
  });
  return safeResponse(response.data, commentSchema);
};
