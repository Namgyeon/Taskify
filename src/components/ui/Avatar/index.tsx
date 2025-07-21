import Image from "next/image";
import { useMemo } from "react";
import getRandomColor from "../../../utils/getRandomColor";

type AvatarProps = {
  profileImageUrl?: string | null;
  email?: string;
  nickname?: string;
  className?: string;
};

const Avatar = ({
  profileImageUrl,
  email,
  nickname,
  className,
  ...props
}: AvatarProps) => {
  const userName = email || nickname || "user";
  const firstChar = userName.charAt(0);

  const bgColor = useMemo(() => getRandomColor(userName), [userName]);

  return (
    <figure
      className={`relative w-[34px] md:w-[38px] aspect-square rounded-full overflow-hidden bg-black border-2 border-white ${className}`}
      {...props}
    >
      {profileImageUrl ? (
        <Image
          src={profileImageUrl}
          alt={userName}
          sizes="100vw"
          fill
          className="object-cover"
        />
      ) : (
        <span
          className="flex justify-center items-center w-full h-full font-semibold uppercase text-white"
          style={{ backgroundColor: bgColor }}
        >
          {firstChar}
        </span>
      )}
    </figure>
  );
};

export default Avatar;
