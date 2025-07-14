"use client";

import { useGetDashboardQuery } from "@/apis/dashboards/queries";
import DashBoardInfo from "./DashBoardInfo";
import Profile from "./Profile";
import { useParams } from "next/navigation";

const Header = () => {
  const params = useParams();
  const { data } = useGetDashboardQuery(Number(params.id));
  console.log("헤더데이터", data);
  return (
    <div className="flex justify-between items-center px-3 md:px-8 lg:px-10 py-4 border-b border-b-gray-200">
      <p className="text-lg md:text-xl text-[#333236] font-bold">
        {params.id ? data!.title : "내 대시보드"}
      </p>
      <div className="flex gap-4 md:gap-9 divide-x divide-gray-300">
        <div className="flex pr-4 md:pr-9 items-center">
          <DashBoardInfo />
        </div>
        <div className="flex">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Header;
