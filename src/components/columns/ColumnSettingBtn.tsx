import Image from "next/image";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHandle,
  ModalHeader,
} from "../ui/Modal";
import { useRef } from "react";
import Input from "../ui/Field/Input";
import BaseLabel from "../ui/Field/BaseLabel";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import { useColumnMutation } from "@/apis/columns/queries";
import { Column } from "@/apis/columns/types";
import toast from "react-hot-toast";

const ColumnSettingBtn = (column: Column) => {
  const updateModalRef = useRef<ModalHandle>(null);
  const deleteModalRef = useRef<ModalHandle>(null);

  const { update } = useColumnMutation(column.dashboardId);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm({
    defaultValues: {
      title: column.title,
    },
    mode: "onChange",
  });

  const handleUpdateSubmit = async (data: { title: string }) => {
    try {
      await update({ columnId: column.id, formData: { title: data.title } });
      toast.success("컬럼 이름이 변경되었습니다.");
    } catch (err) {
      toast.error("컬럼 이름 변경에 실패했습니다.");
    }

    updateModalRef.current?.close();
  };

  return (
    <>
      <button
        onClick={() => updateModalRef.current?.open()}
        className="flex items-center cursor-pointer hover:bg-gray-200 rounded-lg transition-colors"
      >
        <Image
          src="/column/setting-icon.svg"
          alt="설정 아이콘"
          width={22}
          height={22}
        />
      </button>
      <Modal ref={updateModalRef} className="flex flex-col gap-4">
        <ModalHeader>
          <div className="w-full flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold">컬럼 관리</h2>
            <button
              onClick={() => updateModalRef.current?.close()}
              className="cursor-pointer hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Image
                src="/column/close-icon.svg"
                alt="닫기 아이콘"
                width={22}
                height={22}
              />
            </button>
          </div>
        </ModalHeader>
        <ModalBody>
          <form
            onSubmit={handleSubmit(handleUpdateSubmit)}
            className="flex flex-col gap-2 p-1"
          >
            <BaseLabel id="title">이름</BaseLabel>
            <Input
              {...register("title")}
              error={!!errors.title}
              errorMessage={errors.title?.message}
              id="title"
            />
            <div>
              <div className="flex gap-2">
                <Button type="button" variant="secondary" className="w-full">
                  삭제
                </Button>
                <Button
                  variant="primary"
                  className="w-full"
                  disabled={!isValid || !isDirty || isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "변경중..." : "변경"}
                </Button>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ColumnSettingBtn;
