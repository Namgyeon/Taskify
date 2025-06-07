import { ModalHeader } from "@/components/ui/Modal";

const DashboardModalHeader = ({ close }: { close: () => void }) => {
  return <ModalHeader close={close}>헤더</ModalHeader>;
};

export default DashboardModalHeader;
