"use client";

import { useGetDashboardsQuery } from "@/apis/dashboards/queries";
import MyDashboardCard from "./MyDashboardCard";
import CreateDashboard from "./CreateDashboard";

const MyDashboardList = () => {
  const { data, isLoading } = useGetDashboardsQuery({
    navigationMethod: "pagination",
    page: 1,
    size: 10,
  });

  if (isLoading) {
    return <div>로딩중</div>;
  }

  return (
    <div className="flex flex-row flex-wrap gap-2 w-full">
      <CreateDashboard />
      {data?.dashboards.map((dashboard) => {
        return <MyDashboardCard key={dashboard.id} dashboard={dashboard} />;
      })}
    </div>
  );
};
export default MyDashboardList;
