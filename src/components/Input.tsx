import { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  errorMessage?: string;
}

const Input = ({
  label,
  error,
  className,
  errorMessage,
  placeholder,
  ...props
}: InputProps) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label className="text-lg font-normal text-[var(--black-333236)]">
          {label}
        </label>
      )}
      <input
        className={clsx(
          "w-full px-4 py-3.5 border rounded-md outline-none focus:ring-2",
          error
            ? "border-[var(--red-D6173A)] focus:ring-[var(--red-D6173A)]"
            : "border-[var(--gray-D9D9D9)] focus:ring-[var(--violet-5534DA)]"
        )}
        placeholder={placeholder}
        {...props}
      />
      {errorMessage && (
        <p className="text-sm font-normal text-[var(--red-D6173A)]">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Input;
