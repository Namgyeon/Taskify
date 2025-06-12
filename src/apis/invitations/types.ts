import { BaseCursor } from "@/types/common";
import { z } from "zod";
import { dashboardInvitationSchema } from "../dashboards/types";

export type GetInvitationsRequest = Partial<BaseCursor> & {
  title?: string;
};

export const myInvitationsSchema = z.object({
  cursorId: z.number(),
  invitations: z.array(dashboardInvitationSchema),
});
