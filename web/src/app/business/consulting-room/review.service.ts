'use server'
import { FormState } from "@/app/ui/component/molecule/form/form-root";
import { instance } from "@/app/utils/http";

export async function sendReview(prevState: FormState, formData: FormData): Promise<FormState> {
    const contentValue = formData.get('review-content') as string;
    const npsValue = formData.get('nps') as string;
    const consultingRoomIdValue = formData.get("consulting-room") as string;
    const userIdValue = formData.get("user-id") as string;

    const response = await instance.post(`${process.env.API_URL}/consulting-room/review`, {customerId: consultingRoomIdValue, nps: npsValue, content:contentValue, consultingRoomId:userIdValue})
    console.log(response);

    return {
      isSuccess: true,
      isFailure: false,
      message: "",
      validationError: {},
    };
  }