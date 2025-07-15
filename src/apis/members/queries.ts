import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetMembersRequest } from "./types";
import { deleteMember, getMembers } from ".";

export const useGetMembers = (params: GetMembersRequest) => {
  return useQuery({
    queryKey: ["members", params],
    queryFn: () => getMembers(params),
  });
};

export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (memberId: number) => deleteMember(memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
};
