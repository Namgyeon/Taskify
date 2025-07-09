import { useGetCommentsInfinite } from "@/apis/comments/queries";
import { Comment } from "@/apis/comments/types";
import { useEffect, useRef } from "react";
import CardComment from "./CardComment";

const CardCommentList = ({ cardId }: { cardId: number }) => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetCommentsInfinite({ cardId });

  console.log("댓글데이터", data);

  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const allComments = data?.pages.flatMap((page) => page.comments) ?? [];

  return (
    <div>
      {isLoading ? (
        <div className="flex flex-col gap-3">
          <CommentSkeleton />
          <CommentSkeleton />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {allComments?.map((comment: Comment) => (
            <CardComment key={comment.id} comment={comment} />
          ))}
        </div>
      )}
      {/* 무한 스크롤 트리거 요소 */}
      <div ref={observerRef} className="h-10 flex items-center justify-center">
        {isFetchingNextPage && (
          <div className="text-gray-500">댓글 불러오는중</div>
        )}
      </div>
    </div>
  );
};
export default CardCommentList;

const CommentSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="w-12 h-8 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="w-12 h-8 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
      <div className="w-full h-8 bg-gray-200 rounded-md animate-pulse"></div>
    </div>
  );
};
