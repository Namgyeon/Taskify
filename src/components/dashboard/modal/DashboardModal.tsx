import { useRef } from "react";
import DashboardModalBody from "./DashboardModalBody";
import DashboardModalFooter from "./DashboardModalFooter";
import DashboardModalHeader from "./DashboardModalHeader";
import { Modal, ModalHandle } from "@/components/ui/Modal";

const DashboardModal = ({ close }: { close: () => void }) => {
  return (
    <div>
      <DashboardModalHeader close={close} />
      <DashboardModalBody />
      <DashboardModalFooter />
    </div>
  );
};

export default DashboardModal;
