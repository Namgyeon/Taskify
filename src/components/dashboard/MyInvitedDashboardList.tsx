"use client";

import {
  useGetDashboardInvitationsInfinite,
  useRespondToInvitation,
} from "@/apis/invitations/queries";
import MyInvitedEmptyCard from "./MyInvitedEmptyCard";
import Button from "../ui/Button";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const MyInvitedDashboardList = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetDashboardInvitationsInfinite({ size: 6 });
  const { mutate: respondToInvitation } = useRespondToInvitation();
  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  const allInvitations = data?.pages.flatMap((page) => page.invitations) ?? [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleAccept = (invitationId: number) => {
    respondToInvitation({ invitationId, inviteAccepted: true });
  };

  const handleReject = (invitationId: number) => {
    respondToInvitation({ invitationId, inviteAccepted: false });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 w-full">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 px-4 py-3 border-b border-gray-200 animate-pulse"
          >
            <div className="w-32 h-4 bg-gray-300 rounded" />
            <div className="w-24 h-4 bg-gray-300 rounded" />
            <div className="flex gap-2 ml-auto">
              <div className="w-16 h-8 bg-gray-300 rounded" />
              <div className="w-16 h-8 bg-gray-300 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {allInvitations.length === 0 ? (
        <MyInvitedEmptyCard />
      ) : (
        <div>
          {allInvitations.map((invitation) => {
            return (
              <div
                key={invitation.id}
                className="flex flex-col gap-3 py-3.5 md:py-5 border-b border-[#EEEEEE]"
              >
                <header className="flex items-center">
                  <p className="hidden md:block w-1/3 text-[#9FA6B2]">이름</p>
                  <p className="hidden md:block w-1/3 text-[#9FA6B2]">초대자</p>
                  <p className="hidden md:block w-1/3 text-center text-[#9FA6B2]">
                    수락 여부
                  </p>
                </header>

                <div className="flex flex-col gap-3 md:flex-row  md:items-center">
                  <div className="md:w-1/3 flex items-center gap-6">
                    <p className="md:hidden w-10 text-sm text-[#9FA6B2]">
                      이름
                    </p>
                    <p>{invitation.dashboard.title}</p>
                  </div>
                  <div className="md:w-1/3 flex items-center gap-6">
                    <p className="md:hidden w-10 text-sm text-[#9FA6B2]">
                      초대자
                    </p>
                    <p>{invitation.inviter.nickname}</p>
                  </div>
                  <div className="md:w-1/3 flex gap-3 md:justify-center">
                    <Button
                      variant="primary"
                      size="sm"
                      className="px-11 md:px-6 lg:px-7.5"
                      onClick={() => handleAccept(invitation.id)}
                    >
                      수락
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="px-11 md:px-6 lg:px-7.5"
                      onClick={() => handleReject(invitation.id)}
                    >
                      거절
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
          {/* 무한스크롤 트리커 */}
          <div ref={ref} className="h-10 flex items-center justify-center">
            {isFetchingNextPage && (
              <div className="text-gray-500">더 많은 초대를 불러오는 중...</div>
            )}
            {!hasNextPage && allInvitations.length > 0 && (
              <div className="text-gray-400 text-sm">
                모든 초대를 불러왔습니다.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyInvitedDashboardList;
