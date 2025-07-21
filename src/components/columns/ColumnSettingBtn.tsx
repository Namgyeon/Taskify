import Image from "next/image";
import { Modal, ModalBody, ModalHandle, ModalHeader } from "../ui/Modal";
import { useRef } from "react";
import Input from "../ui/Field/Input";
import BaseLabel from "../ui/Field/BaseLabel";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import { useColumnMutation } from "@/apis/columns/queries";
import { Column } from "@/apis/columns/types";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/network/errorMessage";

const ColumnSettingBtn = (column: Column) => {
  const updateModalRef = useRef<ModalHandle>(null);
  const deleteModalRef = useRef<ModalHandle>(null);

  const { update, deleteColumn } = useColumnMutation(column.dashboardId);

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
      const errorMessage = getErrorMessage(err);
      toast.error(errorMessage);
    }

    updateModalRef.current?.close();
  };

  const handleDeleteSubmit = async () => {
    try {
      await deleteColumn(column.id);
      toast.success("컬럼이 삭제되었습니다.");
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      toast.error(errorMessage);
    }
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
      {/* 수정 모달 */}
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
            className="flex flex-col gap-4 p-1"
          >
            <div className="flex flex-col gap-2">
              <BaseLabel id="title">이름</BaseLabel>
              <Input
                {...register("title")}
                error={!!errors.title}
                errorMessage={errors.title?.message}
                id="title"
              />
            </div>
            <div>
              <div className="flex gap-2">
                <Button
                  onClick={() => deleteModalRef.current?.open()}
                  type="button"
                  variant="secondary"
                  className="w-full"
                >
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
      {/* 삭제 모달 */}
      <Modal ref={deleteModalRef}>
        <ModalBody>
          <form className="flex flex-col gap-8">
            <p className="md:text-xl font-medium text-center">
              컬럼의 모든 카드가 삭제됩니다.
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={() => deleteModalRef.current?.close()}
                variant="secondary"
                className="w-full"
              >
                취소
              </Button>
              <Button
                type="button"
                onClick={handleDeleteSubmit}
                variant="primary"
                className="w-full"
              >
                삭제
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ColumnSettingBtn;
