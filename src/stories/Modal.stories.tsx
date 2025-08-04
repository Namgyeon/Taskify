import Button from "@/components/ui/Button";
import BaseLabel from "@/components/ui/Field/BaseLabel";
import Input from "@/components/ui/Field/Input";
import {
  Modal,
  ModalHandle,
  ModalHeader,
  ModalBody,
} from "@/components/ui/Modal";
import type { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";

// 래퍼 컴포넌트 생성
const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
  const modalRef = useRef<ModalHandle>(null);

  return (
    <>
      <Button onClick={() => modalRef.current?.open()}>모달 열기</Button>
      <Modal ref={modalRef}>{children}</Modal>
    </>
  );
};

const FormModalWrapper = () => {
  const modalRef = useRef<ModalHandle>(null);

  return (
    <>
      <Button onClick={() => modalRef.current?.open()}>폼 모달 열기</Button>
      <Modal ref={modalRef}>
        <div>
          <ModalHeader>
            <h2 className="text-lg font-semibold mb-4">사용자 정보</h2>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div>
                <BaseLabel id="name">이름</BaseLabel>
                <Input id="name" placeholder="이름을 입력하세요." />
              </div>
              <div>
                <BaseLabel id="email">이메일</BaseLabel>
                <Input id="email" placeholder="이메일을 입력하세요." />
              </div>
              <div className="flex gap-3 justify-end pt-4">
                <Button
                  variant="secondary"
                  onClick={() => modalRef.current?.close()}
                >
                  취소
                </Button>
                <Button>저장</Button>
              </div>
            </div>
          </ModalBody>
        </div>
      </Modal>
    </>
  );
};

const meta: Meta<typeof Modal> = {
  title: "UI/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ModalWrapper>
      <div className="flex flex-col justify-center items-center gap-4">
        <h2>기본 모달</h2>
        <p>기본 모달 내용.</p>
      </div>
    </ModalWrapper>
  ),
};

export const FormModal: Story = {
  render: () => <FormModalWrapper />,
};
