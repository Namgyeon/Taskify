import BackButton from "@/components/edit/BackButton";
import PasswordManagement from "@/components/mypage/PasswordManagement";
import ProfileManagement from "@/components/mypage/ProfileManagement";

const MyPage = () => {
  return (
    <div className="p-5 flex flex-col gap-4">
      <BackButton href="/mydashboard" />
      <ProfileManagement />
      <PasswordManagement />
    </div>
  );
};

export default MyPage;
