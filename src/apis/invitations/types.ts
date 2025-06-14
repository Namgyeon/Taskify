import { BaseCursor } from "@/types/common";
import { z } from "zod";
import { dashboardInvitationSchema } from "../dashboards/types";

export type GetMyInvitationsRequest = Partial<BaseCursor> & {
  title?: string;
};

export const myInvitationsSchema = z.object({
  cursorId: z.number().nullable(),
  invitations: z.array(dashboardInvitationSchema),
});
export type MyInvitations = z.infer<typeof myInvitationsSchema>;

export const respondToInvitationRequest = z.object({
  invitationId: z.number(),
  inviteAccepted: z.boolean(),
});
export type RespondToInvitationRequest = z.infer<
  typeof respondToInvitationRequest
>;
