'use server'
import { FormState } from "@/app/ui/component/molecule/form/form-root";
import { instance } from "@/app/utils/http";

export async function sendReview(prevState: FormState, formData: FormData): Promise<FormState> {
    const content = formData.get('review-content') as string;
    const nps = formData.get('nps') as string;
    const consultingRoomId = formData.get("consulting-room") as string;
    const userId = formData.get("user-id") as string;
    const tellerId = formData.get("teller-id") as string;

    const response = await instance.post(`${process.env.API_URL}/consulting-room/review`, {customerId: consultingRoomId, nps: nps, content:content, consultingRoomId:userId, tellerId:tellerId})
    console.log(response);

    return {
      isSuccess: true,
      isFailure: false,
      message: "",
      validationError: {},
    };
  }