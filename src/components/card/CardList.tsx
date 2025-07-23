import { useGetCardsQuery } from "@/apis/cards/queries";
import Card from "./Card";
import Skeleton from "react-loading-skeleton";
import { useInfiniteScroll } from "@/utils/hook/useInfiniteScroll";
import { Draggable } from "@hello-pangea/dnd";

interface CardListProps {
  columnId: number;
}

const CardList = ({ columnId }: CardListProps) => {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useGetCardsQuery({
    columnId,
    size: 10,
  });

  const { ref } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  // 모든 페이지의 카드들을 하나의 배열로 합치기
  const allCards = data?.pages.flatMap((page) => page.cards) ?? [];

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 w-25 h-25 md:w-full md:h-full">
        <Skeleton width={300} height={300} />
        <Skeleton width={300} height={300} />
        <Skeleton width={300} height={300} />
        <Skeleton width={300} height={300} />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {allCards.map((card, index) => (
        <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Card key={card.id} card={card} index={index} />
            </div>
          )}
        </Draggable>
      ))}

      {/* 무한 스크롤 트리거 요소 */}
      <div ref={ref} className="h-10 flex items-center justify-center">
        {isFetchingNextPage && (
          <div className="text-gray-500">더 많은 카드를 불러오는 중...</div>
        )}
        {!hasNextPage && allCards.length > 0 && (
          <div className="text-gray-400 text-sm">모든 카드를 불러왔습니다.</div>
        )}
      </div>
    </div>
  );
};

export default CardList;
