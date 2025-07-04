import { useGetComments } from "@/apis/comments/queries";
import Input from "../ui/Field/Input";
import Textarea from "../ui/Field/Textarea";

const CardComment = ({ cardId }: { cardId: number }) => {
  const { data } = useGetComments({ cardId });
  console.log("카드댓글가져오기", data);
  return (
    <div className="relative">
      <Textarea label="댓글" placeholder="댓글 작성하기" />
      <button className="absolute right-5 bottom-3 px-7 py-2 border border-[#D9D9D9] rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
        입력
      </button>
    </div>
  );
};

export default CardComment;
