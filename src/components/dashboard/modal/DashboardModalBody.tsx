import { useCreateDashboard } from "@/apis/dashboards/queries";
import {
  postDashboardsFormData,
  postDashboardsFormSchema,
} from "@/apis/dashboards/types";
import Input from "@/components/ui/Input";
import { ModalBody } from "@/components/ui/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const PALETTE = ["#7AC555", "#760DDE", "#FFA500", "#76A5EA", "#E876EA"];

const DashboardModalBody = () => {
  const [selectedColor, setSelectedColor] = useState(PALETTE[0]);

  const createDashboard = useCreateDashboard();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<postDashboardsFormData>({
    resolver: zodResolver(postDashboardsFormSchema),
  });

  const onSubmit = async (data: postDashboardsFormData) => {
    try {
      await createDashboard.mutateAsync(data);
      toast.success("대시보드 생성 완료");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "대시보드 생성 중 알 수 없는 오류가 발생했습니다.";
      toast.error(errorMessage);
    }
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setValue("color", color, { shouldValidate: true });
  };

  return (
    <ModalBody>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          {...register("title")}
          label="대시보드 이름"
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
