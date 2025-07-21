import InvitedDashboardSection from "@/components/dashboard/InvitedDashboardSection";
import MyDashboard from "@/components/dashboard/MyDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Taskify - 내 대시보드",
  description: "Taskify 내 대시보드에서 개인 일정을 쉽고 편하게 관리해 보세요.",
  keywords: ["일정", "공유", "커뮤니티", "할 일", "Taskify"],
  openGraph: {
    title: "Taskify - 내 대시보드",
    description:
      "Taskify 내 대시보드에서 개인 일정을 쉽고 편하게 관리해 보세요.",
    url: "https://taskify-namgyeon.vercel.app/mydashboard",
    type: "website",
    images: [
      {
        url: "https://taskify-namgyeon.vercel.app/meta.png",
        width: 1200,
        height: 630,
        alt: "Taskify 대시보드 페이지 이미지",
      },
    ],
  },
};

const MyDashBoard = () => {
  return (
    <>
      <div className="w-full h-screen p-6 md:p-10 flex flex-col gap-6 bg-[#FAFAFA]">
        <MyDashboard />
        <InvitedDashboardSection />
      </div>
    </>
  );
};

export default MyDashBoard;
