import { useCreateComment, useGetComments } from "@/apis/comments/queries";
import Textarea from "../ui/Field/Textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentInputForm, commentInputSchema } from "@/apis/comments/types";
import toast from "react-hot-toast";

const CardCommentInput = ({
  cardId,
  columnId,
  dashboardId,
}: {
  cardId: number;
  columnId: number;
  dashboardId: number;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(commentInputSchema),
    defaultValues: {
      content: "",
    },
    mode: "onChange",
  });

  const createCommentMutation = useCreateComment();
  const contentValue = watch("content");

  const onSubmit = async (data: CommentInputForm) => {
    try {
      await createCommentMutation.mutateAsync({
        cardId,
        columnId,
        dashboardId,
        content: data.content,
      });
      toast.success("댓글이 작성되었습니다.");
      reset();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "댓글 작성에 실패했습니다.";
      toast.error(errorMessage);
    }
  };

  const isDisabled = createCommentMutation.isPending || !contentValue.trim();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      <Textarea
        label="댓글"
        placeholder="댓글 작성하기"
        {...register("content")}
        error={!!errors.content}
        errorMessage={errors.content?.message}
      />
      <button
        className="absolute right-5 bottom-3 px-7 py-2 border border-[#D9D9D9] rounded-lg cursor-pointer hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={isDisabled}
      >
        {createCommentMutation.isPending ? "작성중..." : "입력"}
      </button>
    </form>
  );
};

export default CardCommentInput;
