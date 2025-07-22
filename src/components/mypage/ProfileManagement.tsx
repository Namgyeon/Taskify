"use client";
import {
  useGetUser,
  usePatchUser,
  usePostProfileImage,
} from "@/apis/users/queries";
import Button from "../ui/Button";
import BaseLabel from "../ui/Field/BaseLabel";
import ImageUpload from "../ui/Field/ImageUpload";
import Input from "../ui/Field/Input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatchUser, patchUserFormSchema } from "@/apis/users/types";
import { useEffect } from "react";
import { getErrorMessage } from "@/utils/network/errorMessage";
import toast from "react-hot-toast";

const ProfileManagement = () => {
  const { data } = useGetUser();
  const { mutateAsync: patchUser, isPending } = usePatchUser();
  const { mutateAsync: uploadProfileImage } = usePostProfileImage();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: zodResolver(patchUserFormSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (data) {
      reset({
        email: data.email,
        nickname: data.nickname,
        profileImageUrl: data.profileImageUrl,
      });
    }
  }, [data, reset]);

  const handleProfileImageChange = async (file: File | null | undefined) => {
    if (file) {
      try {
        const { profileImageUrl } = await uploadProfileImage({ image: file });
        setValue("profileImageUrl", profileImageUrl, { shouldDirty: true });
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
      }
    } else {
      setValue("profileImageUrl", null, { shouldDirty: true });
    }
  };

  const onSubmit = async (data: PatchUser) => {
    try {
      await patchUser(data);
      toast.success("프로필이 수정되었습니다.");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-[670px] p-4 md:p-6 flex flex-col md:flex-row md:gap-10 bg-white rounded-lg">
      <div className="flex flex-col md:flex-1 gap-10">
        <h2 className="text-lg font-bold text-[#333236]">프로필</h2>
        <div>
          <Controller
            name="profileImageUrl"
            control={control}
            render={({ field }) => (
              <ImageUpload
                onChange={handleProfileImageChange}
                existingImageUrl={field.value || undefined}
                size="w-25 h-25 md:w-45 md:h-45"
              />
            )}
          />
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 md:flex-1"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <BaseLabel id="email">이메일</BaseLabel>
            <Input
              {...register("email")}
              id="email"
              disabled
              className="text-gray-400 cursor-not-allowed"
            />
          </div>
          <div className="flex flex-col gap-2">
            <BaseLabel id="nickname">닉네임</BaseLabel>
            <Input
              {...register("nickname")}
              error={!!errors.nickname}
              errorMessage={errors.nickname?.message}
              id="nickname"
            />
          </div>
        </div>
        <Button variant="primary" disabled={!isDirty || !isValid || isPending}>
          {isPending ? "저장중..." : "저장"}
        </Button>
      </form>
    </div>
  );
};

export default ProfileManagement;
