'use server'
import { FormState } from "@/app/ui/component/molecule/form/form-root";
import { instance } from "@/app/utils/http";

export async function sendReview(prevState: FormState, formData: FormData): Promise<FormState> {
    const contentValue = formData.get('review-content') as string;
    const response = await instance.post('http://localhost:8080/consulting-room/review', {customerId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d", npm: 2, content:contentValue, consultingRoomId:"9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"})
    console.log(response);

    return {
      isSuccess: true,
      isFailure: false,
      message: "",
      validationError: {},
    };
  }