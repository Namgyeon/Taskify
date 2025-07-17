import axiosClientHelper from "@/utils/network/axiosClientHelper";
import { safeResponse } from "@/utils/network/safeResponse";
import {
  PatchUser,
  PostProfileImageFormData,
  PostProfileImageResponse,
  postProfileImageResponseSchema,
  SignupFormData,
  SignupResponse,
  User,
  userSchema,
} from "@/apis/users/types";

/**
 * signup
 * https://sp-taskify-api.vercel.app/docs/#/users
 */
export const signup = async (signupFormData: SignupFormData) => {
  const response = await axiosClientHelper.post<SignupResponse>(
    "/users",
    signupFormData
  );
  return safeResponse(response.data, userSchema);
};

/**
 * 내 정보 조회
 * https://sp-taskify-api.vercel.app/docs/#/users/me
 */
export const getUser = async () => {
  const response = await axiosClientHelper.get<User>("/users/me");
  return safeResponse(response.data, userSchema);
};

/**
 * 내 정보 수정
 * https://sp-taskify-api.vercel.app/docs/#/users/me
 */
export const patchUser = async (data: PatchUser) => {
  const response = await axiosClientHelper.patch<User>("/users/me", data);
  return safeResponse(response.data, userSchema);
};

/**
 * 프로필 이미지 업로드
 * https://sp-taskify-api.vercel.app/docs/#/users/me/image
 */
export const postProfileImage = async (data: PostProfileImageFormData) => {
  const response = await axiosClientHelper.post<PostProfileImageResponse>(
    "/users/me/image",
    data
  );
  return safeResponse(response.data, postProfileImageResponseSchema);
};
