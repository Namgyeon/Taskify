import Avatar from "@/components/ui/Avatar";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },

  argTypes: {
    profileImageUrl: {
      control: { type: "text" },
      description: "프로필 이미지 URL",
    },
    email: {
      control: { type: "text" },
      description: "이메일",
    },
    nickname: {
      control: { type: "text" },
      description: "닉네임",
    },
    className: {
      control: { type: "text" },
    },
  },

  args: {
    email: "test@example.com",
    nickname: "John Doe",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 아바타
export const Default: Story = {
  args: {
    email: "test@example.com",
    nickname: "춘향",
  },
};

// 이미지가 있는 아바타
export const WithImage: Story = {
  args: {
    profileImageUrl:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQK1dXQrVCbBvMdU4A83XdwM7Rtte8YFsWFI-y5JLABKyTRyUTBQko0SqyrqNJQf96aNdEqLNo5eZglqCIH2udWwuewokYR5-0QnjucNq4Y5Q",
    nickname: "홍길동",
    email: "hong@example.com",
  },
};

// 이미지 로딩 실패 케이스
export const ImageLoadError: Story = {
  args: {
    profileImageUrl: "invalid-url",
    email: "hong@example.com",
    nickname: "홍길동",
  },
};
