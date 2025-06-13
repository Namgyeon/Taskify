import { BaseCursor, BasePagination, NavigationMethod } from "@/types/common";
import { z } from "zod";

export const dashboardSchema = z.object({
  id: z.number(),
  title: z.string(),
  color: z.string(),
  userId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdByMe: z.boolean(),
});

export const getDashboardsResponseSchema = z.object({
  dashboards: z.array(dashboardSchema),
  totalCount: z.number(),
  cursorId: z.null(),
});
export type GetDashboardsResponse = z.infer<typeof getDashboardsResponseSchema>;
export type Dashboards = z.infer<typeof getDashboardsResponseSchema>;

export type GetDashboardsRequest = Partial<BasePagination> & {
  cursorId?: number;
  navigationMethod: NavigationMethod;
};

export const postDashboardsFormSchema = z.object({
  title: z
    .string()
    .nonempty("제목을 입력해주세요")
    .min(1, "1글자이상 작성해주세요"),
  color: z.string(),
});
export type PostDashboardsFormData = z.infer<typeof postDashboardsFormSchema>;

export const dashboardInviterSchema = z.object({
  nickname: z.string(),
  email: z.string(),
  id: z.number(),
});

export const dashboardInvitationSchema = z.object({
  id: z.number(),
  inviter: dashboardInviterSchema,
  teamId: z.string(),
  dashboard: dashboardSchema.pick({ id: true, title: true }),
  invitee: dashboardInviterSchema,
  inviteAccepted: z.boolean().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type DashboardInvitation = z.infer<typeof dashboardInvitationSchema>;
