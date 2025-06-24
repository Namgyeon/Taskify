import { useEffect, useRef, useState } from "react";
import BaseLabel from "./BaseLabel";
import Image from "next/image";

interface ImageUploadProps {
  value?: string | File | null;
  onChange?: (file: File | null) => void;
  error?: boolean;
  errorMessage?: string;
}

const ImageUpload = ({
  value,
  onChange,
  error,
  errorMessage,
}: ImageUploadProps) => {
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
    if (file) {
      onChange?.(file);
    }
  };

  return (
    <div>
      <BaseLabel>이미지</BaseLabel>
      <div>
        {preview && (
          <div className="relative w-14 h-14">
            <Image src={preview} alt="미리보기" fill className="object-cover" />
            <button
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
        {/* 파일 입력 버튼 */}
        <button
          className="relative w-14 h-14"
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

        {/* 숨겨진 파일 입력 */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
};

export default ImageUpload;
