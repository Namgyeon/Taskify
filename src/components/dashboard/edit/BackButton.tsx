import Image from "next/image";
import Link from "next/link";

const BackButton = ({ href }: { href: string }) => {
  return (
    <Link href={href}>
      <div className="inline-flex px-1 py-1 items-center gap-1 rounded hover:bg-gray-200 transition-colors">
        <Image
          src="/edit/back-icon.svg"
          alt="뒤로가기 아이콘"
          width={20}
          height={20}
        />
        <p className="font-medium text-[#333236]">돌아가기</p>
      </div>
    </Link>
  );
};

export default BackButton;
