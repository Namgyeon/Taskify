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
