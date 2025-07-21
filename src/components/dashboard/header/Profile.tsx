"use client";
import { useGetUser } from "@/apis/users/queries";
import Avatar from "@/components/ui/Avatar";
import Dropdown from "@/components/ui/Dropdown";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";

const Profile = () => {
  const { data, isLoading } = useGetUser();
  const router = useRouter();

  if (isLoading) {
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
        profileImageUrl={data!.profileImageUrl}
        email={data!.email}
        nickname={data!.nickname}
        className="group-hover:ring-2 group-hover:ring-blue-400 group-hover:ring-offset-2 group-hover:shadow-lg transition-all duration-200"
      />
      <Dropdown
        text={data!.nickname}
        options={[
          {
            label: "내정보",
            onClick: () => {
              router.push("/mypage");
            },
          },
          { label: "로그아웃", onClick: () => {} },
        ]}
        className="hover:bg-transparent"
        optionClassName="px-8 py-3"
      />
    </div>
  );
};

export default Profile;
