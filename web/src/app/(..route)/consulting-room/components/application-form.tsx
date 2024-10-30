'use client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/ui/component/molecule/card/card";
import Form from "@/app/ui/component/molecule/form/form-index";
import { FormState } from "@/app/ui/component/molecule/form/form-root";
import { FormSubmitButton } from "@/app/ui/component/molecule/form/form-submit-button";
import { FormTextInput } from "@/app/ui/component/molecule/form/form-textinput";
import { cn } from "@/app/utils/style";

interface ViewProps{
  isTop?: boolean;
}

export function ApplicationForm(){
  function submit(prevState:FormState, formData:FormData):FormState{
    console.log('제출되었습니다.');
    alert('제출완료.')
    return{
      isSuccess: true,
      isFailure: false,
      message: '성공적으로 신청했습니다.',
      validationError:{}
    }
  };
  return(
    <>
      {/* 은행원 화면 ToDo: 배경 이미지 대신 웹소켓으로 받은 실시간 데이터를 보여주기 */}
      <Card className="h-[520px] overflow-y-auto">
        <CardHeader className="text-center font-semibold">예적금 신청서</CardHeader>
        <Form id={"application-form"} action={submit} failMessageControl={"alert"}>
          <CardContent className="text-start">
            <div className={cn('')}/>
              <div className="grid gird-rows-1 gap-6">
                <div>
                  <p>고객정보</p>
                  <hr className="my-3 border-t-2 border-gray-300" />
                  <div className="grid gird-row-1 gap-2">
                  <FormTextInput id={""} placeholder={""} label="성명"/>
                  <FormTextInput id={""} placeholder={""} label="주민번호"/>
                  <FormTextInput id={""} placeholder={""} label="주소"/>
                  </div>
                </div>

                <div>
                  <p>고객정보</p>
                  <hr className="my-3 border-t-2 border-gray-300" />
                  <div className="grid gird-row-1 gap-2">
                  <FormTextInput id={""} placeholder={""} label="성명"/>
                  <FormTextInput id={""} placeholder={""} label="주민번호"/>
                  <FormTextInput id={""} placeholder={""} label="주소"/>
                  </div>
                </div>

                <div>
                  <p>고객정보</p>
                  <hr className="my-3 border-t-2 border-gray-300" />
                  <div className="grid gird-row-1 gap-2">
                  <FormTextInput id={""} placeholder={""} label="성명"/>
                  <FormTextInput id={""} placeholder={""} label="주민번호"/>
                  <FormTextInput id={""} placeholder={""} label="주소"/>
                  </div>
                </div>
              </div>
          </CardContent>
          <CardFooter>
            <FormSubmitButton label={"제출"}/>
          </CardFooter>
        </Form>
      </Card>
    </>
  )
}