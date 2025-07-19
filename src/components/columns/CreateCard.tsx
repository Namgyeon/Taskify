"use client";

import Image from "next/image";
import { useRef } from "react";
import { Modal, ModalHandle } from "../ui/Modal";
import CardModal from "./CardModal";

const CreateCard = ({ columnId }: { columnId: number }) => {
  const modalRef = useRef<ModalHandle>(null);
  return (
    <>
      <div
        className="flex items-center justify-center py-1.5 md:py-2 border border-gray-300 rounded-lg bg-white cursor-pointer hover:bg-gray-300 transition-colors ease-in-out"
        onClick={() => modalRef.current?.open()}
      >
        <button>
          <Image
            src="/dashboard/add-icon2.svg"
            alt="카드 추가하기 아이콘"
            width={20}
            height={20}
          />
        </button>
      </div>
      <Modal ref={modalRef} className="min-w-[320px] md:min-w-[580px]">
        <CardModal
          onClose={() => modalRef.current?.close()}
          columnId={columnId}
        />
      </Modal>
    </>
  );
};

export default CreateCard;
