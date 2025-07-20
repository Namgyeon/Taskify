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
  displayElement?: React.ReactNode;
}

/**
 * 재사용 가능한 입력 필드 컴포넌트
 *
 * @param props - InputProps 객체
 * @param props.label - 입력 필드 위에 표시될 라벨 텍스트
 * @param props.error - 에러 상태를 나타내는 플래그
 * @param props.errorMessage - 에러 메시지 텍스트
 * @param props.imageRightUrl - 입력 필드 오른쪽에 표시될 이미지 URL
 * @param props.imageLeftUrl - 입력 필드 왼쪽에 표시될 이미지 URL
 * @param props.className - 추가 CSS 클래스
 * @param props.placeholder - 플레이스홀더 텍스트
 * @param props.id - 입력 필드의 고유 ID
 * @param props - 기타 HTML input 요소의 모든 속성들
 * @param ref - 입력 필드에 전달될 ref
 * @param props.displayElementUI - 입력 필드 커스텀 UI 요소
 *
 * @example
 * ```tsx
 * <Input
 *   label="이메일"
 *   placeholder="이메일을 입력하세요"
 *   error={hasError}
 *   errorMessage="올바른 이메일 형식이 아닙니다"
 *   imageRightUrl="/icons/email.svg"
 * />
 * ```
 */

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
      id,
      displayElement,
      ...props
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={clsx("w-full flex flex-col gap-2", className)}>
        {label && <BaseLabel id={id}>{label}</BaseLabel>}
        <div className="relative flex items-center">
          {displayElement ? (
            <div
              className={clsx(
                "md:w-[220px] px-4 py-3.5 border rounded-md outline-none focus:ring-2 min-h-[48px]",
                error
                  ? "border-[var(--red-D6173A)] focus:ring-[var(--red-D6173A)]"
                  : "border-[var(--gray-D9D9D9)] focus:ring-[var(--violet-5534DA)]"
              )}
            >
              {displayElement}
            </div>
          ) : (
            <input
              ref={ref}
              id={id}
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
          )}

          {imageRightUrl && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:bg-gray-200 rounded-lg transition-colors">
              <Image
                src={imageRightUrl}
                alt={imageRightUrl}
                width={26}
                height={26}
              />
            </div>
          )}
          {imageLeftUrl && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer hover:bg-gray-200 rounded-lg transition-colors">
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
