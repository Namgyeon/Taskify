import { z } from "zod";

export const memberSchema = z.object({
  id: z.number(),
  userId: z.number(),
  email: z.string().email(),
  nickname: z.string(),
  profileImageUrl: z.string().url(),
  createdAt: z.string(),
  updatedAt: z.string(),
  isOwner: z.boolean(),
});
export type Member = z.infer<typeof memberSchema>;

export const membersSchema = z.object({
  totalCount: z.number(),
  members: z.array(memberSchema),
});
export type Members = z.infer<typeof membersSchema>;

export const getMembersRequestSchema = z.object({
  dashboardId: z.number(),
});
