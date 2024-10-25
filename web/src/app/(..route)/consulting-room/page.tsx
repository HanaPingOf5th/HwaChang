'use client'
import AchromaticButton from "@/app/ui/component/atom/button/achromatic-button";
import { FineEmoji } from "@/app/ui/component/atom/fluent-emoji";
import { Card, CardContent, CardFooter} from "@/app/ui/component/molecule/card/card";
import { useSearchParams } from "next/navigation";
import Banker from '@/app/utils/public/banker.png';
import { NameTag } from "@/app/ui/component/atom/name-tag";
import { AiOutlineAudio } from "react-icons/ai";
import { IoShareSocialOutline, IoSettingsOutline, IoVideocamOutline  } from "react-icons/io5";

export default function Home() {
  // ToDo: userSearchParam 이용해서 isIndividual의 값에 따라 컴포넌트 내에서 다른 내용 보여주기
  const params = useSearchParams();
  const key = params.get('isWait');
  const buttonStatus = key==='true'?'대기중':'상담 종료';

  return (
    <main>
      {
      key=='true'
      ? 
      <div className="grid grid-row-1 gap-1">
        <p className={`mb-6 text-4xl text-hwachang-green1`} >
          <strong>상담 대기실</strong>
        </p>
        <div className="flex justify-between space-x-2">
          <p className={`mb-6 text-2xl text-hwachang-green1 font-semibold`} >
            상담사를 기다리는 중입니다...
          </p>
          <AchromaticButton 
            className="bg-hwachang-brightgreen hover:bg-hwachang-lightgreen text-black"
            onClick={()=>{}}
          >
            대기현황 보기
          </AchromaticButton>
        </div>
      </div>
      : <Card className="grid gap-6 grid-cols-3 text-center px-3 py-3">
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
      <div className="grid gap-6 grid-rows text-center pt-4">
        {/* 은행원 화면 ToDo: 배경 이미지 대신 웹소켓으로 받은 실시간 데이터를 보여주기 */}
        <Card className="relative bg-cover bg-center" style={{ backgroundImage: `url(${Banker.src})` }}>
          <CardContent>
            <div className="p-60"/>
          </CardContent>
          <CardFooter>
            <NameTag name="이수민"/>
          </CardFooter>
        </Card>
          <div className="flex justify-center space-x-4">
              <AchromaticButton className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3"><AiOutlineAudio color="black" size={20}/></AchromaticButton>
              <AchromaticButton className="rounded-full  bg-hwachang-gray2 hover:bg-hwachang-gray3"><IoVideocamOutline color="black" size={20}/></AchromaticButton>
              <AchromaticButton className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3 text-black">{buttonStatus}</AchromaticButton>
              <AchromaticButton className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3"><IoShareSocialOutline color="black" size={20}/></AchromaticButton>
              <AchromaticButton className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3"><IoSettingsOutline color="black" size={20}/></AchromaticButton>
            </div>
      </div>
    </main>
  );
}
