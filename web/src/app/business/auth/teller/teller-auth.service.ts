"use server";
import { cookies } from "next/headers";
import { FormState } from "@/app/ui/component/molecule/form/form-root";
import { LogInFormSchema, LogInRequestBody } from "./teller-auth-validation";
import { HttpError } from "@/app/utils/http/http-error";
import { API_PATH } from "@/app/utils/http/api-query";

export async function authenticateTeller(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = LogInFormSchema.safeParse({
    tellerNumber: formData.get("tellerNumber") as string,
    password: formData.get("password") as string,
  });

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      isFailure: true,
      validationError: validatedFields.error.flatten().fieldErrors,
      message: "입력값을 확인하고 다시 시도해주세요.",
    };
  }

  const body: LogInRequestBody = { ...validatedFields.data };
  try {
    const response = await fetch(`${API_PATH}/teller/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("response: ", response);

    if (!response.ok) {
      throw new HttpError(response.status, "서버 오류");
    }

    const result = await response.json();

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

    if (error instanceof HttpError && error.statusCode === 404) {
      return {
        isSuccess: false,
        isFailure: true,
        validationError: {},
        message: "로그인 실패: 사원번호와 비밀번호를 확인해주세요.",
      };
    }

    return {
      isSuccess: false,
      isFailure: true,
      validationError: {},
      message: "아이디 또는 비밀번호가 올바르지 않습니다.",
    };
  }
}
