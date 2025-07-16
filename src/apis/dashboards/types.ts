import { BasePagination, NavigationMethod } from "@/types/common";
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
export type Dashboard = z.infer<typeof dashboardSchema>;

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

export const patchDashboardFormSchema = z.object({
  title: z.string().trim().min(2, "2글자 이상 입력해주세요,"),
  color: z.string(),
});
export type PatchDashboardFormData = z.infer<typeof patchDashboardFormSchema>;

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

export const getDashboardMemberInvitationsSchema = z.object({
  dashboardId: z.number(),
  page: z.number(),
  size: z.number(),
});
export type GetDashboardMemberInvitations = z.infer<
  typeof getDashboardMemberInvitationsSchema
>;

export const getDashboardMemberInvitationsResponseSchema = z.object({
  invitations: z.array(dashboardInvitationSchema),
  totalCount: z.number(),
  cursorId: z.null(),
});
export type GetDashboardMemberInvitationsResponse = z.infer<
  typeof getDashboardMemberInvitationsResponseSchema
>;

export const postDashboardMemberInvitationRequestSchema = z.object({
  email: z.string().email("이메일 형식이 올바르지 않습니다."),
});
export type PostDashboardMemberInvitationRequest = z.infer<
  typeof postDashboardMemberInvitationRequestSchema
>;
