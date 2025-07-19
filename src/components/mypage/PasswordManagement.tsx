"use client";
import { useForm } from "react-hook-form";
import BaseLabel from "../ui/Field/BaseLabel";
import Input from "../ui/Field/Input";
import Button from "../ui/Button";

const PasswordManagement = () => {
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="max-w-[670px] p-4 md:p-6 flex flex-col gap-10 md:gap-6 bg-white rounded-lg">
      <h2 className="text-lg font-bold text-[#333236]">비밀번호 변경</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <BaseLabel id="currentPassword">현재 비밀번호</BaseLabel>
          <Input
            id="currentPassword"
            {...register("currentPassword")}
            placeholder="비밀번호 입력"
          />
        </div>
        <div className="flex flex-col gap-2">
          <BaseLabel id="newPassword">새 비밀번호</BaseLabel>
          <Input
            id="newPassword"
            {...register("newPassword")}
            placeholder="새 비밀번호 입력"
          />
        </div>
        <div className="flex flex-col gap-2">
          <BaseLabel id="newPasswordConfirm">새 비밀번호 확인</BaseLabel>
          <Input
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
