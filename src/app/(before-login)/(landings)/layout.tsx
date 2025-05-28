import Header from "@/components/landing/layout/Header";
import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Taskify",
  description:
    "Taskify는 가족, 회사, 친구들과 함께 일정을 쉽고 즐겁게 관리할 수 있는 서비스입니다.",
  keywords: ["일정", "공유", "커뮤니티", "할 일", "Taskify"],
  openGraph: {
    title: "Taskify",
    description:
      "Taskify는 가족, 회사, 친구들과 함께 일정을 쉽고 즐겁게 관리할 수 있는 서비스입니다.",
    url: "https://taskify-3ypqbp4os-namgyeons-projects.vercel.app/",
    type: "website",
    //이미지 추가
  },
};

export default function layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
