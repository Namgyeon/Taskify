import { Dashboard, dashboardSchema } from "@/apis/dashboards/types";
import BackButton from "@/components/edit/BackButton";
import DeleteDashboardButton from "@/components/edit/DashboardDeleteButton";
import DetailModify from "@/components/edit/DetailModify";
import InviteManagement from "@/components/edit/InviteManagement";
import MemberManagement from "@/components/edit/MemberManagement";
import axiosServerHelper from "@/utils/network/axiosServerHelper";
import { safeResponse } from "@/utils/network/safeResponse";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const response = await axiosServerHelper<Dashboard>(`/dashboards/${id}`);
  const dashboardDetail = safeResponse(response.data, dashboardSchema);
  return {
    title: `Taskify - ${dashboardDetail.title} 수정`,
    description: "Taskify 대시보드에서 커뮤니티 일정을 한눈에 관리해 보세요.",
    openGraph: {
      title: `Taskify - ${dashboardDetail.title} 수정`,
      description: "Taskify 대시보드에서 커뮤니티 일정을 한눈에 관리해 보세요.",
      url: `https://taskify-namgyeon.vercel.app/dashboard/${id}/edit`,
      type: "website",
      images: [
        {
          url: "https://taskify-namgyeon.vercel.app/meta.png",
          width: 1200,
          height: 630,
          alt: "Taskify 대시보드 페이지 이미지",
        },
      ],
    },
  };
}

const EditPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const dashboardId = Number(id);
  return (
    <div className="p-5 flex flex-col gap-4">
      <BackButton href={`/dashboard/${id}`} />
      <DetailModify dashboardId={dashboardId} />
      <MemberManagement dashboardId={dashboardId} />
      <InviteManagement dashboardId={dashboardId} />
      <DeleteDashboardButton dashboardId={dashboardId} />
    </div>
  );
};
export default EditPage;
