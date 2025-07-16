import axiosClientHelper from "@/utils/network/axiosClientHelper";
import { safeResponse } from "@/utils/network/safeResponse";
import {
  Dashboard,
  DashboardInvitation,
  dashboardInvitationSchema,
  Dashboards,
  dashboardSchema,
  GetDashboardMemberInvitations,
  GetDashboardMemberInvitationsResponse,
  getDashboardMemberInvitationsResponseSchema,
  GetDashboardsRequest,
  getDashboardsResponseSchema,
  PatchDashboardFormData,
  PostDashboardMemberInvitationRequest,
  PostDashboardsFormData,
} from "./types";

/**
 * 대시보드 생성
 * https://sp-taskify-api.vercel.app/docs/#/dashboards
 */
export const postDashboards = async (data: PostDashboardsFormData) => {
  const response = await axiosClientHelper.post<Dashboard>("/dashboards", data);
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

/**
 * 대시보드 수정
 * https://sp-taskify-api.vercel.app/docs/#/dashboards/{dashboardId}
 */
export const patchDashboard = async (
  dashboardId: number,
  data: PatchDashboardFormData
) => {
  const response = await axiosClientHelper.put<Dashboard>(
    `/dashboards/${dashboardId}`,
    data
  );
  return safeResponse(response.data, dashboardSchema);
};

/**
 * 대시보드 삭제
 * https://sp-taskify-api.vercel.app/docs/#/dashboards/{dashboardId}
 */
export const deleteDashboard = async (dashboardId: number) => {
  await axiosClientHelper.delete(`/dashboards/${dashboardId}`);
  return {};
};

/**
 * 대시보드 초대 불러오기
 * https://sp-taskify-api.vercel.app/docs/#/dashboards/{dashboardId}/invitations
 */
export const getDashboardMemberInvitations = async (
  params: GetDashboardMemberInvitations
) => {
  const { dashboardId, page = 1, size = 5 } = params;
  const response =
    await axiosClientHelper.get<GetDashboardMemberInvitationsResponse>(
      `/dashboards/${dashboardId}/invitations`,
      {
        params: {
          page,
          size,
        },
      }
    );
  return safeResponse(
    response.data,
    getDashboardMemberInvitationsResponseSchema
  );
};

/**
 * 대시보드 초대하기
 * https://sp-taskify-api.vercel.app/docs/#/dashboards/{dashboardId}/invitations
 */
export const postDashboardMemberInvitation = async (
  dashboardId: number,
  data: PostDashboardMemberInvitationRequest
) => {
  const response = await axiosClientHelper.post<DashboardInvitation>(
    `/dashboards/${dashboardId}/invitations`,
    data
  );
  return safeResponse(response.data, dashboardInvitationSchema);
};

/**
 * 대시보드 초대 취소
 * https://sp-taskify-api.vercel.app/docs/#/dashboards/{dashboardId}/invitations/{invitationId}
 */
export const deleteDashboardMemberInvitation = async (
  dashboardId: number,
  invitationId: number
) => {
  await axiosClientHelper.delete(
    `/dashboards/${dashboardId}/invitations/${invitationId}`
  );
  return {};
};
