import axiosClientHelper from "@/utils/network/axiosClientHelper";
import {
  GetMyInvitationsRequest,
  MyInvitations,
  myInvitationsSchema,
} from "./types";
import { safeResponse } from "@/utils/network/safeResponse";

/**
 * 내가 받은 초대 목록 조회
 * https://sp-taskify-api.vercel.app/docs/#/invitations}
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
