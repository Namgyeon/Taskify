import { useGetUser } from "@/apis/users/queries";
import Avatar from "@/components/ui/Avatar";

const Profile = () => {
  const { data, isFetching } = useGetUser();
  console.log(data);
  return (
    <div>
      {data && (
        <div className="flex gap-3 items-center">
          <Avatar
            profileImageUrl={data.profileImageUrl}
            email={data.email}
            nickname={data.nickname}
          />
          <p className="font-medium text-[#333236]">{data.nickname}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
