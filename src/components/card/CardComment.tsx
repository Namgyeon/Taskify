import {
  Comment,
  CommentInputForm,
  commentInputSchema,
} from "@/apis/comments/types";
import Avatar from "../ui/Avatar";
import { formatDateForAPI } from "@/utils/formatDate";
import { useState } from "react";
import { useDeleteComment, useUpdateComment } from "@/apis/comments/queries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Textarea from "../ui/Field/Textarea";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { getErrorMessage } from "@/utils/network/errorMessage";

const CardComment = ({
  comment,
  cardId,
}: {
  comment: Comment;
  cardId: number;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const updateCommentMutation = useUpdateComment();
  const deleteCommentMutation = useDeleteComment();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    setValue,
  } = useForm({
    resolver: zodResolver(commentInputSchema),
    defaultValues: {
      content: comment.content,
    },
    mode: "onChange",
  });

  const handleEditClick = () => {
    setIsEditing(true);
    setValue("content", comment.content);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setValue("content", comment.content);
  };

  const handleDeleteClick = async () => {
    try {
      await deleteCommentMutation.mutateAsync({
        commentId: comment.id,
        cardId,
      });
      toast.success("댓글이 삭제되었습니다.");
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data.message
          : "댓글 삭제에 실패했습니다.";
      toast.error(errorMessage);
    }
  };

  console.log("원본시간", comment.createdAt);

  const onSubmit = async (data: CommentInputForm) => {
    try {
      await updateCommentMutation.mutateAsync({
        commentId: comment.id,
        content: data.content,
      });
      setIsEditing(false);
      toast.success("댓글이 수정되었습니다.");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  };

  return (
    <div>
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
            {formatDateForAPI(new Date(comment.createdAt))}
          </p>
        </div>
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="relative p-1">
            <Textarea
              {...register("content")}
              error={!!errors.content}
              errorMessage={errors.content?.message}
            />
            <div className="mt-1 flex gap-4 justify-end">
              <button
                type="submit"
                className="px-7 py-2 border border-[#D9D9D9] rounded-lg cursor-pointer hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  updateCommentMutation.isPending || !isDirty || !isValid
                }
              >
                {updateCommentMutation.isPending ? "수정중..." : "수정"}
              </button>
              <button
                onClick={handleEditCancel}
                className="px-7 py-2 border border-[#D9D9D9] rounded-lg cursor-pointer hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                취소
              </button>
            </div>
          </form>
        ) : (
          <>
            <p className="pl-11 text-[#333236]">{comment.content}</p>
            <div className="flex gap-2 pl-11">
              <button
                onClick={handleEditClick}
                className="text-sm text-[#9FA6B2] underline cursor-pointer"
              >
                수정
              </button>
              <button
                onClick={handleDeleteClick}
                className="text-sm text-[#9FA6B2] underline cursor-pointer"
              >
                삭제
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CardComment;
