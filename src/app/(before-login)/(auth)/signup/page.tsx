import SignupForm from "@/components/auth/SignupForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Taskify - 회원가입",
  description:
    "새 계정을 만들고, Taskify 함께 일정을 공유하며 생산적인 하루를 관리해 보세요,",
  keywords: ["일정", "공유", "커뮤니티", "할 일", "Taskify"],
  openGraph: {
    title: "Taskify - 회원가입",
    description:
      "새 계정을 만들고, Taskify 함께 일정을 공유하며 생산적인 하루를 관리해 보세요,",
    url: "https://taskify-namgyeon.vercel.app/signup",
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

const SignUpPage = () => {
  return (
    <div className="flex flex-col gap-6 items-center">
      <SignupForm />
      <p className="text-[16px] text-[var(--black-333236)]">
        이미 회원이신가요?{" "}
        <Link href="/signin" className="text-[var(--violet-5534DA)] underline">
          로그인하기
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
