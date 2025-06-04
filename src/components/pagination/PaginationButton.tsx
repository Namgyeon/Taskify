const PaginationButton = () => {
  return (
    <div>
      <button className="p-3 border-2 rounded-l-lg border-[#D9D9D9]">
        {"<"}
      </button>
      <button className="p-3 border-2 rounded-r-lg border-[#D9D9D9]">
        {">"}
      </button>
    </div>
  );
};

export default PaginationButton;
