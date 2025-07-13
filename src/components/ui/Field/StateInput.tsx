import Dropdown from "../Dropdown";
import BaseLabel from "./BaseLabel";
import Input from "./Input";
import { Column } from "@/apis/columns/types";

interface StateInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  errorMessage?: string;
  columnData?: Column[];
}

// 컬럼 타이틀 값들 가져와서 dropdown 옵션으로 넘겨주고 클릭하면 그 값이 되도록 만든다.

export const StateInput = ({
  id,
  label,
  error,
  value,
  onChange,
  errorMessage,
  columnData,
}: StateInputProps) => {
  const titleOptions =
    columnData?.map((column) => ({
      label: (
        <span className="inline-flex w-fit items-center gap-2 px-2.5 py-1 bg-[#F1EFFD] rounded-2xl">
          <div className="w-2 h-2 rounded-full bg-[#5534DA]" />
          <p className="text-[#333236]">{column.title}</p>
        </span>
      ),
      value: column.title,
    })) || [];

  return (
    <div className="flex flex-col justify-between">
      <BaseLabel id={id}>{label}</BaseLabel>
      <div className="relative">
        <Input
          id={id}
          value={value}
          readOnly
          error={error}
          errorMessage={errorMessage}
          displayElement={
            <div className="flex items-center gap-2 px-2.5 py-1 bg-[#F1EFFD] rounded-2xl">
              <div className="w-2 h-2 rounded-full bg-[#5534DA]" />
              <p className="text-[#333236]">{value}</p>
            </div>
          }
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <Dropdown
            options={titleOptions}
            icon="/column/toggle-icon.svg"
            value={value}
            onChange={onChange}
            selectedInput={true}
          />
        </div>
      </div>
    </div>
  );
};
export default StateInput;
