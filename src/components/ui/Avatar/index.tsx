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
  const userName = nickname || email || "user";
  const firstChar = userName.charAt(0);

  const bgColor = useMemo(() => getRandomColor(userName), [userName]);

  return (
    <figure
      className={`relative w-[34px] md:w-[38px] aspect-square rounded-full overflow-hidden bg-black border-2 border-white ${className}`}
      style={{ backgroundColor: bgColor }}
      {...props}
    >
      <span className="flex justify-center items-center w-full h-full font-semibold uppercase text-white">
        {firstChar}
      </span>
      {profileImageUrl && (
        <Image
          src={profileImageUrl}
          alt={userName}
          sizes="40px"
          priority
          fill
          className="object-cover"
          onError={(e) => e.currentTarget.remove()}
        />
      )}
    </figure>
  );
};

export default Avatar;
