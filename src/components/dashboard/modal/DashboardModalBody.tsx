import {
  postDashboardsFormData,
  postDashboardsFormSchema,
} from "@/apis/dashboards/types";
import Input from "@/components/ui/Input";
import { ModalBody } from "@/components/ui/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

const PALETTE = ["#7AC555", "#760DDE", "#FFA500", "#76A5EA", "#E876EA"];

const DashboardModalBody = () => {
  const [selectedColor, setSelectedColor] = useState(PALETTE[0]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<postDashboardsFormData>({
    resolver: zodResolver(postDashboardsFormSchema),
  });

  const onSubmit = () => {};

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
              className={`w-[30px] h-[30px] rounded-full border-2 border-white cursor-pointer hover:w-[35px] hover:h-[35px]`}
              type="button"
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect(color)}
            >
              {selectedColor === color && (
                <span className="text-white text-lg">✔️</span>
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
