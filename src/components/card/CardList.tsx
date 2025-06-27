import { useGetCardsQuery } from "@/apis/cards/queries";
import { useEffect, useRef } from "react";

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
    return (
      <div className="text-center py-4 text-red-500">에러가 발생했습니다.</div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* 카드 목록 렌더링 */}
      {allCards.map((card) => (
        <div
          key={card.id}
          className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
          <p className="text-gray-600 mb-3">{card.description}</p>

          {/* 담당자 정보 */}
          {card.assignee && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>담당자:</span>
              <span className="font-medium">{card.assignee.nickname}</span>
            </div>
          )}

          {/* 태그들 */}
          {card.tags && card.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {card.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
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
