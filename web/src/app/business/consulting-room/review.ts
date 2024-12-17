import { FormState } from "@/app/ui/component/molecule/form/form-root";
import { instance } from "@/app/utils/http";

export async function sendReview(prevState: FormState, formData: FormData): Promise<FormState> {
    const textValue = formData.get('review-content') as string;
    const body = JSON.stringify({customerId: "sad", npm: 2, content:"sadasdas", consultingRoomId:"asda"})
    const response = instance.post('http://localhost:8080/consulting-room/review', body)
    
    alert(`${textValue} and ${response}`);
    return {
      isSuccess: true,
      isFailure: false,
      message: "",
      validationError: {},
    };
  }