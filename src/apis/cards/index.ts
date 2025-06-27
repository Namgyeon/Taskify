import { safeResponse } from "@/utils/network/safeResponse";
import {
  Card,
  CardListRequest,
  CardListResponse,
  cardListResponseSchema,
  cardSchema,
  CreateCardRequest,
} from "./types";
import axiosClientHelper from "@/utils/network/axiosClientHelper";

/**
 * 카드 생성
 * https://sp-taskify-api.vercel.app/docs/#/cards
 */
export const postCard = async (formData: CreateCardRequest) => {
  const response = await axiosClientHelper.post<Card>("/cards", formData);
  return safeResponse(response.data, cardSchema);
};

/**
 * 카드 목록 조회
 * https://sp-taskify-api.vercel.app/docs/#/cards
 */
export const getCards = async (params: CardListRequest) => {
  const response = await axiosClientHelper.get<CardListResponse>("/cards", {
    params,
  });
  return safeResponse(response.data, cardListResponseSchema);
};
