import { useQuery } from "@tanstack/react-query";
import { GetColumnsRequest } from "./types";
import { getColumns } from ".";

export const useGetColumnsQuery = (params: GetColumnsRequest) => {
  return useQuery({
    queryKey: ["columns", params],
    queryFn: () => getColumns(params),
  });
};
