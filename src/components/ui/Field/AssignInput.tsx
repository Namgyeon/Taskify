import { InputHTMLAttributes } from "react";
import BaseLabel from "./BaseLabel";
import Input from "./Input";
import { Member } from "@/apis/members/types";
import Avatar from "../Avatar";
import Dropdown from "../Dropdown";

interface AssignInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  label: string;
  members?: Member[];
  value?: Member | null;
  onChange?: (member: Member | null) => void;
  error?: boolean;
  errorMessage?: string;
}

const AssignInput = ({
  label,
  members,
  value,
  onChange,
  error,
  errorMessage,
  id,
}: AssignInputProps) => {
  const memberOptions =
    members?.map((member) => ({
      label: (
        <div className="flex items-center gap-2">
          <Avatar
            email={member.email}
            nickname={member.nickname}
            profileImageUrl={member.profileImageUrl}
            className="!w-[30px] !h-[30px]"
          />
          <span>{member.nickname}</span>
        </div>
      ),
      value: member.nickname,
      onClick: () => onChange?.(member),
    })) || [];

  return (
    <div className="flex flex-col gap-2.5">
      <BaseLabel id={id}>{label}</BaseLabel>
      <div className="relative md:w-[220px]">
        <Input
          id={id}
          placeholder="담당자를 지정해주세요"
          readOnly
          value={value?.nickname || ""}
          error={error}
          errorMessage={errorMessage}
          className="cursor-pointer"
          displayElement={
            <div className="flex items-center gap-2">
              <Avatar
                email={value?.email}
                nickname={value?.nickname}
                profileImageUrl={value?.profileImageUrl}
                className="!w-[32px] !h-[32px]"
              />
              <span>{value?.nickname}</span>
            </div>
          }
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-[100]">
          <Dropdown options={memberOptions} icon="/column/toggle-icon.svg" />
        </div>
      </div>
    </div>
  );
};

export default AssignInput;
