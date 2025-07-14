import HeaderButton from "./HeaderButton";
import AvatarStack from "./AvatarStack";

const DashBoardInfo = ({ dashboardId }: { dashboardId: number }) => {
  return (
    <div className="flex items-center justify-between gap-8">
      <div className="flex gap-1.5 md:gap-4">
        <HeaderButton href="#" icon="/column/setting-icon.svg">
          관리
        </HeaderButton>
        <HeaderButton href="#" icon="/dashboard/add-icon.svg">
          초대하기
        </HeaderButton>
      </div>
      <AvatarStack dashboardId={dashboardId} />
    </div>
  );
};

export default DashBoardInfo;
