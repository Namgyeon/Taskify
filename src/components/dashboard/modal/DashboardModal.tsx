import { PostDashboardsFormData } from "@/apis/dashboards/types";
import { useCreateDashboard } from "@/apis/dashboards/queries";
import DashboardModalBody from "./DashboardModalBody";
import DashboardModalFooter from "./DashboardModalFooter";
import DashboardModalHeader from "./DashboardModalHeader";
import toast from "react-hot-toast";

interface DashboardModalProps {
  close: () => void;
}

const DashboardModal = ({ close }: DashboardModalProps) => {
  const createDashboard = useCreateDashboard();

  const handleSubmit = async (data: PostDashboardsFormData) => {
    try {
      await createDashboard.mutateAsync(data);
      toast.success("대시보드가 생성되었습니다");
      close();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "대시보드 생성 중 알 수 없는 오류가 발생했습니다.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <DashboardModalHeader />
      <DashboardModalBody onSubmit={handleSubmit} />
      <DashboardModalFooter
        isSubmitting={createDashboard.isPending}
        onClose={close}
      />
    </div>
  );
};

export default DashboardModal;
