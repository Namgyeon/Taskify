import { useGetMembers } from "@/apis/members/queries";
import Button from "../ui/Button";
import AssignInput from "../ui/Field/AssignInput";
import { ModalBody, ModalFooter, ModalHeader } from "../ui/Modal";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { CreateCardRequest, createCardRequestSchema } from "@/apis/cards/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Member } from "@/apis/members/types";

interface CardModalProps {
  onClose: () => void;
}
const CardModal = ({ onClose }: CardModalProps) => {
  const params = useParams();
  const dashboardId = Number(params.id);

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
    formState: { errors, isSubmitting },
  } = useForm<CreateCardRequest>({
    resolver: zodResolver(createCardRequestSchema),
  });

  const assigneeUserId = watch("assigneeUserId");
  const selectedMember = data?.members.find(
    (member) => member.userId === assigneeUserId
  );

  const onSubmit = (data: CreateCardRequest) => {};

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <ModalHeader>
        <h2 className="text-xl md:text-2xl font-bold text-[#333236]">
          할 일 생성
        </h2>
      </ModalHeader>
      <ModalBody>
        <form id="card-form" onSubmit={handleSubmit(onSubmit)}>
          <AssignInput
            label="담당자*"
            members={data?.members}
            value={selectedMember}
            onChange={(member: Member | null) =>
              setValue("assigneeUserId", member?.userId ?? 0, {
                shouldValidate: true,
              })
            }
            error={errors.assigneeUserId?.message}
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
