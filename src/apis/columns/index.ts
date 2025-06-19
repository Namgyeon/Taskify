import axiosClientHelper from "@/utils/network/axiosClientHelper";
import {
  Column,
  ColumnResponse,
  columnResponseSchema,
  columnSchema,
  CreateColumnRequest,
  GetColumnsRequest,
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
