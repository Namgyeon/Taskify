import apiClient from "./apiClient";
import axios from "axios";
import { SignInData, SignUpData } from "../types/auth-types";

export const signUpUser = async (signUpData: SignUpData) => {
  const { email, nickname, password } = signUpData;
  try {
    const response = await apiClient.post("/users", {
      email,
      nickname,
      password,
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("회원가입 에러:", error.response?.data || error.message);
      throw new Error(JSON.stringify(error.response?.data) || error.message);
    } else {
      console.error("회원가입 에러:", error);
      throw error;
    }
  }
};

export const signInUser = async (signInData: SignInData) => {
  try {
    const response = await apiClient.post("/auth/login", signInData);
    console.log("로그인 반환값:", response.data);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("로그인 에러:", error.response?.data || error.message);
      throw new Error(JSON.stringify(error.response?.data) || error.message);
    } else {
      console.error("로그인 에러:", error);
      throw error;
    }
  }
};
