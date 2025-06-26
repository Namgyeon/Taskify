import { ForwardedRef, forwardRef, TextareaHTMLAttributes } from "react";
import BaseLabel from "./BaseLabel";
import clsx from "clsx";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

const Textarea = forwardRef(
  (
    {
      label,
      placeholder,
      error,
      errorMessage,
      className,
      id,
      ...props
    }: TextareaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <div className="flex flex-col gap-2">
        {label && <BaseLabel id={id}>{label}</BaseLabel>}
        <textarea
          ref={ref}
          className={clsx(
            "w-full p-4 border rounded-md outline-none focus:ring-2 resize-none",
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-[#5534DA]",
            className
          )}
          placeholder={placeholder}
          id={id}
          {...props}
        />
        {errorMessage && (
          <p className="text-sm font-normal text-[var(--red-D6173A)]">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
