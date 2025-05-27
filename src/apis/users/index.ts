import axiosClientHelper from "@/utils/network/axiosClientHelper";
import { safeResponse } from "@/utils/network/safeResponse";
import { SignupFormData, SignupResponse, userSchema } from "@/apis/users/types";

/**
 * signup
 * https://sp-taskify-api.vercel.app/docs/#/12-2/users
 */
export const singup = async (signupFormData: SignupFormData) => {
  const response = await axiosClientHelper.post<SignupResponse>(
    "/users",
    signupFormData
  );
  return safeResponse(response.data, userSchema);
};
