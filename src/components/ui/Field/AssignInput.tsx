import { useEffect, useRef, useState } from "react";
import BaseLabel from "./BaseLabel";
import Input from "./Input";
import Image from "next/image";
import { Member } from "@/apis/members/types";
import Avatar from "../Avatar";

interface AssignInputProps {
  label: string;
  members?: Member[];
  value?: Member | null;
  onChange?: (member: Member | null) => void;
  error?: string;
}

const AssignInput = ({
  label,
  members,
  value,
  onChange,
  error,
}: AssignInputProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  const handleMemberSelect = (member: Member) => {
    onChange?.(member);
    setOpen(false);
  };

  const handleClear = () => {
    onChange?.(null);
  };

  return (
    <div className="relative flex flex-col gap-2.5" ref={wrapperRef}>
      <BaseLabel>{label}</BaseLabel>
      <div onClick={() => setOpen(true)} className="relative">
        <Input
          placeholder="담당자를 지정해주세요"
          toggle={true}
          readOnly
          value={value?.nickname || ""}
          error={!!error}
          errorMessage={error}
        />
        {value && (
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            <Avatar
              email={value.email}
              nickname={value.nickname}
              profileImageUrl={value.profileImageUrl}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="cursor-pointer hover:bg-gray-200 transition-colors duration-200 rounded-full p-1"
            >
              <Image
                src="/column/close-icon.svg"
                alt="선택 해제"
                width={16}
                height={16}
              />
            </button>
          </div>
        )}
      </div>
      {/* 멤버 목록 */}
      {open && (
        <div className="absolute top-9 z-10 p-3 w-full flex flex-col gap-3 border rounded-lg border-gray-500 bg-white">
          <div className="flex justify-between">
            <p className="text-lg font-semibold">멤버 목록</p>
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
          <div>
            {members?.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
                onClick={() => handleMemberSelect(member)}
              >
                <div>
                  <Avatar
                    email={member.email}
                    nickname={member.nickname}
                    profileImageUrl={member.profileImageUrl}
                  />
                </div>
                <p>{member.nickname}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignInput;
