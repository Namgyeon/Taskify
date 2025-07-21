"use client";

import { useDeleteMember, useGetMembers } from "@/apis/members/queries";
import Pagination from "@/components/pagination/Pagination";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { getErrorMessage } from "@/utils/network/errorMessage";
import { useState } from "react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";

const MemberManagement = ({ dashboardId }: { dashboardId: number }) => {
  const [page, setPage] = useState<number>(1);
  const size = 4;

  const { data, isLoading } = useGetMembers({
    dashboardId: dashboardId,
    page,
    size,
  });
  const { mutate: deleteMember } = useDeleteMember();

  const totalPage = data?.totalCount ? Math.ceil(data.totalCount / size) : 1;

  const handleDeleteMember = async (memberId: number) => {
    try {
      await deleteMember(memberId);
      toast.success("멤버가 삭제되었습니다.");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-[540px] lg:max-w-[620px] flex flex-col gap-6 px-4 md:px-7 py-5 md:py-8 rounded-lg bg-white">
        <div className="flex items-center justify-between">
          <Skeleton width={80} height={20} />
          <Skeleton width={120} height={20} />
        </div>
        <div className="flex items-center justify-between border-b border-gray-200 py-3">
          <div className="flex items-center gap-2">
            <Skeleton circle width={30} height={30} />
            <Skeleton width={100} height={20} />
          </div>
          <Skeleton width={40} height={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[540px] lg:max-w-[620px] flex flex-col gap-6 px-4 md:px-7 py-5 md:py-8 rounded-lg bg-white">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold">구성원</h2>
        {data && (
          <div className="flex items-center gap-3">
            <p className="text-xs text-[#333236]">
              {`${totalPage} 페이지 중 ${page}`}
            </p>
            <Pagination page={page} totalPage={totalPage} setPage={setPage} />
          </div>
        )}
      </div>
      <div>
        <p className="text-[#9FA6B2]">이름</p>
        {data &&
          data.members.map((member) => {
            return (
              <div
                key={member.id}
                className="flex items-center justify-between border-b border-gray-200 py-3"
              >
                <div className="flex items-center gap-2">
                  <Avatar
                    profileImageUrl={member.profileImageUrl}
                    nickname={member.nickname}
                  />
                  <div>{member.nickname}</div>
                </div>
                <Button
                  onClick={() => handleDeleteMember(member.id)}
                  disabled={member.isOwner}
                  variant="secondary"
                  size="sm"
                >
                  {member.isOwner ? "관리자" : "삭제"}
                </Button>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default MemberManagement;
