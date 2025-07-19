"use client";

import {
  PostDashboardsFormData,
  postDashboardsFormSchema,
} from "@/apis/dashboards/types";
import Input from "@/components/ui/Field/Input";
import { ModalBody } from "@/components/ui/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

const PALETTE = ["#7AC555", "#760DDE", "#FFA500", "#76A5EA", "#E876EA"];

interface DashboardModalBodyProps {
  onSubmit: (data: PostDashboardsFormData) => void;
}

const DashboardModalBody = ({ onSubmit }: DashboardModalBodyProps) => {
  const [selectedColor, setSelectedColor] = useState(PALETTE[0]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PostDashboardsFormData>({
    resolver: zodResolver(postDashboardsFormSchema),
    defaultValues: {
      color: PALETTE[0], // 기본 색상 설정
    },
  });

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setValue("color", color, { shouldValidate: true });
  };

  const handleFormSubmit = (data: PostDashboardsFormData) => {
    onSubmit(data);
  };

  return (
    <ModalBody>
      <form
        id="dashboard-form"
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-4"
      >
        <Input
          {...register("title")}
          label="대시보드 이름"
          placeholder="대시보드 이름을 입력하세요"
          error={!!errors.title}
          errorMessage={errors.title?.message}
        />
        <div className="flex gap-2">
          {PALETTE.map((color) => (
            <button
              key={color}
              className={`w-[30px] h-[30px] rounded-full border-2 border-white cursor-pointer hover:border-black`}
              type="button"
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect(color)}
            >
              {selectedColor === color && (
                <Image
                  src={"/dashboard/check-icon.svg"}
                  alt="체크아이콘"
                  width={24}
                  height={24}
                />
              )}
            </button>
          ))}
        </div>
        <input type="hidden" {...register("color")} />
        {errors.color && (
          <span className="text-red-500 ">{errors.color.message}</span>
        )}
      </form>
    </ModalBody>
  );
};

export default DashboardModalBody;
