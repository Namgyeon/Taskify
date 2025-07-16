"use client";
import { useGetDashboardMemberInvitationsQuery } from "@/apis/dashboards/queries";
import Pagination from "../pagination/Pagination";

const InviteManagement = ({ dashboardId }: { dashboardId: number }) => {
  const { data } = useGetDashboardMemberInvitationsQuery({
    dashboardId,
    page: 1,
    size: 5,
  });
  console.log("관리페이지에서 초대불러오기 리스트:", data);
  return (
    <div className="max-w-[540px] lg:max-w-[620px] flex flex-col gap-6 px-4 md:px-7 py-5 md:py-8 rounded-lg bg-white">
      <div>
        <h2 className="text-xl md:text-2xl font-bold">초대 내역</h2>
        {/* <Pagination /> */}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[#9FA6B2]">이메일</p>
        <button>초대하기</button>
      </div>
    </div>
  );
};

export default InviteManagement;
