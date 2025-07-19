import Image from "next/image";
import { ModalBody, ModalHeader } from "../ui/Modal";
import BaseLabel from "../ui/Field/BaseLabel";
import Input from "../ui/Field/Input";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PostDashboardMemberInvitationRequest,
  postDashboardMemberInvitationRequestSchema,
} from "@/apis/dashboards/types";
import { usePostDashboardMemberInvitation } from "@/apis/dashboards/queries";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/network/errorMessage";

const InviteModal = ({
  close,
  dashboardId,
}: {
  close: () => void;
  dashboardId: number;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(postDashboardMemberInvitationRequestSchema),
    mode: "onChange",
  });

  const { mutateAsync: postInvitation, isPending } =
    usePostDashboardMemberInvitation(dashboardId);

  const onSubmit = async (data: PostDashboardMemberInvitationRequest) => {
    try {
      await postInvitation(data);
      reset();
      close();
      toast.success("초대 메일이 발송되었습니다.");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col gap-3 md:gap-6">
      <ModalHeader>
        <p className="text-xl md:text-2xl font-bold text-[#333236]">초대하기</p>
        <button type="button" onClick={close}>
          <div className="relative w-6 h-6 md:w-9 md:h-9">
            <Image
              src="/column/close-icon.svg"
              alt="닫기 아이콘"
              fill
              className="object-contain"
            />
          </div>
        </button>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 px-1">
            <BaseLabel>이메일</BaseLabel>
            <Input
              {...register("email")}
              error={!!errors.email}
              errorMessage={errors.email?.message}
              placeholder="초대할 멤버 이메일을 입력해주세요"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={close}
              disabled={isPending}
            >
              취소
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "초대중..." : "초대"}
            </Button>
          </div>
        </form>
      </ModalBody>
    </div>
  );
};

export default InviteModal;
