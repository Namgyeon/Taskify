import SignUpForm from "@/components/auth/SignUpForm";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className="flex flex-col gap-6 items-center">
      <SignUpForm />
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
