import clsx from "clsx";
import Image from "next/image";
import { ReactNode } from "react";
import { Menu } from "@headlessui/react";

interface DropdownOption {
  label: ReactNode;
  onClick?: () => void;
  value?: string;
}

interface DropdownProps {
  options: DropdownOption[];
  text?: string;
  icon?: string;
  className?: string;
  optionClassName?: string;
  value?: string;
  onChange?: (value: string) => void;
  selectedInput?: boolean;
}

const Dropdown = ({
  options,
  icon,
  onChange,
  text,
  className,
  optionClassName,
}: DropdownProps) => {
  const handleOptionClick = (option: DropdownOption) => {
    if (option.onClick) {
      option.onClick();
    }
    onChange?.(option.value ?? "");
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button
        className={clsx(
          "relative flex items-center w-5 h-5 md:w-7 md:h-7 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer",
          className
        )}
      >
        {!text && (
          <Image
            src={icon ?? "/ui/kebabMenu-icon.svg"}
            alt="드롭다운 아이콘"
            sizes="100vw"
            fill
            className="object-cover"
          />
        )}
        {text && (
          <p className="md:text-lg font-medium text-[#333236] whitespace-nowrap">
            {text}
          </p>
        )}
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-[9999]">
        {options.map((option, idx) => (
          <Menu.Item key={idx}>
            {({ active }) => (
              <button
                onClick={() => handleOptionClick(option)}
                value={option.value ?? ""}
                className={clsx(
                  "px-4 py-2 rounded-lg whitespace-nowrap cursor-pointer transition-colors text-left w-full",
                  active
                    ? "bg-gray-200 text-purple-500"
                    : "text-gray-700 hover:bg-gray-100",
                  optionClassName
                )}
              >
                {option.label}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default Dropdown;
