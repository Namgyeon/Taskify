import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateColumnRequest, GetColumnsRequest } from "./types";
import { getColumns, postColumn } from ".";

export const useGetColumnsQuery = (params: GetColumnsRequest) => {
  return useQuery({
    queryKey: ["columns", params],
    queryFn: () => getColumns(params),
  });
};

export const useColumnMutation = (dashboardId: number) => {
  const queryClient = useQueryClient();

  const post = useMutation({
    mutationFn: (columnForm: CreateColumnRequest) => {
      return postColumn(dashboardId, columnForm);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["columns", dashboardId],
      });
    },
  });

  return {
    create: post.mutateAsync,
  };
};
