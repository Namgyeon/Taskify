import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}

const baseStyles =
  "rounded-md font-medium cursor-pointer hover:shadow-lg transition-all duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-offset-2";

const variantStyles = {
  primary:
    "bg-[var(--violet-5534DA)] text-white border-transparent hover:bg-[var(--violet-5534DA)]/90 focus:ring-[var(--violet-5534DA)]/50",
  secondary:
    "bg-white text-[var(--violet-5534DA)] border-gray-300 hover:bg-[var(--violet-5534DA)]/10 focus:ring-[var(--violet-5534DA)]/50",
};

const sizeStyles = {
  sm: "py-2 px-4 text-sm md:text-base",
  md: "py-2.5 px-5 text-base md:text-lg",
  lg: "py-3 px-6 text-lg md:text-xl",
};

const disabledStyles = "opacity-50 cursor-not-allowed hover:bg-opacity-100";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled,
  className,
  fullWidth,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        disabled && disabledStyles,
        className
      )}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
