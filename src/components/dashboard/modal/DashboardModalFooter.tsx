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
        <Button onClick={onClose} variant="secondary" className="flex-1">
          취소
        </Button>

        <Button
          type="submit"
          form="dashboard-form"
          disabled={isSubmitting}
          variant="primary"
          className="flex-1"
        >
          {isSubmitting ? "생성 중..." : "생성"}
        </Button>
      </div>
    </ModalFooter>
  );
};

export default DashboardModalFooter;
