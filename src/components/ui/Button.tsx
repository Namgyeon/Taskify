import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "success" | "danger" | "cancel";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
}
// 다른 버튼 컴포넌트들도 고려해야함 수락,거절 확인,취소

const Button = ({
  text,
  variant = "primary",
  size = "md",
  disabled,
  className,
  onClick,
  ...props
}: ButtonProps) => {
  const variantStyles = {
    primary:
      "bg-[var(--violet-5534DA)] text-white hover:bg-[var(--violet-5534DA)]/90",
    secondary:
      "bg-white text-[var(--violet-5534DA)] border-[var(--violet-5534DA)] hover:bg-[var(--violet-5534DA)]/10",
    success:
      "bg-[var(--green-20D26C)] text-white hover:bg-[var(--green-20D26C)]/90",
    danger: "bg-[var(--red-FF4B4B)] text-white hover:bg-[var(--red-FF4B4B)]/90",
    cancel:
      "bg-[var(--gray-9FA6B2)] text-white hover:bg-[var(--gray-9FA6B2)]/90",
  };

  const sizeStyles = {
    sm: "py-2 px-4 text-[14px]",
    md: "py-3 px-6 text-[16px]",
    lg: "py-4 px-8 text-[18px]",
  };

  return (
    <button
      className={clsx(
        "rounded-md font-medium cursor-pointer border-2 transition-colors duration-200",
        variantStyles[variant],
        sizeStyles[size],
        className,
        disabled && "opacity-50 cursor-not-allowed hover:bg-opacity-100"
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
