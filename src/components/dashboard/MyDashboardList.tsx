"use client";

import { useGetDashboardsQuery } from "@/apis/dashboards/queries";
import MyDashboardCard from "./MyDashboardCard";
import CreateDashboard from "./CreateDashboard";
import Pagination from "../pagination/Pagination";
import { useState } from "react";

const ITEMS_PER_PAGE = 5;
// const SKELETON_COUNT = 5;

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
    return <div>로딩중</div>;
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
