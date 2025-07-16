"use client";

import { useRef } from "react";
import { Modal, ModalBody, ModalHandle } from "../ui/Modal";
import Button from "../ui/Button";
import { useDeleteDashboard } from "@/apis/dashboards/queries";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/network/errorMessage";
import { useRouter } from "next/navigation";

const DashboardDeleteButton = ({ dashboardId }: { dashboardId: number }) => {
  const modalRef = useRef<ModalHandle>(null);
  const router = useRouter();

  const { mutateAsync: deleteDashboard } = useDeleteDashboard(dashboardId);

  const handleDeleteDashboard = async () => {
    try {
      await deleteDashboard();
      toast.success("대시보드가 삭제되었습니다.");
      modalRef.current?.close();
      router.push("/");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  };
  return (
    <>
      <button
        onClick={() => modalRef.current?.open()}
        className="max-w-[320px] px-21 py-4 border border-[#D9D9D9] bg-[#FAFAFA] rounded-md cursor-pointer hover:text-white hover:bg-red-400 hover:shadow-lg hover:shadow-red-600/30 transition-all duration-200 ease-in-out"
      >
        대시보드 삭제
      </button>
      <Modal ref={modalRef}>
        <ModalBody className="flex flex-col gap-4">
          <p className="text-lg font-medium text-center">
            대시보드를 삭제하시겠습니까?
          </p>
          <div className="flex gap-2">
            <Button
              onClick={() => modalRef.current?.close()}
              variant="secondary"
              className="flex-1"
            >
              취소
            </Button>
            <Button
              onClick={handleDeleteDashboard}
              variant="primary"
              className="flex-1"
            >
              삭제
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default DashboardDeleteButton;
