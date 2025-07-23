"use client";
import { useLogout } from "@/apis/auth/queries";
import { useGetUser } from "@/apis/users/queries";
import Avatar from "@/components/ui/Avatar";
import Dropdown from "@/components/ui/Dropdown";
import { getErrorMessage } from "@/utils/network/errorMessage";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";

const Profile = () => {
  const { data, isLoading } = useGetUser();
  const { mutate: logout } = useLogout();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("로그아웃 되었습니다.");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  };

  if (isLoading || !data) {
    return (
      <div className="flex gap-3 items-center">
        <Skeleton circle width={32} height={32} />
        <Skeleton width={100} height={24} />
      </div>
    );
  }

  return (
    <div className="flex gap-3 items-center group">
      <Avatar
        profileImageUrl={data.profileImageUrl}
        email={data.email}
        nickname={data.nickname}
        className="group-hover:ring-2 group-hover:ring-blue-400 group-hover:ring-offset-2 group-hover:shadow-lg transition-all duration-200"
      />
      <Dropdown
        text={data.nickname}
        options={[
          {
            label: "내정보",
            onClick: () => {
              router.push("/mypage");
            },
          },
          { label: "로그아웃", onClick: handleLogout },
        ]}
        className="hover:bg-transparent"
        optionClassName="px-8 py-3"
      />
    </div>
  );
};

export default Profile;
