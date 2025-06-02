import Link from "next/link";
import Image from "next/image";

const SidebarLogo = () => {
  return (
    <header>
      <Link href={"/"}>
        <h1 className="hidden md:block pt-3 text-center lg:text-5xl md:text-3xl font-bold text-[#5534DA]">
          Taskify
        </h1>
      </Link>
      <Link href={"/"}>
        <div className="flex md:hidden justify-center pt-3">
          <Image
            src={"/dashboard/logo.svg"}
            alt="로고이미지"
            width={30}
            height={30}
          />
        </div>
      </Link>
    </header>
  );
};

export default SidebarLogo;
