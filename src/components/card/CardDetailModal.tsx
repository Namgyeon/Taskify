import Image from "next/image";
import { ModalBody, ModalHeader } from "../ui/Modal";

interface CardDetailModalProps {
  onClose: () => void;
}

const CardDetailModal = ({ onClose }: CardDetailModalProps) => {
  return (
    <div>
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
      <ModalBody>sd</ModalBody>
    </div>
  );
};

export default CardDetailModal;
