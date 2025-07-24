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
import { getErrorMessage } from "@/utils/network/errorMessage";
import BaseLabel from "../ui/Field/BaseLabel";

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
      const errorMessage = getErrorMessage(error);
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
          <BaseLabel id="column-title">이름</BaseLabel>
          <Input
            {...register("title")}
            id="column-title"
            placeholder="새 컬럼 이름"
            error={!!errors.title}
            errorMessage={errors.title?.message}
            className="p-1"
          />
        </form>
      </ModalBody>
      <ModalFooter>
        <div className="flex justify-end gap-2">
          <Button onClick={onClose} variant="secondary" className="flex-1">
            취소
          </Button>

          <Button
            type="submit"
            form="dashboard-form"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            variant="primary"
            className="flex-1"
          >
            {isSubmitting ? "생성 중..." : "생성"}
          </Button>
        </div>
      </ModalFooter>
    </div>
  );
};

export default ColumnModal;
