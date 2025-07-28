import Card from "@/components/card/Card";
import { Meta, StoryObj } from "@storybook/react";
import { Card as CardType } from "@/apis/cards/types";

const mockCard: CardType = {
  id: 1,
  dashboardId: 1,
  columnId: 1,
  title: "웹사이트 메인 페이지 디자인",
  description: "새로운 웹사이트의 메인 페이지 디자인을 완성해야 합니다.",
  tags: ["디자인", "UI/UX", "웹사이트"],
  dueDate: "2024-01-15",
  assignee: {
    id: 1,
    nickname: "김디자이너",
    profileImageUrl: null,
  },
  imageUrl: null,
  teamId: "team-1",
  createdAt: "2024-01-01T09:00:00Z",
  updatedAt: "2024-01-10T14:30:00Z",
};

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "320px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    card: mockCard,
    index: 0,
  },
};

export const WithImage: Story = {
  args: {
    card: {
      ...mockCard,
      imageUrl: "https://picsum.photos/400/300",
    },
    index: 0,
  },
};

export const WithoutTags: Story = {
  args: {
    card: {
      ...mockCard,
      tags: [],
    },
    index: 0,
  },
};

export const LongTitle: Story = {
  args: {
    card: {
      ...mockCard,
      title:
        "매우 긴 제목을 가진 카드입니다. 이 제목이 어떻게 표시되는지 확인해보세요.",
    },
    index: 0,
  },
};

export const ManyTags: Story = {
  args: {
    card: {
      ...mockCard,
      tags: ["React", "TypeScript", "Next.js", "Tailwind", "Storybook"],
    },
    index: 0,
  },
};
