import axiosClientHelper from "@/utils/network/axiosClientHelper";
import { safeResponse } from "@/utils/network/safeResponse";
import {
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
