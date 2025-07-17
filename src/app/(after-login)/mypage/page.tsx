import BackButton from "@/components/edit/BackButton";

const MyPage = () => {
  return (
    <div className="p-5 flex flex-col gap-4">
      <BackButton href="/mydashboard" />
    </div>
  );
};

export default MyPage;
