import axiosClientHelper from "@/utils/network/axiosClientHelper";
import { safeResponse } from "@/utils/network/safeResponse";
import {
  Dashboards,
  GetDashboardsRequest,
  getDashboardsResponseSchema,
} from "./types";

/**
 * 대시보드 목록 조회
 * https://sp-taskify-api.vercel.app/docs/#/dashboards
 */
export const getDashboards = async (params: GetDashboardsRequest) => {
  const { cursorId, page = 1, size = 10, navigationMethod } = params;
  const response = await axiosClientHelper.get<Dashboards>("/dashboards", {
    params: {
      cursorId,
      page,
      size,
      navigationMethod,
    },
  });
  return safeResponse(response.data, getDashboardsResponseSchema);
};
