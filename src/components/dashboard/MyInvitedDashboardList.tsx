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

                <div className="flex flex-col md:flex-row  md:items-center ">
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
                    <Button text="수락" className=" text-white" />
                    <Button text="거절" className="bg-white text-[#5534DA]" />
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
