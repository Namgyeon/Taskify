import { useEffect, useRef, useState } from "react";
import BaseLabel from "./BaseLabel";
import Image from "next/image";
import toast from "react-hot-toast";

interface ImageUploadProps {
  value?: string | File | null | undefined;
  onChange: (file: File | null | undefined) => void;
  error?: boolean;
  errorMessage?: string;
  id?: string;
}

const ImageUpload = ({ value, onChange, id }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (typeof value === "string") {
      setPreview(value);
    } else if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreview(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith("image/")) {
      toast.error("이미지 파일만 업로드 가능합니다.");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error("파일 크기는 5MB 이하이여야 합니다.");
      return;
    }
    onChange?.(file);
  };

  return (
    <div className="flex flex-col gap-2">
      <BaseLabel id={id}>이미지</BaseLabel>
      <div className="flex">
        {/* 파일 입력 버튼 */}
        {!preview && (
          <button
            id={id}
            className="relative w-20 h-20 cursor-pointer"
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image
              src="/dashboard/add-icon2.svg"
              alt="이미지 추가"
              fill
              className="object-contain"
            />
          </button>
        )}

        {preview && (
          <div className="relative w-20 h-20">
            <Image src={preview} alt="미리보기" fill className="object-cover" />
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
