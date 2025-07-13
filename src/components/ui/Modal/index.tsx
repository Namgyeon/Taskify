"use client";

import clsx from "clsx";
import { forwardRef, ReactNode, useImperativeHandle, useState } from "react";
import { createPortal } from "react-dom";

export interface ModalHandle {
  open: () => void;
  close: () => void;
}

interface ModalProps {
  children: ReactNode;
  className?: string;
}

export const Modal = forwardRef<ModalHandle, ModalProps>(
  ({ children, className }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }));

    if (!isOpen) return null;

    return createPortal(
      <div
        role="dialog"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <div
          className={clsx(
            "min-w-[320px] md:min-w-[568px] bg-white rounded-xl p-5 md:p-8 shadow-lg",
            className
          )}
        >
          {children}
        </div>
      </div>,
      document.body
    );
  }
);
Modal.displayName = "Modal";

export const ModalHeader = ({
  children,
  close,
}: {
  children: ReactNode;
  close?: () => void;
}) => {
  return (
    <div className="flex items-center justify-between" onClick={close}>
      {children}
    </div>
  );
};

export const ModalBody = ({ children }: { children: ReactNode }) => {
  return <div className="h-full overflow-y-auto">{children}</div>;
};

export const ModalFooter = ({ children }: { children: ReactNode }) => {
  return <div className="">{children}</div>;
};
