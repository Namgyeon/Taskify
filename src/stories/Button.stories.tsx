import Button from "@/components/ui/Button";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "UI/Button", // 스토리북 사이드바에서 보이는 경로
  component: Button,
  parameters: {
    layout: "centered", // 컴포넌트를 중앙에 배치
  },
  // controls 설정
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary"],
      description: "버튼의 스타일 종류",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "버튼의 크기",
    },
    disabled: {
      control: { type: "boolean" },
      description: "버튼 비활성화 여부",
    },
    children: {
      control: { type: "text" },
      description: "버튼 텍스트",
    },
    onClick: {
      actions: "clicked",
      description: "클릭 이벤트",
    },
  },
  // 기본 값 설정
  args: {
    children: "버튼",
    variant: "primary",
    size: "md",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "기본 버튼",
    size: "lg"
  },
};

// 🎯 Primary 버튼
export const Primary: Story = {
  args: {
    children: "Primary 버튼",
    variant: "primary",
  },
};
