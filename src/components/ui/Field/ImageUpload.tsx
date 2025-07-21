"use client";
import { useEffect, useRef, useState } from "react";
import BaseLabel from "./BaseLabel";
import Image from "next/image";
import toast from "react-hot-toast";
import clsx from "clsx";

interface ImageUploadProps {
  value?: string | File | null | undefined;
  onChange: (file: File | null | undefined) => Promise<void>;
  error?: boolean;
  errorMessage?: string;
  id?: string;
  existingImageUrl?: string;
  size?: string;
}

const ImageUpload = ({
  value,
  onChange,
  id,
  existingImageUrl,
  size = "w-20 h-20",
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(
    existingImageUrl ?? null
  );

  useEffect(() => {
    if (typeof value === "string") {
      setPreview(value);
    } else if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreview(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else if (existingImageUrl) {
      setPreview(existingImageUrl);
    } else {
      setPreview(null);
    }
  }, [value, existingImageUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith("image/")) {
      toast.error("이미지 파일만 업로드 가능합니다.");
      return;
    }

    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      toast.error("파일 크기는 5MB 이하이여야 합니다.");
      return;
    }
    onChange?.(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <BaseLabel id={id}>이미지</BaseLabel>
      <div className="flex">
        {/* 파일 입력 버튼 */}
        {!preview && (
          <button
            id={id}
            className={clsx(
              "relative flex items-center justify-center cursor-pointer bg-gray-100 rounded-xl",
              size
            )}
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image
              src="/dashboard/add-icon2.svg"
              alt="이미지 추가"
              width={25}
              height={25}
              className="w-5 h-5 md:w-7.5 md:h-7.5"
            />
          </button>
        )}

        {preview && (
          <div className={clsx("relative", size)}>
            <Image
              src={preview}
              alt="미리보기"
              sizes="100vw"
              fill
              className="object-cover"
            />
            <button
              className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-white bg-black rounded-full p-1 cursor-pointer"
              type="button"
              onClick={() => {
                setPreview(null);
                onChange?.(null);
              }}
            >
              x
            </button>
          </div>
        )}

        {/* 숨겨진 파일 입력 */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg, image/png"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
