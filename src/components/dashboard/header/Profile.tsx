import { useGetUser } from "@/apis/users/queries";
import Avatar from "@/components/ui/Avatar";

const Profile = () => {
  const { data, isFetching } = useGetUser();
  console.log(data);
  return (
    <div>
      {isFetching ? (
        <Skeleton />
      ) : (
        data && (
          <div className="flex gap-3 items-center">
            <Avatar
              profileImageUrl={data.profileImageUrl}
              email={data.email}
              nickname={data.nickname}
            />
            <p className="font-medium text-[#333236]">{data.nickname}</p>
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
