import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface DropdownOption {
  label: string;
  onClick?: () => void;
}

interface DropdownProps {
  options: DropdownOption[];
  cardId?: number;
}

const Dropdown = ({ options, cardId }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      <div className="relative w-5 h-5 md:w-7 md:h-7 hover:bg-gray-200 rounded-lg transition-colors">
        <button onClick={toggleDropdown} className="cursor-pointer">
          <Image
            src="/ui/kebabMenu-icon.svg"
            alt="카드 메뉴 아이콘"
            fill
            className="object-cover"
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full right-0 flex flex-col gap-2 p-2 bg-white rounded-lg shadow-md z-50">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={option.onClick}
              className="px-4 py-2 rounded-lg whitespace-nowrap cursor-pointer hover:bg-gray-200 hover:text-purple-500 transition-colors"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
