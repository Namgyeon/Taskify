import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetDashboardsRequest, PostDashboardsFormData } from "./types";
import { getDashboard, getDashboards, postDashboards } from ".";

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
