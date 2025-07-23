"use client";

import { useGetColumnsQuery } from "@/apis/columns/queries";
import { useParams } from "next/navigation";
import Column from "./Column";
import CreateColumn from "./CreateColumn";
import { useUpdateCard } from "@/apis/cards/queries";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/network/errorMessage";
import { getCardDetail } from "@/apis/cards";

const ColumnList = () => {
  const params = useParams();
  const id = params?.id;
  const { data } = useGetColumnsQuery({ dashboardId: Number(id) });
  const { mutateAsync: updateCard } = useUpdateCard();

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (destination.droppableId !== source.droppableId) {
      try {
        const cardDetail = await getCardDetail(Number(draggableId));

        await updateCard({
          cardId: Number(draggableId),
          assigneeUserId: cardDetail.assignee.id,
          dashboardId: cardDetail.dashboardId,
          columnId: Number(destination.droppableId), // 새로운 컬럼 ID
          title: cardDetail.title,
          description: cardDetail.description,
          dueDate: cardDetail.dueDate,
          tags: cardDetail.tags,
          imageUrl: cardDetail.imageUrl ?? undefined,
        });
        toast.success("카드가 이동되었습니다.");
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="h-full flex flex-col lg:flex-row overflow-y-auto lg:overflow-x-auto">
        {data?.data.map((column) => (
          <Column key={column.id} column={column} />
        ))}
        <div className="px-3 pt-4 md:pt-6">
          <CreateColumn />
        </div>
      </div>
    </DragDropContext>
  );
};

export default ColumnList;
