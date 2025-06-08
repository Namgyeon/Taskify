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

export const getDashboardsResponseSchema = z.object({
  dashboards: z.array(dashboardSchema),
  totalCount: z.number(),
  cursorId: z.null(),
});
export type getDashboardsResponse = z.infer<typeof getDashboardsResponseSchema>;
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
export type postDashboardsFormData = z.infer<typeof postDashboardsFormSchema>;
