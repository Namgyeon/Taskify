import { useGetCommentsInfinite } from "@/apis/comments/queries";
import { Comment } from "@/apis/comments/types";
import { useEffect, useRef } from "react";
import CardComment from "./CardComment";
import { useInView } from "react-intersection-observer";

const CardCommentList = ({ cardId }: { cardId: number }) => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetCommentsInfinite({ cardId });

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
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
            <CardComment key={comment.id} comment={comment} cardId={cardId} />
          ))}
        </div>
      )}
      {/* 무한 스크롤 트리거 요소 */}
      <div ref={ref} className="h-10 flex items-center justify-center">
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
