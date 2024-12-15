import { cookies } from "next/headers";
import { FormState } from "../../ui/component/molecule/form/form-root";

export async function login(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    // email, password 데이터
    const username = formData.get("username");
    const password = formData.get("password");

    // next api 호출
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include", // 쿠키 포함
    });

    if (response.ok) {
      return {
        isSuccess: true,
        isFailure: false,
        message: "로그인 성공",
        validationError: {},
      };
    } else {
      return {
        isSuccess: false,
        isFailure: true,
        message: "로그인 실패",
        validationError: {},
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      isFailure: true,
      message: "서버와 연결 실패",
      validationError: {},
    };
  }
}
