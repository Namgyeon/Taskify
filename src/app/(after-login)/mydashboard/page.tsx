"use client";

import { useLogout } from "@/apis/auth/queries";

const MyDashBoard = () => {
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    logoutMutation.mutate();
    window.location.reload();
  };

  return (
    <>
      <div className="flex flex-col gap-6 items-center">대쉬보드</div>
      <button onClick={handleLogout}>로그아웃</button>
    </>
  );
};

export default MyDashBoard;
