"use client";

import { useColumnMutation } from "@/apis/columns/queries";
import { ModalHeader, ModalBody, ModalFooter } from "@/components/ui/Modal";
import Input from "@/components/ui/Field/Input";
import Button from "@/components/ui/Button";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  CreateColumnRequest,
  createColumnRequestSchema,
} from "@/apis/columns/types";
import { zodResolver } from "@hookform/resolvers/zod";

const ColumnModal = ({ onClose }: { onClose: () => void }) => {
  const params = useParams();
  const dashboardId = Number(params?.id);
  const { create } = useColumnMutation(dashboardId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateColumnRequest>({
    resolver: zodResolver(createColumnRequestSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: CreateColumnRequest) => {
    try {
      await create(data);
      toast.success("컬럼이 생성되었습니다.");
      onClose();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "알 수 없는 오류";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <ModalHeader>
        <h2 className="text-xl font-bold text-[#333236]">새 컬럼 생성 </h2>
      </ModalHeader>
      <ModalBody>
        <form id="column-form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("title")}
            label="이름"
            placeholder="새 컬럼 이름"
            error={!!errors.title}
            errorMessage={errors.title?.message}
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
            form="dashboard-form"
            disabled={isSubmitting}
            text={isSubmitting ? "생성 중..." : "생성"}
            onClick={handleSubmit(onSubmit)}
            className="min-w-[144px] min-h-[54px] text-[white] hover:bg-[#4A2DB8]"
          />
        </div>
      </ModalFooter>
    </div>
  );
};

export default ColumnModal;
