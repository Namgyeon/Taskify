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
import { useForm } from "react-hook-form";

const meta: Meta<typeof Modal> = {
  title: "UI/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },

  argTypes: {
    children: {
      control: false,
      description: "모달 내부에 들어갈 컴포넌트",
    },
    className: {
      control: { type: "text" },
      description: "추가 CSS 클래스",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const modalRef = useRef<ModalHandle>(null);

    return (
      <>
        <Button onClick={() => modalRef.current?.open()}>모달 열기</Button>
        <Modal ref={modalRef} {...args}>
          <div className="flex flex-col justify-center items-center gap-4">
            <h2>기본 모달</h2>
            <p>기본 모달 내용.</p>
            <Button
              variant="secondary"
              onClick={() => modalRef.current?.close()}
            >
              닫기
            </Button>
          </div>
        </Modal>
      </>
    );
  },
};

export const FormModal: Story = {
  render: (args) => {
    const { register, handleSubmit } = useForm();
    const modalRef = useRef<ModalHandle>(null);

    const FormSubmit = (data: any) => {
      console.log(data);
      alert("폼이 제출되었습니다.");
      modalRef.current?.close();
    };

    return (
      <>
        <Button onClick={() => modalRef.current?.open()}>폼 모달 열기</Button>
        <Modal ref={modalRef}>
          <div>
            <ModalHeader>
              <h2 className="text-lg font-semibold mb-4">사용자 정보</h2>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(FormSubmit)} className="space-y-4">
                <div>
                  <BaseLabel id="name">이름</BaseLabel>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="이름을 입력하세요."
                  />
                </div>
                <div>
                  <BaseLabel id="email">이메일</BaseLabel>
                  <Input
                    id="email"
                    {...register("email")}
                    placeholder="이메일을 입력하세요."
                  />
                </div>
                <div className="flex gap-3 justify-end pt-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => modalRef.current?.close()}
                  >
                    취소
                  </Button>
                  <Button type="submit">저장</Button>
                </div>
              </form>
            </ModalBody>
          </div>
        </Modal>
      </>
    );
  },
};
