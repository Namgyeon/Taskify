import axiosClientHelper from "@/utils/network/axiosClientHelper";
import { safeResponse } from "@/utils/network/safeResponse";
import {
  Dashboards,
  dashboardSchema,
  GetDashboardsRequest,
  getDashboardsResponseSchema,
  PostDashboardsFormData,
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

/**
 * 대시보드 생성
 * https://sp-taskify-api.vercel.app/docs/#/dashboards
 */
export const postDashboards = async (data: PostDashboardsFormData) => {
  const response = await axiosClientHelper.post("/dashboards", data);
  return safeResponse(response.data, dashboardSchema);
};
