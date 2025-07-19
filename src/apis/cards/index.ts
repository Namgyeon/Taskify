import { safeResponse } from "@/utils/network/safeResponse";
import {
  Card,
  CardDetailResponse,
  cardDetailResponseSchema,
  CardListRequest,
  CardListResponse,
  cardListResponseSchema,
  cardSchema,
  CreateCardRequest,
  UpdateCardRequest,
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
  const { cursorId, size, columnId } = params;
  const response = await axiosClientHelper.get<CardListResponse>("/cards", {
    params: {
      size,
      columnId,
      ...(cursorId && { cursorId }),
    },
  });
  return safeResponse(response.data, cardListResponseSchema);
};

/**
 * 카드 상세 조회
 * https://sp-taskify-api.vercel.app/docs/#/cards/{cardId}
 */
export const getCardDetail = async (cardId: number) => {
  const response = await axiosClientHelper.get<CardDetailResponse>(
    `/cards/${cardId}`
  );
  return safeResponse(response.data, cardDetailResponseSchema);
};

/**
 * 카드 수정
 * https://sp-taskify-api.vercel.app/docs/#/cards/{cardId}
 */
export const putCard = async (cardId: number, formData: UpdateCardRequest) => {
  const response = await axiosClientHelper.put<Card>(
    `/cards/${cardId}`,
    formData
  );
  return safeResponse(response.data, cardSchema);
};
