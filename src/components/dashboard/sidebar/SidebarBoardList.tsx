"use client";

import { useGetDashboardsQuery } from "@/apis/dashboards/queries";
import Image from "next/image";
import { useState } from "react";

const ITEMS_PER_PAGE = 10;
const SKELETON_COUNT = 5;

const SidebarBoardList = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching, isLoading } = useGetDashboardsQuery({
    page,
    size: ITEMS_PER_PAGE,
    navigationMethod: "pagination",
  });
  console.log("리스트 데이터:", data);

  if (isFetching || isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
          <div key={idx} className="flex items-center gap-2 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-gray-300 flex-shrink-0" />
            <div className="hidden md:block w-16 h-4 rounded bg-gray-300" />
            <span className="hidden md:block w-4 h-4 rounded bg-gray-300" />
          </div>
        ))}
      </div>
    );
  }

  if (data && data.dashboards.length > 0) {
    return (
      <div className="flex flex-col gap-4 p-2">
        {data.dashboards.map((dashboard) => (
          <div
            key={dashboard.id}
            className="flex items-center justify-center md:justify-start gap-2"
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: dashboard.color }}
            />
            <div className="hidden md:block text-[#787486] truncate">
              {dashboard.title}
            </div>
            {dashboard.createdByMe && (
              <div className="hidden md:block">
                <Image
                  src="/dashboard/crown-icon.svg"
                  alt="왕관아이콘"
                  width={20}
                  height={20}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
};

export default SidebarBoardList;
