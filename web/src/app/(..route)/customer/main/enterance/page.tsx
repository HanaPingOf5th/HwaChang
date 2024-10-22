import AchromaticButton from "@/app/ui/component/atom/achromatic-button";
import { Card, CardContent, CardFooter, CardHeader } from "@/app/ui/component/molecule/card/card";

export default function Home() {
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl text-center`} >
        <strong>어떤 업무를 원하시나요?</strong>
      </h1>
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
