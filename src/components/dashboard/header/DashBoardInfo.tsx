"use client";

import HeaderButton from "./HeaderButton";
import AvatarStack from "./AvatarStack";
import { Modal, ModalHandle } from "@/components/ui/Modal";
import InviteModal from "@/components/edit/InviteModal";
import { useRef } from "react";

const DashBoardInfo = ({ dashboardId }: { dashboardId: number }) => {
  const modalRef = useRef<ModalHandle>(null);
  return (
    <>
      <div className="flex items-center justify-between gap-8">
        <div className="flex gap-1.5 md:gap-4">
          <HeaderButton
            href={dashboardId ? `/dashboard/${dashboardId}/edit` : ""}
            icon="/column/setting-icon.svg"
          >
            관리
          </HeaderButton>
          <HeaderButton
            onClick={() => modalRef.current?.open()}
            icon="/dashboard/add-icon.svg"
          >
            초대하기
          </HeaderButton>
        </div>
        <div className="hidden md:block">
          <AvatarStack dashboardId={dashboardId} />
        </div>
      </div>
      <Modal ref={modalRef}>
        <InviteModal
          close={() => modalRef.current?.close()}
          dashboardId={dashboardId}
        />
      </Modal>
    </>
  );
};

export default DashBoardInfo;
