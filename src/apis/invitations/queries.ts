import { useQuery } from "@tanstack/react-query";
import { getInvitations } from ".";
import { GetInvitationsRequest } from "./types";

export const useGetDashboardInvitations = (params: GetInvitationsRequest) => {
  return useQuery({
    queryKey: ["invitations", params],
    queryFn: () => getInvitations(params),
  });
};
