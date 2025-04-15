// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
import apiClient from "@/lib/api/apiClient"; // 실제 axios client
import { AxiosError } from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await apiClient.post("/auth/login", body);
    const accessToken = response.data.accessToken;

    const res = NextResponse.json({ message: "로그인 성공" });

    res.headers.set(
      "Set-Cookie",
      serialize("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        path: "/",
        maxAge: 60 * 60 * 4,
      })
    );

    return res;
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.message || "로그인 실패"
        : "예상치 못한 에러";

    return NextResponse.json({ message: errorMessage }, { status: 401 });
  }
}
