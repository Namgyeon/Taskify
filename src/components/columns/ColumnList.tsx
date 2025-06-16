"use client";

import { useGetColumnsQuery } from "@/apis/columns/queries";
import { useParams } from "next/navigation";
import Column from "./Column";

const ColumnList = () => {
  const params = useParams();
  const id = params?.id;
  const { data } = useGetColumnsQuery({ dashboardId: Number(id) });

  console.log("컬럼데이터", data);
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {data?.data.map((column) => (
        <Column key={column.id} column={column} />
      ))}
    </div>
  );
};

export default ColumnList;
