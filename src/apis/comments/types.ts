import { z } from "zod";

export const commentSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  cardId: z.number(),
  author: z.object({
    profileImageUrl: z.string().nullable(),
    nickname: z.string(),
    id: z.number(),
  }),
});
export type Comment = z.infer<typeof commentSchema>;

export const commentListResponseSchema = z.object({
  comments: z.array(commentSchema),
  cursorId: z.number().nullable(),
});
export type CommentListResponse = z.infer<typeof commentListResponseSchema>;

export const commentListRequestSchema = z.object({
  size: z.number().optional(),
  cursorId: z.number().optional(),
  cardId: z.number(),
});
export type CommentListRequest = z.infer<typeof commentListRequestSchema>;

export const createCommentFormSchema = z.object({
  content: z.string().trim().min(1, "댓글을 입력해주세요"),
  cardId: z.number(),
  columnId: z.number(),
  dashboardId: z.number(),
});
export type CreateCommentForm = z.infer<typeof createCommentFormSchema>;
