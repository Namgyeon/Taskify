import { z } from "zod";

export const createCardRequestSchema = z.object({
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
  imageUrl: z.string().url(),
});
export type CreateCardRequest = z.infer<typeof createCardRequestSchema>;
