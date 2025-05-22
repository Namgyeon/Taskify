import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col md:flex-row items-center md:justify-between">
      <div>
        <p className="text-md font-normal text-[#9FA6B2]">@codeit - 2023</p>
      </div>
      <div className="mt-3 md:mt-0">
        <ul className="flex gap-5">
          <li className="text-md font-normal text-[#9FA6B2]">Privacy Policy</li>
          <li className="text-md font-normal text-[#9FA6B2]">FAQ</li>
        </ul>
      </div>
      <div className="mt-15 md:mt-0">
        <ul className="flex gap-5">
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Image
                src={"/landing/message-icon.svg"}
                alt="메시지아이콘"
                width={20}
                height={20}
              />
            </a>
          </li>
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Image
                src={"/landing/facebook-icon.svg"}
                alt="페이스북아이콘"
                width={20}
                height={20}
              />
            </a>
          </li>
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Image
                src={"/landing/Instagram-icon.svg"}
                alt="인스타그램아이콘"
                width={20}
                height={20}
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
