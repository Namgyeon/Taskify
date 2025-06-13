import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getInvitations, respondToInvitation } from ".";
import { GetMyInvitationsRequest, RespondToInvitationRequest } from "./types";

export const useGetDashboardInvitations = (params: GetMyInvitationsRequest) => {
  return useQuery({
    queryKey: ["myInvitations", params],
    queryFn: () => getInvitations(params),
  });
};

export const useRespondToInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RespondToInvitationRequest) => respondToInvitation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myInvitations"] });
    },
  });
};
