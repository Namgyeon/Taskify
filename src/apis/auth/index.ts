import { safeResponse } from "@/utils/network/safeResponse";
import { SignInFormData, SignInResponse, signInResponseSchema } from "./types";
import axiosClientHelper from "@/utils/network/axiosClientHelper";

/**
 * login
 * https://sp-taskify-api.vercel.app/docs/#/Auth/Login
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
