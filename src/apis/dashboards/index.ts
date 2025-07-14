import axiosClientHelper from "@/utils/network/axiosClientHelper";
import { safeResponse } from "@/utils/network/safeResponse";
import {
  Dashboard,
  Dashboards,
  dashboardSchema,
  GetDashboardsRequest,
  getDashboardsResponseSchema,
  PostDashboardsFormData,
} from "./types";

/**
 * 대시보드 생성
 * https://sp-taskify-api.vercel.app/docs/#/dashboards
 */
export const postDashboards = async (data: PostDashboardsFormData) => {
  const response = await axiosClientHelper.post("/dashboards", data);
  return safeResponse(response.data, dashboardSchema);
};

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
 * 대시보드 상세 조회
 * https://sp-taskify-api.vercel.app/docs/#/dashboards/{dashboardId}
 */
export const getDashboard = async (dashboardId: number) => {
  const response = await axiosClientHelper.get<Dashboard>(
    `/dashboards/${dashboardId}`
  );
  return safeResponse(response.data, dashboardSchema);
};
