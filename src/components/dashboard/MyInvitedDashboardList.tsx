"use client";

import { useGetDashboardInvitations } from "@/apis/invitations/queries";
import MyInvitedEmptyCard from "./MyInvitedEmptyCard";
import Button from "../ui/Button";

const MyInvitedDashboardList = () => {
  const { data, isLoading, error } = useGetDashboardInvitations({ size: 10 });

  console.log("초대받은 목록데이터:", data);

  return (
    <div>
      {data?.invitations.length === 0 ? (
        <MyInvitedEmptyCard />
      ) : (
        <div>
          {data?.invitations.map((invitation) => {
            return (
              <div key={invitation.id} className="flex flex-col gap-3">
                <div>
                  <div className="flex items-center gap-6">
                    <p className="md:hidden w-10 text-sm text-[#9FA6B2]">
                      이름
                    </p>
                    <p>{invitation.dashboard.title}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <p className="md:hidden w-10 text-sm text-[#9FA6B2]">
                      초대자
                    </p>
                    <p>{invitation.inviter.nickname}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button text="수락" />
                  <Button text="거절" />
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
