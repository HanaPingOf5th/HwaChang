import { useEffect, useState } from "react";
import AchromaticButton from "../component/atom/button/achromatic-button";
import { Card, CardContent, CardFooter, CardHeader } from "../component/molecule/card/card";
import Form from "../component/molecule/form/form-index";
import { FormState } from "../component/molecule/form/form-root";
import { FormSubmitButton } from "../component/molecule/form/form-submit-button";
// import { FormTextInput } from "../component/molecule/form/form-textinput";
import Link from "next/link";

export function ReviewModal(){
  const numbers:number[] = [1,2,3,4,5,6,7,8,9,10];
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    // isSubmitted가 true일 때 메인 페이지로 이동
    if (isSubmitted) {
      window.location.href = "/customer/main"; // 메인 페이지로 리다이렉션
    }
  }, [isSubmitted]);
  // 제출 버튼 클릭 함수
  function reviewAction(prevState: FormState, formData: FormData): FormState {
    const textValue = formData.get('ss');

    console.log('입력한 점수:',currentScore, '리뷰내용:',textValue);
    alert(`${currentScore} and ${textValue}`);
    setIsSubmitted(true);
    return {
      isSuccess: true,
      isFailure: false,
      message: "",
      validationError: {},
    };
  }
  // 1~10 버튼 구현
  const scores:JSX.Element[] = numbers.map((num, index)=>{
    return (
    <div key={index}>
      <AchromaticButton
        className={`w-10 h-10 text-xl font-bold bg-hwachang-green ${currentScore == num ? 'bg-hwachang-darkgreen' : 'bg-hwachang-green'}`} 
        onClick={()=>{setCurrentScore(num)}}
        type='button'
      >
        {num}
      </AchromaticButton>
    </div>
    )
  })
  
  return(
    <>
      <Card className="justify-items-center w-full h-full rounded-none border-white shadow-none ">
        <CardHeader>
        <p className="text-center font-bold text-xl">이 서비스를 친구, 동료 등 주변인에게 추천하고 싶으신가요?</p>
        <p className="text-center font-semibold text-l ">추천 정도를 1~10점으로 선택해주세요.</p>
        </CardHeader>
        
        <Form id={"review"} action={reviewAction} failMessageControl={"alert"}>
        <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-4">
            {scores}
            </div>
        </CardContent>
          <CardContent>
          {/* FormTextInput 대신 textarea 사용
          <FormTextInput className="w-96" id="textValue" placeholder={"해당 점수를 준 사유를 자세히 작성해주세요."}/>
          */}
          
          <textarea 
            name='ss'
            className="w-full h-56 p-4 text-gray-600 bg-hwachang-brightgreen border-none rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 resize-none"
            placeholder="해당 점수를 준 사유를 자유롭게 입력해 주세요."
          >
          </textarea>
          </CardContent>

          <CardFooter className="justify-center">
            <div className="grid grid-cols-2 gap-6 items-center">
              <Link href='/customer/main'>
                <AchromaticButton className="bg-hwachang-hanasilver text-md hover:bg-hwachang-hwachanggray lg:w-40 h-6 size-auto w-24 rounded-2xl " type="button">건너뛰기</AchromaticButton>
              </Link>
              <FormSubmitButton className="bg-hwachang-darkgreen text-md lg:w-40 size-auto w-24 rounded-2xl" label={"제출하기"} position="center"/>
            </div>
          </CardFooter>
        </Form>
      </Card>
    </>
  )
}