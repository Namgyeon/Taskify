import apiClient from "./apiClient";
import axios, { AxiosError } from "axios";
import { SignInData, SignInResponse, SignUpData } from "../types/auth-types";

export const signUpUser = async (signUpData: SignUpData) => {
  const { email, nickname, password } = signUpData;
  try {
    const response = await apiClient.post("/users", {
      email,
      nickname,
      password,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage =
        error.response?.data?.message || "회원 가입에 실패했습니다.";
      throw new Error(errorMessage);
    } else {
      throw error;
    }
  }
};

export const signInUser = async (formData: SignInData) => {
  try {
    const response = await apiClient.post("/auth/login", formData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage =
        error.response?.data?.message || "로그인에 실패했습니다.";
      throw new Error(errorMessage);
    } else {
      throw error;
    }
  }
};
