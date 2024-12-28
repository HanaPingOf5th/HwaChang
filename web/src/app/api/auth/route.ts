import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch("/api/customer/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      const response = NextResponse.json({ message: data.message }, { status: 200 });

      // 쿠키에 JWT 저장
      response.cookies.set("jwt", data.token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 1일
      });

      return response;
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    return NextResponse.json({ message: "로그인 중 오류 발생." }, { status: 500 });
  }
}
