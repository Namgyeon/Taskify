import Image from "next/image";
import { useRef } from "react";
import { Modal, ModalHandle } from "../ui/Modal";

const CreateDashboard = () => {
  const modalRef = useRef<ModalHandle>(null);
  return (
    <>
      <div
        className="w-83 h-15 flex gap-3 items-center justify-center border rounded-lg border-gray-300 bg-white cursor-pointer hover:bg-gray-300"
        onClick={() => modalRef.current?.open()}
      >
        <span>새로운 대시보드</span>
        <button>
          <Image
            src={"/dashboard/add-icon2.svg"}
            alt="더하기버튼"
            width={20}
            height={20}
          />
        </button>
      </div>
      <Modal ref={modalRef}>
        <h2 onClick={() => modalRef.current?.close()}>모달 내용</h2>
      </Modal>
    </>
  );
};

export default CreateDashboard;
