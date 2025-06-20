import Button from "../ui/Button";
import { ModalBody, ModalFooter, ModalHeader } from "../ui/Modal";

interface CardModalProps {
  onClose: () => void;
}
const CardModal = ({ onClose }: CardModalProps) => {
  return (
    <div>
      <ModalHeader>
        <h2 className="text-xl md:text-2xl font-bold text-[#333236]">
          할 일 생성
        </h2>
      </ModalHeader>
      <ModalBody>
        <form></form>
      </ModalBody>
      <ModalFooter>
        {/* <div className="flex justify-end gap-2">
          <Button
            text="취소"
            onClick={onClose}
            className="min-w-[144px] min-h-[54px] text-[#787486] bg-white border-[#D9D9D9] hover:bg-[#D9D9D9]"
          />

          <Button
            type="submit"
            form="dashboard-form"
            disabled={isSubmitting}
            text={isSubmitting ? "생성 중..." : "생성"}
            onClick={handleSubmit(onSubmit)}
            className="min-w-[144px] min-h-[54px] text-[white] hover:bg-[#4A2DB8]"
          />
        </div> */}
        <></>
      </ModalFooter>
    </div>
  );
};

export default CardModal;
