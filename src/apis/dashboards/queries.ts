import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GetDashboardsRequest,
  PatchDashboardFormData,
  PostDashboardsFormData,
} from "./types";
import { getDashboard, getDashboards, patchDashboard, postDashboards } from ".";

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
