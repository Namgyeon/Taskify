import axiosClientHelper from "@/utils/network/axiosClientHelper";
import {
  CardImageForm,
  CardImageResponse,
  cardImageResponseSchema,
  Column,
  ColumnResponse,
  columnResponseSchema,
  columnSchema,
  CreateColumnRequest,
  GetColumnsRequest,
  UpdateColumnRequest,
} from "./types";
import { safeResponse } from "@/utils/network/safeResponse";

/**
 * 컬럼 목록 조회
 * https://sp-taskify-api.vercel.app/docs/#/columns
 */
export const getColumns = async (params: GetColumnsRequest) => {
  const { dashboardId } = params;
  const response = await axiosClientHelper.get<ColumnResponse>("/columns", {
    params: {
      dashboardId,
    },
  });
  return safeResponse(response.data, columnResponseSchema);
};

/**
 * 컬럼 생성
 * https://sp-taskify-api.vercel.app/docs/#/columns
 */
export const postColumn = async (
  dashboardId: number,
  columnForm: CreateColumnRequest
) => {
  const { title } = columnForm;
  const response = await axiosClientHelper.post<Column>("/columns", {
    title,
    dashboardId,
  });
  return safeResponse(response.data, columnSchema);
};

/**
 * 컬럼 수정
 * https://sp-taskify-api.vercel.app/docs/#/columns/{columnId}
 */
export const updateColumn = async (
  columnId: number,
  formData: UpdateColumnRequest
) => {
  const response = await axiosClientHelper.put<Column>(`/columns/${columnId}`, {
    title: formData.title,
  });
  return safeResponse(response.data, columnSchema);
};

/**
 * 컬럼 삭제
 * https://sp-taskify-api.vercel.app/docs/#/columns/{columnId}
 */
export const deleteColumn = async (columnId: number) => {
  await axiosClientHelper.delete(`/columns/${columnId}`);
  return {};
};

/**
 * card image 생성
 * https://sp-taskify-api.vercel.app/docs/#/columns/{columnId}/card-image
 */
export const postCardImage = async (
  columnId: number,
  cardImageForm: CardImageForm
) => {
  const response = await axiosClientHelper.post<CardImageResponse>(
    `/columns/${columnId}/card-image`,
    cardImageForm,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return safeResponse(response.data, cardImageResponseSchema);
};
