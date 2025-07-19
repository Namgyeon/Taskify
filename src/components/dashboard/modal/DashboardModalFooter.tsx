import Button from "@/components/ui/Button";
import { ModalFooter } from "@/components/ui/Modal";

interface DashboardModalFooterProps {
  isSubmitting: boolean;
  onClose: () => void;
}

const DashboardModalFooter = ({
  isSubmitting,
  onClose,
}: DashboardModalFooterProps) => {
  return (
    <ModalFooter>
      <div className="flex justify-end gap-2">
        <Button
          onClick={onClose}
          className="min-w-[144px] min-h-[54px] text-[#787486] bg-white border-[#D9D9D9] hover:bg-[#D9D9D9]"
        >
          취소
        </Button>

        <Button
          type="submit"
          form="dashboard-form"
          disabled={isSubmitting}
          className="min-w-[144px] min-h-[54px] text-[white] hover:bg-[#4A2DB8]"
        >
          {isSubmitting ? "생성 중..." : "생성"}
        </Button>
      </div>
    </ModalFooter>
  );
};

export default DashboardModalFooter;
