import { z } from "zod";

export const createCardRequestSchema = z.object({
  assigneeUserId: z.number(),
  dashboardId: z.number(),
  columnId: z.number(),
  title: z.string().trim(),
  description: z.string().trim(),
  dueDate: z.string().datetime(),
  tags: z.array(z.string().trim().max(10, "10글자 이하로 작성해주세요")),
  imageUrl: z.string().url(),
});
export type CreateCardRequest = z.infer<typeof createCardRequestSchema>;
