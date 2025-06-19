import ColumnTitle from "./ColumnTitle";
import { Column as ColumnType } from "@/apis/columns/types";

interface ColumnProps {
  column: ColumnType;
}

const Column = ({ column }: ColumnProps) => {
  return (
    <div className="min-w-88 px-3 md:px-5 py-4 md:py-6 border-b lg:border-b-0 lg:border-r border-gray-300">
      <ColumnTitle title={column.title} />
    </div>
  );
};

export default Column;
