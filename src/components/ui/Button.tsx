import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  disabled?: boolean;
  className?: string;
}
// 다른 버튼 컴포넌트들도 고려해야함 수락,거절 확인,취소

const Button = ({
  text,
  disabled,
  className,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "w-full py-3.5 rounded-md text-[18px] font-medium cursor-pointer border-2",
        className,
        disabled
          ? "bg-[var(--gray-9FA6B2)] cursor-not-allowed"
          : "bg-[var(--violet-5534DA)]"
      )}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
