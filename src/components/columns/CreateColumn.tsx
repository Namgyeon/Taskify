"use client";

import Image from "next/image";
import { useRef } from "react";
import { Modal, ModalHandle } from "../ui/Modal";
import ColumnModal from "./ColumnModal";

const CreateColumn = () => {
  const modalRef = useRef<ModalHandle>(null);
  return (
    <>
      <div
        className="lg:min-w-88 lg:h-15 flex items-center justify-center gap-3 py-5 border border-gray-300 rounded-lg bg-white cursor-pointer hover:bg-gray-300
    transition-colors duration-200"
        onClick={() => modalRef.current?.open()}
      >
        <p className="font-bold text-[#333236]">새로운 컬럼 추가하기</p>
        <button>
          <Image
            src="/dashboard/add-icon2.svg"
            alt="컬럼 추가하기 아이콘"
            width={20}
            height={20}
          />
        </button>
      </div>
      <Modal ref={modalRef} className="min-w-[320px] md:min-w-[580px]">
        <ColumnModal onClose={() => modalRef.current?.close()} />
      </Modal>
    </>
  );
};

export default CreateColumn;
