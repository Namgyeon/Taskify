"use client";

import { useGetColumnsQuery } from "@/apis/columns/queries";
import { useParams } from "next/navigation";

const ColumnList = () => {
  const params = useParams();
  const id = params?.id;
  const { data } = useGetColumnsQuery({ dashboardId: Number(id) });

  console.log("컬럼데이터", data);
  return <div>ColumnList</div>;
};

export default ColumnList;
