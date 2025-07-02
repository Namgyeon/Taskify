import { Card as CardType } from "@/apis/cards/types";
import Image from "next/image";
import Avatar from "../ui/Avatar";

interface CardProps {
  card: CardType;
  onClick?: () => void;
}

const Card = ({ card, onClick }: CardProps) => {
  return (
    <div
      key={card.id}
      className="flex flex-col gap-2 border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
    >
      {/* 카드 이미지 있으면 출력 */}
      <div className="md:flex lg:flex-col md:gap-4">
        {card.imageUrl && (
          <div className="relative w-full h-40 md:w-25 md:h-14 lg:w-full lg:h-40">
            <Image
              src={card.imageUrl}
              alt="카드 이미지"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
        <div className="md:w-full">
          <h3 className="font-semibold text-lg md:w-full lg:mb-2">
            {card.title}
          </h3>

          {/* 태그들 */}
          <div className="md:flex lg:flex-col md:gap-4 lg:gap-2 md:items-center lg:items-start">
            {card.tags && card.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {card.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="relative w-3.5 h-3.5">
                  <Image
                    src={"/column/calendar-icon.svg"}
                    alt="캘린더 아이콘"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm text-gray-500">{card.dueDate}</span>
              </div>

              <Avatar nickname={card.assignee.nickname} className="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
