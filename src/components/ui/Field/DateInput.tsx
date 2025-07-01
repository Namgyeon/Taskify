import Image from "next/image";
import DatePicker from "react-datepicker";
import BaseLabel from "./BaseLabel";
import "react-datepicker/dist/react-datepicker.css";

interface DateInputProps {
  value: Date;
  onChange: (date: Date | null) => void;
  error?: boolean;
  errorMessage?: string;
  id?: string;
}

const DateInput = ({
  value,
  onChange,
  error,
  errorMessage,
  id,
}: DateInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <BaseLabel id={id}>마감일</BaseLabel>
      <div className="relative w-full">
        <Image
          className="absolute left-4 top-1/2 -translate-y-1/2"
          src="/column/calendar-icon.svg"
          alt="calendar-icon"
          width={22}
          height={22}
        />
        <DatePicker
          id={id}
          wrapperClassName="w-full"
          className="w-full px-10 py-3.5 border rounded-md outline-none focus:ring-2 border-[var(--gray-D9D9D9)] focus:ring-[var(--violet-5534DA)]"
          selected={value}
          onChange={onChange}
          dateFormat="yyyy. MM. dd HH:mm"
          placeholderText="날짜를 입력해주세요"
          minDate={new Date()}
          showTimeSelect
          timeCaption="시간"
          timeFormat="HH:mm"
          timeIntervals={5}
          locale="ko"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
    </div>
  );
};

export default DateInput;
