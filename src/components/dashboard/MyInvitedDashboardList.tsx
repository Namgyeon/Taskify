"use client";

import {
  useGetDashboardInvitations,
  useRespondToInvitation,
} from "@/apis/invitations/queries";
import MyInvitedEmptyCard from "./MyInvitedEmptyCard";
import Button from "../ui/Button";

const MyInvitedDashboardList = () => {
  const { data, isLoading } = useGetDashboardInvitations({ size: 10 });
  const { mutate: respondToInvitation } = useRespondToInvitation();

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
      {data?.invitations.length === 0 ? (
        <MyInvitedEmptyCard />
      ) : (
        <div>
          {data?.invitations.map((invitation) => {
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
                      text="수락"
                      variant="primary"
                      size="sm"
                      className="px-11 md:px-6 lg:px-7.5"
                      onClick={() => handleAccept(invitation.id)}
                    />
                    <Button
                      text="거절"
                      variant="secondary"
                      size="sm"
                      className="px-11 md:px-6 lg:px-7.5"
                      onClick={() => handleReject(invitation.id)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyInvitedDashboardList;
