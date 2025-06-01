import Header from "@/components/mydashboard/header/Header";
import DashBoardSideBar from "@/components/mydashboard/sidebar/Sidebar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-full flex">
      <div className="w-[67px] md:w-[160px] lg:w-[300px]">
        <DashBoardSideBar />
      </div>
      <main className="w-full">
        <Header />
        {children}
      </main>
    </div>
  );
}
