"use client";

import { useGetColumnsQuery } from "@/apis/columns/queries";
import { useParams } from "next/navigation";
import Column from "./Column";
import CreateColumn from "./CreateColumn";

const ColumnList = () => {
  const params = useParams();
  const id = params?.id;
  const { data } = useGetColumnsQuery({ dashboardId: Number(id) });

  console.log("컬럼데이터", data);
  return (
    <div className="flex flex-col lg:flex-row gap-4 py-4 md:py-6 px-3 md:px-5">
      {data?.data.map((column) => (
        <Column key={column.id} column={column} />
      ))}
      <CreateColumn />
    </div>
  );
};

export default ColumnList;
