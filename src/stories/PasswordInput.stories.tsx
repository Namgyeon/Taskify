import PasswordInput from "@/components/ui/Field/PasswordInput";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof PasswordInput> = {
  title: "UI/PasswordInput",
  component: PasswordInput,
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
    label: {
      control: { type: "text" },
      description: "라벨 텍스트",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "비밀번호",
  },
};

export const Error: Story = {
  args: {
    label: "비밀번호",
    error: true,
    errorMessage: "에러 메시지",
  },
};
