import { z } from "zod";

export const createCardFormSchema = z.object({
  assigneeUserId: z.number().min(1, "담당자를 지정해주세요"),
  dashboardId: z.number(),
  columnId: z.number(),
  title: z.string().trim().min(1, "제목을 입력해주세요"),
  description: z.string().trim().min(1, "설명을 입력해주세요"),
  dueDate: z.union([z.string(), z.instanceof(Date)]),
  // .refine((date)=> isValidDate(date),{
  //   message: "유효하지 않은 날짜 형식이 아닙니다.",
  // })
  tags: z.array(z.string().trim().max(10, "10글자 이하로 작성해주세요")),
  imageUrl: z
    .instanceof(File)
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/x-icon"].includes(
          file.type
        ),
      {
        message: "이미지는 jpeg, jpg, png, ico 형식만 허용됩니다.",
      }
    )
    .refine((file) => file.size < 2 * 1024 * 1024, {
      message: "5MB이하인 이미지만 등록 가능합니다.",
    })
    .optional(),
});
export type CreateCardForm = z.infer<typeof createCardFormSchema>;

export const createCardRequestSchema = z.object({
  assigneeUserId: z.number(),
  dashboardId: z.number(),
  columnId: z.number(),
  title: z.string(),
  description: z.string(),
  dueDate: z.string(),
  tags: z.array(z.string()),
  imageUrl: z.string().optional(),
});
export type CreateCardRequest = z.infer<typeof createCardRequestSchema>;

export const cardSchema = z.object({
  dashboardId: z.number(),
  id: z.number(),
  title: z.string().trim(),
  description: z.string().trim(),
  tags: z.array(z.string().trim().max(10, "10글자 이하로 작성해주세요")),
  dueDate: z.string(),
  assignee: z.object({
    profileImageUrl: z.union([z.string(), z.null()]),
    nickname: z.string(),
    id: z.number(),
  }),
  imageUrl: z.string().nullable(),
  teamId: z.string(),
  columnId: z.number(),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
});
export type Card = z.infer<typeof cardSchema>;

export const cardListRequestSchema = z.object({
  columnId: z.number(),
  size: z.number().optional(),
  cursorId: z.number().optional(),
});
export type CardListRequest = z.infer<typeof cardListRequestSchema>;

export const cardListResponseSchema = z.object({
  cards: z.array(cardSchema),
  totalCount: z.number(),
  cursorId: z.number().nullable(),
});
export type CardListResponse = z.infer<typeof cardListResponseSchema>;
