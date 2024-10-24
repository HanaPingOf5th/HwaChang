'use client'
import AchromaticButton from "@/app/ui/component/atom/button/achromatic-button";
import { Card, CardContent, CardFooter, CardHeader } from "@/app/ui/component/molecule/card/card";
import { useSearchParams } from "next/navigation";

export default function Home() {
  //To-Do: userSearchParam 이용해서 isIndividual의 값에 따라 컴포넌트 내에서 다른 내용 보여주기
  const params = useSearchParams();
  const key = params.get('isIndividual');
  let pageTitle: string;
  if(key==='true'){
    pageTitle = '개인 금융'
  }else{
    pageTitle = '기업 금융'
  }
  
  return (
    <main>
      <h1 className={` mb-4 text-4xl md:text-4xl text-center`} >
        <strong>{pageTitle}</strong>
      </h1>
      <div className="py-2">
        <h1 className={` mb-4 text-xl md:text-2xl text-center`} >
          <strong>어떤 업무를 원하시나요?</strong>
        </h1>
      </div>
    
      <div className="grid gap-6 sm:grid-rows-2 lg:grid-rows-4 text-center">
      <div className={`grid gap-6 grid-cols-2 text-center`}>
      <Card>
        <CardHeader>
          예적금 업무
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center ">
          <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Cow%20Face.png" alt="Cow Face" width="100" height="100" />
          </div>
        </CardContent>
        <CardFooter className="justify-center"> 선택하기 </CardFooter>
      </Card>
      <Card>
      <CardHeader>
          대출 업무
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center ">
          <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Hamster.png" alt="Hamster" width="100" height="100" />
          </div>
        </CardContent>
        <CardFooter className="justify-center"> 선택하기 </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          ISA계좌 개설
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center ">
          <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Rabbit%20Face.png" alt="Rabbit Face" width="100" height="100" />
          </div>
        </CardContent>
        <CardFooter className="justify-center"> 선택하기 </CardFooter>
      </Card>
      <Card>
      <CardHeader>
          심심해 놀아줘
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center ">
          <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Cat%20Face.png" alt="Cat Face" width="100" height="100" />
          </div>
        </CardContent>
        <CardFooter className="justify-center"> 선택하기 </CardFooter>
      </Card>   
      </div>
      <AchromaticButton>상담하러 갈래요!</AchromaticButton>
      </div>
    </main>
  );
}
