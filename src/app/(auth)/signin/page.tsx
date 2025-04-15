import SignInForm from "@/features/auth/components/SignInForm";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="flex flex-col gap-6 items-center">
      <SignInForm />
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
