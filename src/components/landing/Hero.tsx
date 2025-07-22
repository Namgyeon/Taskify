"use client";

import Image from "next/image";
import Button from "../ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false }}
    >
      <div className="flex flex-col items-center text-white p-11 md:p-25 ">
        <section className="flex flex-col items-center gap-5">
          <div className="max-w-[722px] w-full mx-auto">
            <Image
              src={"/landing/banner_mobile.svg"}
              alt="배너 이미지"
              priority
              width={722}
              height={422}
              className="w-full h-auto"
            />
          </div>
          <span className="flex flex-col md:flex-row items-center md:items-baseline">
            <span className="flex text-[40px] md:text-[40px] lg:text-[76px] font-bold whitespace-nowrap">
              새로운 일정 관리
            </span>
            <span className="mt-2 md:mt-0 md:ml-4 text-[42px] md:text-[64px] lg:text-[90px] text-[#5534DA] font-bold">
              Taskify
            </span>
          </span>
          <div className="mt-10 md:mt-14 w-[235px] md:w-[280px] h-[46px] md:h-[54px] flex items-center justify-center">
            <Link href={"/signin"}>
              <Button>로그인하기</Button>
            </Link>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Hero;
