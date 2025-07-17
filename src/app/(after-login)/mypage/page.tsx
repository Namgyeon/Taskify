import BackButton from "@/components/edit/BackButton";
import ProfileManagement from "@/components/mypage/ProfileManagement";

const MyPage = () => {
  return (
    <div className="p-5 flex flex-col gap-4">
      <BackButton href="/mydashboard" />
      <ProfileManagement />
    </div>
  );
};

export default MyPage;
