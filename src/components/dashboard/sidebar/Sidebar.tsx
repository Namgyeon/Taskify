import SidebarBoardLists from "./SidebarBoardList";
import SidebarHeader from "./SidebarHeader";
import SidebarLogo from "./SidebarLogo";

const DashBoardSideBar = () => {
  return (
    <div className="h-screen flex flex-col gap-2 items-center border-r border-r-gray-300 ">
      <SidebarLogo />
      <SidebarHeader />
      <SidebarBoardLists />
    </div>
  );
};

export default DashBoardSideBar;
