import { useGetCardsQuery } from "@/apis/cards/queries";
import { useEffect, useRef } from "react";
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
  const observerRef = useRef<HTMLDivElement>(null);

  // 무한 스크롤을 위한 Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 화면에 보이고, 다음 페이지가 있고, 현재 로딩 중이 아닐 때
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 } // 100% 보일 때 트리거
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 모든 페이지의 카드들을 하나의 배열로 합치기
  const allCards = data?.pages.flatMap((page) => page.cards) ?? [];

  if (isLoading) {
    return <div className="text-center py-4">카드 로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error.message}</div>;
  }

  console.log(`컬럼아이디 ${columnId}번 카드목록:`, data?.pages);

  return (
    <div className="flex flex-col gap-4">
      {/* 카드 목록 렌더링 */}
      {allCards.map((card) => (
        <Card key={card.id} card={card} />
      ))}

      {/* 무한 스크롤 트리거 요소 */}
      <div ref={observerRef} className="h-10 flex items-center justify-center">
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
