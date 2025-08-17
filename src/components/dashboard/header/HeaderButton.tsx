import Image from "next/image";
import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

interface HeaderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  icon: string;
  onClick?: () => void;
}

const HeaderButton = ({ children, href, icon, onClick }: HeaderButtonProps) => {
  return (
    <Link href={href ?? ""} onClick={onClick}>
      <div className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-200 transition-colors min-w-0">
        <Image
          src={icon}
          alt={`${icon} 아이콘`}
          width={20}
          height={20}
          className="hidden md:block flex-shrink-0"
          style={{ width: "20px", height: "20px" }}
        />
        <div className="font-medium text-[#787486] text-sm md:text-base truncate">
          {children}
        </div>
      </div>
    </Link>
  );
};

export default HeaderButton;
