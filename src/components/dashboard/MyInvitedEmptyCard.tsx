import Image from "next/image";

const MyInvitedEmptyCard = () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <Image
        src={"/dashboard/emptyDashboardInvited-icon.svg"}
        alt="empty dashboard 이미지"
        width={100}
        height={100}
        className="w-[60px] h-[60px] md:w-[100px] md:h-[100px]"
      />
      <h3 className="text-xs md:text-lg text-gray-400">
        아직 초대받은 대시보드가 없어요
      </h3>
    </div>
  );
};

export default MyInvitedEmptyCard;
