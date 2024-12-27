"use server";
import { cookies } from "next/headers";
import { FormState } from "@/app/ui/component/molecule/form/form-root";
import { LogInFormSchema, LogInRequestBody } from "./customer-auth-validation";
import { HttpError } from "@/app/utils/http/http-error";
import { API_PATH } from "@/app/utils/http/api-query";

export async function authenticateCustomer(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = LogInFormSchema.safeParse({
    username: formData.get("username") as string,
    password: formData.get("password") as string,
  });

  // 입력값 검증 실패
  if (!validatedFields.success) {
    return {
      isSuccess: false,
      isFailure: true,
      validationError: validatedFields.error.flatten().fieldErrors,
      message: "양식에 맞춰 다시 입력해주세요.",
    };
  }

  const body: LogInRequestBody = { ...validatedFields.data };
  try {
    const response = await fetch(`${API_PATH}/customer/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("response: ", response);

    // 서버 오류 처리
    if (!response.ok) {
      throw new HttpError(response.status, "서버에러");
    }

    const result = await response.json();

    // 성공적인 로그인 처리
    cookies().set("token", result.token, {
      secure: true,
      path: "/",
    });

    return {
      isSuccess: true,
      isFailure: false,
      validationError: {},
      message: "로그인에 성공했습니다.",
    };
  } catch (error) {
    console.error("error", error);

    if (error instanceof HttpError) {
      switch (error.statusCode) {
        case 401:
          return {
            isSuccess: false,
            isFailure: true,
            validationError: {},
            message: "아이디와 비밀번호가 일치하지 않습니다.",
          };
        case 404:
          return {
            isSuccess: false,
            isFailure: true,
            validationError: {},
            message: "해당 사용자를 찾을 수 없습니다.",
          };
        default:
          return {
            isSuccess: false,
            isFailure: true,
            validationError: {},
            message: "아이디 또는 비밀번호가 올바르지 않습니다.",
          };
      }
    }

    // 알 수 없는 오류
    return {
      isSuccess: false,
      isFailure: true,
      validationError: {},
      message: "알 수 없는 오류가 발생했습니다.",
    };
  }
}
