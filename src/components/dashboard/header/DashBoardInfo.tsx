import Button from "@/components/ui/Button";
import HeaderButton from "./HeaderButton";

const DashBoardInfo = () => {
  return (
    <div className="flex gap-1.5 md:gap-4">
      <HeaderButton href="#" icon="/column/setting-icon.svg">
        관리
      </HeaderButton>
      <HeaderButton href="#" icon="/dashboard/add-icon.svg">
        초대하기
      </HeaderButton>
    </div>
  );
};

export default DashBoardInfo;
