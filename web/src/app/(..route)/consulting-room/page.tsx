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
        <div className={`grid gap-6 grid-cols-3 text-center`}>
          <Card>
            <></>
            <CardContent>
              <div className="flex flex-col justify-center items-center">
                <FineEmoji heignt={250} width={250}/>
              </div>
            </CardContent>
          </Card>
          <Card>
            <></>
            <CardContent>
              <div className="flex flex-col justify-center items-center">
                <FineEmoji heignt={250} width={250}/>
              </div>
            </CardContent>
          </Card>
          <Card>
            <></>
            <CardContent>
              <div className="flex flex-col justify-center items-center">
                <FineEmoji heignt={250} width={250}/>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* 은행원 화면 */}
          <Card>
            <></>
            <CardContent>
              <div className="flex flex-col justify-center items-center">
                <FineEmoji heignt={250} width={250}/>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center space-x-4">
              <AchromaticButton>버튼1</AchromaticButton>
              <AchromaticButton>버튼2</AchromaticButton>
              <AchromaticButton>버튼3</AchromaticButton>
            </CardFooter>
          </Card>
      </div>
    </main>
  );
}
