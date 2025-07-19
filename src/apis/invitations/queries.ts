import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getInvitations, respondToInvitation } from ".";
import { GetMyInvitationsRequest, RespondToInvitationRequest } from "./types";

export const useGetDashboardInvitationsInfinite = (
  params: GetMyInvitationsRequest
) => {
  return useInfiniteQuery({
    queryKey: ["myInvitations", params],
    queryFn: ({ pageParam }) =>
      getInvitations({ ...params, cursorId: pageParam }),
    getNextPageParam: (lastPage) => lastPage.cursorId || undefined,
    initialPageParam: 0,
  });
};

export const useRespondToInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RespondToInvitationRequest) => respondToInvitation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myInvitations"] });
      queryClient.invalidateQueries({ queryKey: ["dashboards"] });
    },
  });
};
