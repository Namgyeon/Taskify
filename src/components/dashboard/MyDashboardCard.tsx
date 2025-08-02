import { Dashboard } from "@/apis/dashboards/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MyDashboardCardProps {
  dashboard: Dashboard;
}

const MyDashboardCard = ({ dashboard }: MyDashboardCardProps) => {
  const router = useRouter();

  const handleDashboardClick = (dashboardId: number) => {
    router.push(`/dashboard/${dashboardId}`);
  };

  return (
    <div
      className="w-65 md:w-62 lg:w-83 h-15 flex justify-between items-center py-4 px-5 border border-gray-300  rounded-lg cursor-pointer bg-white hover:bg-gray-300"
      onClick={() => handleDashboardClick(dashboard.id)}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: dashboard.color }}
        />
        <div className="line-clamp-1">{dashboard.title}</div>
        {dashboard.createdByMe && (
          <div>
            <Image
              src="/dashboard/crown-icon.svg"
              alt="왕관아이콘"
              width={20}
              height={20}
              style={{ width: "20px", height: "20px" }}
            />
          </div>
        )}
      </div>
      <div>
        <Image
          src="/dashboard/arrow-icon.svg"
          alt="화살표아이콘"
          width={20}
          height={20}
        />
      </div>
    </div>
  );
};
export default MyDashboardCard;
