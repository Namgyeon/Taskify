import { useQuery } from "@tanstack/react-query";
import { getInvitations } from ".";
import { GetMyInvitationsRequest } from "./types";

export const useGetDashboardInvitations = (params: GetMyInvitationsRequest) => {
  return useQuery({
    queryKey: ["myInvitations", params],
    queryFn: () => getInvitations(params),
  });
};
