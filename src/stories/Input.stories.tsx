import Input from "@/components/ui/Field/Input";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    error: {
      control: { type: "boolean" },
      description: "에러 상태를 나타내는 플래그",
    },
    errorMessage: {
      control: { type: "text" },
      description: "에러 메시지 텍스트",
    },
    imageRightUrl: {
      control: { type: "text" },
      description: "오른쪽 이미지 URL",
    },
    imageLeftUrl: {
      control: { type: "text" },
      description: "왼쪽 이미지 URL",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "입력하세요",
  },
};

export const Error: Story = {
  args: {
    error: true,
    errorMessage: "에러 메시지",
  },
};

export const ImageRight: Story = {
  args: {
    imageRightUrl: "/auth/visibility-icon.svg",
  },
};

export const ImageLeft: Story = {
  args: {
    imageLeftUrl: "/auth/visibility-icon.svg",
  },
};
