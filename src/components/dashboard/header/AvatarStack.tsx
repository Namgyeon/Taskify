import { useGetMembers } from "@/apis/members/queries";
import { Member } from "@/apis/members/types";
import Avatar from "@/components/ui/Avatar";
import getRandomColor from "@/utils/getRandomColor";

const AvatarStack = ({ dashboardId }: { dashboardId: number }) => {
  const { data } = useGetMembers({
    dashboardId,
    page: 1,
    size: 10,
  });
  console.log("멤버 데이터", data);

  const getVisibleCount = () => {
    if (window.innerWidth < 768) {
      return 2;
    }
    return 4;
  };

  const visibleMembers = data?.members.slice(0, getVisibleCount());
  const remainMembers = data?.totalCount! - getVisibleCount();

  return (
    <div className="flex items-center -space-x-2.5">
      {visibleMembers &&
        visibleMembers.map((member: Member) => (
          <Avatar
            key={member.id}
            profileImageUrl={member.profileImageUrl}
            nickname={member.nickname}
            email={member.email}
          />
        ))}
      {remainMembers > 0 && (
        <div className="w-[34px] md:w-[38px] flex items-center justify-center border-2 border-white font-semibold text-[#D25B68] aspect-square rounded-full bg-[#F4D7DA]">
          +{remainMembers}
        </div>
      )}
    </div>
  );
};

export default AvatarStack;
