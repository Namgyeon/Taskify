import Image from "next/image";

const SidebarHeader = () => {
  return (
    <div className="w-full flex justify-between px-2">
      <div className="hidden md:block text-sm lg:text-lg text-[#787486] font-semibold">
        Dash Boards
      </div>
      <button>
        <Image
          src={"/dashboard/add-icon.svg"}
          alt="더하기버튼"
          width={20}
          height={20}
        />
      </button>
    </div>
  );
};

export default SidebarHeader;
