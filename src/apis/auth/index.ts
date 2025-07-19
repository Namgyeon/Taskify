import { safeResponse } from "@/utils/network/safeResponse";
import {
  PutPasswordFormData,
  PutPasswordRequestData,
  SignInFormData,
  SignInResponse,
  signInResponseSchema,
} from "./types";
import axiosClientHelper from "@/utils/network/axiosClientHelper";

/**
 * login
 * https://sp-taskify-api.vercel.app/docs/#/auth/login
 */
export const login = async (signInFormData: SignInFormData) => {
  const response = await axiosClientHelper.post<SignInResponse>(
    "/auth/login",
    signInFormData
  );
  return safeResponse(response.data, signInResponseSchema);
};

export const logout = async () => {
  await axiosClientHelper.post<void>("/auth/logout");
};

/**
 * 비밀번호 변경
 * https://sp-taskify-api.vercel.app/docs/#/auth/password
 */
export const putPassword = async (
  putPasswordRequestData: PutPasswordRequestData
) => {
  await axiosClientHelper.put<void>("/auth/password", putPasswordRequestData);
};
