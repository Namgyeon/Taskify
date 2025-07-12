import clsx from "clsx";
import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface DropdownOption {
  label: ReactNode;
  onClick?: () => void;
  value?: string;
}

interface DropdownProps {
  options: DropdownOption[];
  icon?: string;
  className?: string;
}

const Dropdown = ({ options, icon, className }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: DropdownOption) => {
    if (option.onClick) {
      option.onClick();
    }
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (!isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        width: rect.width,
        left: rect.left + window.scrollX,
      });
    }
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
    <div ref={dropdownRef} className={clsx("relative", className)}>
      <div className="relative w-5 h-5 md:w-7 md:h-7 hover:bg-gray-200 rounded-lg transition-colors">
        <button onClick={toggleDropdown} className="cursor-pointer">
          <Image
            src={icon ?? "/ui/kebabMenu-icon.svg"}
            alt="카드 메뉴 아이콘"
            fill
            className="object-cover"
          />
        </button>
      </div>

      {isOpen &&
        createPortal(
          <div
            className="flex flex-col gap-2 p-2 bg-white rounded-lg shadow-md z-[9999]"
            style={{
              position: "fixed",
              top: dropdownPos.top,
              left: dropdownPos.left,
              minWidth: dropdownPos.width,
            }}
          >
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                value={option.value ?? ""}
                className={
                  "px-4 py-2 rounded-lg whitespace-nowrap cursor-pointer hover:bg-gray-200 hover:text-purple-500 transition-colors"
                }
              >
                {option.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
};

export default Dropdown;
