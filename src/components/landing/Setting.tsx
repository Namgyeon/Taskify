"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type SettingCardProps = {
  title: string;
  description: string;
  imgSrc: string;
};

const SettingCard = ({ title, description, imgSrc }: SettingCardProps) => {
  return (
    <article className="flex flex-col rounded-lg bg-[#4B4B4B]">
      <div className="p-8 flex-1/2">
        <Image
          src={imgSrc}
          alt="setting이미지"
          width={200}
          height={200}
          priority
          className="w-full h-auto"
        />
      </div>
      <div className="flex flex-col flex-1/2 gap-4.5 p-7 bg-[#171717]">
        <h2 className="text-lg font-bold text-white">{title}</h2>
        <p className="text-md font-medium text-white">{description}</p>
      </div>
    </article>
  );
};

const Setting = () => {
  return (
    <div className="flex flex-col max-w-[378px] lg:max-w-full mx-auto gap-10  p-4">
      <h1 className="text-center text-xl md:text-[28px] text-white font-bold">
        생산성을 높이는 다양한 설정 ⚡
      </h1>
      <div className="flex flex-col lg:flex-row gap-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: false }}
        >
          <SettingCard
            imgSrc="/landing/setting-1.svg"
            title="대시보드 설정"
            description="대시보드 사진과 이름을 변경할 수 있어요."
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: false }}
        >
          <SettingCard
            imgSrc="/landing/setting-2.svg"
            title="초대"
            description="새로운 팀원을 초대할 수 있어요."
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: false }}
        >
          <SettingCard
            imgSrc="/landing/setting-3.svg"
            title="구성원"
            description="구성원을 초대하고 내보낼 수 있어요."
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Setting;
