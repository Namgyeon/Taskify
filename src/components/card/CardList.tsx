import { useGetCardsQuery } from "@/apis/cards/queries";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Card from "./Card";

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

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  // 무한 스크롤을 위한 Intersection Observer
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, inView]);

  // 모든 페이지의 카드들을 하나의 배열로 합치기
  const allCards = data?.pages.flatMap((page) => page.cards) ?? [];

  if (isLoading) {
    return <div className="text-center py-4">카드 로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {allCards.map((card) => (
        <Card key={card.id} card={card} />
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
