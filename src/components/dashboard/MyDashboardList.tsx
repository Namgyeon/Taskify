"use client";

import { useGetDashboardsQuery } from "@/apis/dashboards/queries";
import MyDashboardCard from "./MyDashboardCard";
import CreateDashboard from "./CreateDashboard";
import Pagination from "../pagination/Pagination";
import { useState } from "react";

const ITEMS_PER_PAGE = 5;
const SKELETON_COUNT = 5;

const MyDashboardList = () => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useGetDashboardsQuery({
    navigationMethod: "pagination",
    page,
    size: ITEMS_PER_PAGE,
  });

  const totalCount = data?.totalCount ?? 0;
  const totalPage = Math.ceil(totalCount / ITEMS_PER_PAGE);

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-2 w-full">
        {Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
          <div
            key={idx}
            className="w-65 md:w-62 lg:w-83 h-15 flex justify-between items-center py-4 px-5 border border-gray-300 rounded-lg bg-white animate-pulse"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-300 flex-shrink-0" />
              <div className="w-16 h-4 rounded bg-gray-300" />
              <span className="w-4 h-4 rounded bg-gray-300" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row flex-wrap gap-2 w-full">
        <CreateDashboard />
        {data?.dashboards.map((dashboard) => {
          return <MyDashboardCard key={dashboard.id} dashboard={dashboard} />;
        })}
      </div>
      <div className="w-full flex justify-start items-center gap-2">
        <Pagination page={page} totalPage={totalPage} setPage={setPage} />
        <p>{`${totalPage} 페이지 중 ${page}`}</p>
      </div>
    </div>
  );
};
export default MyDashboardList;
