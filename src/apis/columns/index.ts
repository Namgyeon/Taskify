import axiosClientHelper from "@/utils/network/axiosClientHelper";
import {
  ColumnResponse,
  columnResponseSchema,
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
