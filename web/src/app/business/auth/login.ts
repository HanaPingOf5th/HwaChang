"use server";
import { cookies } from "next/headers";
import { FormState } from "@/app/ui/component/molecule/form/form-root";

export async function authenticate(prevState: FormState, formData: FormData): Promise<FormState> {
  // usernmae, password 데이터
  const username = formData["username"];
  const password = formData["password"];
  try {
    const response = await fetch(`/api/customer/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    console.log("response >>>>>>>>>>>>>>>>>", response);
    const result = await response.json();
    cookies().set("accessToken", result.accessToken, {
      secure: true,
      path: "/",
    });
    return {
      isSuccess: true,
      isFailure: false,
      message: "성공",
      validationError: {},
    };
  } catch (error) {
    console.error("error", error);
  }
}
