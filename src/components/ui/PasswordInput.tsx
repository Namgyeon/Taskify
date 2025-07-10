import { InputHTMLAttributes, forwardRef, ForwardedRef, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import VisibilityIcon from "@/assets/icons/visibility-icon.svg";
import UnVisibilityIcon from "@/assets/icons/unVisibility-icon.svg";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

const PasswordInput = forwardRef(
  (
    { error, label, className, errorMessage, ...props }: PasswordInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [isPasswordVisibility, setIsPasswordVisibility] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisibility(!isPasswordVisibility);
    };

    return (
      <div className="w-full flex flex-col gap-2">
        <label className="text-lg font-normal text-[var(--black-333236)]">
          {label}
        </label>
        <div className="flex relative">
          <input
            ref={ref}
            className={clsx(
              "w-full px-4 py-3.5 border rounded-md outline-none focus:ring-2",
              error
                ? "border-[var(--red-D6173A)] focus:ring-[var(--red-D6173A)]"
                : "border-[var(--gray-D9D9D9)] focus:ring-[var(--violet-5534DA)]",
              className
            )}
            type={isPasswordVisibility ? "text" : "password"}
            placeholder="비밀번호를 입력하세요."
            {...props}
          />
          <button type="button">
            {!isPasswordVisibility ? (
              <Image
                className="absolute right-3.5 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
                src={UnVisibilityIcon}
                alt="비밀번호 보기 아이콘"
                width={24}
                height={24}
              />
            ) : (
              <Image
                className="absolute right-3.5 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
                src={VisibilityIcon}
                alt="비밀번호 안보기 아이콘"
                width={24}
                height={24}
              />
            )}
          </button>
        </div>
        {errorMessage && (
          <p className="text-sm font-normal text-[var(--red-D6173A)]">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
