import BackButton from "@/components/dashboard/edit/BackButton";

const EditPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="p-5">
      <BackButton href={`/dashboard/${params.id}`} />
    </div>
  );
};

export default EditPage;
