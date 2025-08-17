import ColumnTitle from "./ColumnTitle";
import { Column as ColumnType } from "@/apis/columns/types";
import CreateCard from "./CreateCard";
import CardList from "../card/CardList";
import { Droppable } from "@hello-pangea/dnd";

interface ColumnProps {
  column: ColumnType;
}

const Column = ({ column }: ColumnProps) => {
  return (
    <div className="flex flex-col gap-6 min-w-88 px-3 md:px-5 py-4 md:py-6 border-b lg:border-b-0 lg:border-r border-gray-300 lg:overflow-y-auto">
      <ColumnTitle {...column} />
      <CreateCard columnId={column.id} />
      <Droppable droppableId={column.id.toString()}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`min-h-[400px] p-4 rounded-lg transition-colors ${
              snapshot.isDraggingOver
                ? "bg-blue-50 border-2 border-blue-300 border-dashed"
                : "bg-gray-50"
            }`}
          >
            <CardList columnId={column.id} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
