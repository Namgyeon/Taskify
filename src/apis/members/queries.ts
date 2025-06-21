import { useQuery } from "@tanstack/react-query";
import { GetMembersRequest } from "./types";
import { getMembers } from ".";

export const useGetMembers = (params: GetMembersRequest) => {
  return useQuery({
    queryKey: ["members", params],
    queryFn: () => getMembers(params),
  });
};
