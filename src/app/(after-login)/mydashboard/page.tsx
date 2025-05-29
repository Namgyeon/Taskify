"use client";

import { useLogout } from "@/apis/auth/queries";
import { useRouter } from "next/navigation";

const MyDashBoard = () => {
  const logoutMutation = useLogout();
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col gap-6 items-center">대쉬보드</div>
    </>
  );
};

export default MyDashBoard;
