import { InputHTMLAttributes, forwardRef, ForwardedRef } from "react";
import clsx from "clsx";
import BaseLabel from "./BaseLabel";
import Image from "next/image";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  imageRightUrl?: string;
  imageLeftUrl?: string;
}

const Input = forwardRef(
  (
    {
      label,
      error,
      className,
      errorMessage,
      placeholder,
      imageRightUrl,
      imageLeftUrl,
      ...props
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className="w-full flex flex-col gap-2">
        {label && <BaseLabel>{label}</BaseLabel>}
        <div className="relative">
          <input
            ref={ref}
            className={clsx(
              "w-full px-4 py-3.5 border rounded-md outline-none focus:ring-2",
              error
                ? "border-[var(--red-D6173A)] focus:ring-[var(--red-D6173A)]"
                : "border-[var(--gray-D9D9D9)] focus:ring-[var(--violet-5534DA)]",
              className
            )}
            placeholder={placeholder}
            {...props}
          />
          {imageRightUrl && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Image
                src={imageRightUrl}
                alt={imageRightUrl}
                width={26}
                height={26}
              />
            </div>
          )}
          {imageLeftUrl && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Image
                src={imageLeftUrl}
                alt={imageLeftUrl}
                width={26}
                height={26}
              />
            </div>
          )}
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

Input.displayName = "Input";

export default Input;
