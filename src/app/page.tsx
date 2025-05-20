"use client";

import apiClient from "@/lib/api/apiClient";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const textGetMy = async () => {
      try {
        const res = await apiClient.get("/users/me");
        console.log(res.data);
      } catch (err) {
        console.error("실패:", err);
      }
    };

    textGetMy();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <p>홈페이지</p>
    </div>
  );
}
