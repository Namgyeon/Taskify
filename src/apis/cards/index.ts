import { safeResponse } from "@/utils/network/safeResponse";
import { cardSchema, CreateCardRequest } from "./types";
import axiosClientHelper from "@/utils/network/axiosClientHelper";

/**
 * 카드 생성
 * https://sp-taskify-api.vercel.app/docs/#/cards
 */
export const postCard = async (formData: CreateCardRequest) => {
  const response = await axiosClientHelper.post("/cards", formData);
  return safeResponse(response.data, cardSchema);
};
