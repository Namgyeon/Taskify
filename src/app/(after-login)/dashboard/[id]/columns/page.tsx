import { notFound } from "next/navigation";
import ColumnList from "@/components/columns/ColumnList";

export default function ColumnsPage({ params }: { params: { id: string } }) {
  if (!params.id) {
    notFound();
  }

  return <ColumnList />;
}
