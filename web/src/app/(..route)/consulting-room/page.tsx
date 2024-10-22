import AchromaticButton from "@/app/ui/component/atom/achromatic-button";
import { FineEmoji } from "@/app/ui/component/atom/fluent-emoji";
import { Card, CardContent, CardFooter } from "@/app/ui/component/molecule/card/card";

export default function Home() {
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl text-center`} >
        consulting room page
      </h1>
      <div className="grid gap-6 grid-rows text-center">
        {/* 상단 채팅 참여자 */}
        <Card className="grid gap-6 grid-cols-3 text-center px-3 py-3">
          <Card>
            <></>
            <CardContent>
              <div className="flex flex-col justify-center items-center">
                <FineEmoji heignt={150} width={150}/>
              </div>
            </CardContent>
          </Card>
          <Card>
            <></>
            <CardContent>
              <div className="flex flex-col justify-center items-center">
                <FineEmoji heignt={150} width={150}/>
              </div>
            </CardContent>
          </Card>
          <Card>
            <></>
            <CardContent>
              <div className="flex flex-col justify-center items-center">
                <FineEmoji heignt={150} width={150}/>
              </div>
            </CardContent>
          </Card>
        </Card>
        {/* 은행원 화면 */}
          <Card>
            <></>
            <CardContent>
              <div className="flex flex-col justify-center items-center">
                <FineEmoji heignt={500} width={500}/>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center space-x-4">
              <AchromaticButton>button</AchromaticButton>
              <AchromaticButton>button</AchromaticButton>
              <AchromaticButton className="bg-red-400 hover:bg-red-600">상담 종료</AchromaticButton>
              <AchromaticButton>button</AchromaticButton>
              <AchromaticButton>button</AchromaticButton>
            </CardFooter>
          </Card>
      </div>
    </main>
  );
}
