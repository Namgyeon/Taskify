"use client";
import {
  useDeleteDashboardMemberInvitation,
  useGetDashboardMemberInvitationsQuery,
} from "@/apis/dashboards/queries";
import Pagination from "../pagination/Pagination";
import InviteModal from "./InviteModal";
import { useRef, useState } from "react";
import { Modal, ModalHandle } from "../ui/Modal";
import Button from "../ui/Button";
import Image from "next/image";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/network/errorMessage";
import Skeleton from "react-loading-skeleton";

const InviteManagement = ({ dashboardId }: { dashboardId: number }) => {
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const modalRef = useRef<ModalHandle>(null);

  const { data, isLoading } = useGetDashboardMemberInvitationsQuery({
    dashboardId,
    page,
    size: pageSize,
  });

  const { mutateAsync: deleteInvitation } =
    useDeleteDashboardMemberInvitation(dashboardId);

  const handleDeleteInvitation = async (invitationId: number) => {
    try {
      await deleteInvitation(invitationId);
      toast.success("초대가 취소되었습니다.");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-[540px] lg:max-w-[620px] flex flex-col gap-6 px-4 md:px-7 py-5 md:py-8 rounded-lg bg-white">
        <div className="flex items-center justify-between">
          <Skeleton width={80} height={20} />
          <Skeleton width={120} height={20} />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton width={100} height={20} />
          <Skeleton width={40} height={32} />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton width={100} height={20} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-[540px] lg:max-w-[620px] flex flex-col gap-6 px-4 md:px-7 py-5 md:py-8 rounded-lg bg-white">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold">초대 내역</h2>
          {data && (
            <div className="flex items-center gap-2">
              <p className="text-xs">{`${page}/${Math.ceil(
                data.totalCount / pageSize
              )}`}</p>
              <Pagination
                page={page}
                totalPage={Math.ceil(data.totalCount / pageSize)}
                setPage={setPage}
              />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[#9FA6B2]">이메일</p>
          <button
            onClick={() => modalRef.current?.open()}
            className="flex items-center gap-2 bg-[#5534DA] px-4 py-2 rounded-md cursor-pointer 
          border-2 border-transparent transition-all duration-200 ease-in-out
          hover:shadow-xl hover:bg-[#4A2DB8]"
          >
            <Image
              src={"/dashboard/add-icon2.svg"}
              alt="더하기 아이콘"
              width={16}
              height={16}
            />
            <p className="text-white">초대하기</p>
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {data &&
            data.invitations.map((invitation) => (
              <div
                key={invitation.id}
                className="flex items-center justify-between"
              >
                <p className="md: text-lg font-medium">
                  {invitation.invitee.email}
                </p>
                <Button
                  onClick={() => handleDeleteInvitation(invitation.id)}
                  size="sm"
                  variant="secondary"
                >
                  취소
                </Button>
              </div>
            ))}
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

export default InviteManagement;
