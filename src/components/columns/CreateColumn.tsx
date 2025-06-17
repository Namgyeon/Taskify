import Image from "next/image";

const CreateColumn = () => {
  return (
    <div
      className="lg:w-88 lg:h-15 flex items-center justify-center gap-3 py-5 border border-gray-300 rounded-lg bg-white cursor-pointer hover:bg-gray-300
    transition-colors duration-200"
    >
      <p className="font-bold text-[#333236]">새로운 컬럼 추가하기</p>
      <button>
        <Image
          src="/dashboard/add-icon2.svg"
          alt="컬럼 추가하기 아이콘"
          width={20}
          height={20}
        />
      </button>
    </div>
  );
};

export default CreateColumn;
