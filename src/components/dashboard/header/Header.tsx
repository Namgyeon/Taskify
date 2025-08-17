"use client";

import { useGetDashboardQuery } from "@/apis/dashboards/queries";
import DashBoardInfo from "./DashBoardInfo";
import Profile from "./Profile";
import { useParams, usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const params = useParams();

  const { data: dashboardData } = useGetDashboardQuery(Number(params.id));

  const getPageTitle = () => {
    if (pathname === "/mypage") {
      return "계정 관리";
    }
    return dashboardData?.title || "내 대시보드";
  };
  return (
    <div className="w-full flex items-center justify-between md:justify-end lg:justify-between px-2 md:px-8 lg:px-10 py-4 border-b border-b-gray-200">
      <div className="text-lg block md:hidden lg:block truncate text-[#333236] font-bold">
        {getPageTitle()}
      </div>
      <div className="flex items-center md:divide-x divide-gray-300">
        {dashboardData && (
          <div className="flex md:pr-9 items-center">
            <DashBoardInfo dashboardId={dashboardData.id} />
          </div>
        )}
        <div className="md:flex pl-9 pr-4 md:pr-9 items-center">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Header;
