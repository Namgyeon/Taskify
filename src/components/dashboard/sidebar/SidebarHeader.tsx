"use client";

import Image from "next/image";
import { useRef } from "react";
import { Modal, ModalHandle } from "../../ui/Modal";
import DashboardModal from "../modal/DashboardModal";

const SidebarHeader = () => {
  const modalRef = useRef<ModalHandle>(null);

  return (
    <>
      <div className="w-full flex items-center justify-center md:justify-between">
        <div className="hidden md:block text-sm lg:text-lg text-[#787486] font-semibold">
          Dash Boards
        </div>
        <button
          onClick={() => modalRef.current?.open()}
          className="cursor-pointer hover:bg-gray-300 rounded-full p-2 transition-colors duration-300 ease-in-out"
        >
          <Image
            src={"/dashboard/add-icon.svg"}
            alt="더하기버튼"
            width={20}
            height={20}
          />
        </button>
      </div>
      <Modal ref={modalRef} className="min-w-[320px] md:min-w-[580px]">
        <DashboardModal close={() => modalRef.current?.close()} />
      </Modal>
    </>
  );
};

export default SidebarHeader;
