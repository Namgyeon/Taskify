import DashboardModalBody from "./DashboardModalBody";
import DashboardModalFooter from "./DashboardModalFooter";
import DashboardModalHeader from "./DashboardModalHeader";

const DashboardModal = ({ close }: { close: () => void }) => {
  return (
    <div className="flex flex-col gap-6">
      <DashboardModalHeader />
      <DashboardModalBody />
      <DashboardModalFooter />
    </div>
  );
};

export default DashboardModal;
