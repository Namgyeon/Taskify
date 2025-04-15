import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4 md:px-10 xl:px-[70px] bg-black">
      <Image
        src={"/images/main-mobile-logo.svg"}
        alt="메인 페이지 모바일 로고 이미지"
        width={24}
        height={28}
        className="block md:hidden"
      />
      <Image
        src={"/images/main-logo.svg"}
        alt="메인페이지 로고 이미지"
        width={120}
        height={40}
        className="hidden md:block"
      />
      <div className="flex gap-6 md:gap-9">
        <Link href="/signin" className="text-[14px] md:text-[16px] text-white">
          로그인
        </Link>
        <Link href="/signup" className="text-[14px] md:text-[16px] text-white">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Nav;
