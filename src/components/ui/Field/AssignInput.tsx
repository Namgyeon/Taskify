import { useEffect, useRef, useState } from "react";
import BaseLabel from "./BaseLabel";
import Input from "./Input";
import Image from "next/image";
import { Member } from "@/apis/members/types";

interface AssignInputProps {
  label: string;
  members?: Member[];
}

const AssignInput = ({ label, members }: AssignInputProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  console.log("멤버", members);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative flex flex-col gap-2.5" ref={wrapperRef}>
      <BaseLabel>{label}</BaseLabel>
      <div onClick={() => setOpen(true)}>
        <Input placeholder="담당자를 지정해주세요" toggle={true} readOnly />
      </div>
      {open && (
        <div className="absolute top-9 z-10 p-3 w-full flex flex-col gap-3 border rounded-lg border-gray-500 bg-white">
          <div className="flex justify-between">
            <p className="text-lg font-semibold">명단</p>
            <button
              className="cursor-pointer hover:bg-gray-200 transition-colors duration-200 rounded-lg"
              onClick={() => setOpen(false)}
            >
              <Image
                src="/column/close-icon.svg"
                alt="닫기"
                width={25}
                height={25}
              />
            </button>
          </div>
          <div>토글창 내용</div>
        </div>
      )}
    </div>
  );
};

export default AssignInput;
