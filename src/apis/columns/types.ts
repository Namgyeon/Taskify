import { z } from "zod";

export const columnSchema = z.object({
  id: z.number(),
  title: z.string(),
  dashboardId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Column = z.infer<typeof columnSchema>;

export const columnResponseSchema = z.object({
  result: z.literal("SUCCESS"),
  data: z.array(columnSchema),
});
export type ColumnResponse = z.infer<typeof columnResponseSchema>;

export const getColumnsRequestSchema = z.object({
  dashboardId: z.number(),
});
export type GetColumnsRequest = z.infer<typeof getColumnsRequestSchema>;

export const createColumnRequestSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: "컬럼 이름은 최소 2글자 이상이어야 합니다." }),
});
export type CreateColumnRequest = z.infer<typeof createColumnRequestSchema>;
