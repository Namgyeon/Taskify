"use client";
import { useGetUser } from "@/apis/users/queries";
import Avatar from "@/components/ui/Avatar";
import Dropdown from "@/components/ui/Dropdown";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { data, isFetching } = useGetUser();
  const router = useRouter();

  return (
    <div>
      {isFetching ? (
        <Skeleton />
      ) : (
        data && (
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
                { label: "로그아웃", onClick: () => {} },
              ]}
              className="hover:bg-transparent"
              optionClassName="px-8 py-3"
            />
          </div>
        )
      )}
    </div>
  );
};

function Skeleton() {
  return (
    <div className="flex gap-3 items-center">
      <div className="flex aspect-square w-9 rounded-full animate-pulse bg-gray-200" />
      <span className="block h-4 w-16 rounded-md animate-pulse bg-gray-200" />
    </div>
  );
}

export default Profile;
