import BackButton from "@/components/dashboard/edit/BackButton";
import DetailModify from "@/components/dashboard/edit/DetailModify";

const EditPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const dashboardId = Number(id);
  return (
    <div className="p-5 flex flex-col gap-4">
      <BackButton href={`/dashboard/${id}`} />

      <DetailModify dashboardId={dashboardId} />
    </div>
  );

const EditPage = () => {
  return <div>EditPage</div>;

};

export default EditPage;
