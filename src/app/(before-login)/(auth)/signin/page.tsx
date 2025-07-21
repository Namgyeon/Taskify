import SigninForm from "@/components/auth/SigninForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Taskify - 로그인",
  description:
    "Taskify에 로그인하고, 함께 일정을 공유하며 생산적인 하루를 시작해 보세요,",
  keywords: ["일정", "공유", "커뮤니티", "할 일", "Taskify"],
  openGraph: {
    title: "Taskify - 로그인",
    description:
      "Taskify에 로그인하고, 함께 일정을 공유하며 생산적인 하루를 시작해 보세요,",
    url: "https://taskify-namgyeon.vercel.app/signin",
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

const SignInPage = () => {
  return (
    <div className="flex flex-col gap-6 items-center">
      <SigninForm />
      <p className="text-[16px] text-[var(--black-333236)] font-[400]">
        회원이 아니신가요?{" "}
        <Link
          href={"/signup"}
          className="text-[var(--violet-5534DA)] underline"
        >
          회원가입하기
        </Link>
      </p>
    </div>
  );
};

export default SignInPage;
