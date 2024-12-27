"use server";

import { cookies } from "next/headers";
import { HttpError } from "@/app/utils/http/http-error";
import { API_PATH } from "@/app/utils/http/api-query";

// 로그아웃 API
export async function logoutCustomer() {
  try {
    const token = cookies().get("token")?.value;

    if (!token) {
      throw new HttpError(401, "토큰이 존재하지 않습니다.");
    }

    const response = await fetch(`${API_PATH}/customer/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      // 쿠키 삭제
      cookies().delete("token");

      const result = await response.json();
      // 성공 응답 처리
      return {
        isSuccess: true,
        data: result,
      };
    } else {
      const errorData = await response.json();
      throw new HttpError(response.status, errorData.message || "로그아웃 실패");
    }
  } catch (error) {
    console.error("로그아웃 오류:", error);

    if (error instanceof HttpError) {
      return {
        isSuccess: false,
        message: error.message,
      };
    }

    return {
      isSuccess: false,
      message: "알 수 없는 오류가 발생했습니다.",
    };
  }
}