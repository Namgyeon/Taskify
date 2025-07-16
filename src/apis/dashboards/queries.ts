import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GetDashboardMemberInvitations,
  GetDashboardsRequest,
  PatchDashboardFormData,
  PostDashboardMemberInvitationRequest,
  PostDashboardsFormData,
} from "./types";
import {
  getDashboard,
  getDashboardMemberInvitations,
  getDashboards,
  patchDashboard,
  postDashboardMemberInvitation,
  postDashboards,
} from ".";

export const useGetDashboardsQuery = (params: GetDashboardsRequest) => {
  return useQuery({
    queryKey: ["dashboards", params],
    queryFn: () => getDashboards(params),
  });
};

export const useGetDashboardQuery = (dashboardId: number) => {
  return useQuery({
    queryKey: ["dashboard", dashboardId],
    queryFn: () => getDashboard(dashboardId),
  });
};

export const useCreateDashboard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PostDashboardsFormData) => postDashboards(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboards"] });
    },
  });
};

export const usePatchDashboard = (dashboardId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PatchDashboardFormData) =>
      patchDashboard(dashboardId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard", dashboardId] });
      queryClient.invalidateQueries({ queryKey: ["dashboards"] });
    },
  });
};

export const useGetDashboardMemberInvitationsQuery = (
  params: GetDashboardMemberInvitations
) => {
  return useQuery({
    queryKey: ["dashboard-members", params.dashboardId],
    queryFn: () => getDashboardMemberInvitations(params),
  });
};

export const usePostDashboardMemberInvitation = (
  dashboardId: number,
  data: PostDashboardMemberInvitationRequest
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postDashboardMemberInvitation(dashboardId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dashboard-members", dashboardId],
      });
    },
  });
};
