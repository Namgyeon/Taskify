import ArrowButton from "./ArrowButton";

type PaginationProps = {
  page: number;
  totalPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({ page, totalPage, setPage }: PaginationProps) => {
  return (
    <div className="hidden md:block sticky bottom-0">
      <div>
        <ArrowButton
          direction="left"
          disabled={page <= 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        />
        <ArrowButton
          direction="right"
          disabled={page >= totalPage}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPage))}
        />
      </div>
    </div>
  );
};

export default Pagination;
