import React from "react";
import AchromaticButton from "../component/atom/button/achromatic-button";

interface waitingCountProps {
  waitingCount: number;
}

export default function ConsultationStartContent({ waitingCount }: waitingCountProps) {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-10">
      <div className="flex text-hwachang-green1 font-bold text-5xl mb-8">
        고객과의 화상 상담을 시작하세요
      </div>
      <div className="text-hwachang-green1 text-2xl">
        현재 {waitingCount}명의 고객이 대기 중에 있습니다.
      </div>
      <AchromaticButton className="bg-hwachang-darkgreen w-1/4 rounded-2xl py-8 text-xl">
        입장하기
      </AchromaticButton>
    </div>
  );
}