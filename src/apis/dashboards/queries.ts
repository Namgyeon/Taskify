import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetDashboardsRequest, postDashboardsFormData } from "./types";
import { getDashboards, postDashboards } from ".";

export const useGetDashboardsQuery = (params: GetDashboardsRequest) => {
  return useQuery({
    queryKey: ["dashboards", params],
    queryFn: () => getDashboards(params),
  });
};

export const useCreateDashboard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: postDashboardsFormData) => postDashboards(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboards"] });
    },
  });
};
