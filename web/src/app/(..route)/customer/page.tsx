'use client'
import AchromaticButton from "@/app/ui/component/atom/achromatic-button";
import { HouseEmoji, EnterPriseEmoji } from "@/app/ui/component/atom/fluent-emoji";
import { Card, CardContent, CardFooter, CardHeader } from "@/app/ui/component/molecule/card/card";
import Form from "@/app/ui/component/molecule/form/form-index";
import { FormNumberInput } from "@/app/ui/component/molecule/form/form-number-input";
import { FormPasswordInput } from "@/app/ui/component/molecule/form/form-password-input";
import FormSelect from "@/app/ui/component/molecule/form/form-select-index";
import { FormSelectItem } from "@/app/ui/component/molecule/form/form-select-item";
import { FormSubmitButton } from "@/app/ui/component/molecule/form/form-submit-button";
import { FormTextInput } from "@/app/ui/component/molecule/form/form-textinput";
import Link from "next/link";

interface FormState {
    isSuccess: boolean;
    isFailure: boolean;
    message: string | null;
    validationError: Record<string, string[] | undefined>;
  }

export default function Home() {
  function formAction(prevState: FormState, formData: FormData):FormState{
    return {
      isSuccess: true,
      isFailure: false,
      message: "",
      validationError: {}
    }
  }
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl text-center`} >
        컴포넌트 예시
      </h1>
      <div className="text-center py-2">세로(격자)로 배치하기</div>
      <div className={`grid gap-6 grid-cols-3 text-center`}>
        <Card>
        <CardHeader> <p className="text-xl">카드 헤더 제목이 보통 들어갑니다. 클래스 네임으로 위치 조정이 가능해요</p> </CardHeader>
            <CardContent>
            <div className="flex flex-col justify-center items-center">
              <HouseEmoji heignt={200} width={200}/>
              모든 JSX.Elemetnt가 다 이 카드 컨텐츠 섹션안에 들어올 수 있습니다.
              div, form, 버튼 등 모두 다요
            </div>
            </CardContent>
            <CardFooter className="justify-center">
            <AchromaticButton >
                <Link href='/customer/main/enterance?isIndividual=true'>
                상담하러 가기
                </Link>
            </AchromaticButton>
            </CardFooter>
        </Card>
        <Card className="bg-red-100"> 
            {/* 클래스 네임 입력 가능 */}
            <CardHeader> <p className="text-xl">커스텀 카드 컴포넌트</p> </CardHeader>
            <CardContent>
            <div className="flex flex-col justify-center items-center ">
                <EnterPriseEmoji heignt={200} width={200}/>
                보통 구분되어야 할 내용들이 들어갈 떄 사용합니다.
                <p><strong>클래스 네임을 이용하여 색과 크기도 바꿀 수 있습니다.</strong></p>
            </div>
            </CardContent>
            <CardFooter className="justify-center">
            <AchromaticButton>
                <Link href='/customer/main/enterance?isIndividual=false'>
                상담하러 가기
                </Link>
            </AchromaticButton>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader> <p className="text-xl">기업 상담</p> </CardHeader>
            <CardContent>
            <div className="flex flex-col justify-center items-center ">
                <EnterPriseEmoji heignt={200} width={200}/>
            </div>
            </CardContent>
            <CardFooter className="justify-center">
            <AchromaticButton>
                <Link href='/customer/main/enterance?isIndividual=false'>
                상담하러 가기
                </Link>
            </AchromaticButton>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader> <p className="text-xl">기업 상담</p> </CardHeader>
            <CardContent>
            <div className="flex flex-col justify-center items-center ">
                <EnterPriseEmoji heignt={200} width={200}/>
            </div>
            </CardContent>
            <CardFooter className="justify-center">
            <AchromaticButton>
                <Link href='/customer/main/enterance?isIndividual=false'>
                상담하러 가기
                </Link>
            </AchromaticButton>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader> <p className="text-xl">기업 상담</p> </CardHeader>
            <CardContent>
            <div className="flex flex-col justify-center items-center ">
                <EnterPriseEmoji heignt={200} width={200}/>
            </div>
            </CardContent>
            <CardFooter className="justify-center">
            <AchromaticButton>
                <Link href='/customer/main/enterance?isIndividual=false'>
                상담하러 가기
                </Link>
            </AchromaticButton>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader> <p className="text-xl">기업 상담</p> </CardHeader>
            <CardContent>
            <div className="flex flex-col justify-center items-center ">
                <EnterPriseEmoji heignt={200} width={200}/>
            </div>
            </CardContent>
            <CardFooter className="justify-center">
            <AchromaticButton>
                <Link href='/customer/main/enterance?isIndividual=false'>
                상담하러 가기
                </Link>
            </AchromaticButton>
            </CardFooter>
        </Card>
      </div>
      <br></br>


      <div className="text-center py-2">
      -------------------------------------------------------------------------------------
      </div>

      <div className="text-center py-2">가로로 배치하기</div>
      <div className={`grid gap-6 grid-rows-3 text-center`}>
        <Card>
        <CardHeader> <p className="text-xl">개인 상담</p> </CardHeader>
            <CardContent>
            <div className="flex flex-col justify-center items-center">
                <HouseEmoji heignt={200} width={200}/>
            </div>
            </CardContent>
            <CardFooter className="justify-center">
            <AchromaticButton >
                <Link href='/customer/main/enterance?isIndividual=true'>
                상담하러 가기
                </Link>
            </AchromaticButton>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader> <p className="text-xl">기업 상담</p> </CardHeader>
            <CardContent>
            <div className="flex flex-col justify-center items-center ">
                <EnterPriseEmoji heignt={200} width={200}/>
            </div>
            </CardContent>
            <CardFooter className="justify-center">
            <AchromaticButton>
                <Link href='/customer/main/enterance?isIndividual=false'>
                상담하러 가기
                </Link>
            </AchromaticButton>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader> <p className="text-xl">기업 상담</p> </CardHeader>
            <CardContent>
            <div className="flex flex-col justify-center items-center ">
                <EnterPriseEmoji heignt={200} width={200}/>
            </div>
            </CardContent>
            <CardFooter className="justify-center">
            <AchromaticButton>
                <Link href='/customer/main/enterance?isIndividual=false'>
                상담하러 가기
                </Link>
            </AchromaticButton>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader> <p className="text-xl">기업 상담</p> </CardHeader>
            <CardContent>
            <div className="flex flex-col justify-center items-center ">
                <EnterPriseEmoji heignt={200} width={200}/>
            </div>
            </CardContent>
            <CardFooter className="justify-center">
            <AchromaticButton>
                <Link href='/customer/main/enterance?isIndividual=false'>
                상담하러 가기
                </Link>
            </AchromaticButton>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader> <p className="text-xl">기업 상담</p> </CardHeader>
            <CardContent>
            <div className="flex flex-col justify-center items-center ">
                <EnterPriseEmoji heignt={200} width={200}/>
            </div>
            </CardContent>
            <CardFooter className="justify-center">
            <AchromaticButton>
                <Link href='/customer/main/enterance?isIndividual=false'>
                상담하러 가기
                </Link>
            </AchromaticButton>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader> <p className="text-xl">기업 상담</p> </CardHeader>
            <CardContent>
            <div className="flex flex-col justify-center items-center ">
                <EnterPriseEmoji heignt={200} width={200}/>
            </div>
            </CardContent>
            <CardFooter className="justify-center">
            <AchromaticButton>
                <Link href='/customer/main/enterance?isIndividual=false'>
                상담하러 가기
                </Link>
            </AchromaticButton>
            </CardFooter>
        </Card>
      </div>

      <div className="text-center py-2">
      -------------------------------------------------------------------------------------
      </div>

      <div className="text-center py-2">가로 세로 혼합 배치하기</div>
      <div className={`grid gap-6 grid-cols-3 text-center`}>
        <Card>
            <CardHeader> <p className="text-xl">기업 상담</p> </CardHeader>
            <CardContent>
            <div className="flex flex-col justify-center items-center ">
                <EnterPriseEmoji heignt={200} width={200}/>
            </div>
            </CardContent>
            <CardFooter className="justify-center">
            <AchromaticButton>
                <Link href='/customer/main/enterance?isIndividual=false'>
                상담하러 가기
                </Link>
            </AchromaticButton>
            </CardFooter>
        </Card>
        <div className={`grid gap-6 grid-rows-3 text-center`}>
            <Card>
                <CardHeader> <p className="text-xl">기업 상담</p> </CardHeader>
                <CardContent>
                <div className="flex flex-col justify-center items-center ">
                    <EnterPriseEmoji heignt={200} width={200}/>
                </div>
                </CardContent>
                <CardFooter className="justify-center">
                <AchromaticButton>
                    <Link href='/customer/main/enterance?isIndividual=false'>
                    상담하러 가기
                    </Link>
                </AchromaticButton>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader> <p className="text-xl">기업 상담</p> </CardHeader>
                <CardContent>
                <div className="flex flex-col justify-center items-center ">
                    <EnterPriseEmoji heignt={200} width={200}/>
                </div>
                </CardContent>
                <CardFooter className="justify-center">
                <AchromaticButton>
                    <Link href='/customer/main/enterance?isIndividual=false'>
                    상담하러 가기
                    </Link>
                </AchromaticButton>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader> <p className="text-xl">기업 상담</p> </CardHeader>
                <CardContent>
                <div className="flex flex-col justify-center items-center ">
                    <EnterPriseEmoji heignt={200} width={200}/>
                </div>
                </CardContent>
                <CardFooter className="justify-center">
                <AchromaticButton>
                    <Link href='/customer/main/enterance?isIndividual=false'>
                    상담하러 가기
                    </Link>
                </AchromaticButton>
                </CardFooter>
            </Card>
        </div>
        <Card>
            <CardHeader> <p className="text-xl">기업 상담</p> </CardHeader>
            <CardContent>
            <div className="flex flex-col justify-center items-center ">
                <EnterPriseEmoji heignt={200} width={200}/>
            </div>
            </CardContent>
            <CardFooter className="justify-center">
            <AchromaticButton>
                <Link href='/customer/main/enterance?isIndividual=false'>
                상담하러 가기
                </Link>
            </AchromaticButton>
            </CardFooter>
        </Card>
      </div>

      <div className="text-center py-2">
      --------------------------------------- 버튼 ----------------------------------------------
      </div>

      <div className="space-x-10">
        <AchromaticButton > 기본 버튼 1</AchromaticButton>
        <AchromaticButton className="bg-red-100 hover:bg-red-200 text-slate-700"> 색상 바꾼 버튼 2</AchromaticButton>
      </div>

      <div className="text-center py-2">
      --------------------------------------- Form ----------------------------------------------
      </div>
      <Form id={"form"} action={formAction} failMessageControl={"toast"}>
        <Card>
            <CardHeader>Card Header: 제출 할 폼의 이름</CardHeader>
            <CardContent>
                <p>(Card Contents: 이곳에 보통 입력 인풋들이 들어갑니다.)</p>
                <br></br>
                <FormTextInput label={"텍스트 입력입니다."} id={"id"} placeholder={"플레이스 홀더입니다."}></FormTextInput>
                <FormNumberInput label={"숫자 입력입니다."} id={"id"} placeholder={"플레이스 홀더입니다."}></FormNumberInput>
                <FormPasswordInput label={"비밀번호 제목입니다."} id={"id"} placeholder={"플레이스 홀더입니다."}></FormPasswordInput>
                <FormTextInput label={"텍스트 입력입니다."} id={"id"} placeholder={"플레이스 홀더입니다."}></FormTextInput>
            </CardContent>
            <CardFooter>
                <FormSubmitButton label={"제출"}></FormSubmitButton>
            </CardFooter>
        </Card>
      </Form>

      <div className="text-center py-2">
      --------------------------------------- Form ----------------------------------------------
      </div>
      <FormSelect placeholder={"안녕"}>
        <FormSelectItem value={"안녕하십니까"} placeholder={"안녕"}></FormSelectItem>
        <FormSelectItem value={"안녕하십니까"} placeholder={"안녕하십니까"}></FormSelectItem>
      </FormSelect>
      <br></br>
      <div className="text-center py-2">
      --------------------------------------- Form또한 반응형이라 레이아웃에 맞추어 샤이즈 조절가능합니다.----------------------------------------------
      </div>
      <div className={`grid gap-6 grid-cols-3 text-center`}>
        <FormSelect placeholder={"안녕"}>
            <FormSelectItem value={"안녕하십니까"} placeholder={"안녕"}></FormSelectItem>
            <FormSelectItem value={"안녕하십니까"} placeholder={"안녕하십니까"}></FormSelectItem>
        </FormSelect>
        <FormSelect placeholder={"안녕"}>
            <FormSelectItem value={"안녕하십니까"} placeholder={"안녕"}></FormSelectItem>
            <FormSelectItem value={"안녕하십니까"} placeholder={"안녕하십니까"}></FormSelectItem>
        </FormSelect>
        <FormSelect placeholder={"안녕"}>
            <FormSelectItem value={"안녕하십니까"} placeholder={"안녕"}></FormSelectItem>
            <FormSelectItem value={"안녕하십니까"} placeholder={"안녕하십니까"}></FormSelectItem>
        </FormSelect>
      </div>

      <div className="text-center py-2">
      --------------------------------------- End ----------------------------------------------
      </div>
    </main>
  );
}
