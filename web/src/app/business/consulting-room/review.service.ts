'use server'
import { FormState } from "@/app/ui/component/molecule/form/form-root";
import { instance } from "@/app/utils/http";
import { API_PATH } from "@/app/utils/http/api-query";

export async function sendReview(prevState: FormState, formData: FormData): Promise<FormState> {
    const content = formData.get('review-content') as string;
    const nps = formData.get('nps') as string;
    const consultingRoomId = formData.get("consulting-room") as string;
    const tellerId = formData.get("teller-id") as string;

    const response = await instance.post(`${API_PATH}/consulting-room/review`, {nps: nps, content:content, consultingRoomId:consultingRoomId, tellerId:tellerId})
    console.log(response);

    return {
      isSuccess: true,
      isFailure: false,
      message: "",
      validationError: {},
    };
  }