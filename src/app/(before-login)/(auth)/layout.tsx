import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen w-full py-10 flex flex-col items-center justify-center gap-7.5">
      <header className="flex flex-col items-center gap-2.5">
        <Link href="/">
          <Image
            src="/logo/logo.svg"
            alt="로고 이미지"
            width={200}
            height={280}
            sizes="(max-width: 768px) 160px, 200px"
            className="w-40 h-56 md:w-50 md:h-64"
            priority
          />
        </Link>
        <p className="text-xl font-medium text-[var(--black-333236)]">
          오늘도 만나서 반가워요!
        </p>
      </header>
      <div className="max-w-[520px] w-full px-4">{children}</div>
    </main>
  );
}
