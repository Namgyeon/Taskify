import Card from "@/components/card/Card";
import { Meta, StoryObj } from "@storybook/react";
import { Card as CardType } from "@/apis/cards/types";

// Mock 카드 데이터
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

const mockCardWithImage: CardType = {
  ...mockCard,
  id: 2,
  title: "모바일 앱 프로토타입 제작",
  description: "iOS와 Android 앱의 프로토타입을 제작합니다.",
  tags: ["모바일", "프로토타입", "개발"],
  imageUrl: "https://picsum.photos/400/300",
  assignee: {
    id: 2,
    nickname: "박개발자",
    profileImageUrl: "https://picsum.photos/40/40",
  },
};

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    card: {
      control: {
        type: "object",
      },
      description: "카드 데이터 객체",
    },
    index: {
      control: {
        type: "number",
      },
      description: "카드의 인덱스 (이미지 로딩 우선순위에 사용)",
    },
    onClick: {
      action: "clicked",
      description: "카드 클릭 시 실행되는 함수",
    },
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

// 기본 카드 스토리
export const Default: Story = {
  args: {
    card: mockCard,
    index: 0,
  },
};

// 이미지가 있는 카드 스토리
export const WithImage: Story = {
  args: {
    card: mockCardWithImage,
    index: 0,
  },
};

// 태그가 없는 카드 스토리
export const WithoutTags: Story = {
  args: {
    card: {
      ...mockCard,
      tags: [],
    },
    index: 0,
  },
};

// 긴 제목의 카드 스토리
export const LongTitle: Story = {
  args: {
    card: {
      ...mockCard,
      title:
        "매우 긴 제목을 가진 카드입니다. 이 제목이 어떻게 표시되는지 확인해보세요.",
      tags: ["긴제목", "테스트", "UI테스트"],
    },
    index: 0,
  },
};

// 많은 태그를 가진 카드 스토리
export const ManyTags: Story = {
  args: {
    card: {
      ...mockCard,
      tags: [
        "React",
        "TypeScript",
        "Next.js",
        "Tailwind",
        "Storybook",
        "테스트",
        "개발",
      ],
    },
    index: 0,
  },
};
