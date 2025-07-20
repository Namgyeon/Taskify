import { useGetCardsQuery } from "@/apis/cards/queries";
import ColumnSettingBtn from "./ColumnSettingBtn";
import { Column } from "@/apis/columns/types";

const ColumnTitle = (column: Column) => {
  const { data: cardList } = useGetCardsQuery({ columnId: column.id });
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#5534DA]" />
        <p className="mr-3 md:text-lg font-bold text-[#333236]">
          {column.title}
        </p>
        <p className="w-5 h-5 flex items-center justify-center text-xs text-[#787486] rounded-md bg-[#EEEEEE]">
          {cardList?.pages[0].totalCount}
        </p>
      </div>
      <div>
        <ColumnSettingBtn {...column} />
      </div>
    </div>
  );
};

export default ColumnTitle;
