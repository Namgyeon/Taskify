import Image from "next/image";

const ColumnSettingBtn = () => {
  return (
    <button className="flex items-center cursor-pointer hover:bg-gray-200 rounded-lg transition-colors">
      <Image
        src="/column/setting-icon.svg"
        alt="설정 아이콘"
        width={22}
        height={22}
      />
    </button>
  );
};

export default ColumnSettingBtn;
