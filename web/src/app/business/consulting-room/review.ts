import { FormState } from "@/app/ui/component/molecule/form/form-root";

export async function sendReview(prevState: FormState, formData: FormData): Promise<FormState> {
    const textValue = formData.get('review-content') as string;

    const body = JSON.stringify({customerId: "sad", npm: 2, content:"sadasdas", consultingRoomId:"asda"})

    // ToDO: axios instance 로 변경하기 
    const response = await fetch('/api/consulting-room/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      })
    
    
    alert(`${textValue} and ${response}`);
    return {
      isSuccess: true,
      isFailure: false,
      message: "",
      validationError: {},
    };
  }