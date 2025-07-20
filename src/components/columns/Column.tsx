import ColumnTitle from "./ColumnTitle";
import { Column as ColumnType } from "@/apis/columns/types";
import CreateCard from "./CreateCard";
import CardList from "../card/CardList";

interface ColumnProps {
  column: ColumnType;
}

const Column = ({ column }: ColumnProps) => {
  return (
    <div className="flex flex-col gap-6 min-w-88 px-3 md:px-5 py-4 md:py-6 border-b lg:border-b-0 lg:border-r border-gray-300 lg:overflow-y-auto">
      <ColumnTitle {...column} />
      <CreateCard columnId={column.id} />
      <CardList columnId={column.id} />
    </div>
  );
};

export default Column;
