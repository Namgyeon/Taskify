import Header from "@/components/dashboard/header/Header";
import DashBoardSideBar from "@/components/dashboard/sidebar/Sidebar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <div className="w-[67px] md:w-[160px] lg:w-[300px]">
        <DashBoardSideBar />
      </div>

      <main className="flex flex-col flex-1 overflow-y-auto bg-[#FAFAFA]">
        <div className="sticky top-0 z-10 bg-white">
          <Header />
        </div>
        <div className="flex-1 min-h-0">{children}</div>
      </main>
    </div>
  );
}
