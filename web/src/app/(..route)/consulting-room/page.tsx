'use client'
import AchromaticButton from "@/app/ui/component/atom/achromatic-button";
import { FineEmoji } from "@/app/ui/component/atom/fluent-emoji";
import { Card, CardContent, CardFooter} from "@/app/ui/component/molecule/card/card";
import { useSearchParams } from "next/navigation";
import Banker from '@/app/utils/public/banker.png';
import { NameTag } from "@/app/ui/component/atom/name-tag";

export default function Home() {
  // ToDo: userSearchParam 이용해서 isIndividual의 값에 따라 컴포넌트 내에서 다른 내용 보여주기
  const params = useSearchParams();
  const key = params.get('isWait');

  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl text-center`} >
        consulting room page
      </h1>
      <div className="grid gap-6 grid-rows text-center">
        {/* 상단 채팅 참여자: isWait이 ture일 경우에만 상단 참여자 화면 렌더링*/}
        {
        key=='true'
        ?<div></div>
        :<Card className="grid gap-6 grid-cols-3 text-center px-3 py-3">
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
        }

        {/* 은행원 화면 ToDo - 배경 이미지 대신 웹소켓으로 받은 실시간 데이터를 보여주기 */}
        <Card className="relative bg-cover bg-center" style={{ backgroundImage: `url(${Banker.src})` }}>
          <CardContent>
            <div className="p-40"/>
          </CardContent>
          <CardFooter>
            <NameTag name="이수민"/>
          </CardFooter>
        </Card>
          <div className="flex justify-center space-x-4">
              <AchromaticButton>button</AchromaticButton>
              <AchromaticButton>button</AchromaticButton>
              <AchromaticButton className="bg-red-400 hover:bg-red-600">상담 종료</AchromaticButton>
              <AchromaticButton>button</AchromaticButton>
              <AchromaticButton>button</AchromaticButton>
            </div>
      </div>
    </main>
  );
}
