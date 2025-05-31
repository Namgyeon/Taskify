import Header from "@/components/mydashboard/header/Header";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-full">
      {/* 사이드 */}
      <main>
        <Header />
        {children}
      </main>
    </div>
  );
}
