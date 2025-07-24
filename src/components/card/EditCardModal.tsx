import Button from "../ui/Button";
import AssignInput from "../ui/Field/AssignInput";
import { ModalBody, ModalFooter, ModalHeader } from "../ui/Modal";
import { Controller, useForm } from "react-hook-form";
import { Member } from "@/apis/members/types";
import Input from "../ui/Field/Input";
import Textarea from "../ui/Field/Textarea";
import DateInput from "../ui/Field/DateInput";
import TagInput from "../ui/Field/TagInput";
import ImageUpload from "../ui/Field/ImageUpload";
import { Card, createCardFormSchema, UpdateCardForm } from "@/apis/cards/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useGetMembers } from "@/apis/members/queries";
import { useUpdateCard } from "@/apis/cards/queries";
import { formatDateForAPI } from "@/utils/formatDate";
import toast from "react-hot-toast";
import StateInput from "../ui/Field/StateInput";
import { Column } from "@/apis/columns/types";
import { usePostCardImage } from "@/apis/columns/queries";
import { getErrorMessage } from "@/utils/network/errorMessage";

interface EditCardModalProps {
  onClose: () => void;
  cardData: Card;
  cardId: number;
  columnData?: Column[];
}

const EditCardModal = ({
  onClose,
  cardId,
  cardData,
  columnData,
}: EditCardModalProps) => {
  const params = useParams();
  const dashboardId = Number(params.id);
  const { mutateAsync: uploadCardImage } = usePostCardImage(dashboardId);
  const { mutateAsync: updateCard } = useUpdateCard();

  const { data } = useGetMembers({
    dashboardId,
    page: 1,
    size: 20,
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpdateCardForm>({
    resolver: zodResolver(createCardFormSchema),
    defaultValues: {
      assigneeUserId: cardData.assignee.id,
      title: cardData.title,
      description: cardData.description,
      dueDate: cardData.dueDate,
      tags: cardData.tags,
      imageUrl: undefined,
      columnId: cardData.columnId,
      dashboardId: cardData.dashboardId,
    },
  });

  const assigneeUserId = watch("assigneeUserId");
  const watchedColumnId = watch("columnId");
  const selectedMember = data?.members.find(
    (member) => member.userId === assigneeUserId
  );

  const selectedTitle =
    columnData?.find((column) => column.id === watchedColumnId)?.title ?? "";

  const handleImageUpload = async (file: File | null | undefined) => {
    if (file) {
      try {
        const { imageUrl } = await uploadCardImage({
          columnId: cardData.columnId,
          cardImageForm: { image: file },
        });
        setValue("imageUrl", imageUrl);
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
      }
    } else {
      setValue("imageUrl", undefined);
    }
  };

  const onSubmit = async (data: UpdateCardForm) => {
    try {
      const formattedData = {
        ...data,
        dueDate:
          data.dueDate instanceof Date
            ? formatDateForAPI(data.dueDate)
            : data.dueDate,
        imageUrl: data.imageUrl || undefined,
      };

      await updateCard({ cardId, ...formattedData });
      toast.success("카드가 수정되었습니다.");
      onClose();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 h-[90vh]">
      <ModalHeader>
        <h2 className="text-xl md:text-2xl font-bold text-[#333236]">
          할 일 수정
        </h2>
      </ModalHeader>
      <ModalBody>
        <form
          id="card-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 pl-1 pr-4 overflow-y-auto scrollbar-hide"
        >
          <div className="flex flex-col gap-4 md:flex-row md:justify-between">
            <Controller
              name="columnId"
              control={control}
              render={({ field }) => (
                <StateInput
                  id="columnId"
                  label="상태"
                  value={selectedTitle}
                  onChange={(title) => {
                    const found = columnData?.find(
                      (col) => col.title === title
                    );
                    field.onChange(found?.id ?? 0);
                  }}
                  columnData={columnData}
                  error={!!errors.title}
                  errorMessage={errors.title?.message}
                />
              )}
            />
            <Controller
              name="assigneeUserId"
              control={control}
              render={() => (
                <AssignInput
                  id="assignee"
                  label="담당자"
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
          </div>
          <Input
            id="title"
            label="제목"
            placeholder="제목을 입력해주세요"
            {...register("title")}
            error={!!errors.title}
            errorMessage={errors.title?.message}
          />
          <Textarea
            id="description"
            label="설명"
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
                id="dueDate"
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
                id="tags"
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
            render={({ field }) => (
              <ImageUpload
                id="image"
                value={field.value}
                existingImageUrl={cardData.imageUrl ?? undefined}
                onChange={handleImageUpload}
              />
            )}
          />
        </form>
      </ModalBody>
      <ModalFooter>
        <div className="flex justify-end gap-2">
          <Button onClick={onClose} variant="secondary" size="lg">
            취소
          </Button>

          <Button
            type="submit"
            form="card-form"
            disabled={isSubmitting}
            variant="primary"
            size="lg"
          >
            {isSubmitting ? "수정 중..." : "수정"}
          </Button>
        </div>
      </ModalFooter>
    </div>
  );
};

export default EditCardModal;
