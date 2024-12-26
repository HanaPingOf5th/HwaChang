"use server";

import { cookies } from "next/headers";
import { HttpError } from "@/app/utils/http/http-error";
import { API_PATH } from "@/app/utils/http/api-query";

// 사용자 정보를 가져오는 API
export async function fetchCustomerMyInfo() {
  try {
    const token = cookies().get("token")?.value;

    if (!token) {
      throw new HttpError(401, "토큰이 존재하지 않습니다.");
    }

    const response = await fetch(`${API_PATH}/customer/info`, {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new HttpError(response.status, "사용자 정보를 불러오는데 실패했습니다.");
    }

    const result = await response.json();
    return {
      isSuccess: true,
      data: result,
    };
  } catch (error) {
    console.error("error", error);

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
