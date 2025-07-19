"use client";
import { useForm } from "react-hook-form";
import BaseLabel from "../ui/Field/BaseLabel";
import Input from "../ui/Field/Input";
import Button from "../ui/Button";
import { usePutPassword } from "@/apis/auth/queries";
import { PutPasswordFormData, PutPasswordRequestData } from "@/apis/auth/types";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/network/errorMessage";
import PasswordInput from "../ui/Field/PasswordInput";
const PasswordManagement = () => {
  const { mutateAsync: putPassword } = usePutPassword();

  const { register, handleSubmit, reset } = useForm<PutPasswordFormData>({
    mode: "onChange",
  });

  //새비밀번호 확인하는 로직 필요
  //값 제출하고 리셋해야함.

  const onSubmit = async (data: PutPasswordRequestData) => {
    try {
      await putPassword(data);
      toast.success("비밀번호가 변경되었습니다.");
      reset();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-[670px] p-4 md:p-6 flex flex-col gap-10 md:gap-6 bg-white rounded-lg">
      <h2 className="text-lg font-bold text-[#333236]">비밀번호 변경</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <BaseLabel id="currentPassword">현재 비밀번호</BaseLabel>
          <PasswordInput
            id="password"
            {...register("password")}
            placeholder="비밀번호 입력"
          />
        </div>
        <div className="flex flex-col gap-2">
          <BaseLabel id="newPassword">새 비밀번호</BaseLabel>
          <PasswordInput
            id="newPassword"
            {...register("newPassword")}
            placeholder="새 비밀번호 입력"
          />
        </div>
        <div className="flex flex-col gap-2">
          <BaseLabel id="newPasswordConfirm">새 비밀번호 확인</BaseLabel>
          <PasswordInput
            id="newPasswordConfirm"
            {...register("newPasswordConfirm")}
            placeholder="새 비밀번호 확인"
          />
        </div>
        <Button type="submit" variant="primary">
          변경
        </Button>
      </form>
    </div>
  );
};

export default PasswordManagement;
