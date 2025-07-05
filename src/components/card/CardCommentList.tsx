import { useGetComments } from "@/apis/comments/queries";
import { Comment } from "@/apis/comments/types";
import Avatar from "../ui/Avatar";
import { formatDateForAPI as formatDate } from "@/utils/formatDate";

const CardCommentList = ({ cardId }: { cardId: number }) => {
  const { data, isLoading } = useGetComments({ cardId });

  console.log("카드댓글가져오기", data);

  return (
    <div>
      {isLoading ? (
        <div>로딩중 </div>
      ) : (
        <div className="flex flex-col gap-3">
          {data?.comments.map((comment: Comment) => (
            <div key={comment.id} className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <Avatar
                  nickname={comment.author.nickname}
                  profileImageUrl={comment.author.profileImageUrl}
                />
                <p className="text-lg font-semibold text-[#333236]">
                  {comment.author.nickname}
                </p>
                <p className="text-[#9FA6B2]">
                  {formatDate(new Date(comment.createdAt))}
                </p>
              </div>
              <p className="pl-11 text-[#333236]">{comment.content}</p>
              <div className="flex gap-2 pl-11">
                <button className="text-sm text-[#9FA6B2] underline cursor-pointer">
                  수정
                </button>
                <button className="text-sm text-[#9FA6B2] underline cursor-pointer">
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default CardCommentList;
