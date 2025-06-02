import SidebarHeader from "./SidebarHeader";
import SidebarLogo from "./SidebarLogo";

const DashBoardSideBar = () => {
  return (
    <div className="h-screen flex flex-col gap-2 items-center border-r border-r-gray-300 ">
      <SidebarLogo />
      <SidebarHeader />
    </div>
  );
};

export default DashBoardSideBar;
