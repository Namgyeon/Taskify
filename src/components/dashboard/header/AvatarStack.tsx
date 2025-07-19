import { useGetMembers } from "@/apis/members/queries";
import { Member } from "@/apis/members/types";
import Avatar from "@/components/ui/Avatar";

const AvatarStack = ({ dashboardId }: { dashboardId: number }) => {
  const { data } = useGetMembers({
    dashboardId,
    page: 1,
    size: 10,
  });

  const visibleMembers = data?.members.slice(0, 4);
  const remainMembers = data?.totalCount ? data.totalCount - 4 : 0;

  return (
    <div className="flex items-center -space-x-2.5">
      {visibleMembers &&
        visibleMembers.map((member: Member, index: number) => (
          <div
            key={member.id}
            className={`${index >= 2 ? "hidden md:block" : ""}`}
          >
            <Avatar
              profileImageUrl={member.profileImageUrl}
              nickname={member.nickname}
              email={member.email}
            />
          </div>
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
