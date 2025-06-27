"use client";

import { useGetColumnsQuery } from "@/apis/columns/queries";
import { useParams } from "next/navigation";
import Column from "./Column";
import CreateColumn from "./CreateColumn";
import { useGetMembers } from "@/apis/members/queries";

const ColumnList = () => {
  const params = useParams();
  const id = params?.id;
  const { data } = useGetColumnsQuery({ dashboardId: Number(id) });
  return (
    <div className="h-full flex flex-col lg:flex-row overflow-y-auto lg:overflow-x-auto">
      {data?.data.map((column) => (
        <Column key={column.id} column={column} />
      ))}
      <div className="px-3 pt-4 md:pt-6">
        <CreateColumn />
      </div>
    </div>
  );
};

export default ColumnList;
