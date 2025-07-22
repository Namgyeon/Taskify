import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <section className="min-h-screen w-full flex flex-col items-center justify-center gap-7.5">
        <div className="flex flex-col items-center gap-2.5">
          <Link href="/">
            <Image
              src="/logo/logo.svg"
              alt="로고 이미지"
              width={200}
              height={280}
              priority
            />
          </Link>
          <p className="text-xl font-medium text-[var(--black-333236)]">
            오늘도 만나서 반가워요!
          </p>
        </div>
        <div className="max-w-[520px] w-full">{children}</div>
      </section>
    </main>
  );
}
