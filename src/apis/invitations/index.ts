import axiosClientHelper from "@/utils/network/axiosClientHelper";
import {
  GetMyInvitationsRequest,
  MyInvitations,
  myInvitationsSchema,
  RespondToInvitationRequest,
} from "./types";
import { safeResponse } from "@/utils/network/safeResponse";
import {
  DashboardInvitation,
  dashboardInvitationSchema,
} from "../dashboards/types";

/**
 * 내가 받은 초대 목록 조회
 * https://sp-taskify-api.vercel.app/docs/#/invitations
 */
export const getInvitations = async (params: GetMyInvitationsRequest) => {
  const { cursorId, size = 10, title } = params;
  const response = await axiosClientHelper.get<MyInvitations>("/invitations", {
    params: {
      size,
      ...(cursorId && { cursorId }),
      ...(title && { title }),
    },
  });
  return safeResponse(response.data, myInvitationsSchema);
};

/**
 * 초대 응답
 * https://sp-taskify-api.vercel.app/docs/#/invitations/{invitationId}
 */
export const respondToInvitation = async (
  params: RespondToInvitationRequest
) => {
  const { invitationId, inviteAccepted } = params;
  const response = await axiosClientHelper.put<DashboardInvitation>(
    `/invitations/${invitationId}`,
    { inviteAccepted }
  );
  return safeResponse(response.data, dashboardInvitationSchema);
};
