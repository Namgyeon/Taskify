"use client";

import {
  useGetDashboardQuery,
  usePatchDashboard,
} from "@/apis/dashboards/queries";
import { PatchDashboardFormData } from "@/apis/dashboards/types";
import Button from "@/components/ui/Button";
import BaseLabel from "@/components/ui/Field/BaseLabel";
import Input from "@/components/ui/Field/Input";
import { getErrorMessage } from "@/utils/network/errorMessage";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const DetailModify = ({ dashboardId }: { dashboardId: number }) => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const { data } = useGetDashboardQuery(dashboardId);
  const { mutate: patchDashboard } = usePatchDashboard(dashboardId);

  const colors = ["#7AC555", "#760DDE", "#FFA500", "#76A5EA", "#E876EA"];

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      title: "",
      color: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        color: data.color,
      });
      setSelectedColor(data.color);
    }
  }, [data, reset]);

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    setValue("color", color);
  };

  const onSubmit = async (data: PatchDashboardFormData) => {
    try {
      await patchDashboard(data);
      toast.success("대시보드 수정 완료");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-[540px] lg:max-w-[620px] flex flex-col gap-6 px-4 md:px-7 py-5 md:py-8 rounded-lg bg-white">
      <h2 className="text-xl md:text-2xl font-bold">{data?.title}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <BaseLabel id="dashboard-name">대시보드 이름</BaseLabel>
          <Input id="dashboard-name" {...register("title")} />
        </div>
        <ul className="flex gap-2">
          {colors.map((color, idx) => (
            <li
              key={idx}
              onClick={() => handleColorClick(color)}
              className="w-7.5 aspect-square rounded-full border-2 border-transparent cursor-pointer hover:scale-110 transition-all duration-200 hover:border-slate-400"
              style={{ backgroundColor: color }}
            >
              {selectedColor === color && (
                <div className="flex items-center justify-center">
                  <Image
                    src="/dashboard/check-icon.svg"
                    alt="체크 아이콘"
                    width={24}
                    height={24}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
        <Button type="submit" className="mt-4">
          변경
        </Button>
      </form>
    </div>
  );
};

export default DetailModify;
