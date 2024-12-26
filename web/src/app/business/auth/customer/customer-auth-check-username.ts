"use server";

import { HttpError } from "@/app/utils/http/http-error";
import { API_PATH } from "@/app/utils/http/api-query";

// 아이디 중복 확인 API
export async function checkUsernameAvailability({ username }: { username: string }) {
  try {
    const response = await fetch(`${API_PATH}/customer/check-username`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    if (response.status === 200) {
      const result = await response.json();
      // 성공 응답 처리
      return {
        isAvailable: true,
        data: result,
      };
    } else if (response.status === 409) {
      // 409 Conflict: 이미 존재하는 아이디
      return {
        isAvailable: false,
        message: "이미 존재하는 사용자 이름입니다.",
      };
    } else {
      const errorData = await response.json();
      throw new HttpError(response.status, errorData.message || "아이디 중복 확인 실패");
    }
  } catch (error) {
    console.error("아이디 중복 확인 오류:", error);

    if (error instanceof HttpError) {
      return {
        isAvailable: false,
        message: error.message,
      };
    }

    return {
      isAvailable: false,
      message: "알 수 없는 오류가 발생했습니다.",
    };
  }
}
