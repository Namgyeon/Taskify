import Image from "next/image";
import { ModalBody, ModalHeader } from "../ui/Modal";
import { useGetCardDetailQuery } from "@/apis/cards/queries";
import { useGetColumnsQuery } from "@/apis/columns/queries";
import Avatar from "../ui/Avatar";
import { Column } from "@/apis/columns/types";
import getRandomColor from "@/utils/getRandomColor";
import CardCommentInput from "./CardCommentInput";
import CardCommentList from "./CardCommentList";

interface CardDetailModalProps {
  onClose: () => void;
  cardId: number;
}

const CardDetailModal = ({ onClose, cardId }: CardDetailModalProps) => {
  const { data: cardData } = useGetCardDetailQuery(cardId);
  const { data: columnData } = useGetColumnsQuery(
    { dashboardId: cardData?.dashboardId || 0 },
    {
      enabled: !!cardData?.dashboardId,
    }
  );

  const cardColumn = columnData?.data?.find(
    (column: Column) => column.id === cardData?.columnId
  );

  console.log("카드데이터:", cardData);
  console.log("칼럼데이터:", columnData);
  console.log("카드칼럼:", cardColumn);

  if (!cardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 h-[90vh]">
      <ModalHeader>
        <div className="w-full flex items-center justify-between gap-2">
          <h2 className="text-xl font-bold text-[#333236]">
            새로운 일정 관리 Taskify
          </h2>
          <div className="flex items-center gap-2">
            <div className="relative w-5 h-5 md:w-7 md:h-7 cursor-pointer hover:bg-gray-200 rounded-lg transition-colors">
              <Image
                src="/ui/kebabMenu-icon.svg"
                alt="카드 메뉴 아이콘"
                fill
                className="object-cover"
              />
            </div>
            <div
              className="relative w-5 h-5 md:w-7 md:h-7 cursor-pointer hover:bg-gray-200 rounded-lg transition-colors"
              onClick={onClose}
            >
              <Image
                src="/column/close-icon.svg"
                alt="모달 닫기 아이콘"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </ModalHeader>
      <ModalBody>
        <div className="flex flex-col gap-4 md:flex-row">
          {/* 담당자 및 마감일 */}
          <div className="flex md:w-1/3 h-fit md:flex-col md:gap-4 md:order-2 items-center md:items-start px-4 py-2 md:p-4 border border-gray-200 rounded-lg">
            <div className="flex-1 md:flex-none flex-col">
              <h3 className="text-xs font-semibold">담당자</h3>
              <div className="flex items-center gap-2">
                <Avatar
                  nickname={cardData!.assignee.nickname}
                  profileImageUrl={cardData?.assignee.profileImageUrl}
                  className="!w-[28px] md:!w-[34px]"
                />
                <span className="text-xs text-[#333236]">
                  {cardData!.assignee.nickname}
                </span>
              </div>
            </div>
            <div className="flex-1 md:flex-none flex flex-col gap-2">
              <h3 className="text-xs font-semibold">마감일</h3>
              <div className="text-xs text-[#333236]">{cardData!.dueDate}</div>
            </div>
          </div>
          {/* 컬럼 제목 및 태그 */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-[#F1EFFD] rounded-2xl px-2 py-1">
                <div className="w-2 h-2 bg-[#5534DA] rounded-full"></div>
                <div className="text-xs text-[#5534DA]">
                  {cardColumn?.title}
                </div>
              </div>
              <div className="w-px h-5 bg-gray-300"></div>
              <div>
                {cardData?.tags.map((tag: string, index: number) => {
                  const tagColor = getRandomColor(tag);
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-1.5 py-1 text-xs rounded-sm"
                      style={{
                        color: tagColor,
                        backgroundColor: `color-mix(in srgb, ${tagColor} 15%, white 85%)`,
                      }}
                    >
                      {tag}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* 카드 설명 */}
            <div>
              <p className="text-xs md:text-sm">{cardData?.description}</p>
            </div>
            {/* 카드 이미지 */}
            {cardData.imageUrl && (
              <div className="relative w-full aspect-video rounded-lg">
                <Image
                  src={cardData.imageUrl}
                  alt={`${cardData.title} 이미지`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {/* 댓글 입력창 */}
            <CardCommentInput
              cardId={cardData.id}
              columnId={cardData.columnId}
              dashboardId={cardData.dashboardId}
            />
            {/* 댓글 리스트 */}
            <CardCommentList cardId={cardData.id} />
          </div>
        </div>
      </ModalBody>
    </div>
  );
};

export default CardDetailModal;
