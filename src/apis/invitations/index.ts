import axiosClientHelper from "@/utils/network/axiosClientHelper";
import { GetInvitationsRequest } from "./types";

/**
 * 내가 받은 초대 목록 조회
 * https://sp-taskify-api.vercel.app/docs/#/invitations}
 */
export const getInvitations = async (params: GetInvitationsRequest) => {
  const { cursorId, size =10, title} = params;
  const response = await axiosClientHelper.get("/invitations");
};
