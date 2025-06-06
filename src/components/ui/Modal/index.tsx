import { forwardRef, ReactNode, useImperativeHandle, useState } from "react";
import { createPortal } from "react-dom";

export interface ModalHandle {
  open: () => void;
  close: () => void;
}

interface ModalProps {
  children: ReactNode;
}

export const Modal = forwardRef<ModalHandle, ModalProps>(
  ({ children }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }));

    if (!isOpen) return null;

    return createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-xl p-4 shadow-lg">{children}</div>
      </div>,
      document.body
    );
  }
);

export const ModalHeader = ({ children }: { children: ReactNode }) => {
  return <div className="">{children}</div>;
};

export const ModalBody = ({ children }: { children: ReactNode }) => {
  return <div className="">{children}</div>;
};

export const ModalFooter = ({ children }: { children: ReactNode }) => {
  return <div className="">{children}</div>;
};
