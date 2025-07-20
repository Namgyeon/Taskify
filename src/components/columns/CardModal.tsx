import { useGetMembers } from "@/apis/members/queries";
import Button from "../ui/Button";
import AssignInput from "../ui/Field/AssignInput";
import { ModalBody, ModalFooter, ModalHeader } from "../ui/Modal";
import { useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { CreateCardForm, createCardFormSchema } from "@/apis/cards/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Member } from "@/apis/members/types";
import Input from "../ui/Field/Input";
import Textarea from "../ui/Field/Textarea";
import DateInput from "../ui/Field/DateInput";
import TagInput from "../ui/Field/TagInput";
import ImageUpload from "../ui/Field/ImageUpload";
import toast from "react-hot-toast";
import { formatDateForAPI } from "@/utils/formatDate";
import { useCreateCard } from "@/apis/cards/queries";
import { usePostCardImage } from "@/apis/columns/queries";
import { getErrorMessage } from "@/utils/network/errorMessage";

interface CardModalProps {
  onClose: () => void;
  columnId: number;
}
const CardModal = ({ onClose, columnId }: CardModalProps) => {
  const params = useParams();
  const dashboardId = Number(params.id);
  const { mutateAsync: uploadCardImage } = usePostCardImage(dashboardId);
  const { mutateAsync: createCard } = useCreateCard();

  const { data } = useGetMembers({
    dashboardId,
    page: 1,
    size: 20,
  });

  console.log("columnId, dashboardId", columnId, dashboardId);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateCardForm>({
    resolver: zodResolver(createCardFormSchema),
    mode: "onChange",
    defaultValues: {
      dashboardId,
      columnId,
    },
  });

  console.log("현재errors:", errors);

  const assigneeUserId = watch("assigneeUserId");
  const selectedMember = data?.members.find(
    (member) => member.userId === assigneeUserId
  );

  const handleImageUpload = async (file: File | null | undefined) => {
    if (file) {
      try {
        const { imageUrl } = await uploadCardImage({
          columnId,
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

  const onSubmit = async (data: CreateCardForm) => {
    console.log("현재data:", data);
    try {
      const formattedData = {
        ...data,
        dueDate:
          data.dueDate instanceof Date
            ? formatDateForAPI(data.dueDate)
            : data.dueDate,
        imageUrl: data.imageUrl as string | undefined,
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
    <div className="h-[90vh] overflow-y-auto flex flex-col gap-6 md:gap-8">
      <ModalHeader>
        <h2 className="text-xl md:text-2xl font-bold text-[#333236]">
          할 일 생성
        </h2>
      </ModalHeader>
      <ModalBody>
        <form
          id="card-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4  pl-1 pr-4 overflow-y-auto scrollbar-hide"
        >
          <Controller
            name="assigneeUserId"
            control={control}
            render={() => (
              <AssignInput
                id="assignee"
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
            id="title"
            label="제목*"
            placeholder="제목을 입력해주세요"
            {...register("title")}
            error={!!errors.title}
            errorMessage={errors.title?.message}
          />
          <Textarea
            id="description"
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
                onChange={handleImageUpload}
              />
            )}
          />
        </form>
      </ModalBody>
      <ModalFooter>
        <div className="flex justify-end gap-2">
          <Button
            onClick={onClose}
            className="min-w-[144px] min-h-[54px] text-[#787486] bg-white border-[#D9D9D9] hover:bg-[#D9D9D9]"
          >
            취소
          </Button>

          <Button
            type="submit"
            form="card-form"
            disabled={isSubmitting}
            className="min-w-[144px] min-h-[54px] text-[white] hover:bg-[#4A2DB8]"
          >
            {isSubmitting ? "생성 중..." : "생성"}
          </Button>
        </div>
      </ModalFooter>
    </div>
  );
};

export default CardModal;
