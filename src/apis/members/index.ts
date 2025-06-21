import axiosClientHelper from "@/utils/network/axiosClientHelper";
import { GetMembersRequest, Members, membersSchema } from "./types";
import { safeResponse } from "@/utils/network/safeResponse";

/**
 * 대시보드 멤버 목록 조회
 * https://sp-taskify-api.vercel.app/docs/#/members
 */
export const getMembers = async (params: GetMembersRequest) => {
  const { dashboardId, page, size } = params;
  const response = await axiosClientHelper.get<Members>("/members", {
    params: {
      dashboardId,
      page,
      size,
    },
  });
  return safeResponse(response.data, membersSchema);
};
