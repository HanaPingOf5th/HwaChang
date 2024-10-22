import AchromaticButton from "@/app/ui/component/atom/achromatic-button";
import { NotFineEmoji,FineEmoji } from "@/app/ui/component/atom/fluent-emoji";
import { Card, CardContent, CardFooter, CardHeader } from "@/app/ui/component/molecule/card/card";

export default function Home() {
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl text-center`} >
        customer main page
      </h1>
      <div className={`grid gap-6 grid-cols-2 text-center`}>
      <Card>
      <CardHeader> <p className="text-3xl">개인 상담</p> </CardHeader>
        <CardContent>
          <div className="flex flex-col justify-center items-center">
            <FineEmoji heignt={250} width={250}/>
            <p className="text-blue-400"><strong>예상대기 시간: 5분</strong></p>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <AchromaticButton>상담하러 가기</AchromaticButton>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader> <p className="text-3xl">기업 상담</p> </CardHeader>
        <CardContent>
          <div className="flex flex-col justify-center items-center ">
            <NotFineEmoji heignt={250} width={250}/>
          <p className="text-red-400"><strong>예상대기 시간: 60분</strong></p>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <AchromaticButton>상담하러 가기</AchromaticButton>
        </CardFooter>
      </Card>
      </div>
    </main>
  );
}
