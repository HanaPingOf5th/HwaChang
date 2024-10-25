import React from "react";
import AchromaticButton from "../component/atom/button/achromatic-button";
import Image from "next/image";
import Logo from "@/app/utils/public/Logo.png";
import ProfileImg from "@/app/utils/public/lalalping.png";
import { Card } from "../component/molecule/card/card";
import TellerNavLinks from "./teller-nav-link";

interface TellerInfo {
  name: string;
  position: string;
  branch: string;
  department: string;
  availability: string;
}

interface TellerInfoProps {
  tellerInfo: TellerInfo;
}

export default function TellerNav({ tellerInfo }: TellerInfoProps) {

  return (
    <div className="flex h-full flex-col bg-hwachang-darkgreen">
      <div className="flex h-32 justify-center items-center">
        {/* 로고 */}
        <Image src={Logo} alt="Logo" width={120} height={100} className="mt-10" />
      </div>

      {/* 행원 정보 */}
      <div className="relative flex flex-col items-center flex-grow justify-center">

        {/* 프로필 사진 */}
        <div className="relative z-10 mb-[-16px]">
          <Image
            src={ProfileImg}
            alt="프로필 사진"
            className="object-cover w-64 h-64 rounded-full border-4 border-white shadow-lg"
          />
          <div className="absolute right-16 transform translate-x-8 bottom-1 w-9 h-9 bg-hwachang-active rounded-full border-4 border-white shadow-lg z-20"></div>
        </div>

        {/* 상세 정보(Card) - 이름, 직급, 지점, 담당 카테고리, 상담 가능 상태 */}
        <Card className="relative bg-white shadow-lg rounded-3xl w-9/12">
          <div className="p-5 text-center">
            <div className="flex flex-col items-center mb-4">
              <div className="flex items-baseline space-x-2 p-2">
                <p className="text-4xl font-semibold">{tellerInfo.name}</p>
                <p className="text-xl text-gray1">{tellerInfo.position}</p>
              </div>
            </div>

            <p className="text-hwachang-black text-lg">{tellerInfo.branch}</p>
            <p className="text-hwachang-black text-lg">{tellerInfo.department}</p>

            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-hwachang-active rounded-full"></div>
              <p className="text-hwachang-black text-lg">{tellerInfo.availability}</p>
            </div>

            <AchromaticButton className="bg-hwachang-green rounded-3xl font-medium text-xl w-full py-9 shadow-lg mt-4">
              상태 바꾸러 가기
            </AchromaticButton>
          </div>
        </Card>
      </div>

      <div className="flex grow flex-row justify-end space-x-2 md:flex-col md:space-x-0 md:space-y-2 mt-10 ml-10">
        <TellerNavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-emerald-10 md:block"></div>
      </div>
    </div>
  );
}