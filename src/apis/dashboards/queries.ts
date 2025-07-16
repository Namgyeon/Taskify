import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GetDashboardMemberInvitations,
  GetDashboardsRequest,
  PatchDashboardFormData,
  PostDashboardMemberInvitationRequest,
  PostDashboardsFormData,
} from "./types";
import {
  deleteDashboardMemberInvitation,
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
    queryKey: [
      "dashboard-members",
      params.dashboardId,
      params.page,
      params.size,
    ],
    queryFn: () => getDashboardMemberInvitations(params),
  });
};

export const usePostDashboardMemberInvitation = (dashboardId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PostDashboardMemberInvitationRequest) =>
      postDashboardMemberInvitation(dashboardId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dashboard-members", dashboardId],
      });
    },
  });
};

export const useDeleteDashboardMemberInvitation = (dashboardId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (invitationId: number) =>
      deleteDashboardMemberInvitation(dashboardId, invitationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dashboard-members", dashboardId],
      });
    },
  });
};
