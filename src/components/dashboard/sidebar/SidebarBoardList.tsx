import { useGetDashboardsQuery } from "@/apis/dashboards/queries";

const SidebarBoardList = () => {
  const params = 
  const {data} = useGetDashboardsQuery(params)

  return <div>리스트</div>;
};

export default SidebarBoardList;
