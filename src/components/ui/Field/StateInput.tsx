import { useState } from "react";
import Dropdown from "../Dropdown";
import BaseLabel from "./BaseLabel";
import Input from "./Input";
import { Column } from "@/apis/columns/types";

interface StateInputProps {
  error?: boolean;
  errorMessage?: string;
  columnData?: Column[];
}

// 컬럼 타이틀 값들 가져와서 dropdown 옵션으로 넘겨주고 클릭하면 그 값이 되도록 만든다.

export const StateInput = ({
  error,
  errorMessage,
  columnData,
}: StateInputProps) => {
  const titleOptions =
    columnData?.map((column) => ({
      label: (
        <div className="flex items-center gap-2 px-2.5 py-1 bg-[#F1EFFD] rounded-2xl">
          <div className="w-2 h-2 rounded-full bg-[#5534DA]" />
          <p className="text-[#333236]">{column.title}</p>
        </div>
      ),
      value: column.title,
    })) || [];

  console.log("state에서 받은 컬럼 데이터", columnData);
  console.log("타이틀옵션들", titleOptions);
  return (
    <div className="flex flex-col justify-between">
      <BaseLabel id="state">상태</BaseLabel>
      <div className="relative">
        <Input id="state" error={error} errorMessage={errorMessage} />
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <Dropdown options={titleOptions} icon="/column/toggle-icon.svg" />
        </div>
      </div>
    </div>
  );
};
export default StateInput;
