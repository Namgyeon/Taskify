"use client";

import { useLogout } from "@/apis/auth/queries";
import { useRouter } from "next/navigation";

const MyDashBoard = () => {
  const logoutMutation = useLogout();
  const router = useRouter();

  const handleLogout = async () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.replace("/signin");
      },
    });
  };

  return (
    <>
      <div className="flex flex-col gap-6 items-center">대쉬보드</div>
      <button onClick={handleLogout}>로그아웃</button>
    </>
  );
};

export default MyDashBoard;
