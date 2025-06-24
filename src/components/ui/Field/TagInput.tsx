import { useState } from "react";
import BaseLabel from "./BaseLabel";

interface TagInputProps {
  value?: string[];
  onChange?: (tags: string[]) => void;
  error?: boolean;
  errorMessage?: string;
}

const TagInput = ({
  value = [],
  onChange,
  error,
  errorMessage,
}: TagInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();

      if (!value.includes(inputValue.trim())) {
        const newTags = [...value, inputValue.trim()];
        onChange?.(newTags);
      }

      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = value.filter((tag) => tag !== tagToRemove);
    onChange?.(newTags);
  };

  return (
    <div className="flex flex-col gap-2">
      <BaseLabel>태그</BaseLabel>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="입력후 Enter"
          className="w-full px-4 py-3.5 border border-gray-300 rounded-md outline-none focus:ring-2"
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
