import { useState } from "react";
import BaseLabel from "./BaseLabel";

interface TagInputProps {
  value?: string[];
  onChange?: (tags: string[]) => void;
  error?: boolean;
  errorMessage?: string;
  id?: string;
}

const TagInput = ({
  value = [],
  onChange,
  error,
  errorMessage,
  id,
}: TagInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() && !isComposing) {
      e.preventDefault();

      if (!value.includes(inputValue.trim())) {
        const newTags = [...value, inputValue.trim()];
        onChange?.(newTags);
      }

      setInputValue("");
    }
  };

  // 조합 시작
  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  // 조합 종료
  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = value.filter((tag) => tag !== tagToRemove);
    onChange?.(newTags);
  };

  return (
    <div className="flex flex-col gap-2">
      <BaseLabel id={id}>태그</BaseLabel>
      <div className="flex flex-col gap-2">
        <input
          id={id}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={10}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          placeholder="입력후 Enter"
          className="w-full px-4 py-3.5 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[var(--violet-5534DA)]"
        />
        <div className="flex flex-wrap gap-2">
          {value.map((tag, index) => (
            <span
              key={index}
              className=" bg-gray-100 px-2 py-1 rounded-md cursor-pointer"
              onClick={() => removeTag(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
};

export default TagInput;
