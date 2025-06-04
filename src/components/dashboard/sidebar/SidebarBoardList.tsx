"use client";

import { useGetDashboardsQuery } from "@/apis/dashboards/queries";
import Image from "next/image";
import { useState } from "react";

const ITEMS_PER_PAGE = 15;

const SidebarBoardList = () => {
  const [page, setPage] = useState(1);
  const { data } = useGetDashboardsQuery({
    page,
    size: ITEMS_PER_PAGE,
    navigationMethod: "pagination",
  });
  console.log("리스트 데이터:", data);

  return (
    <div className="flex flex-col gap-4">
      {data ? (
        data.dashboards.map((dashboard) => (
          <div
            key={dashboard.id}
            className="flex items-center justify-center md:justify-start  gap-2"
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: dashboard.color }}
            />
            <div className="hidden md:block text-[#787486] truncate">
              {dashboard.title}
            </div>
            {dashboard.createdByMe ? (
              <div className="hidden md:block">
                <Image
                  src={"/dashboard/crown-icon.svg"}
                  alt="왕관아이콘"
                  width={20}
                  height={20}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        ))
      ) : (
        <div>대쉬보드가 없습니다.</div>
      )}
    </div>
  );
};

export default SidebarBoardList;
