import Image from "next/image";
import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

interface HeaderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href: string;
  icon: string;
}

const HeaderButton = ({
  children,
  href,
  icon,
  ...props
}: HeaderButtonProps) => {
  return (
    <Link href={href}>
      <div className="flex items-center gap-2 px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-200 transition-colors">
        <Image src={icon} alt={`${icon} 아이콘`} width={20} height={20} />
        <div className="font-medium text-[#787486]">{children}</div>
      </div>
    </Link>
  );
};

export default HeaderButton;
