import Image from "next/image";
import mobileLogo from "@/assets/images/main-mobile-logo.svg";
import logo from "@/assets/images/main-logo.svg";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 md:px-10 xl:px-[70px] bg-black">
      <Image
        src={mobileLogo}
        alt="메인 페이지 모바일 로고 이미지"
        className="block md:hidden"
      />
      <Image
        src={logo}
        alt="메인페이지 로고 이미지"
        className="hidden md:block"
      />
      <nav>
        <ul className="flex gap-6 md:gap-9">
          <li>
            <a
              href="/signin"
              className="text-md text-white hover:text-violet-600 md:text-lg"
            >
              로그인
            </a>
          </li>
          <li>
            <a
              href="/signup"
              className="text-md text-white hover:text-violet-600 md:text-lg "
            >
              회원가입
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
