import { isAxiosError } from "axios";

interface errorResponse {
  message?: string;
}

export const getErrorMessage = (error: unknown) => {
  if (isAxiosError(error)) {
    const response = error.response?.data as errorResponse | undefined;

    if (response?.message) {
      return response.message;
    }

    return error.message;
  }
  return error instanceof Error
    ? error.message
    : "알 수 없는 에러가 발생했어요.";
};
