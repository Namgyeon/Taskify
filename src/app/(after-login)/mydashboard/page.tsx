"use client";

import CreateDashboard from "@/components/dashboard/createDashboard";

const MyDashBoard = () => {
  return (
    <>
      <div className="w-full h-screen p-6 md:p-10 flex flex-col gap-6 bg-[#FAFAFA]">
        <CreateDashboard />
      </div>
    </>
  );
};

export default MyDashBoard;
