"use server";

// import { cookies } from "next/headers";
import { HttpError } from "@/app/utils/http/http-error";
import { API_PATH } from "@/app/utils/http/api-query";

// 회원가입 API
export async function signupCustomer({
  name,
  phoneNumber,
  username,
  password,
}: {
  name: string;
  phoneNumber: string;
  username: string;
  password: string;
}) {
  try {
    const response = await fetch(`${API_PATH}/customer/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phoneNumber, username, password }),
    });

    if (response.status === 200) {
      const result = await response.json();
      // 성공 응답 처리
      return {
        isSuccess: true,
        data: result,
      };
    } else {
      const errorData = await response.json();
      throw new HttpError(response.status, errorData.message || "회원가입 실패");
    }
  } catch (error) {
    console.error("회원가입 오류:", error);

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
