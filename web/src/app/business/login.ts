import { FormState } from "../ui/component/molecule/form/form-root";

export async function login(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  console.log(prevState);
  console.log(formData);
  return {
    isSuccess: true,
    isFailure: false,
    message: "login",
    validationError: ["string"],
  };
}
