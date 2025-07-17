"use client";
import { useGetUser } from "@/apis/users/queries";
import Button from "../ui/Button";
import BaseLabel from "../ui/Field/BaseLabel";
import ImageUpload from "../ui/Field/ImageUpload";
import Input from "../ui/Field/Input";
import { useForm } from "react-hook-form";

const ProfileManagement = () => {
  const { data } = useGetUser();
  console.log("계정관리 유저데이터", data);
  const { register, handleSubmit } = useForm({
    defaultValues: {},
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="max-w-[670px] p-4 md:p-6 flex flex-col md:flex-row md:gap-10 bg-white rounded-lg">
      <div className="flex flex-col md:flex-1 gap-10">
        <h2 className="text-lg font-bold text-[#333236]">프로필</h2>
        <div>
          <ImageUpload onChange={() => {}} size="w-25 h-25 md:w-45 md:h-45" />
        </div>
      </div>
      <form className="flex flex-col gap-6 md:flex-1">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <BaseLabel id="email">이메일</BaseLabel>
            <Input id="email" />
          </div>
          <div className="flex flex-col gap-2">
            <BaseLabel id="nickname">닉네임</BaseLabel>
            <Input {...register("nickname")} id="nickname" />
          </div>
        </div>
        <Button variant="primary">저장</Button>
      </form>
    </div>
  );
};

export default ProfileManagement;
