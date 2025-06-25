import { useGetMembers } from "@/apis/members/queries";
import Button from "../ui/Button";
import AssignInput from "../ui/Field/AssignInput";
import { ModalBody, ModalFooter, ModalHeader } from "../ui/Modal";
import { useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { CreateCardRequest, createCardRequestSchema } from "@/apis/cards/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Member } from "@/apis/members/types";
import Input from "../ui/Field/Input";
import Textarea from "../ui/Field/Textarea";
import DateInput from "../ui/Field/DateInput";
import TagInput from "../ui/Field/TagInput";
import ImageUpload from "../ui/Field/ImageUpload";
import { useCardMutation } from "@/apis/cards/queries";
import toast from "react-hot-toast";
import { formatDateForAPI } from "@/utils/formatDate";

interface CardModalProps {
  onClose: () => void;
  columnId: number;
}
const CardModal = ({ onClose, columnId }: CardModalProps) => {
  const params = useParams();
  const dashboardId = Number(params.id);
  const { create: createCard } = useCardMutation(dashboardId);

  const { data } = useGetMembers({
    dashboardId,
    page: 1,
    size: 20,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateCardRequest>({
    resolver: zodResolver(createCardRequestSchema),
    mode: "onChange",
    defaultValues: {
      dashboardId,
      columnId,
      tags: [],
      imageUrl: "",
      dueDate: new Date(),
    },
  });

  const assigneeUserId = watch("assigneeUserId");
  const selectedMember = data?.members.find(
    (member) => member.userId === assigneeUserId
  );

  const onSubmit = async (data: CreateCardRequest) => {
    try {
      const formattedData = {
        ...data,
        dueDate:
          data.dueDate instanceof Date
            ? formatDateForAPI(data.dueDate)
            : data.dueDate,
        imageUrl:
          data.imageUrl ||
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image/",
      };

      await createCard(formattedData);
      toast.success("카드가 생성되었습니다.");
      onClose();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <ModalHeader>
        <h2 className="text-xl md:text-2xl font-bold text-[#333236]">
          할 일 생성
        </h2>
      </ModalHeader>
      <ModalBody>
        <form
          id="card-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <Controller
            name="assigneeUserId"
            control={control}
            render={({ field, fieldState }) => (
              <AssignInput
                label="담당자*"
                members={data?.members}
                value={selectedMember}
                onChange={(member: Member | null) =>
                  setValue("assigneeUserId", member?.userId ?? 0, {
                    shouldValidate: true,
                  })
                }
                error={!!errors.assigneeUserId}
                errorMessage={errors.assigneeUserId?.message}
              />
            )}
          />
          <Input
            label="제목*"
            placeholder="제목을 입력해주세요"
            {...register("title")}
            error={!!errors.title}
            errorMessage={errors.title?.message}
          />
          <Textarea
            label="설명*"
            placeholder="설명을 입력해주세요"
            rows={3}
            {...register("description")}
            error={!!errors.description}
            errorMessage={errors.description?.message}
          />
          <Controller
            name="dueDate"
            control={control}
            render={({ field, fieldState }) => (
              <DateInput
                value={field.value instanceof Date ? field.value : new Date()}
                onChange={(date: Date | null) => field.onChange(date)}
                error={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="tags"
            control={control}
            render={({ field, fieldState }) => (
              <TagInput
                value={field.value}
                onChange={(tags: string[]) => field.onChange(tags)}
                error={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="imageUrl"
            control={control}
            render={({ field, fieldState }) => (
              <ImageUpload
                value={field.value}
                onChange={(file: File | null) => {
                  if (file) {
                    const url = URL.createObjectURL(file);
                    field.onChange(url);
                  } else {
                    field.onChange("");
                  }
                }}
                error={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </form>
      </ModalBody>
      <ModalFooter>
        <div className="flex justify-end gap-2">
          <Button
            text="취소"
            onClick={onClose}
            className="min-w-[144px] min-h-[54px] text-[#787486] bg-white border-[#D9D9D9] hover:bg-[#D9D9D9]"
          />

          <Button
            type="submit"
            form="card-form"
            disabled={isSubmitting}
            text={isSubmitting ? "생성 중..." : "생성"}
            className="min-w-[144px] min-h-[54px] text-[white] hover:bg-[#4A2DB8]"
          />
        </div>
      </ModalFooter>
    </div>
  );
};

export default CardModal;
