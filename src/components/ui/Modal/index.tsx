"use client";

import clsx from "clsx";
import { forwardRef, ReactNode, useImperativeHandle, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            {/* 배경 오버레이 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/50"
            />

            {/* 모달 콘텐츠 (배경과 별도) */}
            <motion.div
              className={clsx(
                "relative min-w-[320px] md:min-w-[568px] bg-white rounded-xl p-5 md:p-8 shadow-lg",
                className
              )}
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              onClick={(e) => e.stopPropagation()} // 모달 클릭 시 닫히지 않게
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
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

export const ModalBody = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx("h-full overflow-y-auto", className)}>{children}</div>
  );
};

export const ModalFooter = ({ children }: { children: ReactNode }) => {
  return <div className="">{children}</div>;
};
