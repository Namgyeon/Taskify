import Image from "next/image";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 md:px-10 xl:px-[70px] bg-black">
      <Image
        src="/logo/main-mobile-logo.svg"
        alt="메인 페이지 모바일 로고 이미지"
        width={30}
        height={30}
        className="block md:hidden"
      />
      <Image
        src="logo/main-logo.svg"
        alt="메인페이지 로고 이미지"
        width={100}
        height={50}
        style={{ width: "100px", height: "50px" }}
        className="hidden md:block"
      />
      <nav>
        <ul className="flex gap-6 md:gap-9">
          <li>
            <a
              href="/signin"
              className="text-md md:text-lg text-white hover:text-violet-600"
            >
              로그인
            </a>
          </li>
          <li>
            <a
              href="/signup"
              className="text-md md:text-lg text-white hover:text-violet-600"
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
