import Image from "next/image";
import ColumnSettingBtn from "./ColumnSettingBtn";

const ColumnTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#5534DA]" />
        <p className="mr-3 md:text-lg font-bold text-[#333236]">{title}</p>
        <p className="w-5 h-5 flex items-center justify-center text-xs text-[#787486] rounded-md bg-[#EEEEEE]">
          2
        </p>
      </div>
      <div>
        <ColumnSettingBtn />
      </div>
    </div>
  );
};

export default ColumnTitle;
