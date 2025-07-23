import BackButton from "@/components/edit/BackButton";
import PasswordManagement from "@/components/mypage/PasswordManagement";
import ProfileManagement from "@/components/mypage/ProfileManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Taskify - 마이페이지",
  description: "Taskify 마이페이지에서 개인 정보를 관리해 보세요.",
  keywords: ["일정", "공유", "커뮤니티", "할 일", "Taskify"],
  openGraph: {
    title: "Taskify - 마이페이지",
    description: "Taskify 마이페이지에서 개인 정보를 관리해 보세요.",
    url: "https://taskify-namgyeon.vercel.app/mypage",
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

const MyPage = () => {
  return (
    <div className="p-5 flex flex-col gap-4">
      <BackButton href="/mydashboard" />
      <ProfileManagement />
      <PasswordManagement />
    </div>
  );
};

export default MyPage;
