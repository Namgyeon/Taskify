import BackButton from "@/components/edit/BackButton";
import DeleteDashboardButton from "@/components/edit/DashboardDeleteButton";
import DetailModify from "@/components/edit/DetailModify";
import InviteManagement from "@/components/edit/InviteManagement";
import MemberManagement from "@/components/edit/MemberManagement";

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
