import { useQuery } from "@tanstack/react-query";
import { GetDashboardsRequest } from "./types";
import { getDashboards } from ".";

export const useGetDashboardsQuery = (params: GetDashboardsRequest) => {
  return useQuery({
    queryKey: ["dashboards", params],
    queryFn: () => getDashboards(params),
  });
};
