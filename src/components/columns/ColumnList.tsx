"use client";

import { useGetColumnsQuery } from "@/apis/columns/queries";
import { useParams } from "next/navigation";
import Column from "./Column";
import CreateColumn from "./CreateColumn";

const ColumnList = () => {
  const params = useParams();
  const id = params?.id;
  const { data } = useGetColumnsQuery({ dashboardId: Number(id) });

  return (
    <div className="h-full flex flex-row gap-4 px-3 md:px-5 overflow-x-auto">
      {data?.data.map((column) => (
        <Column key={column.id} column={column} />
      ))}
      <div className="pt-4 md:pt-6">
        <CreateColumn />
      </div>
    </div>
  );
};

export default ColumnList;
