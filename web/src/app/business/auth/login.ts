"use server";
import { cookies } from "next/headers";
import { FormState } from "@/app/ui/component/molecule/form/form-root";
import { LogInFormSchema, LogInRequestBody } from "./auth-validation";
import { HttpError } from "@/app/utils/http/http-error";

export async function authenticateTeller(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = LogInFormSchema.safeParse({
    tellerNumber: formData.get("tellerNumber") as string,
    password: formData.get("password") as string
  })

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      isFailure: true,
      validationError: validatedFields.error.flatten().fieldErrors,
      message: '양식에 맞춰 다시 입력해주세요.',
    };
  }

  const body:LogInRequestBody = {...validatedFields.data};
  try {
    const response = await fetch(`http://localhost:8080/teller/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log("response: ", response);
    if(!response.ok){
      throw new HttpError(response.status, '서버에러');
    }

    const result = await response.json();

    cookies().set("token", result.token, {
      secure: true,
      path: "/",
    });
    return{
      isSuccess: true,
      isFailure: false,
      validationError: {},
      message: '로그인에 성공했습니다.'
    }
  } catch (error) {
    console.error("error", error);
    if(error instanceof HttpError && error.statusCode === 404){
      return {
        isSuccess: false,
        isFailure: true,
        validationError: {},
        message: '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요',
      };
    }
  }
}
